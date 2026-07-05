import type { Metadata } from "next";
import { CheckCircle2, Globe2, Clock, Users, FileText } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHead, LinkButton } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Turkish Citizenship by Investment",
  description:
    "How to obtain Turkish citizenship by investing in property — requirements, timeline, benefits, and how Property Quest Turkey manages the process end to end.",
};

export default function CitizenshipPage() {
  return (
    <>
      <PageHero
        eyebrow="Citizenship by Investment"
        title="Turkish citizenship through property"
        subtitle="Invest from $400,000 in eligible real estate and obtain citizenship for your whole family — typically within 3 to 6 months."
      />

      <Section>
        <SectionHead
          label="The benefits"
          title="Why a Turkish passport"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Globe2, title: "110+ countries", body: "Visa-free or visa-on-arrival travel, including Japan, Singapore and Hong Kong." },
            { icon: Users, title: "Whole family", body: "Spouse and children under 18 are included in a single application." },
            { icon: Clock, title: "3–6 months", body: "One of the fastest citizenship-by-investment routes in the world." },
            { icon: FileText, title: "Dual citizenship", body: "Keep your current nationality. No residency or language test required." },
          ].map((b) => (
            <div key={b.title} className="card p-6 dark:bg-dark-card dark:border-dark-border">
              <b.icon className="text-gold dark:text-yellow-400" size={26} />
              <h3 className="mt-3 text-lg text-navy dark:text-blue-300">{b.title}</h3>
              <p className="mt-1.5 text-sm text-muted dark:text-dark-muted">{b.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <SectionHead label="Requirements" title="What you need to qualify" />
        <div className="mx-auto max-w-2xl space-y-4">
          {[
            "Purchase property worth at least USD 400,000 (one unit or several combined).",
            "Commit to holding the property for a minimum of three years.",
            "Obtain an official valuation report and complete the title-deed (tapu) transfer.",
            "Submit residency and citizenship applications with supporting documents.",
          ].map((r, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-line bg-ivory p-4 dark:border-dark-border dark:bg-dark-bg">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white dark:bg-blue-700">
                {i + 1}
              </span>
              <p className="text-sm text-ink/85 dark:text-dark-text">{r}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ivory">
        <SectionHead
          label="How PQT helps"
          title="We manage the entire application"
          lede="You make one investment decision. We handle valuations, legal due diligence, tapu transfer, and the full citizenship filing — then track it to passports."
        />
        <ul className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
          {[
            "Citizenship-eligibility check on every property",
            "Independent legal due diligence",
            "Official valuation coordination",
            "Tapu (title deed) transfer handling",
            "Residency permit applications",
            "Citizenship filing & government liaison",
            "Document translation & notarisation",
            "Progress tracking in your client portal",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-ink/85 dark:text-dark-text">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-ok dark:text-green-400" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <LinkButton href="/contact" variant="navy">
            Check my eligibility
          </LinkButton>
        </div>
      </Section>
    </>
  );
}