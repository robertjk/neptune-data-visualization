import { useState } from "react";

import { Chart } from "./Chart";
import { OptionsControls, useOptionsReducer } from "./OptionsControls";
import { DataSelector, type ChartData } from "./DataSelector";

import "./App.css";

function App() {
  const [data, setData] = useState<ChartData | undefined>(undefined);
  const [options, dispatchOptions] = useOptionsReducer();

  function handleDataLoaded(loadedData: ChartData) {
    setData(loadedData);
  }

  return (
    <>
      <header>
        <h1>Neptune Data Visualization</h1>
      </header>
      <main className="App-main">
        <DataSelector onDataLoaded={handleDataLoaded} />
        <OptionsControls options={options} dispatchOptions={dispatchOptions} />
        <Chart data={data} options={options} />
      </main>
    </>
  );
}

export default App;
