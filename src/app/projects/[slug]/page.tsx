import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProperty, listProperties } from "@/lib/pms/client";
import { getSession } from "@/lib/auth/demo-session";
import ClientPropertyDetail from "./ClientPropertyDetail";

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
      title: p.listing_title,
      description: p.description_short || p.listing_title,
    };
  } catch {
    return { title: "Project not found" };
  }
}

export default async function PropertyDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ beds?: string }>;
}) {
  const { slug } = await params;
  const { beds } = await searchParams;

  let property;
  let error = false;

  try {
    property = await getProperty(slug);
  } catch {
    error = true;
    notFound();
  }

  if (!property) notFound();

  const session = await getSession();

  return (
    <ClientPropertyDetail
      property={property}
      session={session}
      beds={beds}
    />
  );
}