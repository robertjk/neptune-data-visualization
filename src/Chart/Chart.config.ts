import type { Options } from "uplot";

const UPLOT_OPTIONS_COMMON = {
  width: 800,
  height: 600,
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
      stroke: "white",
      grid: {
        show: true,
        stroke: "rgba(255, 255, 255, 0.87)",
        width: 1,
      },
    },
    {
      show: true,
      stroke: "white",
      grid: {
        show: true,
        stroke: "rgba(255, 255, 255, 0.87)",
        width: 1,
      },
    },
  ],
};

const UPLOT_OPTIONS_FULL: Options = {
  ...UPLOT_OPTIONS_COMMON,
  series: [
    {
      label: "X",
    },
    {
      label: "Y",
      stroke: "#4bcff0",
      width: 1,
    },
  ],
};

const UPLOT_OPTIONS_SAMPLED: Options = {
  ...UPLOT_OPTIONS_COMMON,
  series: [
    {
      label: "X",
    },
    {
      label: "Y avg",
      stroke: "#4bcff0",
      width: 1,
    },
    {
      label: "Y min",
      width: 1,
    },
    {
      label: "Y max",
      width: 1,
    },
  ],
  bands: [
    {
      series: [1, 2],
      fill: "rgba(255, 255, 255, 0.2)",
    },
    {
      series: [3, 1],
      fill: "rgba(255, 255, 255, 0.2)",
    },
  ],
};

export { UPLOT_OPTIONS_FULL, UPLOT_OPTIONS_SAMPLED };
