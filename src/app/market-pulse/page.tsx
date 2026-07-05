import type { Metadata } from "next";
import { Radio } from "lucide-react";
import { MarketPulseFeed } from "@/components/pulse/MarketPulseFeed";
import { getPulseItems, getTicker } from "@/lib/content/marketPulse";

export const metadata: Metadata = {
  title: "Market Pulse — Turkey Investment News (Demo)",
  description:
    "A live-style feed of news on Turkey's economy, real estate, citizenship-by-investment and currency — curated by Property Quest Turkey.",
};

export default async function MarketPulsePage() {
  const [items, ticker] = await Promise.all([getPulseItems(), getTicker()]);

  return (
    <div className="min-h-screen bg-[#0a1a2f]">
      {/* Newsroom header */}
      <section className="border-b border-white/10 bg-[#0c2038]">
        <div className="container-x py-12">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="flex items-center gap-1.5 rounded-full bg-red px-2.5 py-1 text-xs font-bold text-white">
              <Radio size={12} className="animate-pulse" /> LIVE · DEMO
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
              PQT Intelligence · Market Pulse
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl text-white sm:text-5xl">
            The pulse of Turkish investment — as it happens.
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Headlines on Turkey&apos;s economy, real estate, citizenship and
            currency, streaming in continuously. Filter by what matters to your
            portfolio.
          </p>
          <p className="mt-3 max-w-2xl rounded-lg border border-warn/40 bg-warn/10 px-3.5 py-2 text-xs font-semibold text-warn">
            Demonstration feed — sample headlines and indicative figures. Live
            news and market data sources connect at full launch.
          </p>
        </div>
      </section>

      {/* Live feed */}
      <div className="container-x py-2 pb-16">
        <MarketPulseFeed items={items} ticker={ticker} />
      </div>
    </div>
  );
}
