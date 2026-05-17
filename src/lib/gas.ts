export const GAS_KM_PER_LITER = 12;
export const GAS_PRICE_PER_LITER_UYU = 88.03;
export const GAS_SERVICE_FEE_UYU = 5;
export const GAS_MAX_KILOMETERS = 150;
export const CUSTOM_AMOUNT_MIN_UYU = 1;
export const CUSTOM_AMOUNT_MAX_UYU = 50000;

export const normalizeCustomAmount = (value: number) => {
  if (!Number.isFinite(value)) return CUSTOM_AMOUNT_MIN_UYU;
  const clamped = Math.min(CUSTOM_AMOUNT_MAX_UYU, Math.max(CUSTOM_AMOUNT_MIN_UYU, value));
  return Math.round(clamped * 100) / 100;
};

const roundToCents = (value: number) => Math.round(value * 100) / 100;

export const normalizeKilometers = (value: number) => {
  if (!Number.isFinite(value)) return 0.1;
  return Math.min(GAS_MAX_KILOMETERS, Math.max(0.1, Math.round(value * 10) / 10));
};

export const normalizePassengers = (value: number) => {
  if (!Number.isFinite(value)) return 1;
  return Math.max(1, Math.round(value));
};

export const calculateGasCheckout = (kilometers: number, passengers = 1) => {
  const normalizedKilometers = normalizeKilometers(kilometers);
  const normalizedPassengers = normalizePassengers(passengers);
  const liters = normalizedKilometers / GAS_KM_PER_LITER;
  const gasTotal = liters * GAS_PRICE_PER_LITER_UYU + GAS_SERVICE_FEE_UYU;
  const splitTotal = (gasTotal - GAS_SERVICE_FEE_UYU) / normalizedPassengers + GAS_SERVICE_FEE_UYU;

  return {
    kilometers: normalizedKilometers,
    passengers: normalizedPassengers,
    liters,
    gasTotalUyu: roundToCents(gasTotal),
    totalUyu: roundToCents(splitTotal),
  };
};
