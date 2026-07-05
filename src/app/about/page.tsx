import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHead } from "@/components/ui/primitives";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Property Quest Turkey is an Istanbul-based citizenship-by-investment real estate consultancy helping international investors buy property and obtain Turkish citizenship.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Trusted by international investors"
        subtitle={`${company.name} is an Istanbul-based consultancy guiding families through property investment and Turkish citizenship — with transparency at every step.`}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl text-navy dark:text-blue-300">Our story</h2>
          <p className="mt-3 text-ink/80 dark:text-dark-text">
            Property Quest Turkey was founded to solve a simple problem:
            international investors wanted to buy property in Istanbul and obtain
            citizenship, but faced a maze of agents, lawyers, developers and
            government offices — each with their own incentives.
          </p>
          <p className="mt-3 text-ink/80 dark:text-dark-text">
            We built a single, accountable partner for the whole journey. From
            the first viewing to the title deed, the citizenship application, and
            years of after-sales property management, one team owns your
            experience — and you can see everything in one private portal.
          </p>

          <h2 className="mt-10 text-2xl text-navy dark:text-blue-300">What we stand for</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-3">
            {[
              ["Transparency", "You see the same trusted details our internal team sees — no hidden surprises."],
              ["Accountability", "One partner owns the outcome, from purchase to passport and beyond."],
              ["Longevity", "We manage your property and renewals for years, not just the sale."],
            ].map(([t, b]) => (
              <div key={t} className="rounded-lg border border-line bg-ivory p-5 dark:border-dark-border dark:bg-dark-card">
                <h3 className="text-lg text-navy dark:text-blue-300">{t}</h3>
                <p className="mt-1.5 text-sm text-muted dark:text-dark-muted">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="white">
        <SectionHead label="By the numbers" title="A track record you can trust" />
        <dl className="mx-auto grid max-w-3xl grid-cols-2 gap-8 text-center sm:grid-cols-4">
          {[
            ["500+", "Families relocated"],
            ["$250M+", "Property transacted"],
            ["12+", "Years in Istanbul"],
            ["40+", "Nationalities served"],
          ].map(([stat, label]) => (
            <div key={label}>
              <dt className="tabular text-3xl font-extrabold text-red dark:text-red-400">{stat}</dt>
              <dd className="mt-1 text-sm text-muted dark:text-dark-muted">{label}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}