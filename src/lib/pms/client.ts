const BASE_URL = "https://pms-api.propertyquestturkey.com/api/v1/external";

export interface PmsListItem {
  id: string;
  pqt_code: string;
  listing_title: string;
  district_name: string | null;
  side: "european" | "anatolian" | null;
  neighbourhood: string | null;
  category: "residential" | "commercial" | "mixed_use" | "land";
  status: "off_plan" | "under_construction" | "ready" | "completed" | "resale";
  sale_status: "available" | "under_offer" | "reserved" | "sold" | "off_market";
  cbi_eligible: boolean;
  suitable_for_residence: boolean;
  starting_price_usd: string | null;
  starting_price_try: string | null;
  delivery_date: string | null;
  roi_estimate: string | null;
  rental_yield: string | null;
  cover_image_url: string | null;
  bedrooms_summary: string | null;
  unit_count: number;
}

export interface PmsDistrict {
  id: string;
  name: string;
  side: "european" | "anatolian";
  description: string;
  population: number;
  avg_rent_usd: string;
  rental_yield_pct: string;
  growth_5yr_pct: string;
}

export interface PmsDeveloper {
  id: string;
  name: string;
  description: string;
  website: string;
}

export interface PmsUnit {
  type: string;
  bedrooms: number;
  bathrooms: number;
  net_sqm: string;
  gross_sqm: string;
  floor_number: number;
  price_usd: string;
  price_try: string;
  available_count: number;
  monthly_maintenance_fee_try: string;
}

export interface PmsSibling {
  id: string;
  pqt_code: string;
  listing_title: string;
  bedrooms: number;
  bathrooms: number;
  net_area_sqm: string;
  starting_price_usd: string;
  price_usd: string;
  cover_image_url: string;
}

export interface PmsDetail extends PmsListItem {
  listing_title_alternates: string[];
  district: PmsDistrict | null;
  full_address: string | null;
  location_lat: string | null;
  location_lng: string | null;
  location_verified: boolean;
  resale: boolean;
  property_types: string[];
  completion_status: string | null;
  payment_plan: string | null;
  campaign_text: string | null;
  total_units: number | null;
  floors: number | null;
  building_age: number;
  heating_system: "central" | "individual_gas" | "electric" | "underfloor" | "heat_pump" | "none" | null;
  description_short: string | null;
  description_full: string | null;
  key_features: string[];
  amenities: string[];
  nearby_education: string[];
  nearby_health: string[];
  nearby_transport: string[];
  nearby_scenery: string[];
  nearby_facilities: string[];
  distances: Array<Record<string, unknown>>;
  developer: PmsDeveloper | null;
  units: PmsUnit[];
  images: string[];
  floor_plans: Array<{
    url: string;
    unit_type: string | null;
    caption: string | null;
  }>;
  documents: Array<{
    id: string;
    doc_type: string;
    label: string;
    download_url: string;
  }>;
  is_child: boolean;
  parent_pqt_code: string | null;
  siblings: PmsSibling[];
  created_at: string;
  updated_at: string;
}

export interface PmsPage<T> {
  items: T[];
  next_cursor: string | null;
  limit: number;
  total: null;
}

async function pmsFetch<T>(path: string): Promise<T> {
  const apiKey = process.env.PQT_PMS_API_KEY;

  if (!apiKey) {
    throw new Error("PQT_PMS_API_KEY environment variable is not set");
  }

  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 300,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ title: `HTTP ${res.status}` }));
    throw new Error(error.title || `PMS API error: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

function parsePrice(value: string | null): number {
  if (!value) return 0;
  return Number(value);
}

export async function listProperties(params: {
  sort?: "newest" | "price_asc" | "price_desc" | "yield_desc";
  limit?: number;
  cursor?: string;
  q?: string;
  district_id?: string;
  side?: "european" | "anatolian";
  category?: "residential" | "commercial" | "mixed_use" | "land";
  status?: "off_plan" | "under_construction" | "ready" | "completed" | "resale";
  cbi_eligible?: boolean;
  residence_eligible?: boolean;
  bedrooms_min?: number;
  bedrooms_max?: number;
  price_min_usd?: number;
  price_max_usd?: number;
} = {}): Promise<PmsPage<PmsListItem>> {
  const filteredParams: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      filteredParams[key] = String(value);
    }
  }

  const qs = new URLSearchParams(filteredParams).toString();
  const response = await pmsFetch<PmsPage<PmsListItem>>(`/properties${qs ? `?${qs}` : ""}`);
  return response;
}

export async function getProperty(slug: string): Promise<PmsDetail> {
  return pmsFetch<PmsDetail>(`/properties/${encodeURIComponent(slug)}`);
}

export async function getDistricts(): Promise<string[]> {
  try {
    const response = await listProperties({ limit: 100 });
    const districts = [...new Set(response.items.map((p) => p.district_name).filter((d): d is string => d !== null))];
    return districts.sort();
  } catch (error) {
    console.warn("Failed to fetch districts:", error);
    return [];
  }
}