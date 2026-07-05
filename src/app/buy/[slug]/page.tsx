import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProperties, getPropertyBySlug } from "@/lib/content/properties";
import { BuyFlow } from "@/components/buy/BuyFlow";

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
  return { title: p ? `Reserve · ${p.title}` : "Reserve" };
}

export default async function BuyPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ unit?: string }>;
}) {
  const { slug } = await params;
  const { unit } = await searchParams;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  return (
    <div className="bg-canvas py-10">
      <div className="container-x max-w-3xl">
        <Link
          href={`/projects/${property.slug}`}
          className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:underline"
        >
          <ArrowLeft size={15} /> Back to {property.title}
        </Link>
        <BuyFlow property={property} initialUnit={unit} />
      </div>
    </div>
  );
}
