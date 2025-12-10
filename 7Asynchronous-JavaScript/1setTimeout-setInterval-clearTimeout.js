// -----------------------------------------------------------------------------
// 1) setTimeout, setInterval, clearTimeout
// -----------------------------------------------------------------------------
//
// 👉 These are **browser timer functions** (also available in Node.js).
// 👉 They are part of the **Web APIs** (not the JS engine itself).
// 👉 Used to schedule tasks to run in the future (asynchronously).
//
// -----------------------------------------------------------------------------
// Part 1: setTimeout()
// -----------------------------------------------------------------------------
// setTimeout(callback, delay, ...args)
//
// - Runs the callback function ONCE after the given delay (in milliseconds).
// - Delay is NOT guaranteed to be exact (depends on event loop).
// - If delay = 0 → executes AFTER current call stack is cleared.
//
// Example:
setTimeout(() => {
  console.log("⏳ Runs after ~2 seconds");
}, 2000);

console.log("This runs first");
// Output:
// This runs first
// ⏳ Runs after ~2 seconds

// Example 2: Passing arguments
function greet(name) {
  console.log("Hello", name);
}
setTimeout(greet, 1000, "Avi"); // Hello Avi (after 1s)

// -----------------------------------------------------------------------------
// Part 2: clearTimeout()
// -----------------------------------------------------------------------------
// 👉 Used to cancel a scheduled setTimeout().
// 👉 It takes the timeout ID returned by setTimeout().
//
// Example:
let timerId = setTimeout(() => {
  console.log("❌ This will not run");
}, 3000);

clearTimeout(timerId);
console.log("Timer cleared!");

// -----------------------------------------------------------------------------
// Part 3: setInterval()
// -----------------------------------------------------------------------------
// setInterval(callback, delay, ...args)
//
// - Runs the callback repeatedly every `delay` ms until stopped.
// - Returns an interval ID that can be cleared with clearInterval().
//
// Example:
let count = 0;
let intervalId = setInterval(() => {
  count++;
  console.log("Repeating task:", count);

  if (count === 3) {
    clearInterval(intervalId);
    console.log("Stopped interval after 3 runs");
  }
}, 1000);

// Output:
// Repeating task: 1
// Repeating task: 2
// Repeating task: 3
// Stopped interval after 3 runs

// -----------------------------------------------------------------------------
// Part 4: Combining setTimeout + clearTimeout (Practical)
// -----------------------------------------------------------------------------
//
// Example: Auto-logout after inactivity (like in banking apps)
let logoutTimer = setTimeout(() => {
  console.log("🚪 Logged out due to inactivity");
}, 5000);

// Simulating user activity → reset logout timer
function resetLogoutTimer() {
  clearTimeout(logoutTimer);
  console.log("🔄 Activity detected, resetting logout timer...");
  logoutTimer = setTimeout(() => {
    console.log("🚪 Logged out due to inactivity");
  }, 5000);
}

setTimeout(resetLogoutTimer, 2000); // Activity after 2s
setTimeout(resetLogoutTimer, 4000); // Activity after 4s
// Logout will eventually happen 5s after last activity

// -----------------------------------------------------------------------------
// Part 5: Advanced Use Cases
// -----------------------------------------------------------------------------
//
// 1) Animation using setInterval
let pos = 0;
let animation = setInterval(() => {
  pos += 10;
  console.log("🚗 Car moved to position", pos);
  if (pos >= 50) clearInterval(animation);
}, 500);

// 2) Recursively using setTimeout (better than setInterval)
//    (avoids overlapping if task takes longer than delay)
function recursiveTimeout() {
  console.log("⏱ Running task...");
  setTimeout(recursiveTimeout, 1000);
}
setTimeout(recursiveTimeout, 1000);

// -----------------------------------------------------------------------------
// ❓ Interview Q&A
// -----------------------------------------------------------------------------
//
// Q1) Difference between setTimeout and setInterval?
// 👉 setTimeout runs ONCE after delay.
// 👉 setInterval runs REPEATEDLY until cleared.
//
// Q2) What does clearTimeout / clearInterval do?
// 👉 They stop the scheduled execution (using returned ID).
//
// Q3) Is setTimeout(…, 0) executed immediately?
// 👉 No, it’s placed in the Event Loop queue, runs AFTER current call stack.
//
// Q4) Why use recursive setTimeout instead of setInterval?
// 👉 To avoid task overlapping if task execution > delay.
//
// Q5) Are timers part of JS engine (ECMAScript)?
// 👉 No, they are provided by Browser Web APIs / Node.js APIs.

// -----------------------------------------------------------------------------
// 2) Event Loop, Microtasks, Macrotasks
// -----------------------------------------------------------------------------
//
// 👉 JavaScript is single-threaded (only 1 call stack).
// 👉 But it can handle async tasks (timers, promises, fetch, etc.) using:
//    - Call Stack
//    - Web APIs (Browser / Node APIs)
//    - Callback Queue (Macrotask Queue)
//    - Microtask Queue (higher priority)
//    - Event Loop
//
