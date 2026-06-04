import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAgentInfo, getPricing, getPreviewCards } from "@/lib/api/public.functions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BlockMath, InlineMath } from "react-katex";
import { ChevronLeft, ChevronRight, Zap, BookOpen, Users, Clock } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Power Electronics 1 — Master one card at a time" },
      { name: "description", content: "Real exam questions turned into interactive Q&A flashcards. 400+ cards, 12 topics, model-answer accuracy." },
      { property: "og:title", content: "Power Electronics 1 — Revision App" },
      { property: "og:description", content: "Interactive flashcards for National Diploma & undergrad Power Electronics students." },
    ],
  }),
  component: Landing,
});

function renderMixed(text: string) {
  // Render text with $...$ inline and $$...$$ block math.
  const parts: React.ReactNode[] = [];
  const regex = /\$\$([^$]+)\$\$|\$([^$]+)\$/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = regex.exec(text))) {
    if (m.index > last) parts.push(<span key={key++}>{text.slice(last, m.index)}</span>);
    if (m[1]) parts.push(<BlockMath key={key++} math={m[1]} />);
    else if (m[2]) parts.push(<InlineMath key={key++} math={m[2]} />);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(<span key={key++}>{text.slice(last)}</span>);
  return parts;
}

function Landing() {
  const { data: agent } = useQuery({ queryKey: ["agent"], queryFn: () => getAgentInfo() });
  const { data: pricing } = useQuery({ queryKey: ["pricing"], queryFn: () => getPricing() });
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const { data: preview } = useQuery({ queryKey: ["preview"], queryFn: () => getPreviewCards(), enabled: open });
  const cards = preview?.cards ?? [];
  const card = cards[idx];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient text-navy-foreground">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="flex items-center gap-2 text-sm font-medium opacity-80">
            <Zap className="h-4 w-4" />
            <span>Power Electronics 1 — Revision App</span>
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Master Power Electronics 1 — one card at a time
          </h1>
          <p className="mt-6 max-w-2xl text-lg opacity-90 md:text-xl">
            Real exam questions turned into interactive Q&amp;A flashcards. Model-answer accurate.
            Try a sample card for free.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-primary-gradient text-primary-foreground shadow-glow hover:opacity-90">
              <Link to="/request-access">Request Access</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20" onClick={() => { setOpen(true); setIdx(0); setFlipped(false); }}>
              See Sample Card
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/10">
              <Link to="/signin">Sign In</Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: BookOpen, label: "400+ cards from real papers" },
              { icon: Zap, label: "100% model-answer accuracy" },
              { icon: Clock, label: "15 min a day is enough" },
              { icon: Users, label: "12 complete past paper sets" },
            ].map((b) => (
              <div key={b.label} className="flex items-start gap-3">
                <b.icon className="mt-1 h-5 w-5 shrink-0 opacity-80" />
                <span className="text-sm font-medium text-white">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold md:text-4xl">How it works</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { n: 1, t: "Request access", d: "Fill in your full name and WhatsApp number on the access form." },
            { n: 2, t: "Contact an agent", d: `Pay $${pricing?.individual_price ?? 5} (individual) or $${pricing?.group_price ?? 8} (two people together) via the authorised agent.` },
            { n: 3, t: "Agent sends code", d: "After admin approval, your agent sends your access code on WhatsApp. No email needed." },
          ].map((s) => (
            <Card key={s.n} className="bg-card-gradient shadow-card border-0 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-gradient text-xl font-bold text-primary-foreground shadow-glow">
                {s.n}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground">{s.t}</h3>
              <p className="mt-3 text-muted-foreground">{s.d}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Simple pricing</h2>
          <p className="mt-3 text-muted-foreground">Pay your agent once. Your access code never expires.</p>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Card className="bg-card-gradient shadow-card border-0 p-10">
              <h3 className="text-lg font-semibold text-muted-foreground">Individual</h3>
              <div className="mt-3 text-5xl font-bold text-foreground">${pricing?.individual_price ?? 5}</div>
              <p className="mt-4 text-sm text-muted-foreground">Full access for one student. Permanent.</p>
            </Card>
            <Card className="border-0 p-10 shadow-glow bg-hero-gradient text-navy-foreground">
              <h3 className="text-lg font-semibold opacity-90">Two people together</h3>
              <div className="mt-3 text-5xl font-bold">${pricing?.group_price ?? 8}</div>
              <p className="mt-4 text-sm opacity-90">Both get their own access codes. ${((pricing?.group_price ?? 8) / 2).toFixed(2)} each.</p>
            </Card>
          </div>
          {agent && (
            <div className="mt-10 inline-flex flex-col items-center rounded-xl border border-border bg-card px-8 py-6 shadow-card">
              <span className="text-sm font-medium text-muted-foreground">Authorised agent</span>
              <span className="mt-2 text-xl font-semibold text-foreground">{agent.name}</span>
              <span className="mt-1 text-sm text-primary">{agent.contact}</span>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy py-12 text-navy-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
          <div className="text-lg font-semibold">Power Electronics 1</div>
          <div className="flex flex-wrap justify-center gap-6 text-sm opacity-80">
            <Link to="/request-access" className="hover:opacity-100">Request Access</Link>
            <Link to="/signin" className="hover:opacity-100">Sign In</Link>
            <a href="mailto:powerelectronics1@gmail.com" className="hover:opacity-100">Support</a>
          </div>
          <div className="mt-4 text-xs opacity-60">© {new Date().getFullYear()} Power Electronics 1. All rights reserved.</div>
        </div>
      </footer>

      {/* Sample card modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{preview?.topic?.name ?? "Sample Cards"}</DialogTitle>
          </DialogHeader>
          {cards.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              No preview cards yet. Once the admin seeds the initial content, sample cards will appear here.
            </div>
          ) : card ? (
            <>
              <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                <span className="rounded-full bg-secondary px-2 py-1 font-medium uppercase">{card.difficulty}</span>
                <span>{idx + 1} / {cards.length}</span>
              </div>
              <button
                onClick={() => setFlipped((f) => !f)}
                className="min-h-[260px] w-full rounded-xl border border-border bg-card-gradient p-8 text-left shadow-card transition hover:shadow-elegant"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {flipped ? "Answer" : "Question"} — click to flip
                </div>
                <div className="mt-4 whitespace-pre-wrap text-foreground">
                  {renderMixed(flipped ? card.answer : card.question)}
                </div>
              </button>
              <div className="mt-4 flex justify-between">
                <Button variant="outline" size="sm" disabled={idx === 0} onClick={() => { setIdx(idx - 1); setFlipped(false); }}>
                  <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                </Button>
                <Button variant="outline" size="sm" disabled={idx === cards.length - 1} onClick={() => { setIdx(idx + 1); setFlipped(false); }}>
                  Next <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4 text-center text-xs text-muted-foreground">
                Want full access?{" "}
                <Link to="/request-access" className="font-medium text-primary hover:underline">Request access</Link>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
