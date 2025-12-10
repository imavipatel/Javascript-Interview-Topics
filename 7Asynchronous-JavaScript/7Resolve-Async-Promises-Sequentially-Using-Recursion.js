// ============================================================================
// 7) Resolve Async Promises Sequentially using Recursion
// ============================================================================

// ----------------------------------------------------------------------------
// 🔹 THEORY
// ----------------------------------------------------------------------------
// 1. By default, Promises are asynchronous but they run concurrently
//    if we start them all together.
//
// 2. Sometimes, we need them to execute one after another
//    → example: API calls where second depends on the first.
//
// 3. Sequential execution can be achieved by:
//    a) Promise chaining
//    b) Recursion (calling the next task after the previous resolves)
//    c) Async/Await with loops (we’ll cover later)
//
// 4. Why recursion?
//    - It provides a clean way to execute promises one by one.
//    - Useful when we have an array of async tasks.
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// ✅ Example 1: Sequential execution with recursion
// ----------------------------------------------------------------------------
function asyncTask(time, label) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Task ${label} completed`);
      resolve(label);
    }, time);
  });
}

let tasks = [
  () => asyncTask(1000, "A"),
  () => asyncTask(500, "B"),
  () => asyncTask(700, "C"),
];

// Recursive runner
function runSequentially(tasks, index = 0) {
  if (index === tasks.length) return Promise.resolve(); // Base case
  return tasks[index]().then(() => runSequentially(tasks, index + 1));
}

runSequentially(tasks);
// Output:
// Task A completed (after 1s)
// Task B completed (after 0.5s, but only after A)
// Task C completed (after 0.7s, but only after B)

// ----------------------------------------------------------------------------
// ✅ Example 2: Collect results sequentially
// ----------------------------------------------------------------------------
function runSequentiallyWithResults(tasks, index = 0, results = []) {
  if (index === tasks.length) return Promise.resolve(results);

  return tasks[index]().then((res) =>
    runSequentiallyWithResults(tasks, index + 1, [...results, res])
  );
}

runSequentiallyWithResults(tasks).then((res) => {
  console.log("All results:", res);
});
// Output:
// Task A completed
// Task B completed
// Task C completed
// All results: ["A", "B", "C"]

// ----------------------------------------------------------------------------
// 📌 INTERVIEW NOTES
// ----------------------------------------------------------------------------
// Q1: Why recursion for sequential promises?
// A1: It ensures the next promise runs only after the previous is resolved.
//
// Q2: What’s the base case in recursion here?
// A2: When index === tasks.length (all tasks completed).
//
// Q3: Can we solve this without recursion?
// A3: Yes → using reduce() or async/await with for...of loop.
//     But recursion is more explicit and interview-friendly.
//
// Q4: Real-life use case?
// A4: API requests that must run in order (e.g., login → fetch data → save).
// ============================================================================
