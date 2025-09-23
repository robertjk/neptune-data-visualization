import type { ChartOptions, ChartOptionsDispatch } from "./types";

import "./OptionsControls.css";
import { OPTIONS_SCHEMA } from "./useOptionsReducer";

interface OptionsControlsProps {
  options: ChartOptions;
  dispatchOptions: ChartOptionsDispatch;
}

function OptionsControls({
  options: values,
  dispatchOptions: dispatchValues,
}: OptionsControlsProps) {
  function createChangeHandler(type: keyof ChartOptions) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      dispatchValues({ type, value });
    };
  }

  return (
    <form className="OptionsControls">
      <label className="OptionsControls-field">
        Data window size (N):
        <input
          type="number"
          name="dataWindowSize"
          min={OPTIONS_SCHEMA.dataWindowSize.min}
          value={values.dataWindowSize}
          onChange={createChangeHandler("dataWindowSize")}
          className="OptionsControls-input"
        />
      </label>
      <label className="OptionsControls-field">
        Data start index (S):
        <input
          type="number"
          min={OPTIONS_SCHEMA.dataStartIndex.min}
          name="dataStartIndex"
          value={values.dataStartIndex}
          onChange={createChangeHandler("dataStartIndex")}
          className="OptionsControls-input"
        />
      </label>
      <label className="OptionsControls-field">
        Refresh time [ms] (T):
        <input
          type="number"
          min={OPTIONS_SCHEMA.refreshTime.min}
          name="refreshTime"
          value={values.refreshTime}
          onChange={createChangeHandler("refreshTime")}
          className="OptionsControls-input"
        />
      </label>
      <label className="OptionsControls-field">
        Refresh index shift (P):
        <input
          type="number"
          min={OPTIONS_SCHEMA.refreshIndexShift.min}
          name="refreshSize"
          value={values.refreshIndexShift}
          onChange={createChangeHandler("refreshIndexShift")}
          className="OptionsControls-input"
        />
      </label>
    </form>
  );
}

export { OptionsControls };
