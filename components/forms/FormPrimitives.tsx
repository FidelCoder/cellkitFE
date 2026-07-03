import type { ReactNode } from "react";

export function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-white">
      <span className="font-mono text-[11px] uppercase tracking-wider text-[#D8C3AD]/60">{label}</span>
      {children}
      {error ? <span className="text-xs font-normal text-copper">{error}</span> : null}
    </label>
  );
}

export const inputClass = "h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white outline-none transition placeholder:text-[#D8C3AD]/30 focus:border-copper/45 focus:ring-2 focus:ring-copper/10 disabled:cursor-not-allowed disabled:bg-black/20 disabled:text-[#D8C3AD]/40";
export const textareaClass = "min-h-24 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none transition placeholder:text-[#D8C3AD]/30 focus:border-copper/45 focus:ring-2 focus:ring-copper/10 disabled:cursor-not-allowed disabled:bg-black/20 disabled:text-[#D8C3AD]/40";
export const submitClass = "inline-flex min-h-10 items-center justify-center rounded-xl bg-copper px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#18181B] shadow-[0_0_30px_rgba(255,193,116,0.15)] transition hover:bg-copper/95 disabled:cursor-not-allowed disabled:opacity-60";
