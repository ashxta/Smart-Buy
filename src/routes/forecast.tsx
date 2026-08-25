import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";
import { useMaterial } from "@/lib/material";
import { fmtINR, type MaterialId } from "@/data/market";
import { Badge, Card, ChartTooltip, LoadingOverlay, PageHeader } from "@/components/sb";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/forecast")({
  head: () => ({
    meta: [
      { title: "AI Price Forecast — SmartBuy AI" },
      {
        name: "description",
        content:
          "6-month forward price outlook for Aluminium and PVC Resin with confidence bounds. Prototype with demonstration data.",
      },
      { property: "og:title", content: "AI Price Forecast — SmartBuy AI" },
      { property: "og:description", content: "6-month forward outlook based on historical and market-driver signals." },
    ],
  }),
  component: ForecastPage,
});

const TABS: { id: MaterialId; label: string }[] = [
  { id: "aluminium", label: "Aluminium" },
  { id: "pvc", label: "PVC Resin" },
];

function ForecastPage() {
  const { material: m, materialId, setMaterial, switching } = useMaterial();
  const [horizon, setHorizon] = useState<1 | 3 | 6>(6);
  const forecastStartMonth = m.series[23]!.month;

  // trim chart to selected forecast horizon
  const data = [...m.series.slice(0, 24), ...m.series.slice(24, 24 + horizon)];

  return (
    <div className="space-y-6">
      <LoadingOverlay show={switching} />
      <PageHeader
        title="AI Price Forecast"
        subtitle="6-month forward outlook based on historical and market-driver signals."
        right={
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-border bg-card p-0.5">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setMaterial(t.id)}
                  className={cn(
                    "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
                    materialId === t.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="flex rounded-lg border border-border bg-card p-0.5">
              {([1, 3, 6] as const).map((h) => (
                <button
                  key={h}
                  onClick={() => setHorizon(h)}
                  className={cn(
                    "rounded-md px-3 py-1.5 font-mono text-sm font-medium transition-colors",
                    horizon === h
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {h}M
                </button>
              ))}
            </div>
          </div>
        }
      />

      <Card className="animate-fade-up">
        <div className="h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="fband" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.78 0.14 205)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="oklch(0.78 0.14 205)" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.04 258 / 40%)" />
              <XAxis
                dataKey="month"
                tick={{ fill: "oklch(0.65 0.03 250)", fontSize: 10 }}
                interval={2}
                stroke="oklch(0.3 0.04 258 / 60%)"
              />
              <YAxis
                domain={["dataMin - 10", "dataMax + 10"]}
                tick={{ fill: "oklch(0.65 0.03 250)", fontSize: 10, fontFamily: "IBM Plex Mono" }}
                stroke="oklch(0.3 0.04 258 / 60%)"
                tickFormatter={(v: number) => `₹${v}`}
                width={58}
              />
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="upper" name="Upper Confidence Bound" stroke="none" fill="url(#fband)" connectNulls />
              <Area type="monotone" dataKey="lower" name="Lower Confidence Bound" stroke="none" fill="var(--color-card)" connectNulls />
              <Line type="monotone" dataKey="price" name="Actual" stroke="oklch(0.65 0.03 250)" strokeWidth={2} dot={false} connectNulls />
              <Line
                type="monotone"
                dataKey="forecast"
                name="AI Forecast"
                stroke="oklch(0.78 0.14 205)"
                strokeWidth={2.5}
                strokeDasharray="6 4"
                dot={{ r: 3, fill: "oklch(0.78 0.14 205)" }}
                connectNulls
              />
              <ReferenceLine
                x={forecastStartMonth}
                stroke="oklch(0.8 0.15 80)"
                strokeDasharray="4 4"
                label={{ value: "Forecast Begins", position: "insideTopRight", fill: "oklch(0.8 0.15 80)", fontSize: 10, fontWeight: 700 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <section className="grid gap-4 md:grid-cols-3">
        {m.forecastCards.map((c) => (
          <Card key={c.label} className="animate-fade-up">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {c.label}
            </p>
            <p className="mt-2 font-mono text-3xl font-semibold">
              {fmtINR(c.price)}
              <span className="text-base text-muted-foreground">/{m.unit}</span>
            </p>
            <p className="mt-1 font-mono text-sm text-warning">{c.change}</p>
          </Card>
        ))}
      </section>

      <Card className="animate-fade-up">
        <h2 className="mb-4 text-lg font-semibold">Forecast Summary</h2>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Trend:</span>
            <Badge tone={m.trend === "Bullish" ? "warning" : m.trend === "Bearish" ? "positive" : "primary"}>
              {m.trend}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Confidence:</span>
            <Badge tone="positive">{m.confidence >= 80 ? "High" : "Medium"}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Expected volatility:</span>
            <Badge tone="neutral">{m.volatility}</Badge>
          </div>
        </div>
        <p className="mt-4 border-t border-border/60 pt-3 text-xs italic text-muted-foreground">
          Prototype forecast generated from simulated historical and market-driver data.
        </p>
      </Card>
    </div>
  );
}
