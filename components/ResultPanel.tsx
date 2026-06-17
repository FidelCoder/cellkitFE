import Link from "next/link";
import { CheckCircle2, FileJson2, Loader2 } from "lucide-react";
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
      <section className="rounded-card border border-line bg-surface p-6 text-sm text-ink/70 shadow-sm shadow-ink/5">
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
      <section className="grid min-h-56 place-items-center rounded-card border border-dashed border-line bg-surface p-6 text-center text-sm text-ink/62 shadow-sm shadow-ink/5">
        <div>
          <FileJson2 className="mx-auto mb-3 h-8 w-8 text-copper" aria-hidden="true" />
          <p className="font-medium text-ink">No payload yet</p>
          <p className="mt-1 text-ink/62">Submit an action to preview the backend response.</p>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      <section className="rounded-card border border-moss/35 bg-moss/10 p-4 text-sm shadow-sm shadow-ink/5">
        <div className="mb-3 flex items-center gap-2 font-semibold text-moss">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          <span>{result.action}</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <KeyValue label="Network" value={result.network} />
          <KeyValue label="Status" value={result.status} />
          <KeyValue label="Signer" value={result.signing?.signerAddress || "Wallet selected later"} />
          <KeyValue label="Signing" value={result.signing?.required ? "Required" : "Not required"} />
        </div>
      </section>

      <section className="rounded-card border border-line bg-surface p-4 shadow-sm shadow-ink/5">
        <h3 className="mb-3 text-sm font-semibold text-ink">Summary</h3>
        <pre className="code-scroll max-h-60 overflow-auto rounded-card bg-paper p-3 text-xs leading-5 text-ink">
          {JSON.stringify(result.summary || {}, null, 2)}
        </pre>
      </section>

      <Warnings warnings={result.warnings} />

      <section className="rounded-card border border-line bg-surface p-4 text-sm shadow-sm shadow-ink/5">
        <h3 className="mb-2 font-semibold text-ink">Next step: sign externally</h3>
        <p className="mb-3 leading-6 text-ink/70">
          CellKit does not handle private keys. Sign this transaction with a compatible CKB wallet/tool, then paste the signed transaction into the Broadcast page.
        </p>
        <div className="flex flex-wrap gap-2">
          <CopyButton label="Copy unsigned transaction JSON" value={result.transaction} />
          <Link
            href="/broadcast"
            className="inline-flex h-9 items-center rounded-card border border-line bg-paper px-3 text-sm font-medium text-ink hover:border-copper hover:text-copper"
          >
            Open Broadcast
          </Link>
        </div>
      </section>

      <TransactionPreview response={result} />

      {result.nextSteps?.length ? (
        <section className="rounded-card border border-line bg-surface p-4 text-sm shadow-sm shadow-ink/5">
          <h3 className="mb-3 font-semibold text-ink">Next Steps</h3>
          <ol className="space-y-2 text-ink/75">
            {result.nextSteps.map((step, index) => (
              <li key={step} className="flex gap-2">
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
    <div className="rounded-card bg-surface p-3">
      <div className="text-xs uppercase text-ink/45">{label}</div>
      <div className="mt-1 break-words font-medium text-ink">{value}</div>
    </div>
  );
}
