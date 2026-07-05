import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about buying property in Istanbul and obtaining Turkish citizenship by investment.",
};

const faqs = [
  {
    q: "How much do I need to invest for Turkish citizenship?",
    a: "The minimum is USD 400,000 in real estate, held for at least three years. This can be a single property or several units combined.",
  },
  {
    q: "How long does the citizenship process take?",
    a: "Typically 3 to 6 months from completing your purchase, depending on document readiness and government processing times.",
  },
  {
    q: "Does my family get citizenship too?",
    a: "Yes. Your spouse and children under 18 are included in the same application.",
  },
  {
    q: "Do I have to live in Turkey?",
    a: "No. There is no residency requirement and no language test for citizenship by investment.",
  },
  {
    q: "Can I keep my current nationality?",
    a: "Turkey permits dual citizenship, so in most cases you keep your existing passport. Check your home country's rules to be sure.",
  },
  {
    q: "Can I rent out the property?",
    a: "Yes. PQT can manage tenant placement, rent collection and maintenance for you — and you can track it in your client portal.",
  },
  {
    q: "What does PQT charge?",
    a: "Our consultation is free. Service fees depend on the package you choose and are agreed in writing before you commit to anything.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Questions"
        title="Frequently asked questions"
        subtitle="Everything you need to know about property investment and citizenship in Turkey."
      />
      <Section>
        <div className="mx-auto max-w-2xl space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-lg border border-line bg-white p-5 [&_summary]:cursor-pointer"
            >
              <summary className="flex list-none items-center justify-between text-base font-semibold text-navy [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-gold transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-ink/80">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
