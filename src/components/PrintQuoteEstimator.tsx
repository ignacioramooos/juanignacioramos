import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const materials = [
  { name: "PLA", pricePerCm3: 0.05, description: "Standard, biodegradable, good for prototypes" },
  { name: "PETG", pricePerCm3: 0.07, description: "Durable, weather-resistant, food-safe options" },
  { name: "ABS", pricePerCm3: 0.06, description: "Strong, heat-resistant, industrial parts" },
];

export const PrintQuoteEstimator = () => {
  const [volume, setVolume] = useState(50); // cm³
  const [materialIdx, setMaterialIdx] = useState(0);
  const [infill, setInfill] = useState(20); // %

  const estimate = useMemo(() => {
    const mat = materials[materialIdx];
    const effectiveVolume = volume * (infill / 100);
    const materialCost = effectiveVolume * mat.pricePerCm3;
    const printTimeHrs = (volume / 15) * (infill / 20); // rough estimate
    const laborCost = Math.max(5, printTimeHrs * 2);
    const total = materialCost + laborCost;
    return {
      materialCost: materialCost.toFixed(2),
      printTimeHrs: printTimeHrs.toFixed(1),
      total: total.toFixed(2),
    };
  }, [volume, materialIdx, infill]);

  return (
    <div className="p-6 rounded-2xl bg-card border border-border space-y-6">
      <div>
        <h3 className="font-display font-semibold text-lg mb-1">Quick Quote Estimator</h3>
        <p className="text-xs text-muted-foreground">Rough estimate based on volume, material, and infill. Final price may vary.</p>
      </div>

      {/* Material selection */}
      <div className="space-y-2">
        <Label>Material</Label>
        <div className="flex flex-wrap gap-2">
          {materials.map((mat, i) => (
            <button
              key={mat.name}
              onClick={() => setMaterialIdx(i)}
              className={`px-4 py-2 rounded-xl border text-sm transition-colors ${
                materialIdx === i
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:border-foreground/30"
              }`}
            >
              <span className="font-medium">{mat.name}</span>
              <span className="block text-[10px] opacity-70">{mat.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Volume slider */}
      <div className="space-y-2">
        <Label className="flex justify-between">
          Part Volume <span className="font-mono text-muted-foreground">{volume} cm³</span>
        </Label>
        <Slider
          value={[volume]}
          onValueChange={([v]) => setVolume(v)}
          min={5}
          max={500}
          step={5}
        />
      </div>

      {/* Infill slider */}
      <div className="space-y-2">
        <Label className="flex justify-between">
          Infill Density <span className="font-mono text-muted-foreground">{infill}%</span>
        </Label>
        <Slider
          value={[infill]}
          onValueChange={([v]) => setInfill(v)}
          min={10}
          max={100}
          step={5}
        />
      </div>

      {/* Estimate result */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-muted/50 text-center">
          <p className="font-display font-bold text-lg">${estimate.total}</p>
          <p className="text-[10px] text-muted-foreground">Estimated Total</p>
        </div>
        <div className="p-3 rounded-xl bg-muted/50 text-center">
          <p className="font-display font-bold text-lg">{estimate.printTimeHrs}h</p>
          <p className="text-[10px] text-muted-foreground">Est. Print Time</p>
        </div>
        <div className="p-3 rounded-xl bg-muted/50 text-center">
          <p className="font-display font-bold text-lg">${estimate.materialCost}</p>
          <p className="text-[10px] text-muted-foreground">Material Cost</p>
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground">
        * This is a rough estimate. Upload your STL file in the request form below for a precise quote.
      </p>
    </div>
  );
};
