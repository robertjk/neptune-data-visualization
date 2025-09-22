interface ChartDataFull {
  x: Int32Array;
  y: Float64Array;
}

interface ChartDataSampled {
  x: number[];
  yAvg: number[];
  yMin: number[];
  yMax: number[];
}

function isChartDataSampled(
  chartData: ChartDataFull | ChartDataSampled
): chartData is ChartDataSampled {
  return "yAvg" in chartData;
}

interface DataAggregates {
  min: number;
  max: number;
  average: number;
  variance: number;
}

export {
  type ChartDataFull,
  type ChartDataSampled,
  isChartDataSampled,
  type DataAggregates,
};
