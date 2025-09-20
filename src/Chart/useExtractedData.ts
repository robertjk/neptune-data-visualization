import { useMemo } from "react";

import type { ChartData } from "../DataSelector";
import type { ChartOptions } from "../OptionsControls";

function extractData(
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

function useExtractedData(
  data: ChartData | undefined,
  windowSize: ChartOptions["windowSize"],
  leftIndex: number
): ChartData | undefined {
  return useMemo(
    () => extractData(data, windowSize, leftIndex),
    [data, windowSize, leftIndex]
  );
}

export { useExtractedData };
