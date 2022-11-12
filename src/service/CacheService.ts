export class CacheService<K, V> {
  private readonly staleTime = 5000;
  private readonly cacheTime = 7000;
  private state;
  private staleCacheTimeoutId?: NodeJS.Timeout | undefined;
  private cacheTimeoutId?: NodeJS.Timeout | undefined;

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

  cacheTimeOut(fetch: Promise<V>, key: K) {
    if (this.staleCacheTimeoutId || this.cacheTimeoutId) {
      return;
    }

    this.staleCacheTimeoutId = setTimeout(async () => {
      console.log("stale 타임 지나서 fetch함");
      const response: Promise<V> = fetch;
      // FIXME: TIMESTAMP로 적용해보자
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
