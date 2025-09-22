import { useEffect, useRef } from "react";

function useChartWorker() {
  const chartWorker = useRef<Worker | undefined>(undefined);

  useEffect(() => {
    chartWorker.current = new Worker(
      new URL("./chartWorker", import.meta.url),
      {
        type: "module",
      }
    );
    chartWorker.current.postMessage("Initial message");
  }, []);

  return chartWorker;
}

export { useChartWorker };
