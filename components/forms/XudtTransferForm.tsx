"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Boxes } from "lucide-react";
import { useForm } from "react-hook-form";
import { Field, inputClass, submitClass } from "./FormPrimitives";
import { type XudtTransferFormValues, xudtTransferSchema } from "@/lib/schemas";

export function XudtTransferForm({ onSubmit, loading }: { onSubmit: (values: XudtTransferFormValues) => void; loading: boolean }) {
  const { register, handleSubmit, formState: { errors } } = useForm<XudtTransferFormValues>({
    resolver: zodResolver(xudtTransferSchema),
    defaultValues: {
      network: "testnet",
      fromAddress: "",
      toAddress: "",
      xudtTypeScript: { codeHash: "0x", hashType: "type", args: "0x" },
      amount: "1000",
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
      <Field label="To Address" error={errors.toAddress?.message}>
        <input {...register("toAddress")} className={inputClass} placeholder="ckt1..." />
      </Field>
      <Field label="xUDT Code Hash" error={errors.xudtTypeScript?.codeHash?.message}>
        <input {...register("xudtTypeScript.codeHash")} className={inputClass} placeholder="0x..." />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Hash Type" error={errors.xudtTypeScript?.hashType?.message}>
          <select {...register("xudtTypeScript.hashType")} className={inputClass}>
            <option value="type">type</option>
            <option value="data">data</option>
            <option value="data1">data1</option>
            <option value="data2">data2</option>
          </select>
        </Field>
        <Field label="Args" error={errors.xudtTypeScript?.args?.message}>
          <input {...register("xudtTypeScript.args")} className={inputClass} placeholder="0x..." />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Token Amount" error={errors.amount?.message}>
          <input {...register("amount")} className={inputClass} inputMode="numeric" />
        </Field>
        <Field label="Fee Rate" error={errors.feeRate?.message}>
          <input {...register("feeRate")} className={inputClass} inputMode="numeric" />
        </Field>
      </div>
      <button type="submit" disabled={loading} className={submitClass}>
        <Boxes className="mr-2 h-4 w-4" aria-hidden="true" />
        Build xUDT Transfer
      </button>
    </form>
  );
}
