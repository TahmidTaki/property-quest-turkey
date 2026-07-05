import type { MetadataRoute } from "next";
import { getProperties } from "@/lib/content/properties";
import { getArticles } from "@/lib/content/insights";

/** Ready for launch — currently moot while robots.ts blocks crawling. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://pqt-website.vercel.app";
  const [properties, articles] = await Promise.all([
    getProperties(),
    getArticles(),
  ]);

  const staticRoutes = [
    "",
    "/projects",
    "/market-pulse",
    "/blog",
    "/media",
    "/citizenship",
    "/services",
    "/about",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
  ].map((p) => ({ url: `${base}${p}` }));

  return [
    ...staticRoutes,
    ...properties.map((p) => ({ url: `${base}/projects/${p.slug}` })),
    ...articles.map((a) => ({ url: `${base}/blog/${a.slug}` })),
  ];
}
