// Type-checking linting rules disabled, as react-papaparse doesn't expose proper typings
/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-assignment */

import { useCSVReader } from "react-papaparse";

import type { ChartDataFull } from "~/Chart";

import { transformResult } from "./transformResult";
import type { DataParseResult } from "./types";

import "./DataSelector.css";

const CONFIG = {
  skipEmptyLines: true,
  dynamicTyping: true,
  worker: true,
};

interface DataSelectorProps {
  onDataLoaded: (data: ChartDataFull) => void;
}

function DataSelector({ onDataLoaded }: DataSelectorProps) {
  const { CSVReader } = useCSVReader();

  function handleUploadAccepted(result: DataParseResult) {
    const chartData = transformResult(result);
    onDataLoaded(chartData);
  }

  return (
    <CSVReader onUploadAccepted={handleUploadAccepted} config={CONFIG}>
      {/* @ts-expect-error: react-papaparse doesn't expose proper typings */}
      {({ getRootProps, acceptedFile, ProgressBar }) => (
        <div className="DataSelector">
          <button
            type="button"
            {...getRootProps()}
            className="DataSelector-selectButton"
          >
            Browse file
          </button>
          <div className="DataSelector-fileName">{acceptedFile?.name}</div>
          <ProgressBar className="DataSelector-progressBar" />
        </div>
      )}
    </CSVReader>
  );
}

export { DataSelector };
