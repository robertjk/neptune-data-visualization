import type { AlignedData } from "uplot";
import UplotReact from "uplot-react";
import "uplot/dist/uPlot.min.css";

import {
  type ChartDataFull,
  type ChartDataSampled,
  isChartDataSampled,
  type DataAggregates as DataAggregatesType,
} from "~/types";

import { UPLOT_OPTIONS_FULL, UPLOT_OPTIONS_SAMPLED } from "./Chart.config";
import { DataAggregates } from "./DataAggregates";

import "./Chart.css";

interface ChartProps {
  data: ChartDataFull | ChartDataSampled;
  aggregates: DataAggregatesType;
}

function Chart({ data, aggregates }: ChartProps) {
  const isDataSampled = isChartDataSampled(data);

  const uplotData: AlignedData = isDataSampled
    ? [data.x, data.yAvg, data.yMin, data.yMax]
    : [data.x, data.y];
  const uplotOptions = isDataSampled
    ? UPLOT_OPTIONS_SAMPLED
    : UPLOT_OPTIONS_FULL;

  return (
    <div className="Chart">
      <UplotReact data={uplotData} options={uplotOptions} />
      <DataAggregates aggregates={aggregates} />
    </div>
  );
}

export { Chart };
