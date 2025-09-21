import type { ChartData } from "~/DataSelector";

import {
  useDataAggregates,
  type DataAggregatesResult,
} from "./useDataAggregates";

import "./DataAggregates.css";

interface DataAggregatesProps {
  data: ChartData;
}

const dataAggregatesLabels: Record<keyof DataAggregates, string> = {
  min: "Min",
  max: "Max",
  average: "Average",
  variance: "Variance",
};

function DataAggregates({ data }: DataAggregatesProps) {
  const dataAggregates = useDataAggregates(data);

  const dataAggregatesFormatted = (
    Object.entries(dataAggregates) as [keyof DataAggregatesResult, number][]
  ).map(([name, value]) => [dataAggregatesLabels[name], value.toFixed(2)]);

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
