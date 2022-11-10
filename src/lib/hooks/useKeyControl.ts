import { useState } from "react";
import { Sick } from "typings/db";

const useKeyControl = () => {
  const [showRecommendBox, setShowRecommendBox] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);

  const handleIncreaseCount = (dataLength: number) => (pre: number) => {
    return pre < 0 ? 0 : (pre + 1) % dataLength;
  };

  const handleDecreaseCount = (dataLength: number) => (pre: number) => {
    return ((pre < 0 ? 0 : pre) - 1 + dataLength) % dataLength;
  };

  const onKeyDown =
    (sickData: Sick[]) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!sickData.length) return;

      if (e.key === "ArrowDown") {
        setFocusIndex(handleIncreaseCount(sickData.length));
      }

      if (e.key === "ArrowUp") {
        setFocusIndex(handleDecreaseCount(sickData.length));
      }

      if (e.key === "Escape") {
        setFocusIndex(-1);
      }
    };

  const onFocusInput = () => {
    setFocusIndex(-1);
    setShowRecommendBox(true);
  };

  const onBlurInput = () => setShowRecommendBox(false);

  return {
    onKeyDown,
    showRecommendBox,
    setShowRecommendBox,
    focusIndex,
    setFocusIndex,
    onFocusInput,
    onBlurInput
  };
};

export default useKeyControl;
