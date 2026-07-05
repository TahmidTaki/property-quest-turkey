"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  DEMO_CLIENT,
  encodeSession,
  getSession,
  createSession,
  setSessionCookie,
  clearSession,
  type DemoSession,
  type Role,
} from "@/lib/auth/demo-session";
import { SESSION_COOKIE, PORTAL_HINT_COOKIE } from "@/lib/auth/constants";

const MAX_AGE = 60 * 60 * 8;

/** Agent (internal) view is granted ONLY when the email matches this secret. */
function isAgentEmail(email: string): boolean {
  const allowed = process.env.DEMO_AGENT_EMAIL;
  if (!allowed) return false; // no env var → nobody gets the agent view
  return email.trim().toLowerCase() === allowed.trim().toLowerCase();
}

async function writeSession(session: DemoSession) {
  const store = await cookies();
  store.set(SESSION_COOKIE, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
  store.set(PORTAL_HINT_COOKIE, "1", {
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

/**
 * DEMO login. Any email previews the CLIENT portal on sample data.
 * The internal agent view requires the DEMO_AGENT_EMAIL secret.
 * Replace with the PMS NextAuth flow at integration time.
 */
export async function demoLogin(_prev: unknown, formData: FormData) {
  const email = ((formData.get("email") as string) || "").trim();
  const next = ((formData.get("next") as string) || "").trim();

  if (!email || !email.includes("@")) {
    return { ok: false, error: "Please enter a valid email." };
  }

  const canAgent = isAgentEmail(email);
  const session: DemoSession = {
    ...DEMO_CLIENT,
    email,
    name: "Client",
    phone: "",
    role: canAgent ? "agent" : "client",
    canAgent,
    createdAt: new Date().toISOString(),
  };

  await writeSession(session);

  // Honor a safe in-portal redirect target (set by middleware as ?next=).
  const target = next.startsWith("/portal") ? next : "/portal";
  redirect(target);
}

/**
 * DEMO signup. Creates a new user account with full name and phone.
 * Replace with the PMS NextAuth flow at integration time.
 */
export async function demoSignup(_prev: unknown, formData: FormData) {
  const fullName = ((formData.get("fullName") as string) || "").trim();
  const phone = ((formData.get("phone") as string) || "").trim();
  const email = ((formData.get("email") as string) || "").trim();
  const password = (formData.get("password") as string) || "";
  const confirmPassword = (formData.get("confirmPassword") as string) || "";

  // Validation
  if (!fullName) {
    return { ok: false, error: "Please enter your full name." };
  }

  if (!email || !email.includes("@")) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (!password || password.length < 6) {
    return { ok: false, error: "Password must be at least 6 characters." };
  }

  if (password !== confirmPassword) {
    return { ok: false, error: "Passwords do not match." };
  }

  const canAgent = isAgentEmail(email);
  const session: DemoSession = {
    ...DEMO_CLIENT,
    email,
    name: fullName,
    phone: phone,
    role: canAgent ? "agent" : "client",
    canAgent,
    createdAt: new Date().toISOString(),
  };

  await writeSession(session);
  redirect("/portal");
}

/** Toggle client/agent view — only for sessions entitled to the agent role. */
export async function setRole(role: Role) {
  const current = await getSession();
  if (!current) return;
  const nextRole: Role = role === "agent" && current.canAgent ? "agent" : "client";
  await writeSession({ ...current, role: nextRole });
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  store.delete(PORTAL_HINT_COOKIE);
  redirect("/");
}