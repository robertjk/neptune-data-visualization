import { useMemo } from "react";

import type { ChartData } from "~/DataSelector";
import type { ChartOptions } from "~/OptionsControls";

function extractDisplayedData(
  data: ChartData,
  dataWindowSize: ChartOptions["dataWindowSize"],
  dataStartIndex: ChartOptions["dataStartIndex"]
): ChartData {
  const [dataX, dataY] = data;
  return [
    dataX.slice(dataStartIndex, dataStartIndex + dataWindowSize),
    dataY.slice(dataStartIndex, dataStartIndex + dataWindowSize),
  ];
}

function useDisplayedData(data: ChartData, options: ChartOptions): ChartData {
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
