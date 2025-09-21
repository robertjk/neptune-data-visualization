import { useEffect, useRef, useState } from "react";

import type { ChartOptions, ChartOptionsDispatch } from "~/OptionsControls";

const ONE_SECOND = 1000;

function useAnimation(
  options: ChartOptions,
  dispatchOptions: ChartOptionsDispatch,
  dataLength: number
) {
  const [isAnimated, setIsAnimated] = useState(false);
  const [fps, setFps] = useState<number | undefined>(undefined);
  const framesCounter = useRef({
    count: 0,
    currentFrameStart: performance.now(),
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

          // Calculate FPS
          framesCounter.current.count += 1;
          const now = performance.now();
          if (now - framesCounter.current.currentFrameStart >= ONE_SECOND) {
            setFps(framesCounter.current.count);
            framesCounter.current.count = 0;
            framesCounter.current.currentFrameStart = now;
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
    fps,
  };
}

export { useAnimation };
