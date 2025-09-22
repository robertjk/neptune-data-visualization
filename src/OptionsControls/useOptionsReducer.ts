import { useReducer } from "react";

import type { ChartOptions, ChartOptionsAction } from "./types";

const SCHEMA = {
  dataWindowSize: {
    min: 2,
    max: Infinity,
  },
  dataStartIndex: {
    min: 0,
    max: Infinity,
  },
  refreshTime: {
    min: 8,
    max: Infinity,
  },
  refreshIndexShift: {
    min: 1,
    max: Infinity,
  },
};

const OPTIONS_INITIAL: ChartOptions = {
  dataWindowSize: 100,
  dataStartIndex: 0,
  refreshTime: 500,
  refreshIndexShift: 10,
};

function optionsReducer(
  state: ChartOptions,
  action: ChartOptionsAction
): ChartOptions {
  const { type, value } = action;
  const { min, max } = SCHEMA[type];

  if (value < min) {
    return { ...state, [type]: min };
  }
  if (value > max) {
    return { ...state, [type]: max };
  }
  return { ...state, [type]: value };
}

function useOptionsReducer() {
  return useReducer(optionsReducer, OPTIONS_INITIAL);
}

export { useOptionsReducer };
