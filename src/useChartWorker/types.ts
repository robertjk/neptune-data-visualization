import type { ChartOptions } from "~/OptionsControls";
import type { ChartDataFull, ChartDataSampled } from "~/types";

import type { DataAggregates } from "./getDataAggregates";

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
