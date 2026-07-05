import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Property Quest Turkey collects and uses your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" subtitle="How we handle your information." />
      <article className="container-x mx-auto max-w-2xl py-12 text-ink/85">
        <p className="text-sm text-muted">Effective: June 2026</p>

        <h2 className="mt-6 text-xl text-navy">Who we are</h2>
        <p className="mt-2 text-sm">
          {company.name} (&quot;PQT&quot;, &quot;we&quot;) is an Istanbul-based
          real-estate consultancy serving international investors. This policy
          explains how we handle personal information collected through this
          website.
        </p>

        <h2 className="mt-6 text-xl text-navy">What we collect</h2>
        <p className="mt-2 text-sm">
          When you contact us, request a consultation, or submit a reservation
          request, we collect the details you choose to provide — such as your
          name, email address, phone number, budget range, and message. We do
          not collect payment information through this website.
        </p>

        <h2 className="mt-6 text-xl text-navy">How we use it</h2>
        <p className="mt-2 text-sm">
          We use your information solely to respond to your enquiry, provide our
          services, and — where you have asked us to — keep you informed about
          relevant opportunities. We do not sell your personal data. Enquiries
          are delivered to our team via a transactional email provider acting as
          a data processor.
        </p>

        <h2 className="mt-6 text-xl text-navy">Retention &amp; security</h2>
        <p className="mt-2 text-sm">
          We keep enquiry data only as long as needed to handle your request and
          meet legal obligations, and we apply appropriate technical measures to
          protect it.
        </p>

        <h2 className="mt-6 text-xl text-navy">Your rights</h2>
        <p className="mt-2 text-sm">
          Subject to applicable law — including the Turkish Personal Data
          Protection Law (KVKK) and, where it applies, the EU GDPR — you may
          request access to, correction of, or deletion of your personal data at
          any time by emailing{" "}
          <a href={`mailto:${company.email}`} className="font-semibold text-navy">
            {company.email}
          </a>
          .
        </p>

        <h2 className="mt-6 text-xl text-navy">Cookies</h2>
        <p className="mt-2 text-sm">
          This site uses only functional cookies (for example, to keep you
          logged in to the client portal). We do not use advertising or
          cross-site tracking cookies.
        </p>

        <h2 className="mt-6 text-xl text-navy">Contact</h2>
        <p className="mt-2 text-sm">
          Questions about this policy: {company.email} · {company.address}.
        </p>
      </article>
    </>
  );
}
