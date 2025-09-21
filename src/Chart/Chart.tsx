import UplotReact from "uplot-react";

import "uplot/dist/uPlot.min.css";

import type { ChartData } from "~/DataSelector";
import type { ChartOptions } from "~/OptionsControls";

import { useDataAggregates } from "./useDataAggregates";
import { useDisplayedData } from "./useDisplayedData";
import { UPLOT_OPTIONS } from "./Chart.config";

import "./Chart.css";

interface ChartProps {
  data: ChartData;
  options: ChartOptions;
}

function Chart({ data, options }: ChartProps) {
  const displayedData = useDisplayedData(data, options);
  const dataAggregates = useDataAggregates(displayedData);

  return (
    <div className="Chart">
      <UplotReact data={displayedData} options={UPLOT_OPTIONS} />
      <ul className="Chart-aggregates">
        {dataAggregates.map(([name, value]) => (
          <li key={name} className="Chart-aggregatesItem">
            <span className=" Chart-aggregatesName">{name}:</span> {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Chart, type ChartData };
