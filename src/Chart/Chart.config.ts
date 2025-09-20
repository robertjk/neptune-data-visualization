const UPLOT_OPTIONS = {
  width: 800,
  height: 600,
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
      label: "X",
      stroke: "white",
      grid: {
        show: true,
        stroke: "rgba(255, 255, 255, 0.87)",
        width: 1,
      },
    },
    {
      show: true,
      label: "Y",
      stroke: "white",
      grid: {
        show: true,
        stroke: "rgba(255, 255, 255, 0.87)",
        width: 1,
      },
    },
  ],
};

export { UPLOT_OPTIONS };
