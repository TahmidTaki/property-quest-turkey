"use client";

import { useState } from "react";

import {
  Section,
  SectionHead,
} from "@/components/ui/primitives";

import { investmentCities } from "@/lib/content/investorGuide";

export function WhereToInvest() {
  const [selected, setSelected] = useState("istanbul");

  const city =
    investmentCities.find(
      (c) => c.id === selected,
    ) ?? investmentCities[0];

  return (
    <Section tone="ivory">
      <SectionHead
        label="Where To Invest"
        title="Top Investment Cities Across Turkey"
        lede="Turkey offers diverse investment destinations — from cosmopolitan Istanbul to Mediterranean coastlines and luxury Aegean retreats."
      />

      {/* Tabs */}
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {investmentCities.map((item) => {
          const active =
            item.id === selected;

          return (
            <button
              key={item.id}
              onClick={() =>
                setSelected(item.id)
              }
              className={`
                rounded-xl border px-6 py-3 text-sm font-semibold transition
                ${
                  active
                    ? "border-navy bg-navy text-gold"
                    : "border-line bg-white text-ink hover:border-gold"
                }
              `}
            >
              <span className="mr-2">
                {item.emoji}
              </span>

              {item.name}
            </button>
          );
        })}
      </div>

      {/* Content Card */}
      <div className="card p-10 md:p-12">
        <div className="flex items-center gap-4">
          <div className="text-4xl">
            {city.emoji}
          </div>

          <div>
            <h3 className="font-serif text-5xl text-navy">
              {city.name}
            </h3>

            <span className="mt-2 inline-flex rounded-md bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy">
              {city.badge}
            </span>
          </div>
        </div>

        <div className="mt-10 space-y-8">
          {city.paragraphs.map(
            (paragraph, index) => (
              <p
                key={index}
                className="text-[17px] leading-9 text-slate-600"
              >
                {paragraph}
              </p>
            ),
          )}
        </div>
      </div>
    </Section>
  );
}