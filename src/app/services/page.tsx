import type { Metadata } from "next";
import {
  Search,
  Scale,
  KeyRound,
  Home,
  Wallet,
  Plane,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHead, LinkButton } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-service property investment and citizenship support — from sourcing and legal due diligence to after-sales property management.",
};

const services = [
  { icon: Search, title: "Property sourcing", body: "Curated, citizenship-eligible projects matched to your budget, goals and timeline." },
  { icon: Scale, title: "Legal & due diligence", body: "Independent legal review, contract negotiation, and secure title-deed transfer." },
  { icon: Plane, title: "Citizenship processing", body: "End-to-end management of residency and citizenship applications for your family." },
  { icon: KeyRound, title: "Handover & furnishing", body: "Snagging, key handover, and optional interior design and furnishing packages." },
  { icon: Home, title: "Property management", body: "Tenant placement, rent collection, maintenance and inspections — all managed for you." },
  { icon: Wallet, title: "Rental & resale", body: "Maximise yield with managed rentals, or exit smoothly with our resale support." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Everything, under one roof"
        subtitle="PQT is your single partner for the whole journey — buying, citizenship, and life after the purchase."
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="card p-7 transition hover:-translate-y-1 hover:border-gold hover:shadow-navy">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold-soft">
                <s.icon className="text-navy" size={22} />
              </div>
              <h3 className="text-lg text-navy">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section tone="navy">
        <div className="text-center">
          <h2 className="text-3xl text-white">Ready to start?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Book a free, no-obligation consultation and we&apos;ll build your
            personalised investment and citizenship plan.
          </p>
          <div className="mt-7">
            <LinkButton href="/contact" variant="gold">
              Book a consultation
            </LinkButton>
          </div>
        </div>
      </Section>
    </>
  );
}
