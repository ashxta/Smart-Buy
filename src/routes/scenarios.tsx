import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";
import { FlaskConical, RotateCcw } from "lucide-react";
import { useMaterial } from "@/lib/material";
import { fmtINR, runScenario, type ScenarioInput } from "@/data/market";
import { Badge, Card, ChartTooltip, LoadingOverlay, PageHeader, RecoBadge } from "@/components/sb";

export const Route = createFileRoute("/scenarios")({
  head: () => ({
    meta: [
      { title: "Scenario Analysis — SmartBuy AI" },
      {
        name: "description",
        content:
          "Simulate external market shocks and observe potential impact on raw-material price forecasts. Prototype with demonstration data.",
      },
      { property: "og:title", content: "Scenario Analysis — SmartBuy AI" },
      { property: "og:description", content: "What if the market changes? Interactive shock simulation." },
    ],
  }),
  component: ScenariosPage,
});

const SLIDERS: { key: keyof ScenarioInput; label: string; min: number; max: number }[] = [
  { key: "crude", label: "Crude Oil", min: -20, max: 20 },
  { key: "fx", label: "USD/INR", min: -10, max: 10 },
  { key: "demand", label: "Demand", min: -20, max: 20 },
  { key: "freight", label: "Freight", min: -20, max: 20 },
];

function ScenariosPage() {
  const { material: m, switching } = useMaterial();
  const [input, setInput] = useState<ScenarioInput>({ crude: 0, fx: 0, demand: 0, freight: 0 });

  const result = useMemo(() => runScenario(m, input), [m, input]);
  const forecastStartMonth = m.series[23]!.month;
  const impact = result.impactPct;

  return (
    <div className="space-y-6">
      <LoadingOverlay show={switching} />
      <PageHeader
        title="What If the Market Changes?"
        subtitle="Simulate external market shocks and observe their potential impact."
        right={
          <button
            onClick={() => setInput({ crude: 0, fx: 0, demand: 0, freight: 0 })}
            className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-5">
        {/* Sliders */}
        <Card className="lg:col-span-2 animate-fade-up">
          <div className="mb-5 flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Market Shock Controls</h2>
          </div>
          <div className="space-y-6">
            {SLIDERS.map((s) => {
              const v = input[s.key];
              return (
                <div key={s.key}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>{s.label}</span>
                    <span
                      className={
                        "font-mono font-semibold " +
                        (v > 0 ? "text-warning" : v < 0 ? "text-positive" : "text-muted-foreground")
                      }
                    >
                      {v > 0 ? `+${v}` : v}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={s.min}
                    max={s.max}
                    step={1}
                    value={v}
                    onChange={(e) => setInput({ ...input, [s.key]: Number(e.target.value) })}
                    className="w-full"
                    aria-label={`${s.label} shock percent`}
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                    <span>{s.min}%</span>
                    <span>0</span>
                    <span>+{s.max}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Results */}
        <div className="space-y-4 lg:col-span-3">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Card className="animate-fade-up">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Base Forecast</p>
              <p className="mt-1 font-mono text-xl font-semibold">{fmtINR(m.forecast6m)}</p>
            </Card>
            <Card className="glow-border animate-fade-up">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Scenario Forecast</p>
              <p className="mt-1 font-mono text-xl font-semibold text-primary">{fmtINR(result.scenarioPrice)}</p>
            </Card>
            <Card className="animate-fade-up">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Impact</p>
              <p className={"mt-1 font-mono text-xl font-semibold " + (impact >= 0 ? "text-warning" : "text-positive")}>
                {impact >= 0 ? "+" : ""}{impact.toFixed(1)}%
              </p>
            </Card>
            <Card className="animate-fade-up">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Risk Level</p>
              <div className="mt-2">
                <Badge tone={result.risk === "HIGH" ? "warning" : result.risk === "MODERATE" ? "primary" : "positive"}>
                  {result.risk} RISK
                </Badge>
              </div>
            </Card>
          </div>

          <Card className="animate-fade-up">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-semibold">Base vs Scenario Forecast — {m.name}</h2>
              <RecoBadge value={result.recommendation} />
            </div>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={result.scenarioSeries} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.04 258 / 40%)" />
                  <XAxis dataKey="month" tick={{ fill: "oklch(0.65 0.03 250)", fontSize: 10 }} interval={2} stroke="oklch(0.3 0.04 258 / 60%)" />
                  <YAxis
                    domain={["dataMin - 8", "dataMax + 8"]}
                    tick={{ fill: "oklch(0.65 0.03 250)", fontSize: 10, fontFamily: "IBM Plex Mono" }}
                    stroke="oklch(0.3 0.04 258 / 60%)"
                    tickFormatter={(v: number) => `₹${v}`}
                    width={58}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="price" name="Historical" stroke="oklch(0.65 0.03 250)" strokeWidth={2} dot={false} connectNulls />
                  <Line type="monotone" dataKey="forecast" name="Base Forecast" stroke="oklch(0.78 0.14 205)" strokeWidth={2.5} strokeDasharray="6 4" dot={{ r: 3 }} connectNulls />
                  <Line type="monotone" dataKey="scenario" name="Scenario Forecast" stroke="oklch(0.8 0.15 80)" strokeWidth={2.5} dot={{ r: 3 }} connectNulls />
                  <ReferenceLine x={forecastStartMonth} stroke="oklch(0.3 0.04 258)" strokeDasharray="4 4" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 text-center text-xs italic text-muted-foreground">
              Scenario simulation — not a guaranteed market prediction.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
