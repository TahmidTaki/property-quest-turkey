import { getSession } from "@/lib/auth/demo-session";
import { getHoldings, getPortfolioSummary } from "@/lib/content/portfolio";
import { formatUsd, gradientClass } from "@/lib/format";
import {
  PortalTitle,
  StatCard,
  StatusPill,
  SampleDataBadge,
} from "@/components/portal/ui";

export default async function PortfolioPage() {
  const session = await getSession();
  const isAgent = session?.role === "agent";
  const [holdings, summary] = await Promise.all([
    getHoldings(),
    getPortfolioSummary(),
  ]);

  return (
    <>
      <PortalTitle
        title="My portfolio"
        subtitle="Your properties, their current value, and performance."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Invested" value={formatUsd(summary.invested)} />
        <StatCard label="Current value" value={formatUsd(summary.value)} accent />
        <StatCard
          label="Unrealised gain"
          value={formatUsd(summary.gain)}
          hint={`+${summary.gainPct.toFixed(1)}%`}
        />
      </div>

      <div className="mt-6 space-y-4">
        {holdings.map((h) => (
          <div key={h.id} className="card flex flex-col overflow-hidden sm:flex-row">
            <div className={`h-28 sm:h-auto sm:w-40 ${gradientClass[h.gradient]}`} />
            <div className="flex-1 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg text-navy">{h.project}</h3>
                  <p className="text-sm text-muted">{h.unit}</p>
                  <p className="text-xs text-muted">{h.district}, Istanbul</p>
                </div>
                <StatusPill status={h.status} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Mini label="Purchase price" value={formatUsd(h.purchasePriceUsd)} />
                <Mini label="Current value" value={formatUsd(h.currentValueUsd)} />
                <Mini
                  label="Gain"
                  value={formatUsd(h.currentValueUsd - h.purchasePriceUsd)}
                />
                <Mini label="Purchased" value={h.purchasedOn} />
              </div>

              {isAgent && (
                <div className="mt-4 rounded-lg border border-confidential-border bg-confidential p-3 text-xs">
                  <span className="font-semibold text-red">🔒 Internal: </span>
                  est. cost basis {formatUsd(Math.round(h.purchasePriceUsd * 0.82))} ·
                  commission 4.5% · lead source: referral{" "}
                  <SampleDataBadge />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted">{label}</p>
      <p className="tabular text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}
