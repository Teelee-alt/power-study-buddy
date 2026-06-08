// Bun script: seed topic_sets + cards into Postgres from local data files.
// Run: bun scripts/seed-cards.ts
import { POWER_ELECTRONICS_CARDS } from "./seed-data/power-electronics-cards";
import { ALL_EXAM_CARDS } from "./seed-data/all-exam-cards";
import { EXAM_MODE_CARDS } from "./seed-data/exam-cards";
import { EXTENDED_EXAM_CARDS } from "./seed-data/extended-exam-cards";
import { MASSIVE_CARDS } from "./seed-data/massive-cards";
import { qaCardsData } from "./seed-data/qa-cards-data";
import { readFileSync, writeFileSync } from "fs";

type Card = { topic: string; question: string; answer: string; difficulty?: string };

const all: Card[] = [
  ...POWER_ELECTRONICS_CARDS,
  ...ALL_EXAM_CARDS,
  ...EXAM_MODE_CARDS,
  ...EXTENDED_EXAM_CARDS,
  ...(MASSIVE_CARDS as Card[]),
  ...qaCardsData,
];

// Parse flashcard-seed.md
const md = readFileSync("scripts/seed-data/flashcard-seed.md", "utf8");
const mdBlocks = md.split(/\n(?=Q:\s)/);
for (const block of mdBlocks) {
  const m = block.match(/^Q:\s*([\s\S]*?)\nA:\s*([\s\S]*)$/);
  if (m) all.push({ topic: "Exam Practice", question: m[1].trim(), answer: m[2].trim(), difficulty: "medium" });
}

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();
const seen = new Set<string>();
const byTopic: Record<string, Card[]> = {};
for (const c of all) {
  if (!c?.question || !c?.answer) continue;
  const key = norm(c.question);
  if (seen.has(key)) continue;
  seen.add(key);
  const topic = (c.topic || "General").trim();
  (byTopic[topic] ||= []).push(c);
}

const topics = Object.keys(byTopic).sort();
console.error(`Topics: ${topics.length}, total cards: ${seen.size}`);

const esc = (s: string) => s.replace(/'/g, "''");
let sql = "BEGIN;\n";
sql += `DELETE FROM public.cards;\nDELETE FROM public.topic_sets;\n`;
topics.forEach((t, i) => {
  const slug = `t_${i}`;
  sql += `WITH ins AS (INSERT INTO public.topic_sets (title, description, order_index, free_card_limit) VALUES ('${esc(t)}', '${esc(`${byTopic[t].length} cards covering ${t}.`)}', ${i + 1}, 9999) RETURNING id)\n`;
  sql += `, ${slug} AS (SELECT id FROM ins)\n`;
  const values = byTopic[t].map((c, j) => {
    const diff = ["easy","medium","hard"].includes(c.difficulty || "") ? c.difficulty : "medium";
    return `((SELECT id FROM ${slug}), '${esc(c.question)}', '${esc(c.answer)}', '${diff}', ${j + 1})`;
  }).join(",\n");
  sql += `INSERT INTO public.cards (topic_set_id, question, answer, difficulty, order_index) VALUES\n${values};\n`;
});
sql += "COMMIT;\n";

writeFileSync("/tmp/seed-cards.sql", sql);
console.error("Wrote /tmp/seed-cards.sql, size:", sql.length);
