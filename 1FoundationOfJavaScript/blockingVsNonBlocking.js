/* 
===========================================================
📘 JavaScript Notes: Blocking vs Non-Blocking,
Synchronous vs Asynchronous, Event Loop
===========================================================
Topics covered:
1) Blocking vs Non-blocking
2) Synchronous vs Asynchronous execution
3) Event loop basics
4) Microtasks vs Macrotasks
===========================================================
*/

/* 
-----------------------------------------------------------
1) Blocking vs Non-Blocking
-----------------------------------------------------------
🔹 Blocking = Code execution is paused until a task is finished.
🔹 Non-blocking = Code execution continues, the task runs in the background.

✅ In JavaScript (single-threaded):
- Blocking code → stops everything until it finishes.
- Non-blocking code → allows program to keep running.

Example: Blocking
*/

function blockingExample() {
  console.log("Start");

  // Simulating a blocking task
  let start = Date.now();
  while (Date.now() - start < 3000) {
    // busy-wait for 3 seconds
  }

  console.log("End after blocking");
}
blockingExample(); // "Start" → wait 3s → "End after blocking"

/*
Example: Non-blocking
(setTimeout allows code to continue running while waiting)
*/

function nonBlockingExample() {
  console.log("Start");

  setTimeout(() => {
    console.log("Done after 3s (non-blocking)");
  }, 3000);

  console.log("End immediately");
}
nonBlockingExample();
// Output order: Start → End immediately → (after 3s) Done after 3s

/* 
-----------------------------------------------------------
2) Synchronous vs Asynchronous Execution
-----------------------------------------------------------
🔹 Synchronous = tasks run one after another (step by step).
- If one takes long, others wait.
🔹 Asynchronous = tasks can start and finish later, without blocking.

Example:
*/

console.log("Synchronous example:");
console.log("Task 1");
console.log("Task 2");
console.log("Task 3");
// Runs in exact order → 1 → 2 → 3

console.log("Asynchronous example:");
console.log("Task 1");

setTimeout(() => {
  console.log("Task 2 (async, runs later)");
}, 1000);

console.log("Task 3");
// Order → Task 1 → Task 3 → Task 2

/* 
-----------------------------------------------------------
3) Event Loop Basics
-----------------------------------------------------------
🔹 JavaScript is single-threaded → executes one thing at a time.
🔹 BUT async tasks (timers, promises, I/O) are handled with the Event Loop.

How it works:
1. Call Stack → where functions run.
2. Web APIs / Node APIs → handle async tasks (timers, fetch, etc).
3. Callback Queue (Macrotasks) → setTimeout, setInterval, I/O, etc.
4. Microtask Queue → Promises, MutationObservers, queueMicrotask().
5. Event Loop → constantly checks:
   - If Call Stack is empty → push tasks from Microtask Queue first
   - Then Macrotask Queue.

Diagram (simplified):

   [ Call Stack ]  ← executes functions
        |
        v
   [ Event Loop ]  ← manages queues
        |
        v
   [ Microtask Queue ] (promises, microtasks)
   [ Macrotask Queue ] (timeouts, intervals, I/O)

*/

/* 
-----------------------------------------------------------
4) Microtasks vs Macrotasks
-----------------------------------------------------------
🔹 Macrotask examples:
   - setTimeout, setInterval
   - setImmediate (Node.js)
   - I/O callbacks
🔹 Microtask examples:
   - Promise.then / catch / finally
   - queueMicrotask()
   - MutationObserver

⚡ Rule: After each macrotask, the event loop clears ALL microtasks before moving on.

Example:
*/

console.log("Start");

setTimeout(() => console.log("Macrotask (setTimeout)"), 0);

Promise.resolve().then(() => console.log("Microtask (promise)"));

console.log("End");

// Order → Start → End → Microtask (promise) → Macrotask (setTimeout)

/* 
-----------------------------------------------------------
Cheat Sheet
-----------------------------------------------------------
✔ Blocking → stops everything (e.g., while loop)
✔ Non-blocking → async tasks keep program responsive
✔ Synchronous → step by step
✔ Asynchronous → runs later (e.g., setTimeout, promises)
✔ Event Loop → decides execution order
✔ Microtasks (promises) always run BEFORE macrotasks (timeouts)
-----------------------------------------------------------
*/

/* 
-----------------------------------------------------------
Practice Questions
-----------------------------------------------------------

Q1) What will this output?

console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");

Answer:
A
D
C   (microtask first)
B   (macrotask later)

-----------------------------------------------------------

Q2) Why is an infinite while loop considered blocking?

Answer: Because it never frees the call stack → event loop cannot run.

-----------------------------------------------------------

Q3) What’s the difference between synchronous and asynchronous?

Answer: 
- Sync = tasks run in order, one after the other.
- Async = some tasks run later, code continues meanwhile.

-----------------------------------------------------------

Q4) Explain microtasks vs macrotasks in your own words.

Answer: 
- Microtasks → small, higher-priority tasks (promises).
- Macrotasks → bigger tasks like timers. After each macrotask, all microtasks run first.

-----------------------------------------------------------
*/
