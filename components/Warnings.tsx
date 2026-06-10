import { CircleAlert } from "lucide-react";

export function Warnings({ warnings }: { warnings?: string[] }) {
  if (!warnings?.length) {
    return null;
  }

  return (
    <section className="rounded-card border border-basin/35 bg-basin/10 p-4 text-sm">
      <div className="mb-2 flex items-center gap-2 font-semibold text-basin">
        <CircleAlert className="h-4 w-4" aria-hidden="true" />
        <span>Warnings</span>
      </div>
      <ul className="space-y-2 text-ink/80">
        {warnings.map((warning) => (
          <li key={warning}>{warning}</li>
        ))}
      </ul>
    </section>
  );
}
