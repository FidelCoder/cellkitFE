import Link from "next/link";
import { ArrowRight, Braces } from "lucide-react";
import { actionDetails, actionOrder } from "@/lib/examples";

export default function ActionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-copper">Actions</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">MVP action catalog</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-ink/68">
            Browse reusable transaction templates and open each action directly in the playground.
          </p>
        </div>
        <span className="w-fit rounded-card border border-moss/30 bg-moss/10 px-3 py-2 text-xs font-semibold uppercase text-moss">
          {actionOrder.length} templates
        </span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {actionOrder.map((id) => {
          const action = actionDetails[id];
          return (
            <Link key={id} href={`/actions/${encodeURIComponent(id)}`} className="group rounded-card border border-line bg-surface p-5 shadow-sm shadow-ink/5 transition hover:-translate-y-0.5 hover:border-copper hover:shadow-md hover:shadow-ink/10">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="mb-4 grid h-9 w-9 place-items-center rounded-card bg-paper text-copper transition group-hover:bg-copper group-hover:text-paper">
                    <Braces className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h2 className="text-lg font-semibold text-ink">{action.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-ink/65">{action.description}</p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 flex-none text-copper transition group-hover:translate-x-0.5" aria-hidden="true" />
              </div>
              <p className="mt-4 overflow-hidden text-ellipsis rounded-card bg-paper px-3 py-2 font-mono text-xs text-ink/65">{action.endpoint}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
