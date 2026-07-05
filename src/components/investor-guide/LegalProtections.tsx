import {
  Section,
  SectionHead,
} from "@/components/ui/primitives";

import {
  legalProtections,
} from "@/lib/content/investorGuide";

export function LegalProtections() {
  return (
    <Section tone="ivory">
      <SectionHead
        label="Legal Framework"
        title="Legal Protections & Restrictions"
        lede="Turkey maintains a transparent legal system for foreign property ownership with clearly defined rights and safeguards."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {legalProtections.map((item) => (
          <div
            key={item.title}
            className="card p-7 transition hover:shadow-lift"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-soft">
              <item.icon
                size={22}
                className="text-navy"
              />
            </div>

            <h3 className="text-lg text-navy">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-muted">
              {item.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-red/20 bg-red/5 p-5">
        <p className="text-sm text-ink">
          <strong>Important:</strong> Foreign buyers should always
          conduct legal due diligence and use independent legal
          representation before signing contracts.
        </p>
      </div>
    </Section>
  );
}