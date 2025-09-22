import type { DataAggregates as DataAggregatesType } from "../types";

import "./DataAggregates.css";

const VALUE_PRECISION = 3;

interface DataAggregatesProps {
  aggregates: DataAggregatesType;
}

const AGGREGATES_LABELS: Record<keyof DataAggregatesType, string> = {
  min: "Min",
  max: "Max",
  average: "Average",
  variance: "Variance",
};

function DataAggregates({ aggregates }: DataAggregatesProps) {
  const dataAggregatesFormatted = (
    Object.entries(aggregates) as [keyof DataAggregatesType, number][]
  ).map(([name, value]) => [
    AGGREGATES_LABELS[name],
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
