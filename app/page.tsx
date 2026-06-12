import Link from "next/link";
import { ArrowRight, Braces, Github, RadioTower, ShieldCheck, Terminal } from "lucide-react";
import { actionDetails, actionOrder } from "@/lib/examples";

const signals = [
  { label: "Network", value: "CKB testnet" },
  { label: "Signing", value: "External only" },
  { label: "Custody", value: "No private keys" }
];

const workflow = [
  { title: "Build", copy: "Generate unsigned payloads from common CKB action inputs." },
  { title: "Sign", copy: "Move the transaction into your wallet or signing tool." },
  { title: "Broadcast", copy: "Validate, dry-run, then submit the signed testnet payload." }
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid min-h-[calc(100vh-180px)] content-center gap-8 border-b border-line pb-10 lg:grid-cols-[minmax(0,1fr)_430px]">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-card border border-line bg-surface px-3 py-2 text-xs font-semibold uppercase text-copper shadow-sm shadow-ink/5">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Public testnet MVP
          </div>
          <h1 className="text-4xl font-semibold tracking-normal text-ink sm:text-5xl lg:text-6xl">
            Build and inspect CKB transaction actions faster.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-ink/70">
            CellKit gives app developers reusable testnet actions for CKB transfers, xUDT transfers, cell consolidation, capacity locks, and data cells with a private-key-free broadcast flow.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/playground" className="inline-flex h-11 items-center gap-2 rounded-card bg-ink px-4 text-sm font-semibold text-paper shadow-sm shadow-ink/10 transition hover:bg-copper">
              Open Playground
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/broadcast" className="inline-flex h-11 items-center gap-2 rounded-card border border-line bg-surface px-4 text-sm font-semibold text-ink shadow-sm shadow-ink/5 transition hover:border-copper hover:text-copper">
              Broadcast Flow
              <RadioTower className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href="https://github.com/FidelCoder/cellkitFE" target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-card border border-line bg-surface px-4 text-sm font-semibold text-ink shadow-sm shadow-ink/5 transition hover:border-copper hover:text-copper">
              GitHub
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            {signals.map((signal) => (
              <div key={signal.label} className="rounded-card border border-line bg-surface p-3 shadow-sm shadow-ink/5">
                <div className="text-xs font-semibold uppercase text-ink/45">{signal.label}</div>
                <div className="mt-1 text-sm font-semibold text-ink">{signal.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-card border border-line bg-surface p-4 shadow-sm shadow-ink/5">
          <div className="mb-4 flex items-center justify-between gap-3 border-b border-line pb-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <span className="grid h-8 w-8 place-items-center rounded-card bg-paper text-copper">
                <Terminal className="h-4 w-4" aria-hidden="true" />
              </span>
              Action response preview
            </div>
            <span className="rounded-card border border-moss/30 bg-moss/10 px-2 py-1 text-xs font-semibold uppercase text-moss">testnet</span>
          </div>
          <pre className="code-scroll overflow-auto rounded-card bg-code p-4 text-xs leading-5 text-codeText">
{`{
  "action": "ckb.transfer",
  "network": "testnet",
  "status": "unsigned",
  "signing": {
    "required": true,
    "where": "external wallet"
  },
  "nextStep": "sign externally"
}`}
          </pre>
          <div className="mt-4 grid gap-2">
            {workflow.map((item, index) => (
              <div key={item.title} className="flex gap-3 rounded-card border border-line bg-paper/65 p-3 text-sm">
                <span className="grid h-6 w-6 flex-none place-items-center rounded-card bg-surface text-xs font-semibold text-copper">{index + 1}</span>
                <span>
                  <span className="block font-semibold text-ink">{item.title}</span>
                  <span className="mt-1 block leading-5 text-ink/62">{item.copy}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase text-copper">Supported Actions</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">MVP transaction templates</h2>
          </div>
          <Link href="/actions" className="inline-flex items-center gap-2 text-sm font-semibold text-copper hover:text-ink">
            View all
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {actionOrder.map((id) => (
            <Link key={id} href={`/actions/${encodeURIComponent(id)}`} className="group rounded-card border border-line bg-surface p-4 shadow-sm shadow-ink/5 transition hover:-translate-y-0.5 hover:border-copper hover:shadow-md hover:shadow-ink/10">
              <div className="mb-4 grid h-9 w-9 place-items-center rounded-card bg-paper text-copper transition group-hover:bg-copper group-hover:text-paper">
                <Braces className="h-4 w-4" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-ink">{actionDetails[id].name}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/65">{actionDetails[id].description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
