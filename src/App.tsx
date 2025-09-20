import { useState } from "react";

import { Chart } from "./Chart";
import { DataSelector, type ChartData } from "./DataSelector";

import "./App.css";

function App() {
  const [data, setData] = useState<ChartData | undefined>(undefined);

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
        <Chart data={data} />
      </main>
    </>
  );
}

export default App;
