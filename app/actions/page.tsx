import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { actionDetails, actionOrder } from "@/lib/examples";

export default function ActionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 border-b border-line pb-6">
        <p className="text-sm font-semibold uppercase text-copper">Actions</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">MVP action catalog</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {actionOrder.map((id) => {
          const action = actionDetails[id];
          return (
            <Link key={id} href={`/actions/${encodeURIComponent(id)}`} className="rounded-card border border-line bg-white p-5 hover:border-copper">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-ink">{action.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-ink/65">{action.description}</p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 flex-none text-copper" aria-hidden="true" />
              </div>
              <p className="mt-4 rounded-card bg-paper px-3 py-2 text-xs text-ink/65">{action.endpoint}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
