import { CircleAlert } from "lucide-react";

export function Warnings({ warnings }: { warnings?: string[] }) {
  if (!warnings?.length) {
    return null;
  }

  return (
    <section className="rounded-xl border border-basin/35 bg-basin/10 p-4 text-sm">
      <div className="mb-2 flex items-center gap-2 font-semibold text-basin">
        <CircleAlert className="h-4 w-4" aria-hidden="true" />
        <span>Warnings</span>
      </div>
      <ul className="space-y-2 text-[#D8C3AD]/80">
        {warnings.map((warning) => (
          <li key={warning} className="rounded-xl border border-white/10 bg-black/25 px-3 py-2">{warning}</li>
        ))}
      </ul>
    </section>
  );
}
