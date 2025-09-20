import { useState } from "react";

import { AnimationControl } from "./AnimationControl";
import { Chart } from "./Chart";
import { DataSelector, type ChartData } from "./DataSelector";
import { OptionsControls, useOptionsReducer } from "./OptionsControls";

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
        <AnimationControl
          options={options}
          dispatchOptions={dispatchOptions}
          isDataLoaded={Boolean(data)}
        />
        {data ? (
          <Chart data={data} options={options} />
        ) : (
          <p className="App-noData">You need to load data first</p>
        )}
      </main>
    </>
  );
}

export default App;
