// Type-checking linting rules disabled, as react-papaparse doesn't expose proper typings
/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-assignment */

import type { ParseResult } from "papaparse";
import { useCSVReader } from "react-papaparse";

import { transformParsedData } from "./transformParsedData";
import type { ChartDataParsedRow } from "./types";

import "./DataSelector.css";
import type { ChartDataFull } from "~/types";

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

  function handleUploadAccepted(result: ParseResult<ChartDataParsedRow>) {
    const chartData = transformParsedData(result.data);
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
