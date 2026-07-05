"use client";

import { useActionState } from "react";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { submitLead, type LeadFormState } from "@/app/actions/leads";
import { company } from "@/lib/site";

const initial: LeadFormState = { ok: false };

export function LeadForm({
  kind = "contact",
  project,
  compact = false,
}: {
  kind?: "contact" | "enquiry" | "newsletter";
  project?: string;
  compact?: boolean;
}) {
  const [state, formAction, pending] = useActionState(submitLead, initial);

  if (state.ok) {
    return (
      <div className="flex flex-col items-center rounded-xl border border-ok/30 bg-ok/5 p-8 text-center">
        <CheckCircle2 className="text-ok" size={40} />
        <h3 className="mt-3 text-xl text-navy">Thank you!</h3>
        <p className="mt-1.5 text-sm text-muted">
          Your message has been received. A PQT advisor will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="kind" value={kind} />
      {project && <input type="hidden" name="project" value={project} />}
      {/* Honeypot — hidden from humans, catches naive bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className={compact ? "" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <label className="label" htmlFor="name">
            Full name
          </label>
          <input id="name" name="name" className="field" placeholder="Your name" />
          {state.fieldErrors?.name && (
            <p className="mt-1 text-xs text-red">{state.fieldErrors.name}</p>
          )}
        </div>
        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="field"
            placeholder="you@email.com"
          />
          {state.fieldErrors?.email && (
            <p className="mt-1 text-xs text-red">{state.fieldErrors.email}</p>
          )}
        </div>
      </div>

      <div className={compact ? "" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <label className="label" htmlFor="phone">
            Phone / WhatsApp <span className="text-muted">(optional)</span>
          </label>
          <input id="phone" name="phone" className="field" placeholder="+90 ..." />
        </div>
        <div>
          <label className="label" htmlFor="budget">
            Budget <span className="text-muted">(optional)</span>
          </label>
          <select id="budget" name="budget" className="field" defaultValue="">
            <option value="">Select a range</option>
            <option>Under $400K</option>
            <option>$400K – $700K</option>
            <option>$700K – $1.5M</option>
            <option>$1.5M+</option>
          </select>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="message">
          How can we help? <span className="text-muted">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={compact ? 3 : 4}
          className="field resize-none"
          placeholder="Tell us about your goals — citizenship, investment, timeline…"
        />
      </div>

      {state.error && (
        <div
          className={
            state.fallback
              ? "rounded-lg border border-warn/40 bg-warn/10 p-4"
              : ""
          }
        >
          <p className="text-sm text-red">{state.error}</p>
          {state.fallback && (
            <a
              href={`mailto:${company.email}?subject=${encodeURIComponent(
                project ? `Enquiry: ${project}` : "Consultation request",
              )}`}
              className="btn btn-navy mt-3 w-full"
            >
              <Mail size={15} /> Email us at {company.email}
            </a>
          )}
        </div>
      )}

      <button type="submit" disabled={pending} className="btn btn-primary w-full">
        {pending ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending…
          </>
        ) : (
          "Send message"
        )}
      </button>
      <p className="text-center text-xs text-muted">
        By submitting, you agree to be contacted by PQT. We never share your data.
      </p>
    </form>
  );
}
