// import { renderHook, act } from "@testing-library/react-hooks";
import { useState, useCallback } from "react";

const useVisualMode = (initialMode) => {
  const [history, setHistory] = useState([initialMode]);

  const transition = useCallback((newMode, replace = false) => {
    console.log("IN TRANSITION FUNC");
    console.log(newMode);
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
