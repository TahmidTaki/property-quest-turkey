import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Building2,
  CalendarDays,
  BadgeCheck,
  ArrowRight,
  Check,
} from "lucide-react";
import { LinkButton } from "@/components/ui/primitives";
import { getProperties, getPropertyBySlug } from "@/lib/content/properties";
import { getSession } from "@/lib/auth/demo-session";
import {
  formatUsd,
  formatDelivery,
  statusLabel,
  citizenshipLabel,
  gradientClass,
} from "@/lib/format";

export async function generateStaticParams() {
  const props = await getProperties();
  return props.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPropertyBySlug(slug);
  if (!p) return { title: "Project not found" };
  return { title: p.title, description: p.shortDescription };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getPropertyBySlug(slug);
  if (!p) notFound();

  const session = await getSession();
  const isAgent = session?.role === "agent";

  return (
    <>
      {/* Hero image band */}
      <div
        className={`relative flex h-72 items-end ${gradientClass[p.gradient]}`}
      >
        <div className="container-x w-full pb-7 text-white">
          <div className="mb-2 flex gap-2">
            <span className="badge badge-red">{statusLabel[p.status]}</span>
            {p.citizenship === "eligible" && (
              <span className="badge badge-gold">Citizenship eligible</span>
            )}
          </div>
          <h1 className="text-4xl text-white">{p.title}</h1>
          <p className="mt-1 flex items-center gap-1.5 text-white/85">
            <MapPin size={15} /> {p.district}, {p.city}
          </p>
        </div>
      </div>

      <div className="container-x grid gap-10 py-12 lg:grid-cols-[1fr_360px]">
        {/* Main */}
        <div>
          <div className="flex flex-wrap gap-6 border-b border-line pb-6 text-sm">
            <Fact icon={Building2} label="Developer" value={p.developer} />
            <Fact
              icon={CalendarDays}
              label="Delivery"
              value={formatDelivery(p.deliveryDate)}
            />
            <Fact
              icon={BadgeCheck}
              label="Citizenship"
              value={citizenshipLabel[p.citizenship]}
            />
          </div>

          <section className="mt-8">
            <h2 className="text-2xl text-navy">About this project</h2>
            {p.description.map((para, i) => (
              <p key={i} className="mt-3 text-ink/80">
                {para}
              </p>
            ))}
          </section>

          <section className="mt-8">
            <h2 className="text-2xl text-navy">Highlights</h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {p.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-ink/85">
                  <Check size={17} className="mt-0.5 shrink-0 text-ok" /> {h}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl text-navy">Amenities</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.amenities.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-line bg-white px-3 py-1 text-xs text-ink/80"
                >
                  {a}
                </span>
              ))}
            </div>
          </section>

          {/* Unit types */}
          <section className="mt-8">
            <h2 className="text-2xl text-navy">Available units</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-line">
              <table className="w-full text-left text-sm">
                <thead className="bg-ivory text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Size</th>
                    <th className="px-4 py-3">Beds</th>
                    <th className="px-4 py-3">From</th>
                    <th className="px-4 py-3">Available</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {p.unitTypes.map((u) => (
                    <tr key={u.label}>
                      <td className="px-4 py-3 font-semibold text-ink">
                        {u.label}
                      </td>
                      <td className="tabular px-4 py-3">{u.sizeSqm} m²</td>
                      <td className="px-4 py-3">{u.bedrooms}</td>
                      <td className="tabular px-4 py-3 font-semibold text-red">
                        {formatUsd(u.priceUsdFrom)}
                      </td>
                      <td className="tabular px-4 py-3">{u.available}</td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/buy/${p.slug}?unit=${encodeURIComponent(u.label)}`}
                          className="text-sm font-semibold text-navy hover:underline"
                        >
                          Reserve →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CONFIDENTIAL — visible only to internal/agent role. Demonstrates field-level visibility. */}
          {isAgent && (
            <section className="mt-8 rounded-xl border border-confidential-border bg-confidential p-5">
              <h2 className="flex items-center gap-2 text-lg text-red">
                🔒 Internal only — confidential fields
              </h2>
              <p className="mt-1 text-xs text-ink/70">
                These PMS fields are tagged confidential and are NEVER sent to a
                client&apos;s browser. Shown here only because you&apos;re in the
                agent demo role.{" "}
                <span className="inline-flex items-center rounded border border-warn/40 bg-warn/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-warn">
                  Sample data — demonstration only
                </span>
              </p>
              <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-muted">Cost price</dt>
                  <dd className="tabular font-semibold">
                    {formatUsd(Math.round(p.priceUsdFrom * 0.82))}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Commission %</dt>
                  <dd className="font-semibold">4.5%</dd>
                </div>
                <div>
                  <dt className="text-muted">Developer margin</dt>
                  <dd className="font-semibold">18%</dd>
                </div>
              </dl>
            </section>
          )}
        </div>

        {/* Sticky sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <p className="text-xs text-muted">Starting from</p>
            <p className="tabular text-3xl font-extrabold text-red">
              {formatUsd(p.priceUsdFrom)}
            </p>
            <div className="mt-5 space-y-2.5">
              <LinkButton
                href={`/buy/${p.slug}`}
                variant="primary"
                className="w-full"
              >
                Reserve a unit <ArrowRight size={16} />
              </LinkButton>
              <LinkButton
                href={`/contact?project=${p.slug}`}
                variant="outline"
                className="w-full"
              >
                Request details
              </LinkButton>
            </div>
            <p className="mt-4 text-center text-xs text-muted">
              No obligation. A PQT advisor will confirm availability and prepare
              a personalised offer.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon size={18} className="text-gold" />
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className="font-semibold text-ink">{value}</p>
      </div>
    </div>
  );
}
