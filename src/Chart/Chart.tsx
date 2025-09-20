import { useMemo } from "react";
import UplotReact from "uplot-react";

import "uplot/dist/uPlot.min.css";

import type { ChartData } from "../DataSelector";
import type { ChartOptions } from "../OptionsControls";

import { UPLOT_OPTIONS } from "./Chart.config";
import "./Chart.css";

function extractData(
  data: ChartData | undefined,
  windowSize: number,
  leftIndex: number
): ChartData | undefined {
  if (!data) {
    return undefined;
  }

  const [dataX, dataY] = data;
  return [
    dataX.slice(leftIndex, leftIndex + windowSize),
    dataY.slice(leftIndex, leftIndex + windowSize),
  ];
}

interface ChartProps {
  data?: ChartData;
  options: ChartOptions;
}

function Chart({ data, options }: ChartProps) {
  const isDataLoaded = Boolean(data);

  const extractedData = useMemo(
    () => extractData(data, options.windowSize, options.leftIndex),
    [data, options.windowSize, options.leftIndex]
  );

  return (
    <>
      <button type="button" className="Chart-button" disabled={!isDataLoaded}>
        Start
      </button>
      {extractedData ? (
        <UplotReact data={extractedData} options={UPLOT_OPTIONS} />
      ) : (
        <p className="Chart-noData">You need to load data first</p>
      )}
    </>
  );
}

export { Chart, type ChartData };
