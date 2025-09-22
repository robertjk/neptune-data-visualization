import type { ChartDataFull } from "~/types";

import type { ChartDataParsed } from "./types";

function transformParsedData(data: ChartDataParsed): ChartDataFull {
  const dataLength = data.length;
  // IMPORTANT: SharedArrayBuffer used so that this data can be shared (not copied) between the main
  // thread and the WebWorker. It drastically improves the performance of data processing on large
  // data. It also needs proper cross-origin headers to be set by the server (see vite.config.js).
  const xBuffer = new SharedArrayBuffer(dataLength * 4);
  const yBuffer = new SharedArrayBuffer(dataLength * 8);
  const result = {
    x: new Int32Array(xBuffer),
    y: new Float64Array(yBuffer),
  };

  for (let idx = 0; idx < dataLength; idx += 1) {
    const [x, y] = data[idx];
    result.x[idx] = x;
    result.y[idx] = y;
  }

  return result;
}

export { transformParsedData };
