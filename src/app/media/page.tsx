import type { Metadata } from "next";
import { Play, Headphones } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHead } from "@/components/ui/primitives";
import { getVideos, getPodcasts } from "@/lib/content/insights";
import { gradientClass } from "@/lib/format";

export const metadata: Metadata = {
  title: "Videos & Podcasts",
  description:
    "Watch project tours and market updates, and listen to the PQT Podcast — Turkish property and citizenship explained by the Property Quest Turkey team.",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function MediaPage() {
  const [videos, podcasts] = await Promise.all([getVideos(), getPodcasts()]);

  return (
    <>
      <PageHero
        eyebrow="Videos & Podcasts"
        title="Watch & listen"
        subtitle="Project tours, market updates and conversations on Turkish property and citizenship — on video and on the PQT Podcast."
      />

      {/* VIDEOS */}
      <Section>
        <SectionHead label="YouTube" title="Latest videos" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <a
              key={v.id}
              href={v.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-lift"
            >
              <div
                className={`relative flex h-44 items-center justify-center ${gradientClass[v.gradient]}`}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-navy shadow-lg transition group-hover:scale-110">
                  <Play size={22} className="ml-0.5" fill="currentColor" />
                </span>
                <span className="absolute bottom-3 right-3 rounded bg-black/70 px-1.5 py-0.5 text-xs font-semibold text-white">
                  {v.duration}
                </span>
              </div>
              <div className="p-5">
                <h2 className="text-base leading-snug text-navy">{v.title}</h2>
                <p className="mt-2 text-xs text-muted">{fmtDate(v.date)}</p>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* PODCASTS */}
      <Section tone="ivory">
        <SectionHead label="Podcast" title="The PQT Podcast" />
        <div className="mx-auto max-w-2xl space-y-3">
          {podcasts.map((p) => {
            const inner = (
              <>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-navy text-white">
                  <Headphones size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                    Episode {p.episode}
                  </p>
                  <h2 className="truncate text-base text-navy">{p.title}</h2>
                  <p className="text-xs text-muted">
                    {fmtDate(p.date)} · {p.duration}
                  </p>
                </div>
                {p.listenUrl ? (
                  <span className="flex items-center gap-1 text-sm font-semibold text-navy">
                    <Play size={14} /> Listen
                  </span>
                ) : (
                  <span className="rounded-full bg-line px-2.5 py-1 text-xs font-semibold text-muted">
                    Coming soon
                  </span>
                )}
              </>
            );
            const cls =
              "flex items-center gap-4 rounded-xl border border-line bg-white p-4 transition hover:border-gold hover:shadow-card";
            return p.listenUrl ? (
              <a key={p.id} href={p.listenUrl} className={cls}>
                {inner}
              </a>
            ) : (
              <div key={p.id} className={cls}>
                {inner}
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
