import type { AlignedData } from "uplot";
import UplotReact from "uplot-react";

import "uplot/dist/uPlot.min.css";

import type { ChartOptions } from "~/OptionsControls";

import { UPLOT_OPTIONS_FULL, UPLOT_OPTIONS_SAMPLED } from "./Chart.config";
import { DataAggregates } from "./DataAggregates";
import type { ChartDataFull } from "./types";
import { useChartWorker } from "./useChartWorker";
import { useDisplayedData } from "./useDisplayedData";
import { useSampledData } from "./useSampledData";

import "./Chart.css";

interface ChartProps {
  data: ChartDataFull;
  options: ChartOptions;
}

function Chart({ data, options }: ChartProps) {
  const displayedDataFull = useDisplayedData(data, options);
  const displayedDataSampled = useSampledData(displayedDataFull);
  const chartWorker = useChartWorker();

  const isDataDownsampled = displayedDataSampled !== undefined;

  const uplotData: AlignedData = isDataDownsampled
    ? [
        displayedDataSampled.x,
        displayedDataSampled.yAvg,
        displayedDataSampled.yMin,
        displayedDataSampled.yMax,
      ]
    : [displayedDataFull.x, displayedDataFull.y];
  const uplotOptions = isDataDownsampled
    ? UPLOT_OPTIONS_SAMPLED
    : UPLOT_OPTIONS_FULL;

  return (
    <div className="Chart">
      <UplotReact data={uplotData} options={uplotOptions} />
      <DataAggregates data={displayedDataFull} />
    </div>
  );
}

export { Chart, type ChartDataFull };
