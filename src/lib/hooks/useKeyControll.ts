import { useState } from "react";
import { Sick } from "typings/db";

const useKeyControll = () => {
  const [showRecommendBox, setShowRecommendBox] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);

  const handleIncreseCount = (dataLength: number) => (pre: number) => {
    return (pre === -1 ? pre + dataLength : pre + 1) % dataLength;
  };

  const handleDecreseCount = (dataLength: number) => (pre: number) => {
    return ((pre < 0 ? 0 : pre - 1) + dataLength) % dataLength;
  };

  const onKeyDown =
    (sickData: Sick[]) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!sickData.length) return;

      if (e.key === "ArrowDown") {
        setFocusIndex(handleIncreseCount(sickData.length));
      }

      if (e.key === "ArrowUp") {
        setFocusIndex(handleDecreseCount(sickData.length));
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

export default useKeyControll;
