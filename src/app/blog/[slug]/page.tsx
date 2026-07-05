import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { LinkButton } from "@/components/ui/primitives";
import { getArticles, getArticleBySlug } from "@/lib/content/insights";
import { gradientClass } from "@/lib/format";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticleBySlug(slug);
  if (!a) return { title: "Article not found" };
  return { title: a.title, description: a.excerpt };
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <article>
      <div className={`h-56 ${gradientClass[article.gradient]}`} />
      <div className="container-x max-w-2xl py-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:underline"
        >
          <ArrowLeft size={15} /> All articles
        </Link>

        <span className="badge badge-gold mt-5 w-fit">{article.category}</span>
        <h1 className="mt-3 text-3xl text-navy sm:text-4xl">{article.title}</h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 border-b border-line pb-5 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <User size={14} /> {article.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} /> {fmtDate(article.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} /> {article.readMins} min read
          </span>
        </div>

        <div className="mt-6 space-y-4 text-ink/85">
          {article.body.map((para, i) => (
            <p key={i} className="leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-10 rounded-xl bg-ivory p-6 text-center">
          <h2 className="text-xl text-navy">Ready to take the next step?</h2>
          <p className="mt-2 text-sm text-muted">
            Book a free consultation and we&apos;ll build your personalised
            investment and citizenship plan.
          </p>
          <div className="mt-4">
            <LinkButton href="/contact" variant="primary">
              Book a consultation
            </LinkButton>
          </div>
        </div>
      </div>
    </article>
  );
}
