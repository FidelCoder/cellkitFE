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

export const inputClass = "h-10 w-full rounded-card border border-line bg-surface px-3 text-sm text-ink shadow-sm shadow-ink/5 outline-none transition placeholder:text-ink/35 focus:border-copper focus:ring-2 focus:ring-copper/15 disabled:cursor-not-allowed disabled:bg-paper/70 disabled:text-ink/45";
export const textareaClass = "min-h-24 w-full rounded-card border border-line bg-surface px-3 py-2 text-sm text-ink shadow-sm shadow-ink/5 outline-none transition placeholder:text-ink/35 focus:border-copper focus:ring-2 focus:ring-copper/15 disabled:cursor-not-allowed disabled:bg-paper/70 disabled:text-ink/45";
export const submitClass = "inline-flex min-h-10 items-center justify-center rounded-card bg-ink px-4 py-2 text-sm font-semibold text-paper shadow-sm shadow-ink/10 transition hover:bg-copper disabled:cursor-not-allowed disabled:opacity-60";
