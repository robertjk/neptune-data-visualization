import { act, renderHook } from "@testing-library/react";

import { useAnimation } from "../useAnimation";
import { expect, test, vi } from "vitest";

test("Initially not animated", () => {
  const { result } = renderHook(() =>
    useAnimation(
      {
        dataWindowSize: 10,
        dataStartIndex: 0,
        refreshTime: 1000,
        refreshIndexShift: 1,
      },
      vi.fn()
    )
  );

  expect(result.current.isAnimated).toBe(false);
});

test("Starts to animate after toggling", () => {
  const { result } = renderHook(() =>
    useAnimation(
      {
        dataWindowSize: 10,
        dataStartIndex: 0,
        refreshTime: 1000,
        refreshIndexShift: 1,
      },
      vi.fn()
    )
  );

  act(() => {
    result.current.toggleAnimation();
  });

  expect(result.current.isAnimated).toBe(true);
});

test("Dispatches dataStartIndex updates with proper frequency when animating", () => {
  vi.useFakeTimers();
  const options = {
    dataWindowSize: 10,
    dataStartIndex: 50,
    refreshTime: 10,
    refreshIndexShift: 7,
  };
  const dispatchOptions = vi.fn();

  const { result, rerender } = renderHook(() =>
    useAnimation(options, dispatchOptions)
  );

  act(() => {
    result.current.toggleAnimation();
  });

  expect(result.current.isAnimated).toBe(true);
  expect(dispatchOptions).not.toBeCalled();

  vi.advanceTimersByTime(10);

  expect(dispatchOptions).toHaveBeenCalledTimes(1);
  expect(dispatchOptions).toHaveBeenCalledWith({
    type: "dataStartIndex",
    value: 57,
  });

  options.dataStartIndex = 150;
  options.refreshIndexShift = 54;
  vi.advanceTimersByTime(100);

  act(() => {
    rerender();
  });

  expect(dispatchOptions).toHaveBeenCalledTimes(11);
  expect(dispatchOptions).toHaveBeenLastCalledWith({
    type: "dataStartIndex",
    value: 204,
  });
});
