import { useMemo } from "react";

import type { ChartData } from "~/DataSelector";

interface DataAggregatesResult {
  min: number;
  max: number;
  average: number;
  variance: number;
}

function getDataAggregates(data: ChartData): DataAggregatesResult {
  const [, dataY] = data;

  let min = Infinity;
  let max = -Infinity;
  let sum = 0;
  for (const y of dataY) {
    if (y < min) {
      min = y;
    }
    if (y > max) {
      max = y;
    }
    sum += y;
  }
  const average = sum / dataY.length;

  let sumOfSquaredDifferences = 0;
  for (const y of dataY) {
    sumOfSquaredDifferences += (y - average) ** 2;
  }
  const variance = sumOfSquaredDifferences / dataY.length;

  return {
    min,
    max,
    average,
    variance,
  };
}

function useDataAggregates(data: ChartData): DataAggregatesResult {
  return useMemo(() => getDataAggregates(data), [data]);
}

export { useDataAggregates, type DataAggregatesResult };
