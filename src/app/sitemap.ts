import type { MetadataRoute } from "next";
import { listProperties } from "@/lib/pms/client";
import type { PmsListItem } from "@/lib/pms/client";
import { getArticles } from "@/lib/content/insights";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://pqt-website.vercel.app";
  
  let properties: PmsListItem[] = [];
  
  try {
    const result = await listProperties({ limit: 50 });
    properties = result.items;
  } catch {
    // If API fails, sitemap still works with static routes
  }

  const articles = await getArticles();

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
    ...properties.map((p) => ({ url: `${base}/projects/${p.pqt_code}` })),
    ...articles.map((a) => ({ url: `${base}/blog/${a.slug}` })),
  ];
}