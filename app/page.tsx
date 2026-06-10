import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { actionDetails, actionOrder } from "@/lib/examples";

const limitations = [
  "Testnet-first",
  "Unsigned payloads only",
  "No private keys",
  "No custody",
  "Backend requires CKB RPC/indexer for live cell selection"
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid min-h-[calc(100vh-170px)] content-center gap-8 border-b border-line pb-10 lg:grid-cols-[1fr_420px]">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase text-copper">CellKit Actions</p>
          <h1 className="text-4xl font-semibold tracking-normal text-ink sm:text-6xl">
            Reusable CKB transaction actions for app developers.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-ink/70">
            Generate unsigned CKB transaction payloads for common flows like CKB transfer, xUDT transfer, cell consolidation, capacity locking, and data cell creation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/playground" className="inline-flex h-11 items-center gap-2 rounded-card bg-ink px-4 text-sm font-semibold text-paper hover:bg-copper">
              Open Playground
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/api-reference" className="inline-flex h-11 items-center rounded-card border border-line bg-white px-4 text-sm font-semibold text-ink hover:border-copper hover:text-copper">
              API Reference
            </Link>
          </div>
        </div>

        <div className="rounded-card border border-line bg-white p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-moss">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>MVP Boundaries</span>
          </div>
          <ul className="grid gap-2 text-sm text-ink/72">
            {limitations.map((item) => (
              <li key={item} className="rounded-card bg-paper px-3 py-2">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase text-copper">Supported Actions</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">MVP transaction templates</h2>
          </div>
          <Link href="/actions" className="text-sm font-semibold text-copper hover:text-ink">View all</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {actionOrder.map((id) => (
            <Link key={id} href={`/actions/${encodeURIComponent(id)}`} className="rounded-card border border-line bg-white p-4 hover:border-copper">
              <h3 className="font-semibold text-ink">{actionDetails[id].name}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/65">{actionDetails[id].description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
