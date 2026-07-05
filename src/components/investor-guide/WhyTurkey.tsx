import { Section, SectionHead } from "@/components/ui/primitives";
import { whyTurkey } from "@/lib/content/investorGuide";

export function WhyTurkey() {
  return (
    <Section tone="ivory">
      <SectionHead
        label="Investment Benefits"
        title="Why Invest in Turkish Real Estate?"
        lede="Turkey offers a unique combination of capital appreciation, lifestyle opportunities, citizenship benefits, and strategic global access."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {whyTurkey.map((item) => (
          <div
            key={item.title}
            className="card p-7 transition hover:-translate-y-1 hover:shadow-lift"
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
    </Section>
  );
}