"use client";

import { CheckSquare, Code2 } from "lucide-react";
import { inputClass, textareaClass } from "./forms/FormPrimitives";

type SignedTransactionInputProps = {
  network: "testnet";
  value: string;
  skipDryRun: boolean;
  parseError: string | null;
  onChange: (value: string) => void;
  onFormat: () => void;
  onSkipDryRunChange: (value: boolean) => void;
};

export function SignedTransactionInput({
  network,
  value,
  skipDryRun,
  parseError,
  onChange,
  onFormat,
  onSkipDryRunChange
}: SignedTransactionInputProps) {
  return (
    <section className="rounded-card border border-line bg-surface p-4 shadow-sm shadow-ink/5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-ink">Signed Transaction JSON</h2>
          <p className="mt-1 text-sm leading-6 text-ink/65">Paste a signed CKB testnet transaction. CellKit never asks for private keys.</p>
        </div>
        <span className="rounded-card border border-moss/30 bg-moss/10 px-2 py-1 text-xs font-semibold uppercase text-moss">testnet</span>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-2 text-sm font-medium text-ink">
          <span>Network</span>
          <select value={network} disabled className={inputClass}>
            <option value="testnet">testnet</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-ink">
          <span>Signed Transaction JSON</span>
          <textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className={`${textareaClass} min-h-[320px] font-mono text-xs leading-5 sm:min-h-[420px]`}
            spellCheck={false}
            placeholder={`{
  "version": "0x0",
  "cellDeps": [],
  "headerDeps": [],
  "inputs": [],
  "outputs": [],
  "outputsData": [],
  "witnesses": []
}`}
          />
          {parseError ? <span className="text-xs font-normal text-copper">{parseError}</span> : null}
        </label>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="inline-flex items-center gap-2 text-sm text-ink/75">
            <input
              type="checkbox"
              checked={skipDryRun}
              onChange={(event) => onSkipDryRunChange(event.target.checked)}
              className="h-4 w-4 rounded border-line text-copper focus:ring-copper"
            />
            <span>Skip dry-run during broadcast</span>
          </label>

          <button
            type="button"
            onClick={onFormat}
            className="inline-flex h-9 items-center gap-2 rounded-card border border-line bg-paper px-3 text-sm font-medium text-ink transition hover:border-copper hover:text-copper"
          >
            <Code2 className="h-4 w-4" aria-hidden="true" />
            Format JSON
          </button>
        </div>

        <div className="rounded-card border border-line bg-paper p-3 text-sm leading-6 text-ink/68">
          <div className="mb-1 flex items-center gap-2 font-medium text-ink">
            <CheckSquare className="h-4 w-4 text-moss" aria-hidden="true" />
            Signed payload only
          </div>
          CellKit validates, dry-runs, and broadcasts a signed transaction payload. It does not connect wallets, sign transactions, or handle private keys.
        </div>
      </div>
    </section>
  );
}
