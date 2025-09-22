import type { ChartDataFull } from "~/types";
import type { ChartOptions } from "~/OptionsControls";

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

export { extractDisplayedData };
