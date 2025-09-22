import { useState } from "react";

import { AnimationControl } from "./AnimationControl";
import { Chart } from "./Chart";
import { DataSelector } from "./DataSelector";
import { OptionsControls, useOptionsReducer } from "./OptionsControls";
import type { ChartDataFull } from "./types";

import "./App.css";
import { useChartWorker } from "./useChartWorker";

function App() {
  const [inputData, setInputData] = useState<ChartDataFull | undefined>(
    undefined
  );
  const [options, dispatchOptions] = useOptionsReducer();
  const processedData = useChartWorker(inputData, options);

  function handleDataLoaded(loadedData: ChartDataFull) {
    setInputData(loadedData);
  }

  return (
    <>
      <header>
        <h1>Neptune Data Visualization</h1>
      </header>
      <main className="App-main">
        <DataSelector onDataLoaded={handleDataLoaded} />
        <OptionsControls options={options} dispatchOptions={dispatchOptions} />
        <AnimationControl
          options={options}
          dispatchOptions={dispatchOptions}
          data={inputData}
        />
        {processedData ? (
          <Chart
            data={processedData.displayedData}
            aggregates={processedData.dataAggregates}
          />
        ) : (
          <p className="App-noData">You need to load data first</p>
        )}
      </main>
    </>
  );
}

export default App;
