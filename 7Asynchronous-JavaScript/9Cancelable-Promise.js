// ============================================================================
// 9) Cancelable Promise
// ============================================================================

// ----------------------------------------------------------------------------
// 🔹 THEORY
// ----------------------------------------------------------------------------
// 1. Normal Promises in JavaScript cannot be canceled once started.
// 2. However, in real-world apps, we sometimes need to stop a pending task:
//    - Cancel API requests if user navigates away
//    - Stop long-running calculations
//    - Abort when newer request comes in
//
// 3. How to achieve cancellation?
//    - Wrap the promise in a custom "cancelable" wrapper
//    - Use an external flag (like isCanceled)
//    - Reject the promise with a special error when canceled
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// ✅ Example 1: Basic Cancelable Promise
// ----------------------------------------------------------------------------
function makeCancelable(promise) {
  let isCanceled = false;

  const wrapped = new Promise((resolve, reject) => {
    promise.then(
      (val) => (isCanceled ? reject({ canceled: true }) : resolve(val)),
      (err) => (isCanceled ? reject({ canceled: true }) : reject(err))
    );
  });

  return {
    promise: wrapped,
    cancel() {
      isCanceled = true;
    },
  };
}

// Usage:
let task = makeCancelable(
  new Promise((resolve) => setTimeout(() => resolve("Task finished!"), 2000))
);

task.promise
  .then((res) => console.log(res))
  .catch((err) => {
    if (err.canceled) console.log("Promise was canceled!");
    else console.log("Error:", err);
  });

// Cancel after 1 second (before promise resolves)
setTimeout(() => task.cancel(), 1000);

// Output:
// Promise was canceled!

// ----------------------------------------------------------------------------
// ✅ Example 2: Cancelable Fetch (with AbortController)
// ----------------------------------------------------------------------------
// Modern JS provides AbortController for fetch cancellation
function cancelableFetch(url) {
  const controller = new AbortController();
  const signal = controller.signal;

  const promise = fetch(url, { signal });
  return { promise, cancel: () => controller.abort() };
}

let req = cancelableFetch("https://jsonplaceholder.typicode.com/todos/1");

req.promise
  .then((res) => res.json())
  .then((data) => console.log("Fetched:", data))
  .catch((err) => {
    if (err.name === "AbortError") console.log("Fetch canceled!");
    else console.log("Error:", err);
  });

// Cancel fetch immediately
req.cancel();

// ----------------------------------------------------------------------------
// 📌 INTERVIEW NOTES
// ----------------------------------------------------------------------------
// Q1: Why do we need cancelable promises?
// A1: To stop unnecessary work → e.g., user navigates away, latest API request
//     should cancel previous ones to save bandwidth & performance.
//
// Q2: Are native Promises cancelable?
// A2: No. By design, Promises don't have built-in cancellation.
//
// Q3: How to implement?
// A3:
// - Wrap with custom cancelable logic (Example 1).
// - Or use AbortController with fetch (modern & preferred).
//
// Q4: Real-world use cases?
// A4:
// - Cancel API requests
// - Cancel file uploads
// - Cancel animations or timers
//
// Q5: Which approach is best?
// A5: Use AbortController for fetch-based requests (standardized).
//     For custom async tasks, use cancelable wrappers.
// ============================================================================
