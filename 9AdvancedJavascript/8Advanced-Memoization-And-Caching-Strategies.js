// ============================================================================
// 8) 📘 Advanced JS – Advanced Memoization & Caching Strategies
// ============================================================================
//
// Topics covered:
// 1) Memoization with multiple arguments
// 2) LRU (Least Recently Used) caching
// 3) Time-based cache expiration
//
// -----------------------------------------------------------------------------

// ============================================================================
// 1) Memoization with Multiple Arguments
// ============================================================================
// - Simple memoization works well for a single argument.
// - For multiple arguments, use **JSON.stringify(args)** as cache key.

function add(a, b) {
  console.log("Calculating:", a, b);
  return a + b;
}

function memoizeMultipleArgs(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key] !== undefined) {
      console.log("Fetching from cache:", key);
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const cachedAdd = memoizeMultipleArgs(add);
console.log(cachedAdd(2, 3)); // Calculating: 2 3 → 5
console.log(cachedAdd(2, 3)); // Fetching from cache: [2,3] → 5

// ============================================================================
// 2) LRU (Least Recently Used) Cache
// ============================================================================
// - LRU cache stores only a **limited number of items**.
// - When cache is full, **oldest used item is removed**.
// - Useful in memory-constrained applications.

class LRUCache {
  constructor(limit = 3) {
    this.cache = new Map();
    this.limit = limit;
  }

  get(key) {
    if (!this.cache.has(key)) return null;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value); // move to end (most recently used)
    return value;
  }

  set(key, value) {
    if (this.cache.size >= this.limit) {
      const firstKey = this.cache.keys().next().value; // remove oldest
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}

const lru = new LRUCache(2);
lru.set("a", 1);
lru.set("b", 2);
console.log(lru.get("a")); // 1
lru.set("c", 3); // removes "b"
console.log(lru.get("b")); // null

// ============================================================================
// 3) Time-based Cache Expiration
// ============================================================================
// - Automatically remove cached items after a **TTL (time-to-live)**.

function cacheWithTTL(fn, ttl = 3000) {
  const cache = new Map();
  return function (key) {
    const now = Date.now();
    if (cache.has(key)) {
      const { value, expiry } = cache.get(key);
      if (now < expiry) {
        console.log("Fetching from cache:", key);
        return value;
      } else {
        cache.delete(key); // expired
      }
    }
    const value = fn(key);
    cache.set(key, { value, expiry: now + ttl });
    return value;
  };
}

function fetchData(id) {
  console.log("Fetching data:", id);
  return { id, name: "User" + id };
}

const cachedFetchTTL = cacheWithTTL(fetchData, 2000);
console.log(cachedFetchTTL(1)); // Fetching data: 1
setTimeout(() => console.log(cachedFetchTTL(1)), 1000); // From cache
setTimeout(() => console.log(cachedFetchTTL(1)), 2500); // Fetching again (expired)

// ============================================================================
// 🔑 Key Points Summary
// ============================================================================
// 1) Memoization can handle multiple arguments using JSON.stringify as key
// 2) LRU cache helps manage memory by removing least recently used items
// 3) TTL-based cache automatically expires data after given time
// 4) Advanced caching improves **performance and memory usage**
// 5) Best used with **pure functions** to ensure correct results

// ============================================================================
// ❓ Q & A
// ============================================================================
// Q1) Why use JSON.stringify for multiple arguments in memoization?
// 👉 To generate a unique key for different argument combinations.
//
// Q2) What is LRU cache and when to use it?
// 👉 Stores limited items; removes least recently used when full. Useful in memory-sensitive apps.
//
// Q3) How does TTL caching work?
// 👉 Cache stores data with expiry time; expired items are recalculated or refetched.
//
// Q4) Can memoization work with asynchronous functions?
// 👉 Yes, but you need to store Promises in the cache.
//
// Q5) Difference between simple memoization and advanced caching?
// 👉 Simple memoization stores unlimited results; advanced caching may limit size, expire items, or handle multiple arguments.
