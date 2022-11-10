import Input from "../Input";
import React, { useEffect } from "react";
import { useInput } from "@/lib/hooks/useInput";
import RecommendBox from "./RecommendIBox";
<<<<<<< HEAD
import { useDebounce } from "@/hooks/useDebounce";
=======
import { useSickList } from "@/lib/recoil/hooks";

>>>>>>> 40551f8815526569f17912ea0c50f82162bc6cd2
import { RecommendInputContainer } from "./styles";
import useKeyControl from "@/lib/hooks/useKeyControl";
import { useNavigate } from "react-router-dom";

// TODO: 추천 검색어 받아오는 부분
// import { useSickList } from "@/recoil/hooks";
import { Sick } from "typings/db";
// import { searchService } from "@/service/SearhService";
import { useSearch } from "@/pages/Main/hooks/useSearch";

const RecommendInput = () => {
<<<<<<< HEAD
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
=======
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
  const { sickData, stateText, getData } = useSickList();
>>>>>>> 40551f8815526569f17912ea0c50f82162bc6cd2

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
      getData(debounceValue);
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
<<<<<<< HEAD
        data={contents}
        status={state}
=======
        data={sickData ? sickData : []}
        alt={stateText}
>>>>>>> 40551f8815526569f17912ea0c50f82162bc6cd2
        focusIndex={focusIndex}
        keyword={value}
      />
    </RecommendInputContainer>
  );
};

export default RecommendInput;
