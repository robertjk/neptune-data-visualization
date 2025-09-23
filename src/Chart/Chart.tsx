import type { AlignedData } from "uplot";
import UplotReact from "uplot-react";
import "uplot/dist/uPlot.min.css";

import type { ProcessedData } from "~/useChartWorker";

import { UPLOT_OPTIONS_FULL, UPLOT_OPTIONS_SAMPLED } from "./Chart.config";
import { DataAggregates } from "./DataAggregates";
import { isChartDataSampled } from "./types";

import "./Chart.css";

interface ChartProps {
  processedData?: ProcessedData;
}

function Chart({ processedData }: ChartProps) {
  if (!processedData) {
    return <p className="App-noData">You need to load data first</p>;
  }

  const { displayedData, dataAggregates } = processedData;
  const isDataSampled = isChartDataSampled(displayedData);

  const uplotData: AlignedData = isDataSampled
    ? [
        displayedData.x,
        displayedData.yAvg,
        displayedData.yMin,
        displayedData.yMax,
      ]
    : [displayedData.x, displayedData.y];
  const uplotOptions = isDataSampled
    ? UPLOT_OPTIONS_SAMPLED
    : UPLOT_OPTIONS_FULL;

  return (
    <div className="Chart">
      <UplotReact data={uplotData} options={uplotOptions} />
      <DataAggregates aggregates={dataAggregates} />
    </div>
  );
}

export { Chart };
