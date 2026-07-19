"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Building2,
  CalendarDays,
  BadgeCheck,
  ArrowRight,
  Check,
  BedDouble,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { LinkButton } from "@/components/ui/primitives";
import type { PmsDetail } from "@/lib/pms/client";
import type { DemoSession } from "@/lib/auth/demo-session";
import {
  formatUsd,
  gradientClass,
} from "@/lib/format";

function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    off_plan: "badge-gold",
    under_construction: "badge-red",
    ready: "badge-ok",
    completed: "badge-ok",
    resale: "badge-red",
  };
  return map[status] || "badge-red";
}

function parsePrice(value: string | null): number {
  if (!value) return 0;
  return Number(value);
}

function getGradientForProperty(id: string): string {
  const gradients = Object.keys(gradientClass);
  const index = id.length % gradients.length;
  return gradientClass[gradients[index]] || gradientClass.bosphorus;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

type LightboxType = "floorplans" | "gallery" | null;

interface ClientPropertyDetailProps {
  property: PmsDetail;
  session: DemoSession | null;
  beds?: string;
}

export default function ClientPropertyDetail({
  property,
  session,
  beds,
}: ClientPropertyDetailProps) {
  const [lightboxType, setLightboxType] = useState<LightboxType>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isAgent = session?.role === "agent";

  const price = parsePrice(property.starting_price_usd);
  const gradient = getGradientForProperty(property.id);
  const createdDate = property.created_at ? formatDate(property.created_at) : "TBC";
  const isCitizenshipEligible = property.cbi_eligible === true;
  const bedroomSummary = beds || property.bedrooms_summary || "TBC";

  const floorPlans = property.floor_plans || [];
  const galleryImages = property.images || [];

  const openLightbox = (type: LightboxType, index: number = 0) => {
    setLightboxType(type);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setLightboxType(null);
    setCurrentIndex(0);
  };

  const goToPrevious = () => {
    const images = lightboxType === "floorplans" ? floorPlans : galleryImages;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    const images = lightboxType === "floorplans" ? floorPlans : galleryImages;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const renderLightbox = () => {
    if (!lightboxType) return null;

    const images = lightboxType === "floorplans" ? floorPlans : galleryImages;
    const currentImage = images[currentIndex];

    if (!currentImage) return null;

    const imageUrl = lightboxType === "floorplans" 
      ? (currentImage as PmsDetail["floor_plans"][0]).url 
      : currentImage as string;

    return (
      <div
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95"
        onClick={closeLightbox}
      >
        <button
          onClick={closeLightbox}
          className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
        >
          <X size={28} />
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            >
              <ChevronRight size={32} />
            </button>
          </>
        )}

        <div
          className="relative max-h-[90vh] max-w-[90vw]"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={imageUrl}
            alt={`${lightboxType === "floorplans" ? "Floor plan" : "Gallery image"} ${currentIndex + 1}`}
            width={1200}
            height={800}
            className="max-h-[85vh] w-auto object-contain"
          />
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {renderLightbox()}

      <div className="relative flex h-72 w-full overflow-hidden">
        {property.cover_image_url ? (
          <Image
            src={property.cover_image_url}
            alt={property.listing_title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className={`absolute inset-0 ${gradient}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="container-x relative z-10 flex w-full items-end pb-7 text-white">
          <div>
            <div className="mb-2 flex flex-wrap gap-2">
              <span className={`badge ${getStatusColor(property.status)}`}>
                {property.status}
              </span>
              {isCitizenshipEligible && (
                <span className="badge badge-red">Citizenship eligible</span>
              )}
            </div>
            <h1 className="text-4xl">{property.listing_title}</h1>
            <p className="mt-1 flex items-center gap-1.5 text-white/85">
              <MapPin size={15} /> {property.district?.name || property.district_name || "Istanbul"}, Istanbul
            </p>
          </div>
        </div>
      </div>

      <div className="container-x grid gap-10 py-12 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="flex flex-wrap gap-6 border-b border-line pb-6 text-sm dark:border-dark-border">
            <Fact icon={Building2} label="Category" value={property.category} />
            <Fact
              icon={CalendarDays}
              label="Listed"
              value={createdDate}
            />
            <Fact
              icon={BedDouble}
              label="Bedrooms"
              value={bedroomSummary}
            />
            {isCitizenshipEligible && (
              <Fact
                icon={BadgeCheck}
                label="Citizenship"
                value="Eligible"
              />
            )}
          </div>

          {floorPlans.length > 0 && (
            <section className="mt-8">
              <h2 className="text-2xl text-navy dark:text-blue-300">Floor Plans</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {floorPlans.slice(0, 8).map((plan, index) => (
                  <div
                    key={index}
                    className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 cursor-pointer transition hover:opacity-90 dark:bg-gray-800"
                    onClick={() => openLightbox("floorplans", index)}
                  >
                    <Image
                      src={plan.url}
                      alt={`Floor plan ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {galleryImages.length > 0 && (
            <section className="mt-8">
              <h2 className="text-2xl text-navy dark:text-blue-300">Gallery</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {galleryImages.slice(0, 6).map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 cursor-pointer transition hover:opacity-90 dark:bg-gray-800"
                    onClick={() => openLightbox("gallery", index)}
                  >
                    <Image
                      src={image}
                      alt={`${property.listing_title} - image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mt-8">
            <h2 className="text-2xl text-navy dark:text-blue-300">About this project</h2>
            {property.description_full ? (
              <div
                className="mt-3 prose prose-sm dark:prose-invert max-w-none text-ink/80 dark:text-dark-text"
                dangerouslySetInnerHTML={{ __html: property.description_full }}
              />
            ) : property.description_short ? (
              <p className="mt-3 text-ink/80 dark:text-dark-text">{property.description_short}</p>
            ) : (
              <p className="mt-3 text-ink/80 dark:text-dark-text">No description available.</p>
            )}
          </section>

          {property.key_features && property.key_features.length > 0 && (
            <section className="mt-8">
              <h2 className="text-2xl text-navy dark:text-blue-300">Highlights</h2>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {property.key_features.map((feature: string) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-ink/85 dark:text-dark-text">
                    <Check size={17} className="mt-0.5 shrink-0 text-ok dark:text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {property.amenities && property.amenities.length > 0 && (
            <section className="mt-8">
              <h2 className="text-2xl text-navy dark:text-blue-300">Amenities</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {property.amenities.map((amenity: string) => (
                  <span
                    key={amenity}
                    className="rounded-full border border-line bg-white px-3 py-1 text-xs text-ink/80 dark:border-dark-border dark:bg-dark-card dark:text-dark-text"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </section>
          )}

          {isAgent && (
            <section className="mt-8 rounded-xl border border-confidential-border bg-confidential p-5 dark:border-red-500/30 dark:bg-red-500/10">
              <h2 className="flex items-center gap-2 text-lg text-red dark:text-red-400">
                Internal only — confidential fields
              </h2>
              <p className="mt-1 text-xs text-ink/70 dark:text-dark-text">
                These PMS fields are tagged confidential and are NEVER sent to a
                client&apos;s browser. Shown here only because you are in the
                agent demo role.
              </p>
              <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-muted dark:text-dark-muted">Cost price</dt>
                  <dd className="tabular font-semibold text-ink dark:text-dark-text">
                    {formatUsd(Math.round(price * 0.82))}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted dark:text-dark-muted">Commission</dt>
                  <dd className="font-semibold text-ink dark:text-dark-text">4.5%</dd>
                </div>
                <div>
                  <dt className="text-muted dark:text-dark-muted">Developer margin</dt>
                  <dd className="font-semibold text-ink dark:text-dark-text">18%</dd>
                </div>
              </dl>
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6 dark:bg-dark-card dark:border-dark-border dark:shadow-dark-card">
            <div className="mb-2">
              <p className="text-xs text-muted dark:text-dark-muted">Bedrooms</p>
              <p className="text-sm font-semibold text-ink dark:text-dark-text">{bedroomSummary}</p>
            </div>
            <p className="text-xs text-muted dark:text-dark-muted">Starting from</p>
            <p className="tabular text-3xl font-extrabold text-red dark:text-red-400">
              {price > 0 ? formatUsd(price) : "Contact us"}
            </p>
            <div className="mt-5 space-y-2.5">
              <LinkButton
                href={`/buy/${property.pqt_code}`}
                variant="primary"
                className="w-full"
              >
                Reserve a unit <ArrowRight size={16} />
              </LinkButton>
              <LinkButton
                href={`/contact?project=${property.pqt_code}`}
                variant="outline"
                className="w-full"
              >
                Request details
              </LinkButton>
            </div>
            <p className="mt-4 text-center text-xs text-muted dark:text-dark-muted">
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
      <Icon size={18} className="text-gold dark:text-yellow-400" />
      <div>
        <p className="text-xs text-muted dark:text-dark-muted">{label}</p>
        <p className="font-semibold text-ink dark:text-dark-text">{value}</p>
      </div>
    </div>
  );
}