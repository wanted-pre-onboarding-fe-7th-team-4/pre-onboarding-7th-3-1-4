import { APIServiceImpl } from "@/lib/api/API";
import { SearchServiceImpl } from "@/service/SearhService";
import { useState } from "react";
import { Sick } from "typings/db";

export type StateType = "hasError" | "loading" | "hasValue";

const api = new APIServiceImpl("http://localhost:4000/");
const searchService = new SearchServiceImpl<Sick[]>(api);

export const useSearch = () => {
  const [status, setStatus] = useState<StateType>("hasValue");
  const [contents, setContents] = useState<Sick[]>([]);

  const search = async (keyword: string) => {
    if (!keyword.trim()) {
      setStatus("hasValue");
      setContents([] as Sick[]);
      return;
    }
    try {
      setStatus("loading");
      const data = await searchService.search(keyword);
      const sortedData = data.sort((a, b) =>
        a?.sickNm.localeCompare(b?.sickNm)
      );
      setStatus("hasValue");
      setContents(sortedData);
    } catch (error) {
      setStatus("hasError");
    }
  };

  return { status, sickData: contents, search };
};
