export const GAS_KM_PER_LITER = 12;
export const GAS_PRICE_PER_LITER_UYU = 88.03;
export const GAS_SERVICE_FEE_UYU = 5;

const roundToCents = (value: number) => Math.round(value * 100) / 100;

export const normalizeKilometers = (value: number) => {
  if (!Number.isFinite(value)) return 0.1;
  return Math.min(500, Math.max(0.1, Math.round(value * 10) / 10));
};

export const normalizePassengers = (value: number) => {
  if (!Number.isFinite(value)) return 2;
  return Math.max(2, Math.round(value));
};

export const calculateGasCheckout = (kilometers: number, passengers = 2) => {
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
