import Link from "next/link";
import { ArrowRight, CheckCircle2, FileJson2, Loader2, RadioTower } from "lucide-react";
import { ApiError } from "./ApiError";
import { CopyButton } from "./CopyButton";
import { TransactionPreview } from "./TransactionPreview";
import { Warnings } from "./Warnings";
import type { BuildActionResponse } from "@/lib/types";

type ResultPanelProps = {
  result: BuildActionResponse | null;
  error: unknown;
  loading: boolean;
};

export function ResultPanel({ result, error, loading }: ResultPanelProps) {
  if (loading) {
    return (
      <section className="rounded-2xl border border-white/10 bg-[#18181B]/70 p-6 text-sm text-[#D8C3AD]/70 shadow-protocol">
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-copper" aria-hidden="true" />
          <span>Building action payload...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return <ApiError error={error} />;
  }

  if (!result) {
    return (
      <section className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-white/15 bg-[#18181B]/70 p-6 text-center text-sm text-[#D8C3AD]/62 shadow-protocol">
        <div>
          <FileJson2 className="mx-auto mb-3 h-8 w-8 text-copper" aria-hidden="true" />
          <p className="font-semibold text-white">No payload yet</p>
          <p className="mt-1 text-[#D8C3AD]/62">Submit an action to preview the backend response.</p>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-moss/35 bg-moss/10 p-4 text-sm shadow-protocol">
        <div className="mb-3 flex items-center gap-2 font-semibold text-moss">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          <span>{result.action}</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KeyValue label="Network" value={result.network} />
          <KeyValue label="Status" value={result.status} />
          <KeyValue label="Signer" value={result.signing?.signerAddress || "Wallet selected later"} />
          <KeyValue label="Signing" value={result.signing?.required ? "Required" : "Not required"} />
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#18181B]/70 p-4 shadow-protocol">
        <h3 className="mb-3 font-mono text-sm font-semibold uppercase tracking-wider text-white">Transaction Summary</h3>
        <pre className="code-scroll max-h-60 overflow-auto rounded-xl border border-white/10 bg-black/45 p-3 text-xs leading-5 text-codeText">
          {JSON.stringify(result.summary || {}, null, 2)}
        </pre>
      </section>

      <Warnings warnings={result.warnings} />

      <section className="rounded-2xl border border-copper/25 bg-copper/10 p-4 text-sm shadow-protocol">
        <div className="mb-3 flex items-center gap-2 font-semibold text-white">
          <RadioTower className="h-4 w-4 text-copper" aria-hidden="true" />
          <h3>Next step: sign externally</h3>
        </div>
        <p className="mb-3 leading-6 text-[#D8C3AD]/75">
          CellKit does not handle private keys. Sign this transaction with a compatible CKB wallet/tool, then paste the signed transaction into the Broadcast page.
        </p>
        <div className="flex flex-wrap gap-2">
          <CopyButton label="Copy unsigned transaction JSON" value={result.transaction} />
          <Link
            href="/broadcast"
            className="inline-flex h-9 items-center gap-2 rounded-full border border-copper/30 bg-copper px-3 font-mono text-[11px] font-bold uppercase tracking-wider text-[#18181B] transition hover:bg-copper/95"
          >
            Open Broadcast
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <TransactionPreview response={result} />

      {result.nextSteps?.length ? (
        <section className="rounded-2xl border border-white/10 bg-[#18181B]/70 p-4 text-sm shadow-protocol">
          <h3 className="mb-3 font-mono text-sm font-semibold uppercase tracking-wider text-white">Backend Next Steps</h3>
          <ol className="space-y-2 text-[#D8C3AD]/75">
            {result.nextSteps.map((step, index) => (
              <li key={step} className="flex gap-2 rounded-xl border border-white/10 bg-black/25 px-3 py-2">
                <span className="text-copper">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </div>
  );
}

function KeyValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/25 p-3">
      <div className="font-mono text-[10px] uppercase tracking-wider text-[#D8C3AD]/45">{label}</div>
      <div className="mt-1 break-words font-medium text-white">{value}</div>
    </div>
  );
}
