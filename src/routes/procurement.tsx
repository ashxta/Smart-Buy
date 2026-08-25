import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Eye, ShoppingCart } from "lucide-react";
import { useMaterial } from "@/lib/material";
import { calcProcurement, fmtINR } from "@/data/market";
import { Badge, Card, LoadingOverlay, PageHeader, RecoBadge } from "@/components/sb";

export const Route = createFileRoute("/procurement")({
  head: () => ({
    meta: [
      { title: "Procurement Decision Center — SmartBuy AI" },
      {
        name: "description",
        content:
          "Procurement decision workspace: inventory cover, price exposure and AI buy recommendations. Prototype with demonstration data.",
      },
      { property: "og:title", content: "Procurement Decision Center — SmartBuy AI" },
      { property: "og:description", content: "Convert forecasts into procurement decisions. Prototype with demonstration data." },
    ],
  }),
  component: ProcurementPage,
});

function Field({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-muted-foreground">{label}</span>
      <div className="flex items-center rounded-md border border-input bg-card px-3 focus-within:border-primary">
        <input
          type="number"
          value={value}
          min={0}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="w-full bg-transparent py-2 font-mono text-sm outline-none"
        />
        {suffix && <span className="ml-2 shrink-0 text-xs text-muted-foreground">{suffix}</span>}
      </div>
    </label>
  );
}

function Bar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono font-semibold">{value.toLocaleString("en-IN")} kg</span>
      </div>
      <div className="h-4 overflow-hidden rounded-md bg-secondary">
        <div className="h-full rounded-md transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

function ProcurementPage() {
  const { material: m, switching } = useMaterial();
  const [requiredQty, setRequiredQty] = useState(10000);
  const [inventory, setInventory] = useState(4500);
  const [consumption, setConsumption] = useState(3000);
  const [leadTime, setLeadTime] = useState(30);

  const r = useMemo(
    () =>
      calcProcurement({
        requiredQty,
        currentInventory: inventory,
        monthlyConsumption: Math.max(1, consumption),
        leadTimeDays: leadTime,
        currentPrice: m.currentPrice,
        forecastPrice: m.forecast6m,
      }),
    [requiredQty, inventory, consumption, leadTime, m]
  );

  return (
    <div className="space-y-6">
      <LoadingOverlay show={switching} />
      <PageHeader
        title="Procurement Decision Center"
        subtitle={`Decision workspace for ${m.name} · decision support only — nothing is purchased automatically.`}
        right={<Badge tone="warning">Prototype / Demonstration Data</Badge>}
      />

      <div className="grid gap-4 lg:grid-cols-5">
        {/* Inputs */}
        <Card className="lg:col-span-2 animate-fade-up">
          <h2 className="mb-4 text-lg font-semibold">Inputs</h2>
          <div className="space-y-4">
            <div>
              <span className="mb-1 block text-xs text-muted-foreground">Material</span>
              <div className="rounded-md border border-input bg-secondary/50 px-3 py-2 text-sm font-medium">
                {m.name}
              </div>
            </div>
            <Field label="Required Quantity" value={requiredQty} onChange={setRequiredQty} suffix="kg" />
            <Field label="Current Inventory" value={inventory} onChange={setInventory} suffix="kg" />
            <Field label="Monthly Consumption" value={consumption} onChange={setConsumption} suffix="kg/mo" />
            <Field label="Supplier Lead Time" value={leadTime} onChange={setLeadTime} suffix="days" />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="mb-1 block text-xs text-muted-foreground">Current Price</span>
                <div className="rounded-md border border-input bg-secondary/50 px-3 py-2 font-mono text-sm">
                  {fmtINR(m.currentPrice)}/{m.unit}
                </div>
              </div>
              <div>
                <span className="mb-1 block text-xs text-muted-foreground">Forecasted Price</span>
                <div className="rounded-md border border-primary/40 bg-primary/10 px-3 py-2 font-mono text-sm text-primary">
                  {fmtINR(m.forecast6m)}/{m.unit}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Outputs */}
        <div className="space-y-4 lg:col-span-3">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Card className="animate-fade-up">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Inventory Cover</p>
              <p className={"mt-1 font-mono text-xl font-semibold " + (r.coverDays < leadTime ? "text-warning" : "text-positive")}>
                {r.coverDays} days
              </p>
            </Card>
            <Card className="animate-fade-up">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Expected Movement</p>
              <p className="mt-1 font-mono text-xl font-semibold text-warning">+{r.movementPct.toFixed(1)}%</p>
            </Card>
            <Card className="animate-fade-up">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Price Exposure</p>
              <p className="mt-1 font-mono text-xl font-semibold text-warning">{fmtINR(r.exposure)}</p>
            </Card>
            <Card className="glow-border animate-fade-up">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">AI Recommendation</p>
              <div className="mt-2"><RecoBadge value={r.recommendation} /></div>
            </Card>
          </div>

          <Card className="animate-fade-up">
            <h2 className="mb-4 text-lg font-semibold">Inventory vs Requirement</h2>
            <div className="space-y-4">
              <Bar label="Current Inventory" value={inventory} max={requiredQty} color="oklch(0.65 0.03 250)" />
              <Bar label="Required Quantity" value={requiredQty} max={requiredQty} color="oklch(0.78 0.14 205)" />
            </div>
          </Card>

          <Card className="animate-fade-up">
            <h2 className="mb-2 text-lg font-semibold">Suggested Action</h2>
            <p className="text-sm leading-relaxed text-secondary-foreground">{r.suggestedAction}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={() =>
                  toast.success("Purchase simulation complete", {
                    description: `Simulated ${m.name} purchase workflow. No real order was placed — prototype demo only.`,
                  })
                }
                className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                <ShoppingCart className="h-4 w-4" /> Simulate Purchase
              </button>
              <button
                onClick={() =>
                  toast.info(`Recommendation: ${r.recommendation}`, {
                    description: r.suggestedAction,
                  })
                }
                className="flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary/50"
              >
                <Eye className="h-4 w-4" /> View Recommendation
              </button>
            </div>
            <p className="mt-3 text-[11px] italic text-muted-foreground">
              Buttons simulate UI behavior only. Not connected to any purchasing system.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
