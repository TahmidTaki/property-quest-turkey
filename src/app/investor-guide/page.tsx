import type { Metadata } from "next";

import { PageHero } from "@/components/site/PageHero";
import { HeroStats } from "@/components/investor-guide/HeroStats";
import { WhyTurkey } from "@/components/investor-guide/WhyTurkey";
import { BuyingProcess } from "@/components/investor-guide/BuyingProcess";
import { TapuGuide } from "@/components/investor-guide/TapuGuide";
import { CostsAndTaxes } from "@/components/investor-guide/CostsAndTaxes";
import { ResidencyCitizenship } from "@/components/investor-guide/ResidencyCitizenship";
import { BankingPracticals } from "@/components/investor-guide/BankingPracticals";
import { LegalProtections } from "@/components/investor-guide/LegalProtections";
import { PropertyTypes } from "@/components/investor-guide/PropertyTypes";
import { InvestorCTA } from "@/components/investor-guide/InvestorCTA";
import { WhereToInvest } from "@/components/investor-guide/WhereToInvest";
import { FaqSection } from "@/components/investor-guide/FaqSection";

export const metadata: Metadata = {
  title: "Investor Guide",
  description:
    "Everything international investors need to know about buying property in Turkey.",
};

export default function InvestorGuidePage() {
  return (
    <>
  <PageHero
    eyebrow="Property Quest Turkey"
    title="Investor Guide to Turkish Real Estate"
    subtitle="A complete handbook for international investors exploring property ownership, residency, and citizenship opportunities in Turkey."
  />

  <section className="-mt-8 bg-gradient-to-br from-navy to-ink pb-20">
    <div className="container-x">
      <HeroStats />
    </div>
  </section>

  <WhyTurkey />
  <BuyingProcess />
  <WhereToInvest />

  <TapuGuide />
  <CostsAndTaxes />

   <ResidencyCitizenship />

    <BankingPracticals />
    <LegalProtections />

    <PropertyTypes />
    <FaqSection />

    <InvestorCTA />
</>
  );
}