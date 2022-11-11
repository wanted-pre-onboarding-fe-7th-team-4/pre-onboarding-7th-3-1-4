import { CacheService } from "./../../service/CacheService";
import { APIServiceImpl } from "@/lib/api/API";
import { SearchServiceImpl } from "@/service/SearhService";
import { useState } from "react";
import { Sick } from "@/lib/typings/db";
// import { clearTimeout } from "timers";

export type StateType = "hasError" | "loading" | "hasValue";

const api = new APIServiceImpl("http://localhost:4000/");
const cache = new CacheService<string, Sick[]>();
const searchService = new SearchServiceImpl<Sick[]>(api, cache);

export const useSearch = () => {
  const [status, setStatus] = useState<StateType>("hasValue");
  const [contents, setContents] = useState<Sick[]>([]);

  // const [keyword, setKeyword] = useState<string>();

  // useEffect(() => {
  //   // cacheTime이 지나면
  //   const StaleTimer = setTimeout(() => {
  //     console.log("hi");
  //   }, cache.CacheTime);

  //   return () => clearTimeout(StaleTimer);
  // }, [cache.StaleTime]);

  // useEffect(() => {
  //   // cacheTime이 지나면
  //   const cacheTimer = setTimeout(() => {
  //     cache.deleteCache();
  //   }, cache.CacheTime);

  //   return () => clearTimeout(cacheTimer);
  // }, [keyword]); // 키워드가 바뀌면

  const search = async (inputKeyword: string) => {
    // setKeyword(inputKeyword);

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
