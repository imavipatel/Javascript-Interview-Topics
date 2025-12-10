// ============================================================================
// 7) 📘 Advanced JS – Memoization & Caching
// ============================================================================
//
// Topics covered:
// 1) Memoization
// 2) Caching functions
//
// -----------------------------------------------------------------------------

// ============================================================================
// 1) Memoization
// ============================================================================
// - Memoization is a **technique to store results** of expensive function calls.
// - If the same inputs occur again, return the **cached result** instead of recalculating.
// - Improves performance, especially for recursive or heavy computations.

function slowFib(n) {
  if (n <= 1) return n;
  return slowFib(n - 1) + slowFib(n - 2);
}

console.log(slowFib(10)); // 55 (takes longer for larger n)

// Memoized version
function memoize(fn) {
  const cache = {};
  return function (n) {
    if (cache[n] !== undefined) {
      console.log("Fetching from cache:", n);
      return cache[n];
    }
    console.log("Calculating:", n);
    const result = fn(n);
    cache[n] = result;
    return result;
  };
}

const fastFib = memoize(slowFib);
console.log(fastFib(10)); // Calculating: 10 → 55
console.log(fastFib(10)); // Fetching from cache: 10 → 55

// ============================================================================
// 2) Caching Functions
// ============================================================================
// - Similar to memoization but can be applied to **any function**.
// - Useful for **API responses, expensive calculations, or database queries**.

function fetchUserData(id) {
  console.log("Fetching data for user:", id);
  return { id, name: "User" + id };
}

const cacheFunc = (fn) => {
  const cache = {};
  return function (id) {
    if (cache[id]) return cache[id];
    const result = fn(id);
    cache[id] = result;
    return result;
  };
};

const cachedFetch = cacheFunc(fetchUserData);
console.log(cachedFetch(1)); // Fetching data for user: 1
console.log(cachedFetch(1)); // Returned from cache

// ============================================================================
// 🔑 Key Points Summary
// ============================================================================
// 1) Memoization stores results of function calls for future reuse
// 2) Caching is general technique to save expensive computations or API calls
// 3) Helps improve **performance** and reduce redundant processing
// 4) Use carefully: caching too much data can increase memory usage
// 5) Works best with **pure functions** (no side-effects)

// ============================================================================
// ❓ Q & A
// ============================================================================
// Q1) Difference between memoization and caching?
// 👉 Memoization caches **function results**, caching can store any expensive computation or data.
//
// Q2) Can memoization work with multiple arguments?
// 👉 Yes, but the cache key must be unique (e.g., using JSON.stringify(args)).
//
// Q3) Should we memoize functions with side-effects?
// 👉 No, memoization should be used with **pure functions** only.
//
// Q4) How is memoization implemented in JS?
// 👉 Usually with an object or Map to store results keyed by input parameters.
//
// Q5) Why is memoization important in recursion?
// 👉 Prevents repeated calculation of same subproblems, improving efficiency exponentially.
