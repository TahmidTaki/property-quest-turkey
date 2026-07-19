"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import type { PmsListItem } from "@/lib/pms/client";
import { formatUsdCompact } from "@/lib/format";

const ROTATE_INTERVAL = 1800;

const GRADIENTS = [
  "from-navy to-[#0066a6]",
  "from-ink to-[#4a3c6b]",
  "from-[#2d5f3f] to-[#7ca870]",
  "from-[#1f2a44] to-[#5b6b9c]",
  "from-[#1a6a8a] to-[#6fc3d9]",
];

function getGradient(id: string): string {
  const index = id.length % GRADIENTS.length;
  return GRADIENTS[index];
}

function parsePrice(value: string | null): number {
  if (!value) return 0;
  return Number(value);
}

function getStatusColor(status: PmsListItem["status"]): string {
  const map: Record<PmsListItem["status"], string> = {
    off_plan: "badge-gold",
    under_construction: "badge-red",
    ready: "badge-ok",
    completed: "badge-ok",
    resale: "badge-red",
  };
  return map[status] || "badge-red";
}

export function FeaturedSpotlight({ properties }: { properties: PmsListItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = properties.length;

  useEffect(() => {
    if (totalSlides === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, ROTATE_INTERVAL);

    return () => clearInterval(interval);
  }, [totalSlides, isPaused]);

  const goToSlide = (index: number) => {
    setCurrentIndex((index + totalSlides) % totalSlides);
  };

  const goPrev = () => goToSlide(currentIndex - 1);
  const goNext = () => goToSlide(currentIndex + 1);

  if (totalSlides === 0) {
    return (
      <section className="py-16">
        <div className="container-x text-center text-muted dark:text-dark-muted">
          No featured properties available.
        </div>
      </section>
    );
  }

  const property = properties[currentIndex];
  const price = parsePrice(property.starting_price_usd);
  const gradient = getGradient(property.id);
  const statusColor = getStatusColor(property.status);

  return (
    <section className="bg-ivory py-16 dark:bg-dark-bg">
      <div className="container-x">
        <div className="flex items-end justify-between">
          <div>
            <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.16em] text-red dark:text-red-400">
              Featured properties
            </p>
            <h2 className="text-3xl text-navy dark:text-blue-300 sm:text-4xl">
              This month&apos;s spotlight
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={goPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-navy transition hover:bg-navy hover:text-white dark:border-dark-border dark:bg-dark-card dark:text-dark-text dark:hover:bg-navy"
              aria-label="Previous property"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-navy transition hover:bg-navy hover:text-white dark:border-dark-border dark:bg-dark-card dark:text-dark-text dark:hover:bg-navy"
              aria-label="Next property"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          className="mt-6 grid overflow-hidden rounded-2xl border border-line bg-white shadow-lift dark:border-dark-border dark:bg-dark-card dark:shadow-dark-lift lg:grid-cols-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative h-64 lg:h-auto">
            {property.cover_image_url ? (
              <Image
                src={property.cover_image_url}
                alt={property.listing_title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className={`flex h-full items-center justify-center bg-gradient-to-br ${gradient} text-white/50`}>
                <span className="text-6xl font-serif">{property.listing_title?.charAt(0) || "P"}</span>
              </div>
            )}
            <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
              <span className={`badge ${statusColor}`}>{property.status}</span>
              {property.cbi_eligible && (
                <span className="badge badge-red">Citizenship eligible</span>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-navy dark:text-blue-300 sm:text-2xl">
              {property.listing_title}
            </h3>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted dark:text-dark-muted">
              <MapPin size={15} /> {property.district_name || "Istanbul"}, Istanbul
            </p>

            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-xs text-muted dark:text-dark-muted">Developer</dt>
                <dd className="font-semibold text-ink dark:text-dark-text">PQT Verified</dd>
              </div>
              <div>
                <dt className="text-xs text-muted dark:text-dark-muted">Bedrooms</dt>
                <dd className="font-semibold text-ink dark:text-dark-text">
                  {property.bedrooms_summary || "TBC"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted dark:text-dark-muted">Status</dt>
                <dd className="font-semibold text-ink dark:text-dark-text">
                  {property.status}
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 dark:border-dark-border">
              <div>
                <p className="text-xs text-muted dark:text-dark-muted">Starting from</p>
                <p className="text-2xl font-extrabold text-red dark:text-red-400 sm:text-3xl">
                  {price > 0 ? formatUsdCompact(price) : "Contact us"}
                </p>
              </div>
              <Link
                href={`/projects/${property.pqt_code}?beds=${property.bedrooms_summary || ''}`}
                className="btn btn-primary"
              >
                View details
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-1.5">
          {properties.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-6 bg-gold h-2 sm:w-8 sm:h-2.5"
                  : "w-2 h-2 bg-white/30 hover:bg-white/50 sm:w-2.5 sm:h-2.5 dark:bg-gray-600 dark:hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}