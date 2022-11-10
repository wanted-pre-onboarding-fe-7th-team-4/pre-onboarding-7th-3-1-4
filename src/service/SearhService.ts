import { APIServiceImpl } from "./../api/API";
import { CacheService } from "./CacheService";

interface SearchService<T> {
  search(query: string): Promise<T>;
}

export class SearchServiceImpl<T> implements SearchService<T> {
  private api;
  private cache;

  constructor(api: APIServiceImpl) {
    this.api = api;
    this.cache = new CacheService<string, T>();
    // this.cache = new Map<string, T>();
  }

  async search(query: string) {
    if (this.cache.hasCache(query))
      return this.cache.getCache(query) || ([] as T);
    console.info(query);
    const { data } = await this.api.fetch<T>(`sick?sickNm_like=${query}`);
    this.cache.setCache(query, data);
    return data;
  }
}
