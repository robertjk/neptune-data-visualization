import { useMemo } from "react";

import type { ChartData } from "../DataSelector";

interface DataAggregates {
  min: number;
  max: number;
  average: number;
  variance: number;
}

type DataAggregatesFormatted = {
  [key in keyof DataAggregates]: string;
};

function getDataAggregates(data: ChartData): DataAggregates {
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

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDataAggregates(
  aggregates: DataAggregates
): DataAggregatesFormatted {
  const aggregatesList = Object.entries(aggregates) as [
    keyof DataAggregates,
    number
  ][];

  const aggregatesFormatted = aggregatesList.map(
    ([name, value]: [keyof DataAggregates, number]) => [
      capitalize(name),
      value.toFixed(3),
    ]
  );

  return aggregatesFormatted;
}

function useDataAggregates(data: ChartData): DataAggregatesFormatted {
  return useMemo(() => {
    const dataAggregates = getDataAggregates(data);
    return formatDataAggregates(dataAggregates);
  }, [data]);
}

export { useDataAggregates, type DataAggregates };
