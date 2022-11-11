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
    // this.cache = new CacheService<string, T>();
  }

  async fetchData(query: string): Promise<T> {
    const { data } = await this.api.fetch<T>(`sick?sickNm_like=${query}`);
    return data;
  }

  async search(query: string) {
    if (this.cache.hasCache(query)) {
      this.cache.timeCheck(this.fetchData(query), query);
      return this.cache.getCache(query) || ([] as T);
    }
    const { data } = await this.api.fetch<T>(`sick?sickNm_like=${query}`);
    this.cache.setCache(query, data);
    return data;
  }
}

/**
 아 그렇네요
 

type FetcherFn=(key:string)=>Promise<T>
export class SearchServiceImpl<T> implements SearchService<T> {
  protected api;
  private cache;
  private fetcher;

  constructor(api: APIServiceImpl, fetcher:FetcherFn) {
    this.api = api;
    this.cache = cache;
    this.cache = new CacheService<string, T>();
  }

  async search(query: string) {
    const {data} = await this.cache.getData(query, this.fetcher);
    return data;
  }
}
 */
