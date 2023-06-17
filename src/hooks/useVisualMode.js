import { useState, useCallback } from "react";

const useVisualMode = (initialMode) => {
  // Set up state to track the history of modes
  const [history, setHistory] = useState([initialMode]);

  // Define a transition function to update the mode history
  const transition = useCallback((newMode, replace = false) => {
    setHistory((prevHistory) => {
      let updatedHistory;
      if (replace) {
        // Replace the last mode in history with the new mode
        updatedHistory = [
          ...prevHistory.slice(0, prevHistory.length - 1),
          newMode,
        ];
      } else {
        // Append the new mode to the history
        updatedHistory = [...prevHistory, newMode];
      }
      return updatedHistory;
    });
  }, []);

  // Define a back function to navigate back in the mode history
  const back = useCallback(() => {
    setHistory((prevHistory) => {
      if (prevHistory.length > 1) {
        // Remove the last mode from history if there are more than one modes
        const updatedHistory = prevHistory.slice(0, -1);
        return updatedHistory;
      }
      return prevHistory;
    });
  }, []);

  // Return an object with the current mode, transition, and back functions
  return {
    mode: history[history.length - 1], // The current mode is the last item in the history
    transition,
    back,
  };
};

export default useVisualMode;
