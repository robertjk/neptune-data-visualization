// Type-checking linting rules disabled, as react-papaparse doesn't expose proper typings
/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access,
   @typescript-eslint/no-unsafe-assignment */

import { type ParseResult } from "papaparse";
import { useCSVReader } from "react-papaparse";

import "./DataSelector.css";

const CONFIG = { dynamicTyping: true };

type ChartDataRow = [number, number];
type ChartData = ChartDataRow[];

interface DataSelectorProps {
  onDataLoaded: (data: ChartData) => void;
}

function DataSelector({ onDataLoaded }: DataSelectorProps) {
  const { CSVReader } = useCSVReader();

  function handleUploadAccepted(result: ParseResult<ChartDataRow>) {
    onDataLoaded(result.data);
  }

  return (
    <CSVReader onUploadAccepted={handleUploadAccepted} config={CONFIG}>
      {/* @ts-expect-error: react-papaparse doesn't expose proper typings */}
      {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
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

export { DataSelector, type ChartData };
