"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { ActionSelector } from "@/components/ActionSelector";
import { ApiError } from "@/components/ApiError";
import { ResultPanel } from "@/components/ResultPanel";
import { CapacityLockForm } from "@/components/forms/CapacityLockForm";
import { CellConsolidationForm } from "@/components/forms/CellConsolidationForm";
import { CkbTransferForm } from "@/components/forms/CkbTransferForm";
import { DataCellCreateForm } from "@/components/forms/DataCellCreateForm";
import { XudtTransferForm } from "@/components/forms/XudtTransferForm";
import {
  buildCapacityLock,
  buildCellConsolidation,
  buildCkbTransfer,
  buildDataCellCreate,
  buildXudtTransfer,
  getActions
} from "@/lib/api";
import { actionDetails, actionOrder } from "@/lib/examples";
import type { ActionId, ActionItem, BuildActionResponse } from "@/lib/types";

const localActions: ActionItem[] = actionOrder.map((id) => ({
  id,
  name: actionDetails[id].name,
  description: actionDetails[id].description,
  endpoint: actionDetails[id].endpoint,
  status: "mvp"
}));

const flowSteps = [
  { label: "Build", copy: "Action fields" },
  { label: "Inspect", copy: "Unsigned JSON" },
  { label: "Sign", copy: "External tool" },
  { label: "Broadcast", copy: "Validate + dry-run" }
];

export default function PlaygroundPage() {
  const [actions, setActions] = useState<ActionItem[]>(localActions);
  const [registryError, setRegistryError] = useState<unknown>(null);
  const [selectedAction, setSelectedAction] = useState<ActionId>("ckb.transfer");
  const [result, setResult] = useState<BuildActionResponse | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("action");
    if (requested && isActionId(requested)) {
      setSelectedAction(requested);
    }

    getActions()
      .then((response) => {
        setActions(response.actions.length ? response.actions : localActions);
        setRegistryError(null);
      })
      .catch((fetchError) => {
        setRegistryError(fetchError);
        setActions(localActions);
      });
  }, []);

  const current = useMemo(() => actionDetails[selectedAction], [selectedAction]);

  async function submit(payload: unknown) {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await buildSelectedAction(selectedAction, payload);
      setResult(response);
    } catch (submitError) {
      setError(submitError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 pb-24 sm:px-6 lg:px-8">
      <section className="grid gap-6 border-b border-white/10 pb-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-copper">Playground</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-extrabold tracking-normal text-white sm:text-5xl">Build reusable CKB action payloads.</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#D8C3AD]/75">
            Choose a transaction action, submit developer-friendly fields, and inspect the unsigned CKB JSON returned by the Rust API.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#18181B]/70 p-4 shadow-protocol">
          <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[#D8C3AD]/50">
            <span>Action lane</span>
            <span className="text-moss">testnet</span>
          </div>
          <div className="grid gap-2">
            {flowSteps.map((step, index) => (
              <FlowStep key={step.label} index={index + 1} label={step.label} copy={step.copy} active={index === 0 || (index === 1 && Boolean(result))} />
            ))}
          </div>
        </div>
      </section>

      {registryError ? <div><ApiError error={registryError} /></div> : null}

      <div className="grid gap-6 lg:grid-cols-[390px_minmax(0,1fr)]">
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-2xl border border-white/10 bg-[#18181B]/70 p-4 shadow-protocol">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-white">Actions</h2>
              <span className="rounded-full border border-moss/30 bg-moss/10 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-moss">registry</span>
            </div>
            <ActionSelector actions={actions} selectedAction={selectedAction} onSelect={(id) => isActionId(id) && setSelectedAction(id)} />
          </section>

          <section className="rounded-2xl border border-white/10 bg-[#18181B]/70 p-4 shadow-protocol">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-white">{current.name}</h2>
              <p className="mt-1 text-sm leading-6 text-[#D8C3AD]/65">{current.description}</p>
            </div>
            {renderForm(selectedAction, submit, loading)}
          </section>
        </aside>

        <section className="min-w-0 space-y-4">
          <ResultPanel result={result} error={error} loading={loading} />
        </section>
      </div>
    </div>
  );
}

function FlowStep({ index, label, copy, active }: { index: number; label: string; copy: string; active: boolean }) {
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

function renderForm(action: ActionId, onSubmit: (payload: unknown) => void, loading: boolean) {
  switch (action) {
    case "ckb.transfer":
      return <CkbTransferForm onSubmit={onSubmit} loading={loading} />;
    case "xudt.transfer":
      return <XudtTransferForm onSubmit={onSubmit} loading={loading} />;
    case "cell.consolidate":
      return <CellConsolidationForm onSubmit={onSubmit} loading={loading} />;
    case "capacity.lock":
      return <CapacityLockForm onSubmit={onSubmit} loading={loading} />;
    case "data_cell.create":
      return <DataCellCreateForm onSubmit={onSubmit} loading={loading} />;
  }
}

function buildSelectedAction(action: ActionId, payload: unknown) {
  switch (action) {
    case "ckb.transfer":
      return buildCkbTransfer(payload);
    case "xudt.transfer":
      return buildXudtTransfer(payload);
    case "cell.consolidate":
      return buildCellConsolidation(payload);
    case "capacity.lock":
      return buildCapacityLock(payload);
    case "data_cell.create":
      return buildDataCellCreate(payload);
  }
}

function isActionId(value: string): value is ActionId {
  return actionOrder.includes(value as ActionId);
}
