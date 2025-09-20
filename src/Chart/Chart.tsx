import UplotReact from "uplot-react";

import "uplot/dist/uPlot.min.css";

import type { ChartData } from "../DataSelector";
import type { ChartOptions } from "../OptionsControls";

import { useExtractedData } from "./useExtractedData";
import { useAnimation } from "./useAnimation";
import { UPLOT_OPTIONS } from "./Chart.config";
import "./Chart.css";

interface ChartProps {
  data?: ChartData;
  options: ChartOptions;
}

function Chart({ data, options }: ChartProps) {
  const { animationToggleLabel, leftIndex, toggleAnimation } =
    useAnimation(options);
  const extractedData = useExtractedData(data, options.windowSize, leftIndex);

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
      {extractedData ? (
        <UplotReact data={extractedData} options={UPLOT_OPTIONS} />
      ) : (
        <p className="Chart-noData">You need to load data first</p>
      )}
    </>
  );
}

export { Chart, type ChartData };
