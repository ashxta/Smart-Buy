import { createFileRoute } from "@tanstack/react-router";
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
import { TrendingUp, Gauge, Target, ShieldCheck, IndianRupee, UserCheck } from "lucide-react";
import { useMaterial } from "@/lib/material";
import { fmtINR } from "@/data/market";
import {
  Badge,
  Card,
  ChartTooltip,
  KpiCard,
  LoadingOverlay,
  RecoBadge,
  StoryBar,
} from "@/components/sb";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — SmartBuy AI" },
      {
        name: "description",
        content:
          "Executive dashboard: raw-material price KPIs, AI price trajectory and procurement recommendation. Prototype with demonstration data.",
      },
      { property: "og:title", content: "Dashboard — SmartBuy AI" },
      {
        property: "og:description",
        content:
          "Turn commodity price volatility into procurement action. Prototype with demonstration data.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { material: m, switching } = useMaterial();
  const forecastStartMonth = m.series[23]!.month;

  return (
    <div className="space-y-6">
      <LoadingOverlay show={switching} />

      {/* Hero */}
      <section className="glass relative overflow-hidden rounded-2xl px-6 py-10 md:px-10 animate-fade-up">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">SmartBuy AI</p>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
          Turn Price Volatility
          <br />
          Into <span className="text-primary text-glow">Procurement Advantage.</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
          SmartBuy AI forecasts raw-material prices and converts market signals into explainable
          procurement recommendations.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <RecoBadge value={m.recommendation} large />
          <span className="text-sm text-muted-foreground">
            {m.name} · <span className="font-mono text-warning">+{m.movementPct}%</span> expected
            increase · High confidence
          </span>
        </div>
      </section>

      {/* KPI row */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <KpiCard
          label="Current Price"
          value={`${fmtINR(m.currentPrice)}/${m.unit}`}
          icon={<IndianRupee className="h-4 w-4" />}
          sub="Demo spot estimate"
        />
        <KpiCard
          label="6-Month Forecast"
          value={`${fmtINR(m.forecast6m)}/${m.unit}`}
          icon={<Target className="h-4 w-4" />}
          sub="Feb '27 projection"
        />
        <KpiCard
          label="Expected Movement"
          value={`+${m.movementPct}%`}
          icon={<TrendingUp className="h-4 w-4" />}
          sub={<span className="text-warning">Upward pressure</span>}
        />
        <KpiCard
          label="AI Confidence"
          value={`${m.confidence}%`}
          icon={<ShieldCheck className="h-4 w-4" />}
          sub={<Badge tone="positive">High Confidence</Badge>}
        />
        <KpiCard
          label="Recommendation"
          value={m.recommendation}
          icon={<Gauge className="h-4 w-4" />}
          accent
          sub="Human approval required"
        />
      </section>

      {/* Chart + recommendation */}
      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 animate-fade-up">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold">Price Trajectory — {m.name}</h2>
              <p className="text-xs text-muted-foreground">
                24 months history · 6-month AI forecast · Prototype / Demonstration Data
              </p>
            </div>
            <Badge tone="primary">{m.trend}</Badge>
          </div>
          <div className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={m.series} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="band" x1="0" y1="0" x2="0" y2="1">
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
                <Area
                  type="monotone"
                  dataKey="upper"
                  name="Upper Bound"
                  stroke="none"
                  fill="url(#band)"
                  connectNulls
                  legendType="none"
                />
                <Area
                  type="monotone"
                  dataKey="lower"
                  name="Lower Bound"
                  stroke="none"
                  fill="var(--color-card)"
                  connectNulls
                  legendType="none"
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  name="Historical Price"
                  stroke="oklch(0.65 0.03 250)"
                  strokeWidth={2}
                  dot={false}
                  connectNulls
                />
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
                  label={{
                    value: "Forecast Begins",
                    position: "insideTopRight",
                    fill: "oklch(0.8 0.15 80)",
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recommendation card */}
        <Card className="flex flex-col glow-border animate-fade-up">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            AI Procurement Recommendation
          </p>
          <div className="mt-4">
            <RecoBadge value={m.recommendation} large />
          </div>
          <dl className="mt-5 space-y-3 text-sm">
            {[
              ["Expected movement", `+${m.movementPct}%`],
              ["Inventory cover", `${m.inventoryCoverDays} days`],
              ["Supplier lead time", `${m.supplierLeadTimeDays} days`],
              ["Confidence", m.confidence >= 80 ? "High" : "Medium"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between border-b border-border/50 pb-2">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-mono font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 rounded-lg bg-secondary/60 p-3 text-xs leading-relaxed text-secondary-foreground">
            <span className="font-semibold text-primary">Why: </span>
            {m.recommendationReason}
          </div>
          <div className="mt-auto pt-4">
            <p className="flex items-center gap-2 rounded-lg border border-warning/40 bg-warning/10 px-3 py-2 text-xs font-semibold text-warning">
              <UserCheck className="h-4 w-4" /> Human approval required — decision support only
            </p>
          </div>
        </Card>
      </section>

      <StoryBar />
    </div>
  );
}
