"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Database } from "lucide-react";
import { useForm } from "react-hook-form";
import { Field, inputClass, submitClass } from "./FormPrimitives";
import { cellConsolidationSchema, type CellConsolidationFormValues } from "@/lib/schemas";

export function CellConsolidationForm({ onSubmit, loading }: { onSubmit: (values: CellConsolidationFormValues) => void; loading: boolean }) {
  const { register, handleSubmit, formState: { errors } } = useForm<CellConsolidationFormValues>({
    resolver: zodResolver(cellConsolidationSchema),
    defaultValues: { network: "testnet", ownerAddress: "", maxCells: 20, feeRate: "1000" }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <Field label="Network" error={errors.network?.message}>
        <select {...register("network")} className={inputClass}><option value="testnet">testnet</option></select>
      </Field>
      <Field label="Owner Address" error={errors.ownerAddress?.message}>
        <input {...register("ownerAddress")} className={inputClass} placeholder="ckt1..." />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Max Cells" error={errors.maxCells?.message}>
          <input {...register("maxCells", { valueAsNumber: true })} className={inputClass} min={1} max={100} type="number" />
        </Field>
        <Field label="Fee Rate" error={errors.feeRate?.message}>
          <input {...register("feeRate")} className={inputClass} inputMode="numeric" />
        </Field>
      </div>
      <button type="submit" disabled={loading} className={submitClass}>
        <Database className="mr-2 h-4 w-4" aria-hidden="true" />
        Build Consolidation
      </button>
    </form>
  );
}
