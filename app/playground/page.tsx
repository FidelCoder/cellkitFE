"use client";

import { useEffect, useMemo, useState } from "react";
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-copper">Playground</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">Build reusable CKB action payloads</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-ink/68">
            Choose an MVP action, submit developer-friendly fields, and inspect the unsigned payload or backend error returned by the Rust API.
          </p>
        </div>
        <div className="flex w-fit items-center gap-2 rounded-card border border-moss/30 bg-moss/10 px-3 py-2 text-xs font-semibold uppercase text-moss">
          testnet registry
        </div>
      </div>

      {registryError ? <div className="mb-6"><ApiError error={registryError} /></div> : null}

      <div className="grid gap-6 lg:grid-cols-[390px_minmax(0,1fr)]">
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-card border border-line bg-surface p-4 shadow-sm shadow-ink/5">
            <h2 className="mb-3 text-sm font-semibold text-ink">Actions</h2>
            <ActionSelector actions={actions} selectedAction={selectedAction} onSelect={(id) => isActionId(id) && setSelectedAction(id)} />
          </section>

          <section className="rounded-card border border-line bg-surface p-4 shadow-sm shadow-ink/5">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-ink">{current.name}</h2>
              <p className="mt-1 text-sm leading-6 text-ink/65">{current.description}</p>
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
