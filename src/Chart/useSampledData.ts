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
    x: new Array<number>(DATA_MAX_SIZE),
    yAvg: new Array<number>(DATA_MAX_SIZE),
    yMin: new Array<number>(DATA_MAX_SIZE),
    yMax: new Array<number>(DATA_MAX_SIZE),
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

    const x = Math.round((data.x[startIdx] + data.x[endIdx - 1]) / 2);
    const yAvg = ySum / (endIdx - startIdx);

    result.x[sampleIdx] = x;
    result.yAvg[sampleIdx] = yAvg;
    result.yMin[sampleIdx] = yMin;
    result.yMax[sampleIdx] = yMax;
  }

  return result;
}

function useSampledData(data: ChartDataFull): ChartDataSampled | undefined {
  return useMemo(() => downsampleData(data), [data]);
}

export { useSampledData };
