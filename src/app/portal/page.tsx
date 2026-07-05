import Link from "next/link";
import { ArrowRight, CalendarClock } from "lucide-react";
import { getSession } from "@/lib/auth/demo-session";
import {
  getPortfolioSummary,
  getCitizenshipSteps,
} from "@/lib/content/portfolio";
import { formatUsd, formatUsdCompact } from "@/lib/format";
import { PortalTitle, StatCard, Panel } from "@/components/portal/ui";

export default async function DashboardPage() {
  const session = await getSession();
  const [summary, steps] = await Promise.all([
    getPortfolioSummary(),
    getCitizenshipSteps(),
  ]);
  const firstName = session?.name.split(" ")[0] ?? "there";
  const activeStep = steps.find((s) => s.status === "active");

  return (
    <>
      <PortalTitle
        title={`Welcome back, ${firstName}`}
        subtitle="Here's a snapshot of your investment and citizenship journey."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total invested"
          value={formatUsd(summary.invested)}
          hint={`${summary.holdings} properties`}
        />
        <StatCard
          label="Current value"
          value={formatUsd(summary.value)}
          hint={`+${summary.gainPct.toFixed(1)}% since purchase`}
          accent
        />
        <StatCard
          label="Citizenship"
          value={`${summary.citizenshipDone} / ${summary.citizenshipTotal}`}
          hint="steps complete"
        />
        <StatCard
          label="Next payment"
          value={summary.nextDue ? formatUsdCompact(summary.nextDue.amountUsd) : "—"}
          hint={summary.nextDue ? `Due ${summary.nextDue.dueDate}` : "Nothing due"}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel
          title="Citizenship progress"
          action={
            <Link
              href="/portal/citizenship"
              className="text-sm font-semibold text-navy hover:underline"
            >
              View all
            </Link>
          }
        >
          {activeStep ? (
            <div className="rounded-lg border border-navy/15 bg-navy/5 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-navy">
                <CalendarClock size={16} /> Current step: {activeStep.title}
              </p>
              {activeStep.note && (
                <p className="mt-1 text-sm text-ink/75">{activeStep.note}</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted">All steps complete.</p>
          )}
          <ul className="mt-4 space-y-2 text-sm">
            {steps.slice(0, 4).map((s) => (
              <li key={s.key} className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    s.status === "done"
                      ? "bg-ok"
                      : s.status === "active"
                        ? "bg-gold"
                        : "bg-line"
                  }`}
                />
                <span className={s.status === "pending" ? "text-muted" : ""}>
                  {s.title}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          title="Quick actions"
        >
          <div className="grid gap-3">
            {[
              ["Browse new projects", "/portal/projects"],
              ["View my documents", "/portal/documents"],
              ["Open a support ticket", "/portal/aftersales"],
              ["See payment schedule", "/portal/purchases"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between rounded-lg border border-line px-4 py-3 text-sm font-medium text-ink transition hover:border-gold hover:bg-gold-soft/30"
              >
                {label} <ArrowRight size={15} className="text-gold" />
              </Link>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
