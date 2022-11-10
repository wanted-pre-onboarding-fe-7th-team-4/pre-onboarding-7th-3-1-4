import { atom } from "recoil";
import { Sick } from "typings/db";

export const sickListCacheAtom = atom<Map<string, Sick[]>>({
  key: "sickCache",
  default: new Map<string, Sick[]>()
});
