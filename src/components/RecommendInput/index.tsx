import Input from "../Input";
import React, { useState, useRef, useEffect } from "react";
import { useInput } from "@/hooks/useInput";
import RecommendBox from "./RecommendIBox";
import { useDebounce } from "@/hooks/useDebounce";
import { RecommendInputContainer } from "./styles";

// TODO: 추천 검색어 받아오는 부분
// import { useSickList } from "@/recoil/hooks";
import { Sick } from "typings/db";
// import { searchService } from "@/service/SearhService";
import { useSearch } from "@/pages/Main/hooks/useSearch";

const RecommendInput = () => {
  const [showRecommendBox, setShowRecommendBox] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const [value, setValue, onChange] = useInput();
  const [keyword, setKeyword] = useState(value);

  const inputRef = useRef<HTMLInputElement>(null);

  const debounce = useDebounce();
  // TODO: 추천 검색어 받아오는 부분
  const { contents, search, state } = useSearch();

  useEffect(() => {
    if (contents.length && focusIndex >= 0)
      setValue(contents[focusIndex].sickNm);
  }, [focusIndex, setValue, contents]);

  // useEffect(() => {
  //   // search(keyword);
  // }, [keyword, search]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = ["ArrowDown", "ArrowUp"];

    if (key.includes(e.key)) {
      e.preventDefault();
      if (!contents.length) return;
      let index = focusIndex;

      if (e.key === "ArrowDown") {
        index = focusIndex < 0 ? 0 : (focusIndex + 1) % contents.length;
      } else if (e.key === "ArrowUp") {
        index =
          ((focusIndex < 0 ? 0 : focusIndex) - 1 + contents.length) %
          contents.length;
      }
      setFocusIndex(index);
      setValue(contents[index].sickNm);
    }
  };

  const onInput = (e: React.FormEvent<HTMLFormElement>) => {
    console.info("oninput");
    let newKeyword = keyword.trim();
    if (e.target instanceof HTMLInputElement) {
      if (newKeyword === e.target.value) return;
      newKeyword = e.target.value.trim();
    }
    debounce(() => {
      if (e.target instanceof HTMLInputElement) {
        setKeyword(newKeyword);
        search(newKeyword);
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
        data={contents}
        status={state}
        focusIndex={focusIndex}
        keyword={keyword}
      />
    </RecommendInputContainer>
  );
};

export default RecommendInput;
