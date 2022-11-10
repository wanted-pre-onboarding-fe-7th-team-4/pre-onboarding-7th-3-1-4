import Input from "../Input";
import React, { useEffect } from "react";
import { useInput } from "@/lib/hooks/useInput";
import RecommendBox from "./RecommendIBox";
import { useSickList } from "@/lib/recoil/hooks";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { RecommendInputContainer } from "./styles";
import useKeyControll from "@/lib/hooks/useKeyControll";

const RecommendInput = () => {
  const {
    showRecommendBox,
    setShowRecommendBox,
    focusIndex,
    setFocusIndex,
    onKeyDown,
    onFocusInput,
    onBlurInput
  } = useKeyControll();
  const { value, setValue, onChange, inputRef } = useInput();
  const debounce = useDebounce();
  const { sickData, stateText } = useSickList(value);

  const onInput = (e: React.FormEvent<HTMLFormElement>) => {
    let newKeyword = value;
    if (e.target instanceof HTMLInputElement) {
      if (newKeyword === e.target.value) return;
      newKeyword = e.target.value.trim();
    }
    debounce(() => {
      if (e.target instanceof HTMLInputElement) {
        setValue(newKeyword);
        setFocusIndex(-1);
      }
    }, 100);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowRecommendBox(false);
    setValue("");
    inputRef.current?.blur();
  };

  useEffect(() => {
    if (sickData.length && focusIndex >= 0)
      setValue(sickData[focusIndex].sickNm);
  }, [focusIndex, setValue, sickData]);

  return (
    <RecommendInputContainer onSubmit={onSubmit} onInput={onInput}>
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
