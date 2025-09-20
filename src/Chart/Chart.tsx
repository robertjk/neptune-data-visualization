import UplotReact from "uplot-react";

import "uplot/dist/uPlot.min.css";

import type { ChartData } from "../DataSelector";
import type { ChartOptions } from "../OptionsControls";

import { useAnimation } from "./useAnimation";
import { useDisplayedData } from "./useDisplayedData";
import { UPLOT_OPTIONS } from "./Chart.config";
import "./Chart.css";

interface ChartProps {
  data?: ChartData;
  options: ChartOptions;
}

function Chart({ data, options }: ChartProps) {
  const { animationToggleLabel, dataStartIndex, toggleAnimation } =
    useAnimation(options);
  const displayedData = useDisplayedData(
    data,
    options.dataWindowSize,
    dataStartIndex
  );

  const isDataLoaded = Boolean(data);

  return (
    <>
      <button
        type="button"
        className="Chart-button"
        disabled={!isDataLoaded}
        onClick={toggleAnimation}
      >
        {animationToggleLabel}
      </button>
      {displayedData ? (
        <UplotReact data={displayedData} options={UPLOT_OPTIONS} />
      ) : (
        <p className="Chart-noData">You need to load data first</p>
      )}
    </>
  );
}

export { Chart, type ChartData };
