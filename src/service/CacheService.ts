// import { APIServiceImpl } from "@/lib/api/API";
// import { SearchServiceImpl } from "@/service/SearhService";
export class CacheService<K, V> {
  private readonly staleTime = 5000;
  private readonly cacheTime = 7000;
  private state;
  private staleCacheTimeoutId?: NodeJS.Timeout | undefined;
  private cacheTimeoutId?: NodeJS.Timeout | undefined;

  // 저는 캐시가 서치로 들어가는게 맞지않나 생각해요
  // 캐시가 좀더 여러곳에 쓰일 수 있는 클래스인거같고
  // 서치는 이번 프로젝트에 맞는 클래스인거잖아요
  // 네

  constructor() {
    this.state = new Map<K, V>();
  }

  setCache(key: K, value: V) {
    this.state.set(key, value);
  }

  getCache(key: K) {
    return this.state.get(key);
  }

  hasCache(key: K) {
    return this.state.has(key);
  }

  deleteCache(key: K) {
    return this.state.delete(key);
  }

  // 제가 알기론 상했는지 검사하고 서버에 다시 요청해서 아
  timeCheck(fetch: Promise<V>, key: K) {
    if (this.staleCacheTimeoutId || this.cacheTimeoutId) {
      console.log("hi");
      return;
    }

    // const prevCache = this.getCache(key);
    this.staleCacheTimeoutId = setTimeout(async () => {
      console.log("stale 타임 지나서 fetch함");
      const response: Promise<V> = fetch;
      response.then((data) => {
        if (JSON.stringify(this.getCache(key)) !== JSON.stringify(data)) {
          this.deleteCache(key);
          this.setCache(key, data);
        }
      });
    }, this.staleTime);

    this.cacheTimeoutId = setTimeout(() => {
      console.log("cache 타임 지나서 fetch하고 맵에서 지움");
      // fetch()

      this.deleteCache(key);
    }, this.cacheTime);
  }
}
//()=>void
