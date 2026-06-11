import { z } from "zod";

const positiveDecimal = (field: string) =>
  z.string().trim().min(1, `${field} is required`).refine((value) => Number(value) > 0, `${field} must be greater than 0`);

const positiveInteger = (field: string) =>
  z.string().trim().min(1, `${field} is required`).refine((value) => /^\d+$/.test(value) && Number(value) > 0, `${field} must be positive`);

const testnetAddress = (field: string) =>
  z
    .string()
    .trim()
    .min(1, `${field} is required`)
    .startsWith("ckt1", `${field} must be a CKB testnet address starting with ckt1`);
const network = z.literal("testnet");

export const ckbTransferSchema = z.object({
  network,
  fromAddress: testnetAddress("fromAddress"),
  toAddress: testnetAddress("toAddress"),
  amountCkb: positiveDecimal("amountCkb"),
  feeRate: positiveInteger("feeRate")
});

export const xudtTransferSchema = z.object({
  network,
  fromAddress: testnetAddress("fromAddress"),
  toAddress: testnetAddress("toAddress"),
  xudtTypeScript: z.object({
    codeHash: z.string().trim().startsWith("0x", "codeHash must start with 0x"),
    hashType: z.enum(["type", "data", "data1", "data2"]),
    args: z.string().trim().startsWith("0x", "args must start with 0x")
  }),
  amount: positiveInteger("amount"),
  feeRate: positiveInteger("feeRate")
});

export const cellConsolidationSchema = z.object({
  network,
  ownerAddress: testnetAddress("ownerAddress"),
  maxCells: z.coerce.number().int().min(1).max(100),
  feeRate: positiveInteger("feeRate")
});

export const capacityLockSchema = z.object({
  network,
  fromAddress: testnetAddress("fromAddress"),
  lockAddress: testnetAddress("lockAddress"),
  amountCkb: positiveDecimal("amountCkb"),
  memo: z.string().optional(),
  feeRate: positiveInteger("feeRate")
});

export const dataCellCreateSchema = z.object({
  network,
  fromAddress: testnetAddress("fromAddress"),
  data: z.object({
    encoding: z.enum(["utf8", "hex"]),
    content: z.string().trim().min(1, "content is required")
  }),
  capacityCkb: positiveDecimal("capacityCkb"),
  feeRate: positiveInteger("feeRate")
});

export type CkbTransferFormValues = z.infer<typeof ckbTransferSchema>;
export type XudtTransferFormValues = z.infer<typeof xudtTransferSchema>;
export type CellConsolidationFormValues = z.infer<typeof cellConsolidationSchema>;
export type CapacityLockFormValues = z.infer<typeof capacityLockSchema>;
export type DataCellCreateFormValues = z.infer<typeof dataCellCreateSchema>;
