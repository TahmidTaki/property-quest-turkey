// /**
//  * Public-facing property shape.
//  *
//  * IMPORTANT (per PQT access rules): this type contains ONLY fields tagged
//  * `public` in the PMS. Confidential PMS fields — costPrice, commissionPct,
//  * developerMargin, internal agent notes, leadSource, pipelineStage,
//  * partner-specific pricing — are deliberately ABSENT from this type so the
//  * website cannot render them even by accident.
//  *
//  * The PMS (C:\dev\pqt-mgmt) remains the single source of truth. When live,
//  * `getProperties()` will read the same Postgres DB and project to this shape
//  * server-side, stripping confidential columns before they reach the browser.
//  */

// export type CitizenshipEligibility = "eligible" | "not-eligible" | "pending";
// export type ProjectStatus = "ready" | "under-construction" | "off-plan";

// export interface UnitType {
//   label: string; // e.g. "2+1"
//   sizeSqm: number;
//   bedrooms: number;
//   bathrooms: number;
//   priceUsdFrom: number;
//   available: number;
// }

// export interface PublicProperty {
//   id: string;
//   slug: string;
//   title: string;
//   developer: string;
//   district: string; // e.g. "Beşiktaş"
//   city: string;
//   status: ProjectStatus;
//   citizenship: CitizenshipEligibility;
//   priceUsdFrom: number;
//   deliveryDate: string; // ISO yyyy-mm or "Ready"
//   shortDescription: string;
//   description: string[];
//   highlights: string[];
//   amenities: string[];
//   unitTypes: UnitType[];
//   // Visual: gradient key reused from the demo so it renders without real photos yet.
//   gradient: "bosphorus" | "marina" | "garden" | "skyline" | "coast";
//   featured: boolean;
//   lat?: number;
//   lng?: number;
// }
