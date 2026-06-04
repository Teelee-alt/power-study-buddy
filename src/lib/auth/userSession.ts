// Client-side helpers for the custom user session (full name + access code).
// Session token is stored in localStorage; server functions validate it.
const TOKEN_KEY = "pe1_session_token";
const USER_KEY = "pe1_session_user";

export interface AppUserSession {
  id: string;
  full_name: string;
  whatsapp: string;
  access_code: string;
}

export function saveSession(token: string, user: AppUserSession, remember: boolean) {
  if (typeof window === "undefined") return;
  const store = remember ? localStorage : sessionStorage;
  store.setItem(TOKEN_KEY, token);
  store.setItem(USER_KEY, JSON.stringify(user));
}

export function getSessionToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);
}

export function getSessionUser(): AppUserSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY) ?? sessionStorage.getItem(USER_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
}
