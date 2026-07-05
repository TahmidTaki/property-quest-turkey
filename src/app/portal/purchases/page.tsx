import { getPayments } from "@/lib/content/portfolio";
import { formatUsd } from "@/lib/format";
import { PortalTitle, StatusPill, Panel } from "@/components/portal/ui";

export default async function PurchasesPage() {
  const payments = await getPayments();
  const paid = payments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amountUsd, 0);
  const outstanding = payments
    .filter((p) => p.status !== "paid")
    .reduce((s, p) => s + p.amountUsd, 0);

  return (
    <>
      <PortalTitle
        title="My purchases"
        subtitle="Your payment schedule and purchase status."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="card p-5">
          <p className="text-xs uppercase tracking-wide text-muted">Paid to date</p>
          <p className="tabular mt-1.5 text-2xl font-extrabold text-ok">
            {formatUsd(paid)}
          </p>
        </div>
        <div className="card p-5">
          <p className="text-xs uppercase tracking-wide text-muted">Outstanding</p>
          <p className="tabular mt-1.5 text-2xl font-extrabold text-navy">
            {formatUsd(outstanding)}
          </p>
        </div>
      </div>

      <Panel title="Payment schedule">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted">
              <tr className="border-b border-line">
                <th className="pb-2.5 pr-4">Payment</th>
                <th className="pb-2.5 pr-4">Due date</th>
                <th className="pb-2.5 pr-4 text-right">Amount</th>
                <th className="pb-2.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="py-3 pr-4 font-medium text-ink">{p.label}</td>
                  <td className="tabular py-3 pr-4 text-muted">{p.dueDate}</td>
                  <td className="tabular py-3 pr-4 text-right font-semibold">
                    {formatUsd(p.amountUsd)}
                  </td>
                  <td className="py-3 text-right">
                    <StatusPill status={p.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
