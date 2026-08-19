/**
 * Local persistence for scans (browser only).
 * This deliberately mirrors a small repository interface so a real database
 * behind FastAPI can replace it without touching the UI.
 */

import type { ScanResult } from "@/types/scan";
import { seedHistory } from "./mockApi";

const KEY = "scamshield.scans.v1";
const SEED_KEY = "scamshield.seeded.v1";

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function read(): ScanResult[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ScanResult[]) : [];
  } catch {
    return [];
  }
}

function write(scans: ScanResult[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(scans.slice(0, 200)));
  } catch {
    /* storage full or blocked — history is non-critical */
  }
}

/** Seeds a set of clearly-labelled demo scans once, so the app is never empty-by-accident. */
export function ensureSeeded(): void {
  if (!isBrowser()) return;
  if (window.localStorage.getItem(SEED_KEY)) return;
  window.localStorage.setItem(SEED_KEY, "1");
  if (read().length === 0) write(seedHistory());
}

export function listScans(): ScanResult[] {
  ensureSeeded();
  return read().sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function getScan(id: string): ScanResult | undefined {
  ensureSeeded();
  return read().find((s) => s.scan_id === id);
}


export function saveScan(scan: ScanResult): void {
  write([scan, ...read().filter((s) => s.scan_id !== scan.scan_id)]);
}

export function deleteScan(id: string): void {
  write(read().filter((s) => s.scan_id !== id));
}

export function clearScans(): void {
  write([]);
}
