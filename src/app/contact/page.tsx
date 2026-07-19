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
                <MapPin size={16} className="text-gold shrink-0" />
                <span>{company.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-gold shrink-0" />
                <a href={`mailto:${company.email}`} className="hover:text-navy dark:hover:text-blue-300">
                  {company.email}
                </a>
              </li>
              {company.phone && (
                <li className="flex items-center gap-2.5">
                  <Phone size={16} className="text-gold shrink-0" />
                  <a
                    href={`tel:${company.phone.replace(/[^0-9+]/g, "")}`}
                    className="hover:text-navy dark:hover:text-blue-300"
                  >
                    {company.phone}
                  </a>
                </li>
              )}
              {company.whatsapp && (
                <li className="flex items-center gap-2.5">
                  <MessageCircle size={16} className="text-gold shrink-0" />
                  <a
                    href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-navy dark:hover:text-blue-300"
                  >
                    {company.whatsapp}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-2.5">
                <Clock size={16} className="text-gold shrink-0" />
                <span>{company.hours}</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl bg-navy p-6 text-white">
            <h3 className="text-lg text-white">Get in touch</h3>
            <div className="mt-4 space-y-3">
              {company.whatsapp && (
                <a
                  href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
                >
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
              )}
              <a
                href={`mailto:${company.email}`}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <Mail size={16} /> Email us
              </a>
              {company.phone && (
                <a
                  href={`tel:${company.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  <Phone size={16} /> Call us
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}