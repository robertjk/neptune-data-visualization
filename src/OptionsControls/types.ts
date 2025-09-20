interface ChartOptions {
  windowSize: number;
  leftIndex: number;
  refreshTime: number;
  refreshSize: number;
}

interface ChartOptionsAction {
  type: keyof ChartOptions;
  value: number;
}

export { type ChartOptions, type ChartOptionsAction };
