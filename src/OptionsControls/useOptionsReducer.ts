import { useReducer } from "react";

import type { ChartOptions, ChartOptionsAction } from "./types";

const OPTIONS_INITIAL = {
  windowSize: 100,
  startIndex: 0,
  refreshTime: 500,
  refreshIndexShift: 10,
};

function optionsReducer(
  state: ChartOptions,
  action: ChartOptionsAction
): ChartOptions {
  return { ...state, [action.type]: action.value };
}

function useOptionsReducer() {
  return useReducer(optionsReducer, OPTIONS_INITIAL);
}

export { useOptionsReducer };
