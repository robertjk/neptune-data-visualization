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

type ChartOptionsDispatch = (action: ChartOptionsAction) => void;

export { type ChartOptions, type ChartOptionsDispatch };
