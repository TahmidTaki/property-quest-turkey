import type { Metadata } from "next";
import { ProjectsBrowser } from "@/components/property/ProjectsBrowser";
import { listProperties, getDistricts } from "@/lib/pms/client";
import type { PmsListItem } from "@/lib/pms/client";
import type { FilterState } from "@/components/property/ProjectsBrowser";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse citizenship-eligible property in Istanbul — apartments, villas and branded residences curated by Property Quest Turkey.",
};

export default async function ProjectsPage() {
  let properties: PmsListItem[] = [];
  let districts: string[] = [];
  let error = false;
  let nextCursor: string | null = null;

  try {
    const result = await listProperties({ 
      sort: "newest", 
      limit: 24 
    });
    properties = result.items;
    nextCursor = result.next_cursor;
    
    if (properties.length > 0) {
      districts = await getDistricts();
    }
  } catch (err) {
    console.error("Failed to fetch properties:", err);
    error = true;
  }

  return (
    <>
      <section className="bg-gradient-to-br from-navy to-ink px-5 py-16 text-white sm:px-8">
        <div className="container-x">
          <h1 className="text-4xl">Projects in Istanbul</h1>
          <p className="mt-3 max-w-xl text-white/80">
            Every listing is curated and citizenship-checked by PQT. The details
            shown here are exactly what our clients see in their private portal —
            no hidden surprises.
          </p>
          {error && (
            <p className="mt-3 text-xs text-yellow-400">
              Unable to connect to property database. Please try again later.
            </p>
          )}
          {!error && properties.length === 0 && (
            <p className="mt-3 text-xs text-white/60">
              No properties found. Check back later for new listings.
            </p>
          )}
        </div>
      </section>

      <div className="container-x py-12">
        <ProjectsBrowser 
          properties={properties} 
          districts={districts}
          nextCursor={nextCursor}
          onLoadMore={async (cursor: string, filters: FilterState) => {
            'use server';
            const params: Record<string, string | number | boolean> = { 
              sort: "newest", 
              limit: 24, 
              cursor 
            };
            
            if (filters.bedrooms && filters.bedrooms > 0) {
              params.bedrooms_min = filters.bedrooms;
            }
            if (filters.minPrice && filters.minPrice > 0) {
              params.price_min_usd = filters.minPrice;
            }
            if (filters.maxPrice && filters.maxPrice > 0) {
              params.price_max_usd = filters.maxPrice;
            }
            if (filters.district && filters.district !== "all") {
              params.district_id = filters.district;
            }
            if (filters.category && filters.category !== "all") {
              params.category = filters.category;
            }
            if (filters.side && filters.side !== "all") {
              params.side = filters.side;
            }
            if (filters.searchQuery) {
              params.q = filters.searchQuery;
            }
            
            const result = await listProperties(params);
            return result;
          }}
        />
      </div>
    </>
  );
}