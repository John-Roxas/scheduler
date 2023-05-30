// import { renderHook, act } from "@testing-library/react-hooks";
import { useState, useCallback } from "react";

const useVisualMode = (initialMode) => {
  const [history, setHistory] = useState([initialMode]);

  const transition = useCallback((newMode, replace = false) => {
    setHistory((prevHistory) =>
      replace
        ? [...prevHistory.slice(0, -1), newMode]
        : [...prevHistory, newMode]
    );
  }, []);

  const back = useCallback(() => {
    if (history.length > 1) {
      setHistory((prevHistory) => prevHistory.slice(0, -1));
    }
  }, [history]);

  return {
    mode: history[history.length - 1],
    transition,
    back,
  };
};

export default useVisualMode;

// test("useVisualMode should return to previous mode", () => {
//   const { result } = renderHook(() => useVisualMode(FIRST));

//   act(() => result.current.transition(SECOND));
//   expect(result.current.mode).toBe(SECOND);

//   act(() => result.current.transition(THIRD));
//   expect(result.current.mode).toBe(THIRD);

//   act(() => result.current.back());
//   expect(result.current.mode).toBe(SECOND);

//   act(() => result.current.back());
//   expect(result.current.mode).toBe(FIRST);
// });
