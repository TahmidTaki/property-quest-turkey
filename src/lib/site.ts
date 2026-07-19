/** Central site configuration — company facts, nav, contact. One place to edit. */

export const company = {
  name: "Property Quest Turkey",
  shortName: "PQT",
  domain: "propertyquestturkey.com",
  tagline: "Your gateway to Turkish citizenship through property.",
  city: "Istanbul",
  email: "info@propertyquestturkey.com",
  salesEmail: "sales@propertyquestturkey.com",
  phone: "+905063430709" as string,
  whatsapp: "+905063430709" as string,
  address: "Levent, Istanbul, Türkiye",
  hours: "Mon–Sat, 09:00–19:00 (GMT+3)",
} as const;

/** Primary public navigation (logo links home). */
export const mainNav = [
  { href: "/projects", label: "Projects" },
  { href: "/market-pulse", label: "Market Pulse" },
  { href: "/investor-guide", label: "Investor Guide" },
  { href: "/citizenship", label: "Citizenship" },
] as const;

export const resourceNav = [
  { href: "/blog", label: "Blog" },
  { href: "/media", label: "Media" },
] as const;

export const companyNav = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** Footer link groups. */
export const footerNav = [
  {
    title: "Explore",
    links: [
      { href: "/projects", label: "Browse projects" },
      { href: "/market-pulse", label: "Market Pulse (live)" },
      { href: "/blog", label: "Blog" },
      { href: "/media", label: "Videos & podcasts" },
      { href: "/citizenship", label: "Citizenship by investment" },
      { href: "/services", label: "Our services" },
      { href: "/about", label: "About PQT" },
    ],
  },
  {
    title: "Clients",
    links: [
      { href: "/login", label: "Client login" },
      { href: "/contact", label: "Book a consultation" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of use" },
    ],
  },
] as const;
