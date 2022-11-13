import { CacheService } from "./../../service/CacheService";
import { APIServiceImpl } from "@/lib/api/API";
import { SearchServiceImpl } from "@/service/SearhService";
import { useState } from "react";
import { Sick } from "@/lib/typings/db";

export type StateType = "hasError" | "loading" | "hasValue";

const staleTime = 600000;
const cacheTime = 900000;

const api = new APIServiceImpl("http://localhost:4000/");
const cache = new CacheService<string, Sick[]>(staleTime, cacheTime);
const searchService = new SearchServiceImpl<Sick[]>(api, cache);

export const useSearch = () => {
  const [status, setStatus] = useState<StateType>("hasValue");
  const [contents, setContents] = useState<Sick[]>([]);

  const search = async (inputKeyword: string) => {
    if (!inputKeyword.trim()) {
      setStatus("hasValue");
      setContents([] as Sick[]);
      return;
    }
    try {
      setStatus("loading");
      const data = await searchService.search(inputKeyword);
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
