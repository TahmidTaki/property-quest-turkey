import {
  Section,
  SectionHead,
} from "@/components/ui/primitives";

import { buyingSteps } from "@/lib/content/investorGuide";

export function BuyingProcess() {
  return (
    <Section tone="white">
      <SectionHead
        label="How To Buy"
        title="How to Buy Property in Turkey as a Foreigner"
        lede="Most transactions complete within 2–6 weeks when documentation is properly prepared."
      />

      <div className="mx-auto max-w-5xl">
        {buyingSteps.map((step, index) => (
          <div
            key={step.number}
            className="relative flex gap-6 pb-10"
          >
            {index !== buyingSteps.length - 1 && (
              <div className="absolute left-6 top-14 h-full w-[2px] bg-line" />
            )}

            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-navy shadow-card">
              <step.icon size={20} />
            </div>

            <div className="card flex-1 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl text-navy">
                  {step.number}. {step.title}
                </h3>

                <span className="rounded-full bg-gold-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy">
                  {step.timeline}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-muted">
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-5xl rounded-xl border border-gold/30 bg-gold-soft p-6 dark:border-gold/20 dark:bg-navy/20">
  <p className="text-sm leading-7 text-ink dark:text-dark-text">
    <strong className="text-ink dark:text-dark-text">💡 Can I buy remotely?</strong> Yes. You may grant
    Power of Attorney (PoA) through a Turkish consulate,
    allowing your lawyer to complete the entire purchase on
    your behalf.
  </p>
</div>
    </Section>
  );
}