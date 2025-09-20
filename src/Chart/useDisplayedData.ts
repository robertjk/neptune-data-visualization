import { useMemo } from "react";

import type { ChartData } from "../DataSelector";
import type { ChartOptions } from "../OptionsControls";

function extractDisplayedData(
  data: ChartData | undefined,
  windowSize: number,
  startIndex: number
): ChartData | undefined {
  if (!data) {
    return undefined;
  }

  const [dataX, dataY] = data;
  return [
    dataX.slice(startIndex, startIndex + windowSize),
    dataY.slice(startIndex, startIndex + windowSize),
  ];
}

function useDisplayedData(
  data: ChartData | undefined,
  windowSize: ChartOptions["dataWindowSize"],
  leftIndex: number
): ChartData | undefined {
  return useMemo(
    () => extractDisplayedData(data, windowSize, leftIndex),
    [data, windowSize, leftIndex]
  );
}

export { useDisplayedData };
