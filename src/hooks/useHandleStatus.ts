import { StateType } from "@/pages/Main/hooks/useSearch";

export const useHandleStatus = (state: StateType) => {
  if (state === "hasError") return "검색 실패😥 다시 시도해주세요.";
  else if (state === "loading") return "로딩중 입니다⏳";
  else return "데이터가 없습니다.";
};
