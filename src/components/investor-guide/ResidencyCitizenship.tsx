import { CheckCircle2 } from "lucide-react";

import {
  Section,
  SectionHead,
  LinkButton,
} from "@/components/ui/primitives";

import { residencyOptions } from "@/lib/content/investorGuide";

export function ResidencyCitizenship() {
  return (
    <Section tone="ivory">
      <SectionHead
        label="Residency & Citizenship"
        title="Residence Permit & Citizenship Through Property"
        lede="Turkey offers two major pathways for foreign property investors."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        {residencyOptions.map((option) => (
          <div
            key={option.title}
            className={`rounded-2xl border p-8 ${option.color}`}
          >
            <h3 className="text-2xl text-navy">
              {option.title}
            </h3>

            <p className="mt-2 font-bold text-gold">
              {option.requirement}
            </p>

            <ul className="mt-6 space-y-3">
              {option.benefits.map((item) => (
                <li
                  key={item}
                  className="flex gap-3"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-1 text-ok"
                  />

                  <span className="text-sm text-muted">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <LinkButton
          href="/citizenship"
          variant="gold"
        >
          Learn About Citizenship
        </LinkButton>
      </div>
    </Section>
  );
}