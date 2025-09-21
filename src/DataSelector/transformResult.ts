import type { ChartDataFull } from "~/Chart";

import type { DataParseResult } from "./types";

function transformResult(result: DataParseResult): ChartDataFull {
  return result.data.reduce<ChartDataFull>(
    (result, [x, y]) => {
      result.x.push(x);
      result.y.push(y);
      return result;
    },
    { x: [], y: [] }
  );
}

export { transformResult };
