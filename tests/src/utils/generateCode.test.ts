import { describe, it, expect, vi, afterEach } from "vitest";
import { generateSixDigitCode } from "../../../src/utils/generateCode.util.ts";

describe("generateSixDigitCode", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("devuelve una cadena de exactamente seis dígitos", () => {
    const code = generateSixDigitCode();

    expect(typeof code).toBe("string");
    expect(code).toMatch(/^\d{6}$/);
  });

  it("devuelve un código entre 100000 y 999999", () => {
    const value = Number(generateSixDigitCode());

    expect(value).toBeGreaterThanOrEqual(100000);
    expect(value).toBeLessThanOrEqual(999999);
  });

  it("respeta los límites del rango (sin ceros a la izquierda)", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    expect(generateSixDigitCode()).toBe("100000");

    vi.spyOn(Math, "random").mockReturnValue(0.9999999999);
    expect(generateSixDigitCode()).toBe("999999");
  });

  it("genera códigos distintos entre llamadas", () => {
    const codes = new Set(
      Array.from({ length: 50 }, () => generateSixDigitCode()),
    );

    expect(codes.size).toBeGreaterThan(1);
  });
});