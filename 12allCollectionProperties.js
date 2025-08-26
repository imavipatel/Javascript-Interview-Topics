// ===============================================================
// 📘 JavaScript Notes: Collections (Map, Set, WeakMap, WeakSet, etc.)
// ===============================================================

// Topics covered:
// 1) Map
// 2) WeakMap
// 3) mapLimit() concurrency
// 4) Implement Least Recently Used (LRU) Cache
// 5) Streaming tasks with mapLimit (stream of data every 1 sec + prioritization)
// 6) Set
// 7) WeakSet
// 8) Optional Chaining (?.)
// 9) Q&A Section
// ===============================================================

// ---------------------------------------------------------------
// 1) MAP
// ---------------------------------------------------------------
/*
- A Map holds key-value pairs (like an object) but with better features:
  ✅ Keys can be any type (objects, functions, primitives).
  ✅ Maintains insertion order.
  ✅ Provides built-in methods like set(), get(), has(), delete(), size.
*/

let myMap = new Map();
myMap.set("name", "Alice");
myMap.set(1, "Number key");
myMap.set({ id: 101 }, "Object key");

console.log(myMap.get("name")); // "Alice"
console.log(myMap.has(1)); // true
console.log(myMap.size); // 3

// Iterating Map
for (let [key, value] of myMap) {
  console.log(key, ":", value);
}

// ---------------------------------------------------------------
// 2) WEAKMAP
// ---------------------------------------------------------------
/*
- WeakMap is like Map but:
  ✅ Keys must be objects only.
  ✅ Keys are weakly referenced → garbage collected when not used.
  ❌ Not iterable (cannot loop over).
  - Useful for storing private data or caching without memory leaks.
*/

let weakMap = new WeakMap();
let obj = {};
weakMap.set(obj, "secret");

console.log(weakMap.get(obj)); // "secret"

obj = null; // object becomes unreachable → entry auto garbage collected

// ---------------------------------------------------------------
// 3) mapLimit() - Concurrency Control
// ---------------------------------------------------------------
/*
- mapLimit runs tasks on an array with LIMITED concurrency.
- Example: Process 2 tasks at a time instead of all at once.
*/

async function mapLimit(arr, limit, asyncTask) {
  let results = [];
  let running = [];

  for (let item of arr) {
    let task = asyncTask(item).then((res) => {
      running.splice(running.indexOf(task), 1);
      return res;
    });
    results.push(task);
    running.push(task);

    if (running.length >= limit) {
      await Promise.race(running);
    }
  }
  return Promise.all(results);
}

// Example usage
async function fakeTask(id) {
  console.log(`Task ${id} started`);
  await new Promise((res) => setTimeout(res, 1000));
  console.log(`Task ${id} done`);
  return id;
}

mapLimit([1, 2, 3, 4, 5], 2, fakeTask).then(console.log);

// ---------------------------------------------------------------
// 4) IMPLEMENTING LRU (Least Recently Used) CACHE
// ---------------------------------------------------------------
/*
- LRU Cache keeps track of recently used items.
- When capacity is full → remove least recently used item.
- Map is perfect for this because it maintains insertion order.
*/

class LRUCache {
  constructor(capacity) {
    this.cache = new Map();
    this.capacity = capacity;
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    let value = this.cache.get(key);
    // Refresh key by re-inserting
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    if (this.cache.size >= this.capacity) {
      // Remove least recently used (first item)
      let oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value);
  }
}

// Usage:
let lru = new LRUCache(2);
lru.put(1, "A");
lru.put(2, "B");
console.log(lru.get(1)); // "A" (refreshes key 1)
lru.put(3, "C"); // removes least used (key 2)
console.log(lru.get(2)); // -1 (not found)

// ---------------------------------------------------------------
// 5) STREAMING TASKS WITH mapLimit + PRIORITIZATION
// ---------------------------------------------------------------
/*
- Imagine a stream of data coming every 1 second.
- Process with mapLimit (only few at a time).
- With prioritization → some tasks get processed first.
*/

class TaskQueue {
  constructor(limit) {
    this.limit = limit;
    this.running = 0;
    this.queue = [];
  }

  add(task, priority = 0) {
    this.queue.push({ task, priority });
    this.queue.sort((a, b) => b.priority - a.priority);
    this.runNext();
  }

  async runNext() {
    if (this.running >= this.limit || this.queue.length === 0) return;

    let { task } = this.queue.shift();
    this.running++;
    await task();
    this.running--;
    this.runNext();
  }
}

// Example usage
let q = new TaskQueue(2);

function createTask(id, time) {
  return async () => {
    console.log(`Task ${id} started`);
    await new Promise((r) => setTimeout(r, time));
    console.log(`Task ${id} finished`);
  };
}

q.add(createTask(1, 2000), 1);
q.add(createTask(2, 1000), 2); // Higher priority
q.add(createTask(3, 1500), 1);

// ---------------------------------------------------------------
// 6) SET
// ---------------------------------------------------------------
/*
- Set stores unique values only.
- Order is maintained.
- Useful for removing duplicates.
*/

let mySet = new Set([1, 2, 2, 3, 4]);
console.log(mySet); // {1,2,3,4}

mySet.add(5);
console.log(mySet.has(3)); // true
mySet.delete(2);

for (let val of mySet) {
  console.log(val);
}

// ---------------------------------------------------------------
// 7) WEAKSET
// ---------------------------------------------------------------
/*
- Like Set but only stores objects.
- Objects are weakly held (GC can remove them if no references).
- Not iterable.
*/

let weakSet = new WeakSet();
let obj1 = {};
weakSet.add(obj1);

console.log(weakSet.has(obj1)); // true

obj1 = null; // GC cleans up entry automatically

// ---------------------------------------------------------------
// 8) OPTIONAL CHAINING (?.)
// ---------------------------------------------------------------
/*
- Safe way to access nested properties without error.
- If property doesn’t exist → returns undefined instead of crashing.
*/

let user = { profile: { name: "Alice" } };
console.log(user?.profile?.name); // "Alice"
console.log(user?.address?.city); // undefined (safe, no error)

// With function call
let api = { getData: () => "Data" };
console.log(api.getData?.()); // "Data"

// ---------------------------------------------------------------
// 9) Q&A SECTION
// ---------------------------------------------------------------

// Q1) Difference between Map and Object?
// - Map allows any key type, Object keys are strings/symbols.
// - Map maintains insertion order, Object does not guarantee.
// - Map has size property, Object needs manual count.
// - Map is better for frequent additions/removals.

// Q2) Why use WeakMap over Map?
// - WeakMap prevents memory leaks by allowing GC to clean keys.
// - Useful for private data or caching tied to object lifetimes.

// Q3) What’s the difference between Set and Array?
// - Set stores unique values, Array allows duplicates.
// - Set is faster for lookups, Array is better for indexing.

// Q4) Why is WeakSet useful?
// - Helps avoid memory leaks when tracking object references.
// - Example: keeping track of visited DOM nodes.

// Q5) What is LRU Cache?
// - Data structure that removes least recently used items first.
// - Common in browsers, databases, caching libraries.

// Q6) What is Optional Chaining used for?
// - To avoid runtime errors when accessing deep properties.
// - Prevents `Cannot read property 'x' of undefined` errors.

// Q7) Can Map/Set be JSON stringified?
// - ❌ No, they are not supported directly.
// - Convert to Array: `JSON.stringify([...map])`

// Q8) Difference between Map and WeakMap in iteration?
// - Map is iterable with for...of
// - WeakMap is not iterable (keys hidden for GC reasons).
