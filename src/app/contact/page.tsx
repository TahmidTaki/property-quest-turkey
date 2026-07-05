import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { LeadForm } from "@/components/forms/LeadForm";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free consultation with Property Quest Turkey. Get a tailored property shortlist and a clear Turkish citizenship timeline.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>;
}) {
  const { project } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Book a free consultation"
        subtitle="Tell us your goals and budget. We'll send a tailored shortlist and a clear citizenship timeline — no obligation."
      />

      <div className="container-x grid gap-10 py-14 lg:grid-cols-[1fr_360px]">
        <div className="card p-7">
          {project && (
            <p className="mb-4 rounded-lg bg-gold-soft px-4 py-2.5 text-sm text-ink">
              Enquiry about: <span className="font-semibold">{project}</span>
            </p>
          )}
          <h2 className="mb-5 text-2xl text-navy">Send us a message</h2>
          <LeadForm kind={project ? "enquiry" : "contact"} project={project} />
        </div>

        <aside className="space-y-5">
          <div className="card p-6">
            <h3 className="text-lg text-navy">Contact details</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <MapPin size={16} className="text-gold" /> {company.address}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-gold" />
                <a href={`mailto:${company.email}`} className="hover:text-navy">
                  {company.email}
                </a>
              </li>
              {company.phone && (
                <li className="flex items-center gap-2.5">
                  <Phone size={16} className="text-gold" /> {company.phone}
                </li>
              )}
              {company.whatsapp && (
                <li className="flex items-center gap-2.5">
                  <MessageCircle size={16} className="text-gold" />{" "}
                  {company.whatsapp}
                </li>
              )}
              <li className="flex items-center gap-2.5">
                <Clock size={16} className="text-gold" /> {company.hours}
              </li>
            </ul>
          </div>

          {company.whatsapp ? (
            <div className="rounded-xl bg-navy p-6 text-white">
              <h3 className="text-lg text-white">Prefer to talk now?</h3>
              <p className="mt-2 text-sm text-white/80">
                Message us on WhatsApp for the fastest response during business
                hours.
              </p>
              <a
                href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-gold mt-4 w-full"
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </div>
          ) : (
            <div className="rounded-xl bg-navy p-6 text-white">
              <h3 className="text-lg text-white">Prefer email?</h3>
              <p className="mt-2 text-sm text-white/80">
                Write to us directly — we reply within one business day.
              </p>
              <a
                href={`mailto:${company.email}`}
                className="btn btn-gold mt-4 w-full"
              >
                <Mail size={16} /> {company.email}
              </a>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
