/**
 * Market Pulse — live-feed news content about Turkey, Turkish real estate,
 * citizenship-by-investment, and currency.
 *
 * DEMO: a fixed pool of headlines + ticker stats. The page simulates a live
 * feed by cycling items in over time.
 *
 * LIVE: replace getPulseItems() with a server fetch from a news API / RSS
 * aggregator (e.g. Turkey real-estate + macro feeds), and getTicker() with a
 * markets data provider (USD/TRY, BIST100, policy rate, gold). The UI does not
 * change — only these two functions.
 */

export type PulseCategory =
  | "Economy"
  | "Real Estate"
  | "Citizenship"
  | "Currency"
  | "Markets"
  | "Global";

export interface PulseItem {
  id: string;
  category: PulseCategory;
  headline: string;
  source: string;
  minutesAgo: number;
  sentiment: "up" | "down" | "neutral";
}

export interface TickerStat {
  label: string;
  value: string;
  change: string;
  dir: "up" | "down" | "flat";
}

const POOL: PulseItem[] = [
  { id: "n1", category: "Currency", headline: "Turkish lira steadies against the dollar as central bank holds rates", source: "PQT Market Desk (sample)", minutesAgo: 3, sentiment: "up" },
  { id: "n2", category: "Real Estate", headline: "Istanbul home prices climb 9.4% year-on-year, led by Beşiktaş and Şişli", source: "PQT Property Brief (sample)", minutesAgo: 7, sentiment: "up" },
  { id: "n3", category: "Citizenship", headline: "Turkey reaffirms $400,000 minimum for citizenship-by-investment programme", source: "PQT Citizenship Monitor (sample)", minutesAgo: 12, sentiment: "neutral" },
  { id: "n4", category: "Economy", headline: "Turkey's GDP grows 3.8% in Q1, beating analyst expectations", source: "PQT Economy Watch (sample)", minutesAgo: 18, sentiment: "up" },
  { id: "n5", category: "Real Estate", headline: "Foreign property purchases in Turkey rise as Gulf buyers return", source: "PQT Istanbul Desk (sample)", minutesAgo: 24, sentiment: "up" },
  { id: "n6", category: "Markets", headline: "BIST 100 closes at record high on banking sector strength", source: "PQT Market Desk (sample)", minutesAgo: 31, sentiment: "up" },
  { id: "n7", category: "Currency", headline: "USD/TRY volatility narrows as inflation cools for a third month", source: "PQT Economy Watch (sample)", minutesAgo: 38, sentiment: "neutral" },
  { id: "n8", category: "Citizenship", headline: "Average citizenship processing time falls to under 4 months, officials say", source: "PQT Citizenship Monitor (sample)", minutesAgo: 45, sentiment: "up" },
  { id: "n9", category: "Real Estate", headline: "New metro line approved for Başakşehir — analysts flag rental upside", source: "PQT Property Brief (sample)", minutesAgo: 52, sentiment: "up" },
  { id: "n10", category: "Global", headline: "Gulf sovereign funds increase allocation to Turkish real estate", source: "PQT Global Brief (sample)", minutesAgo: 61, sentiment: "up" },
  { id: "n11", category: "Economy", headline: "Tourism revenue hits record $60bn, supporting the current account", source: "PQT Istanbul Desk (sample)", minutesAgo: 70, sentiment: "up" },
  { id: "n12", category: "Real Estate", headline: "Branded residences drive premium-segment demand in central Istanbul", source: "PQT Property Brief (sample)", minutesAgo: 78, sentiment: "up" },
  { id: "n13", category: "Currency", headline: "Central bank reserves rise for a sixth straight week", source: "PQT Market Desk (sample)", minutesAgo: 86, sentiment: "up" },
  { id: "n14", category: "Citizenship", headline: "Demand for Turkish passports steady among South Asian investors", source: "PQT Citizenship Monitor (sample)", minutesAgo: 95, sentiment: "neutral" },
  { id: "n15", category: "Markets", headline: "Construction sector PMI signals expansion for the fourth month", source: "PQT Economy Watch (sample)", minutesAgo: 104, sentiment: "up" },
  { id: "n16", category: "Global", headline: "Istanbul ranked among top 10 cities for cross-border property investment", source: "PQT Global Brief (sample)", minutesAgo: 112, sentiment: "up" },
];

export async function getPulseItems(): Promise<PulseItem[]> {
  return POOL;
}

export async function getTicker(): Promise<TickerStat[]> {
  return [
    { label: "USD/TRY", value: "32.18", change: "-0.3%", dir: "down" },
    { label: "BIST 100", value: "9,847", change: "+1.2%", dir: "up" },
    { label: "Istanbul $/m²", value: "$3,420", change: "+0.8%", dir: "up" },
    { label: "Policy rate", value: "45.0%", change: "0.0", dir: "flat" },
    { label: "Gold (gr)", value: "₺2,410", change: "+0.5%", dir: "up" },
    { label: "Citizenship min.", value: "$400,000", change: "stable", dir: "flat" },
  ];
}
