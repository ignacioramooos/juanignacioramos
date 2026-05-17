import { describe, expect, it } from "vitest";
import { calculateGasCheckout, normalizeKilometers } from "./gas";

describe("gas checkout pricing", () => {
  it("calculates liters and UYU total from kilometers", () => {
    expect(calculateGasCheckout(12)).toEqual({
      kilometers: 12,
      liters: 1,
      totalUyu: 93.03,
    });
  });

  it("rounds kilometer input to the nearest 0.1 km", () => {
    expect(normalizeKilometers(3.26)).toBe(3.3);
  });

  it("keeps checkout amounts inside supported bounds", () => {
    expect(calculateGasCheckout(-10).kilometers).toBe(0.1);
    expect(calculateGasCheckout(999).kilometers).toBe(500);
  });
});
