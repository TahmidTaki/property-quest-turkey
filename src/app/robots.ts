import type { MetadataRoute } from "next";

/**
 * PREVIEW MODE: block all crawlers while the site runs on sample data.
 * At real launch (custom domain + live PMS data), switch to:
 *   rules: { userAgent: "*", allow: "/", disallow: ["/portal", "/login", "/buy"] },
 *   sitemap: "https://propertyquestturkey.com/sitemap.xml"
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
