import { useMemo, useState } from "react";
import { Fuel, Loader2, Users, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { calculateGasCheckout, normalizeKilometers, normalizePassengers } from "@/lib/gas";
import { supabase } from "@/integrations/supabase/client";

type PreferenceResponse = {
  checkoutUrl?: string;
  preferenceId?: string;
};

const currencyFormatter = new Intl.NumberFormat("es-UY", {
  style: "currency",
  currency: "UYU",
  minimumFractionDigits: 2,
});

export const BuyMeGas = () => {
  const [open, setOpen] = useState(false);
  const [kilometers, setKilometers] = useState(12);
  const [passengers, setPassengers] = useState(2);
  const [checkingOut, setCheckingOut] = useState(false);

  const checkout = useMemo(() => calculateGasCheckout(kilometers, passengers), [kilometers, passengers]);

  const handleKilometerInput = (value: string) => {
    const parsed = Number(value);
    setKilometers(normalizeKilometers(parsed));
  };

  const handlePassengerInput = (value: string) => {
    const parsed = Number(value);
    setPassengers(normalizePassengers(parsed));
  };

  const startCheckout = async () => {
    if (checkingOut) return;
    setCheckingOut(true);

    try {
      const { data, error } = await supabase.functions.invoke<PreferenceResponse & { error?: string }>(
        "mercadopago-preference",
        {
          body: {
            kilometers: checkout.kilometers,
            passengers: checkout.passengers,
            origin: window.location.origin,
          },
        },
      );

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
    <Drawer open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-5 z-40 h-11 rounded-full border border-foreground/10 bg-foreground px-4 text-background shadow-lg hover:bg-foreground/90 md:bottom-6"
      >
        <Fuel aria-hidden="true" />
        buy me gas
      </Button>

      <DrawerContent className="bottom-4 mx-auto max-w-xl rounded-lg border-border bg-background/95 px-1 pb-safe backdrop-blur">
        <DrawerHeader className="relative text-left">
          <DrawerClose asChild>
            <Button
              aria-label="Close buy me gas tab"
              className="absolute right-4 top-4 h-8 w-8 rounded-full"
              size="icon"
              type="button"
              variant="ghost"
            >
              <X aria-hidden="true" />
            </Button>
          </DrawerClose>
          <DrawerTitle className="flex items-center gap-2 text-xl">
            <Fuel className="h-5 w-5" aria-hidden="true" />
            buy me gas
          </DrawerTitle>
          <DrawerDescription>
            Choose the kilometers and passengers. The checkout is calculated in Uruguayan pesos.
          </DrawerDescription>
        </DrawerHeader>

        <div className="space-y-6 px-4 pb-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="gas-kilometers" className="text-sm font-medium">
                Kilometers
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="gas-kilometers"
                  inputMode="decimal"
                  max={500}
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
              max={500}
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
                min={2}
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
              <p className="mt-1 text-base font-semibold">{currencyFormatter.format(checkout.totalUyu)}</p>
            </div>
          </div>
        </div>

        <DrawerFooter>
          <Button type="button" onClick={startCheckout} disabled={checkingOut} className="h-11 rounded-full">
            {checkingOut ? (
              <>
                <Loader2 className="animate-spin" aria-hidden="true" />
                Opening checkout
              </>
            ) : (
              "checkout"
            )}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
