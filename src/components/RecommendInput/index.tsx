import Input from "../Input";
import React, { useState, useRef, useEffect } from "react";
import { useInput } from "@/lib/hooks/useInput";
import RecommendBox from "./RecommendIBox";
import { useSickList } from "@/lib/recoil/hooks";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { RecommendInputContainer } from "./styles";

const RecommendInput = () => {
  const [showRecommendBox, setShowRecommendBox] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const [value, setValue, onChange] = useInput();
  const [keyword, setKeyword] = useState(value);

  const inputRef = useRef<HTMLInputElement>(null);

  const debounce = useDebounce();
  const { sickData, stateText } = useSickList(keyword);

  useEffect(() => {
    if (sickData.length && focusIndex >= 0)
      setValue(sickData[focusIndex].sickNm);
  }, [focusIndex, setValue, sickData]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = ["ArrowDown", "ArrowUp"];

    if (key.includes(e.key)) {
      e.preventDefault();
      if (!sickData.length) return;
      let index = focusIndex;

      if (e.key === "ArrowDown") {
        index = focusIndex < 0 ? 0 : (focusIndex + 1) % sickData.length;
      } else if (e.key === "ArrowUp") {
        index =
          ((focusIndex < 0 ? 0 : focusIndex) - 1 + sickData.length) %
          sickData.length;
      }
      setFocusIndex(index);
      setValue(sickData[index].sickNm);
    }
  };

  const onInput = (e: React.FormEvent<HTMLFormElement>) => {
    let newKeyword = keyword;
    if (e.target instanceof HTMLInputElement) {
      if (newKeyword === e.target.value) return;
      newKeyword = e.target.value.trim();
    }
    debounce(() => {
      if (e.target instanceof HTMLInputElement) {
        setKeyword(newKeyword);
        setFocusIndex(-1);
      }
    }, 100);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowRecommendBox(false);
    setKeyword("");
    inputRef.current?.blur();
  };

  const onFocusInput = () => {
    setFocusIndex(-1);
    setKeyword(value.trim());
    setShowRecommendBox(true);
  };

  const onBlurInput = () => setShowRecommendBox(false);

  return (
    <RecommendInputContainer onSubmit={onSubmit} onInput={onInput}>
      <Input
        className="input"
        onFocus={onFocusInput}
        onBlur={onBlurInput}
        onKeyDown={onKeyDown}
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
        keyword={keyword}
      />
    </RecommendInputContainer>
  );
};

export default RecommendInput;
