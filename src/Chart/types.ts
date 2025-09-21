interface ChartDataFull {
  x: number[];
  y: number[];
}

interface ChartDataSampled {
  xAvg: number[];
  yAvg: number[];
  yMin: number[];
  yMax: number[];
}

export { type ChartDataFull, type ChartDataSampled };
