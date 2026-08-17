/**
 * ScamShield API service layer.
 *
 * This is the single boundary between the UI and the detection backend.
 * Today it resolves against the local mock engine (`mockApi.ts`).
 * To connect the real Python/FastAPI backend, set VITE_API_BASE_URL and the
 * `USE_BACKEND` branch below will POST to:
 *
 *   POST /api/scan/url        { url }
 *   POST /api/scan/message    { message }
 *   POST /api/scan/qr         multipart file
 *   POST /api/scan/screenshot multipart file
 *   GET  /api/scan/:id
 *   GET  /api/history
 *   DELETE /api/history/:id
 *
 * No ML logic lives in the frontend.
 */

import type { ApiError, ScanHistoryEntry, ScanResult } from "@/types/scan";
import {
  analyzeMessageMock,
  analyzeQrMock,
  analyzeScreenshotMock,
  analyzeUrlMock,
} from "./mockApi";
import { deleteScan, getScan, listScans, saveScan, clearScans } from "./scanStore";

const API_BASE_URL = (import.meta.env["VITE_API_BASE_URL"] as string | undefined) ?? "";
export const USE_BACKEND = Boolean(API_BASE_URL);
export const MAX_FILE_BYTES = 8 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

export class ScamShieldError extends Error {
  code: ApiError["code"];
  constructor(code: ApiError["code"], message: string) {
    super(message);
    this.code = code;
    this.name = "ScamShieldError";
  }
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function backend<T>(path: string, init?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, init);
    if (!res.ok) {
      throw new ScamShieldError(
        res.status === 404 ? "not_found" : "backend_unavailable",
        "The analysis service could not complete this request. Please try again.",
      );
    }
    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof ScamShieldError) throw err;
    throw new ScamShieldError("network", "We couldn't reach the analysis service. Check your connection.");
  }
}

export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) throw new ScamShieldError("invalid_input", "Please enter a website address.");
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  let parsed: URL;
  try {
    parsed = new URL(withScheme);
  } catch {
    throw new ScamShieldError("invalid_input", "That doesn't look like a valid website address.");
  }
  if (!parsed.hostname.includes(".") || /\s/.test(parsed.hostname)) {
    throw new ScamShieldError("invalid_input", "Enter a full address, for example example.com");
  }
  return parsed.toString();
}

export function validateImageFile(file: File) {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new ScamShieldError("unsupported_file", "Only PNG, JPG, JPEG and WEBP images are supported.");
  }
  if (file.size > MAX_FILE_BYTES) {
    throw new ScamShieldError("file_too_large", "That file is larger than 8 MB. Please upload a smaller image.");
  }
}

/* ------------------------------- Scan calls ------------------------------- */

export async function analyzeUrl(url: string): Promise<ScanResult> {
  const normalized = normalizeUrl(url);
  if (USE_BACKEND) {
    const result = await backend<ScanResult>("/api/scan/url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: normalized }),
    });
    saveScan(result);
    return result;
  }
  await delay(900);
  const result = analyzeUrlMock(normalized);
  saveScan(result);
  return result;
}

export async function analyzeMessage(message: string): Promise<ScanResult> {
  const text = message.trim();
  if (text.length < 8) {
    throw new ScamShieldError("invalid_input", "Paste a bit more of the message so it can be analyzed.");
  }
  if (text.length > 5000) {
    throw new ScamShieldError("invalid_input", "Messages are limited to 5000 characters.");
  }
  if (USE_BACKEND) {
    const result = await backend<ScanResult>("/api/scan/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    saveScan(result);
    return result;
  }
  await delay(900);
  const result = analyzeMessageMock(text);
  saveScan(result);
  return result;
}

export async function analyzeScreenshot(file: File): Promise<ScanResult> {
  validateImageFile(file);
  if (USE_BACKEND) {
    const body = new FormData();
    body.append("file", file);
    const result = await backend<ScanResult>("/api/scan/screenshot", { method: "POST", body });
    saveScan(result);
    return result;
  }
  await delay(1100);
  const result = analyzeScreenshotMock(file.name);
  saveScan(result);
  return result;
}

export async function analyzeQr(file: File): Promise<ScanResult> {
  validateImageFile(file);
  if (USE_BACKEND) {
    const body = new FormData();
    body.append("file", file);
    const result = await backend<ScanResult>("/api/scan/qr", { method: "POST", body });
    saveScan(result);
    return result;
  }
  await delay(1000);
  const result = analyzeQrMock(file.name);
  saveScan(result);
  return result;
}

/* ------------------------------- Retrieval -------------------------------- */

export async function getScanResult(id: string): Promise<ScanResult> {
  if (USE_BACKEND) return backend<ScanResult>(`/api/scan/${encodeURIComponent(id)}`);
  const found = getScan(id);
  if (!found) throw new ScamShieldError("not_found", "This scan result is no longer available.");
  return found;
}

export async function getScanHistory(): Promise<ScanHistoryEntry[]> {
  if (USE_BACKEND) return backend<ScanHistoryEntry[]>("/api/history");
  return listScans().map((s) => ({
    scan_id: s.scan_id,
    input_type: s.input_type,
    target: s.target,
    created_at: s.created_at,
    risk_score: s.risk_score,
    risk_level: s.risk_level,
    status: "Analyzed" as const,
  }));
}

export async function deleteScanHistory(id: string): Promise<void> {
  if (USE_BACKEND) {
    await backend<unknown>(`/api/history/${encodeURIComponent(id)}`, { method: "DELETE" });
    return;
  }
  deleteScan(id);
}

export async function clearScanHistory(): Promise<void> {
  if (USE_BACKEND) {
    await backend<unknown>("/api/history", { method: "DELETE" });
    return;
  }
  clearScans();
}

export function getAllScans(): ScanResult[] {
  return listScans();
}
