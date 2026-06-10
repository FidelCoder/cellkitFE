"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole } from "lucide-react";
import { useForm } from "react-hook-form";
import { Field, inputClass, submitClass, textareaClass } from "./FormPrimitives";
import { capacityLockSchema, type CapacityLockFormValues } from "@/lib/schemas";

export function CapacityLockForm({ onSubmit, loading }: { onSubmit: (values: CapacityLockFormValues) => void; loading: boolean }) {
  const { register, handleSubmit, formState: { errors } } = useForm<CapacityLockFormValues>({
    resolver: zodResolver(capacityLockSchema),
    defaultValues: { network: "testnet", fromAddress: "", lockAddress: "", amountCkb: "100", memo: "Grant milestone reserve", feeRate: "1000" }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <Field label="Network" error={errors.network?.message}>
        <select {...register("network")} className={inputClass}><option value="testnet">testnet</option></select>
      </Field>
      <Field label="From Address" error={errors.fromAddress?.message}>
        <input {...register("fromAddress")} className={inputClass} placeholder="ckt1..." />
      </Field>
      <Field label="Lock Address" error={errors.lockAddress?.message}>
        <input {...register("lockAddress")} className={inputClass} placeholder="ckt1..." />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Amount CKB" error={errors.amountCkb?.message}>
          <input {...register("amountCkb")} className={inputClass} inputMode="decimal" />
        </Field>
        <Field label="Fee Rate" error={errors.feeRate?.message}>
          <input {...register("feeRate")} className={inputClass} inputMode="numeric" />
        </Field>
      </div>
      <Field label="Memo" error={errors.memo?.message}>
        <textarea {...register("memo")} className={textareaClass} />
      </Field>
      <button type="submit" disabled={loading} className={submitClass}>
        <LockKeyhole className="mr-2 h-4 w-4" aria-hidden="true" />
        Build Capacity Lock
      </button>
    </form>
  );
}
