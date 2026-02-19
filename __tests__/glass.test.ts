import { expect, test, describe } from "vitest";
import { hexToRgb } from "../app/constants";

describe("Logic Helpers", () => {
  test("hexToRgb should convert hex to correct RGB string", () => {
    expect(hexToRgb("#ffffff")).toBe("255, 255, 255");
    expect(hexToRgb("#000000")).toBe("0, 0, 0");
    expect(hexToRgb("#4f46e5")).toBe("79, 70, 229"); // Indigo-600
  });
});

describe("Preset Filtering Logic", () => {
  const mockPresets = [
    { id: 1, user_id: "user-123", color: "#ffffff" },
    { id: 2, user_id: "user-456", color: "#000000" },
  ];

  test("should filter only current user presets", () => {
    const userId = "user-123";
    const filtered = mockPresets.filter((p) => p.user_id === userId);

    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe(1);
  });
});
