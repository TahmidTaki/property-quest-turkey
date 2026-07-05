import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth/demo-session";
import { PortalSidebar } from "@/components/portal/PortalSidebar";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="bg-canvas">
      {session.role === "agent" && (
        <div className="bg-red px-5 py-2 text-center text-xs font-semibold text-white">
          INTERNAL / AGENT VIEW — confidential fields are visible. Clients never
          see this.
        </div>
      )}
      <div className="container-x flex flex-col gap-8 py-8 lg:flex-row">
        <div className="lg:w-64 lg:shrink-0">
          <Link
            href="/"
            className="mb-5 block text-lg font-extrabold text-navy lg:hidden"
          >
            Property<span className="text-red">Quest</span>Turkey
          </Link>
          <PortalSidebar
            name={session.name}
            role={session.role}
            canAgent={session.canAgent}
          />
        </div>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
