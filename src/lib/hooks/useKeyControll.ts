import { useState } from "react";

const useKeyControll = () => {
  const [showRecommendBox, setShowRecommendBox] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);

  return {
    showRecommendBox,
    setShowRecommendBox,
    focusIndex,
    setFocusIndex
  };
};

export default useKeyControll;
