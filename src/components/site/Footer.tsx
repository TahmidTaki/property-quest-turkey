import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { company, footerNav } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="text-lg font-extrabold text-white">
            Property<span className="text-red">Quest</span>Turkey
          </div>
          <p className="mt-3 max-w-sm text-sm text-white/70">{company.tagline}</p>
          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={15} className="text-gold" /> {company.address}
            </li>
            <li className="flex items-center gap-2">
              <Mail size={15} className="text-gold" />
              <a href={`mailto:${company.email}`} className="hover:text-white">
                {company.email}
              </a>
            </li>
            {company.phone && (
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-gold" /> {company.phone}
              </li>
            )}
          </ul>
        </div>

        {footerNav.map((group) => (
          <div key={group.title}>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
              {group.title}
            </h4>
            <ul className="space-y-2 text-sm">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/55 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p>{company.hours}</p>
        </div>
      </div>
    </footer>
  );
}
