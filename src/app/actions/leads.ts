"use server";

import { z } from "zod";
import { recordLead } from "@/lib/leads";

const ContactSchema = z.object({
  kind: z.enum(["contact", "enquiry", "newsletter"]).default("contact"),
  name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  project: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type LeadFormState = {
  ok: boolean;
  error?: string;
  /** True when delivery failed and the visitor should use direct contact instead. */
  fallback?: boolean;
  fieldErrors?: Record<string, string>;
};

const FALLBACK_ERROR =
  "We couldn't send your message right now. Please email us directly — we reply within one business day.";

function str(formData: FormData, key: string): string {
  return ((formData.get(key) as string) ?? "").toString();
}

export async function submitLead(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  // Honeypot: real visitors never see or fill this field. Bots do.
  if (str(formData, "website").trim() !== "") {
    return { ok: true }; // silently drop bot submissions
  }

  const raw = {
    kind: str(formData, "kind") || "contact",
    name: str(formData, "name"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    budget: str(formData, "budget"),
    project: str(formData, "project"),
    message: str(formData, "message"),
  };

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return { ok: false, error: "Please fix the errors below.", fieldErrors };
  }

  try {
    const delivery = await recordLead({
      ...parsed.data,
      createdAt: new Date().toISOString(),
    });
    if (!delivery.delivered) {
      return { ok: false, fallback: true, error: FALLBACK_ERROR };
    }
    return { ok: true };
  } catch {
    return { ok: false, fallback: true, error: FALLBACK_ERROR };
  }
}

const ReservationSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().min(5, "Please enter a phone number").max(40),
  project: z.string().trim().min(1).max(120),
  unit: z.string().trim().min(1).max(60),
});

export type ReservationState = {
  ok: boolean;
  error?: string;
  fallback?: boolean;
  fieldErrors?: Record<string, string>;
};

/** Reservation request from the buy flow — must reach a human, honestly. */
export async function submitReservation(
  _prev: ReservationState,
  formData: FormData,
): Promise<ReservationState> {
  if (str(formData, "website").trim() !== "") {
    return { ok: true };
  }

  const parsed = ReservationSchema.safeParse({
    name: str(formData, "name"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    project: str(formData, "project"),
    unit: str(formData, "unit"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return { ok: false, error: "Please fix the errors below.", fieldErrors };
  }

  try {
    const delivery = await recordLead({
      kind: "reservation",
      ...parsed.data,
      message: `Reservation request for ${parsed.data.unit} at ${parsed.data.project}.`,
      createdAt: new Date().toISOString(),
    });
    if (!delivery.delivered) {
      return { ok: false, fallback: true, error: FALLBACK_ERROR };
    }
    return { ok: true };
  } catch {
    return { ok: false, fallback: true, error: FALLBACK_ERROR };
  }
}
