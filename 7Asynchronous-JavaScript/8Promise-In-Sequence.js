// ============================================================================
// 8) Promise in Sequence
// ============================================================================

// ----------------------------------------------------------------------------
// 🔹 THEORY
// ----------------------------------------------------------------------------
// 1. When we have multiple async tasks in an array, we often want to run them
//    one after another (sequentially).
//
// 2. Unlike recursion, here we use:
//    - Array.reduce() to chain promises
//    - This creates a "pipeline" of promises
//
// 3. Why needed?
//    - Batch processing APIs
//    - Ordered database operations
//    - Animation steps or sequential UI updates
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// ✅ Example 1: Sequential promises using reduce()
// ----------------------------------------------------------------------------
function asyncTask(time, label) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Task ${label} completed`);
      resolve(label);
    }, time);
  });
}

let tasks1 = [
  () => asyncTask(1000, "A"),
  () => asyncTask(500, "B"),
  () => asyncTask(700, "C"),
];

// Using reduce to chain promises
tasks1
  .reduce(
    (promiseChain, currentTask) => promiseChain.then(() => currentTask()), // wait for prev, then run current
    Promise.resolve() // start with resolved promise
  )
  .then(() => console.log("All tasks done!"));

// Output:
// Task A completed (after 1s)
// Task B completed (after A)
// Task C completed (after B)
// All tasks done!

// ----------------------------------------------------------------------------
// ✅ Example 2: Collect results in sequence
// ----------------------------------------------------------------------------
tasks1
  .reduce(
    (promiseChain, currentTask) =>
      promiseChain.then((results) =>
        currentTask().then((res) => [...results, res])
      ),
    Promise.resolve([]) // initial empty results array
  )
  .then((results) => console.log("Results:", results));

// Output:
// Task A completed
// Task B completed
// Task C completed
// Results: ["A", "B", "C"]

// ----------------------------------------------------------------------------
// 📌 INTERVIEW NOTES
// ----------------------------------------------------------------------------
// Q1: What is "Promise in sequence"?
// A1: Running an array of promises one after another, ensuring order.
//
// Q2: Difference from recursion approach?
// A2:
// - Recursion → explicit function call per step
// - reduce() → elegant, functional style pipeline
//
// Q3: Which one is more common in real codebases?
// A3: reduce() approach is cleaner for arrays of tasks.
//     Recursion is good for interview demonstration & flexibility.
//
// Q4: How is this different from Promise.all?
// A4:
// - Promise.all → runs tasks concurrently (parallel)
// - Sequence → runs tasks one-by-one, in order.
//
// Q5: Real-world use case?
// A5: Uploading multiple files in order, saving ordered DB migrations,
//     performing dependent API calls in correct sequence.
// ============================================================================
