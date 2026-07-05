import Link from "next/link";
import { MessageSquare, Plus } from "lucide-react";
import { getTickets } from "@/lib/content/portfolio";
import { PortalTitle, StatusPill, Panel } from "@/components/portal/ui";

export default async function AftersalesPage() {
  const tickets = await getTickets();

  return (
    <>
      <PortalTitle
        title="Aftersales & support"
        subtitle="Maintenance, legal, and citizenship requests — all in one place."
      />

      <Panel
        title="Your tickets"
        action={
          <Link
            href="/portal/aftersales#new"
            className="btn btn-primary px-3 py-1.5 text-xs"
          >
            <Plus size={14} /> New request
          </Link>
        }
      >
        <div className="space-y-3">
          {tickets.map((t) => (
            <div
              key={t.id}
              className="rounded-lg border border-line p-4 transition hover:border-gold"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-ink">{t.subject}</h3>
                    <span className="badge badge-gold">{t.category}</span>
                  </div>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                    <MessageSquare size={13} /> {t.lastMessage}
                  </p>
                </div>
                <div className="text-right">
                  <StatusPill status={t.status} />
                  <p className="tabular mt-1 text-xs text-muted">{t.updatedOn}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          id="new"
          className="mt-6 rounded-lg border border-dashed border-line bg-canvas p-5 text-center text-sm text-muted"
        >
          In the live system, this opens a new support ticket routed to the PQT
          team and synced with the PMS messages module.
        </div>
      </Panel>
    </>
  );
}
