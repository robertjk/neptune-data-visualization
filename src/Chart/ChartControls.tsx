import "./ChartControls.css";

interface ChartControlsValues {
  windowSize: number;
  leftIndex: number;
  refreshTime: number;
  refreshSize: number;
}

interface ChartControlValuesAction {
  type: keyof ChartControlsValues;
  value: number;
}

interface ChartControlsProps {
  values: ChartControlsValues;
  dispatchValues: (action: ChartControlValuesAction) => void;
}

function ChartControls({ values, dispatchValues }: ChartControlsProps) {
  function createChangeHandler(type: keyof ChartControlsValues) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      dispatchValues({ type, value });
    };
  }

  return (
    <form className="ChartControls">
      <label className="ChartControls-field">
        Window size (N):
        <input
          type="number"
          name="windowSize"
          value={values.windowSize}
          onChange={createChangeHandler("windowSize")}
        />
      </label>
      <label className="ChartControls-field">
        Left index (S):
        <input
          type="number"
          name="leftIndex"
          value={values.leftIndex}
          onChange={createChangeHandler("leftIndex")}
        />
      </label>
      <label className="ChartControls-field">
        Refresh time (T) [ms]:
        <input
          type="number"
          name="refreshTime"
          value={values.refreshTime}
          onChange={createChangeHandler("refreshTime")}
        />
      </label>
      <label className="ChartControls-field">
        Refresh size (P):
        <input
          type="number"
          name="refreshSize"
          value={values.refreshSize}
          onChange={createChangeHandler("refreshSize")}
        />
      </label>
      <button type="button" className="ChartControls-button">
        Start
      </button>
    </form>
  );
}

export {
  ChartControls,
  type ChartControlsValues,
  type ChartControlValuesAction,
};
