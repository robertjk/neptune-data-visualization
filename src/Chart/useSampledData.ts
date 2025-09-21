import { useMemo } from "react";

import type { ChartDataFull, ChartDataSampled } from "./types";

// Maximum number of points to display without downsampling. When downsampling, the resulting data
// will have that size.
const DATA_MAX_SIZE = 1000;

function downsampleData(data: ChartDataFull): ChartDataSampled | undefined {
  const dataLength = data.x.length;
  if (dataLength <= DATA_MAX_SIZE) {
    return undefined;
  }

  const result: ChartDataSampled = {
    xAvg: [],
    yAvg: [],
    yMin: [],
    yMax: [],
  };

  for (let sampleIdx = 0; sampleIdx < DATA_MAX_SIZE; sampleIdx += 1) {
    let yMin = Infinity;
    let yMax = -Infinity;
    let ySum = 0;

    const startIdx = Math.floor((sampleIdx * dataLength) / DATA_MAX_SIZE);
    const nextStartIdx = Math.floor(
      ((sampleIdx + 1) * dataLength) / DATA_MAX_SIZE
    );
    const endIdx = Math.min(nextStartIdx, dataLength);

    for (let dataIdx = startIdx; dataIdx < endIdx; dataIdx += 1) {
      const yData = data.y[dataIdx];
      yMin = Math.min(yMin, yData);
      yMax = Math.max(yMax, yData);
      ySum += yData;
    }

    const xAvg = (data.x[startIdx] + data.x[endIdx - 1]) / 2;
    const yAvg = ySum / (endIdx - startIdx);

    result.xAvg.push(xAvg);
    result.yAvg.push(yAvg);
    result.yMin.push(yMin);
    result.yMax.push(yMax);
  }

  return result;
}

function useSampledData(data: ChartDataFull): ChartDataSampled | undefined {
  return useMemo(() => downsampleData(data), [data]);
}

export { useSampledData };
