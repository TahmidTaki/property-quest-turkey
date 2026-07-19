import { ProjectsBrowser } from "@/components/property/ProjectsBrowser";
import { listProperties, getDistricts } from "@/lib/pms/client";
import { PortalTitle } from "@/components/portal/ui";

export default async function PortalProjectsPage() {
  const [propertiesResult, districts] = await Promise.all([
    listProperties({ limit: 50 }),
    getDistricts(),
  ]);

  return (
    <>
      <PortalTitle
        title="Browse projects"
        subtitle="Explore new citizenship-eligible opportunities to add to your portfolio."
      />
      <ProjectsBrowser properties={propertiesResult.items} districts={districts} />
    </>
  );
}