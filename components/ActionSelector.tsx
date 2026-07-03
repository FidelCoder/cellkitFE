"use client";

import type { ComponentType } from "react";
import { Boxes, Database, FileCode2, LockKeyhole, Send } from "lucide-react";
import type { ActionItem } from "@/lib/types";

const icons: Record<string, ComponentType<{ className?: string }>> = {
  "ckb.transfer": Send,
  "xudt.transfer": Boxes,
  "cell.consolidate": Database,
  "capacity.lock": LockKeyhole,
  "data_cell.create": FileCode2
};

type ActionSelectorProps = {
  actions: ActionItem[];
  selectedAction: string;
  onSelect: (actionId: string) => void;
};

export function ActionSelector({ actions, selectedAction, onSelect }: ActionSelectorProps) {
  return (
    <div className="grid gap-2">
      {actions.map((action) => {
        const Icon = icons[action.id] || FileCode2;
        const active = action.id === selectedAction;
        return (
          <button
            key={action.id}
            type="button"
            onClick={() => onSelect(action.id)}
            className={`flex min-h-16 items-start gap-3 rounded-xl border p-3 text-left transition ${
              active ? "border-copper/45 bg-copper/10 text-white" : "border-white/10 bg-black/25 text-white hover:border-copper/40 hover:bg-black/35"
            }`}
          >
            <Icon className={`mt-0.5 h-4 w-4 flex-none ${active ? "text-copper" : "text-[#D8C3AD]/55"}`} aria-hidden="true" />
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{action.name}</span>
              <span className={`mt-1 block text-xs leading-5 ${active ? "text-[#D8C3AD]/78" : "text-[#D8C3AD]/58"}`}>
                {action.description}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
