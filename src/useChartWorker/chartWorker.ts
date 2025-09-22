// WebWorker handling computational-heavy tasks from the Chart component

import { downsampleData } from "./downsampleData";
import { extractDisplayedData } from "./extractDisplayedData";
import { getDataAggregates } from "./getDataAggregates";
import type { WorkerRequestData, WorkerResponseData } from "./types";

function handleDataProcessingRequest(event: MessageEvent<WorkerRequestData>) {
  const { inputData, dataWindowSize, dataStartIndex } = event.data;

  const displayedData = extractDisplayedData(
    inputData,
    dataWindowSize,
    dataStartIndex
  );
  const sampledData = downsampleData(displayedData);
  const dataAggregates = getDataAggregates(displayedData);

  const message: WorkerResponseData = {
    displayedData: sampledData ?? displayedData,
    dataAggregates,
  };
  self.postMessage(message);
}

self.addEventListener("message", handleDataProcessingRequest);
