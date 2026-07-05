import type { ReactNode } from "react";

export function PortalTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl text-navy sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  accent = false,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div className={`card p-5 ${accent ? "border-gold/50 bg-gold-soft/30" : ""}`}>
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className="tabular mt-1.5 text-2xl font-extrabold text-navy">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function StatusPill({
  status,
}: {
  status: string;
}) {
  const map: Record<string, string> = {
    paid: "bg-ok/10 text-ok",
    resolved: "bg-ok/10 text-ok",
    done: "bg-ok/10 text-ok",
    owned: "bg-ok/10 text-ok",
    due: "bg-warn/15 text-warn",
    "in-progress": "bg-warn/15 text-warn",
    active: "bg-navy/10 text-navy",
    completing: "bg-navy/10 text-navy",
    open: "bg-navy/10 text-navy",
    upcoming: "bg-line text-muted",
    pending: "bg-line text-muted",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
        map[status] ?? "bg-line text-muted"
      }`}
    >
      {status.replace("-", " ")}
    </span>
  );
}

/** Watermark for demo confidential panels — figures are illustrative, not real. */
export function SampleDataBadge() {
  return (
    <span className="inline-flex items-center rounded border border-warn/40 bg-warn/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-warn">
      Sample data — demonstration only
    </span>
  );
}

export function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <h2 className="font-serif text-lg text-navy">{title}</h2>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}
