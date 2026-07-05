/**
 * Lightweight DEMO authentication — hardened for the public preview.
 *
 * Still not full production auth (that arrives with the PMS NextAuth swap),
 * but the cookie is now HMAC-signed so it cannot be forged, and the internal
 * "agent" view is only granted server-side when the login email matches the
 * DEMO_AGENT_EMAIL secret. Set SESSION_SECRET + DEMO_AGENT_EMAIL in production.
 *
 * HARD RULE (also in DECISIONS.md): real PMS data must never ship behind this
 * cookie — replacing it with the PMS NextAuth session is a blocking
 * precondition of the data integration.
 */

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "./constants";

export type Role = "client" | "agent";

export interface DemoSession {
  email: string;
  name: string;
  phone?: string;
  role: Role;
  /** Granted server-side at login only when email matches DEMO_AGENT_EMAIL. */
  canAgent: boolean;
  /** User creation timestamp */
  createdAt?: string;
}

/** The single sample client used across the portal demo. */
export const DEMO_CLIENT: Omit<DemoSession, "canAgent" | "phone" | "createdAt"> = {
  email: "client@demo.pqt",
  name: "Ahmed Hassan",
  role: "client",
};

function secret(): string {
  // Dev fallback keeps localhost working; production sets SESSION_SECRET.
  return process.env.SESSION_SECRET ?? "pqt-dev-only-secret";
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function encodeSession(s: DemoSession): string {
  const payload = Buffer.from(JSON.stringify(s), "utf8").toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export async function createSession(
  email: string,
  name: string,
  phone?: string,
  role: Role = "client"
): Promise<string> {
  const canAgent = email === process.env.DEMO_AGENT_EMAIL;
  const session: DemoSession = {
    email,
    name,
    phone: phone || "",
    role: canAgent ? "agent" : role,
    canAgent,
    createdAt: new Date().toISOString(),
  };
  return encodeSession(session);
}

export async function setSessionCookie(session: DemoSession): Promise<void> {
  const store = await cookies();
  const encoded = encodeSession(session);
  store.set(SESSION_COOKIE, encoded, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });
}

export async function getSession(): Promise<DemoSession | null> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  if (!raw) return null;

  const dot = raw.lastIndexOf(".");
  if (dot < 1) return null; // legacy/unsigned cookie → treat as logged out
  const payload = raw.slice(0, dot);
  const sig = raw.slice(dot + 1);

  try {
    const expected = sign(payload);
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

    const parsed = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as DemoSession;
    if (!parsed?.email) return null;

    const canAgent = parsed.canAgent === true;
    // Never honor an agent role the session isn't entitled to.
    const role: Role = canAgent && parsed.role === "agent" ? "agent" : "client";
    return {
      email: parsed.email,
      name: parsed.name ?? "Client",
      phone: parsed.phone ?? "",
      role,
      canAgent,
      createdAt: parsed.createdAt,
    };
  } catch {
    return null;
  }
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export { SESSION_COOKIE };