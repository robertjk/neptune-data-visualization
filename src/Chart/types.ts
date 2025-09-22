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

export { type ChartDataFull, type ChartDataSampled };
