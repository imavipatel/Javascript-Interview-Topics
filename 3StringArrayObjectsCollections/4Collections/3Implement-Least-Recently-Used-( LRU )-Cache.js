/*  
=====================================================
📘 Least Recently Used (LRU) Cache
=====================================================

🔹 THEORY

1. What is an LRU Cache?
- LRU = "Least Recently Used"
- It’s a cache mechanism that keeps only a limited number of items.
- When cache is full → remove the item that was least recently accessed (oldest).

2. Why do we need it?
- To optimize memory usage by storing only frequently used items.
- Used in browsers, databases, OS memory paging, etc.
- Ensures fast lookup while keeping memory bounded.

3. Characteristics:
- **Capacity**: maximum items the cache can hold.
- **Eviction Policy**: when full, remove least recently used.
- **Operations**:
  - `get(key)` → return value if present, else -1.
  - `put(key, value)` → add/update key; if over capacity, evict LRU.

4. Best Data Structure for LRU:
- **HashMap + Doubly Linked List**
  - HashMap → O(1) access to nodes.
  - Doubly Linked List → O(1) insert/remove from head/tail.
- Alternative: In JavaScript, `Map` maintains insertion order, so it can be used.

-----------------------------------------------------
⭐ QUICK SUMMARY
- LRU Cache = fixed-size memory with eviction of oldest used.
- Used in OS, databases, caching APIs, etc.
=====================================================
*/

// --------------------------------------------------
// 🔹 Example 1: Simple LRU Cache using Map
// --------------------------------------------------
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    // Move item to end (most recently used)
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    // If already exists → update & move to end
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, value);

    // If over capacity → remove least recently used (first item)
    if (this.cache.size > this.capacity) {
      const firstKey = this.cache.keys().next().value; // first inserted key
      this.cache.delete(firstKey);
    }
  }
}

// --------------------------------------------------
// 🔹 Example 2: Usage
// --------------------------------------------------
const lru = new LRUCache(3);

lru.put(1, "A"); // cache = {1:A}
lru.put(2, "B"); // cache = {1:A, 2:B}
lru.put(3, "C"); // cache = {1:A, 2:B, 3:C}

console.log(lru.get(1)); // "A" → moves 1 to most recent → {2:B, 3:C, 1:A}

lru.put(4, "D"); // removes 2 (least used) → {3:C, 1:A, 4:D}

console.log(lru.get(2)); // -1 (evicted)
console.log(lru.get(3)); // "C"
console.log(lru.get(4)); // "D"

/*
Output:
A
-1
C
D
*/

// --------------------------------------------------
// 🔹 Example 3: Advanced Implementation with Doubly Linked List
// (Used in real-world systems for performance)
// --------------------------------------------------
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCacheDLL {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();

    // dummy head & tail
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _add(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this._remove(node);
    this._add(node); // move to front (most recent)
    return node.value;
  }

  put(key, value) {
    if (this.map.has(key)) {
      this._remove(this.map.get(key));
    }

    const node = new Node(key, value);
    this._add(node);
    this.map.set(key, node);

    if (this.map.size > this.capacity) {
      const lru = this.tail.prev;
      this._remove(lru);
      this.map.delete(lru.key);
    }
  }
}

/*  
-----------------------------------------------------
❓ Q&A (Interview Style)
-----------------------------------------------------

Q1: What is the time complexity of LRU Cache operations?  
👉 `get()` and `put()` both run in **O(1)** using HashMap + Doubly Linked List.  

Q2: Why not just use an Array for LRU?  
👉 Removing from middle of array = O(n), too slow. Map + DLL ensures O(1).  

Q3: What happens when cache is full?  
👉 The least recently used (oldest) item is removed.  

Q4: Can JavaScript Map be used instead of Linked List?  
👉 Yes ✅, because `Map` maintains insertion order and allows O(1) deletion.  
   But for **very high-performance systems**, Linked List + HashMap is preferred.  

Q5: Real-world uses of LRU Cache?  
👉 - Browser caching (images, assets)  
   - Database query results  
   - Operating system page replacement  
   - CDN caching  

*/
