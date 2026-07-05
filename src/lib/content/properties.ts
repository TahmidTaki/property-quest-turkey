import type { PublicProperty } from "./types";

/**
 * Bundled sample listings. Shape mirrors the PMS `Property` model's PUBLIC
 * fields only. Swap `getProperties()` for a Prisma read when DATABASE_URL is set.
 */
const PROPERTIES: PublicProperty[] = [
  {
    id: "p-bosphorus-residences",
    slug: "bosphorus-residences",
    title: "Bosphorus Residences",
    developer: "Marmara Development Group",
    district: "Beşiktaş",
    city: "Istanbul",
    status: "under-construction",
    citizenship: "eligible",
    priceUsdFrom: 485000,
    deliveryDate: "2026-12",
    shortDescription:
      "Waterfront residences with panoramic Bosphorus views, minutes from Beşiktaş centre.",
    description: [
      "Bosphorus Residences is a landmark waterfront development on the European shore of Istanbul, offering uninterrupted strait views from every residence.",
      "Designed for international investors seeking both lifestyle and citizenship eligibility, the project pairs prime location with full PQT after-sales support — from title deed to property management.",
    ],
    highlights: [
      "Direct Bosphorus frontage",
      "5 minutes to Beşiktaş ferry & metro",
      "Turkish citizenship eligible",
      "24/7 concierge & security",
    ],
    amenities: [
      "Infinity pool",
      "Spa & hammam",
      "Fitness centre",
      "Private marina access",
      "Landscaped gardens",
      "Underground parking",
    ],
    unitTypes: [
      { label: "1+1", sizeSqm: 78, bedrooms: 1, bathrooms: 1, priceUsdFrom: 485000, available: 6 },
      { label: "2+1", sizeSqm: 124, bedrooms: 2, bathrooms: 2, priceUsdFrom: 720000, available: 9 },
      { label: "3+1", sizeSqm: 186, bedrooms: 3, bathrooms: 2, priceUsdFrom: 1150000, available: 4 },
    ],
    gradient: "bosphorus",
    featured: true,
    lat: 41.0422,
    lng: 29.0083,
  },
  {
    id: "p-marina-quarter",
    slug: "marina-quarter",
    title: "Marina Quarter",
    developer: "Aegean Estates",
    district: "Ataköy",
    city: "Istanbul",
    status: "ready",
    citizenship: "eligible",
    priceUsdFrom: 410000,
    deliveryDate: "Ready",
    shortDescription:
      "Move-in-ready marina apartments with a private yacht berth option and sea views.",
    description: [
      "Marina Quarter sits beside Istanbul's largest yachting marina in Ataköy, delivering a resort lifestyle within the city.",
      "All units are complete and title-deed ready — ideal for investors who want immediate citizenship processing without a construction wait.",
    ],
    highlights: [
      "Completed & title-deed ready",
      "Marina and Marmara Sea views",
      "Turkish citizenship eligible",
      "15 minutes to Istanbul Airport link",
    ],
    amenities: [
      "Marina promenade",
      "Rooftop lounge",
      "Indoor pool",
      "Kids' club",
      "Retail arcade",
      "EV charging",
    ],
    unitTypes: [
      { label: "2+1", sizeSqm: 110, bedrooms: 2, bathrooms: 1, priceUsdFrom: 410000, available: 5 },
      { label: "3+1", sizeSqm: 165, bedrooms: 3, bathrooms: 2, priceUsdFrom: 690000, available: 7 },
    ],
    gradient: "marina",
    featured: true,
    lat: 40.9772,
    lng: 28.8419,
  },
  {
    id: "p-garden-terraces",
    slug: "garden-terraces",
    title: "Garden Terraces",
    developer: "Anatolia Living",
    district: "Başakşehir",
    city: "Istanbul",
    status: "off-plan",
    citizenship: "eligible",
    priceUsdFrom: 295000,
    deliveryDate: "2027-06",
    shortDescription:
      "Family-focused low-rise homes set in landscaped parkland with strong rental yields.",
    description: [
      "Garden Terraces is a green, low-density community in fast-growing Başakşehir, designed around family living and long-term rental demand.",
      "An off-plan entry point with attractive payment plans and citizenship eligibility on combined unit purchases.",
    ],
    highlights: [
      "Best entry price point",
      "Large landscaped parkland",
      "Citizenship eligible (combined units)",
      "Near new metro line",
    ],
    amenities: [
      "Community park",
      "Outdoor pools",
      "Sports courts",
      "Walking trails",
      "Nursery & schools nearby",
      "Shopping centre",
    ],
    unitTypes: [
      { label: "1+1", sizeSqm: 65, bedrooms: 1, bathrooms: 1, priceUsdFrom: 295000, available: 12 },
      { label: "2+1", sizeSqm: 98, bedrooms: 2, bathrooms: 1, priceUsdFrom: 380000, available: 14 },
      { label: "4+1", sizeSqm: 210, bedrooms: 4, bathrooms: 3, priceUsdFrom: 760000, available: 3 },
    ],
    gradient: "garden",
    featured: true,
    lat: 41.0931,
    lng: 28.8025,
  },
  {
    id: "p-skyline-towers",
    slug: "skyline-towers",
    title: "Skyline Towers",
    developer: "Marmara Development Group",
    district: "Şişli",
    city: "Istanbul",
    status: "under-construction",
    citizenship: "eligible",
    priceUsdFrom: 560000,
    deliveryDate: "2026-09",
    shortDescription:
      "Central business-district towers with branded residences and skyline views.",
    description: [
      "Skyline Towers brings branded-residence living to the heart of Şişli's central business district, steps from metro and premium retail.",
      "A strong choice for investors prioritising capital appreciation and corporate rental demand.",
    ],
    highlights: [
      "CBD location",
      "Branded residence management",
      "Citizenship eligible",
      "Direct metro access",
    ],
    amenities: [
      "Sky lounge",
      "Business centre",
      "Spa & pool",
      "Valet parking",
      "Concierge",
      "Fine dining",
    ],
    unitTypes: [
      { label: "1+1", sizeSqm: 82, bedrooms: 1, bathrooms: 1, priceUsdFrom: 560000, available: 8 },
      { label: "2+1", sizeSqm: 132, bedrooms: 2, bathrooms: 2, priceUsdFrom: 880000, available: 6 },
    ],
    gradient: "skyline",
    featured: false,
    lat: 41.0602,
    lng: 28.9877,
  },
  {
    id: "p-coastal-villas",
    slug: "coastal-villas",
    title: "Coastal Villas",
    developer: "Aegean Estates",
    district: "Büyükçekmece",
    city: "Istanbul",
    status: "ready",
    citizenship: "eligible",
    priceUsdFrom: 1250000,
    deliveryDate: "Ready",
    shortDescription:
      "Private sea-view villas with pools — premium completed homes on the Marmara coast.",
    description: [
      "Coastal Villas offers a limited collection of detached, sea-view homes with private pools along the Marmara coastline.",
      "Completed and ready for immediate citizenship processing — the flagship lifestyle option in the PQT portfolio.",
    ],
    highlights: [
      "Detached private villas",
      "Private pool & garden",
      "Sea frontage",
      "Citizenship eligible",
    ],
    amenities: [
      "Private beach club",
      "Gated community",
      "Smart-home systems",
      "Private pools",
      "24/7 security",
      "Marina nearby",
    ],
    unitTypes: [
      { label: "4+2 Villa", sizeSqm: 320, bedrooms: 4, bathrooms: 4, priceUsdFrom: 1250000, available: 3 },
      { label: "5+2 Villa", sizeSqm: 410, bedrooms: 5, bathrooms: 5, priceUsdFrom: 1850000, available: 2 },
    ],
    gradient: "coast",
    featured: false,
    lat: 40.9851,
    lng: 28.5950,
  },
  {
    id: "p-old-city-lofts",
    slug: "old-city-lofts",
    title: "Old City Lofts",
    developer: "Anatolia Living",
    district: "Fatih",
    city: "Istanbul",
    status: "off-plan",
    citizenship: "pending",
    priceUsdFrom: 340000,
    deliveryDate: "2027-03",
    shortDescription:
      "Boutique restored lofts in historic Fatih — character homes with high short-let demand.",
    description: [
      "Old City Lofts is a boutique restoration project in historic Fatih, blending Ottoman character with modern interiors.",
      "Citizenship eligibility is under review for this heritage site; PQT will confirm per-unit status before reservation.",
    ],
    highlights: [
      "Historic peninsula location",
      "High short-let demand",
      "Boutique scale (24 units)",
      "Walking distance to landmarks",
    ],
    amenities: [
      "Restored façade",
      "Rooftop terrace",
      "Boutique lobby",
      "Smart locks",
      "Café on site",
    ],
    unitTypes: [
      { label: "Studio", sizeSqm: 48, bedrooms: 0, bathrooms: 1, priceUsdFrom: 340000, available: 10 },
      { label: "2+1 Loft", sizeSqm: 105, bedrooms: 2, bathrooms: 2, priceUsdFrom: 520000, available: 5 },
    ],
    gradient: "skyline",
    featured: false,
    lat: 41.0186,
    lng: 28.9497,
  },
];

/**
 * Single data seam. Today: bundled sample data.
 * Live: replace body with a Prisma query against the PMS Postgres DB,
 * selecting ONLY public-tagged columns and mapping to PublicProperty.
 */
export async function getProperties(): Promise<PublicProperty[]> {
  return PROPERTIES;
}

export async function getPropertyBySlug(
  slug: string,
): Promise<PublicProperty | null> {
  return PROPERTIES.find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedProperties(): Promise<PublicProperty[]> {
  return PROPERTIES.filter((p) => p.featured);
}

/** Distinct districts for filter UI. */
export async function getDistricts(): Promise<string[]> {
  return [...new Set(PROPERTIES.map((p) => p.district))].sort();
}
