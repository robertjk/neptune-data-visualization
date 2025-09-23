import { useState } from "react";

import { AnimationControl } from "./AnimationControl";
import { Chart, type ChartDataFull } from "./Chart";
import { DataSelector } from "./DataSelector";
import { OptionsControls, useOptionsReducer } from "./OptionsControls";
import { useChartWorker } from "./useChartWorker";

import "./App.css";

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
          inputData={inputData}
        />
        <Chart processedData={processedData} />
      </main>
    </>
  );
}

export default App;
