"use client";

import { useMemo, useState } from "react";
import { RadioTower, SearchCheck, Send, ShieldCheck } from "lucide-react";
import { BroadcastResult } from "@/components/BroadcastResult";
import { SignedTransactionInput } from "@/components/SignedTransactionInput";
import { broadcastTransaction, dryRunTransaction, validateSignedTransaction } from "@/lib/api";
import type { BroadcastTransactionResponse, DryRunTransactionResponse, ValidateSignedTransactionResponse } from "@/lib/types";

type ActionName = "validate" | "dry-run" | "broadcast";

const confirmationText = "This will submit the signed transaction to CKB testnet. Make sure you reviewed the transaction and dry-run result.";

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

  const isLoading = Boolean(loadingAction);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-copper">Broadcast</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">Validate and broadcast signed CKB transactions</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-ink/68">
            Paste a signed CKB testnet transaction, dry-run it through the CellKit backend, and broadcast it when ready.
          </p>
        </div>
        <div className="flex w-fit items-center gap-2 rounded-card border border-moss/30 bg-moss/10 px-3 py-2 text-xs font-semibold uppercase text-moss">
          testnet only
        </div>
      </div>

      <div className="mb-6 rounded-card border border-copper/35 bg-copper/10 p-4 text-sm leading-6 text-ink/75">
        <strong className="text-ink">Testnet only.</strong> CellKit does not connect wallets, request private keys, or sign transactions. Broadcast only after external signing and review.
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_460px]">
        <div className="grid gap-4">
          <SignedTransactionInput
            network="testnet"
            value={signedTransactionJson}
            skipDryRun={skipDryRun}
            parseError={parseError}
            onChange={setSignedTransactionJson}
            onFormat={handleFormatJson}
            onSkipDryRunChange={setSkipDryRun}
          />

          <section className="rounded-card border border-line bg-surface p-4 shadow-sm shadow-ink/5">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-ink">Actions</h2>
              <p className="mt-1 text-sm leading-6 text-ink/65">Run each step explicitly. Dry-run never broadcasts automatically.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <button
                type="button"
                onClick={handleValidate}
                disabled={isLoading}
                className="inline-flex min-h-11 items-center justify-center rounded-card border border-line bg-paper px-4 py-2 text-center text-sm font-semibold leading-5 text-ink transition hover:border-copper hover:text-copper disabled:cursor-not-allowed disabled:opacity-60"
              >
                <SearchCheck className="mr-2 h-4 w-4" aria-hidden="true" />
                Validate Signed Transaction
              </button>
              <button
                type="button"
                onClick={handleDryRun}
                disabled={isLoading}
                className="inline-flex min-h-11 items-center justify-center rounded-card border border-line bg-paper px-4 py-2 text-center text-sm font-semibold leading-5 text-ink transition hover:border-copper hover:text-copper disabled:cursor-not-allowed disabled:opacity-60"
              >
                <ShieldCheck className="mr-2 h-4 w-4" aria-hidden="true" />
                Dry Run
              </button>
              <button
                type="button"
                onClick={handleBroadcast}
                disabled={isLoading}
                className="inline-flex min-h-11 items-center justify-center rounded-card bg-copper px-4 py-2 text-center text-sm font-semibold leading-5 text-paper shadow-sm shadow-ink/10 transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                Broadcast to Testnet
              </button>
            </div>
            <div className="mt-4 flex items-start gap-2 rounded-card border border-copper/25 bg-copper/10 p-3 text-sm leading-6 text-ink/72">
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
