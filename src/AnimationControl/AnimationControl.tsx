import type { ChartOptions, ChartOptionsDispatch } from "../OptionsControls";

import { useAnimation } from "./useAnimation";

import "./AnimationControl.css";

interface AnimationControlProps {
  options: ChartOptions;
  dispatchOptions: ChartOptionsDispatch;
  isDataLoaded: boolean;
}

function AnimationControl({
  options,
  dispatchOptions,
  isDataLoaded,
}: AnimationControlProps) {
  const { isAnimated, toggleAnimation } = useAnimation(
    options,
    dispatchOptions
  );

  const animationToggleLabel = isAnimated ? "Pause" : "Start";

  return (
    <button
      type="button"
      className="AnimationControl-button"
      disabled={!isDataLoaded}
      onClick={toggleAnimation}
    >
      {animationToggleLabel}
    </button>
  );
}

export { AnimationControl };
