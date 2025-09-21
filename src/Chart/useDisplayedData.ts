import { useMemo } from "react";

import type { ChartOptions } from "~/OptionsControls";
import type { ChartDataFull } from "./types";

function extractDisplayedData(
  data: ChartDataFull,
  dataWindowSize: ChartOptions["dataWindowSize"],
  dataStartIndex: ChartOptions["dataStartIndex"]
): ChartDataFull {
  const dataEndIndex = dataStartIndex + dataWindowSize;
  return {
    x: data.x.slice(dataStartIndex, dataEndIndex),
    y: data.y.slice(dataStartIndex, dataEndIndex),
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
