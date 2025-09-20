interface ChartOptions {
  dataWindowSize: number;
  dataStartIndex: number;
  refreshTime: number;
  refreshIndexShift: number;
}

interface ChartOptionsAction {
  type: keyof ChartOptions;
  value: number;
}

export { type ChartOptions, type ChartOptionsAction };
