import { useMemo } from "react";

import type { ChartOptions } from "~/OptionsControls";
import type { ChartDataFull } from "./types";

function extractDisplayedData(
  data: ChartDataFull,
  dataWindowSize: ChartOptions["dataWindowSize"],
  dataStartIndex: ChartOptions["dataStartIndex"]
): ChartDataFull {
  const dataEndIndex = dataStartIndex + dataWindowSize;

  // Performance optimization: Return original if showing all data
  if (dataStartIndex === 0 && dataEndIndex >= data.x.length) {
    return data;
  }

  return {
    x: data.x.subarray(dataStartIndex, dataEndIndex),
    y: data.y.subarray(dataStartIndex, dataEndIndex),
  };
}

function useDisplayedData(
  data: ChartDataFull,
  options: ChartOptions
): ChartDataFull {
  return useMemo(
    () =>
      extractDisplayedData(
        data,
        options.dataWindowSize,
        options.dataStartIndex
      ),
    [data, options.dataWindowSize, options.dataStartIndex]
  );
}

export { useDisplayedData };
