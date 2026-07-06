"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  BedDouble,
  CalendarDays,
  BadgeCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import type { PublicProperty } from "@/lib/content/types";
import {
  formatUsd,
  formatDelivery,
  statusLabel,
  gradientClass,
} from "@/lib/format";
import { useReducedMotion } from "@/components/useReducedMotion";

const ROTATE_MS = 3000;

/** Auto-rotating featured-property spotlight. */
export function FeaturedSpotlight({
  properties,
}: {
  properties: PublicProperty[];
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const count = properties.length;
  const halted = paused || userPaused || reducedMotion;

  useEffect(() => {
    if (halted || count <= 1) return;
    const id = setInterval(() => setI((v) => (v + 1) % count), ROTATE_MS);
    return () => clearInterval(id);
  }, [halted, count]);

  if (count === 0) return null;
  const p = properties[i];
  const minBeds = Math.min(...p.unitTypes.map((u) => u.bedrooms));
  const maxBeds = Math.max(...p.unitTypes.map((u) => u.bedrooms));
  const bedRange = minBeds === maxBeds ? `${minBeds}` : `${minBeds}–${maxBeds}`;

  const go = (n: number) => setI((n + count) % count);

  return (
    <section className="bg-ivory py-16 sm:py-20">
      <div className="container-x">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.16em] text-red">
              Featured properties
            </p>
            <h2 className="text-3xl text-navy sm:text-4xl">
              This month&apos;s spotlight
            </h2>
          </div>
          {/* Controls — visible on all screen sizes */}
          <div className="flex gap-2">
            <button
              onClick={() => setUserPaused((v) => !v)}
              aria-pressed={userPaused}
              aria-label={userPaused ? "Resume rotation" : "Pause rotation"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-navy transition hover:border-navy hover:bg-navy hover:text-white"
            >
              {userPaused ? <Play size={16} /> : <Pause size={16} />}
            </button>
            <button
              onClick={() => go(i - 1)}
              aria-label="Previous property"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-navy transition hover:border-navy hover:bg-navy hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => go(i + 1)}
              aria-label="Next property"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-navy transition hover:border-navy hover:bg-navy hover:text-white"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="grid overflow-hidden rounded-2xl border border-line bg-white shadow-lift lg:grid-cols-2"
        >
          {/* Visual */}
          <div
            key={`v-${p.id}`}
            className={`animate-pop-in relative flex min-h-[300px] items-end p-7 text-white ${gradientClass[p.gradient]}`}
          >
            <span className="absolute left-5 top-5 badge badge-gold">
              ★ Featured
            </span>
            {p.citizenship === "eligible" && (
              <span className="absolute right-5 top-5 badge badge-red">
                Citizenship eligible
              </span>
            )}
            <div>
              <h3 className="font-serif text-3xl font-semibold drop-shadow">
                {p.title}
              </h3>
              <p className="mt-1 flex items-center gap-1.5 text-white/85">
                <MapPin size={15} /> {p.district}, {p.city}
              </p>
            </div>
          </div>

          {/* Details */}
          <div key={`d-${p.id}`} className="animate-pop-in flex flex-col justify-center p-7 sm:p-9">
            <p className="text-sm leading-relaxed text-ink/80">
              {p.shortDescription}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-5">
              <Fact icon={MapPin} label="Developer" value={p.developer} />
              <Fact
                icon={CalendarDays}
                label="Delivery"
                value={formatDelivery(p.deliveryDate)}
              />
              <Fact icon={BedDouble} label="Bedrooms" value={`${bedRange} bed`} />
              <Fact icon={BadgeCheck} label="Status" value={statusLabel[p.status]} />
            </dl>

            <div className="mt-7 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs text-muted">Starting from</p>
                <p className="tabular text-3xl font-extrabold text-red">
                  {formatUsd(p.priceUsdFrom)}
                </p>
              </div>
              <div className="flex gap-2.5">
                <Link href={`/projects/${p.slug}`} className="btn btn-outline">
                  View details
                </Link>
                <Link href={`/buy/${p.slug}`} className="btn btn-primary">
                  Reserve <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Dots — padded hit targets for touch */}
        <div className="mt-5 flex justify-center gap-1">
          {properties.map((prop, idx) => (
            <button
              key={prop.id}
              onClick={() => go(idx)}
              aria-label={`Show ${prop.title}`}
              aria-current={idx === i}
              className="group p-2"
            >
              <span
                className={`block h-2.5 rounded-full transition-all ${
                  idx === i
                    ? "w-8 bg-navy"
                    : "w-2.5 bg-line group-hover:bg-muted"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon size={18} className="mt-0.5 shrink-0 text-gold" />
      <div>
        <dt className="text-xs text-muted">{label}</dt>
        <dd className="text-sm font-semibold text-ink">{value}</dd>
      </div>
    </div>
  );
}
