export class CacheService<K, V> {
  private state;

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
}
