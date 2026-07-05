"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Radio,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Pause,
  Play,
} from "lucide-react";
import type { PulseItem, TickerStat } from "@/lib/content/marketPulse";
import { useReducedMotion } from "@/components/useReducedMotion";

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

/** Compact homepage version of Market Pulse — ticker + rotating headline. */
export function LivePulseBand({
  items,
  ticker,
}: {
  items: PulseItem[];
  ticker: TickerStat[];
}) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const halted = paused || reducedMotion;

  useEffect(() => {
    if (items.length <= 1 || halted) return;
    const id = setInterval(() => setIdx((v) => (v + 1) % items.length), 4000);
    return () => clearInterval(id);
  }, [items.length, halted]);

  const item = items[idx];

  return (
    <section
      className={`bg-[#0a1a2f] ${halted ? "marquee-paused" : ""}`}
      aria-label="Market Pulse demo feed"
    >
      {/* Ticker (second copy is decorative, hidden from screen readers) */}
      <div className="overflow-hidden border-b border-white/10">
        <div className="flex animate-marquee whitespace-nowrap py-2.5">
          <TickerRow ticker={ticker} />
          <TickerRow ticker={ticker} hidden />
        </div>
      </div>

      {/* Rotating headline */}
      <div className="container-x flex flex-wrap items-center gap-x-5 gap-y-2 py-4">
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-red px-2.5 py-1 text-xs font-bold text-white">
          <Radio size={12} className={halted ? "" : "animate-pulse"} /> LIVE ·
          DEMO
        </span>
        <p
          key={item.id}
          className="animate-pop-in flex min-w-0 flex-1 items-center gap-2 text-sm text-white/90"
        >
          {item.sentiment === "up" ? (
            <TrendingUp size={15} className="shrink-0 text-emerald-400" />
          ) : item.sentiment === "down" ? (
            <TrendingDown size={15} className="shrink-0 text-rose-400" />
          ) : null}
          <span className="truncate">
            <span className="font-semibold text-gold">{item.category}:</span>{" "}
            {item.headline}
          </span>
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={() => setPaused((v) => !v)}
            aria-pressed={paused}
            aria-label={paused ? "Resume updates" : "Pause updates"}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20"
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}
          </button>
          <Link
            href="/market-pulse"
            className="flex items-center gap-1.5 text-sm font-semibold text-gold hover:underline"
          >
            Open Market Pulse <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
