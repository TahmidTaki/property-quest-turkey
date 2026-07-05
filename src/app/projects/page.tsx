import type { Metadata } from "next";
import { ProjectsBrowser } from "@/components/property/ProjectsBrowser";
import { getProperties, getDistricts } from "@/lib/content/properties";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse citizenship-eligible property in Istanbul — apartments, villas and branded residences curated by Property Quest Turkey.",
};

export default async function ProjectsPage() {
  const [properties, districts] = await Promise.all([
    getProperties(),
    getDistricts(),
  ]);

  return (
    <>
      <section className="bg-gradient-to-br from-navy to-ink px-5 py-16 text-white sm:px-8">
        <div className="container-x">
          <h1 className="text-4xl">Projects in Istanbul</h1>
          <p className="mt-3 max-w-xl text-white/80">
            Every listing is curated and citizenship-checked by PQT. The details
            shown here are exactly what our clients see in their private portal —
            no hidden surprises.
          </p>
        </div>
      </section>

      <div className="container-x py-12">
        <ProjectsBrowser properties={properties} districts={districts} />
      </div>
    </>
  );
}
