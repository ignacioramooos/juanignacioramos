## Add custom amount to Buy Me Gas

### What changes

1. **Two checkout modes on `/buygas`**: existing km/passenger calculator + a new "custom amount" input (UYU). User picks which mode to pay with via a tab or toggle.
2. **URL prefill**: `/buygas/:amount` (e.g. `/buygas/20`, `/buygas/100`) opens the page with the custom-amount tab active and the amount prefilled. `/buygas` (no amount) opens normally with custom amount blank/0.
3. **Edge function** accepts either `{ kilometers, passengers }` OR `{ customAmountUyu }` and builds the Mercado Pago preference with the right unit price + title.

### UX

- Tabs at top of the checkout card: **"Split a ride"** (current km calculator) | **"Custom amount"** (single UYU input).
- When the URL contains an amount param, the Custom tab is auto-selected and the input is prefilled.
- Custom amount minimum 1 UYU, maximum 50000 UYU (sanity bound), rounded to 2 decimals.
- Checkout button uses the active tab's total.

### Technical details

**Routing (`src/App.tsx`)**
- Add `<Route path="/buygas/:amount?" element={...} />` so `/buygas` and `/buygas/123` both render `BuyGasPage`.

**`src/pages/BuyGasPage.tsx`**
- Read `useParams<{ amount?: string }>()`; parse to number, clamp, set as initial `customAmount` and force `mode = "custom"` when present.
- Add `mode` state (`"split" | "custom"`) using shadcn `Tabs`.
- New input field for custom UYU amount; reuse existing breakdown card for split mode.
- `startCheckout` posts either `{ kilometers, passengers }` or `{ customAmountUyu }` to the edge function.

**`src/lib/gas.ts`**
- Add `CUSTOM_AMOUNT_MIN = 1`, `CUSTOM_AMOUNT_MAX = 50000`, helper `normalizeCustomAmount(value)`.

**`supabase/functions/mercadopago-preference/index.ts`**
- Branch on payload: if `customAmountUyu` is a finite number ≥ 1 and ≤ 50000, use it directly as `unit_price` with title `"Buy me gas"`. Otherwise keep current km/passenger validation + calculation.
- Return `{ checkoutUrl, preferenceId, totalUyu }` in both branches.

**Tests (`src/lib/gas.test.ts`)**
- Add cases for `normalizeCustomAmount` (clamping, rounding, non-finite → min).

### Files touched

- `src/App.tsx` (route param)
- `src/pages/BuyGasPage.tsx` (tabs + custom input + param parsing)
- `src/lib/gas.ts` (custom amount helpers)
- `src/lib/gas.test.ts` (new tests)
- `supabase/functions/mercadopago-preference/index.ts` (accept custom amount branch)
