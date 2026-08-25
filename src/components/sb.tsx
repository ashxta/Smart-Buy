import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Recommendation } from "@/data/market";
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("glass rounded-xl p-5", className)}>{children}</div>;
}

export function PageHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

export function KpiCard({
  label,
  value,
  sub,
  icon,
  accent,
}: {
  label: string;
  value: string;
  sub?: ReactNode;
  icon?: ReactNode;
  accent?: boolean;
}) {
  return (
    <Card className={cn("animate-fade-up", accent && "glow-border")}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <span className="text-primary">{icon}</span>
      </div>
      <p className={cn("mt-2 font-mono text-3xl font-semibold", accent && "text-primary text-glow")}>
        {value}
      </p>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </Card>
  );
}

const recoStyles: Record<Recommendation, string> = {
  "BUY NOW": "bg-primary/15 text-primary border-primary/40",
  "PARTIAL BUY": "bg-warning/15 text-warning border-warning/40",
  WATCH: "bg-muted text-muted-foreground border-border",
};

const recoIcons: Record<Recommendation, ReactNode> = {
  "BUY NOW": <CheckCircle2 className="h-3.5 w-3.5" />,
  "PARTIAL BUY": <Clock className="h-3.5 w-3.5" />,
  WATCH: <AlertTriangle className="h-3.5 w-3.5" />,
};

export function RecoBadge({ value, large }: { value: Recommendation; large?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-bold tracking-wide",
        recoStyles[value],
        large ? "px-4 py-1.5 text-base" : "px-2.5 py-0.5 text-[11px]"
      )}
    >
      {recoIcons[value]}
      {value}
    </span>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "primary" | "warning" | "positive";
}) {
  const tones = {
    neutral: "bg-muted text-muted-foreground border-border",
    primary: "bg-primary/15 text-primary border-primary/40",
    warning: "bg-warning/15 text-warning border-warning/40",
    positive: "bg-positive/15 text-positive border-positive/40",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest",
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}

export function ImpactBadge({ impact }: { impact: "HIGH" | "MEDIUM" | "LOW" }) {
  const tone = impact === "HIGH" ? "warning" : impact === "MEDIUM" ? "primary" : "neutral";
  return <Badge tone={tone}>Impact: {impact}</Badge>;
}

export function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-lg px-3 py-2 text-xs">
      <p className="mb-1 font-semibold text-foreground">{label}</p>
      {payload.map((p: any) =>
        p.value == null ? null : (
          <p key={p.dataKey} className="font-mono" style={{ color: p.color || p.stroke }}>
            {p.name}: ₹{Number(p.value).toLocaleString("en-IN")}
          </p>
        )
      )}
    </div>
  );
}

export function LoadingOverlay({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm">
      <div className="glass rounded-xl px-8 py-6 text-center">
        <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm font-medium">Loading SmartBuy AI model…</p>
        <p className="mt-1 text-xs text-muted-foreground">Switching material context</p>
      </div>
    </div>
  );
}

const STORY = [
  "Market Data",
  "AI Forecast",
  "Explainability",
  "Scenario Analysis",
  "Recommendation",
  "Business Action",
];

export function StoryBar() {
  return (
    <div className="glass flex flex-wrap items-center gap-x-2 gap-y-2 rounded-xl px-4 py-3">
      {STORY.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/20 font-mono text-[9px] text-primary">
              {i + 1}
            </span>
            {s}
          </span>
          {i < STORY.length - 1 && <span className="text-primary/60">→</span>}
        </div>
      ))}
    </div>
  );
}
