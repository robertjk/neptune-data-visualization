import type { ChartOptions, ChartOptionsDispatch } from "~/OptionsControls";

import { useAnimation } from "./useAnimation";

import "./AnimationControl.css";
import type { ChartDataFull } from "~/Chart";

interface AnimationControlProps {
  options: ChartOptions;
  dispatchOptions: ChartOptionsDispatch;
  inputData?: ChartDataFull;
}

function AnimationControl({
  options,
  dispatchOptions,
  inputData,
}: AnimationControlProps) {
  const isDataLoaded = Boolean(inputData);
  const dataLength = inputData?.x.length ?? 0;

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
