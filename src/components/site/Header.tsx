"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X , ChevronDown } from "lucide-react";
import {
  mainNav,
  resourceNav,
  companyNav,
} from "@/lib/site";
import { PORTAL_HINT_COOKIE } from "@/lib/auth/constants";
import { ThemeToggle } from "@/components/ThemeProvider";
import Image from "next/image";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    setHasSession(document.cookie.includes(`${PORTAL_HINT_COOKIE}=1`));
  }, [pathname]);

  const accountHref = hasSession ? "/portal" : "/login";
  const accountLabel = hasSession ? "My portal" : "Client login";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 shadow-card backdrop-blur dark:border-dark-border dark:bg-dark-bg/95">
      <div className="container-x flex items-center justify-between py-3.5">
        <Link href="/" className="flex items-center shrink-0">
          <Image
        src="/images/PQT_logo.svg"
        alt="Property Quest Turkey"
        width={220}
        height={55}
        className="h-11 w-auto dark:brightness-0 dark:invert"
        priority
        />
        </Link>

        <nav className="hidden items-center gap-7 xl:flex">
  {mainNav.map((item) => {
    const active = pathname.startsWith(item.href);

    return (
      <Link
        key={item.href}
        href={item.href}
        className={`relative pb-1 text-[15px] font-medium transition
          ${
            active
              ? "text-navy after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-gold"
              : "text-ink hover:text-navy dark:text-dark-text dark:hover:text-blue-300"
          }`}
      >
        {item.label}
      </Link>
    );
  })}

  {/* Resources */}
  <div className="group relative flex items-center h-full">
    <button
  className="
    flex items-center gap-1
    text-[15px]
    font-medium
    text-ink
    transition
    hover:text-navy
    dark:text-dark-text
    dark:hover:text-blue-300
  "
>
      Resources <ChevronDown size={16} className="transition group-hover:rotate-180" />
    </button>

    <div className="invisible absolute left-0 top-full z-50 mt-4 w-48 rounded-2xl border border-line bg-white p-2 opacity-0 shadow-lift transition-all group-hover:visible group-hover:opacity-100 dark:border-dark-border dark:bg-dark-card">
      {resourceNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block rounded-xl px-4 py-3 text-sm hover:bg-ivory dark:hover:bg-dark-bg"
        >
          {item.label}
        </Link>
      ))}
    </div>
  </div>

  {/* Company */}
  <div className="group relative flex items-center h-full">
    <button
  className="
    flex items-center gap-1
    text-[15px]
    font-medium
    text-ink
    transition
    hover:text-navy
    dark:text-dark-text
    dark:hover:text-blue-300
  "
>
      Company
  <ChevronDown
    size={16}
    className="transition duration-200 group-hover:rotate-180"
  />
    </button>

    <div className="invisible absolute left-0 top-full z-50 mt-4 w-48 rounded-2xl border border-line bg-white p-2 opacity-0 shadow-lift transition-all group-hover:visible group-hover:opacity-100 dark:border-dark-border dark:bg-dark-card">
      {companyNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block rounded-xl px-4 py-3 text-sm hover:bg-ivory dark:hover:bg-dark-bg"
        >
          {item.label}
        </Link>
      ))}
    </div>
  </div>
</nav>

        <div className="hidden items-center gap-3 xl:flex">
          

          <Link
            href={accountHref}
            className="text-sm font-medium text-navy transition hover:text-red dark:text-blue-300"
          >
            {accountLabel}
          </Link>
          <Link href="/contact" className="btn btn-primary px-4 py-2">
            Book a call
          </Link>

          <div className="rounded-full border border-line p-2 dark:border-dark-border">
            <ThemeToggle />
          </div>
        </div>

        <button
          className="xl:hidden dark:text-dark-text"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-line bg-white dark:border-dark-border dark:bg-dark-card xl:hidden">
          <nav className="container-x flex flex-col py-3">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm font-medium text-ink dark:text-dark-text dark:hover:text-blue-300"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 border-t border-line pt-3 dark:border-dark-border">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gold">
                Resources
              </p>

              {resourceNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-sm font-medium text-ink dark:text-dark-text"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-3 border-t border-line pt-3 dark:border-dark-border">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gold">
                Company
              </p>

              {companyNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-sm font-medium text-ink dark:text-dark-text"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            {/* Mobile actions */}
            <div className="mt-6 border-t border-line pt-4 dark:border-dark-border">
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="text-sm font-medium text-ink dark:text-dark-text">
                  Theme
                </span>

                <div className="rounded-full border border-line p-2 dark:border-dark-border">
                  <ThemeToggle />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href={accountHref}
                  onClick={() => setOpen(false)}
                  className="btn btn-outline w-full py-2 dark:border-dark-border dark:text-dark-text"
                >
                  {accountLabel}
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="btn btn-primary w-full py-2"
                >
                  Book a call
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}