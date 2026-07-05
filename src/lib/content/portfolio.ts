/**
 * Sample portal data for the demo client (Ahmed Hassan).
 *
 * LIVE: replace these getters with PMS reads scoped to the logged-in owner
 * (the PMS already has withOwnerScope() for exactly this). Shapes are kept
 * deliberately simple for the demo.
 */

export interface Holding {
  id: string;
  project: string;
  unit: string;
  district: string;
  purchasePriceUsd: number;
  currentValueUsd: number;
  purchasedOn: string; // ISO date
  status: "owned" | "reserved" | "completing";
  gradient: string;
}

export interface CitizenshipStep {
  key: string;
  title: string;
  status: "done" | "active" | "pending";
  date?: string;
  note?: string;
}

export interface PaymentRow {
  id: string;
  label: string;
  dueDate: string;
  amountUsd: number;
  status: "paid" | "due" | "upcoming";
}

export interface DocumentRow {
  id: string;
  name: string;
  category: "Passport" | "Contract" | "Title Deed" | "Receipt" | "Application";
  uploadedOn: string;
  sizeKb: number;
}

export interface Ticket {
  id: string;
  subject: string;
  category: "Maintenance" | "Legal" | "Citizenship" | "General";
  status: "open" | "in-progress" | "resolved";
  updatedOn: string;
  lastMessage: string;
}

const HOLDINGS: Holding[] = [
  {
    id: "h1",
    project: "Bosphorus Residences",
    unit: "2+1 · Block A, Floor 7",
    district: "Beşiktaş",
    purchasePriceUsd: 720000,
    currentValueUsd: 812000,
    purchasedOn: "2025-09-15",
    status: "owned",
    gradient: "bosphorus",
  },
  {
    id: "h2",
    project: "Garden Terraces",
    unit: "1+1 · Block C, Floor 2",
    district: "Başakşehir",
    purchasePriceUsd: 295000,
    currentValueUsd: 305000,
    purchasedOn: "2026-02-01",
    status: "completing",
    gradient: "garden",
  },
];

const CITIZENSHIP: CitizenshipStep[] = [
  { key: "purchase", title: "Property purchase completed", status: "done", date: "2025-09-15" },
  { key: "valuation", title: "Official valuation report", status: "done", date: "2025-09-28" },
  { key: "tapu", title: "Title deed (tapu) registered", status: "done", date: "2025-10-10" },
  { key: "residency", title: "Residency permit issued", status: "active", note: "In review at the migration office — est. 3 weeks." },
  { key: "application", title: "Citizenship application filed", status: "pending" },
  { key: "passport", title: "Passports issued", status: "pending" },
];

const PAYMENTS: PaymentRow[] = [
  { id: "pay1", label: "Bosphorus Residences — final payment", dueDate: "2025-09-10", amountUsd: 720000, status: "paid" },
  { id: "pay2", label: "Garden Terraces — deposit", dueDate: "2026-02-01", amountUsd: 59000, status: "paid" },
  { id: "pay3", label: "Garden Terraces — instalment 1", dueDate: "2026-08-01", amountUsd: 88500, status: "due" },
  { id: "pay4", label: "Garden Terraces — instalment 2", dueDate: "2027-02-01", amountUsd: 88500, status: "upcoming" },
  { id: "pay5", label: "Garden Terraces — on completion", dueDate: "2027-06-01", amountUsd: 59000, status: "upcoming" },
];

const DOCUMENTS: DocumentRow[] = [
  { id: "d1", name: "Passport — Ahmed Hassan.pdf", category: "Passport", uploadedOn: "2025-09-02", sizeKb: 480 },
  { id: "d2", name: "Sales contract — Bosphorus 2+1.pdf", category: "Contract", uploadedOn: "2025-09-15", sizeKb: 1240 },
  { id: "d3", name: "Tapu — Bosphorus Residences.pdf", category: "Title Deed", uploadedOn: "2025-10-10", sizeKb: 890 },
  { id: "d4", name: "Payment receipt — final.pdf", category: "Receipt", uploadedOn: "2025-09-12", sizeKb: 210 },
  { id: "d5", name: "Residency application.pdf", category: "Application", uploadedOn: "2025-10-20", sizeKb: 670 },
];

const TICKETS: Ticket[] = [
  { id: "t1", subject: "Kitchen tap dripping — Bosphorus 2+1", category: "Maintenance", status: "in-progress", updatedOn: "2026-05-28", lastMessage: "Plumber scheduled for Thursday 10:00." },
  { id: "t2", subject: "Residency card collection", category: "Citizenship", status: "open", updatedOn: "2026-05-30", lastMessage: "We'll notify you the moment it's ready to collect." },
  { id: "t3", subject: "Annual property tax receipt", category: "Legal", status: "resolved", updatedOn: "2026-03-15", lastMessage: "Receipt uploaded to your documents." },
];

export async function getHoldings() {
  return HOLDINGS;
}
export async function getCitizenshipSteps() {
  return CITIZENSHIP;
}
export async function getPayments() {
  return PAYMENTS;
}
export async function getDocuments() {
  return DOCUMENTS;
}
export async function getTickets() {
  return TICKETS;
}

export async function getPortfolioSummary() {
  const invested = HOLDINGS.reduce((s, h) => s + h.purchasePriceUsd, 0);
  const value = HOLDINGS.reduce((s, h) => s + h.currentValueUsd, 0);
  const nextDue = PAYMENTS.find((p) => p.status === "due");
  const citizenshipDone = CITIZENSHIP.filter((c) => c.status === "done").length;
  return {
    invested,
    value,
    gain: value - invested,
    gainPct: ((value - invested) / invested) * 100,
    holdings: HOLDINGS.length,
    nextDue,
    citizenshipDone,
    citizenshipTotal: CITIZENSHIP.length,
  };
}
