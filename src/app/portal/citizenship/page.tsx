import { Check } from "lucide-react";
import { getCitizenshipSteps } from "@/lib/content/portfolio";
import { PortalTitle } from "@/components/portal/ui";

export default async function CitizenshipTrackerPage() {
  const steps = await getCitizenshipSteps();
  const done = steps.filter((s) => s.status === "done").length;
  const pct = Math.round((done / steps.length) * 100);

  return (
    <>
      <PortalTitle
        title="Citizenship tracker"
        subtitle="Follow every step of your Turkish citizenship application."
      />

      <div className="card mb-6 p-5">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-navy">Overall progress</span>
          <span className="tabular text-muted">
            {done} of {steps.length} steps · {pct}%
          </span>
        </div>
        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-gold transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <ol className="relative border-l-2 border-line pl-6">
        {steps.map((s) => (
          <li key={s.key} className="mb-7 last:mb-0">
            <span
              className={`absolute -left-[11px] flex h-5 w-5 items-center justify-center rounded-full ${
                s.status === "done"
                  ? "bg-ok text-white"
                  : s.status === "active"
                    ? "bg-gold text-ink ring-4 ring-gold/20"
                    : "bg-white ring-2 ring-line"
              }`}
            >
              {s.status === "done" && <Check size={12} />}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <h3
                className={`text-base font-semibold ${
                  s.status === "pending" ? "text-muted" : "text-navy"
                }`}
              >
                {s.title}
              </h3>
              {s.date && (
                <span className="tabular text-xs text-muted">{s.date}</span>
              )}
              {s.status === "active" && (
                <span className="badge badge-gold">In progress</span>
              )}
            </div>
            {s.note && <p className="mt-1 text-sm text-ink/75">{s.note}</p>}
          </li>
        ))}
      </ol>
    </>
  );
}
