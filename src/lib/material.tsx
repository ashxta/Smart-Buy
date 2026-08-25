import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { MATERIALS, type MaterialData, type MaterialId } from "@/data/market";

interface MaterialCtx {
  material: MaterialData;
  materialId: MaterialId;
  switching: boolean;
  setMaterial: (id: MaterialId) => void;
}

const Ctx = createContext<MaterialCtx | null>(null);

export function MaterialProvider({ children }: { children: ReactNode }) {
  const [materialId, setMaterialId] = useState<MaterialId>("aluminium");
  const [switching, setSwitching] = useState(false);

  const setMaterial = useCallback((id: MaterialId) => {
    setMaterialId((prev) => {
      if (prev === id) return prev;
      setSwitching(true);
      // simulated model re-load for demo effect
      setTimeout(() => setSwitching(false), 650);
      return id;
    });
  }, []);

  return (
    <Ctx.Provider value={{ material: MATERIALS[materialId], materialId, switching, setMaterial }}>
      {children}
    </Ctx.Provider>
  );
}

export function useMaterial() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useMaterial must be used inside MaterialProvider");
  return ctx;
}
