import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Calendar } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/ui/primitives";
import { getArticles } from "@/lib/content/insights";
import { gradientClass } from "@/lib/format";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles and guides on Turkish property investment, citizenship by investment, and the Istanbul market — from the Property Quest Turkey team.",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <>
      <PageHero
        eyebrow="The PQT Blog"
        title="Guidance before you invest"
        subtitle="Practical articles on Turkish property, citizenship and markets — written by the PQT team."
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-lift"
            >
              <div className={`h-36 ${gradientClass[a.gradient]}`} />
              <div className="flex flex-1 flex-col p-5">
                <span className="badge badge-gold w-fit">{a.category}</span>
                <h2 className="mt-3 text-lg leading-snug text-navy">{a.title}</h2>
                <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">
                  {a.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {fmtDate(a.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {a.readMins} min read
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
