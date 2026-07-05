import { appendFile } from "node:fs/promises";
import path from "node:path";

export interface Lead {
  kind: "contact" | "enquiry" | "newsletter" | "reservation";
  name?: string;
  email: string;
  phone?: string;
  budget?: string;
  project?: string;
  unit?: string;
  message?: string;
  createdAt: string;
}

export interface LeadDelivery {
  delivered: boolean;
  reason?: string;
}

const KIND_LABEL: Record<Lead["kind"], string> = {
  contact: "Contact form",
  enquiry: "Project enquiry",
  newsletter: "Newsletter signup",
  reservation: "RESERVATION REQUEST",
};

function leadText(lead: Lead): string {
  return [
    `Type:    ${KIND_LABEL[lead.kind]}`,
    `Name:    ${lead.name || "-"}`,
    `Email:   ${lead.email}`,
    `Phone:   ${lead.phone || "-"}`,
    `Budget:  ${lead.budget || "-"}`,
    `Project: ${lead.project || "-"}`,
    lead.unit ? `Unit:    ${lead.unit}` : null,
    ``,
    `Message:`,
    lead.message || "-",
    ``,
    `Received: ${lead.createdAt}`,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

/** Send the lead to the sales inbox via Resend's REST API (no SDK needed). */
async function sendLeadEmail(lead: Lead): Promise<LeadDelivery> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_TO_EMAIL;
  if (!key || !to) {
    return { delivered: false, reason: "email-not-configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.LEADS_FROM_EMAIL ?? "PQT Website <onboarding@resend.dev>",
        to: [to],
        reply_to: lead.email,
        subject: `[PQT ${KIND_LABEL[lead.kind]}] ${lead.name || lead.email}${lead.project ? ` — ${lead.project}` : ""}`,
        text: leadText(lead),
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("Resend rejected lead email:", res.status, body.slice(0, 300));
      return { delivered: false, reason: `resend-${res.status}` };
    }
    return { delivered: true };
  } catch (err) {
    console.error("Lead email send failed:", err);
    return { delivered: false, reason: "network" };
  }
}

/**
 * Record a lead and report HONESTLY whether it reached a durable destination.
 *
 * Production: delivery = email to LEADS_TO_EMAIL via Resend. If email is not
 * configured or fails, this returns delivered:false so the form can show the
 * visitor a fallback instead of a false "thank you".
 *
 * Development: logs to console + .dev-leads.log (counts as delivered so the
 * local flow is testable).
 */
export async function recordLead(lead: Lead): Promise<LeadDelivery> {
  // Always log a copy for observability.
  console.log("📩 NEW LEAD:", JSON.stringify(lead));

  const emailResult = await sendLeadEmail(lead);
  if (emailResult.delivered) return emailResult;

  // Dev fallback: the local log file is a real, readable destination.
  if (process.env.NODE_ENV !== "production") {
    try {
      const file = path.join(process.cwd(), ".dev-leads.log");
      await appendFile(file, JSON.stringify(lead) + "\n", "utf8");
      return { delivered: true, reason: "dev-log" };
    } catch (err) {
      console.error("Failed to write .dev-leads.log:", err);
      return { delivered: false, reason: "dev-log-failed" };
    }
  }

  // Production with no working email path: do NOT pretend it worked.
  return emailResult;
}
