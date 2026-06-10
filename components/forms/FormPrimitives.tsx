import type { ReactNode } from "react";

export function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-ink">
      <span>{label}</span>
      {children}
      {error ? <span className="text-xs font-normal text-copper">{error}</span> : null}
    </label>
  );
}

export const inputClass = "h-10 w-full rounded-card border border-line bg-white px-3 text-sm text-ink outline-none focus:border-copper focus:ring-2 focus:ring-copper/15";
export const textareaClass = "min-h-24 w-full rounded-card border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-copper focus:ring-2 focus:ring-copper/15";
export const submitClass = "inline-flex h-10 items-center justify-center rounded-card bg-ink px-4 text-sm font-semibold text-paper hover:bg-copper disabled:cursor-not-allowed disabled:opacity-60";
