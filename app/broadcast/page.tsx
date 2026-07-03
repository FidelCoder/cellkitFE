"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, RadioTower, SearchCheck, Send, ShieldCheck } from "lucide-react";
import { BroadcastResult } from "@/components/BroadcastResult";
import { SignedTransactionInput } from "@/components/SignedTransactionInput";
import { broadcastTransaction, dryRunTransaction, validateSignedTransaction } from "@/lib/api";
import type { BroadcastTransactionResponse, DryRunTransactionResponse, ValidateSignedTransactionResponse } from "@/lib/types";

type ActionName = "validate" | "dry-run" | "broadcast";

const confirmationText = "This will submit the signed transaction to CKB testnet. Make sure you reviewed the transaction and dry-run result.";

const steps = [
  { id: "paste", label: "Paste", copy: "Signed JSON payload" },
  { id: "validate", label: "Validate", copy: "Shape and witness checks" },
  { id: "dry-run", label: "Dry-run", copy: "RPC simulation" },
  { id: "broadcast", label: "Broadcast", copy: "Testnet submission" }
];

export default function BroadcastPage() {
  const [signedTransactionJson, setSignedTransactionJson] = useState("");
  const [skipDryRun, setSkipDryRun] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [validation, setValidation] = useState<ValidateSignedTransactionResponse | null>(null);
  const [dryRun, setDryRun] = useState<DryRunTransactionResponse | null>(null);
  const [broadcast, setBroadcast] = useState<BroadcastTransactionResponse | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loadingAction, setLoadingAction] = useState<ActionName | null>(null);

  const loadingLabel = useMemo(() => {
    if (loadingAction === "validate") return "Validating signed transaction...";
    if (loadingAction === "dry-run") return "Dry-running signed transaction through CKB RPC...";
    if (loadingAction === "broadcast") return "Broadcasting signed transaction to CKB testnet...";
    return null;
  }, [loadingAction]);

  const hasJson = signedTransactionJson.trim().length > 0;
  const validationPassed = validation?.valid === true;
  const dryRunPassed = dryRun?.status === "dry_run_ok";
  const isLoading = Boolean(loadingAction);
  const canDryRun = validationPassed && !isLoading;
  const canBroadcast = validationPassed && (skipDryRun || dryRunPassed) && !isLoading;

  function resetResults() {
    setValidation(null);
    setDryRun(null);
    setBroadcast(null);
    setError(null);
    setParseError(null);
  }

  function handleTransactionChange(value: string) {
    setSignedTransactionJson(value);
    resetResults();
  }

  function parseTransaction() {
    setParseError(null);
    try {
      const parsed = JSON.parse(signedTransactionJson);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("Signed transaction JSON must be an object.");
      }
      return parsed;
    } catch (parseFailure) {
      const message = parseFailure instanceof Error ? parseFailure.message : "Invalid JSON.";
      setParseError(`Invalid JSON: ${message}`);
      throw new Error(`Invalid JSON: ${message}`);
    }
  }

  function payload(transaction: unknown) {
    return {
      network: "testnet",
      transaction
    };
  }

  async function handleValidate() {
    setError(null);
    setDryRun(null);
    setBroadcast(null);
    setLoadingAction("validate");
    try {
      const transaction = parseTransaction();
      const response = await validateSignedTransaction(payload(transaction));
      setValidation(response);
    } catch (validateError) {
      setError(validateError);
    } finally {
      setLoadingAction(null);
    }
  }

  async function handleDryRun() {
    setError(null);
    setBroadcast(null);
    setLoadingAction("dry-run");
    try {
      const transaction = parseTransaction();
      const response = await dryRunTransaction(payload(transaction));
      setDryRun(response);
    } catch (dryRunError) {
      setError(dryRunError);
    } finally {
      setLoadingAction(null);
    }
  }

  async function handleBroadcast() {
    setError(null);
    if (!window.confirm(confirmationText)) {
      return;
    }

    setLoadingAction("broadcast");
    try {
      const transaction = parseTransaction();
      const response = await broadcastTransaction({
        ...payload(transaction),
        skipDryRun
      });
      setBroadcast(response);
    } catch (broadcastError) {
      setError(broadcastError);
    } finally {
      setLoadingAction(null);
    }
  }

  function handleFormatJson() {
    setError(null);
    try {
      const transaction = parseTransaction();
      setSignedTransactionJson(JSON.stringify(transaction, null, 2));
      setParseError(null);
    } catch {
      return;
    }
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 pb-24 sm:px-6 lg:px-8">
      <section className="grid gap-6 border-b border-white/10 pb-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-copper">Broadcast Console</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-extrabold tracking-normal text-white sm:text-5xl">Validate, dry-run, and broadcast signed CKB transactions.</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#D8C3AD]/75">
            Paste a signed CKB testnet transaction, run local structure checks, simulate through CKB RPC, then submit only after explicit review.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#18181B]/70 p-4 shadow-protocol">
          <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[#D8C3AD]/50">
            <span>Verification lane</span>
            <span className="text-moss">testnet</span>
          </div>
          <div className="grid gap-2">
            {steps.map((step, index) => (
              <StepRow key={step.id} index={index + 1} label={step.label} copy={step.copy} active={stepStatus(step.id, hasJson, validationPassed, dryRunPassed, Boolean(broadcast))} />
            ))}
          </div>
        </div>
      </section>

      <div className="rounded-2xl border border-copper/25 bg-copper/10 p-4 text-sm leading-6 text-[#D8C3AD]/80">
        <strong className="text-white">Testnet only.</strong> CellKit does not connect wallets, request private keys, or sign transactions. Broadcast only after external signing and review.
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_480px]">
        <div className="grid gap-4">
          <SignedTransactionInput
            network="testnet"
            value={signedTransactionJson}
            skipDryRun={skipDryRun}
            parseError={parseError}
            onChange={handleTransactionChange}
            onFormat={handleFormatJson}
            onSkipDryRunChange={setSkipDryRun}
          />

          <section className="rounded-2xl border border-white/10 bg-[#18181B]/70 p-4 shadow-protocol">
            <div className="mb-4">
              <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-white">Execution Controls</h2>
              <p className="mt-1 text-sm leading-6 text-[#D8C3AD]/65">Run each step deliberately. Validation must pass before dry-run, and broadcast requires either a successful dry-run or an explicit skip.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <button
                type="button"
                onClick={handleValidate}
                disabled={isLoading || !hasJson}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-center font-mono text-[11px] font-bold uppercase tracking-wider text-white transition hover:border-copper/40 hover:text-copper disabled:cursor-not-allowed disabled:opacity-40"
              >
                <SearchCheck className="h-4 w-4" aria-hidden="true" />
                Validate
              </button>
              <button
                type="button"
                onClick={handleDryRun}
                disabled={!canDryRun}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-center font-mono text-[11px] font-bold uppercase tracking-wider text-white transition hover:border-copper/40 hover:text-copper disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Dry Run
              </button>
              <button
                type="button"
                onClick={handleBroadcast}
                disabled={!canBroadcast}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-copper px-4 py-2 text-center font-mono text-[11px] font-bold uppercase tracking-wider text-[#18181B] shadow-[0_0_30px_rgba(255,193,116,0.15)] transition hover:bg-copper/95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                Broadcast
              </button>
            </div>
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-copper/20 bg-copper/10 p-3 text-sm leading-6 text-[#D8C3AD]/75">
              <RadioTower className="mt-1 h-4 w-4 flex-none text-copper" aria-hidden="true" />
              <span>{confirmationText}</span>
            </div>
          </section>
        </div>

        <BroadcastResult
          validation={validation}
          dryRun={dryRun}
          broadcast={broadcast}
          error={error}
          loadingAction={loadingLabel}
        />
      </div>
    </div>
  );
}

function stepStatus(stepId: string, hasJson: boolean, validationPassed: boolean, dryRunPassed: boolean, broadcasted: boolean) {
  if (stepId === "paste") return hasJson;
  if (stepId === "validate") return validationPassed;
  if (stepId === "dry-run") return dryRunPassed;
  if (stepId === "broadcast") return broadcasted;
  return false;
}

function StepRow({ index, label, copy, active }: { index: number; label: string; copy: string; active: boolean }) {
  return (
    <div className={`flex items-center gap-3 rounded-xl border px-3 py-2 transition ${active ? "border-moss/25 bg-moss/10" : "border-white/10 bg-black/20"}`}>
      <span className={`grid h-7 w-7 flex-none place-items-center rounded-lg font-mono text-[11px] font-bold ${active ? "bg-moss text-[#08110d]" : "bg-white/5 text-[#D8C3AD]/55"}`}>
        {active ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> : index}
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-white">{label}</span>
        <span className="block truncate text-xs text-[#D8C3AD]/55">{copy}</span>
      </span>
    </div>
  );
}
