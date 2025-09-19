import UplotReact from "uplot-react";

import "uplot/dist/uPlot.min.css";

const OPTIONS = {
  width: 800,
  height: 600,
  id: "chart",
  series: [
    {
      label: "X",
    },
    {
      label: "Y1",
      stroke: "blue",
      width: 3,
    },
    {
      label: "Y2",
      stroke: "green",
      width: 7,
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
        stroke: "white",
        width: 1,
      },
    },
    {
      show: true,
      label: "Y Axis",
      stroke: "white",
      grid: {
        show: true,
        stroke: "white",
        width: 1,
      },
    },
  ],
};

function Chart() {
  return (
    <>
      <UplotReact
        data={[
          [0, 1, 2, 3, 4, 5, 6],
          [0, 1, 4, 9, 16, 25, 36],
          [0, null, 14, null, 26, null, 50],
        ]}
        options={OPTIONS}
      />
    </>
  );
}

export { Chart };
