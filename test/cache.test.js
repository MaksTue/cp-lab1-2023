import { Cache } from "../src/cache";

test("should set and get values", () => {
  const cache = new Cache();
  cache.set("key1", "value1");
  cache.set("key2", "value2", 2);

  expect(cache.get("key1")).toBe("value1");
  expect(cache.get("key2")).toBe("value2");
  expect(cache.get("key2")).toBe("value2");
});

test("should decrement accessCount", () => {
  const cache = new Cache();
  cache.set("key1", "value1", 3);

  expect(cache.get("key1")).toBe("value1");
  expect(cache.get("key1")).toBe("value1");
  expect(cache.get("key1")).toBe("value1");
  expect(cache.get("key1")).toBe(null);
});

test("should remove entries with accessCount 0", () => {
  const cache = new Cache();
  cache.set("key1", "value1", 2);

  expect(cache.get("key1")).toBe("value1");
  expect(cache.get("key1")).toBe("value1");
  expect(cache.get("key1")).toBe(null);
  expect(cache.getCacheStatistics()).toEqual([]);
});

test("should return cache statistics", () => {
  const cache = new Cache();
  cache.set("key1", "value1", 2);
  cache.set("key2", "value2", 1);

  expect(cache.getCacheStatistics()).toEqual([
    { key: "key1", value: "value1", accessCount: 2 },
    { key: "key2", value: "value2", accessCount: 1 },
  ]);
});

test("should return null when value is null", () => {
  const cache = new Cache();
  cache.set("key1", null, 2);

  expect(cache.get("key1")).toBe(null);
});
