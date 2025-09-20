import { useEffect, useState } from "react";

import type { ChartOptions, ChartOptionsDispatch } from "../OptionsControls";

function useAnimation(
  options: ChartOptions,
  dispatchOptions: ChartOptionsDispatch
) {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(
    function handleAnimation() {
      let intervalId: NodeJS.Timeout | undefined;

      if (isAnimated) {
        intervalId = setInterval(() => {
          const newDataStartIndex =
            options.dataStartIndex + options.refreshIndexShift;
          dispatchOptions({ type: "dataStartIndex", value: newDataStartIndex });
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
      options.refreshTime,
      options.refreshIndexShift,
    ]
  );

  function toggleAnimation() {
    setIsAnimated((prevIsAnimated) => !prevIsAnimated);
  }

  return {
    isAnimated,
    toggleAnimation,
  };
}

export { useAnimation };
