import type { ActionId } from "./types";

export const actionOrder: ActionId[] = [
  "ckb.transfer",
  "xudt.transfer",
  "cell.consolidate",
  "capacity.lock",
  "data_cell.create"
];

export const actionDetails: Record<ActionId, {
  name: string;
  description: string;
  endpoint: string;
  limitations: string[];
  requestSchema: Record<string, string>;
  sampleRequest: unknown;
  sampleResponse: unknown;
}> = {
  "ckb.transfer": {
    name: "CKB Transfer",
    description: "Build an unsigned CKB transfer transaction for testnet wallets and apps.",
    endpoint: "/api/actions/ckb-transfer/build",
    limitations: ["Requires live cells from a CKB indexer", "Unsigned payload only", "No broadcasting"],
    requestSchema: {
      network: "testnet",
      fromAddress: "CKB testnet address",
      toAddress: "CKB testnet address",
      amountCkb: "decimal string",
      feeRate: "positive integer string"
    },
    sampleRequest: {
      network: "testnet",
      fromAddress: "ckt1...",
      toAddress: "ckt1...",
      amountCkb: "100",
      feeRate: "1000"
    },
    sampleResponse: {
      action: "ckb.transfer",
      network: "testnet",
      status: "built",
      summary: { amountCkb: "100", amountShannons: "10000000000" },
      transaction: { version: "0x0", cellDeps: [], headerDeps: [], inputs: [], outputs: [], outputsData: [], witnesses: [] },
      signing: { required: true, signerAddress: "ckt1...", witnessPlaceholders: [] },
      warnings: [],
      nextSteps: ["Review transaction payload", "Sign with compatible CKB wallet", "Broadcast signed transaction"]
    }
  },
  "xudt.transfer": {
    name: "xUDT Transfer",
    description: "Build an unsigned xUDT transfer with token cells, capacity funding, and configured xUDT deps.",
    endpoint: "/api/actions/xudt-transfer/build",
    limitations: ["Requires TESTNET_XUDT_* backend config", "Requires indexer access", "No guessed script deps"],
    requestSchema: {
      network: "testnet",
      fromAddress: "CKB testnet address",
      toAddress: "CKB testnet address",
      xudtTypeScript: "codeHash/hashType/args",
      amount: "positive integer string",
      feeRate: "positive integer string"
    },
    sampleRequest: {
      network: "testnet",
      fromAddress: "ckt1...",
      toAddress: "ckt1...",
      xudtTypeScript: { codeHash: "0x...", hashType: "type", args: "0x..." },
      amount: "1000",
      feeRate: "1000"
    },
    sampleResponse: { error: "missing_config", message: "xUDT cell dep is not configured for this network." }
  },
  "cell.consolidate": {
    name: "Cell Consolidation",
    description: "Build an unsigned transaction that consolidates ordinary CKB cells back to one owner address.",
    endpoint: "/api/actions/cell-consolidation/build",
    limitations: ["Ordinary cells only", "Never consolidates unknown type scripts", "Requires indexer access"],
    requestSchema: { network: "testnet", ownerAddress: "CKB testnet address", maxCells: "1 to 100", feeRate: "positive integer string" },
    sampleRequest: { network: "testnet", ownerAddress: "ckt1...", maxCells: 20, feeRate: "1000" },
    sampleResponse: { action: "cell.consolidate", status: "built", warnings: ["No fragmented cells found"] }
  },
  "capacity.lock": {
    name: "Capacity Lock",
    description: "Build an unsigned transfer that funds a target lock address with optional memo metadata.",
    endpoint: "/api/actions/capacity-lock/build",
    limitations: ["Not a custom lock script", "Memo is metadata unless future data-cell support stores it", "Requires indexer access"],
    requestSchema: { network: "testnet", fromAddress: "CKB testnet address", lockAddress: "CKB testnet address", amountCkb: "decimal string", memo: "optional string", feeRate: "positive integer string" },
    sampleRequest: { network: "testnet", fromAddress: "ckt1...", lockAddress: "ckt1...", amountCkb: "100", memo: "Grant milestone reserve", feeRate: "1000" },
    sampleResponse: { action: "capacity.lock", status: "built", summary: { memo: "Grant milestone reserve" } }
  },
  "data_cell.create": {
    name: "Data Cell Create",
    description: "Build an unsigned transaction that creates an ordinary CKB data cell.",
    endpoint: "/api/actions/data-cell-create/build",
    limitations: ["Supports utf8 and hex content", "Requires enough occupied capacity", "Requires indexer access"],
    requestSchema: { network: "testnet", fromAddress: "CKB testnet address", data: "encoding/content", capacityCkb: "decimal string", feeRate: "positive integer string" },
    sampleRequest: { network: "testnet", fromAddress: "ckt1...", data: { encoding: "utf8", content: "Hello CKB" }, capacityCkb: "100", feeRate: "1000" },
    sampleResponse: { action: "data_cell.create", status: "built", summary: { dataHex: "0x48656c6c6f20434b42" } }
  }
};
