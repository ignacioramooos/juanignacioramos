export const GAS_KM_PER_LITER = 12;
export const GAS_PRICE_PER_LITER_UYU = 88.03;
export const GAS_SERVICE_FEE_UYU = 5;

export const normalizeKilometers = (value: number) => {
  if (!Number.isFinite(value)) return 0.1;
  return Math.min(500, Math.max(0.1, Math.round(value * 10) / 10));
};

export const calculateGasCheckout = (kilometers: number) => {
  const normalizedKilometers = normalizeKilometers(kilometers);
  const liters = normalizedKilometers / GAS_KM_PER_LITER;
  const total = liters * GAS_PRICE_PER_LITER_UYU + GAS_SERVICE_FEE_UYU;

  return {
    kilometers: normalizedKilometers,
    liters,
    totalUyu: Math.round(total * 100) / 100,
  };
};
