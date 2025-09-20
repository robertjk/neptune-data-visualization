import type { ChartOptions, ChartOptionsAction } from "./types";

import "./OptionsControls.css";

interface OptionsControlsProps {
  options: ChartOptions;
  dispatchOptions: (action: ChartOptionsAction) => void;
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
        Window size (N):
        <input
          type="number"
          name="windowSize"
          min="1"
          value={values.windowSize}
          onChange={createChangeHandler("windowSize")}
        />
      </label>
      <label className="OptionsControls-field">
        Start index (S):
        <input
          type="number"
          min="0"
          name="leftIndex"
          value={values.startIndex}
          onChange={createChangeHandler("startIndex")}
        />
      </label>
      <label className="OptionsControls-field">
        Refresh time [ms] (T):
        <input
          type="number"
          name="refreshTime"
          min="16"
          value={values.refreshTime}
          onChange={createChangeHandler("refreshTime")}
        />
      </label>
      <label className="OptionsControls-field">
        Refresh index shift (P):
        <input
          type="number"
          min="1"
          name="refreshSize"
          value={values.refreshIndexShift}
          onChange={createChangeHandler("refreshIndexShift")}
        />
      </label>
    </form>
  );
}

export { OptionsControls, type ChartOptions };
