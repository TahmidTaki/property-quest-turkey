import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  FileCheck2,
  Headset,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Section, SectionHead, LinkButton } from "@/components/ui/primitives";
import { PropertyCard } from "@/components/property/PropertyCard";
import {
  IntelligenceShowcase,
  PqtDifference,
} from "@/components/site/IntelligenceShowcase";
import { FeaturedSpotlight } from "@/components/site/FeaturedSpotlight";
import { LivePulseBand } from "@/components/site/LivePulseBand";
import { BlogTeaser, MediaTeaser } from "@/components/site/MediaSections";
import { listProperties } from "@/lib/pms/client";
import type { PmsListItem } from "@/lib/pms/client";
import { getArticles, getVideos, getPodcasts } from "@/lib/content/insights";
import { getPulseItems, getTicker } from "@/lib/content/marketPulse";
import HeroSlider from "@/components/site/HeroSlider";

export default async function HomePage() {
  let featuredProperties: PmsListItem[] = [];
  let error = false;

  try {
    const result = await listProperties({
      sort: "newest",
      limit: 6,
    });
    featuredProperties = result.items;
  } catch {
    error = true;
  }

  const [articles, videos, podcasts, pulse, ticker] = await Promise.all([
    getArticles(),
    getVideos(),
    getPodcasts(),
    getPulseItems(),
    getTicker(),
  ]);

  return (
    <>
      <HeroSlider />
      <LivePulseBand items={pulse} ticker={ticker} />

      <Section tone="default">
        <SectionHead
          label="Why Property Quest Turkey"
          title="One partner, from first viewing to passport"
          lede="We are not just brokers. PQT manages the entire investment journey and everything that comes after."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Building2,
              title: "Curated projects",
              body: "Hand-picked, citizenship-eligible developments from vetted Istanbul developers.",
            },
            {
              icon: ShieldCheck,
              title: "Citizenship expertise",
              body: "We handle the legal pathway end-to-end so your application is right the first time.",
            },
            {
              icon: FileCheck2,
              title: "Title-deed secure",
              body: "Independent due diligence and tapu transfer with full transparency at every stage.",
            },
            {
              icon: Headset,
              title: "Lifetime after-sales",
              body: "Property management, rentals, residency renewals, and support — all in one portal.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="card p-7 transition hover:-translate-y-1 hover:border-gold hover:shadow-navy dark:bg-dark-card dark:border-dark-border dark:hover:border-yellow-400"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold-soft dark:bg-yellow-400/20">
                <f.icon className="text-navy dark:text-blue-300" size={22} />
              </div>
              <h3 className="text-lg text-navy dark:text-blue-300">{f.title}</h3>
              <p className="mt-2 text-sm text-muted dark:text-dark-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <IntelligenceShowcase />
      <FeaturedSpotlight properties={featuredProperties} />

      <Section tone="white">
        <SectionHead
          label="Featured projects"
          title="Citizenship-eligible homes in Istanbul"
          lede="A selection from our portfolio. Every PQT listing shows the same trusted details our clients see in their private portal."
        />
        {error && (
          <p className="mb-4 text-center text-sm text-yellow-600 dark:text-yellow-400">
            Unable to load featured properties. Please try again later.
          </p>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <LinkButton href="/projects" variant="navy">
            View all projects <ArrowRight size={16} />
          </LinkButton>
        </div>
      </Section>

      <PqtDifference />
      <BlogTeaser articles={articles} />
      <MediaTeaser videos={videos} podcasts={podcasts} />

      <Section tone="ivory">
        <SectionHead
          label="How it works"
          title="Your path to citizenship in four steps"
        />
        <div className="grid gap-6 md:grid-cols-4">
          {[
            ["01", "Consult", "Free strategy call to understand your goals, budget, and timeline."],
            ["02", "Select", "We shortlist citizenship-eligible properties matched to your brief."],
            ["03", "Acquire", "Reserve, sign, and complete with full legal and tapu support."],
            ["04", "Citizenship", "We file and track your application through to passports."],
          ].map(([num, title, body]) => (
            <div key={num} className="relative">
              <span className="font-serif text-4xl font-bold text-gold/60 dark:text-yellow-400/60">
                {num}
              </span>
              <h3 className="mt-2 text-lg text-navy dark:text-blue-300">{title}</h3>
              <p className="mt-1.5 text-sm text-muted dark:text-dark-muted">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="navy">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-gold dark:text-yellow-400">
              Turkish citizenship by investment
            </p>
            <h2 className="text-3xl text-white sm:text-4xl">
              A passport for the whole family — from $400,000
            </h2>
            <ul className="mt-6 space-y-3">
              {[
                "Citizenship for you, your spouse, and children under 18",
                "Visa-free or visa-on-arrival access to 110+ countries",
                "No residency or language requirement",
                "Retain your existing nationality (dual citizenship allowed)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-white/85">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-gold dark:text-yellow-400" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <LinkButton href="/citizenship" variant="gold">
                Learn about citizenship
              </LinkButton>
            </div>
          </div>
          <div className="rounded-2xl bg-white/5 p-8 ring-1 ring-white/10">
            <h3 className="text-xl text-white">Free eligibility check</h3>
            <p className="mt-2 text-sm text-white/70">
              Tell us your budget and goals. We will send a tailored shortlist
              and a clear citizenship timeline — no obligation.
            </p>
            <Link
              href="/contact"
              className="btn btn-gold mt-5 w-full"
            >
              Start my eligibility check
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}