// ============================================================
// SmartBuy AI — PROTOTYPE / DEMONSTRATION DATA ONLY
// All values below are simulated for a competition demo.
// They are NOT real ACG figures and NOT real market predictions.
// ============================================================

export type MaterialId = "aluminium" | "pvc";

export type Recommendation = "BUY NOW" | "PARTIAL BUY" | "WATCH";

export interface PricePoint {
  month: string;
  price: number | null;
  forecast: number | null;
  upper: number | null;
  lower: number | null;
}

export interface DriverImportance {
  name: string;
  weight: number; // percent
}

export interface MarketSignal {
  name: string;
  change: string;
  direction: "up" | "down" | "flat";
  impact: "HIGH" | "MEDIUM" | "LOW";
}

export interface MaterialData {
  id: MaterialId;
  name: string;
  unit: string;
  currentPrice: number;
  forecast6m: number;
  movementPct: number;
  confidence: number;
  recommendation: Recommendation;
  inventoryCoverDays: number;
  supplierLeadTimeDays: number;
  recommendationReason: string;
  series: PricePoint[]; // 24 historical + 6 forecast; forecast points bridge at index 23
  forecastCards: { label: string; price: number; change: string }[];
  trend: "Bullish" | "Stable" | "Bearish";
  volatility: "Low" | "Moderate" | "High";
  drivers: DriverImportance[];
  signals: MarketSignal[];
  explanation: string;
  baseline: { mape: number; mae: number; rmse: number; dirAcc: number };
  model: { mape: number; mae: number; rmse: number; dirAcc: number };
  actualVsPredicted: { month: string; actual: number; predicted: number }[];
}

const MONTHS = [
  "Sep '24", "Oct '24", "Nov '24", "Dec '24", "Jan '25", "Feb '25",
  "Mar '25", "Apr '25", "May '25", "Jun '25", "Jul '25", "Aug '25",
  "Sep '25", "Oct '25", "Nov '25", "Dec '25", "Jan '26", "Feb '26",
  "Mar '26", "Apr '26", "May '26", "Jun '26", "Jul '26", "Aug '26",
];
const FUTURE = ["Sep '26", "Oct '26", "Nov '26", "Dec '26", "Jan '27", "Feb '27"];

function buildSeries(
  history: number[],
  forecast: number[],
  bandPct: number[]
): PricePoint[] {
  const pts: PricePoint[] = history.map((p, i) => ({
    month: MONTHS[i]!,
    price: p,
    forecast: null,
    upper: null,
    lower: null,
  }));
  // bridge point so the forecast line connects to history
  const last = pts[pts.length - 1]!;
  const lastPrice = history[history.length - 1]!;
  pts[pts.length - 1] = { ...last, forecast: lastPrice, upper: lastPrice, lower: lastPrice };
  forecast.forEach((f, i) => {
    const band = bandPct[i]!;
    pts.push({
      month: FUTURE[i]!,
      price: null,
      forecast: f,
      upper: Math.round(f * (1 + band) * 10) / 10,
      lower: Math.round(f * (1 - band) * 10) / 10,
    });
  });
  return pts;
}

export const MATERIALS: Record<MaterialId, MaterialData> = {
  aluminium: {
    id: "aluminium",
    name: "Aluminium",
    unit: "kg",
    currentPrice: 247,
    forecast6m: 268,
    movementPct: 8.5,
    confidence: 84,
    recommendation: "BUY NOW",
    inventoryCoverDays: 18,
    supplierLeadTimeDays: 30,
    recommendationReason:
      "Forecast indicates upward price pressure while current inventory cover is below supplier lead time. Consider locking part of the near-term requirement.",
    series: buildSeries(
      [232, 228, 235, 241, 238, 244, 239, 246, 251, 243, 249, 255, 248, 242, 250, 257, 252, 245, 251, 258, 253, 249, 244, 247],
      [252, 256, 260, 263, 266, 268],
      [0.02, 0.025, 0.032, 0.04, 0.048, 0.055]
    ),
    forecastCards: [
      { label: "Next Month", price: 252, change: "+2.1%" },
      { label: "3 Months", price: 260, change: "+5.3%" },
      { label: "6 Months", price: 268, change: "+8.5%" },
    ],
    trend: "Bullish",
    volatility: "Moderate",
    drivers: [
      { name: "Historical Price Trend", weight: 42 },
      { name: "Crude Oil / Energy", weight: 24 },
      { name: "Industrial Demand", weight: 15 },
      { name: "USD / INR", weight: 11 },
      { name: "Freight & Logistics", weight: 8 },
    ],
    signals: [
      { name: "Crude Oil", change: "+6.2%", direction: "up", impact: "HIGH" },
      { name: "USD/INR", change: "+2.1%", direction: "up", impact: "MEDIUM" },
      { name: "Industrial Demand", change: "+3.8%", direction: "up", impact: "HIGH" },
      { name: "Freight", change: "Stable", direction: "flat", impact: "LOW" },
    ],
    explanation:
      "Aluminium prices are expected to rise primarily because the historical trend remains positive and energy-related pressure is increasing. Currency movement adds additional upward pressure.",
    baseline: { mape: 8.4, mae: 18.2, rmse: 23.7, dirAcc: 54 },
    model: { mape: 5.7, mae: 12.6, rmse: 17.4, dirAcc: 71 },
    actualVsPredicted: [
      { month: "Mar '26", actual: 251, predicted: 254 },
      { month: "Apr '26", actual: 258, predicted: 255 },
      { month: "May '26", actual: 253, predicted: 250 },
      { month: "Jun '26", actual: 249, predicted: 246 },
      { month: "Jul '26", actual: 244, predicted: 242 },
      { month: "Aug '26", actual: 247, predicted: 249 },
    ],
  },
  pvc: {
    id: "pvc",
    name: "PVC Resin",
    unit: "kg",
    currentPrice: 96,
    forecast6m: 101,
    movementPct: 5.2,
    confidence: 78,
    recommendation: "PARTIAL BUY",
    inventoryCoverDays: 24,
    supplierLeadTimeDays: 21,
    recommendationReason:
      "Moderate upward trend with adequate near-term cover. Locking a partial quantity balances price risk against working-capital efficiency.",
    series: buildSeries(
      [102, 99, 97, 100, 103, 98, 95, 97, 101, 99, 94, 96, 92, 94, 97, 95, 93, 96, 98, 95, 93, 97, 94, 96],
      [97, 98, 99, 100, 100, 101],
      [0.018, 0.024, 0.03, 0.038, 0.045, 0.052]
    ),
    forecastCards: [
      { label: "Next Month", price: 97, change: "+1.0%" },
      { label: "3 Months", price: 99, change: "+3.1%" },
      { label: "6 Months", price: 101, change: "+5.2%" },
    ],
    trend: "Stable",
    volatility: "Low",
    drivers: [
      { name: "Historical Price Trend", weight: 38 },
      { name: "Crude Oil / Energy", weight: 27 },
      { name: "Industrial Demand", weight: 14 },
      { name: "USD / INR", weight: 12 },
      { name: "Freight & Logistics", weight: 9 },
    ],
    signals: [
      { name: "Crude Oil", change: "+6.2%", direction: "up", impact: "HIGH" },
      { name: "USD/INR", change: "+2.1%", direction: "up", impact: "MEDIUM" },
      { name: "Industrial Demand", change: "+1.4%", direction: "up", impact: "MEDIUM" },
      { name: "Freight", change: "Stable", direction: "flat", impact: "LOW" },
    ],
    explanation:
      "PVC Resin prices show a mild upward drift driven mainly by energy-cost pass-through from crude oil. Demand signals are stable, keeping the overall trend moderate.",
    baseline: { mape: 7.9, mae: 7.8, rmse: 10.4, dirAcc: 56 },
    model: { mape: 5.1, mae: 5.2, rmse: 7.1, dirAcc: 68 },
    actualVsPredicted: [
      { month: "Mar '26", actual: 98, predicted: 96 },
      { month: "Apr '26", actual: 95, predicted: 94 },
      { month: "May '26", actual: 93, predicted: 95 },
      { month: "Jun '26", actual: 97, predicted: 96 },
      { month: "Jul '26", actual: 94, predicted: 93 },
      { month: "Aug '26", actual: 96, predicted: 97 },
    ],
  },
};

// ---- Scenario simulation (purely illustrative math) ----
export interface ScenarioInput {
  crude: number; // -20..+20 %
  fx: number; // -10..+10 %
  demand: number; // -20..+20 %
  freight: number; // -20..+20 %
}

export function runScenario(base: MaterialData, s: ScenarioInput) {
  const impactPct =
    s.crude * 0.3 + s.fx * 0.2 + s.demand * 0.25 + s.freight * 0.1; // weighted %
  const scenarioPrice = Math.round(base.forecast6m * (1 + impactPct / 100));
  const abs = Math.abs(impactPct);
  const risk: "LOW" | "MODERATE" | "HIGH" = abs < 2 ? "LOW" : abs < 5 ? "MODERATE" : "HIGH";
  const recommendation: Recommendation =
    impactPct >= 3 ? "BUY NOW" : impactPct >= 0.5 ? "PARTIAL BUY" : "WATCH";
  // scale each forecast point by the scenario delta
  const scenarioSeries = base.series.map((p) => ({
    ...p,
    scenario: p.forecast == null ? null : Math.round(p.forecast * (1 + impactPct / 100) * 10) / 10,
  }));
  return { impactPct, scenarioPrice, risk, recommendation, scenarioSeries };
}

// ---- Procurement calculations ----
export interface ProcurementInput {
  requiredQty: number;
  currentInventory: number;
  monthlyConsumption: number;
  leadTimeDays: number;
  currentPrice: number;
  forecastPrice: number;
}

export function calcProcurement(i: ProcurementInput) {
  const coverDays = Math.round((i.currentInventory / i.monthlyConsumption) * 30);
  const exposure = Math.max(0, Math.round((i.forecastPrice - i.currentPrice) * i.requiredQty));
  const movementPct = ((i.forecastPrice - i.currentPrice) / i.currentPrice) * 100;
  const recommendation: Recommendation =
    movementPct >= 5 && coverDays < i.leadTimeDays
      ? "BUY NOW"
      : movementPct >= 2
        ? "PARTIAL BUY"
        : "WATCH";
  const suggestedAction =
    recommendation === "BUY NOW"
      ? "Lock the full near-term requirement now and schedule staggered deliveries within the supplier lead time."
      : recommendation === "PARTIAL BUY"
        ? "Lock 60% of near-term requirement and review remaining quantity after the next market update."
        : "Defer purchase and continue monitoring market signals. Re-evaluate at the next forecast cycle.";
  return { coverDays, exposure, movementPct, recommendation, suggestedAction };
}

export const fmtINR = (n: number) => "₹" + n.toLocaleString("en-IN");
