class Cache {
  constructor() {
    this.data = new Map();
  }

  set(key, value, accessCount = 1) {
    this.data.set(key, { value, accessCount });
  }

  get(key) {
    const entry = this.data.get(key);

    if (!entry.value) {
      return null;
    }

    if (entry.accessCount === 0) {
      this.data.delete(key);
      return null;
    }

    entry.accessCount -= 1;
    return entry.value;
  }

  getCacheStatistics() {
    const statistics = Array.from(this.data.entries()).map(([key, value]) => ({
      key,
      value: value.value,
      accessCount: value.accessCount,
    }));
    return statistics;
  }
}
export { Cache };
