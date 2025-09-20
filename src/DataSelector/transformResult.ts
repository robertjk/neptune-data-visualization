import type { ChartData, DataParseResult } from "./types";

function transformResult(result: DataParseResult): ChartData {
  return result.data.reduce<ChartData>(
    (result, [x, y]) => {
      const [resultX, resultY] = result;
      resultX.push(x);
      resultY.push(y);
      return result;
    },
    [[], []]
  );
}

export { transformResult };
