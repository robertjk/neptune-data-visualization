import { useEffect, useRef, useState } from "react";

import type { ChartOptions } from "~/OptionsControls";

import type { WorkerResponseData, WorkerRequestData } from "./types";
import type { ChartDataFull } from "~/Chart";

type ProcessedData = WorkerResponseData;

function useChartWorker(
  inputData: ChartDataFull | undefined,
  options: ChartOptions
): ProcessedData | undefined {
  const [processedData, setProcessedData] = useState<ProcessedData | undefined>(
    undefined
  );
  const chartWorker = useRef<Worker | undefined>(undefined);

  useEffect(initializeWorker, []);
  useEffect(submitDataProcessingRequest, [
    inputData,
    options.dataWindowSize,
    options.dataStartIndex,
  ]);

  function initializeWorker() {
    chartWorker.current = new Worker(
      new URL("./chartWorker", import.meta.url),
      { type: "module" }
    );
    chartWorker.current.addEventListener("message", handleDataProcessingResult);

    return () => {
      chartWorker.current?.terminate();
    };
  }

  function submitDataProcessingRequest() {
    if (inputData) {
      const message: WorkerRequestData = {
        inputData,
        dataWindowSize: options.dataWindowSize,
        dataStartIndex: options.dataStartIndex,
      };
      chartWorker.current?.postMessage(message);
    }
  }

  function handleDataProcessingResult(event: MessageEvent<WorkerResponseData>) {
    setProcessedData(event.data);
  }

  return processedData;
}

export { useChartWorker, type ProcessedData };
