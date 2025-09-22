import type { ChartDataFull, ChartDataSampled, DataAggregates } from "~/Chart";
import type { ChartOptions } from "~/OptionsControls";

interface WorkerRequestData {
  inputData: ChartDataFull;
  dataWindowSize: ChartOptions["dataWindowSize"];
  dataStartIndex: ChartOptions["dataStartIndex"];
}

interface WorkerResponseData {
  displayedData: ChartDataFull | ChartDataSampled;
  dataAggregates: DataAggregates;
}

export type { WorkerRequestData, WorkerResponseData };
