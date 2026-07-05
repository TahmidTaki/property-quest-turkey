"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp, TrendingDown, Minus, Radio, Pause, Play } from "lucide-react";
import type { PulseItem, PulseCategory, TickerStat } from "@/lib/content/marketPulse";
import { useReducedMotion } from "@/components/useReducedMotion";

const CATEGORIES: (PulseCategory | "All")[] = [
  "All",
  "Economy",
  "Real Estate",
  "Citizenship",
  "Currency",
  "Markets",
  "Global",
];

const catColor: Record<PulseCategory, string> = {
  Economy: "bg-blue-500/15 text-blue-300",
  "Real Estate": "bg-gold/20 text-gold",
  Citizenship: "bg-emerald-500/15 text-emerald-300",
  Currency: "bg-purple-500/15 text-purple-300",
  Markets: "bg-sky-500/15 text-sky-300",
  Global: "bg-rose-500/15 text-rose-300",
};

interface FeedEntry extends PulseItem {
  key: string;
  shownMinutes: number;
  fresh: boolean;
}

function relTime(min: number): string {
  if (min <= 0) return "just now";
  if (min === 1) return "1 min ago";
  if (min < 60) return `${min} min ago`;
  const h = Math.floor(min / 60);
  return h === 1 ? "1 hr ago" : `${h} hrs ago`;
}

function TickerRow({ ticker, hidden }: { ticker: TickerStat[]; hidden?: boolean }) {
  return (
    <span aria-hidden={hidden || undefined} className="inline-flex">
      {ticker.map((t, i) => (
        <span key={i} className="mx-6 inline-flex items-center gap-2 text-sm">
          <span className="font-semibold text-white/85">{t.label}</span>
          <span className="tabular text-white">{t.value}</span>
          <span
            className={
              t.dir === "up"
                ? "text-emerald-400"
                : t.dir === "down"
                  ? "text-rose-400"
                  : "text-white/60"
            }
          >
            {t.change}
          </span>
        </span>
      ))}
    </span>
  );
}

export function MarketPulseFeed({
  items,
  ticker,
}: {
  items: PulseItem[];
  ticker: TickerStat[];
}) {
  const [feed, setFeed] = useState<FeedEntry[]>([]);
  const [filter, setFilter] = useState<PulseCategory | "All">("All");
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const poolIndex = useRef(0);
  const counter = useRef(0);
  const halted = paused || reducedMotion;

  // Seed initial feed (newest first).
  useEffect(() => {
    const seed: FeedEntry[] = items.slice(0, 7).map((it, i) => ({
      ...it,
      key: `seed-${it.id}-${i}`,
      shownMinutes: it.minutesAgo,
      fresh: false,
    }));
    setFeed(seed);
    poolIndex.current = 7 % items.length;
  }, [items]);

  // Pop a new item in periodically + age existing items.
  useEffect(() => {
    if (halted) return;
    const id = setInterval(() => {
      counter.current += 1;
      const next = items[poolIndex.current % items.length];
      poolIndex.current += 1;
      const entry: FeedEntry = {
        ...next,
        key: `live-${next.id}-${counter.current}`,
        shownMinutes: 0,
        fresh: true,
      };
      setFeed((prev) => {
        const aged = prev.map((e) => ({
          ...e,
          shownMinutes: e.shownMinutes + 1,
          fresh: false,
        }));
        return [entry, ...aged].slice(0, 24);
      });
    }, 4000);
    return () => clearInterval(id);
  }, [items, halted]);

  const visible =
    filter === "All" ? feed : feed.filter((e) => e.category === filter);

  return (
    <div className={halted ? "marquee-paused" : ""}>
      {/* Live ticker (duplicate copy hidden from screen readers) */}
      <div className="overflow-hidden border-y border-white/10 bg-black/30">
        <div className="flex animate-marquee whitespace-nowrap py-2.5">
          <TickerRow ticker={ticker} />
          <TickerRow ticker={ticker} hidden />
        </div>
      </div>

      {/* Controls: filter chips + pause */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              filter === c
                ? "bg-gold text-ink"
                : "bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            {c}
          </button>
        ))}
        <button
          onClick={() => setPaused((v) => !v)}
          aria-pressed={paused}
          className="ml-auto flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/85 transition hover:bg-white/20"
        >
          {paused ? <Play size={12} /> : <Pause size={12} />}
          {paused ? "Resume updates" : "Pause updates"}
        </button>
      </div>

      {/* Feed - Normal width cards */}
      <div className="mt-6 max-w-3xl mx-auto space-y-3">
        {visible.map((e) => {
          const SentIcon =
            e.sentiment === "up"
              ? TrendingUp
              : e.sentiment === "down"
                ? TrendingDown
                : Minus;
          return (
            <article
              key={e.key}
              className={`flex gap-4 rounded-xl border p-4 transition-all duration-500 ${
                e.fresh
                  ? "animate-pop-in border-gold/50 bg-gold/5"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <div className="flex flex-col items-center pt-0.5">
                <SentIcon
                  size={18}
                  className={
                    e.sentiment === "up"
                      ? "text-emerald-400"
                      : e.sentiment === "down"
                        ? "text-rose-400"
                        : "text-white/60"
                  }
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${catColor[e.category]}`}
                  >
                    {e.category}
                  </span>
                  {e.fresh && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-gold">
                      <Radio size={11} className="animate-pulse" /> LIVE · DEMO
                    </span>
                  )}
                </div>
                <h3 className="text-[15px] font-semibold leading-snug text-white">
                  {e.headline}
                </h3>
                <p className="mt-1 text-xs text-white/65">
                  {e.source} · {relTime(e.shownMinutes)}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}