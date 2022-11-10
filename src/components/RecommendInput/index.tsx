import Input from "../Input";
import React, { useEffect } from "react";
import { useInput } from "@/lib/hooks/useInput";
import RecommendBox from "./RecommendIBox";
import { useSickList } from "@/lib/recoil/hooks";

import { RecommendInputContainer } from "./styles";
import useKeyControl from "@/lib/hooks/useKeyControl";
import useDebounce from "@/lib/hooks/useDebounce";

const RecommendInput = () => {
  const {
    showRecommendBox,
    setShowRecommendBox,
    focusIndex,
    setFocusIndex,
    onKeyDown,
    onFocusInput,
    onBlurInput
  } = useKeyControl();
  const { value, setValue, onChange, inputRef } = useInput();
  const debounceValue = useDebounce(value, 200);
  const { sickData, stateText } = useSickList(debounceValue);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowRecommendBox(false);
    inputRef.current?.blur();
  };

  useEffect(() => {
    if (sickData.length && focusIndex >= 0)
      setValue(sickData[focusIndex].sickNm);
  }, [focusIndex, setValue, sickData]);

  return (
    <RecommendInputContainer onSubmit={onSubmit}>
      <Input
        className="input"
        onFocus={onFocusInput}
        onBlur={onBlurInput}
        onKeyDown={onKeyDown(sickData)}
        ref={inputRef}
        value={value}
        onChange={onChange}
        placeholder="질환명을 입력해 주세요."
        buttonText="검색"
      />
      <RecommendBox
        onChangeFocusIndex={(index) => {
          setFocusIndex(index);
          inputRef.current?.blur();
        }}
        show={showRecommendBox}
        data={sickData}
        alt={stateText}
        focusIndex={focusIndex}
        keyword={value}
      />
    </RecommendInputContainer>
  );
};

export default RecommendInput;
