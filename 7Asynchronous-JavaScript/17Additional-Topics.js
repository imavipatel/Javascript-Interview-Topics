// ============================================================================
// 17) Additional Topics in Asynchronous JavaScript
// ============================================================================

// ============================================================================
// a) Error handling in async code (try/catch/finally with async/await)
// ============================================================================
//
// 👉 In async/await, errors are handled using try...catch (like synchronous code).
// 👉 finally block runs ALWAYS (success or error).
//
// ----------------------------------------------------------------------------
// Example:
async function fetchData() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    let data = await response.json();
    console.log("✅ Data:", data);
  } catch (error) {
    console.error("❌ Error caught:", error);
  } finally {
    console.log("🛑 Cleanup done (runs always).");
  }
}
fetchData();

// ----------------------------------------------------------------------------
// Q&A
// Q1: How to handle errors in async/await?
// 👉 Wrap with try...catch.
// Q2: When does finally run?
// 👉 Always, whether success or error.

// ============================================================================
// b) Promise.allSettled vs Promise.all
// ============================================================================
//
// 👉 Promise.all
//    - Waits for ALL promises.
//    - If ANY fails → whole thing fails.
//
// 👉 Promise.allSettled
//    - Waits for ALL promises.
//    - Never fails → gives results for each (status + value/reason).
//
// ----------------------------------------------------------------------------
// Example:
let p11 = Promise.resolve("✅ Success 1");
let p22 = Promise.reject("❌ Failed 2");
let p33 = Promise.resolve("✅ Success 3");

// Promise.all
Promise.all([p11, p22, p33])
  .then(console.log)
  .catch((err) => console.log("Promise.all Error:", err));

// Promise.allSettled
Promise.allSettled([p11, p22, p33]).then(console.log);

// ----------------------------------------------------------------------------
// Q&A
// Q1: Difference between Promise.all and Promise.allSettled?
// 👉 all → fails if any fail.
// 👉 allSettled → always gives results (success/failure info).

// ============================================================================
// c) Difference between Promise.resolve() & Promise.reject()
// ============================================================================
//
// 👉 Promise.resolve(value)
//    - Returns a resolved promise with given value.
//
// 👉 Promise.reject(error)
//    - Returns a rejected promise with given error.
//
// ----------------------------------------------------------------------------
// Example:
Promise.resolve("Hello").then(console.log); // ✅ Hello
Promise.reject("Error!").catch(console.log); // ❌ Error!

// ----------------------------------------------------------------------------
// Q&A
// Q1: What does Promise.resolve() do?
// 👉 Creates a resolved promise immediately.
// Q2: What about Promise.reject()?
// 👉 Creates a rejected promise immediately.

// ============================================================================
// d) Async Generators (for-await-of)
// ============================================================================
//
// 👉 Generators that work with async code (yield promises).
// 👉 Use `for-await-of` loop to consume them.
//
// ----------------------------------------------------------------------------
// Example:
async function* asyncNumbers() {
  yield 1;
  yield Promise.resolve(2);
  yield new Promise((res) => setTimeout(() => res(3), 1000));
}

(async () => {
  for await (let num of asyncNumbers()) {
    console.log("Number:", num);
  }
})();

// ----------------------------------------------------------------------------
// Q&A
// Q1: What is an async generator?
// 👉 A generator that yields promises (can use await).
// Q2: How do you consume it?
// 👉 With for-await-of loop.

// ============================================================================
// e) Queue management / Task scheduling
// ============================================================================
//
// 👉 JavaScript runs tasks using Event Loop → Macro & Micro tasks.
// 👉 We can schedule tasks using: setTimeout, setImmediate, process.nextTick.
//
// ----------------------------------------------------------------------------
// Example:
console.log("1. Start");

setTimeout(() => console.log("3. Timeout (Macrotask)"), 0);

Promise.resolve().then(() => console.log("2. Microtask (Promise)"));

console.log("4. End");

// Output order:
// 1. Start
// 4. End
// 2. Microtask (Promise)
// 3. Timeout (Macrotask)
//
// ----------------------------------------------------------------------------
// Q&A
// Q1: Which runs first, microtasks or macrotasks?
// 👉 Microtasks (Promises) always run before Macrotasks (setTimeout).
// Q2: Why queue management is important?
// 👉 Helps avoid blocking UI & ensures smooth async execution.

// ============================================================================
// ✅ Easy Recap
// ----------------------------------------------------------------------------
// - try/catch/finally → handle errors in async code
// - Promise.all vs allSettled → all fails fast, allSettled never fails
// - resolve vs reject → create resolved/rejected promises
// - async generators → yield promises, consume with for-await-of
// - queue mgmt → Microtasks (faster) before Macrotasks
// ============================================================================
