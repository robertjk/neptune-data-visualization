import { useMemo } from "react";

import type { ChartData } from "../DataSelector";

interface DataAggregates {
  min: number;
  max: number;
  average: number;
  variance: number;
}

type DataAggregatesCapitalizedKeys = Capitalize<keyof DataAggregates>;
type DataAggregatesFormattedList = [DataAggregatesCapitalizedKeys, string][];

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

function capitalize(str: keyof DataAggregates): DataAggregatesCapitalizedKeys {
  return (str.charAt(0).toUpperCase() +
    str.slice(1)) as DataAggregatesCapitalizedKeys;
}

function formatDataAggregates(
  aggregates: DataAggregates
): DataAggregatesFormattedList {
  const aggregatesList = Object.entries(aggregates) as [
    keyof DataAggregates,
    number
  ][];

  const aggregatesFormattedList = aggregatesList.map<
    [DataAggregatesCapitalizedKeys, string]
  >(([name, value]) => [capitalize(name), value.toFixed(3)]);

  return aggregatesFormattedList;
}

function useDataAggregates(data: ChartData): DataAggregatesFormattedList {
  return useMemo(() => {
    const dataAggregates = getDataAggregates(data);
    return formatDataAggregates(dataAggregates);
  }, [data]);
}

export { useDataAggregates, type DataAggregates };
