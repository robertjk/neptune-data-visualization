import type { ChartDataFull } from "~/types";

import type { ChartDataParsed } from "./types";

function transformParsedData(data: ChartDataParsed): ChartDataFull {
  const dataLength = data.length;
  const result = {
    x: new Int32Array(dataLength),
    y: new Float64Array(dataLength),
  };

  for (let idx = 0; idx < dataLength; idx += 1) {
    const [x, y] = data[idx];
    result.x[idx] = x;
    result.y[idx] = y;
  }

  return result;
}

export { transformParsedData };
