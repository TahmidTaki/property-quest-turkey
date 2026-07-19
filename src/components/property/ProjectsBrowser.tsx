"use client";

import { useMemo, useState, useCallback } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  MapPin,
  MapPinned,
  Building2,
  Bed,
  DollarSign,
} from "lucide-react";
import type { PmsListItem } from "@/lib/pms/client";
import { PropertyCard } from "./PropertyCard";

const PROPERTY_TYPE_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "mixed_use", label: "Mixed Use" },
  { value: "land", label: "Land" },
];

const BEDROOM_OPTIONS = [
  { value: "any", label: "Any" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
];

const SIDE_OPTIONS = [
  { value: "all", label: "All Sides" },
  { value: "european", label: "European Side" },
  { value: "anatolian", label: "Anatolian Side" },
];

export function ProjectsBrowser({
  properties,
  districts,
  nextCursor: initialCursor,
  onLoadMore,
}: {
  properties: PmsListItem[];
  districts: string[];
  nextCursor?: string | null;
  onLoadMore?: (cursor: string) => Promise<{ items: PmsListItem[]; next_cursor: string | null }>;
}) {
  const [city, setCity] = useState("all");
  const [district, setDistrict] = useState("all");
  const [propertyType, setPropertyType] = useState("all");
  const [side, setSide] = useState("all");
  const [bedrooms, setBedrooms] = useState("any");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPriceRange, setShowPriceRange] = useState(false);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [allProperties, setAllProperties] = useState<PmsListItem[]>(properties);
  const [nextCursor, setNextCursor] = useState<string | null>(initialCursor || null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(!!initialCursor);

  const cities = ["Istanbul"];

  const filtered = useMemo(() => {
    return allProperties.filter((p) => {
      const title = p.listing_title?.toLowerCase() || "";
      const districtName = p.district_name?.toLowerCase() || "";

      if (searchQuery && !title.includes(searchQuery.toLowerCase()) && !districtName.includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (district !== "all" && p.district_name !== district) return false;
      if (propertyType !== "all" && p.category !== propertyType) return false;
      if (side !== "all" && p.side !== side) return false;
      if (bedrooms !== "any") {
      const minBeds = parseInt(bedrooms);
      const maxBeds = p.bedrooms_summary?.split("-").map(Number).pop() || 0;
      if (maxBeds < minBeds) return false;
      }
      const price = parsePrice(p.starting_price_usd);
      if (minPrice > 0 && price < minPrice) return false;
      if (maxPrice > 0 && price > maxPrice) return false;
      return true;
    });
  }, [allProperties, district, propertyType, side, minPrice, maxPrice, searchQuery]);

  const priceRangeLabel = useMemo(() => {
    if (minPrice === 0 && maxPrice === 0) return "Any Price";
    if (minPrice > 0 && maxPrice === 0) return `$${minPrice.toLocaleString()}+`;
    if (minPrice === 0 && maxPrice > 0) return `Up to $${maxPrice.toLocaleString()}`;
    return `$${minPrice.toLocaleString()} - $${maxPrice.toLocaleString()}`;
  }, [minPrice, maxPrice]);

  const applyPriceRange = () => {
    setShowPriceRange(false);
  };

  function parsePrice(value: string | null): number {
    if (!value) return 0;
    return Number(value);
  }

  const handleLoadMore = useCallback(async () => {
    if (!onLoadMore || !nextCursor || loading) return;

    setLoading(true);
    try {
      const result = await onLoadMore(nextCursor);
      setAllProperties((prev) => [...prev, ...result.items]);
      setNextCursor(result.next_cursor);
      setHasMore(!!result.next_cursor);
    } catch (error) {
      console.error("Failed to load more properties:", error);
    } finally {
      setLoading(false);
    }
  }, [onLoadMore, nextCursor, loading]);

  return (
    <div>
      <div className="mb-8 rounded-xl border border-line bg-white p-6 shadow-card dark:border-dark-border dark:bg-dark-card dark:shadow-dark-card">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-navy dark:text-blue-300">
          <SlidersHorizontal size={16} /> Filter
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted dark:text-dark-muted">
              <MapPin size={14} className="text-red dark:text-red-400" /> Location
            </span>
            <select
              className="field dark:bg-dark-card dark:border-dark-border dark:text-dark-text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="all">Select City</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted dark:text-dark-muted">
              <MapPinned size={14} className="text-red dark:text-red-400" /> Area
            </span>
            <select
              className="field dark:bg-dark-card dark:border-dark-border dark:text-dark-text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option value="all">Select Area</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted dark:text-dark-muted">
              <Building2 size={14} className="text-red dark:text-red-400" /> Property Type
            </span>
            <select
              className="field dark:bg-dark-card dark:border-dark-border dark:text-dark-text"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              {PROPERTY_TYPE_OPTIONS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted dark:text-dark-muted">
              <Bed size={14} className="text-red dark:text-red-400" /> Bedrooms
            </span>
            <select
              className="field dark:bg-dark-card dark:border-dark-border dark:text-dark-text"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            >
              {BEDROOM_OPTIONS.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted dark:text-dark-muted">
              <MapPin size={14} className="text-red dark:text-red-400" /> Side
            </span>
            <select
              className="field dark:bg-dark-card dark:border-dark-border dark:text-dark-text"
              value={side}
              onChange={(e) => setSide(e.target.value)}
            >
              {SIDE_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div className="relative col-span-2 lg:col-span-1">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted dark:text-dark-muted">
              <DollarSign size={14} className="text-red dark:text-red-400" /> Price Range
            </span>
            <button
              className="field flex items-center justify-between w-full text-left dark:bg-dark-card dark:border-dark-border dark:text-dark-text"
              onClick={() => setShowPriceRange(!showPriceRange)}
            >
              <span className={minPrice === 0 && maxPrice === 0 ? "text-muted dark:text-dark-muted" : "text-ink dark:text-dark-text"}>
                {priceRangeLabel}
              </span>
              <ChevronDown size={16} className={`transition-transform ${showPriceRange ? "rotate-180" : ""}`} />
            </button>

            {showPriceRange && (
              <div className="absolute left-0 right-0 top-full mt-2 z-50 w-[400px] min-w-[320px] rounded-xl border border-line bg-white p-6 shadow-lift dark:border-dark-border dark:bg-dark-card dark:shadow-dark-lift">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink dark:text-dark-text">
                      Min Price
                    </label>
                    <select
                      className="field text-base py-3 dark:bg-dark-card dark:border-dark-border dark:text-dark-text"
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                    >
                      <option value={0}>$0</option>
                      <option value={50000}>$50k</option>
                      <option value={100000}>$100k</option>
                      <option value={150000}>$150k</option>
                      <option value={200000}>$200k</option>
                      <option value={300000}>$300k</option>
                      <option value={400000}>$400k</option>
                      <option value={500000}>$500k</option>
                      <option value={750000}>$750k</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink dark:text-dark-text">
                      Max Price
                    </label>
                    <select
                      className="field text-base py-3 dark:bg-dark-card dark:border-dark-border dark:text-dark-text"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                    >
                      <option value={0}>No limit</option>
                      <option value={50000}>$50k</option>
                      <option value={100000}>$100k</option>
                      <option value={150000}>$150k</option>
                      <option value={200000}>$200k</option>
                      <option value={300000}>$300k</option>
                      <option value={400000}>$400k</option>
                      <option value={500000}>$500k</option>
                      <option value={750000}>$750k</option>
                      <option value={1000000}>$1M</option>
                      <option value={1500000}>$1.5M</option>
                      <option value={2000000}>$2M</option>
                    </select>
                  </div>
                </div>
                <button
                  className="mt-6 w-full rounded-md bg-navy px-4 py-3 text-sm font-semibold text-white hover:bg-navy-dark transition-colors dark:bg-blue-700 dark:hover:bg-blue-800"
                  onClick={applyPriceRange}
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          <div className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted dark:text-dark-muted">
              <Search size={14} className="text-red dark:text-red-400" /> Search
            </span>
            <div className="relative">
              <input
                type="text"
                className="field pl-9 dark:bg-dark-card dark:border-dark-border dark:text-dark-text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-dark-muted" />
            </div>
          </div>
        </div>
      </div>

      <p className="mb-5 text-sm text-muted dark:text-dark-muted">
        Showing <span className="font-semibold text-ink dark:text-dark-text">{filtered.length}</span> projects
      </p>
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line bg-white p-12 text-center text-muted dark:border-dark-border dark:bg-dark-card dark:text-dark-muted">
          No projects match these filters. Try widening your search.
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
          
          {hasMore && (
            <div className="mt-8 text-center">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="btn btn-outline dark:border-dark-border dark:text-dark-text dark:hover:bg-dark-card dark:hover:text-white"
              >
                {loading ? "Loading..." : "Load more"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}