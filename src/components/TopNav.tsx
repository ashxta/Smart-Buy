import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, ScanLine } from "lucide-react";
import { useMaterial } from "@/lib/material";
import { cn } from "@/lib/utils";
import type { MaterialId } from "@/data/market";

const NAV = [
  { to: "/", label: "Dashboard" },
  { to: "/forecast", label: "Forecast" },
  { to: "/drivers", label: "Market Drivers" },
  { to: "/scenarios", label: "Scenario Analysis" },
  { to: "/procurement", label: "Procurement" },
  { to: "/performance", label: "Model Performance" },
] as const;

export function TopNav() {
  const { materialId, setMaterial } = useMaterial();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary glow-border">
            <ScanLine className="h-4.5 w-4.5" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            SmartBuy <span className="text-primary text-glow">AI</span>
          </span>
        </Link>

        <nav className="order-3 flex w-full flex-wrap items-center gap-1 md:order-2 md:w-auto">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                "rounded-md px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === n.to && "bg-primary/10 text-primary"
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="order-2 ml-auto flex items-center gap-3 md:order-3">
          <div className="relative">
            <select
              value={materialId}
              onChange={(e) => setMaterial(e.target.value as MaterialId)}
              className="appearance-none rounded-md border border-border bg-card py-1.5 pl-3 pr-8 text-[13px] font-medium outline-none transition-colors hover:border-primary/50 focus:border-primary"
            >
              <option value="aluminium">Aluminium</option>
              <option value="pvc">PVC Resin</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          </div>
          <span className="hidden items-center gap-1.5 rounded-full border border-positive/40 bg-positive/10 px-3 py-1 text-[11px] font-semibold text-positive sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-positive animate-pulse-dot" />
            Prototype Demo
          </span>
        </div>
      </div>
    </header>
  );
}

export function StatusStrip() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-b border-border/60 px-4 py-2 text-[11px] text-muted-foreground md:px-8">
      <span className="flex items-center gap-1.5">
        Data Status <span className="font-semibold text-warning">● Demo Data</span>
      </span>
      <span className="flex items-center gap-1.5">
        Model Status <span className="font-semibold text-positive">● SmartBuy AI Online</span>
      </span>
      <span>
        Last Updated <span className="font-mono font-semibold text-foreground">25 Aug 2026</span>
      </span>
      <span>
        Forecast Horizon <span className="font-mono font-semibold text-foreground">6 Months</span>
      </span>
      <span className="ml-auto rounded border border-warning/40 bg-warning/10 px-2 py-0.5 font-bold uppercase tracking-widest text-warning">
        Prototype / Demonstration Data
      </span>
    </div>
  );
}
