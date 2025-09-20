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

const CONTROLS_VALUES_INITIAL = {
  windowSize: 100,
  leftIndex: 0,
  refreshTime: 500,
  refreshSize: 10,
};

export { OPTIONS, CONTROLS_VALUES_INITIAL };
