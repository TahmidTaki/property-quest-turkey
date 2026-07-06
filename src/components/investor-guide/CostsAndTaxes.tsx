import { Section, SectionHead } from "@/components/ui/primitives";
import { purchaseCosts } from "@/lib/content/investorGuide";

export function CostsAndTaxes() {
  return (
    <Section tone="white">
      <SectionHead
        label="Purchase Costs"
        title="Property Purchase Costs, Taxes & Fees"
        lede="Understanding all associated costs helps investors plan accurately."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {purchaseCosts.map((item) => (
          <div
            key={item.title}
            className="card p-6 transition hover:shadow-lift"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg text-navy">
                {item.title}
              </h3>

              <span className="rounded-full bg-gold-soft px-3 py-1 text-sm font-bold text-navy">
                {item.value}
              </span>
            </div>

            <p className="mt-4 text-sm leading-7 text-muted">
              {item.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-gold/20 bg-gold-soft p-5 dark:border-gold/15 dark:bg-navy/30">
        <p className="text-sm text-ink dark:text-dark-text">
          <strong className="text-ink dark:text-dark-text">Tip:</strong> Always budget an additional
          5–7% beyond the purchase price to comfortably cover
          all taxes, legal services, and administrative costs.
        </p>
      </div>
    </Section>
  );
}