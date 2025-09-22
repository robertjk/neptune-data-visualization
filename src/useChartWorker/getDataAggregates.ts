import type { ChartDataFull, DataAggregates } from "~/types";

function getDataAggregates(data: ChartDataFull): DataAggregates {
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

export { getDataAggregates, type DataAggregates };
