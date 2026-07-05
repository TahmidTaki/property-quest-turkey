/**
 * PQT Intelligence — client-facing analytics for the demo client.
 *
 * ACCESS RULE (per PQT access rules): a client sees ONLY their own analytics —
 * portfolio value, ROI, citizenship progress, and market data relevant to the
 * districts they hold. Internal analytics (pipeline, all-client totals,
 * commissions, lead sources) are exposed ONLY to the agent role via
 * getInternalIntelligence() and must never render for a client.
 *
 * LIVE: replace these getters with PMS reads scoped to the owner.
 */

export interface ValuePoint {
  month: string; // "Nov"
  valueUsd: number;
}

export interface MarketPoint {
  month: string;
  pricePerSqm: number;
}

export interface Allocation {
  label: string;
  valueUsd: number;
  color: string;
}

export interface Insight {
  title: string;
  body: string;
  tone: "good" | "info" | "warn";
}

/** Portfolio value over the last 8 months (sample). */
export async function getValueHistory(): Promise<ValuePoint[]> {
  return [
    { month: "Nov", valueUsd: 1015000 },
    { month: "Dec", valueUsd: 1028000 },
    { month: "Jan", valueUsd: 1041000 },
    { month: "Feb", valueUsd: 1062000 },
    { month: "Mar", valueUsd: 1078000 },
    { month: "Apr", valueUsd: 1094000 },
    { month: "May", valueUsd: 1108000 },
    { month: "Jun", valueUsd: 1117000 },
  ];
}

/** Market $/m² index for the client's primary district (Beşiktaş). */
export async function getMarketIndex(): Promise<{
  district: string;
  points: MarketPoint[];
}> {
  return {
    district: "Beşiktaş",
    points: [
      { month: "Jan", pricePerSqm: 5800 },
      { month: "Feb", pricePerSqm: 5950 },
      { month: "Mar", pricePerSqm: 6080 },
      { month: "Apr", pricePerSqm: 6190 },
      { month: "May", pricePerSqm: 6310 },
      { month: "Jun", pricePerSqm: 6450 },
    ],
  };
}

/** Portfolio allocation by project (sample). */
export async function getAllocation(): Promise<Allocation[]> {
  return [
    { label: "Bosphorus Residences", valueUsd: 812000, color: "#013684" },
    { label: "Garden Terraces", valueUsd: 305000, color: "#D4A84B" },
  ];
}

export async function getInsights(): Promise<Insight[]> {
  return [
    {
      title: "Your Beşiktaş holding is outperforming",
      body: "Bosphorus Residences is up 12.8% since purchase — ahead of the district average of 9.4%.",
      tone: "good",
    },
    {
      title: "Rental yield estimate",
      body: "Based on current Beşiktaş rents, your 2+1 could yield an estimated 5.1% gross per year.",
      tone: "info",
    },
    {
      title: "Upcoming payment",
      body: "A Garden Terraces instalment of $88,500 is due 1 Aug 2026.",
      tone: "warn",
    },
  ];
}

/**
 * INTERNAL / AGENT ONLY. Never call this for a client-rendered view.
 * Illustrative figures to demonstrate the confidential analytics boundary.
 */
export async function getInternalIntelligence() {
  return {
    activePipelineUsd: 12_400_000,
    activeDeals: 28,
    clientLifetimeValueUsd: 1_017_000,
    clientDeals: 2,
    commissionOwedUsd: 45_765,
    topLeadSource: "Dubai events — 34% of leads",
  };
}
