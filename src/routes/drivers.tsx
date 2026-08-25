import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BrainCircuit, Minus, TrendingDown, TrendingUp } from "lucide-react";
import { useMaterial } from "@/lib/material";
import { Badge, Card, ImpactBadge, LoadingOverlay, PageHeader } from "@/components/sb";

export const Route = createFileRoute("/drivers")({
  head: () => ({
    meta: [
      { title: "Market Drivers — SmartBuy AI" },
      {
        name: "description",
        content:
          "Feature importance and market signals explaining the AI price forecast. Prototype with demonstration data.",
      },
      { property: "og:title", content: "Market Drivers — SmartBuy AI" },
      { property: "og:description", content: "Why is the model predicting this? Feature importance and market signals." },
    ],
  }),
  component: DriversPage,
});

function DriversPage() {
  const { material: m, switching } = useMaterial();

  return (
    <div className="space-y-6">
      <LoadingOverlay show={switching} />
      <PageHeader
        title="Why is the model predicting this?"
        subtitle={`Explainability view for ${m.name} — what drives the forecast.`}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Feature importance */}
        <Card className="animate-fade-up">
          <h2 className="mb-1 text-lg font-semibold">Feature Importance</h2>
          <p className="mb-5 text-xs text-muted-foreground">
            Relative contribution of each signal to the {m.name} forecast · Demo data
          </p>
          <div className="space-y-4">
            {m.drivers.map((d, i) => (
              <div key={d.name}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span>{d.name}</span>
                  <span className="font-mono font-semibold text-primary">{d.weight}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary transition-all duration-700"
                    style={{ width: `${d.weight}%`, transitionDelay: `${i * 80}ms` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Market signals */}
        <div className="space-y-4">
          <Card className="animate-fade-up">
            <h2 className="mb-4 text-lg font-semibold">Market Signals</h2>
            <div className="grid grid-cols-2 gap-3">
              {m.signals.map((s) => (
                <div key={s.name} className="rounded-lg border border-border bg-secondary/40 p-3">
                  <p className="text-xs text-muted-foreground">{s.name}</p>
                  <p className="mt-1 flex items-center gap-1.5 font-mono text-lg font-semibold">
                    {s.direction === "up" && <TrendingUp className="h-4 w-4 text-warning" />}
                    {s.direction === "down" && <TrendingDown className="h-4 w-4 text-positive" />}
                    {s.direction === "flat" && <Minus className="h-4 w-4 text-muted-foreground" />}
                    {s.change}
                  </p>
                  <div className="mt-2">
                    <ImpactBadge impact={s.impact} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="glow-border animate-fade-up">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">AI Explanation</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary-foreground">{m.explanation}</p>
            <div className="mt-4 flex items-center gap-2 border-t border-border/60 pt-3">
              <Badge tone="warning">AI-generated prototype explanation</Badge>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Not investment or sourcing advice</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
