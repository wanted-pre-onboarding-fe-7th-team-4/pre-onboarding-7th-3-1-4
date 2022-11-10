import { api } from "@/api";
import { selectorFamily } from "recoil";
import { Sick } from "typings/db";
import { sickListCacheAtom } from "../atom/sickAtom";

export const getSickList = selectorFamily<Sick[], string>({
  key: "sickList",
  get:
    (keyword) =>
    async ({ get }) => {
      if (!keyword) return [];
      const cache = get(sickListCacheAtom);
      if (cache.has(keyword)) return cache.get(keyword) || [];
      console.info("calling api");
      const { data } = await api.get<Sick[]>("/sick", {
        params: { sickNm_like: keyword }
      });
      return data;
    }
});
