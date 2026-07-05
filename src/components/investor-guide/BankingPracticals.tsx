import {
  Section,
  SectionHead,
} from "@/components/ui/primitives";

import { bankingCards } from "@/lib/content/investorGuide";

export function BankingPracticals() {
  return (
    <Section tone="white">
      <SectionHead
        label="Banking & Practical Essentials"
        title="Banking, Taxes & Practical Information"
        lede="Everything you need after purchasing your property."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {bankingCards.map((item) => (
          <div
            key={item.title}
            className="card p-6"
          >
            <h3 className="text-lg text-navy">
              {item.title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-muted">
              {item.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-gold/20 bg-gold-soft p-5">
        <p className="text-sm text-ink">
          Foreign investors can manage almost every aspect
          of ownership remotely through Power of Attorney
          and professional property management services.
        </p>
      </div>
    </Section>
  );
}