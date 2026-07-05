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

/** Homepage blog section — articles only. */
export function BlogTeaser({ articles }: { articles: Article[] }) {
  return (
    <Section tone="white">
      <SectionHead
        label="The PQT Blog"
        title="From the blog"
        lede="Practical articles on Turkish property, citizenship and markets — written by the PQT team."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, 3).map((a) => (
          <Link
            key={a.slug}
            href={`/blog/${a.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-lift"
          >
            <div className={`h-32 ${gradientClass[a.gradient]}`} />
            <div className="flex flex-1 flex-col p-5">
              <span className="badge badge-gold w-fit">{a.category}</span>
              <h3 className="mt-3 text-base leading-snug text-navy">{a.title}</h3>
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
      <div className="mt-10 text-center">
        <LinkButton href="/blog" variant="navy">
          Read all articles <ArrowRight size={16} />
        </LinkButton>
      </div>
    </Section>
  );
}

/** Homepage media section — videos and podcasts TOGETHER on a dark band. */
export function MediaTeaser({
  videos,
  podcasts,
}: {
  videos: Video[];
  podcasts: Podcast[];
}) {
  return (
    <section className="bg-[#0c2038] py-16 sm:py-20">
      <div className="container-x">
        <div className="mx-auto mb-11 max-w-2xl text-center">
          <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.16em] text-gold">
            Videos &amp; Podcasts
          </p>
          <h2 className="text-3xl text-white sm:text-4xl">Watch &amp; listen</h2>
          <p className="mt-3 text-white/70">
            Project tours and market updates on video — and deeper conversations
            on the PQT Podcast.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Two video cards */}
          {videos.slice(0, 2).map((v) => (
            <a
              key={v.id}
              href={v.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-2xl ring-1 ring-white/10 transition hover:-translate-y-1 hover:ring-gold/40"
            >
              <div
                className={`relative flex h-44 items-center justify-center ${gradientClass[v.gradient]}`}
              >
                <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-red">
                  <Youtube size={13} /> Video
                </span>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-navy shadow-lg transition group-hover:scale-110">
                  <Play size={22} className="ml-0.5" fill="currentColor" />
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

          {/* Podcast panel */}
          <div className="flex flex-col rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10">
            <div className="flex items-center gap-2 text-gold">
              <Headphones size={20} />
              <span className="text-sm font-bold uppercase tracking-wide">
                The PQT Podcast
              </span>
            </div>
            <ul className="mt-4 flex-1 divide-y divide-white/10">
              {podcasts.slice(0, 3).map((p) => {
                const row = (
                  <>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold transition group-hover:bg-gold group-hover:text-ink">
                      <Play size={14} className="ml-0.5" fill="currentColor" />
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
                return (
                  <li key={p.id}>
                    {p.listenUrl ? (
                      <a
                        href={p.listenUrl}
                        className="group flex items-center gap-3 py-3"
                      >
                        {row}
                      </a>
                    ) : (
                      <div className="group flex items-center gap-3 py-3 opacity-90">
                        {row}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <LinkButton href="/media" variant="gold">
            Explore videos &amp; podcasts <ArrowRight size={16} />
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
