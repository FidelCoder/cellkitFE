"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { CopyButton } from "./CopyButton";
import type { BuildActionResponse, TransactionSkeleton } from "@/lib/types";

type TransactionPreviewProps = {
  response?: BuildActionResponse | null;
  transaction?: TransactionSkeleton | Record<string, unknown> | null;
};

const sections: Array<keyof TransactionSkeleton> = ["cellDeps", "inputs", "outputs", "outputsData", "witnesses"];

export function TransactionPreview({ response, transaction }: TransactionPreviewProps) {
  const tx = transaction || response?.transaction || null;
  const [open, setOpen] = useState<Record<string, boolean>>({
    cellDeps: true,
    inputs: true,
    outputs: true,
    outputsData: true,
    witnesses: true
  });

  const fullJson = useMemo(() => JSON.stringify(response || tx || {}, null, 2), [response, tx]);

  if (!tx) {
    return (
      <div className="rounded-card border border-dashed border-line bg-surface p-6 text-sm text-ink/62 shadow-sm shadow-ink/5">
        No transaction payload yet.
      </div>
    );
  }

  return (
    <section className="rounded-card border border-line bg-surface p-4 shadow-sm shadow-ink/5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-ink">Transaction JSON</h3>
          <p className="mt-1 text-xs text-ink/60">Unsigned skeleton from the backend response.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyButton label="Full JSON" value={response || tx} />
          <CopyButton label="Transaction" value={tx} />
        </div>
      </div>

      <div className="grid gap-2">
        {sections.map((section) => {
          const value = (tx as TransactionSkeleton)[section];
          const isOpen = open[section];
          const length = Array.isArray(value) ? value.length : 0;
          return (
            <div key={section} className="rounded-card border border-line bg-paper/60">
              <button
                type="button"
                onClick={() => setOpen((current) => ({ ...current, [section]: !isOpen }))}
                className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm font-medium text-ink"
              >
                <span className="flex min-w-0 items-center gap-2">
                  {isOpen ? <ChevronDown className="h-4 w-4" aria-hidden="true" /> : <ChevronRight className="h-4 w-4" aria-hidden="true" />}
                  <span className="truncate">{section}</span>
                </span>
                <span className="rounded-card bg-surface px-2 py-1 text-xs text-ink/62">{length} items</span>
              </button>
              {isOpen ? (
                <pre className="code-scroll max-h-56 overflow-auto border-t border-line p-3 text-xs leading-5 text-ink">
                  {length === 0 ? "[]" : JSON.stringify(value, null, 2)}
                </pre>
              ) : null}
            </div>
          );
        })}
      </div>

      <pre className="code-scroll mt-3 max-h-80 overflow-auto rounded-card bg-code p-4 text-xs leading-5 text-codeText">
        {fullJson}
      </pre>
    </section>
  );
}
