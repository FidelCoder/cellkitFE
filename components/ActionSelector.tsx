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
            className={`flex min-h-16 items-start gap-3 rounded-card border p-3 text-left transition ${
              active ? "border-ink bg-ink text-paper" : "border-line bg-white text-ink hover:border-copper"
            }`}
          >
            <Icon className={`mt-0.5 h-4 w-4 flex-none ${active ? "text-paper" : "text-copper"}`} aria-hidden="true" />
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{action.name}</span>
              <span className={`mt-1 block text-xs leading-5 ${active ? "text-paper/72" : "text-ink/62"}`}>
                {action.description}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
