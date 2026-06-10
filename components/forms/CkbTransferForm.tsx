"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { Field, inputClass, submitClass } from "./FormPrimitives";
import { ckbTransferSchema, type CkbTransferFormValues } from "@/lib/schemas";

export function CkbTransferForm({ onSubmit, loading }: { onSubmit: (values: CkbTransferFormValues) => void; loading: boolean }) {
  const { register, handleSubmit, formState: { errors } } = useForm<CkbTransferFormValues>({
    resolver: zodResolver(ckbTransferSchema),
    defaultValues: { network: "testnet", fromAddress: "", toAddress: "", amountCkb: "100", feeRate: "1000" }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <Field label="Network" error={errors.network?.message}>
        <select {...register("network")} className={inputClass}>
          <option value="testnet">testnet</option>
        </select>
      </Field>
      <Field label="From Address" error={errors.fromAddress?.message}>
        <input {...register("fromAddress")} className={inputClass} placeholder="ckt1..." />
      </Field>
      <Field label="To Address" error={errors.toAddress?.message}>
        <input {...register("toAddress")} className={inputClass} placeholder="ckt1..." />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Amount CKB" error={errors.amountCkb?.message}>
          <input {...register("amountCkb")} className={inputClass} inputMode="decimal" />
        </Field>
        <Field label="Fee Rate" error={errors.feeRate?.message}>
          <input {...register("feeRate")} className={inputClass} inputMode="numeric" />
        </Field>
      </div>
      <button type="submit" disabled={loading} className={submitClass}>
        <Send className="mr-2 h-4 w-4" aria-hidden="true" />
        Build Transfer
      </button>
    </form>
  );
}
