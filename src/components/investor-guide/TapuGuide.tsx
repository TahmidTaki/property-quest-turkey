import { CheckCircle2 } from "lucide-react";

import {
  Section,
  SectionHead,
} from "@/components/ui/primitives";

import {
  tapuDocuments,
  tapuTypes,
} from "@/lib/content/investorGuide";

export function TapuGuide() {
  return (
    <Section tone="ivory">
      <SectionHead
        label="Title Deed"
        title="Tapu Process in Turkey"
        lede="Without a registered Tapu in your name, you do not legally own the property."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="card p-8">
          <h3 className="text-2xl text-navy">
            What is a Tapu?
          </h3>

          <p className="mt-4 text-sm leading-7 text-muted">
            A Tapu (Tapu Senedi) is the official title deed proving
            ownership of property in Turkey. It is issued by the
            General Directorate of Land Registry and Cadastre.
          </p>

          <p className="mt-4 text-sm leading-7 text-muted">
            Foreign buyers receive exactly the same ownership rights
            as Turkish citizens, including rights to sell, rent,
            inherit, or renovate their property.
          </p>
        </div>

        <div className="space-y-4">
          {tapuTypes.map((item) => (
            <div
              key={item.title}
              className={`rounded-2xl border p-6 ${item.color}`}
            >
              <p className="text-xs font-bold uppercase tracking-wide text-muted">
                {item.subtitle}
              </p>

              <h3 className="mt-2 text-xl text-navy">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <h3 className="text-center text-2xl text-navy">
          Required Documents for Tapu Transfer
        </h3>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tapuDocuments.map((doc) => (
            <div
              key={doc}
              className="card flex items-start gap-3 p-5"
            >
              <CheckCircle2
                size={18}
                className="mt-1 shrink-0 text-ok"
              />

              <span className="text-sm text-muted">
                {doc}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-xl border border-red/20 bg-red/5 p-6">
        <p className="text-sm leading-7 text-ink">
          <strong>⚠️ Critical:</strong> A sales contract alone does
          not grant ownership. Only a registered Tapu issued by the
          Land Registry Office makes you the legal owner.
        </p>
      </div>
    </Section>
  );
}