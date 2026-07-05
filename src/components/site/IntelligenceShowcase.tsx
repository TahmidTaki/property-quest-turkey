import Link from "next/link";
import {
  Layers,
  Calculator,
  Activity,
  BarChart3,
  Compass,
  Sparkles,
  Building2,
  DollarSign,
  ShieldCheck,
  Globe,
  Headset,
  ArrowRight,
} from "lucide-react";

/** The 8 PQT Intelligence modules. `href` makes a card clickable. */
const MODULES = [
  { icon: Layers, label: "Portfolio Explorer", href: "/login" },
  { icon: Calculator, label: "CBI Calculator", href: "/login" },
  { icon: Activity, label: "Market Pulse", href: "/market-pulse" },
  { icon: BarChart3, label: "Price Intelligence", href: "/login" },
  { icon: Compass, label: "Area Intelligence", href: "/login" },
  { icon: Sparkles, label: "Investment Advisor", href: "/login" },
  { icon: Building2, label: "Developer Tracker", href: "/login" },
  { icon: DollarSign, label: "Currency Monitor", href: "/login" },
] as const;

/** Dark "PQT Intelligence" feature grid. */
export function IntelligenceShowcase() {
  return (
    <section className="bg-[#0c2038] py-20 sm:py-24">
      <div className="container-x">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-gold">
          PQT Intelligence
        </p>
        <h2 className="max-w-3xl text-4xl leading-tight text-white sm:text-5xl">
          The first analytical platform built for Turkish CBI investors.
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-white/55">
          Eight integrated modules that turn raw market data into sovereign-grade
          investment clarity.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map((m) => (
            <Link
              key={m.label}
              href={m.href}
              className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-0.5 hover:border-gold/40 hover:bg-white/[0.06]"
            >
              <m.icon className="text-gold" size={26} strokeWidth={1.75} />
              <h3 className="mt-6 flex items-center gap-1.5 text-base font-semibold text-white">
                {m.label}
                {m.label === "Market Pulse" && (
                  <span className="flex items-center gap-1 rounded-full bg-red px-1.5 py-0.5 text-[9px] font-bold text-white">
                    LIVE
                  </span>
                )}
              </h3>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/login" className="btn btn-gold">
            Explore PQT Intelligence <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** The 4 differentiators, each with a concrete proof metric. */
const DIFFERENCE = [
  {
    icon: ShieldCheck,
    title: "Regulatory-Backed",
    body: "Every property is pre-cleared with the Land Registry and reviewed by independent counsel before it reaches you.",
    metric: "100%",
    metricLabel: "Land-Registry pre-cleared",
  },
  {
    icon: BarChart3,
    title: "Data-Driven",
    body: "The PQT Intelligence platform brings eight live analytical modules to every investment decision.",
    metric: "8",
    metricLabel: "Live analytical modules",
  },
  {
    icon: Globe,
    title: "Cross-Border by Design",
    body: "Offices in Istanbul, Dubai, London, Kuala Lumpur and Dhaka — your file moves with you.",
    metric: "5",
    metricLabel: "International offices",
  },
  {
    icon: Headset,
    title: "Lifetime Aftersales",
    body: "Property management, rentals, residency renewals and support — handled for you, long after the sale.",
    metric: "500+",
    metricLabel: "Families supported",
  },
] as const;

/** "The PQT Difference" — ivory band with four gold-topped proof cards. */
export function PqtDifference() {
  return (
    <section className="bg-ivory py-20 sm:py-24">
      <div className="container-x">
        <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.16em] text-red">
          Why Property Quest Turkey
        </p>
        <h2 className="text-4xl text-navy sm:text-5xl">The PQT Difference</h2>
        <p className="mt-4 max-w-2xl text-muted">
          One accountable partner for the entire journey — from regulatory
          due-diligence to data-driven decisions and lifetime aftersales.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DIFFERENCE.map((d) => (
            <div
              key={d.title}
              className="group flex flex-col border-t-2 border-gold bg-white p-7 shadow-card transition hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red/10 transition group-hover:bg-red/15">
                <d.icon className="text-red" size={24} strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 text-xl text-navy">{d.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {d.body}
              </p>
              <div className="mt-5 border-t border-line pt-4">
                <p className="tabular text-2xl font-extrabold text-navy">
                  {d.metric}
                </p>
                <p className="text-xs text-muted">{d.metricLabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
