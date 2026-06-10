"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileCode2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Field, inputClass, submitClass, textareaClass } from "./FormPrimitives";
import { dataCellCreateSchema, type DataCellCreateFormValues } from "@/lib/schemas";

export function DataCellCreateForm({ onSubmit, loading }: { onSubmit: (values: DataCellCreateFormValues) => void; loading: boolean }) {
  const { register, handleSubmit, formState: { errors } } = useForm<DataCellCreateFormValues>({
    resolver: zodResolver(dataCellCreateSchema),
    defaultValues: {
      network: "testnet",
      fromAddress: "",
      data: { encoding: "utf8", content: "Hello CKB" },
      capacityCkb: "100",
      feeRate: "1000"
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <Field label="Network" error={errors.network?.message}>
        <select {...register("network")} className={inputClass}><option value="testnet">testnet</option></select>
      </Field>
      <Field label="From Address" error={errors.fromAddress?.message}>
        <input {...register("fromAddress")} className={inputClass} placeholder="ckt1..." />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Encoding" error={errors.data?.encoding?.message}>
          <select {...register("data.encoding")} className={inputClass}>
            <option value="utf8">utf8</option>
            <option value="hex">hex</option>
          </select>
        </Field>
        <Field label="Capacity CKB" error={errors.capacityCkb?.message}>
          <input {...register("capacityCkb")} className={inputClass} inputMode="decimal" />
        </Field>
      </div>
      <Field label="Content" error={errors.data?.content?.message}>
        <textarea {...register("data.content")} className={textareaClass} />
      </Field>
      <Field label="Fee Rate" error={errors.feeRate?.message}>
        <input {...register("feeRate")} className={inputClass} inputMode="numeric" />
      </Field>
      <button type="submit" disabled={loading} className={submitClass}>
        <FileCode2 className="mr-2 h-4 w-4" aria-hidden="true" />
        Build Data Cell
      </button>
    </form>
  );
}
