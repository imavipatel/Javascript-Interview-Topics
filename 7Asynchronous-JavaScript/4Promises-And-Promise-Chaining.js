// -----------------------------------------------------------------------------
// 4) Promises & Promise Chaining
// -----------------------------------------------------------------------------
//
// -----------------------------------------------------------------------------
// Part 1: What is a Promise?
// -----------------------------------------------------------------------------
//
// - A Promise is an object that represents the eventual completion (or failure)
//   of an asynchronous operation.
// - States of a Promise:
//   1) pending   → initial state
//   2) fulfilled → operation successful (resolved)
//   3) rejected  → operation failed
//
// - Once resolved/rejected → state is final (immutable).
//
// Syntax:
// let promise = new Promise((resolve, reject) => { ... });
//
// -----------------------------------------------------------------------------
// Part 2: Basic Example
// -----------------------------------------------------------------------------
let promise = new Promise((resolve, reject) => {
  let success = true;

  setTimeout(() => {
    if (success) {
      resolve("✅ Data fetched successfully!");
    } else {
      reject("❌ Failed to fetch data!");
    }
  }, 1000);
});

// Handling with .then() and .catch()
promise
  .then((result) => {
    console.log("Result:", result);
  })
  .catch((error) => {
    console.log("Error:", error);
  })
  .finally(() => {
    console.log("Promise completed ✅");
  });

// Output after 1s (if success=true):
// Result: ✅ Data fetched successfully!
// Promise completed ✅
//
// -----------------------------------------------------------------------------
// Part 3: Why Promises? (Benefits over Callbacks)
// -----------------------------------------------------------------------------
// - Avoid Callback Hell (flatten nesting).
// - Easier error handling (.catch()).
// - Composable (Promise.all, race, etc.).
// - Improves readability with chaining/async-await.
//
// -----------------------------------------------------------------------------
// Part 4: Promise Chaining
// -----------------------------------------------------------------------------
//
// - We can return a new Promise from .then()
// - Each .then() returns a new promise automatically.
//
// Example: Sequential execution
function step1() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Step 1 complete"), 1000)
  );
}
function step2() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Step 2 complete"), 1000)
  );
}
function step3() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Step 3 complete"), 1000)
  );
}

step1()
  .then((res) => {
    console.log(res);
    return step2();
  })
  .then((res) => {
    console.log(res);
    return step3();
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("Error occurred:", err);
  });

// Output:
// Step 1 complete
// Step 2 complete
// Step 3 complete
//
// -----------------------------------------------------------------------------
// Part 5: Returning Values in Chain
// -----------------------------------------------------------------------------
new Promise((resolve) => resolve(10))
  .then((num) => {
    console.log("First:", num); // 10
    return num * 2;
  })
  .then((num) => {
    console.log("Second:", num); // 20
    return num * 2;
  })
  .then((num) => {
    console.log("Third:", num); // 40
  });

// -----------------------------------------------------------------------------
// Part 6: Error Handling in Chaining
// -----------------------------------------------------------------------------
new Promise((_, reject) => reject("❌ Something went wrong"))
  .then((res) => {
    console.log("This will not run:", res);
  })
  .catch((err) => {
    console.log("Caught error:", err);
    return "Recovered value";
  })
  .then((res) => {
    console.log("After recovery:", res);
  });

// Output:
// Caught error: ❌ Something went wrong
// After recovery: Recovered value
//
// -----------------------------------------------------------------------------
// Part 7: Parallel Execution (vs Chaining)
// -----------------------------------------------------------------------------
//
// - Chaining = sequential execution.
// - Promise.all = parallel execution.
//
function asyncTask(ms) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(`Task ${ms} done`), ms)
  );
}

Promise.all([asyncTask(1000), asyncTask(2000), asyncTask(1500)]).then(
  (results) => console.log("Parallel Results:", results)
);

// Output after ~2s:
// Parallel Results: [ 'Task 1000 done', 'Task 2000 done', 'Task 1500 done' ]
//
// -----------------------------------------------------------------------------
// Part 8: Interview Q&A
// -----------------------------------------------------------------------------
//
// Q1) What is a Promise?
// 👉 A wrapper for asynchronous operations that can be pending, resolved, or rejected.
//
// Q2) Why are Promises better than callbacks?
// 👉 Cleaner syntax, better error handling, avoid Callback Hell, composable.
//
// Q3) What is Promise Chaining?
// 👉 Linking multiple .then() calls, where each step runs after the previous resolves.
//
// Q4) How to handle errors in chaining?
// 👉 Using .catch() at the end (or after any .then()).
//
// Q5) Difference between sequential & parallel execution in Promises?
// 👉 Sequential → chaining (one after another).
// 👉 Parallel → Promise.all (all run together).
//
// -----------------------------------------------------------------------------
// ✅ Summary
// -----------------------------------------------------------------------------
// - Promises handle async operations better than callbacks.
// - Promise chaining = sequential execution of async tasks.
// - Use .then(), .catch(), .finally().
// - Parallel execution with Promise.all.
// - Async/Await makes it even more readable.
// -----------------------------------------------------------------------------
