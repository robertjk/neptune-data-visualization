import { useMemo } from "react";

import type { ChartData } from "../DataSelector";
import type { ChartOptions } from "../OptionsControls";

function extractDisplayedData(
  data: ChartData | undefined,
  dataWindowSize: ChartOptions["dataWindowSize"],
  dataStartIndex: ChartOptions["dataStartIndex"]
): ChartData | undefined {
  if (!data) {
    return undefined;
  }

  const [dataX, dataY] = data;
  return [
    dataX.slice(dataStartIndex, dataStartIndex + dataWindowSize),
    dataY.slice(dataStartIndex, dataStartIndex + dataWindowSize),
  ];
}

function useDisplayedData(
  data: ChartData | undefined,
  options: ChartOptions
): ChartData | undefined {
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
