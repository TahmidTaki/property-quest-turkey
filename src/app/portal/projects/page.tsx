import { ProjectsBrowser } from "@/components/property/ProjectsBrowser";
import { getProperties, getDistricts } from "@/lib/content/properties";
import { PortalTitle } from "@/components/portal/ui";

export default async function PortalProjectsPage() {
  const [properties, districts] = await Promise.all([
    getProperties(),
    getDistricts(),
  ]);

  return (
    <>
      <PortalTitle
        title="Browse projects"
        subtitle="Explore new citizenship-eligible opportunities to add to your portfolio."
      />
      <ProjectsBrowser properties={properties} districts={districts} />
    </>
  );
}
