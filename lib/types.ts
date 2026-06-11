export type ActionId = "ckb.transfer" | "xudt.transfer" | "cell.consolidate" | "capacity.lock" | "data_cell.create";

export type ActionItem = {
  id: ActionId | string;
  name: string;
  description: string;
  endpoint: string;
  status: string;
};

export type TransactionSkeleton = {
  version: string;
  cellDeps: unknown[];
  headerDeps: unknown[];
  inputs: unknown[];
  outputs: unknown[];
  outputsData: unknown[];
  witnesses: unknown[];
};

export type BuildActionResponse = {
  action: string;
  network: string;
  status: string;
  summary: Record<string, unknown>;
  transaction: TransactionSkeleton;
  signing: {
    required: boolean;
    signerAddress?: string;
    witnessPlaceholders?: unknown[];
  };
  warnings: string[];
  nextSteps: string[];
};

export type ApiErrorShape = {
  error: string;
  message?: string;
  details?: unknown;
};

export type ActionsResponse = {
  actions: ActionItem[];
};

export type ValidateResponse = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};

export type EstimateFeeResponse = {
  feeRate: string;
  estimatedSizeBytes: number;
  estimatedFeeShannons: string;
  estimatedFeeCkb: string;
};
export type ValidateSignedTransactionResponse = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};

export type DryRunTransactionResponse = {
  status: string;
  network: string;
  dryRun?: {
    cycles: string;
  };
  warnings?: string[];
  nextSteps?: string[];
};

export type BroadcastTransactionResponse = {
  status: string;
  network: string;
  txHash: string;
  dryRun?: {
    performed: boolean;
    cycles?: string;
  };
  explorerUrl?: string;
  nextSteps?: string[];
};
