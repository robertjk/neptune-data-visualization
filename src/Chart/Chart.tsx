import { useReducer } from "react";
import UplotReact from "uplot-react";

import "uplot/dist/uPlot.min.css";

import {
  ChartControls,
  type ChartControlsValues,
  type ChartControlValuesAction,
} from "./ChartControls";
import { CONTROLS_VALUES_INITIAL, OPTIONS } from "./Chart.config";

import "./Chart.css";

function controlsValuesReducer(
  state: ChartControlsValues,
  action: ChartControlValuesAction
): ChartControlsValues {
  return { ...state, [action.type]: action.value };
}

type ChartData = [number[], number[]];

interface ChartProps {
  data?: ChartData;
}

function Chart({ data }: ChartProps) {
  const [controlsValues, dispatchControlsValues] = useReducer(
    controlsValuesReducer,
    CONTROLS_VALUES_INITIAL
  );

  return (
    <>
      <ChartControls
        values={controlsValues}
        dispatchValues={dispatchControlsValues}
      />
      {data ? (
        <UplotReact data={data} options={OPTIONS} />
      ) : (
        <p className="Chart-noData">You need to load data first</p>
      )}
    </>
  );
}

export { Chart, type ChartData };
