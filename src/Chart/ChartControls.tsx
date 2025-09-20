import "./ChartControls.css";

function ChartControls() {
  return (
    <form className="ChartControls">
      <label className="ChartControls-field">
        Window size (N):
        <input type="number" name="windowSize" />
      </label>
      <label className="ChartControls-field">
        Left index (S):
        <input type="number" name="leftIndex" />
      </label>
      <label className="ChartControls-field">
        Refresh time (T) [ms]:
        <input type="number" name="refreshTime" />
      </label>
      <label className="ChartControls-field">
        Refresh size (P):
        <input type="number" name="refreshSize" />
      </label>
      <button type="button" className="ChartControls-button">
        Start
      </button>
    </form>
  );
}

export { ChartControls };
