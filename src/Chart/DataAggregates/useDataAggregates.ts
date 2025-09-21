import { useMemo } from "react";

import type { ChartDataFull } from "../types";

interface DataAggregatesResult {
  min: number;
  max: number;
  average: number;
  variance: number;
}

function getDataAggregates(data: ChartDataFull): DataAggregatesResult {
  const { y: dataY } = data;

  let min = Infinity;
  let max = -Infinity;
  let sum = 0;
  // Performance optimization: Traditional for loop is faster than for..of
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let idx = 0; idx < dataY.length; idx += 1) {
    const y = dataY[idx];
    min = Math.min(min, y);
    max = Math.max(max, y);
    sum += y;
  }
  const average = sum / dataY.length;

  let sumOfSquaredDifferences = 0;
  // Performance optimization: Traditional for loop is faster than for..of
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let idx = 0; idx < dataY.length; idx += 1) {
    const y = dataY[idx];
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

function useDataAggregates(data: ChartDataFull): DataAggregatesResult {
  return useMemo(() => getDataAggregates(data), [data]);
}

export { useDataAggregates, type DataAggregatesResult };
