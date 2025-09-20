import { useReducer, useState } from "react";

import { Chart } from "./Chart";
import {
  ChartControls,
  CONTROLS_VALUES_INITIAL,
  type ChartControlsValues,
  type ChartControlValuesAction,
} from "./ChartControls";
import { DataSelector, type ChartData } from "./DataSelector";

import "./App.css";

function controlsValuesReducer(
  state: ChartControlsValues,
  action: ChartControlValuesAction
): ChartControlsValues {
  return { ...state, [action.type]: action.value };
}

function App() {
  const [data, setData] = useState<ChartData | undefined>(undefined);

  const [controlsValues, dispatchControlsValues] = useReducer(
    controlsValuesReducer,
    CONTROLS_VALUES_INITIAL
  );

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
        <ChartControls
          values={controlsValues}
          dispatchValues={dispatchControlsValues}
        />
        {data ? (
          <Chart data={data} controlsValues={controlsValues} />
        ) : (
          <p className="App-noData">You need to load data first</p>
        )}
      </main>
    </>
  );
}

export default App;
