import { APIServiceImpl } from "@/api/API";
import { SearchServiceImpl } from "@/service/SearhService";
import { useState } from "react";
import { Sick } from "typings/db";

export type StateType = "hasError" | "loading" | "hasValue";

const api = new APIServiceImpl("http://localhost:4000/");
const searchService = new SearchServiceImpl<Sick[]>(api);

export const useSearch = () => {
  const [state, setState] = useState<StateType>("hasValue");
  const [contents, setContents] = useState<Sick[]>([]);

  const search = async (keyword: string) => {
    if (!keyword.trim()) {
      setState("hasValue");
      setContents([] as Sick[]);
      return;
    }
    try {
      setState("loading");
      const data = await searchService.search(keyword);
      setState("hasValue");
      setContents(data);
    } catch (error) {
      setState("hasError");
    }
  };

  return { state, contents, search };
};
