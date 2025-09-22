import { useEffect, useRef, useState } from "react";

import type { ChartOptions, ChartOptionsDispatch } from "~/OptionsControls";

const ONE_SECOND = 1000;

function useAnimation(
  options: ChartOptions,
  dispatchOptions: ChartOptionsDispatch,
  dataLength: number
) {
  const [isAnimated, setIsAnimated] = useState(false);
  const animationParams = useRef({
    count: 0,
    currentFrameStart: performance.now(),
    fps: NaN,
  });

  useEffect(
    function handleAnimation() {
      let intervalId: NodeJS.Timeout | undefined;

      if (isAnimated) {
        intervalId = setInterval(() => {
          // Animate
          let newDataStartIndex =
            options.dataStartIndex + options.refreshIndexShift;
          if (newDataStartIndex + options.dataWindowSize > dataLength) {
            setIsAnimated(false);
            newDataStartIndex = dataLength - options.dataWindowSize;
          }
          dispatchOptions({ type: "dataStartIndex", value: newDataStartIndex });

          // Calculate FPS (simplified approach)
          animationParams.current.count += 1;
          const now = performance.now();
          if (now - animationParams.current.currentFrameStart >= ONE_SECOND) {
            animationParams.current.fps = animationParams.current.count;
            animationParams.current.count = 0;
            animationParams.current.currentFrameStart = now;
          }
        }, options.refreshTime);
      }

      return function clearAnimation() {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    },
    [
      isAnimated,
      dispatchOptions,
      options.dataStartIndex,
      options.dataWindowSize,
      options.refreshTime,
      options.refreshIndexShift,
      dataLength,
    ]
  );

  function toggleAnimation() {
    setIsAnimated((prevIsAnimated) => !prevIsAnimated);
  }

  return {
    isAnimated,
    toggleAnimation,
    fps: animationParams.current.fps,
  };
}

export { useAnimation };
