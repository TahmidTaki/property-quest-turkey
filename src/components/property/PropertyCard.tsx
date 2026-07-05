import Link from "next/link";
import { MapPin, BedDouble } from "lucide-react";
import type { PublicProperty } from "@/lib/content/types";
import {
  formatUsdCompact,
  formatDelivery,
  statusLabel,
  gradientClass,
} from "@/lib/format";

export function PropertyCard({ p }: { p: PublicProperty }) {
  const minBeds = Math.min(...p.unitTypes.map((u) => u.bedrooms));
  const maxBeds = Math.max(...p.unitTypes.map((u) => u.bedrooms));
  const bedRange = minBeds === maxBeds ? `${minBeds}` : `${minBeds}–${maxBeds}`;

  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group block overflow-hidden rounded-xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-lift"
    >
      <div
        className={`relative flex h-44 items-end p-4 text-white ${gradientClass[p.gradient]}`}
      >
        <span className="absolute right-3.5 top-3.5 badge badge-red">
          {statusLabel[p.status]}
        </span>
        {p.citizenship === "eligible" && (
          <span className="absolute left-3.5 top-3.5 badge badge-gold">
            Citizenship eligible
          </span>
        )}
        <span className="font-serif text-lg font-semibold drop-shadow">
          {p.title}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-sm text-muted">
          <MapPin size={14} /> {p.district}, {p.city}
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-ink/80">
          {p.shortDescription}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted">From</p>
            <p className="tabular text-xl font-extrabold text-red">
              {formatUsdCompact(p.priceUsdFrom)}
            </p>
          </div>
          <div className="text-right text-xs text-muted">
            <p className="flex items-center justify-end gap-1">
              <BedDouble size={13} /> {bedRange} bed
            </p>
            <p className="mt-1">{formatDelivery(p.deliveryDate)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
