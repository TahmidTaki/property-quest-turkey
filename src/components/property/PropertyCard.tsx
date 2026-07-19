import Link from "next/link";
import Image from "next/image";
import { MapPin, BedDouble } from "lucide-react";
import type { PmsListItem } from "@/lib/pms/client";
import { formatUsdCompact, gradientClass } from "@/lib/format";

function getGradientForProperty(id: string): string {
  const gradients = Object.keys(gradientClass);
  const index = id.length % gradients.length;
  return gradientClass[gradients[index]] || gradientClass.bosphorus;
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

function parsePrice(value: string | null): number {
  if (!value) return 0;
  return Number(value);
}

export function PropertyCard({ property }: { property: PmsListItem }) {
  const price = parsePrice(property.starting_price_usd);
  const gradient = getGradientForProperty(property.id);
  const statusColor = getStatusColor(property.status);

  return (
    <Link
      href={`/projects/${property.pqt_code}?beds=${property.bedrooms_summary || ''}`}
      className="group block overflow-hidden rounded-xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-lift dark:border-dark-border dark:bg-dark-card"
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
        {property.cover_image_url ? (
          <Image
            src={property.cover_image_url}
            alt={property.listing_title}
            fill
            className="object-cover transition group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className={`flex h-full items-center justify-center bg-gradient-to-br ${gradient} text-white/50`}>
            <span className="text-4xl font-serif">{property.listing_title?.charAt(0) || "P"}</span>
          </div>
        )}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          <span className={`badge ${statusColor}`}>{property.status}</span>
          {property.cbi_eligible === true && (
            <span className="badge badge-red">Citizenship eligible</span>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1.5 text-sm text-muted dark:text-dark-muted">
          <MapPin size={14} /> {property.district_name || "Istanbul"}, Istanbul
        </div>
        <h3 className="mt-1.5 text-base font-semibold text-ink dark:text-dark-text line-clamp-1">
          {property.listing_title}
        </h3>
        <p className="mt-1 text-xs text-muted dark:text-dark-muted">
          {property.sale_status}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted dark:text-dark-muted">From</p>
            <p className="tabular text-xl font-extrabold text-red dark:text-red-400">
              {price > 0 ? formatUsdCompact(price) : "Contact us"}
            </p>
          </div>
          <div className="text-right text-xs text-muted dark:text-dark-muted">
            <p className="flex items-center justify-end gap-1">
              <BedDouble size={13} /> {property.bedrooms_summary || " "} bed
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}