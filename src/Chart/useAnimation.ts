import { useEffect, useState } from "react";

import type { ChartOptions } from "../OptionsControls";

function useAnimation(options: ChartOptions) {
  const [isAnimated, setIsAnimated] = useState(false);
  const [dataStartIndex, setDataStartIndex] = useState(options.dataStartIndex);

  useEffect(
    function handleAnimation() {
      let intervalId: NodeJS.Timeout | undefined;
      if (isAnimated) {
        intervalId = setInterval(() => {
          setDataStartIndex(
            (prevStartIndex) => prevStartIndex + options.refreshIndexShift
          );
        }, options.refreshTime);
      }

      return function clearAnimation() {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    },
    [isAnimated, options.refreshTime, options.refreshIndexShift]
  );

  const animationToggleLabel = isAnimated ? "Pause" : "Start";

  function toggleAnimation() {
    setIsAnimated((prevIsAnimated) => !prevIsAnimated);
  }

  return {
    animationToggleLabel,
    dataStartIndex,
    toggleAnimation,
  };
}

export { useAnimation };
