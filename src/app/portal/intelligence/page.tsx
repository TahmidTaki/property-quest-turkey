import { TrendingUp, Info, AlertTriangle, Lock } from "lucide-react";
import { getSession } from "@/lib/auth/demo-session";
import { getPortfolioSummary } from "@/lib/content/portfolio";
import {
  getValueHistory,
  getMarketIndex,
  getAllocation,
  getInsights,
  getInternalIntelligence,
} from "@/lib/content/intelligence";
import { formatUsd, formatUsdCompact } from "@/lib/format";
import {
  PortalTitle,
  StatCard,
  Panel,
  SampleDataBadge,
} from "@/components/portal/ui";
import { AreaChart, BarChart, Donut } from "@/components/charts/Charts";

export default async function IntelligencePage() {
  const session = await getSession();
  const isAgent = session?.role === "agent";

  const [summary, history, market, allocation, insights] = await Promise.all([
    getPortfolioSummary(),
    getValueHistory(),
    getMarketIndex(),
    getAllocation(),
    getInsights(),
  ]);

  const toneIcon = { good: TrendingUp, info: Info, warn: AlertTriangle };
  const toneClass = {
    good: "border-ok/30 bg-ok/5 text-ok",
    info: "border-navy/20 bg-navy/5 text-navy",
    warn: "border-warn/30 bg-warn/10 text-warn",
  };

  return (
    <>
      <PortalTitle
        title="PQT Intelligence"
        subtitle="Analytics and insights about your investment only — your data is private to you."
      />

      {/* What-you-see banner (mirrors the access rules) */}
      <div className="mb-6 rounded-lg border border-gold/40 bg-gold-soft/40 p-4 text-sm text-ink/80">
        <strong>You see:</strong> your portfolio value, your ROI, your citizenship
        progress, and market data for your areas.
        {isAgent && (
          <>
            {" "}
            <strong className="text-red">Agent mode</strong> also reveals
            pipeline, all-client totals and commissions — hidden from clients.
          </>
        )}
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Portfolio value" value={formatUsd(summary.value)} accent />
        <StatCard
          label="Total return"
          value={`+${summary.gainPct.toFixed(1)}%`}
          hint={`${formatUsd(summary.gain)} gain`}
        />
        <StatCard label="Invested" value={formatUsd(summary.invested)} hint={`${summary.holdings} properties`} />
        <StatCard
          label="Citizenship"
          value={`${summary.citizenshipDone} / ${summary.citizenshipTotal}`}
          hint="steps complete"
        />
      </div>

      {/* Charts row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Portfolio value trend">
          <AreaChart
            values={history.map((h) => h.valueUsd)}
            labels={history.map((h) => h.month)}
          />
          <p className="mt-2 text-xs text-muted">
            Estimated total value · last {history.length} months
          </p>
        </Panel>

        <Panel title="Allocation by project">
          <Donut
            segments={allocation.map((a) => ({
              label: a.label,
              value: a.valueUsd,
              color: a.color,
            }))}
          />
        </Panel>
      </div>

      {/* Market index */}
      <div className="mt-6">
        <Panel title={`${market.district} price index (your area)`}>
          <BarChart
            data={market.points.map((p) => ({
              label: p.month,
              value: p.pricePerSqm,
            }))}
            format={(n) => `$${(n / 1000).toFixed(1)}k`}
          />
          <p className="mt-2 text-xs text-muted">
            Average $/m² in {market.district}, Istanbul · last 6 months
          </p>
        </Panel>
      </div>

      {/* Insights */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {insights.map((ins) => {
          const Icon = toneIcon[ins.tone];
          return (
            <div
              key={ins.title}
              className={`rounded-xl border p-4 ${toneClass[ins.tone]}`}
            >
              <Icon size={18} />
              <h3 className="mt-2 text-sm font-bold text-ink">{ins.title}</h3>
              <p className="mt-1 text-sm text-ink/70">{ins.body}</p>
            </div>
          );
        })}
      </div>

      {/* AGENT ONLY — internal intelligence */}
      {isAgent && <InternalIntelligence />}
    </>
  );
}

async function InternalIntelligence() {
  const intel = await getInternalIntelligence();
  return (
    <div className="mt-6 rounded-xl border border-confidential-border bg-confidential p-5">
      <h2 className="flex items-center gap-2 text-lg text-red">
        <Lock size={18} /> Internal Intelligence — agents only
      </h2>
      <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-ink/70">
        Confidential view. Never shown to clients. <SampleDataBadge />
      </p>
      <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Active pipeline" value={`${formatUsdCompact(intel.activePipelineUsd)} · ${intel.activeDeals} deals`} />
        <Metric label="Client lifetime value" value={`${formatUsd(intel.clientLifetimeValueUsd)} · ${intel.clientDeals} deals`} />
        <Metric label="Commission owed" value={formatUsd(intel.commissionOwedUsd)} />
        <Metric label="Top lead source" value={intel.topLeadSource} />
      </dl>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-0.5 font-semibold text-ink">{value}</dd>
    </div>
  );
}
