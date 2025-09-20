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
          value={values.windowSize}
          onChange={createChangeHandler("windowSize")}
        />
      </label>
      <label className="OptionsControls-field">
        Left index (S):
        <input
          type="number"
          name="leftIndex"
          value={values.leftIndex}
          onChange={createChangeHandler("leftIndex")}
        />
      </label>
      <label className="OptionsControls-field">
        Refresh time [ms] (T):
        <input
          type="number"
          name="refreshTime"
          value={values.refreshTime}
          onChange={createChangeHandler("refreshTime")}
        />
      </label>
      <label className="OptionsControls-field">
        Refresh size (P):
        <input
          type="number"
          name="refreshSize"
          value={values.refreshSize}
          onChange={createChangeHandler("refreshSize")}
        />
      </label>
    </form>
  );
}

export { OptionsControls, type ChartOptions };
