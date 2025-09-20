import UplotReact from "uplot-react";

import "uplot/dist/uPlot.min.css";

import type { ChartControlsValues } from "../ChartControls";

import { OPTIONS } from "./Chart.config";
import "./Chart.css";

function extractData(
  [dataX, dataY]: ChartData,
  windowSize: number,
  leftIndex: number
): ChartData {
  return [
    dataX.slice(leftIndex, leftIndex + windowSize),
    dataY.slice(leftIndex, leftIndex + windowSize),
  ];
}

type ChartData = [number[], number[]];

interface ChartProps {
  data: ChartData;
  controlsValues: ChartControlsValues;
}

function Chart({ data, controlsValues }: ChartProps) {
  const extractedData = extractData(
    data,
    controlsValues.windowSize,
    controlsValues.leftIndex
  );

  return (
    <>
      <UplotReact data={extractedData} options={OPTIONS} />
    </>
  );
}

export { Chart, type ChartData };
