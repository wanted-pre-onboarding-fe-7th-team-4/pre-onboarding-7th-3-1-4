import { useRecoilValueLoadable } from "recoil";
import { getSickList } from "../selector/sickSelector";

export const useSickList = (keyword: string) => {
  const { state, contents } = useRecoilValueLoadable(getSickList(keyword));
  if (state === "hasError")
    return { sickData: [], stateText: "검색 실패😥 다시 시도해주세요." };
  if (state === "loading")
    return { sickData: [], stateText: "로딩중 입니다⏳" };
  return { sickData: contents, stateText: "데이터가 없습니다." };
};
