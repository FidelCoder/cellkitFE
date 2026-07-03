"use client";

import { Moon } from "lucide-react";

export function ThemeToggle() {
  return (
    <button
      type="button"
      className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-[#18181B] text-[#D8C3AD]/65 transition hover:border-copper/40 hover:text-copper"
      aria-label="Protocol dark mode is active"
      title="Protocol dark mode"
    >
      <Moon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
