import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProperty, listProperties } from "@/lib/pms/client";
import { BuyFlow } from "@/components/buy/BuyFlow";

export async function generateStaticParams() {
  try {
    const result = await listProperties({ limit: 50 });
    return result.items.map((p) => ({ slug: p.pqt_code }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const p = await getProperty(slug);
    return { 
      title: p ? `Reserve · ${p.listing_title}` : "Reserve",
      description: p?.description_short || "Reserve your unit",
    };
  } catch {
    return { title: "Reserve" };
  }
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
  
  let property;
  let error = false;

  try {
    property = await getProperty(slug);
  } catch {
    error = true;
    notFound();
  }

  if (!property) notFound();

  return (
    <div className="bg-canvas py-10 dark:bg-dark-bg">
      <div className="container-x max-w-3xl">
        <Link
          href={`/projects/${property.pqt_code}`}
          className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:underline dark:text-blue-300"
        >
          <ArrowLeft size={15} /> Back to {property.listing_title}
        </Link>
        <BuyFlow property={property} initialUnit={unit} />
      </div>
    </div>
  );
}