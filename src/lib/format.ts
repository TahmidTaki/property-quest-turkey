import type { ProjectStatus, CitizenshipEligibility } from "./content/types";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatUsd(n: number): string {
  return usd.format(n);
}

/** "$485,000" → compact "$485K" / "$1.25M" for tight cards. */
export function formatUsdCompact(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2).replace(/\.00$/, "")}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return formatUsd(n);
}

export function formatDelivery(d: string): string {
  if (d === "Ready") return "Ready to move in";
  const [y, m] = d.split("-");
  if (!m) return y;
  const month = new Date(Number(y), Number(m) - 1).toLocaleString("en-US", {
    month: "short",
  });
  return `${month} ${y}`;
}

export const statusLabel: Record<ProjectStatus, string> = {
  ready: "Ready",
  "under-construction": "Under construction",
  "off-plan": "Off-plan",
};

export const citizenshipLabel: Record<CitizenshipEligibility, string> = {
  eligible: "Citizenship eligible",
  "not-eligible": "Not eligible",
  pending: "Eligibility pending",
};

export const gradientClass: Record<string, string> = {
  bosphorus: "bg-gradient-to-br from-navy to-[#0066a6]",
  marina: "bg-gradient-to-br from-ink to-[#4a3c6b]",
  garden: "bg-gradient-to-br from-[#2d5f3f] to-[#7ca870]",
  skyline: "bg-gradient-to-br from-[#1f2a44] to-[#5b6b9c]",
  coast: "bg-gradient-to-br from-[#1a6a8a] to-[#6fc3d9]",
};
