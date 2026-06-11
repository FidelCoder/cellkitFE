import { AlertTriangle } from "lucide-react";
import { ApiClientError } from "@/lib/api";
import type { ApiErrorShape } from "@/lib/types";

type ApiErrorProps = {
  error: unknown;
};

export function ApiError({ error }: ApiErrorProps) {
  const shaped = normalizeError(error);
  const suggestion = getSuggestion(shaped.message || shaped.error);

  return (
    <section className="rounded-card border border-copper/40 bg-copper/10 p-4 text-sm text-ink">
      <div className="mb-2 flex items-center gap-2 font-semibold text-copper">
        <AlertTriangle className="h-4 w-4" aria-hidden="true" />
        <span>{shaped.error || "Backend error"}</span>
      </div>
      <p className="leading-6">{shaped.message || "The backend returned an unexpected error."}</p>
      {suggestion ? <p className="mt-3 leading-6 text-ink/75">{suggestion}</p> : null}
      {shaped.details ? (
        <pre className="code-scroll mt-3 max-h-48 overflow-auto rounded-card bg-ink p-3 text-xs text-paper">
          {JSON.stringify(shaped.details, null, 2)}
        </pre>
      ) : null}
    </section>
  );
}

function normalizeError(error: unknown): ApiErrorShape {
  if (error instanceof ApiClientError) {
    if (error.body && typeof error.body === "object") {
      const body = error.body as ApiErrorShape;
      return {
        error: body.error || "backend_error",
        message: body.message || error.message,
        details: body.details
      };
    }
    return { error: "backend_unreachable", message: error.message };
  }

  if (error && typeof error === "object" && "message" in error) {
    return { error: "error", message: String((error as { message: unknown }).message) };
  }

  return { error: "error", message: "Unexpected error" };
}

function getSuggestion(message: string) {
  if (message.includes("address network does not match requested network")) {
    return "This playground is testnet-only. Use ckt1 testnet addresses, not ckb1 mainnet addresses.";
  }
  if (message.includes("CKB indexer is not configured")) {
    return "Live cell selection requires the backend to be connected to a CKB indexer. Add CKB_INDEXER_URL in the backend .env file.";
  }
  if (message.includes("xUDT cell dep is not configured")) {
    return "The backend is missing xUDT script configuration for this network. Add TESTNET_XUDT_* variables.";
  }
  if (message.includes("Cannot reach CellKit backend")) {
    return "Start the Rust API and confirm NEXT_PUBLIC_API_URL points to it.";
  }
  return undefined;
}
