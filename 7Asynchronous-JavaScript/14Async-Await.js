// ============================================================================
// 14) Async / Await
// ============================================================================
//
// 📌 What is async/await?
// - Introduced in ES2017.
// - It makes working with Promises easier and code looks like synchronous code.
// - `async` keyword: makes a function always return a Promise.
// - `await` keyword: pauses execution until the Promise settles (resolves/rejects).
//
// ----------------------------------------------------------------------------
// ✅ Basic Example
// ----------------------------------------------------------------------------
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("✅ Data received!");
    }, 2000);
  });
}

async function getData() {
  console.log("⏳ Fetching...");
  let result = await fetchData(); // waits for promise
  console.log(result); // ✅ Data received!
}

getData();

// Output:
// ⏳ Fetching...
// (after 2s) ✅ Data received!
//
// ----------------------------------------------------------------------------
// ✅ Async functions always return a Promise
// ----------------------------------------------------------------------------
async function example() {
  return 42; // auto wrapped in Promise.resolve(42)
}
example().then((val) => console.log(val)); // 42
//
// ----------------------------------------------------------------------------
// ✅ Handling Errors with try/catch
// ----------------------------------------------------------------------------
function fetchWithError() {
  return new Promise((_, reject) => {
    setTimeout(() => reject("❌ Network error"), 1000);
  });
}

async function safeFetch() {
  try {
    let data = await fetchWithError();
    console.log(data);
  } catch (err) {
    console.log("Caught error:", err); // ❌ Network error
  } finally {
    console.log("Operation finished (success or fail).");
  }
}

safeFetch();
//
// ----------------------------------------------------------------------------
// ✅ Multiple awaits run sequentially (one after another)
// ----------------------------------------------------------------------------
function task(ms, name) {
  return new Promise((resolve) => setTimeout(() => resolve(name), ms));
}

async function runSequential() {
  let a = await task(1000, "Task A");
  console.log(a);
  let b = await task(1000, "Task B");
  console.log(b);
}

runSequential();
// Takes ~2s (runs one after another)
//
// ----------------------------------------------------------------------------
// ✅ Run Promises in parallel with Promise.all()
// ----------------------------------------------------------------------------
async function runParallel() {
  let results = await Promise.all([task(1000, "Task 1"), task(1000, "Task 2")]);
  console.log(results); // [ 'Task 1', 'Task 2' ]
}

runParallel();
// Takes ~1s (runs at same time)
//
// ----------------------------------------------------------------------------
// ❓ Interview Q&A
// ----------------------------------------------------------------------------
//
// Q1) What does `async` keyword do?
// 👉 Makes function return a Promise automatically.
//
// Q2) What does `await` do?
// 👉 Pauses execution until the Promise resolves/rejects.
//
// Q3) Can we use `await` outside async function?
// 👉 ❌ No (except in modern ES modules or REPL environments).
//
// Q4) How do you handle errors in async/await?
// 👉 Use `try/catch` just like synchronous code.
//
// Q5) What’s the difference between sequential and parallel awaits?
// 👉 Sequential: waits one by one (slower).
// 👉 Parallel: run all at once using Promise.all() (faster).
//
// Q6) Async vs Promise.then()?
// 👉 Async/await is just syntactic sugar over Promises. It makes code easier to read.
//
// ----------------------------------------------------------------------------
// ✅ Easy to Remember
// ----------------------------------------------------------------------------
// async → function returns a Promise
// await → wait for Promise result
// try/catch → handle errors
//
// ============================================================================
// End of Async/Await Notes
// ============================================================================
