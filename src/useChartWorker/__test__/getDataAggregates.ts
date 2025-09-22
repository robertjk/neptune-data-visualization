import { describe, expect, test } from "vitest";

import { getDataAggregates } from "../getDataAggregates";

describe("Calculates proper aggregates", () => {
  test("for simple data", () => {
    const result = getDataAggregates({
      x: new Int32Array([]),
      y: new Float64Array([1, 2, 3, 4, 5]),
    });
    expect(result).toEqual({
      min: 1,
      max: 5,
      average: 3,
      variance: 2,
    });
  });

  test("for data mixing positive and negative values", () => {
    const result = getDataAggregates({
      x: new Int32Array([]),
      y: new Float64Array([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]),
    });
    expect(result).toEqual({
      min: -5,
      max: 5,
      average: 0,
      variance: 10,
    });
  });

  test("for data with a single value", () => {
    const result = getDataAggregates({
      x: new Int32Array([]),
      y: new Float64Array([101]),
    });
    expect(result).toEqual({
      min: 101,
      max: 101,
      average: 101,
      variance: 0,
    });
  });
});
