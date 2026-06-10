import { CopyButton } from "@/components/CopyButton";
import { API_BASE_URL } from "@/lib/api";
import { actionDetails, actionOrder } from "@/lib/examples";

const healthCurl = `curl ${API_BASE_URL}/health`;
const actionsCurl = `curl ${API_BASE_URL}/api/actions`;

export default function ApiReferencePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 border-b border-line pb-6">
        <p className="text-sm font-semibold uppercase text-copper">API Reference</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink">CellKit backend endpoints</h1>
        <p className="mt-3 text-sm leading-6 text-ink/68">Backend base URL: <code className="rounded-card bg-white px-2 py-1">{API_BASE_URL}</code></p>
      </div>

      <div className="grid gap-5">
        <Endpoint title="Health" method="GET" path="/health" curl={healthCurl} response={{ status: "ok", service: "cellkit-actions-api" }} />
        <Endpoint title="Action Registry" method="GET" path="/api/actions" curl={actionsCurl} response={{ actions: actionOrder.map((id) => ({ id, ...actionDetails[id] })).slice(0, 1) }} />

        {actionOrder.map((id) => {
          const action = actionDetails[id];
          const curl = `curl -X POST ${API_BASE_URL}${action.endpoint} \\\n  -H 'content-type: application/json' \\\n  -d '${JSON.stringify(action.sampleRequest, null, 2)}'`;
          return (
            <Endpoint
              key={id}
              title={action.name}
              method="POST"
              path={action.endpoint}
              curl={curl}
              request={action.sampleRequest}
              response={action.sampleResponse}
            />
          );
        })}

        <Endpoint
          title="Validate Transaction"
          method="POST"
          path="/api/actions/validate"
          curl={`curl -X POST ${API_BASE_URL}/api/actions/validate -H 'content-type: application/json' -d '{"network":"testnet","transaction":{}}'`}
          request={{ network: "testnet", transaction: { version: "0x0", cellDeps: [], headerDeps: [], inputs: [], outputs: [], outputsData: [], witnesses: [] } }}
          response={{ valid: false, errors: ["transaction.inputs must contain at least one input"], warnings: [] }}
        />

        <Endpoint
          title="Estimate Fee"
          method="POST"
          path="/api/actions/estimate-fee"
          curl={`curl -X POST ${API_BASE_URL}/api/actions/estimate-fee -H 'content-type: application/json' -d '{"network":"testnet","transaction":{},"feeRate":"1000"}'`}
          request={{ network: "testnet", transaction: { version: "0x0", cellDeps: [], headerDeps: [], inputs: [], outputs: [], outputsData: [], witnesses: [] }, feeRate: "1000" }}
          response={{ feeRate: "1000", estimatedSizeBytes: 94, estimatedFeeShannons: "94", estimatedFeeCkb: "0.00000094" }}
        />
      </div>
    </div>
  );
}

function Endpoint({ title, method, path, curl, request, response }: { title: string; method: string; path: string; curl: string; request?: unknown; response: unknown }) {
  return (
    <section className="rounded-card border border-line bg-white p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-ink">{title}</h2>
          <p className="mt-2 text-sm text-ink/65"><span className="font-semibold text-copper">{method}</span> <code>{path}</code></p>
        </div>
        <CopyButton label="Copy curl" value={curl} />
      </div>
      <pre className="code-scroll overflow-auto rounded-card bg-ink p-4 text-xs leading-5 text-paper">{curl}</pre>
      {request ? <JsonBlock title="Request" value={request} /> : null}
      <JsonBlock title="Response" value={response} />
    </section>
  );
}

function JsonBlock({ title, value }: { title: string; value: unknown }) {
  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        <CopyButton label="Copy JSON" value={value} />
      </div>
      <pre className="code-scroll max-h-80 overflow-auto rounded-card bg-paper p-4 text-xs leading-5 text-ink">{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
}
