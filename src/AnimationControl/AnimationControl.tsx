import type { ChartOptions, ChartOptionsDispatch } from "~/OptionsControls";
import type { ChartDataFull } from "~/types";

import { useAnimation } from "./useAnimation";

import "./AnimationControl.css";

interface AnimationControlProps {
  options: ChartOptions;
  dispatchOptions: ChartOptionsDispatch;
  data?: ChartDataFull;
}

function AnimationControl({
  options,
  dispatchOptions,
  data,
}: AnimationControlProps) {
  const dataLength = data ? data.x.length : 0;
  const isDataLoaded = Boolean(data);

  const { isAnimated, toggleAnimation, fps } = useAnimation(
    options,
    dispatchOptions,
    dataLength
  );

  const endOfData =
    options.dataStartIndex + options.dataWindowSize >= dataLength;
  const buttonDisabled = !isDataLoaded || endOfData;
  const fpsLabel =
    isAnimated && fps ? (
      <small className="AnimationControl-fps">FPS: {String(fps)}</small>
    ) : null;
  const animationToggleLabel = isAnimated ? "Pause" : "Start";

  return (
    <button
      type="button"
      className="AnimationControl-button"
      disabled={buttonDisabled}
      onClick={toggleAnimation}
    >
      {animationToggleLabel}
      {fpsLabel}
    </button>
  );
}

export { AnimationControl };
