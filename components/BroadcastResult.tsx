"use client";

import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, ExternalLink, Loader2, RadioTower, ShieldCheck } from "lucide-react";
import type { BroadcastTransactionResponse, DryRunTransactionResponse, ValidateSignedTransactionResponse } from "@/lib/types";

type BroadcastResultProps = {
  validation: ValidateSignedTransactionResponse | null;
  dryRun: DryRunTransactionResponse | null;
  broadcast: BroadcastTransactionResponse | null;
  error: unknown;
  loadingAction: string | null;
};

export function BroadcastResult({ validation, dryRun, broadcast, error, loadingAction }: BroadcastResultProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#18181B]/70 p-4 shadow-protocol xl:sticky xl:top-24 xl:self-start">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Validation and Broadcast Results</h2>
          <p className="mt-1 text-sm leading-6 text-[#D8C3AD]/65">Review backend validation, CKB dry-run, and broadcast responses.</p>
        </div>
        <span className="rounded-full border border-moss/30 bg-moss/10 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-moss">testnet</span>
      </div>

      {loadingAction ? <LoadingState action={loadingAction} /> : null}
      {error ? <ErrorState error={error} /> : null}

      <div className="grid gap-4">
        <ResultBlock title="Signed Transaction Validation" empty="Validate a signed transaction to see structural checks." icon="validate">
          {validation ? <ValidationContent validation={validation} /> : null}
        </ResultBlock>

        <ResultBlock title="Dry Run" empty="Dry-run the signed transaction to inspect CKB VM cycles." icon="dry-run">
          {dryRun ? <DryRunContent dryRun={dryRun} /> : null}
        </ResultBlock>

        <ResultBlock title="Broadcast" empty="Broadcast only after reviewing the signed payload and dry-run result." icon="broadcast">
          {broadcast ? <BroadcastContent broadcast={broadcast} /> : null}
        </ResultBlock>
      </div>
    </section>
  );
}

function LoadingState({ action }: { action: string }) {
  return (
    <div className="mb-4 rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-[#D8C3AD]/70">
      <div className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin text-copper" aria-hidden="true" />
        <span>{action}</span>
      </div>
    </div>
  );
}

function ErrorState({ error }: { error: unknown }) {
  const shaped = normalizeError(error);
  const suggestion = getSuggestion(shaped.message);

  return (
    <div className="mb-4 rounded-xl border border-copper/40 bg-copper/10 p-4 text-sm text-white">
      <div className="mb-2 flex items-center gap-2 font-semibold text-copper">
        <AlertTriangle className="h-4 w-4" aria-hidden="true" />
        <span>{shaped.title}</span>
      </div>
      <p className="leading-6">{shaped.message}</p>
      {suggestion ? <p className="mt-3 leading-6 text-[#D8C3AD]/75">{suggestion}</p> : null}
      {shaped.details ? (
        <pre className="code-scroll mt-3 max-h-48 overflow-auto rounded-xl bg-code p-3 text-xs text-codeText">
          {JSON.stringify(shaped.details, null, 2)}
        </pre>
      ) : null}
    </div>
  );
}

function ResultBlock({ title, empty, icon, children }: { title: string; empty: string; icon: "validate" | "dry-run" | "broadcast"; children: ReactNode }) {
  const Icon = icon === "broadcast" ? RadioTower : icon === "dry-run" ? ShieldCheck : CheckCircle2;

  return (
    <div className="rounded-xl border border-white/10 bg-black/25 p-4">
      <div className="mb-3 flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wider text-white">
        <Icon className="h-4 w-4 text-copper" aria-hidden="true" />
        <span>{title}</span>
      </div>
      {children || <p className="text-sm leading-6 text-[#D8C3AD]/60">{empty}</p>}
    </div>
  );
}

function ValidationContent({ validation }: { validation: ValidateSignedTransactionResponse }) {
  return (
    <div className="grid gap-3 text-sm">
      <StatusPill ok={validation.valid} okText="Valid" failText="Invalid" />
      <List title="Errors" items={validation.errors} tone="error" />
      <List title="Warnings" items={validation.warnings} tone="warning" />
    </div>
  );
}

function DryRunContent({ dryRun }: { dryRun: DryRunTransactionResponse }) {
  return (
    <div className="grid gap-3 text-sm">
      <KeyValue label="Status" value={dryRun.status} />
      <KeyValue label="Network" value={dryRun.network} />
      {dryRun.dryRun?.cycles ? <KeyValue label="Cycles" value={dryRun.dryRun.cycles} /> : null}
      <List title="Warnings" items={dryRun.warnings || []} tone="warning" />
      <List title="Next Steps" items={dryRun.nextSteps || []} tone="neutral" />
    </div>
  );
}

function BroadcastContent({ broadcast }: { broadcast: BroadcastTransactionResponse }) {
  return (
    <div className="grid gap-3 text-sm">
      <KeyValue label="Status" value={broadcast.status} />
      <KeyValue label="Network" value={broadcast.network} />
      <KeyValue label="Transaction Hash" value={broadcast.txHash} />
      {broadcast.dryRun ? <KeyValue label="Dry Run" value={broadcast.dryRun.performed ? `Performed${broadcast.dryRun.cycles ? `, ${broadcast.dryRun.cycles} cycles` : ""}` : "Skipped"} /> : null}
      {broadcast.explorerUrl ? (
        <a
          href={broadcast.explorerUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-copper/20 bg-copper/10 px-3 py-2 font-medium text-copper hover:border-copper"
        >
          View on explorer
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      ) : null}
      <List title="Next Steps" items={broadcast.nextSteps || []} tone="neutral" />
    </div>
  );
}

function StatusPill({ ok, okText, failText }: { ok: boolean; okText: string; failText: string }) {
  return (
    <span className={`w-fit rounded-full px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider ${ok ? "border border-moss/30 bg-moss/10 text-moss" : "border border-copper/30 bg-copper/10 text-copper"}`}>
      {ok ? okText : failText}
    </span>
  );
}

function KeyValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-3">
      <div className="font-mono text-[10px] uppercase tracking-wider text-[#D8C3AD]/45">{label}</div>
      <div className="mt-1 break-words font-medium text-white">{value}</div>
    </div>
  );
}

function List({ title, items, tone }: { title: string; items: string[]; tone: "error" | "warning" | "neutral" }) {
  if (!items.length) {
    return null;
  }

  const toneClass = tone === "error" ? "text-copper" : tone === "warning" ? "text-[#D8C3AD]/75" : "text-[#D8C3AD]/70";

  return (
    <div>
      <div className="mb-1 text-xs font-semibold uppercase text-[#D8C3AD]/45">{title}</div>
      <ul className={`grid gap-1 leading-6 ${toneClass}`}>
        {items.map((item) => (
          <li key={item} className="rounded-xl border border-white/10 bg-black/30 px-3 py-2">{item}</li>
        ))}
      </ul>
    </div>
  );
}

function normalizeError(error: unknown) {
  if (error && typeof error === "object" && "body" in error) {
    const body = (error as { body?: unknown }).body;
    if (body && typeof body === "object") {
      const shaped = body as { error?: string; message?: string; details?: unknown };
      return {
        title: shaped.error || "backend_error",
        message: shaped.message || "The backend returned an error.",
        details: shaped.details
      };
    }
  }

  if (error && typeof error === "object" && "message" in error) {
    return { title: "error", message: String((error as { message: unknown }).message), details: undefined };
  }

  return { title: "error", message: "Unexpected error", details: undefined };
}

function getSuggestion(message: string) {
  if (message.includes("CKB RPC is not configured. Set CKB_RPC_URL.")) {
    return "Backend is not connected to CKB RPC. Add CKB_RPC_URL to the backend .env file.";
  }
  if (message.includes("signed transaction is required; witnesses are empty")) {
    return "This transaction still looks unsigned. Sign it externally before dry-run or broadcast.";
  }
  if (message.includes("zeroed signature placeholder")) {
    return "The witness still contains the unsigned placeholder from the build step. Replace it with a real wallet/tool signature.";
  }
  if (message.includes("too short to contain a default lock signature")) {
    return "The witness data is too short to look like a default lock signature. Confirm the transaction was signed, not only copied from the unsigned payload.";
  }
  if (message.includes("previous_output.tx_hash")) {
    return "The transaction input out point is malformed. Rebuild or inspect the signed payload before dry-run.";
  }
  if (message.includes("broadcast rejected because dry-run failed")) {
    return "CellKit did not broadcast because dry-run failed. Review the RPC error and fix the signed transaction.";
  }
  return undefined;
}
