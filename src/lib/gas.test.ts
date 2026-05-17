import { describe, expect, it } from "vitest";
import {
  calculateGasCheckout,
  normalizeCustomAmount,
  normalizeKilometers,
  normalizePassengers,
} from "./gas";

describe("gas checkout pricing", () => {
  it("calculates liters and split UYU total from kilometers and passengers", () => {
    expect(calculateGasCheckout(12, 2)).toEqual({
      kilometers: 12,
      passengers: 2,
      liters: 1,
      gasTotalUyu: 93.03,
      totalUyu: 49.02,
    });
  });

  it("rounds kilometer input to the nearest 0.1 km", () => {
    expect(normalizeKilometers(3.26)).toBe(3.3);
  });

  it("keeps checkout amounts inside supported bounds", () => {
    expect(calculateGasCheckout(-10).kilometers).toBe(0.1);
    expect(calculateGasCheckout(999).kilometers).toBe(150);
  });

  it("keeps passenger count at a minimum of 1", () => {
    expect(normalizePassengers(0)).toBe(1);
    expect(normalizePassengers(3.4)).toBe(3);
  });

  it("clamps and rounds custom amounts", () => {
    expect(normalizeCustomAmount(0)).toBe(1);
    expect(normalizeCustomAmount(100.456)).toBe(100.46);
    expect(normalizeCustomAmount(99999)).toBe(50000);
    expect(normalizeCustomAmount(Number.NaN)).toBe(1);
  });
});
