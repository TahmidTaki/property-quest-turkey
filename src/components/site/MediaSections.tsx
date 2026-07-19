import Link from "next/link";
import {
  Play,
  Headphones,
  Clock,
  Calendar,
  ArrowRight,
  Youtube,
} from "lucide-react";
import { Section, SectionHead, LinkButton } from "@/components/ui/primitives";
import type { Article, Video, Podcast } from "@/lib/content/insights";
import { gradientClass } from "@/lib/format";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getGradientForArticle(gradient: string): string {
  const fallback = "bg-gradient-to-br from-navy to-[#0066a6]";
  return gradientClass[gradient] || fallback;
}

export function BlogTeaser({ articles }: { articles: Article[] }) {
  const display = articles.slice(0, 3);

  return (
    <Section tone="white">
      <SectionHead
        label="The PQT Blog"
        title="From the blog"
        lede="Practical articles on Turkish property, citizenship and markets — written by the PQT team."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {display.map((a) => (
          <Link
            key={a.slug}
            href={`/blog/${a.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-lift dark:border-dark-border dark:bg-dark-card"
          >
            <div className={`h-32 ${getGradientForArticle(a.gradient)}`} />
            <div className="flex flex-1 flex-col p-5">
              <span className="badge badge-gold w-fit dark:bg-navy/30 dark:text-gold">
                {a.category}
              </span>
              <h3 className="mt-3 text-base leading-snug text-navy dark:text-blue-300">
                {a.title}
              </h3>
              <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted dark:text-dark-muted">
                {a.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-muted dark:text-dark-muted">
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
      <div className="mt-10 text-center">
        <LinkButton href="/blog" variant="navy">
          Read all articles <ArrowRight size={16} />
        </LinkButton>
      </div>
    </Section>
  );
}

export function MediaTeaser({
  videos,
  podcasts,
}: {
  videos: Video[];
  podcasts: Podcast[];
}) {
  const displayVideos = videos.slice(0, 2);

  return (
    <section className="bg-[#0c2038] py-16 sm:py-20">
      <div className="container-x">
        <div className="mx-auto mb-11 max-w-2xl text-center">
          <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.16em] text-gold dark:text-yellow-400">
            Videos & Podcasts
          </p>
          <h2 className="text-3xl text-white sm:text-4xl">Watch & listen</h2>
          <p className="mt-3 text-white/70">
            Project tours and market updates on video — and deeper conversations
            on the PQT Podcast.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {displayVideos.map((v) => (
            <a
              key={v.id}
              href={v.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-2xl ring-1 ring-white/10 transition hover:-translate-y-1 hover:ring-gold/40"
            >
              <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-navy to-[#0066a6]">
                <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-red dark:bg-white/90 dark:text-red">
                  <Youtube size={13} /> Video
                </span>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-navy shadow-lg transition group-hover:scale-110 dark:bg-white/90 dark:text-navy">
                  <Play size={22} className="ml-0.5" />
                </span>
                <span className="absolute bottom-3 right-3 rounded bg-black/70 px-1.5 py-0.5 text-xs font-semibold text-white">
                  {v.duration}
                </span>
              </div>
              <div className="bg-white/[0.04] p-5">
                <h3 className="text-base leading-snug text-white">{v.title}</h3>
                <p className="mt-1.5 text-xs text-white/60">{fmtDate(v.date)}</p>
              </div>
            </a>
          ))}

          <div className="flex flex-col rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10">
            <div className="flex items-center gap-2 text-gold dark:text-yellow-400">
              <Headphones size={20} />
              <span className="text-sm font-bold uppercase tracking-wide">
                The PQT Podcast
              </span>
            </div>
            <ul className="mt-4 flex-1 divide-y divide-white/10">
              {podcasts.slice(0, 3).map((p) => {
                const row = (
                  <>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold transition group-hover:bg-gold group-hover:text-ink dark:text-yellow-400">
                      <Play size={14} className="ml-0.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">
                        {p.title}
                      </p>
                      <p className="text-xs text-white/60">
                        Ep. {p.episode} · {p.duration}
                        {!p.listenUrl && " · Coming soon"}
                      </p>
                    </div>
                  </>
                );

                return p.listenUrl ? (
                  <a
                    key={p.id}
                    href={p.listenUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 py-3"
                  >
                    {row}
                  </a>
                ) : (
                  <div key={p.id} className="group flex items-center gap-3 py-3 opacity-90">
                    {row}
                  </div>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <LinkButton href="/media" variant="gold" external>
            Explore videos & podcasts <ArrowRight size={16} />
          </LinkButton>
        </div>
      </div>
    </section>
  );
}