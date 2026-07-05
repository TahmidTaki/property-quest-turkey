/**
 * Insights & Media — blog articles, YouTube videos, podcast episodes.
 *
 * DEMO: sample content. LIVE: swap getters for a CMS (e.g. the PMS, Sanity, or
 * a YouTube/RSS feed). Video cards use brand gradients instead of external
 * thumbnails so nothing breaks on a flaky connection; real embeds plug into the
 * detail view later.
 */

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  author: string;
  date: string; // ISO
  category: string;
  readMins: number;
  gradient: string;
}

export interface Video {
  id: string;
  title: string;
  duration: string;
  date: string;
  youtubeUrl: string;
  gradient: string;
}

export interface Podcast {
  id: string;
  title: string;
  episode: number;
  duration: string;
  date: string;
  listenUrl: string; // empty = not yet published ("coming soon")
}

const ARTICLES: Article[] = [
  {
    slug: "turkish-citizenship-2026-guide",
    title: "The 2026 guide to Turkish citizenship by investment",
    excerpt:
      "Everything an international investor needs to know about qualifying for Turkish citizenship through real estate this year.",
    body: [
      "Turkey's citizenship-by-investment programme remains one of the fastest and most accessible in the world. With a minimum real-estate investment of USD 400,000 held for three years, investors and their families can obtain citizenship — typically within three to six months.",
      "In this guide we walk through the eligibility requirements, the documents you'll need, the role of the official valuation, and how the title-deed (tapu) transfer works in practice.",
      "PQT manages the entire process end-to-end: from selecting an eligible property, through legal due diligence, to filing the citizenship application and tracking it to passports.",
    ],
    author: "PQT Research",
    date: "2026-05-20",
    category: "Citizenship",
    readMins: 8,
    gradient: "bosphorus",
  },
  {
    slug: "istanbul-districts-to-watch",
    title: "Five Istanbul districts to watch in 2026",
    excerpt:
      "From Beşiktaş waterfront to Başakşehir's new metro corridor — where the smart money is looking.",
    body: [
      "Istanbul is not one market but dozens. Each district has its own price trajectory, rental dynamics, and citizenship-eligibility profile.",
      "We rank five districts by capital-growth potential and rental yield, and explain what's driving demand in each — new infrastructure, branded residences, and shifting buyer demographics.",
    ],
    author: "PQT Research",
    date: "2026-05-06",
    category: "Market",
    readMins: 6,
    gradient: "garden",
  },
  {
    slug: "lira-and-your-investment",
    title: "The lira, inflation, and what they mean for your investment",
    excerpt:
      "How currency movements affect dollar-denominated property returns — and how to think about timing.",
    body: [
      "For dollar-based investors, the Turkish lira's movements can feel alarming. But property priced and transacted in USD behaves differently from lira savings.",
      "We unpack the relationship between the exchange rate, local construction costs, and your effective entry price — and why many investors treat currency cycles as an opportunity rather than a risk.",
    ],
    author: "PQT Research",
    date: "2026-04-18",
    category: "Economy",
    readMins: 5,
    gradient: "marina",
  },
];

const VIDEOS: Video[] = [
  { id: "v1", title: "Inside a Bosphorus-front citizenship project — full tour", duration: "12:04", date: "2026-05-15", youtubeUrl: "https://www.youtube.com/@propertyquestturkey", gradient: "bosphorus" },
  { id: "v2", title: "Turkish citizenship explained in 8 minutes", duration: "08:21", date: "2026-04-29", youtubeUrl: "https://www.youtube.com/@propertyquestturkey", gradient: "skyline" },
  { id: "v3", title: "Istanbul market update — Q2 2026", duration: "15:47", date: "2026-04-10", youtubeUrl: "https://www.youtube.com/@propertyquestturkey", gradient: "coast" },
];

const PODCASTS: Podcast[] = [
  { id: "p1", title: "Buying property in Istanbul as a foreigner — start to finish", episode: 14, duration: "38 min", date: "2026-05-12", listenUrl: "" },
  { id: "p2", title: "What Gulf investors get right about Turkish real estate", episode: 13, duration: "42 min", date: "2026-04-28", listenUrl: "" },
  { id: "p3", title: "Citizenship, residency, and tax — the full picture", episode: 12, duration: "35 min", date: "2026-04-14", listenUrl: "" },
];

export async function getArticles() {
  return ARTICLES;
}
export async function getArticleBySlug(slug: string) {
  return ARTICLES.find((a) => a.slug === slug) ?? null;
}
export async function getVideos() {
  return VIDEOS;
}
export async function getPodcasts() {
  return PODCASTS;
}
