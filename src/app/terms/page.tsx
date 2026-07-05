import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing use of the Property Quest Turkey website.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of Use" subtitle="The basics of using this site." />
      <article className="container-x mx-auto max-w-2xl py-12 text-ink/85">
        <p className="text-sm text-muted">Effective: June 2026</p>

        <h2 className="mt-6 text-xl text-navy">Information only</h2>
        <p className="mt-2 text-sm">
          Content on this website — including listings, prices, availability,
          market figures, and timelines — is indicative and for general
          information only. It does not constitute an offer, a contract, or a
          guarantee of availability, price, or eligibility. All terms are
          confirmed in writing before any commitment.
        </p>

        <h2 className="mt-6 text-xl text-navy">Preview content</h2>
        <p className="mt-2 text-sm">
          During the preview period, parts of this site (including project
          listings, market data, and portal figures) display illustrative sample
          content for demonstration. Such content is clearly marked where shown
          and is replaced by verified data at full launch.
        </p>

        <h2 className="mt-6 text-xl text-navy">Citizenship &amp; legal outcomes</h2>
        <p className="mt-2 text-sm">
          Turkish citizenship by investment is granted by the Republic of
          Türkiye and is subject to official valuation, government approval, and
          laws that may change. PQT manages applications diligently but cannot
          guarantee governmental decisions or processing times.
        </p>

        <h2 className="mt-6 text-xl text-navy">No advice</h2>
        <p className="mt-2 text-sm">
          Nothing on this website is investment, legal, or tax advice. Seek
          independent professional advice before making any decision.
        </p>

        <h2 className="mt-6 text-xl text-navy">Liability</h2>
        <p className="mt-2 text-sm">
          To the extent permitted by law, PQT accepts no liability for loss
          arising from reliance on website content. Your statutory rights are
          unaffected.
        </p>

        <h2 className="mt-6 text-xl text-navy">Contact</h2>
        <p className="mt-2 text-sm">
          Questions about these terms: {company.email} · {company.address}.
        </p>
      </article>
    </>
  );
}
