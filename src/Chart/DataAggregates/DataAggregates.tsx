import type { ChartDataFull } from "../types";

import {
  useDataAggregates,
  type DataAggregatesResult,
} from "./useDataAggregates";

import "./DataAggregates.css";

const VALUE_PRECISION = 3;

interface DataAggregatesProps {
  data: ChartDataFull;
}

const dataAggregatesLabels: Record<keyof DataAggregatesResult, string> = {
  min: "Min",
  max: "Max",
  average: "Average",
  variance: "Variance",
};

function DataAggregates({ data }: DataAggregatesProps) {
  const dataAggregates = useDataAggregates(data);

  const dataAggregatesFormatted = (
    Object.entries(dataAggregates) as [keyof DataAggregatesResult, number][]
  ).map(([name, value]) => [
    dataAggregatesLabels[name],
    value.toFixed(VALUE_PRECISION),
  ]);

  return (
    <ul className="DataAggregates-aggregates">
      {dataAggregatesFormatted.map(([name, value]) => (
        <li key={name} className="DataAggregates-aggregatesItem">
          <span className="DataAggregates-aggregatesName">{name}</span>: {value}
        </li>
      ))}
    </ul>
  );
}

export { DataAggregates };
