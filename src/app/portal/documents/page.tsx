import { FileText, Download } from "lucide-react";
import { getDocuments } from "@/lib/content/portfolio";
import { PortalTitle, Panel } from "@/components/portal/ui";

export default async function DocumentsPage() {
  const docs = await getDocuments();

  return (
    <>
      <PortalTitle
        title="Documents"
        subtitle="Your contracts, title deeds, receipts, and application files."
      />

      <Panel title={`All documents (${docs.length})`}>
        <ul className="divide-y divide-line">
          {docs.map((d) => (
            <li key={d.id} className="flex items-center gap-4 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-soft text-navy">
                <FileText size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{d.name}</p>
                <p className="text-xs text-muted">
                  {d.category} · {d.uploadedOn} · {d.sizeKb} KB
                </p>
              </div>
              <button
                className="flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-xs font-semibold text-navy transition hover:border-gold hover:bg-gold-soft/30"
                title="Demo — download wires to PMS document storage later"
              >
                <Download size={14} /> Download
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
