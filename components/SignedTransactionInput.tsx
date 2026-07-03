"use client";

import { CheckSquare, Code2 } from "lucide-react";

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
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#18181B]/70 shadow-protocol">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#1c1b1d] px-4 py-3">
        <div>
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-white">Signed Transaction JSON</h2>
          <p className="mt-1 text-sm leading-6 text-[#D8C3AD]/65">Paste a signed CKB testnet transaction. CellKit never asks for private keys.</p>
        </div>
        <span className="rounded-full border border-moss/30 bg-moss/10 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-moss">{network}</span>
      </div>

      <div className="grid gap-4 p-4">
        <label className="grid gap-2 text-sm font-medium text-white">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#D8C3AD]/60">Network</span>
          <select value={network} disabled className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 font-mono text-sm text-white outline-none disabled:cursor-not-allowed disabled:text-[#D8C3AD]/55">
            <option value="testnet">testnet</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-white">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#D8C3AD]/60">Signed Transaction JSON</span>
          <textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="code-scroll min-h-[320px] w-full rounded-xl border border-white/10 bg-black/60 px-3 py-3 font-mono text-xs leading-5 text-codeText outline-none transition placeholder:text-[#D8C3AD]/30 focus:border-copper/45 focus:ring-2 focus:ring-copper/10 sm:min-h-[420px]"
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
          {parseError ? <span className="font-mono text-xs font-normal text-copper">{parseError}</span> : null}
        </label>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="inline-flex items-center gap-2 text-sm text-[#D8C3AD]/75">
            <input
              type="checkbox"
              checked={skipDryRun}
              onChange={(event) => onSkipDryRunChange(event.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-black text-copper focus:ring-copper"
            />
            <span>Skip dry-run during broadcast</span>
          </label>

          <button
            type="button"
            onClick={onFormat}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 font-mono text-[11px] font-medium uppercase tracking-wider text-white transition hover:border-copper/35 hover:text-copper"
          >
            <Code2 className="h-4 w-4" aria-hidden="true" />
            Format JSON
          </button>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/30 p-3 text-sm leading-6 text-[#D8C3AD]/68">
          <div className="mb-1 flex items-center gap-2 font-medium text-white">
            <CheckSquare className="h-4 w-4 text-moss" aria-hidden="true" />
            Signed payload only
          </div>
          CellKit validates, dry-runs, and broadcasts a signed transaction payload. It does not connect wallets, sign transactions, or handle private keys.
        </div>
      </div>
    </section>
  );
}
