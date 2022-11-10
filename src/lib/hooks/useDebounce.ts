import { useState } from "react";

export const useDebounce = () => {
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const debounce = (callback: () => void, ms: number): void => {
    clearTimeout(timer);
    const nTimer = setTimeout(callback, ms);
    setTimer(nTimer);
  };

  return debounce;
};
