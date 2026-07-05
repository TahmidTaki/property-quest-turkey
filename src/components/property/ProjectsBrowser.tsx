"use client";

import { useMemo, useState } from "react";
import { 
  Search, 
  SlidersHorizontal, 
  ChevronDown,
  MapPin,
  MapPinned,
  Building2,
  Bed,
  DollarSign
} from "lucide-react";
import type { PublicProperty, ProjectStatus, PropertyType } from "@/lib/content/types";
import { PropertyCard } from "./PropertyCard";

const PROPERTY_TYPE_OPTIONS: { value: PropertyType | "all"; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "penthouse", label: "Penthouse" },
  { value: "duplex", label: "Duplex" },
  { value: "triplex", label: "Triplex" },
  { value: "bungalow", label: "Bungalow" },
  { value: "commercial", label: "Commercial" },
  { value: "hotel", label: "Hotel" },
];

const BEDROOM_OPTIONS = [
  { value: "any", label: "Any" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
];

export function ProjectsBrowser({
  properties,
  districts,
}: {
  properties: PublicProperty[];
  districts: string[];
}) {
  const [city, setCity] = useState("all");
  const [district, setDistrict] = useState("all");
  const [propertyType, setPropertyType] = useState<PropertyType | "all">("all");
  const [bedrooms, setBedrooms] = useState("any");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPriceRange, setShowPriceRange] = useState(false);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  // Get unique cities from properties
  const cities = [...new Set(properties.map((p) => p.city))];

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      // Search query
      if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !p.district.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (city !== "all" && p.city !== city) return false;
      if (district !== "all" && p.district !== district) return false;
      if (propertyType !== "all" && p.propertyType !== propertyType) return false;
      if (bedrooms !== "any") {
        const minBeds = parseInt(bedrooms);
        const maxBeds = Math.max(...p.unitTypes.map(u => u.bedrooms));
        if (maxBeds < minBeds) return false;
      }
      if (minPrice > 0 && p.priceUsdFrom < minPrice) return false;
      if (maxPrice > 0 && p.priceUsdFrom > maxPrice) return false;
      return true;
    });
  }, [properties, city, district, propertyType, bedrooms, minPrice, maxPrice, searchQuery]);

  const priceRangeLabel = useMemo(() => {
    if (minPrice === 0 && maxPrice === 0) return "Any Price";
    if (minPrice > 0 && maxPrice === 0) return `$${minPrice.toLocaleString()}+`;
    if (minPrice === 0 && maxPrice > 0) return `Up to $${maxPrice.toLocaleString()}`;
    return `$${minPrice.toLocaleString()} - $${maxPrice.toLocaleString()}`;
  }, [minPrice, maxPrice]);

  const applyPriceRange = () => {
    setShowPriceRange(false);
  };

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-8 rounded-xl border border-line bg-white p-6 shadow-card">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-navy">
          <SlidersHorizontal size={16} /> Filter
        </div>
        
        {/* Filter grid - 5 columns */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {/* LOCATION */}
          <div className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted">
              <MapPin size={14} className="text-red" /> Location
            </span>
            <select
              className="field"
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

          {/* AREA */}
          <div className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted">
              <MapPinned size={14} className="text-red" /> Area
            </span>
            <select
              className="field"
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

          {/* PROPERTY TYPE */}
          <div className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted">
              <Building2 size={14} className="text-red" /> Property Type
            </span>
            <select
              className="field"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value as PropertyType | "all")}
            >
              {PROPERTY_TYPE_OPTIONS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* BEDROOMS */}
          <div className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted">
              <Bed size={14} className="text-red" /> Bedrooms
            </span>
            <select
              className="field"
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

          {/* PRICE RANGE with dropdown */}
          <div className="relative">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted">
              <DollarSign size={14} className="text-red" /> Price Range
            </span>
            <button
              className="field flex items-center justify-between w-full text-left"
              onClick={() => setShowPriceRange(!showPriceRange)}
            >
              <span className={minPrice === 0 && maxPrice === 0 ? "text-muted" : "text-ink"}>
                {priceRangeLabel}
              </span>
              <ChevronDown size={16} className={`transition-transform ${showPriceRange ? "rotate-180" : ""}`} />
            </button>

            {/* Price Range Dropdown */}
            {showPriceRange && (
              <div className="absolute left-0 right-0 top-full mt-2 z-50 w-[400px] min-w-[320px] rounded-xl border border-line bg-white p-6 shadow-lift">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink">
                      Min Price
                    </label>
                    <select
                      className="field text-base py-3"
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
                    <label className="mb-2 block text-sm font-medium text-ink">
                      Max Price
                    </label>
                    <select
                      className="field text-base py-3"
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
                  className="mt-6 w-full rounded-md bg-navy px-4 py-3 text-sm font-semibold text-white hover:bg-navy-dark transition-colors"
                  onClick={applyPriceRange}
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search bar - full width */}
        <div className="mt-4">
          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted">
              <Search size={14} className="text-red" /> Search
            </span>
            <div className="relative">
              <input
                type="text"
                className="field pl-9"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            </div>
          </label>
        </div>
      </div>

      <p className="mb-5 text-sm text-muted">
        Showing <span className="font-semibold text-ink">{filtered.length}</span>{" "}
        of {properties.length} projects
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line bg-white p-12 text-center text-muted">
          No projects match these filters. Try widening your search.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PropertyCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}