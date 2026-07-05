"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/lib/site";
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
            width={180}
            height={45}
            className="h-9 w-auto dark:brightness-0 dark:invert"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {mainNav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-navy dark:hover:text-blue-300 ${
                  active ? "text-navy dark:text-blue-300" : "text-ink dark:text-dark-text"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          

          <Link href={accountHref} className="btn btn-outline px-4 py-2 dark:border-dark-border dark:text-dark-text dark:hover:bg-dark-card dark:hover:text-white">
            {accountLabel}
          </Link>
          <Link href="/contact" className="btn btn-primary px-4 py-2">
            Book a call
          </Link>
          {/* Theme toggle with label - wrap in a div */}
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-ink dark:text-dark-text">Theme:</span>
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
            <div className="mt-3 flex gap-3">
              <div className="flex items-center gap-1.5">
                <ThemeToggle />
                <span className="text-sm font-medium text-ink dark:text-dark-text">Theme</span>
              </div>
              <Link
                href={accountHref}
                onClick={() => setOpen(false)}
                className="btn btn-outline flex-1 py-2 dark:border-dark-border dark:text-dark-text dark:hover:bg-dark-card dark:hover:text-white"
              >
                {accountLabel}
              </Link>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn btn-primary flex-1 py-2"
              >
                Book a call
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}