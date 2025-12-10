// ============================================================================
// 10) 📘 Advanced JS – Execute Tasks in Parallel
// ============================================================================
//
// Topics covered:
// 1) What is parallel execution
// 2) Using Promise.all
// 3) Using Promise.allSettled
// 4) Practical examples
//
// -----------------------------------------------------------------------------

// ============================================================================
// 1) What is Parallel Execution?
// ============================================================================
// - Parallel execution means **running multiple asynchronous tasks simultaneously**.
// - This is faster than running them **sequentially**.
// - JavaScript is single-threaded, but async tasks (like fetch or setTimeout) are handled in **background threads** (Web APIs) and results are returned via the **event loop**.

// Example: Sequential vs Parallel
async function sequentialTasks() {
  console.time("Sequential");
  await new Promise((r) => setTimeout(r, 1000)); // task 1
  await new Promise((r) => setTimeout(r, 1000)); // task 2
  console.timeEnd("Sequential"); // ~2 seconds
}

async function parallelTasks() {
  console.time("Parallel");
  await Promise.all([
    new Promise((r) => setTimeout(r, 1000)), // task 1
    new Promise((r) => setTimeout(r, 1000)), // task 2
  ]);
  console.timeEnd("Parallel"); // ~1 second
}

sequentialTasks();
parallelTasks();

// ============================================================================
// 2) Using Promise.all
// ============================================================================
// - `Promise.all([...promises])` runs all promises in parallel
// - Resolves **only when all promises succeed**
// - If any promise fails, the entire Promise.all rejects

const task1 = () =>
  new Promise((res) => setTimeout(() => res("Task 1 done"), 1000));
const task2 = () =>
  new Promise((res) => setTimeout(() => res("Task 2 done"), 2000));

Promise.all([task1(), task2()])
  .then((results) => console.log(results)) // ["Task 1 done", "Task 2 done"]
  .catch((err) => console.error(err));

// ============================================================================
// 3) Using Promise.allSettled
// ============================================================================
// - `Promise.allSettled([...promises])` waits for **all promises** to finish regardless of success/failure
// - Returns an array of objects { status: "fulfilled"/"rejected", value/reason }

const task3 = () => Promise.resolve("Success");
const task4 = () => Promise.reject("Failed");

Promise.allSettled([task3(), task4()]).then((results) => console.log(results));
/*
[
  { status: "fulfilled", value: "Success" },
  { status: "rejected", reason: "Failed" }
]
*/

// ============================================================================
// 4) Practical Examples
// ============================================================================

// a) Fetch multiple APIs in parallel
async function fetchUsersAndPosts() {
  const [users, posts] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users").then((r) => r.json()),
    fetch("https://jsonplaceholder.typicode.com/posts").then((r) => r.json()),
  ]);
  console.log("Users:", users.length);
  console.log("Posts:", posts.length);
}

fetchUsersAndPosts();

// ============================================================================
// 🔑 Key Points Summary
// ============================================================================
// 1) Parallel execution speeds up multiple async tasks
// 2) Use Promise.all for all tasks succeeding
// 3) Use Promise.allSettled to handle failures individually
// 4) JavaScript async tasks still run on single-threaded main thread, but underlying IO is parallel
// 5) Avoid unnecessary sequential awaits when tasks are independent

// ============================================================================
// ❓ Q & A
// ============================================================================
// Q1) Difference between sequential and parallel execution?
// 👉 Sequential runs one after another; parallel runs multiple tasks at the same time.
//
// Q2) When to use Promise.all vs Promise.allSettled?
// 👉 Use Promise.all if you want all tasks to succeed. Use allSettled if you want results even if some fail.
//
// Q3) Does Promise.all execute in a new thread?
// 👉 No, JS is single-threaded; Promise tasks run via Web APIs or event loop asynchronously.
//
// Q4) Can we mix async/await with parallel execution?
// 👉 Yes, wrap multiple await promises inside Promise.all() for parallelism.
//
// Q5) What happens if one promise in Promise.all fails?
// 👉 The entire Promise.all rejects immediately.
