"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Mail,
  CircleCheck,
} from "lucide-react";
import type { PmsDetail } from "@/lib/pms/client";
import { formatUsd } from "@/lib/format";
import {
  submitReservation,
  type ReservationState,
} from "@/app/actions/leads";
import { company } from "@/lib/site";

const STEPS = ["Select unit", "Your offer", "Reserve", "Done"];
const DEPOSIT_RATE = 0.05;

const initialState: ReservationState = { ok: false };

export function BuyFlow({
  property,
  initialUnit,
}: {
  property: PmsDetail;
  initialUnit?: string;
}) {
  const [step, setStep] = useState(0);
  
  // Get unit types from property.units
  const unitTypes = property.units || [];
  
  const [unitLabel, setUnitLabel] = useState(
    initialUnit ?? unitTypes[0]?.type ?? "",
  );
  const [agreed, setAgreed] = useState(false);
  const [state, formAction, pending] = useActionState(
    submitReservation,
    initialState,
  );

  const unit = unitTypes.find((u) => u.type === unitLabel) ?? unitTypes[0];
  const price = unit?.price_usd ? Number(unit.price_usd) : 0;
  const deposit = Math.round(price * DEPOSIT_RATE);

  const currentStep = state.ok ? 3 : step;

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  // Helper function to get unit display label
  const getUnitLabel = (u: typeof unit) => {
    if (!u) return "Unit";
    return u.type || "Unit";
  };

  // Helper function to get unit size
  const getUnitSize = (u: typeof unit) => {
    if (!u || !u.net_sqm) return "N/A";
    return `${Number(u.net_sqm)} m²`;
  };

  return (
    <div>
      {/* Stepper */}
      <ol className="mb-8 flex flex-wrap items-center gap-2 text-xs">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full font-bold ${
                i < currentStep
                  ? "bg-ok text-white"
                  : i === currentStep
                    ? "bg-navy text-white"
                    : "bg-line text-muted"
              }`}
            >
              {i < currentStep ? <Check size={13} /> : i + 1}
            </span>
            <span
              className={`font-semibold ${i === currentStep ? "text-navy" : "text-muted"}`}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <span className="mx-1 hidden h-px w-6 bg-line sm:block" />
            )}
          </li>
        ))}
      </ol>

      {/* STEP 0 — select unit */}
      {currentStep === 0 && (
        <div className="card p-6">
          <h2 className="text-xl text-navy">Choose your unit type</h2>
          <p className="mt-1 text-sm text-muted">
            {property.listing_title} · {property.district?.name || property.district_name || "Istanbul"}, Istanbul
          </p>
          {unitTypes.length === 0 ? (
            <div className="mt-5 text-sm text-muted">
              No unit types available. Please contact us for more information.
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {unitTypes.map((u) => (
                <label
                  key={u.type}
                  className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition ${
                    unitLabel === u.type
                      ? "border-navy bg-navy/5 ring-1 ring-navy"
                      : "border-line hover:border-gold"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="unitChoice"
                      className="h-4 w-4 accent-navy"
                      checked={unitLabel === u.type}
                      onChange={() => setUnitLabel(u.type)}
                    />
                    <div>
                      <p className="font-semibold text-ink">{u.type}</p>
                      <p className="text-xs text-muted">
                        {u.net_sqm ? `${Number(u.net_sqm)} m²` : "N/A"} · {u.bedrooms} bed · {u.available_count} available
                      </p>
                    </div>
                  </div>
                  <p className="tabular font-bold text-red">
                    {u.price_usd ? formatUsd(Number(u.price_usd)) : "Contact us"}
                  </p>
                </label>
              ))}
            </div>
          )}
          <div className="mt-6 flex justify-end">
            <button onClick={next} className="btn btn-primary" disabled={unitTypes.length === 0}>
              Continue <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 1 — offer */}
      {currentStep === 1 && (
        <div className="card p-6">
          <h2 className="text-xl text-navy">Your indicative offer</h2>
          <p className="mt-1 text-sm text-muted">
            Indicative figures — a PQT advisor confirms availability and final
            terms before anything is binding.
          </p>
          <dl className="mt-5 divide-y divide-line text-sm">
            <Row label="Project" value={property.listing_title} />
            <Row label="Unit type" value={`${getUnitLabel(unit)} · ${getUnitSize(unit)}`} />
            <Row label="Unit price (from)" value={unit?.price_usd ? formatUsd(Number(unit.price_usd)) : "Contact us"} />
            <Row
              label="Indicative reservation deposit (5%)"
              value={deposit > 0 ? formatUsd(deposit) : "Contact us"}
            />
            <Row
              label="Citizenship eligible"
              value={property.cbi_eligible ? "Yes" : "Under review"}
            />
          </dl>
          <div className="mt-6 flex justify-between">
            <button onClick={back} className="btn btn-ghost">
              <ArrowLeft size={16} /> Back
            </button>
            <button onClick={next} className="btn btn-primary">
              Request this unit <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 — reservation request */}
      {currentStep === 2 && (
        <form action={formAction} className="card p-6">
          <h2 className="text-xl text-navy">Reservation request</h2>
          <p className="mt-1 text-sm text-muted">
            Tell us how to reach you. A PQT advisor will confirm availability and
            prepare your reservation agreement — no payment is taken online.
          </p>

          <input type="hidden" name="project" value={property.listing_title} />
          <input
            type="hidden"
            name="unit"
            value={`${getUnitLabel(unit)} · from ${unit?.price_usd ? formatUsd(Number(unit.price_usd)) : "Contact us"}`}
          />
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="r-name">
                Full name
              </label>
              <input id="r-name" name="name" className="field" placeholder="Your name" />
              {state.fieldErrors?.name && (
                <p className="mt-1 text-xs text-red">{state.fieldErrors.name}</p>
              )}
            </div>
            <div>
              <label className="label" htmlFor="r-email">
                Email
              </label>
              <input
                id="r-email"
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
          <div className="mt-4">
            <label className="label" htmlFor="r-phone">
              Phone / WhatsApp
            </label>
            <input id="r-phone" name="phone" className="field" placeholder="+90 ..." />
            {state.fieldErrors?.phone && (
              <p className="mt-1 text-xs text-red">{state.fieldErrors.phone}</p>
            )}
          </div>

          <div className="mt-5 max-h-44 overflow-y-auto rounded-lg border border-line bg-canvas p-4 text-xs text-ink/75">
            <p className="font-semibold">Reservation terms (summary)</p>
            <p className="mt-2">
              This request expresses your interest in {getUnitLabel(unit)} at{" "}
              {property.listing_title} from {unit?.price_usd ? formatUsd(Number(unit.price_usd)) : "Contact us"}. It is not a
              binding contract and no payment is due now. After PQT confirms
              availability, a refundable reservation deposit of approximately{" "}
              {deposit > 0 ? formatUsd(deposit) : "TBC"} holds the unit while contracts are prepared
              and reviewed by your legal advisor. Citizenship eligibility is
              subject to official valuation and government approval.
            </p>
          </div>
          <label className="mt-4 flex items-start gap-2.5 text-sm">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 accent-navy"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span className="text-ink/80">
              I understand this is a no-obligation reservation request.
            </span>
          </label>

          {state.error && (
            <div
              className={`mt-4 ${
                state.fallback
                  ? "rounded-lg border border-warn/40 bg-warn/10 p-4"
                  : ""
              }`}
            >
              <p className="text-sm text-red">{state.error}</p>
              {state.fallback && (
                <a
                  href={`mailto:${company.email}?subject=${encodeURIComponent(
                    `Reservation request: ${property.listing_title} — ${getUnitLabel(unit)}`,
                  )}`}
                  className="btn btn-navy mt-3 w-full"
                >
                  <Mail size={15} /> Email us at {company.email}
                </a>
              )}
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button type="button" onClick={back} className="btn btn-ghost">
              <ArrowLeft size={16} /> Back
            </button>
            <button
              type="submit"
              disabled={!agreed || pending || unitTypes.length === 0}
              className="btn btn-primary disabled:opacity-50"
            >
              {pending ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Submit reservation request <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* STEP 3 — done */}
      {currentStep === 3 && (
        <div className="card p-8 text-center">
          <CircleCheck className="mx-auto text-ok" size={52} />
          <h2 className="mt-4 text-2xl text-navy">Request received</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Thank you — your reservation request for {getUnitLabel(unit)} at{" "}
            {property.listing_title} is with our team. A PQT advisor will contact you
            within one business day to confirm availability and next steps.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/projects" className="btn btn-primary">
              Browse more projects
            </Link>
            <Link href="/portal" className="btn btn-outline">
              Explore the client portal
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2.5">
      <dt className="text-muted">{label}</dt>
      <dd className="tabular text-right font-semibold text-ink">{value}</dd>
    </div>
  );
}