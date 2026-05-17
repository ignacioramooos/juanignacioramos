import { useMemo, useState } from "react";
import { Fuel, Loader2, Users, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  calculateGasCheckout,
  normalizeKilometers,
  normalizePassengers,
  GAS_MAX_KILOMETERS,
} from "@/lib/gas";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";

type PreferenceResponse = {
  checkoutUrl?: string;
  preferenceId?: string;
};

const currencyFormatter = new Intl.NumberFormat("es-UY", {
  style: "currency",
  currency: "UYU",
  minimumFractionDigits: 2,
});

const BuyGasPage = () => {
  const [kilometers, setKilometers] = useState(12);
  const [passengers, setPassengers] = useState(1);
  const [checkingOut, setCheckingOut] = useState(false);

  const checkout = useMemo(
    () => calculateGasCheckout(kilometers, passengers),
    [kilometers, passengers],
  );

  const handleKilometerInput = (value: string) => {
    setKilometers(normalizeKilometers(Number(value)));
  };

  const handlePassengerInput = (value: string) => {
    setPassengers(normalizePassengers(Number(value)));
  };

  const startCheckout = async () => {
    if (checkingOut) return;
    setCheckingOut(true);
    try {
      const { data, error } = await supabase.functions.invoke<
        PreferenceResponse & { error?: string }
      >("mercadopago-preference", {
        body: {
          kilometers: checkout.kilometers,
          passengers: checkout.passengers,
          origin: window.location.origin,
        },
      });
      if (error) throw new Error(error.message ?? "Could not create Mercado Pago checkout.");
      if (data?.error) throw new Error(data.error);
      if (!data?.checkoutUrl) throw new Error("Mercado Pago did not return a checkout URL.");
      window.location.assign(data.checkoutUrl);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Could not open Mercado Pago checkout.");
      setCheckingOut(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Buy me gas — Juan Ignacio Ramos"
        description="Help cover the fuel for the ride. Calculate kilometers, passengers, and check out in Uruguayan pesos."
      />
      <div className="mx-auto w-full max-w-xl px-4 py-16">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back home
        </Link>

        <header className="mb-8">
          <h1 className="flex items-center gap-2 text-3xl font-semibold tracking-tight">
            <Fuel className="h-7 w-7" aria-hidden="true" />
            buy me gas
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose the kilometers and passengers. The checkout is calculated in Uruguayan pesos.
          </p>
        </header>

        <section className="space-y-6 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="gas-kilometers" className="text-sm font-medium">
                Kilometers
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="gas-kilometers"
                  inputMode="decimal"
                  max={GAS_MAX_KILOMETERS}
                  min={0.1}
                  onChange={(event) => handleKilometerInput(event.target.value)}
                  step={0.1}
                  type="number"
                  value={checkout.kilometers}
                  className="h-9 w-24 text-right"
                />
                <span className="text-sm text-muted-foreground">km</span>
              </div>
            </div>

            <Slider
              aria-label="Kilometers"
              max={GAS_MAX_KILOMETERS}
              min={0.1}
              onValueChange={([value]) => setKilometers(normalizeKilometers(value))}
              step={0.1}
              value={[checkout.kilometers]}
            />

            <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card px-4 py-3">
              <Label htmlFor="gas-passengers" className="flex items-center gap-2 text-sm font-medium">
                <Users className="h-4 w-4" aria-hidden="true" />
                Passengers
              </Label>
              <Input
                id="gas-passengers"
                inputMode="numeric"
                min={1}
                onChange={(event) => handlePassengerInput(event.target.value)}
                step={1}
                type="number"
                value={checkout.passengers}
                className="h-9 w-20 text-right"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-lg border border-border bg-card p-4 sm:grid-cols-4">
            <div>
              <p className="text-xs text-muted-foreground">Distance</p>
              <p className="mt-1 text-base font-semibold">{checkout.kilometers.toFixed(1)} km</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Liters</p>
              <p className="mt-1 text-base font-semibold">{checkout.liters.toFixed(2)} L</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Passengers</p>
              <p className="mt-1 text-base font-semibold">{checkout.passengers}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Your total</p>
              <p className="mt-1 text-base font-semibold">
                {currencyFormatter.format(checkout.totalUyu)}
              </p>
            </div>
          </div>

          <Button
            type="button"
            onClick={startCheckout}
            disabled={checkingOut}
            className="h-11 w-full rounded-full"
          >
            {checkingOut ? (
              <>
                <Loader2 className="animate-spin" aria-hidden="true" />
                Opening checkout
              </>
            ) : (
              "checkout"
            )}
          </Button>
        </section>
      </div>
    </main>
  );
};

export default BuyGasPage;
