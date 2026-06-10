"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

type CopyButtonProps = {
  value: unknown;
  label?: string;
  className?: string;
};

export function CopyButton({ value, label = "Copy", className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = typeof value === "string" ? value : JSON.stringify(value, null, 2);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1300);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex h-9 items-center gap-2 rounded-card border border-line bg-paper px-3 text-sm font-medium text-ink hover:border-copper hover:text-copper ${className}`}
      title={label}
    >
      {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
      <span>{copied ? "Copied" : label}</span>
    </button>
  );
}
