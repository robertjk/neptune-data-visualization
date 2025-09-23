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
    lastSecondStart: performance.now(),
    lastFrameTime: -Infinity,
    currentRequestId: 0,
    framesCount: 0,
    fps: NaN,
  });

  useEffect(() => {
    function animate(now: number) {
      const timeSinceLastFrame = now - animationParams.current.lastFrameTime;
      if (timeSinceLastFrame >= options.refreshTime) {
        animationParams.current.lastFrameTime = now;
        calculateNewDataPositions();
        calculateFps();
      }
      animationParams.current.currentRequestId = requestAnimationFrame(animate);
    }

    function calculateNewDataPositions() {
      let newDataStartIndex =
        options.dataStartIndex + options.refreshIndexShift;
      if (newDataStartIndex + options.dataWindowSize > dataLength) {
        setIsAnimated(false);
        newDataStartIndex = dataLength - options.dataWindowSize;
      }
      dispatchOptions({ type: "dataStartIndex", value: newDataStartIndex });
    }

    function calculateFps() {
      animationParams.current.framesCount += 1;
      const now = performance.now();
      if (now - animationParams.current.lastSecondStart >= ONE_SECOND) {
        animationParams.current.fps = animationParams.current.framesCount;
        animationParams.current.framesCount = 0;
        animationParams.current.lastSecondStart = now;
      }
    }

    if (isAnimated) {
      animationParams.current.currentRequestId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationParams.current.currentRequestId) {
        // This really needs to value from ref, as we store the last request id there
        // eslint-disable-next-line react-hooks/exhaustive-deps
        cancelAnimationFrame(animationParams.current.currentRequestId);
      }
    };
  }, [
    isAnimated,
    dispatchOptions,
    options.dataStartIndex,
    options.dataWindowSize,
    options.refreshTime,
    options.refreshIndexShift,
    dataLength,
  ]);

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
