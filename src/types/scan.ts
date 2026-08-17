/**
 * Shared data models for ScamShield.
 * These mirror the expected FastAPI response contract so the mock layer
 * can be swapped for the real backend without touching UI components.
 */

export type RiskLevel = "SAFE" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type Severity = "info" | "low" | "medium" | "high" | "critical";

export type ScanInputType = "url" | "screenshot" | "qr" | "message";

export type EngineStatus = "complete" | "not_applicable" | "failed" | "unavailable";

export interface Indicator {
  title: string;
  severity: Severity;
  description: string;
  details?: string;
}

export interface TechnicalAnalysis {
  url_engine: EngineStatus;
  ocr_engine: EngineStatus;
  qr_engine: EngineStatus;
  nlp_engine: EngineStatus;
  threat_intel: EngineStatus;
  risk_engine: EngineStatus;
}

export interface UrlAnalysis {
  domain: string;
  protocol: string;
  url_length: number;
  subdomains: number;
  suspicious_params: number;
  https: boolean;
  domain_reputation: string | null;
  typosquatting: string | null;
}

export interface OcrAnalysis {
  extracted_text: string[];
  detected_patterns: string[];
}

export interface QrAnalysis {
  qr_type: "URL" | "UPI" | "TEXT";
  decoded_data: string;
  destination?: string;
  payee?: string;
  upi_id?: string;
  amount?: number;
  currency?: string;
}

export interface MessageAnalysis {
  urgency: "NONE" | "LOW" | "MEDIUM" | "HIGH";
  financial_request: "DETECTED" | "NOT_DETECTED";
  credential_request: "DETECTED" | "NOT_DETECTED";
  brand_impersonation: "POSSIBLE" | "NOT_DETECTED";
  suspicious_link: "DETECTED" | "NOT_DETECTED";
}

export interface ScanResult {
  scan_id: string;
  input_type: ScanInputType;
  target: string;
  created_at: string;
  risk_score: number;
  risk_level: RiskLevel;
  confidence: number;
  summary: string;
  demo: boolean;
  indicators: Indicator[];
  recommendations: string[];
  technical_analysis: TechnicalAnalysis;
  url_analysis?: UrlAnalysis;
  ocr_analysis?: OcrAnalysis;
  qr_analysis?: QrAnalysis;
  message_analysis?: MessageAnalysis;
}

export interface ScanHistoryEntry {
  scan_id: string;
  input_type: ScanInputType;
  target: string;
  created_at: string;
  risk_score: number;
  risk_level: RiskLevel;
  status: "Analyzed";
}

export interface ApiError {
  code:
    | "invalid_input"
    | "unsupported_file"
    | "file_too_large"
    | "qr_not_detected"
    | "ocr_failed"
    | "network"
    | "backend_unavailable"
    | "not_found";
  message: string;
}

export function riskLevelFromScore(score: number): RiskLevel {
  if (score <= 20) return "SAFE";
  if (score <= 40) return "LOW";
  if (score <= 60) return "MEDIUM";
  if (score <= 80) return "HIGH";
  return "CRITICAL";
}
