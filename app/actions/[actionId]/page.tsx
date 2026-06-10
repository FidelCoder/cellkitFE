import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyButton } from "@/components/CopyButton";
import { actionDetails, actionOrder } from "@/lib/examples";
import type { ActionId } from "@/lib/types";

export function generateStaticParams() {
  return actionOrder.map((actionId) => ({ actionId }));
}

export default function ActionDetailPage({ params }: { params: { actionId: string } }) {
  const actionId = decodeURIComponent(params.actionId);
  if (!isActionId(actionId)) {
    notFound();
  }
  const action = actionDetails[actionId];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 border-b border-line pb-6">
        <p className="text-sm font-semibold uppercase text-copper">{actionId}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">{action.name}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-ink/68">{action.description}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={`/playground?action=${encodeURIComponent(actionId)}`} className="inline-flex h-10 items-center rounded-card bg-ink px-4 text-sm font-semibold text-paper hover:bg-copper">
            Open in Playground
          </Link>
          <CopyButton label="Endpoint" value={action.endpoint} />
        </div>
      </div>

      <div className="grid gap-5">
        <section className="rounded-card border border-line bg-white p-5">
          <h2 className="mb-3 text-lg font-semibold text-ink">Request Fields</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {Object.entries(action.requestSchema).map(([field, type]) => (
              <div key={field} className="rounded-card bg-paper p-3 text-sm">
                <div className="font-semibold text-ink">{field}</div>
                <div className="mt-1 text-ink/62">{type}</div>
              </div>
            ))}
          </div>
        </section>

        <JsonBlock title="Sample Request" value={action.sampleRequest} />
        <JsonBlock title="Sample Response" value={action.sampleResponse} />

        <section className="rounded-card border border-line bg-white p-5">
          <h2 className="mb-3 text-lg font-semibold text-ink">Limitations</h2>
          <ul className="grid gap-2 text-sm text-ink/70">
            {action.limitations.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
      </div>
    </div>
  );
}

function JsonBlock({ title, value }: { title: string; value: unknown }) {
  return (
    <section className="rounded-card border border-line bg-white p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        <CopyButton label="Copy JSON" value={value} />
      </div>
      <pre className="code-scroll max-h-96 overflow-auto rounded-card bg-ink p-4 text-xs leading-5 text-paper">
        {JSON.stringify(value, null, 2)}
      </pre>
    </section>
  );
}

function isActionId(value: string): value is ActionId {
  return actionOrder.includes(value as ActionId);
}
