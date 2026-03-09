import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/i18n/LanguageContext";

// Real pricing from production spreadsheet (in UYU)
// PLA: $750 UYU/kg = $0.75 UYU/g
// Electricity off-peak: $11.03 UYU/kWh, consumption: 0.5 kWh/h
// Electricity cost per hour: ~$5.52 UYU
// Markup: ~5x production cost
// 1 USD ≈ 43 UYU (approximate)

const UYU_PER_USD = 43;
const PLA_COST_PER_GRAM_UYU = 0.75;
const ELECTRICITY_PER_HOUR_UYU = 5.52; // 0.5 kWh × $11.03
const ACRYLIC_PAINT_COST_UYU = 200;
const MARKUP = 5;

type Size = "small" | "medium" | "large" | "xlarge";

const sizes: { key: Size; labelEn: string; labelEs: string; gramsRange: [number, number]; hoursPerGram: number }[] = [
  { key: "small", labelEn: "Small (keycap, small part)", labelEs: "Pequeño (keycap, pieza chica)", gramsRange: [2, 20], hoursPerGram: 0.5 },
  { key: "medium", labelEn: "Medium (figurine, enclosure)", labelEs: "Mediano (figurita, carcasa)", gramsRange: [20, 80], hoursPerGram: 0.35 },
  { key: "large", labelEn: "Large (sculpture, housing)", labelEs: "Grande (escultura, caja)", gramsRange: [80, 250], hoursPerGram: 0.2 },
  { key: "xlarge", labelEn: "Extra Large (full build plate)", labelEs: "Extra Grande (plato completo)", gramsRange: [250, 1000], hoursPerGram: 0.18 },
];

export const PrintQuoteEstimator = () => {
  const { lang, t } = useLanguage();
  const [weight, setWeight] = useState(50); // grams
  const [sizeIdx, setSizeIdx] = useState(1);
  const [withPaint, setWithPaint] = useState(false);
  const [customDesign, setCustomDesign] = useState(false);

  const estimate = useMemo(() => {
    const size = sizes[sizeIdx];
    const printHours = weight * size.hoursPerGram;

    // Production costs (UYU)
    const materialCostUYU = weight * PLA_COST_PER_GRAM_UYU;
    const electricityCostUYU = printHours * ELECTRICITY_PER_HOUR_UYU;
    const paintCostUYU = withPaint ? ACRYLIC_PAINT_COST_UYU : 0;
    const designCostUYU = customDesign ? Math.max(500, weight * 3) : 0;

    const productionCostUYU = materialCostUYU + electricityCostUYU + paintCostUYU + designCostUYU;

    // Sale price = ~5x production (as per real spreadsheet data)
    const salePriceUYU = productionCostUYU * MARKUP;
    const salePriceUSD = salePriceUYU / UYU_PER_USD;

    return {
      materialCostUSD: (materialCostUYU / UYU_PER_USD).toFixed(2),
      totalUSD: salePriceUSD.toFixed(2),
      totalUYU: Math.round(salePriceUYU),
      printTimeHrs: printHours.toFixed(1),
    };
  }, [weight, sizeIdx, withPaint, customDesign]);

  const currentSize = sizes[sizeIdx];

  return (
    <div className="p-6 rounded-2xl bg-card border border-border space-y-6">
      <div>
        <h3 className="font-display font-semibold text-lg mb-1">{t.printQuote.title}</h3>
        <p className="text-xs text-muted-foreground">{t.printQuote.subtitle}</p>
      </div>

      {/* Size selection */}
      <div className="space-y-2">
        <Label>{lang === "es" ? "Tamaño" : "Size"}</Label>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s, i) => (
            <button
              key={s.key}
              onClick={() => {
                setSizeIdx(i);
                // Clamp weight to new range
                setWeight(Math.max(s.gramsRange[0], Math.min(s.gramsRange[1], weight)));
              }}
              className={`px-4 py-2 rounded-xl border text-sm transition-colors ${
                sizeIdx === i
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:border-foreground/30"
              }`}
            >
              <span className="font-medium">{lang === "es" ? s.labelEs : s.labelEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Weight slider */}
      <div className="space-y-2">
        <Label className="flex justify-between">
          {t.printQuote.weight} <span className="font-mono text-muted-foreground">{weight}g</span>
        </Label>
        <Slider
          value={[weight]}
          onValueChange={([v]) => setWeight(v)}
          min={currentSize.gramsRange[0]}
          max={currentSize.gramsRange[1]}
          step={1}
        />
      </div>

      {/* Options */}
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={withPaint}
            onChange={(e) => setWithPaint(e.target.checked)}
            className="rounded border-border"
          />
          {lang === "es" ? "Pintura acrílica" : "Acrylic paint"}
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={customDesign}
            onChange={(e) => setCustomDesign(e.target.checked)}
            className="rounded border-border"
          />
          {lang === "es" ? "Diseño personalizado" : "Custom design"}
        </label>
      </div>

      {/* Estimate result */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-muted/50 text-center">
          <p className="font-display font-bold text-lg">${estimate.totalUSD}</p>
          <p className="text-[10px] text-muted-foreground">{t.printQuote.estimatedTotal} (USD)</p>
          <p className="text-[10px] text-muted-foreground/60">${estimate.totalUYU} UYU</p>
        </div>
        <div className="p-3 rounded-xl bg-muted/50 text-center">
          <p className="font-display font-bold text-lg">{estimate.printTimeHrs}h</p>
          <p className="text-[10px] text-muted-foreground">{t.printQuote.estPrintTime}</p>
        </div>
        <div className="p-3 rounded-xl bg-muted/50 text-center">
          <p className="font-display font-bold text-lg">${estimate.materialCostUSD}</p>
          <p className="text-[10px] text-muted-foreground">{t.printQuote.materialCost}</p>
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground">
        {t.printQuote.note}
      </p>
    </div>
  );
};
