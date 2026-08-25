import { createFileRoute } from "@tanstack/react-router";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ArrowRight, Database, RefreshCw, Target } from "lucide-react";
import { useMaterial } from "@/lib/material";
import { Badge, Card, ChartTooltip, LoadingOverlay, PageHeader } from "@/components/sb";

export const Route = createFileRoute("/performance")({
  head: () => ({
    meta: [
      { title: "Model Performance — SmartBuy AI" },
      {
        name: "description",
        content:
          "Forecast accuracy of SmartBuy AI vs a naïve baseline on simulated demonstration data. Prototype metrics only.",
      },
      { property: "og:title", content: "Model Performance — SmartBuy AI" },
      { property: "og:description", content: "Prototype metrics using simulated demonstration data." },
    ],
  }),
  component: PerformancePage,
});

function MetricRow({ label, base, model, better }: { label: string; base: string; model: string; better: string }) {
  return (
    <tr className="border-b border-border/50 last:border-0">
      <td className="py-3 text-sm text-muted-foreground">{label}</td>
      <td className="py-3 text-right font-mono text-sm">{base}</td>
      <td className="py-3 text-right font-mono text-sm font-semibold text-primary">{model}</td>
      <td className="py-3 text-right font-mono text-sm text-positive">{better}</td>
    </tr>
  );
}

const WF_STEPS = [
  { icon: <Database className="h-4 w-4" />, label: "Train" },
  { icon: <Target className="h-4 w-4" />, label: "Predict" },
  { icon: <ArrowRight className="h-4 w-4" />, label: "Move Forward" },
  { icon: <RefreshCw className="h-4 w-4" />, label: "Retrain" },
  { icon: <Target className="h-4 w-4" />, label: "Predict" },
];

function PerformancePage() {
  const { material: m, switching } = useMaterial();
  const improvement = (a: number, b: number) => `−${Math.round(((a - b) / a) * 100)}%`;

  return (
    <div className="space-y-6">
      <LoadingOverlay show={switching} />
      <PageHeader
        title="Model Performance"
        subtitle={`SmartBuy AI vs naïve baseline — ${m.name} forecast accuracy.`}
        right={<Badge tone="warning">Prototype metrics using simulated demonstration data</Badge>}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="animate-fade-up">
          <h2 className="mb-4 text-lg font-semibold">Accuracy Metrics</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-[11px] uppercase tracking-widest text-muted-foreground">
                <th className="pb-2 text-left font-semibold">Metric</th>
                <th className="pb-2 text-right font-semibold">Naïve Baseline</th>
                <th className="pb-2 text-right font-semibold">SmartBuy AI</th>
                <th className="pb-2 text-right font-semibold">Gain</th>
              </tr>
            </thead>
            <tbody>
              <MetricRow label="MAPE" base={`${m.baseline.mape}%`} model={`${m.model.mape}%`} better={improvement(m.baseline.mape, m.model.mape)} />
              <MetricRow label="MAE" base={String(m.baseline.mae)} model={String(m.model.mae)} better={improvement(m.baseline.mae, m.model.mae)} />
              <MetricRow label="RMSE" base={String(m.baseline.rmse)} model={String(m.model.rmse)} better={improvement(m.baseline.rmse, m.model.rmse)} />
              <MetricRow
                label="Directional Accuracy"
                base={`${m.baseline.dirAcc}%`}
                model={`${m.model.dirAcc}%`}
                better={`+${m.model.dirAcc - m.baseline.dirAcc} pts`}
              />
            </tbody>
          </table>
          <p className="mt-4 text-[11px] italic text-muted-foreground">
            These are NOT real ACG results — simulated metrics for demonstration purposes.
          </p>
        </Card>

        <Card className="animate-fade-up">
          <h2 className="mb-4 text-lg font-semibold">Actual vs Predicted</h2>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={m.actualVsPredicted} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0.04 258 / 40%)" />
                <XAxis dataKey="month" tick={{ fill: "oklch(0.65 0.03 250)", fontSize: 10 }} stroke="oklch(0.3 0.04 258 / 60%)" />
                <YAxis
                  domain={["dataMin - 5", "dataMax + 5"]}
                  tick={{ fill: "oklch(0.65 0.03 250)", fontSize: 10, fontFamily: "IBM Plex Mono" }}
                  stroke="oklch(0.3 0.04 258 / 60%)"
                  tickFormatter={(v: number) => `₹${v}`}
                  width={58}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="actual" name="Actual" stroke="oklch(0.65 0.03 250)" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="predicted" name="SmartBuy AI Predicted" stroke="oklch(0.78 0.14 205)" strokeWidth={2.5} strokeDasharray="6 4" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="animate-fade-up">
        <h2 className="mb-1 text-lg font-semibold">Walk-Forward Validation</h2>
        <p className="mb-6 text-xs text-muted-foreground">
          The prototype uses time-aware validation to mimic real-world forecasting.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {WF_STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="glass flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium">
                <span className="text-primary">{s.icon}</span>
                {s.label}
              </div>
              {i < WF_STEPS.length - 1 && <ArrowRight className="h-4 w-4 text-primary/60" />}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
