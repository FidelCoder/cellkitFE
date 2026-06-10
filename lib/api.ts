import type { ActionsResponse, ApiErrorShape, BuildActionResponse, EstimateFeeResponse, ValidateResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export class ApiClientError extends Error {
  status?: number;
  body?: ApiErrorShape | unknown;

  constructor(message: string, status?: number, body?: ApiErrorShape | unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.body = body;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        "content-type": "application/json",
        ...(init?.headers || {})
      }
    });
  } catch (error) {
    throw new ApiClientError(
      "Cannot reach CellKit backend. Make sure the Rust API is running on NEXT_PUBLIC_API_URL.",
      undefined,
      error
    );
  }

  const text = await response.text();
  const body = text ? safeJson(text) : undefined;

  if (!response.ok) {
    const message = typeof body === "object" && body && "message" in body
      ? String((body as ApiErrorShape).message)
      : `CellKit backend returned ${response.status}`;
    throw new ApiClientError(message, response.status, body);
  }

  return body as T;
}

function safeJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return { error: "invalid_json", message: text };
  }
}

function post<T>(path: string, payload: unknown): Promise<T> {
  return request<T>(path, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function getActions() {
  return request<ActionsResponse>("/api/actions");
}

export function buildCkbTransfer(payload: unknown) {
  return post<BuildActionResponse>("/api/actions/ckb-transfer/build", payload);
}

export function buildXudtTransfer(payload: unknown) {
  return post<BuildActionResponse>("/api/actions/xudt-transfer/build", payload);
}

export function buildCellConsolidation(payload: unknown) {
  return post<BuildActionResponse>("/api/actions/cell-consolidation/build", payload);
}

export function buildCapacityLock(payload: unknown) {
  return post<BuildActionResponse>("/api/actions/capacity-lock/build", payload);
}

export function buildDataCellCreate(payload: unknown) {
  return post<BuildActionResponse>("/api/actions/data-cell-create/build", payload);
}

export function validateTransaction(payload: unknown) {
  return post<ValidateResponse>("/api/actions/validate", payload);
}

export function estimateFee(payload: unknown) {
  return post<EstimateFeeResponse>("/api/actions/estimate-fee", payload);
}

export { API_BASE_URL };
