import { APIServiceImpl } from "@/lib/api/API";
import { CacheService } from "./CacheService";

interface SearchService<T> {
  search(query: string): Promise<T>;
}

export class SearchServiceImpl<T> implements SearchService<T> {
  protected api;
  private cache;

  constructor(api: APIServiceImpl, cache: CacheService<string, T>) {
    this.api = api;
    this.cache = cache;
  }

  async fetchData(query: string): Promise<T> {
    const { data } = await this.api.fetch<T>(`sick?sickNm_like=${query}`);
    return data;
  }

  async search(query: string) {
    if (this.cache.hasCache(query)) {
      this.cache.cacheTimeOut(this.fetchData(query), query);
      return this.cache.getCache(query) || ([] as T);
    }
    const { data } = await this.api.fetch<T>(`sick?sickNm_like=${query}`);

    this.cache.setCache(query, data);
    return data;
  }
}
