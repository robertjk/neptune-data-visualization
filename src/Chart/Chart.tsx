import UplotReact from "uplot-react";

import "uplot/dist/uPlot.min.css";

import { ChartControls } from "./ChartControls";

import "./Chart.css";

const OPTIONS = {
  width: 800,
  height: 600,
  series: [
    {
      label: "X",
    },
    {
      label: "Y",
      stroke: "blue",
      width: 3,
    },
  ],
  scales: {
    x: {
      time: false,
    },
    y: {
      auto: true,
    },
  },
  axes: [
    {
      show: true,
      label: "X Axis",
      stroke: "white",
      grid: {
        show: true,
        stroke: "rgba(255, 255, 255, 0.87)",
        width: 1,
      },
    },
    {
      show: true,
      label: "Y Axis",
      stroke: "white",
      grid: {
        show: true,
        stroke: "rgba(255, 255, 255, 0.87)",
        width: 1,
      },
    },
  ],
};

type ChartData = [number[], number[]];

interface ChartProps {
  data?: ChartData;
}

function Chart({ data }: ChartProps) {
  console.log("data:", data);

  return (
    <>
      <ChartControls />
      {data ? (
        <UplotReact data={data} options={OPTIONS} />
      ) : (
        <p className="Chart-noData">You need to load data first</p>
      )}
    </>
  );
}

export { Chart, type ChartData };
