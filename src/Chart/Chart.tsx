import UplotReact from "uplot-react";

import "uplot/dist/uPlot.min.css";

import type { ChartData } from "~/DataSelector";
import type { ChartOptions } from "~/OptionsControls";

import { useDisplayedData } from "./useDisplayedData";
import { DataAggregates } from "./DataAggregates";
import { UPLOT_OPTIONS } from "./Chart.config";

import "./Chart.css";

interface ChartProps {
  data: ChartData;
  options: ChartOptions;
}

function Chart({ data, options }: ChartProps) {
  const displayedData = useDisplayedData(data, options);

  return (
    <div className="Chart">
      <UplotReact data={displayedData} options={UPLOT_OPTIONS} />
      <DataAggregates data={displayedData} />
    </div>
  );
}

export { Chart, type ChartData };
