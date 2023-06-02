import { useState, useCallback } from "react";

const useVisualMode = (initialMode) => {
  const [history, setHistory] = useState([initialMode]);

  const transition = useCallback((newMode, replace = false) => {
    setHistory((prevHistory) => {
      let updatedHistory;
      if (replace) {
        updatedHistory = [
          ...prevHistory.slice(0, prevHistory.length - 1),
          newMode,
        ];
      } else {
        updatedHistory = [...prevHistory, newMode];
      }
      return updatedHistory;
    });
  }, []);

  const back = useCallback(() => {
    setHistory((prevHistory) => {
      if (prevHistory.length > 1) {
        const updatedHistory = prevHistory.slice(0, -1);
        return updatedHistory;
      }
      return prevHistory;
    });
  }, []);

  return {
    mode: history[history.length - 1],
    transition,
    back,
  };
};

export default useVisualMode;
