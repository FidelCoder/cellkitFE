import Link from "next/link";
import { ArrowRight, Braces, CheckCircle2, Database, Github, Server, ShieldCheck } from "lucide-react";
import { ProtocolNetworkViz } from "@/components/ProtocolNetworkViz";
import { actionDetails, actionOrder } from "@/lib/examples";

const signals = [
  { label: "Network", value: "CKB testnet" },
  { label: "Signing", value: "External only" },
  { label: "Custody", value: "No private keys" }
];

const propositions = [
  {
    icon: Server,
    tag: "API_FIRST",
    title: "Backend-ready actions",
    copy: "Generate reusable CKB transaction actions from HTTP-friendly inputs, without binding every product surface to a browser wallet SDK."
  },
  {
    icon: Database,
    tag: "INSPECTABLE",
    title: "Form-to-JSON workflows",
    copy: "Turn simple action fields into visible transaction JSON with summaries, warnings, selected cells, fee estimates, and signing steps."
  },
  {
    icon: ShieldCheck,
    tag: "EXTERNAL_SIGNING",
    title: "Dry-run before broadcast",
    copy: "Keep signing outside CellKit, then validate, dry-run, and submit signed testnet transactions through one explicit verification flow."
  }
];

const codePreview = `{
  "action": "ckb.transfer",
  "network": "testnet",
  "status": "built",
  "summary": {
    "selectedCellCount": 2,
    "estimatedFeeShannons": "1432"
  },
  "signing": {
    "required": true,
    "where": "external wallet"
  }
}`;

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 py-10 pb-24 sm:px-6 lg:px-8">
      <section className="flex flex-col items-center pt-6 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-moss/20 bg-moss/10 px-3 py-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-moss" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-moss">System Status: Testnet MVP</span>
        </div>

        <h1 className="max-w-5xl text-4xl font-extrabold leading-[1.05] tracking-normal text-white sm:text-5xl md:text-7xl lg:text-8xl">
          Inspectable CKB <br />
          <span className="bg-gradient-to-r from-copper to-amber-500 bg-clip-text text-transparent">Transaction Actions.</span>
        </h1>

        <p className="mt-8 max-w-3xl text-lg font-light leading-relaxed text-[#D8C3AD]/80 sm:text-xl md:text-2xl">
          A reusable workflow layer for building, validating, and broadcasting externally signed CKB transactions. API-first. Protocol-grade.
        </p>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <Link href="/playground" className="inline-flex w-full items-center justify-center rounded-full bg-copper px-8 py-4 font-mono text-xs font-bold uppercase tracking-wider text-[#18181B] shadow-[0_0_30px_rgba(255,193,116,0.15)] transition hover:bg-copper/95 active:scale-95 sm:w-auto">
            Open Playground
          </Link>
          <Link href="/actions" className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-transparent px-8 py-4 font-mono text-xs uppercase tracking-wider text-white transition hover:border-white/20 hover:bg-white/5 active:scale-95 sm:w-auto">
            View Templates
          </Link>
          <a href="https://github.com/FidelCoder/cellkitFE" target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-[#18181B]/60 px-8 py-4 font-mono text-xs uppercase tracking-wider text-[#D8C3AD] transition hover:border-copper/30 hover:text-copper active:scale-95 sm:w-auto">
            <Github className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
        </div>

        <div className="mt-10 grid w-full max-w-2xl gap-3 sm:grid-cols-3">
          {signals.map((signal) => (
            <div key={signal.label} className="rounded-xl border border-white/10 bg-[#18181B]/60 p-3 text-left shadow-protocol">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#D8C3AD]/45">{signal.label}</div>
              <div className="mt-1 text-sm font-semibold text-white">{signal.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full">
        <ProtocolNetworkViz />
      </section>

      <section className="border-t border-white/10 pt-16">
        <div className="grid gap-8 md:grid-cols-3">
          {propositions.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className={`flex flex-col gap-4 p-2 ${index > 0 ? "border-t border-white/10 pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0" : ""}`}>
                <div className="flex items-center justify-between text-copper">
                  <Icon className="h-8 w-8" aria-hidden="true" />
                  <span className="rounded border border-white/10 px-2 py-0.5 font-mono text-[9px] text-white/40">{item.tag}</span>
                </div>
                <h2 className="text-xl font-semibold tracking-normal text-white">{item.title}</h2>
                <p className="text-sm leading-relaxed text-[#D8C3AD]/75">{item.copy}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-12 border-t border-white/10 pt-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="mb-4 text-3xl font-bold tracking-normal text-white">Action response console</h2>
          <p className="mb-8 max-w-xl text-base leading-relaxed text-[#D8C3AD]/80">
            CellKit is not a wallet. It produces inspectable artifacts for teams that want transaction generation, external signing, validation, and broadcast as separate steps.
          </p>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 bg-[#1c1b1d] px-4 py-2">
              <div className="flex gap-2">
                <span className="rounded bg-copper/15 px-2.5 py-1 font-mono text-[11px] text-copper">JSON</span>
                <span className="rounded px-2.5 py-1 font-mono text-[11px] text-white/40">READ-ONLY</span>
              </div>
              <span className="font-mono text-[10px] text-white/35">BUILD / SIGN / VERIFY</span>
            </div>
            <pre className="code-scroll overflow-auto p-6 text-left font-mono text-[13px] leading-relaxed text-codeText">
              <code>{codePreview}</code>
            </pre>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-10 lg:col-span-4 lg:col-start-9">
          <div>
            <h2 className="mb-3 text-2xl font-semibold tracking-normal text-white">Verification-first</h2>
            <p className="mb-6 text-sm leading-relaxed text-[#D8C3AD]/85">
              For CKB transfer, the backend handles live-cell lookup, ordinary cell filtering, deterministic selection, fee estimation, and unsigned skeleton construction.
            </p>
            <div className="mb-2 text-5xl font-extrabold tracking-normal text-copper md:text-6xl">0</div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#D8C3AD]/60">private keys handled by CellKit</div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <h2 className="mb-3 text-2xl font-semibold tracking-normal text-white">Explicit testnet broadcast</h2>
            <p className="mb-6 text-sm leading-relaxed text-[#D8C3AD]/85">
              Signed transactions are validated and dry-run before broadcast by default. The UI keeps each step visible and deliberate.
            </p>
            <Link href="/broadcast" className="group flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-copper transition hover:text-copper/80">
              Open Broadcast Flow
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 pt-16">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-copper">Supported Actions</p>
            <h2 className="mt-2 text-3xl font-bold tracking-normal text-white">MVP transaction templates</h2>
          </div>
          <Link href="/actions" className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-copper hover:text-white">
            View all
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {actionOrder.map((id) => (
            <Link key={id} href={`/actions/${encodeURIComponent(id)}`} className="group rounded-xl border border-white/10 bg-[#18181B]/60 p-4 shadow-protocol transition hover:-translate-y-0.5 hover:border-copper/35 hover:bg-[#18181B]">
              <div className="mb-4 grid h-9 w-9 place-items-center rounded-lg bg-black/40 text-copper transition group-hover:bg-copper group-hover:text-[#18181B]">
                <Braces className="h-4 w-4" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-white">{actionDetails[id].name}</h3>
              <p className="mt-2 text-sm leading-6 text-[#D8C3AD]/65">{actionDetails[id].description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-8 border-t border-white/10 pt-16 md:grid-cols-12 md:items-center">
        <div className="md:col-span-6">
          <h2 className="mb-6 text-3xl font-extrabold leading-none tracking-normal text-white md:text-5xl">Deterministic output.</h2>
          <p className="mb-8 max-w-lg text-base leading-relaxed text-[#D8C3AD]/80 md:text-lg">
            Every action is built for review. CellKit keeps the transaction shape visible before signatures and network submission.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#18181B]/60 px-4 py-2.5">
              <CheckCircle2 className="h-4 w-4 text-moss" aria-hidden="true" />
              <span className="font-mono text-xs text-white">External signing</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#18181B]/60 px-4 py-2.5">
              <CheckCircle2 className="h-4 w-4 text-moss" aria-hidden="true" />
              <span className="font-mono text-xs text-white">Dry-run simulation</span>
            </div>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#18181B] shadow-2xl md:col-span-6">
          <div className="protocol-grid absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-copper/10" />
          <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/10 bg-black/55 p-4 backdrop-blur-md">
            <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[#D8C3AD]/50">
              <span>Validation Stack</span>
              <span>testnet</span>
            </div>
            <div className="grid gap-2 font-mono text-xs text-white">
              <span>01 transaction shape check</span>
              <span>02 witness presence check</span>
              <span>03 rpc dry-run</span>
              <span>04 explicit broadcast</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
