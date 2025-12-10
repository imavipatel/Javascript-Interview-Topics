// ============================================================================
// 11) 📘 Advanced JS – Web Workers (Avoid Memory Leaks)
// ============================================================================
//
// Topics covered:
// 1) What are Web Workers
// 2) Creating a Web Worker
// 3) Communicating with Web Workers
// 4) Terminating Web Workers
// 5) Avoiding memory leaks
//
// -----------------------------------------------------------------------------

// ============================================================================
// 1) What are Web Workers
// ============================================================================
// - Web Workers allow **running JavaScript in a separate background thread**.
// - Useful for **heavy computations**, so main UI thread is not blocked.
// - Web Workers cannot access DOM directly; communicate via messages.
// - Helps **improve performance and responsiveness**.

// ============================================================================
// 2) Creating a Web Worker
// ============================================================================
// - Create a worker using `new Worker("worker.js")`
// - The worker runs code in `worker.js` independently.

// Example: worker.js
/*
self.addEventListener("message", (event) => {
  const data = event.data;
  // Do some heavy computation
  let sum = 0;
  for (let i = 0; i < data; i++) sum += i;
  self.postMessage(sum); // send result back
});
*/

// Main JS file
const worker = new Worker("worker.js");
worker.postMessage(1000000); // send data to worker
worker.addEventListener("message", (event) => {
  console.log("Result from worker:", event.data); // sum of 0..999999
});

// ============================================================================
// 3) Communicating with Web Workers
// ============================================================================
// - `postMessage(data)` → send data to worker
// - Worker uses `postMessage(result)` → send data back
// - `onmessage` or `addEventListener("message")` → listen for messages

worker.onmessage = (event) => {
  console.log("Worker replied:", event.data);
};

// ============================================================================
// 4) Terminating Web Workers
// ============================================================================
// - To avoid memory leaks, **always terminate workers when done**.
// - `worker.terminate()` → stops the worker
// - Example:

worker.terminate();

// ============================================================================
// 5) Avoiding Memory Leaks
// ============================================================================
// 1) Always terminate workers when no longer needed
// 2) Remove message listeners if worker will persist
// 3) Avoid passing large objects repeatedly; serialize/transfer if possible
// 4) Keep background computation light and finite

// Example: Proper cleanup
const worker2 = new Worker("worker.js");
worker2.postMessage(500000);
const handleMsg = (event) => console.log("Worker2 result:", event.data);
worker2.addEventListener("message", handleMsg);

// After completion
setTimeout(() => {
  worker2.removeEventListener("message", handleMsg);
  worker2.terminate();
  console.log("Worker2 terminated and cleaned up.");
}, 2000);

// ============================================================================
// 🔑 Key Points Summary
// ============================================================================
// 1) Web Workers run JS in a **separate thread**, preventing UI blocking
// 2) Cannot access DOM directly; use messages for communication
// 3) Always terminate workers to **avoid memory leaks**
// 4) Good for **heavy computations, long loops, or async tasks**
// 5) Use message listeners carefully to prevent lingering references

// ============================================================================
// ❓ Q & A
// ============================================================================
// Q1) Can a Web Worker access the DOM directly?
// 👉 No, workers run in a separate thread without access to DOM.
//
// Q2) How do we communicate with a worker?
// 👉 Using `postMessage(data)` and listening with `onmessage`.
//
// Q3) What happens if we don’t terminate a worker?
// 👉 Worker continues running in background → can cause memory leaks.
//
// Q4) Can we have multiple workers?
// 👉 Yes, multiple workers can run in parallel for separate tasks.
//
// Q5) When should we use Web Workers?
// 👉 For CPU-intensive tasks, like image processing, large computations, or async data processing, to keep UI responsive.
