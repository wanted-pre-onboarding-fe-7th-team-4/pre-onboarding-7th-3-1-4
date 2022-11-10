import Input from "../Input";
import React, { useEffect } from "react";
import { useInput } from "@/lib/hooks/useInput";
import RecommendBox from "./RecommendIBox";
import { RecommendInputContainer } from "./styles";
import useKeyControl from "@/lib/hooks/useKeyControl";
import { useNavigate } from "react-router-dom";

import { useSearch } from "@/pages/Main/hooks/useSearch";

const RecommendInput = () => {
  const navigate = useNavigate();
  const {
    showRecommendBox,
    setShowRecommendBox,
    focusIndex,
    setFocusIndex,
    onKeyDown,
    onFocusInput,
    onBlurInput
  } = useKeyControl();
  const { value, setValue, onChange, inputRef, debounceValue } = useInput();
  const { sickData, search, status } = useSearch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowRecommendBox(false);
    navigate(`/sick?q=${debounceValue}`);
    inputRef.current?.blur();
  };

  useEffect(() => {
    if (sickData && focusIndex >= 0) {
      setValue(sickData[focusIndex].sickNm);
    }
  }, [focusIndex, setValue, sickData]);

  useEffect(() => {
    if (debounceValue && focusIndex === -1) {
      search(debounceValue);
    }
  }, [debounceValue, focusIndex]);

  return (
    <RecommendInputContainer onSubmit={onSubmit}>
      <Input
        className="input"
        onFocus={onFocusInput}
        onBlur={onBlurInput}
        onKeyDown={onKeyDown(sickData ? sickData : [])}
        ref={inputRef}
        value={value}
        onInput={onChange}
        placeholder="질환명을 입력해 주세요."
        buttonText="검색"
      />
      <RecommendBox
        onChangeFocusIndex={(index) => {
          setFocusIndex(index);
          inputRef.current?.blur();
        }}
        show={showRecommendBox}
        data={sickData ? sickData : []}
        status={status}
        focusIndex={focusIndex}
        keyword={value}
      />
    </RecommendInputContainer>
  );
};

export default RecommendInput;
