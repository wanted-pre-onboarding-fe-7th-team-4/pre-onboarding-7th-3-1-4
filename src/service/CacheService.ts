export class CacheService<K, V> {
  private state;
  private staleCacheTimeoutId?: NodeJS.Timeout | undefined;
  private cacheTimeoutId?: NodeJS.Timeout | undefined;

  constructor(
    private readonly staleTime: number,
    private readonly cacheTime: number
  ) {
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
      const response: Promise<V> = fetch;

      response.then((data) => {
        this.setCache(key, data);
      });
    }, this.staleTime);

    this.cacheTimeoutId = setTimeout(() => {
      this.deleteCache(key);
    }, this.cacheTime);
  }
}
