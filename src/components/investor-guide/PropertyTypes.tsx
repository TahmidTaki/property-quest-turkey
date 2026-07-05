import {
  Section,
  SectionHead,
} from "@/components/ui/primitives";

import {
  propertyTypes,
} from "@/lib/content/investorGuide";

export function PropertyTypes() {
  return (
    <Section tone="white">
      <SectionHead
        label="Investment Options"
        title="Types of Investment Properties"
        lede="Turkey offers opportunities across residential, commercial, and land investments."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {propertyTypes.map((item) => (
          <div
            key={item.title}
            className="card p-6 text-center transition hover:-translate-y-1 hover:shadow-lift"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft">
              <item.icon
                size={24}
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
    </Section>
  );
}