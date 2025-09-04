// ============================================================================
// 📘 Asynchronous JavaScript – Full Notes
// ============================================================================
//
// Topics covered:
// 1) setTimeout, setInterval, clearTimeout
// 2) Event Loop, Microtasks, Macrotasks
// 3) Callback Hell & Pyramid of Doom
// 4) Promises & Promise Chaining
// 5) Implement your own Promise
// 6) Implement final() for Promise
// 7) resolve async promises sequentially using recursion
// 8) Promise in sequence
// 9) Cancelable Promise
// 10) Retry Promise N times
// 11) Compose Polyfills
// 12) Polyfills (call, apply, bind, map, reduce, filter, forEach, Promise, all, allSettled, race, any, flat, fetch)
// 13) JSON.parse() polyfill
// 14) Async/Await
// 15) Compare: Callbacks vs Promises vs Async/Await
// 16) Debouncing & Throttling
// 17) Additional Topics
//    a) Error handling in async code (try/catch/finally with async/await)
//    b) Promise.allSettled vs Promise.all
//    c) Difference between Promise.resolve() & Promise.reject()
//    d) async generators (for-await-of)
//    e) Queue management / task scheduling

// Each section includes:
// - Easy theory
// - Examples with comments
// - Deep dive concepts
// - Interview Q&A
// ============================================================================

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
// -----------------------------------------------------------------------------
// Part 1: Call Stack & Event Loop
// -----------------------------------------------------------------------------
//
// - Call Stack executes all synchronous code first.
// - Async tasks (setTimeout, promises, etc.) are sent to Web APIs.
// - When finished, their callbacks go into either:
//    1. Microtask Queue (Promises, MutationObserver, queueMicrotask)
//    2. Macrotask Queue (setTimeout, setInterval, setImmediate, I/O)
//
// - Event Loop continuously checks:
//   1. If Call Stack is empty → run Microtasks first.
//   2. Then run one Macrotask.
//   3. Repeat.
//
// -----------------------------------------------------------------------------
// Part 2: Microtasks vs Macrotasks
// -----------------------------------------------------------------------------
//
// Microtasks (higher priority):
// - Promise callbacks (.then, .catch, .finally)
// - MutationObserver
// - queueMicrotask()
//
// Macrotasks:
// - setTimeout
// - setInterval
// - setImmediate (Node.js)
// - DOM events (click, input, etc.)
// - I/O operations
//
// Rule: After each Macrotask → all Microtasks are drained before next Macrotask.
//
// -----------------------------------------------------------------------------
// Part 3: Examples
// -----------------------------------------------------------------------------

console.log("Start");

// setTimeout → Macrotask
setTimeout(() => {
  console.log("setTimeout callback (Macrotask)");
}, 0);

// Promise → Microtask
Promise.resolve().then(() => {
  console.log("Promise.then callback (Microtask)");
});

// queueMicrotask → Microtask
queueMicrotask(() => {
  console.log("queueMicrotask callback (Microtask)");
});

console.log("End");

// Output order:
// Start
// End
// Promise.then callback (Microtask)
// queueMicrotask callback (Microtask)
// setTimeout callback (Macrotask)

// -----------------------------------------------------------------------------
// Part 4: Why Microtasks have priority?
// -----------------------------------------------------------------------------
//
// - Ensures that promises and critical operations finish ASAP.
// - Prevents starving important async tasks (e.g., fetch result processing).
//
// Example:
setTimeout(() => console.log("Macrotask 1"), 0);

Promise.resolve().then(() => {
  console.log("Microtask 1");
  Promise.resolve().then(() => console.log("Microtask 2"));
});

setTimeout(() => console.log("Macrotask 2"), 0);

// Output order:
// Microtask 1
// Microtask 2
// Macrotask 1
// Macrotask 2

// -----------------------------------------------------------------------------
// Part 5: Practical Example
// -----------------------------------------------------------------------------
//
// Simulating fetching data + updating UI:
console.log("Fetching user...");

setTimeout(() => {
  console.log("⏳ API call finished (Macrotask)");

  Promise.resolve().then(() => {
    console.log("✅ Processing data (Microtask)");
  });
}, 1000);

console.log("Rendering UI...");

// Possible Output:
// Fetching user...
// Rendering UI...
// ⏳ API call finished (Macrotask)
// ✅ Processing data (Microtask)

// -----------------------------------------------------------------------------
// ❓ Interview Q&A
// -----------------------------------------------------------------------------
//
// Q1) What is Event Loop?
// 👉 Mechanism that coordinates Call Stack, Microtasks, Macrotasks execution.
//
// Q2) Microtask vs Macrotask?
// 👉 Microtasks have higher priority → executed before Macrotasks.
//
// Q3) Examples of Microtasks?
// 👉 Promises, queueMicrotask, MutationObserver.
//
// Q4) Examples of Macrotasks?
// 👉 setTimeout, setInterval, DOM events, I/O.
//
// Q5) Execution order if both Promise and setTimeout are scheduled?
// 👉 Promise (Microtask) runs first, then setTimeout (Macrotask).
//
// Q6) Can Microtasks starve Macrotasks?
// 👉 Yes, if you keep scheduling new Microtasks in a loop, Macrotasks get delayed.
//

// -----------------------------------------------------------------------------
// 3) Callback Hell & Pyramid of Doom
// -----------------------------------------------------------------------------
//
// -----------------------------------------------------------------------------
// Part 1: What are Callbacks?
// -----------------------------------------------------------------------------
//
// - A callback is a function passed as an argument to another function,
//   which is executed later (asynchronous tasks, event handling, etc.)
//
// Example:
function fetchData(callback) {
  setTimeout(() => {
    callback("✅ Data fetched");
  }, 1000);
}
fetchData((result) => console.log(result));

//
// Problem: When multiple async tasks depend on each other → nested callbacks!
// This leads to "Callback Hell".
//
// -----------------------------------------------------------------------------
// Part 2: Callback Hell
// -----------------------------------------------------------------------------
//
// - Callback Hell = deeply nested callbacks, making code hard to read, debug,
//   and maintain.
// - Often called the "Pyramid of Doom" due to triangular nested structure.
//
// Example:
setTimeout(() => {
  console.log("Step 1: User authenticated");
  setTimeout(() => {
    console.log("Step 2: User profile fetched");
    setTimeout(() => {
      console.log("Step 3: User orders fetched");
      setTimeout(() => {
        console.log("Step 4: Order details fetched");
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

// Output (after delays):
// Step 1: User authenticated
// Step 2: User profile fetched
// Step 3: User orders fetched
// Step 4: Order details fetched
//
// ❌ Problems with Callback Hell:
// - Hard to read (nested structure)
// - Hard to debug
// - Error handling is messy
// - Code not reusable
//
// -----------------------------------------------------------------------------
// Part 3: Pyramid of Doom (Visualization)
// -----------------------------------------------------------------------------
//
// Looks like this:
//
// function task1() {
//   task2(() => {
//     task3(() => {
//       task4(() => {
//         task5(() => {
//           // ... endless nesting
//         });
//       });
//     });
//   });
// }
//
// Code structure visually resembles a "pyramid" 🔺
//
// -----------------------------------------------------------------------------
// Part 4: Solving Callback Hell
// -----------------------------------------------------------------------------
//
// ✅ 1) Use Named Functions
// Instead of nesting anonymous functions, create named ones.
//
function step1() {
  console.log("Step 1");
  setTimeout(step2, 1000);
}
function step2() {
  console.log("Step 2");
  setTimeout(step3, 1000);
}
function step3() {
  console.log("Step 3");
}
setTimeout(step1, 1000);

//
// ✅ 2) Use Promises
// Promises flatten the nesting by using .then() chaining.
//
function fetchUser() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("User Authenticated"), 1000)
  );
}
function fetchProfile() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Profile Fetched"), 1000)
  );
}
function fetchOrders() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Orders Fetched"), 1000)
  );
}

// Chaining Promises
fetchUser()
  .then((res) => {
    console.log(res);
    return fetchProfile();
  })
  .then((res) => {
    console.log(res);
    return fetchOrders();
  })
  .then((res) => {
    console.log(res);
  });

//
// ✅ 3) Use Async/Await
// Makes async code look synchronous.
//
async function getUserDetails() {
  let user = await fetchUser();
  console.log(user);

  let profile = await fetchProfile();
  console.log(profile);

  let orders = await fetchOrders();
  console.log(orders);
}
getUserDetails();

// -----------------------------------------------------------------------------
// Part 5: ❓ Interview Q&A
// -----------------------------------------------------------------------------
//
// Q1) What is Callback Hell?
// 👉 A situation when multiple async tasks are nested inside callbacks,
//    creating unreadable "pyramid-shaped" code.
//
// Q2) Why is it bad?
// 👉 Hard to read, debug, maintain, and handle errors properly.
//
// Q3) How to avoid Callback Hell?
// 👉 Use named functions, Promises, Async/Await.
//
// Q4) What is Pyramid of Doom?
// 👉 The triangular shape of deeply nested callbacks.
//
// Q5) How do Promises/Async-Await solve callback hell?
// 👉 They flatten nested code into sequential, readable flow.
//
// -----------------------------------------------------------------------------
// ✅ Summary
// -----------------------------------------------------------------------------
// - Callbacks are useful, but too many → Callback Hell.
// - Callback Hell = Pyramid of Doom (deep nesting).
// - Solutions: Named functions, Promises, Async/Await.
//

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

// ============================================================================
// 5) Implement Your Own Promise (Educational Mini Promises/A+)
// ============================================================================
//
// 🎯 Goal
// -----
// Build a minimal Promise implementation to understand how real Promises work.
// We'll support:
//   - States: pending → fulfilled | rejected (immutable after settling)
//   - then(onFulfilled, onRejected) with chaining
//   - catch(onRejected)
//   - finally(onFinally)
//   - Static helpers: resolve, reject, all, allSettled, race, any
//   - Microtask scheduling (like real Promises)
//
// ⚠️ Note
// -----
// This is an educational implementation. Real Promises are more nuanced and
// handle many edge cases. Still, this covers the core resolution procedure,
// thenable assimilation, and async job queue semantics.
//
// ----------------------------------------------------------------------------
// Part 1: Core Concepts (Theory)
// ----------------------------------------------------------------------------
//
// 1) States
//    - PENDING: initial state
//    - FULFILLED: set with a value (resolved)
//    - REJECTED: set with a reason (error)
//    Once fulfilled/rejected → cannot change again.
//
// 2) Resolution Procedure
//    When resolving with a value:
//      - If the value is a thenable (i.e., has a `then` method),
//        we must "adopt" its state (call its then and follow its outcome).
//      - If resolving with itself → reject with TypeError (self-resolution).
//
// 3) Async Semantics
//    - then/catch/finally handlers must run asynchronously (microtasks).
//      We'll use `queueMicrotask` if available, else fallback to setTimeout(…, 0).
//
// 4) then() returns a NEW promise
//    - The return value of onFulfilled/onRejected becomes the resolution value
//      of the returned promise.
//    - If a handler throws, the returned promise rejects with that error.
//
// ----------------------------------------------------------------------------
// Part 2: Implementation
// ----------------------------------------------------------------------------

(function (global) {
  const PENDING = 0;
  const FULFILLED = 1;
  const REJECTED = 2;

  // Microtask queue helper (mimics native Promise jobs)
  function queueJob(fn) {
    if (typeof queueMicrotask === "function") {
      queueMicrotask(fn);
    } else if (typeof MutationObserver !== "undefined") {
      // Microtask fallback for older browsers
      const div = document.createElement("div");
      const observer = new MutationObserver(() => {
        observer.disconnect();
        fn();
      });
      observer.observe(div, { attributes: true });
      div.setAttribute("data-x", "1");
    } else {
      // Last resort (macrotask)
      setTimeout(fn, 0);
    }
  }

  class MyPromise {
    constructor(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("MyPromise resolver is not a function");
      }

      this._state = PENDING;
      this._value = undefined;
      this._handlers = []; // queued "then" handlers: { onFulfilled, onRejected, resolve, reject }

      const resolve = (value) => this._resolve(value);
      const reject = (reason) => this._reject(reason);

      try {
        executor(resolve, reject);
      } catch (err) {
        reject(err);
      }
    }

    // ---- Internal: resolve / reject / settle / flush ----

    _resolve(value) {
      if (this._state !== PENDING) return;

      // Self-resolution guard
      if (value === this) {
        return this._reject(
          new TypeError("Cannot resolve promise with itself")
        );
      }

      // Thenable assimilation
      if (value && (typeof value === "object" || typeof value === "function")) {
        let then;
        try {
          then = value.then; // may throw
        } catch (err) {
          return this._reject(err);
        }

        if (typeof then === "function") {
          let called = false;
          try {
            then.call(
              value,
              (v) => {
                if (!called) {
                  called = true;
                  this._resolve(v);
                }
              },
              (r) => {
                if (!called) {
                  called = true;
                  this._reject(r);
                }
              }
            );
            return; // important: don't continue
          } catch (err) {
            if (!called) this._reject(err);
            return;
          }
        }
      }

      // Fulfill with non-thenable value
      this._state = FULFILLED;
      this._value = value;
      this._flush();
    }

    _reject(reason) {
      if (this._state !== PENDING) return;

      this._state = REJECTED;
      this._value = reason;
      this._flush();
    }

    _flush() {
      // Schedule to run all handlers asynchronously
      queueJob(() => {
        while (this._handlers.length) {
          const { onFulfilled, onRejected, resolve, reject } =
            this._handlers.shift();

          try {
            if (this._state === FULFILLED) {
              if (typeof onFulfilled === "function") {
                // Handler return becomes next promise's resolution
                resolve(onFulfilled(this._value));
              } else {
                // If no handler, pass through value
                resolve(this._value);
              }
            } else if (this._state === REJECTED) {
              if (typeof onRejected === "function") {
                resolve(onRejected(this._value));
              } else {
                reject(this._value);
              }
            }
          } catch (err) {
            reject(err);
          }
        }
      });
    }

    // ---- Public API: then, catch, finally ----

    then(onFulfilled, onRejected) {
      return new MyPromise((resolve, reject) => {
        this._handlers.push({ onFulfilled, onRejected, resolve, reject });
        if (this._state !== PENDING) {
          this._flush(); // already settled → schedule handlers
        }
      });
    }

    catch(onRejected) {
      return this.then(undefined, onRejected);
    }

    finally(onFinally) {
      // Ensure onFinally runs and value/reason passes through
      return this.then(
        (v) =>
          MyPromise.resolve(
            isCallable(onFinally) ? onFinally() : undefined
          ).then(() => v),
        (e) =>
          MyPromise.resolve(
            isCallable(onFinally) ? onFinally() : undefined
          ).then(() => {
            throw e;
          })
      );
    }

    // ---- Static Helpers ----

    static resolve(value) {
      if (value instanceof MyPromise) return value;
      return new MyPromise((res) => res(value));
    }

    static reject(reason) {
      return new MyPromise((_, rej) => rej(reason));
    }

    static all(iterable) {
      const arr = Array.from(iterable);
      return new MyPromise((resolve, reject) => {
        if (arr.length === 0) return resolve([]);
        const out = new Array(arr.length);
        let done = 0;
        arr.forEach((p, i) => {
          MyPromise.resolve(p).then((val) => {
            out[i] = val;
            if (++done === arr.length) resolve(out);
          }, reject);
        });
      });
    }

    static allSettled(iterable) {
      const arr = Array.from(iterable);
      return MyPromise.all(
        arr.map((p) =>
          MyPromise.resolve(p)
            .then((value) => ({ status: "fulfilled", value }))
            .catch((reason) => ({ status: "rejected", reason }))
        )
      );
    }

    static race(iterable) {
      return new MyPromise((resolve, reject) => {
        for (const p of iterable) {
          MyPromise.resolve(p).then(resolve, reject);
        }
      });
    }

    static any(iterable) {
      const arr = Array.from(iterable);
      if (arr.length === 0) {
        // Mirror native behavior
        return MyPromise.reject(
          new AggregateError([], "All promises were rejected")
        );
      }
      let rejectedCount = 0;
      const errors = [];
      return new MyPromise((resolve, reject) => {
        arr.forEach((p, i) =>
          MyPromise.resolve(p).then(resolve, (err) => {
            errors[i] = err;
            if (++rejectedCount === arr.length) {
              reject(new AggregateError(errors, "All promises were rejected"));
            }
          })
        );
      });
    }
  }

  function isCallable(x) {
    return typeof x === "function";
  }

  // Expose globally for demos:
  global.MyPromise = MyPromise;
})(typeof globalThis !== "undefined" ? globalThis : window);

// ----------------------------------------------------------------------------
// Part 3: Usage Examples & Expected Behavior
// ----------------------------------------------------------------------------

// 1) Basic resolve / then / finally
const p1 = new MyPromise((resolve) => {
  setTimeout(() => resolve(42), 50);
});
p1.then((v) => {
  console.log("[p1] fulfilled with:", v); // 42
  return v + 1;
})
  .then((v) => {
    console.log("[p1] chained value:", v); // 43
  })
  .finally(() => {
    console.log("[p1] finally runs (pass-through)");
  });

// 2) Basic reject / catch / recovery
const p2 = new MyPromise((_, reject) => {
  setTimeout(() => reject(new Error("Boom!")), 30);
});
p2.then(() => {
  console.log("NEVER runs");
})
  .catch((e) => {
    console.log("[p2] caught:", e.message); // Boom!
    return "recovered";
  })
  .then((v) => {
    console.log("[p2] after recovery:", v); // recovered
  });

// 3) Thenable assimilation (adopt state of thenable)
const thenable = {
  then(resolve) {
    setTimeout(() => resolve("from thenable"), 10);
  },
};
MyPromise.resolve(thenable).then((v) => {
  console.log("[thenable] adopted:", v); // from thenable
});

// 4) Microtask ordering: handlers run after current call stack
console.log("A");
MyPromise.resolve("B").then((v) => console.log(v));
console.log("C");
// Expected order: A, C, B

// 5) Static helpers: all / allSettled / race / any
const delay = (ms, val, shouldReject = false) =>
  new MyPromise((res, rej) =>
    setTimeout(() => (shouldReject ? rej(val) : res(val)), ms)
  );

MyPromise.all([delay(10, "x"), delay(20, "y")]).then((arr) => {
  console.log("[all] ->", arr); // ["x", "y"]
});

MyPromise.allSettled([delay(10, "ok"), delay(5, "no", true)]).then((arr) => {
  console.log("[allSettled] ->", arr);
  // [ {status:"fulfilled", value:"ok"}, {status:"rejected", reason:"no"} ]
});

MyPromise.race([delay(30, "slow"), delay(10, "fast")]).then((v) => {
  console.log("[race] ->", v); // "fast"
});

MyPromise.any([delay(10, "bad", true), delay(5, "good")])
  .then((v) => {
    console.log("[any] ->", v); // "good"
  })
  .catch((e) => {
    console.log("[any] AggregateError:", e.errors);
  });

// 6) finally pass-through semantics
MyPromise.resolve(7)
  .finally(() => console.log("[finally] cleanup"))
  .then((v) => console.log("[finally] value preserved:", v)); // 7

// 7) Self-resolution guard (should reject)
const pSelf = new MyPromise((resolve) => resolve());
pSelf
  .then(() => {
    // Attempt to resolve with itself:
    return pSelf; // This should be handled by guard (reject TypeError)
  })
  .then(
    () => console.log("NEVER"),
    (e) => console.log("[self] rejected with:", e instanceof TypeError) // true
  );

// ----------------------------------------------------------------------------
// Part 4: Interview Q&A (Quick Notes)
// ----------------------------------------------------------------------------
//
// Q1) What are the states of a Promise?
//    👉 pending → fulfilled | rejected (final/immutable)
//
// Q2) Why must handlers run asynchronously?
//    👉 Spec requires promise reaction jobs to be queued (microtasks), ensuring
//       deterministic ordering and avoiding sync handler reentrancy.
//
// Q3) What is thenable assimilation?
//    👉 If resolve(x) where x has a callable `then`, we call it and adopt x’s
//       eventual state. This enables interop with "promise-like" objects.
//
// Q4) What does then() return?
//    👉 A NEW promise. The return value of the handler becomes its resolution.
//       Throwing in a handler causes the returned promise to reject.
//
// Q5) Difference between finally vs then?
//    👉 finally runs regardless of outcome, and passes through the original
//       value/reason, unless it throws or returns a rejecting promise.
//
// ----------------------------------------------------------------------------
// ✅ Summary
// ----------------------------------------------------------------------------
// - We built a minimal Promise with proper state machine, async semantics,
//   thenable assimilation, chaining, and common static helpers.
// - Use this to internalize how native Promises behave under the hood.
// ============================================================================

// ============================================================================
// 6) Implement finally() for Promise
// ============================================================================

// ----------------------------------------------------------------------------
// 🔹 THEORY
// ----------------------------------------------------------------------------
// 1. What is finally()?
//    - A method in Promises that runs AFTER the promise is settled
//      (either resolved ✅ or rejected ❌).
//    - Useful for cleanup tasks → closing DB, hiding loaders, releasing memory.
//
// 2. Behavior of finally():
//    - Does NOT modify the resolved value or rejection reason.
//    - It always passes through the same value/reason to the next then/catch.
//    - If finally() throws an error → the promise will reject with that error.
//
// 3. Why use finally()?
//    - Keeps code DRY (Don’t Repeat Yourself).
//    - Without finally(), you’d have to duplicate cleanup code in both
//      .then() and .catch().
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// ✅ Native Example
// ----------------------------------------------------------------------------
let p3 = Promise.resolve("Success");

p3.finally(() => {
  console.log("Cleanup after success"); // runs always
}).then((val) => {
  console.log("Resolved with:", val);
});

// Output:
// Cleanup after success
// Resolved with: Success

// ----------------------------------------------------------------------------
let p4 = Promise.reject("Failure");

p4.finally(() => {
  console.log("Cleanup after error"); // runs always
}).catch((err) => {
  console.log("Rejected with:", err);
});

// Output:
// Cleanup after error
// Rejected with: Failure

// ----------------------------------------------------------------------------
// 4. How to Implement finally()?
// ----------------------------------------------------------------------------
// Trick → Use `then()` internally because it handles both resolve and reject.
// Implementation must:
// - Always run the callback.
// - Pass through the original value/reason UNLESS the callback throws.
// ----------------------------------------------------------------------------

// ✅ Polyfill for Promise.prototype.finally
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (onFinally) {
    return this.then(
      (value) => Promise.resolve(onFinally()).then(() => value),
      (reason) =>
        Promise.resolve(onFinally()).then(() => {
          throw reason;
        })
    );
  };
}

// ----------------------------------------------------------------------------
// ✅ Test Our Polyfill
// ----------------------------------------------------------------------------

// Case 1: Resolved
Promise.resolve(42)
  .finally(() => {
    console.log("Case 1: cleanup after success");
  })
  .then((val) => {
    console.log("Case 1: value =", val);
  });

// Output:
// Case 1: cleanup after success
// Case 1: value = 42

// ----------------------------------------------------------------------------

// Case 2: Rejected
Promise.reject("Error occurred")
  .finally(() => {
    console.log("Case 2: cleanup after failure");
  })
  .catch((err) => {
    console.log("Case 2: caught =", err);
  });

// Output:
// Case 2: cleanup after failure
// Case 2: caught = Error occurred

// ----------------------------------------------------------------------------

// Case 3: finally itself throws
Promise.resolve("Data")
  .finally(() => {
    console.log("Case 3: inside finally");
    throw new Error("Error from finally");
  })
  .then((val) => {
    console.log("Case 3: value =", val);
  })
  .catch((err) => {
    console.log("Case 3: caught =", err.message);
  });

// Output:
// Case 3: inside finally
// Case 3: caught = Error from finally

// ----------------------------------------------------------------------------
// 📌 INTERVIEW NOTES
// ----------------------------------------------------------------------------
// Q1: What is the purpose of finally()?
// A1: To run cleanup code regardless of promise outcome (resolve or reject).
//
// Q2: Does finally() change the value of the promise?
// A2: No, it passes through the original value/reason, unless it throws an error.
//
// Q3: How can you implement finally()?
// A3: Using then(), wrapping the callback, and ensuring the value/reason passes.
//
// Q4: Where is finally() most useful?
// A4: Cleaning up resources (DB connections, timers, hiding loaders).
// ============================================================================

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

// ============================================================================
// 10) Retry Promise N times
// ============================================================================
//
// 🔹 Goal (Simple):
// When an async task (like a network request) fails temporarily, try it again
// up to N times so transient errors don't break your app. Each retry can wait
// a little (delay) or use exponential backoff.
//
// Use-cases:
// - Flaky network requests
// - Temporary API rate limits
// - Intermittent DB or service timeouts
//
// Important idea (in plain English):
// - Try the operation.
// - If it succeeds → done.
// - If it fails → wait (maybe) and try again, up to a maximum number of attempts.
// - If all attempts fail → return the last error so the caller can handle it.
//
// ----------------------------------------------------------------------------
// Part 1: Basic retry wrapper (fixed attempts, no delay)
// ----------------------------------------------------------------------------
function retry(fn, attempts = 3) {
  // fn must be a function that returns a Promise when called.
  return function (...args) {
    let tries = 0;
    function attempt() {
      tries++;
      return fn(...args).catch((err) => {
        if (tries >= attempts) {
          // ran out of attempts → rethrow last error
          return Promise.reject(err);
        }
        // otherwise try again
        return attempt();
      });
    }
    return attempt();
  };
}

/*
Example usage (simulate a flaky task):
- The following fakeTask randomly fails to show retry behavior.
*/
function flakyTask() {
  return new Promise((resolve, reject) => {
    const succeed = Math.random() > 0.6; // 40% success
    setTimeout(() => {
      if (succeed) resolve("OK");
      else reject(new Error("Temporary error"));
    }, 200);
  });
}

const safeFlaky = retry(flakyTask, 5);

// Running:
safeFlaky()
  .then((v) => console.log("Succeeded:", v))
  .catch((e) => console.log("Failed after retries:", e.message));

// Output example (non-deterministic):
// - either "Succeeded: OK" (if any attempt succeeded)
// - or "Failed after retries: Temporary error" (if all attempts failed)

// ----------------------------------------------------------------------------
// Part 2: Retry with fixed delay between attempts
// ----------------------------------------------------------------------------
function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

function retryWithDelay(fn, attempts = 3, delay = 500) {
  return function (...args) {
    let tries = 0;
    function attempt() {
      tries++;
      return fn(...args).catch((err) => {
        if (tries >= attempts) return Promise.reject(err);
        return sleep(delay).then(attempt);
      });
    }
    return attempt();
  };
}

// Usage:
const safeFlakyWithDelay = retryWithDelay(flakyTask, 4, 300);
safeFlakyWithDelay()
  .then((v) => console.log("Succeeded with delay:", v))
  .catch((e) => console.log("Failed after retries (delay):", e.message));

// ----------------------------------------------------------------------------
// Part 3: Exponential Backoff (delay grows each retry)
// ----------------------------------------------------------------------------
// delay = baseDelay * 2^(attempt-1)  (1x, 2x, 4x, 8x, ...)
function retryExponential(fn, attempts = 5, baseDelay = 200) {
  return function (...args) {
    let tries = 0;
    function attempt() {
      tries++;
      return fn(...args).catch((err) => {
        if (tries >= attempts) return Promise.reject(err);
        const wait = baseDelay * Math.pow(2, tries - 1);
        // optional: add jitter to avoid thundering herd
        const jitter = Math.random() * (wait / 4);
        return sleep(wait + jitter).then(attempt);
      });
    }
    return attempt();
  };
}

// Usage:
const safeFlakyBackoff = retryExponential(flakyTask, 5, 100);
safeFlakyBackoff()
  .then((v) => console.log("Succeeded with backoff:", v))
  .catch((e) => console.log("Failed after backoff retries:", e.message));

// ----------------------------------------------------------------------------
// Part 4: Retry with predicate (only retry for certain errors/statuses)
// ----------------------------------------------------------------------------
// Useful when some errors should NOT be retried (e.g., 4xx client errors).

function retryIf(fn, attempts = 3, delay = 200, shouldRetry = (_err) => true) {
  return function (...args) {
    let tries = 0;
    function attempt() {
      tries++;
      return fn(...args).catch((err) => {
        // ask the predicate whether to retry
        if (!shouldRetry(err) || tries >= attempts) return Promise.reject(err);
        return sleep(delay).then(attempt);
      });
    }
    return attempt();
  };
}

/*
Example: Only retry for network errors (simulated by err.isNetwork)
*/
function simulatedFetch() {
  return new Promise((res, rej) => {
    const err =
      Math.random() > 0.7
        ? { isNetwork: false, message: "400 Bad" }
        : { isNetwork: true, message: "Network fail" };
    setTimeout(() => (Math.random() > 0.5 ? res("data") : rej(err)), 100);
  });
}

const retryNetworkOnly = retryIf(
  simulatedFetch,
  4,
  200,
  (err) => !!err.isNetwork
);
retryNetworkOnly()
  .then((v) => console.log("Network-only retry succeeded:", v))
  .catch((e) => console.log("Network-only retry failed:", e));

// ----------------------------------------------------------------------------
// Part 5: Async/Await style (loop instead of recursion)
// ----------------------------------------------------------------------------
// Some prefer using async/await with a for-loop for readability.

function retryAwait(fn, attempts = 3, delay = 200) {
  return async function (...args) {
    let lastErr;
    for (let i = 0; i < attempts; i++) {
      try {
        return await fn(...args);
      } catch (err) {
        lastErr = err;
        if (i === attempts - 1) break; // last attempt -> give up
        await sleep(delay);
      }
    }
    throw lastErr;
  };
}

// Usage:
const safeFlakyAwait = retryAwait(flakyTask, 4, 250);
(async () => {
  try {
    const r = await safeFlakyAwait();
    console.log("Await-style succeeded:", r);
  } catch (e) {
    console.log("Await-style failed:", e.message);
  }
})();

// ----------------------------------------------------------------------------
// Part 6: Retry an HTTP fetch with AbortController and backoff (browser)
// ----------------------------------------------------------------------------
// Example pattern (browser environment):
/*
async function fetchWithRetry(url, options = {}, attempts = 3, baseDelay = 500) {
  for (let i = 0; i < attempts; i++) {
    const controller = new AbortController();
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      if (!res.ok && res.status >= 400 && res.status < 500) {
        // client errors: don't retry
        throw new Error(`HTTP ${res.status}`);
      }
      return res; // success
    } catch (err) {
      if (i === attempts - 1) throw err;
      const wait = baseDelay * Math.pow(2, i);
      await sleep(wait);
      // optionally controller.abort() if you want to cancel in-flight fetch on next retry
    }
  }
}
*/

// ----------------------------------------------------------------------------
// Part 7: Important Notes & Best Practices (easy language)
// ----------------------------------------------------------------------------
// - Be careful: retrying non-idempotent operations (e.g., POST that creates) may
//   cause duplicate side-effects. Prefer retrying idempotent requests (GET, PUT).
// - Use backoff (exponential) to reduce load on the server when many clients retry.
// - Add jitter (randomness) to avoid synchronized retries (thundering herd).
// - Limit attempts to avoid infinite loops and wasted resources.
// - Consider overall timeout or cancellation (AbortController) in real apps.
// - Decide which errors are retryable (network/timeouts) vs not (validation errors).
//
// ----------------------------------------------------------------------------
// ❓ Interview Q&A
// ----------------------------------------------------------------------------
// Q1) What is retrying a Promise?
// A1: Attempting the same async operation multiple times when it fails, up to N tries.
//
// Q2) Why exponential backoff?
// A2: To progressively wait longer between tries, reducing server pressure and
//     increasing chance the transient issue clears.
//
// Q3) When should you NOT retry?
// A3: When operations are non-idempotent (they cause permanent side-effects) or
//     when the error is a client error (e.g., 400 Bad Request).
//
// Q4) How to add jitter, in simple words?
// A4: Add a small random amount to the wait time so many clients don't retry at once.
//
// Q5) Should retries be infinite?
// A5: No — always cap attempts and consider an overall timeout or cancellation.
//
// ----------------------------------------------------------------------------
// End of "Retry Promise N times" notes
// ============================================================================

// ============================================================================
// 11) Compose Polyfills
// ============================================================================
//
// 🔹 What does "compose" mean?
// In functional programming, "compose" means combining multiple functions
// together to form a new function.
//
// Formula (right-to-left):
//   compose(f, g)(x) === f(g(x))
//
// So: "Do g first, then f".
//
// Why useful?
// - Makes function pipelines clean and readable.
// - Avoids deeply nested function calls.
// - Common in libraries like Redux, Lodash, Ramda.
//
// ----------------------------------------------------------------------------
// Part 1: Example without compose
// ----------------------------------------------------------------------------
function double(x) {
  return x * 2;
}
function square(x) {
  return x * x;
}

// Without compose:
let result1 = double(square(3)); // square first, then double → 18
console.log("Without compose:", result1);

// ----------------------------------------------------------------------------
// Part 2: Compose implementation (polyfill)
// ----------------------------------------------------------------------------
function compose(...fns) {
  return function (x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}

// Usage:
let doMath = compose(double, square); // do square, then double
console.log("Compose result:", doMath(3)); // 18

// ----------------------------------------------------------------------------
// Part 3: Another Example with more functions
// ----------------------------------------------------------------------------
function addOne(x) {
  return x + 1;
}
function half(x) {
  return x / 2;
}

let combined = compose(half, double, addOne);
// Step: addOne(3) → 4 → double(4) → 8 → half(8) → 4
console.log("Compose multiple:", combined(3));

// ----------------------------------------------------------------------------
// Part 4: Pipe (left-to-right version of compose)
// ----------------------------------------------------------------------------
// Sometimes you want left-to-right flow: pipe(f, g)(x) = g(f(x))

function pipe(...fns) {
  return function (x) {
    return fns.reduce((acc, fn) => fn(acc), x);
  };
}

let piped = pipe(addOne, double, half);
// Step: addOne(3) → 4 → double(4) → 8 → half(8) → 4
console.log("Pipe multiple:", piped(3));

// ----------------------------------------------------------------------------
// Part 5: Compose vs Pipe
// ----------------------------------------------------------------------------
// compose(f, g)(x) = f(g(x))  (Right-to-left)
// pipe(f, g)(x) = g(f(x))     (Left-to-right)
//
// Example:
// compose(double, square)(3) → double(square(3)) = 18
// pipe(square, double)(3) → double(square(3)) = 18 (same order, but easier to read)

// ----------------------------------------------------------------------------
// Part 6: Real-life Example
// ----------------------------------------------------------------------------
// Data transformations
let toUpper = (str) => str.toUpperCase();
let exclaim = (str) => str + "!";
let greet = (name) => "Hello " + name;

let excitedGreeting = compose(exclaim, toUpper, greet);
console.log(excitedGreeting("avi")); // "HELLO AVI!"

// ----------------------------------------------------------------------------
// ❓ Interview Q&A
// ----------------------------------------------------------------------------
// Q1) What is function composition?
// A1: Combining multiple small functions into a single function, where the
//     output of one becomes the input of the next.
//
// Q2) What is the difference between compose and pipe?
// A2: compose runs functions right-to-left, pipe runs left-to-right.
//
// Q3) Why use compose instead of just nesting calls?
// A3: It keeps code clean, avoids deep nesting, and allows building reusable
//     function pipelines.
//
// Q4) Where is compose used in real-world JS?
// A4: Libraries like Redux use compose for combining middlewares; it's also
//     common in functional programming libraries (Ramda, Lodash).
//
// Q5) Can compose work with async functions?
// A5: Yes, but you’ll need an async-aware compose that handles Promises
//     (await each step before passing to the next).
//
//
// ----------------------------------------------------------------------------
// End of "Compose Polyfills" notes
// ============================================================================

// ============================================================================
// 12) Polyfills in JavaScript || Polyfills (call, apply, bind, map, reduce, filter, forEach, Promise, all, allSettled, race, any, flat, fetch)
// ============================================================================
//
// 📌 What is a Polyfill?
// A polyfill is custom code (usually written in JS) that provides functionality
// that older browsers/environments may not support natively.
//
// Example: Older browsers don’t support Array.map(), so we write our own
// version (polyfill) to make it work.
//
// ----------------------------------------------------------------------------
// 1) Function.prototype.call Polyfill
// ----------------------------------------------------------------------------
Function.prototype.myCall = function (context, ...args) {
  context = context || globalThis; // default to global
  const fnSymbol = Symbol();
  context[fnSymbol] = this; // "this" is the function
  let result = context[fnSymbol](...args);
  delete context[fnSymbol];
  return result;
};

// Example
function greet(msg) {
  console.log(msg + " " + this.name);
}
greet.myCall({ name: "Avi" }, "Hello"); // Hello Avi

// ❓ Q: What is call()?
// 👉 A: Immediately calls a function with a given "this" and arguments.

// ----------------------------------------------------------------------------
// 2) Function.prototype.apply Polyfill
// ----------------------------------------------------------------------------
Function.prototype.myApply = function (context, args) {
  context = context || globalThis;
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  let result = context[fnSymbol](...args);
  delete context[fnSymbol];
  return result;
};

greet.myApply({ name: "Patel" }, ["Hi"]); // Hi Patel

// ❓ Q: Difference between call and apply?
// 👉 A: call() takes args individually, apply() takes them as an array.

// ----------------------------------------------------------------------------
// 3) Function.prototype.bind Polyfill
// ----------------------------------------------------------------------------
Function.prototype.myBind = function (context, ...args) {
  let fn = this;
  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};

let boundFn = greet.myBind({ name: "JS" }, "Welcome");
boundFn(); // Welcome JS

// ❓ Q: What does bind() do?
// 👉 A: Returns a new function with "this" fixed and preset arguments.

// ----------------------------------------------------------------------------
// 4) Array.prototype.map Polyfill
// ----------------------------------------------------------------------------
Array.prototype.myMap = function (callback) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

console.log([1, 2, 3].myMap((x) => x * 2)); // [2, 4, 6]

// ❓ Q: Why use map?
// 👉 A: To transform each element of an array into a new array.

// ----------------------------------------------------------------------------
// 5) Array.prototype.filter Polyfill
// ----------------------------------------------------------------------------
Array.prototype.myFilter = function (callback) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

console.log([1, 2, 3, 4].myFilter((x) => x % 2 === 0)); // [2, 4]

// ❓ Q: Why use filter?
// 👉 A: To create a new array only with elements that pass a condition.

// ----------------------------------------------------------------------------
// 6) Array.prototype.reduce Polyfill
// ----------------------------------------------------------------------------
Array.prototype.myReduce = function (callback, initialValue) {
  let acc = initialValue !== undefined ? initialValue : this[0];
  let start = initialValue !== undefined ? 0 : 1;
  for (let i = start; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }
  return acc;
};

console.log([1, 2, 3].myReduce((sum, x) => sum + x, 0)); // 6

// ❓ Q: Why use reduce?
// 👉 A: To combine array elements into a single value.

// ----------------------------------------------------------------------------
// 7) Array.prototype.forEach Polyfill
// ----------------------------------------------------------------------------
Array.prototype.myForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

[10, 20, 30].myForEach((x) => console.log(x));
// 10, 20, 30

// ----------------------------------------------------------------------------
// 8) Promise Polyfill (basic)
// ----------------------------------------------------------------------------
function MyPromise(executor) {
  let onResolve, onReject;
  let resolved = false,
    rejected = false,
    value;

  function resolve(val) {
    resolved = true;
    value = val;
    if (onResolve) onResolve(val);
  }
  function reject(err) {
    rejected = true;
    value = err;
    if (onReject) onReject(err);
  }

  this.then = function (cb) {
    onResolve = cb;
    if (resolved) cb(value);
    return this;
  };

  this.catch = function (cb) {
    onReject = cb;
    if (rejected) cb(value);
    return this;
  };

  executor(resolve, reject);
}

new MyPromise((res) => res("Polyfill works!")).then(console.log);

// ----------------------------------------------------------------------------
// 9) Promise.all Polyfill
// ----------------------------------------------------------------------------
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let completed = 0;

    promises.forEach((p, i) => {
      Promise.resolve(p).then((val) => {
        results[i] = val;
        completed++;
        if (completed === promises.length) resolve(results);
      }, reject);
    });
  });
};

Promise.myAll([Promise.resolve(1), Promise.resolve(2)]).then(console.log); // [1, 2]

// ----------------------------------------------------------------------------
// 10) Promise.allSettled Polyfill
// ----------------------------------------------------------------------------
Promise.myAllSettled = function (promises) {
  return Promise.all(
    promises.map((p) =>
      Promise.resolve(p)
        .then((val) => ({ status: "fulfilled", value: val }))
        .catch((err) => ({ status: "rejected", reason: err }))
    )
  );
};

Promise.myAllSettled([Promise.resolve(1), Promise.reject("Err")]).then(
  console.log
);

// ----------------------------------------------------------------------------
// 11) Promise.race Polyfill
// ----------------------------------------------------------------------------
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => Promise.resolve(p).then(resolve, reject));
  });
};

// ----------------------------------------------------------------------------
// 12) Promise.any Polyfill
// ----------------------------------------------------------------------------
Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    let errors = [];
    let pending = promises.length;

    promises.forEach((p, i) =>
      Promise.resolve(p)
        .then(resolve)
        .catch((err) => {
          errors[i] = err;
          pending--;
          if (pending === 0) reject(errors);
        })
    );
  });
};

// ----------------------------------------------------------------------------
// 13) Array.prototype.flat Polyfill
// ----------------------------------------------------------------------------
Array.prototype.myFlat = function (depth = 1) {
  let result = [];
  this.forEach((el) => {
    if (Array.isArray(el) && depth > 0) {
      result.push(...el.myFlat(depth - 1));
    } else {
      result.push(el);
    }
  });
  return result;
};

console.log([1, [2, [3, [4]]]].myFlat(2)); // [1, 2, 3, [4]]

// ----------------------------------------------------------------------------
// 14) fetch Polyfill (using XMLHttpRequest)
// ----------------------------------------------------------------------------
function myFetch(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300
        ? resolve(xhr.responseText)
        : reject(xhr.statusText);
    xhr.onerror = () => reject("Network Error");
    xhr.send();
  });
}

// Example:
// myFetch("https://jsonplaceholder.typicode.com/todos/1")
//   .then(console.log)
//   .catch(console.error);

// ----------------------------------------------------------------------------
// ❓ Interview Q&A (Easy to Remember)
// ----------------------------------------------------------------------------
//
// Q1) What is a polyfill?
// 👉 A piece of code that implements a feature that is not supported natively.
//
// Q2) Difference between call, apply, bind?
// 👉 call → calls function immediately with args
// 👉 apply → same but args as array
// 👉 bind → returns a new function
//
// Q3) Which array methods are higher-order? (accept callback)
// 👉 map, filter, reduce, forEach
//
// Q4) Difference between Promise.all & allSettled?
// 👉 all → fails fast (rejects if one fails)
// 👉 allSettled → waits for all (success/fail info)
//
// Q5) Promise.any vs race?
// 👉 any → returns first success, ignores failures
// 👉 race → returns first settled (success or fail)
//
// Q6) Why polyfills matter?
// 👉 They make modern JS features work in older environments.
//
// ============================================================================
// End of Polyfills Notes
// ============================================================================

// ============================================================================
// 13) JSON.parse() Polyfill
// ============================================================================
//
// 📌 What is JSON.parse?
// - JSON.parse() is used to convert a JSON string into a JavaScript object.
// - Example:
//     let str = '{"name":"Avi","age":25}';
//     let obj = JSON.parse(str);
//     console.log(obj.name); // Avi
//
// ----------------------------------------------------------------------------
// 🌟 Why do we need a polyfill?
// Older environments might not support JSON.parse().
// So we write our own implementation.
//
// ----------------------------------------------------------------------------
// ✅ Simple Polyfill using eval() (not safe for production)
// ----------------------------------------------------------------------------
function myJSONParse(jsonString) {
  return eval("(" + jsonString + ")");
}

// Example
let str = '{"name":"Avi","age":25,"skills":["JS","React"]}';
let obj = myJSONParse(str);
console.log(obj.name); // Avi
console.log(obj.skills); // ["JS","React"]

// ❌ Problem: eval() executes any code (unsafe).
// Example: myJSONParse('console.log("Hacked!")'); // executes code! 😱

// ----------------------------------------------------------------------------
// ✅ Safer Polyfill using Function constructor
// ----------------------------------------------------------------------------
function mySafeJSONParse(jsonString) {
  return new Function("return " + jsonString)();
}

let obj2 = mySafeJSONParse(str);
console.log(obj2.age); // 25

// ----------------------------------------------------------------------------
// ✅ Even Safer: Validate JSON before parsing (basic check)
// ----------------------------------------------------------------------------
function myValidatedJSONParse(jsonString) {
  // Allow only valid JSON characters
  if (
    /^[\],:{}\s]*$/.test(
      jsonString
        .replace(/\\["\\\/bfnrtu]/g, "@") // escape sequences
        .replace(
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          "]"
        )
        .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
    )
  ) {
    return eval("(" + jsonString + ")");
  }
  throw new Error("Invalid JSON string!");
}

try {
  let obj3 = myValidatedJSONParse('{"x":10,"y":20}');
  console.log(obj3); // { x: 10, y: 20 }
} catch (e) {
  console.error(e.message);
}

// ----------------------------------------------------------------------------
// ❓ Interview Q&A
// ----------------------------------------------------------------------------
//
// Q1) What does JSON.parse() do?
// 👉 Converts JSON string into JavaScript object.
//
// Q2) Why is using eval() risky in polyfill?
// 👉 Because eval can run malicious code (security issue).
//
// Q3) What’s the safer alternative to eval?
// 👉 Using `Function("return " + str)()` or proper validation before parsing.
//
// Q4) Difference between JSON and object literal?
// 👉 JSON: pure data format (strings, numbers, arrays, objects, booleans, null).
// 👉 Object literal: actual JS object in memory with methods, prototypes, etc.
//
// Q5) Can JSON contain functions?
// 👉 ❌ No, JSON only supports basic data types (string, number, object, array, boolean, null).
//
// ----------------------------------------------------------------------------
// ✅ Easy to Remember
// ----------------------------------------------------------------------------
// JSON.parse(str)  → String ➡ Object
// JSON.stringify(obj) → Object ➡ String
//
// ============================================================================
// End of JSON.parse() Polyfill Notes
// ============================================================================

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

// ============================================================================
// 15) Compare: Callbacks vs Promises vs Async/Await
// ============================================================================
//
// 📌 Why compare?
// These are 3 different ways to handle asynchronous code in JavaScript.
//
// ----------------------------------------------------------------------------
// 1) CALLBACKS
// ----------------------------------------------------------------------------
// - A function passed as an argument to another function.
// - Called when the task is complete.
// - Problem: "Callback Hell" (deep nesting, hard to read).
//
// Example:
function getDataCallback(callback) {
  setTimeout(() => {
    callback("✅ Data received (Callback)");
  }, 1000);
}

getDataCallback((data) => {
  console.log(data);
});

// Output (after 1s): ✅ Data received (Callback)

// ----------------------------------------------------------------------------
// 2) PROMISES
// ----------------------------------------------------------------------------
// - Cleaner alternative to callbacks.
// - A Promise represents a value that may be available now, later, or never.
// - Uses `.then()` for success and `.catch()` for errors.
//
// Example:
function getDataPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("✅ Data received (Promise)");
    }, 1000);
  });
}

getDataPromise()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// Output (after 1s): ✅ Data received (Promise)

// ----------------------------------------------------------------------------
// 3) ASYNC / AWAIT
// ----------------------------------------------------------------------------
// - Built on top of Promises (syntactic sugar).
// - Makes async code look like synchronous code.
// - Use `try/catch` for error handling.
//
// Example:
async function getDataAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("✅ Data received (Async/Await)");
    }, 1000);
  });
}

async function showData() {
  try {
    let data = await getDataAsync();
    console.log(data);
  } catch (err) {
    console.log("❌ Error:", err);
  }
}

showData();

// Output (after 1s): ✅ Data received (Async/Await)

// ----------------------------------------------------------------------------
// 📊 Quick Comparison Table
// ----------------------------------------------------------------------------
//
// Feature          | Callbacks                 | Promises                     | Async/Await
// ------------------------------------------------------------------------------------------
// Syntax           | Nested functions          | .then() / .catch()           | Looks like sync
// Error Handling   | Handle in callback        | .catch()                     | try/catch
// Readability      | ❌ Hard (Callback Hell)   | 🙂 Better                    | ✅ Best
// Execution Order  | Manual nesting            | Chained                      | Sequential / Parallel
// Based On         | Functions                 | Objects                      | Promises
//
// ----------------------------------------------------------------------------
// ❓ Interview Q&A
// ----------------------------------------------------------------------------
//
// Q1) Why did Promises replace Callbacks?
// 👉 To solve "Callback Hell" and provide better error handling.
//
// Q2) Is async/await same as Promises?
// 👉 Yes, async/await is syntactic sugar over Promises.
//
// Q3) Which one is best for readability?
// 👉 Async/Await.
//
// Q4) How do you handle errors in:
//    - Callbacks → Pass error as 1st argument.
//    - Promises → Use `.catch()`.
//    - Async/Await → Use `try/catch`.
//
// Q5) Can you mix Promises and Async/Await?
// 👉 Yes. Example: `await Promise.all([...])`.
//
// ----------------------------------------------------------------------------
// ✅ Easy to Remember
// ----------------------------------------------------------------------------
// Callbacks → Old, messy, "Callback Hell"
// Promises  → Cleaner with .then/.catch
// Async/Await → Modern, looks like sync, best readability
//
// ============================================================================
// End of Compare Notes
// ============================================================================

// ============================================================================
// 16) Debouncing & Throttling
// ============================================================================
//
// 📌 Why needed?
// - In JavaScript, events like typing, scrolling, resizing, or clicking
//   can fire many times in a short period.
// - This may cause performance issues (too many function calls).
// - To control this, we use: Debouncing & Throttling.
//
// ============================================================================
// 1) DEBOUNCING
// ============================================================================
//
// 👉 "Wait until user stops typing (or action stops) before calling function"
// 👉 Executes function ONLY after a certain delay since the LAST event.
// 👉 Useful for: search box, autocomplete, resize events.
//
// ----------------------------------------------------------------------------
// Example: Debouncing
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer); // reset timer every time function is called
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function searchQuery(query) {
  console.log("🔍 Searching for:", query);
}

// Wrap the search function with debounce
const debouncedSearch = debounce(searchQuery, 500);

// Simulating user typing
debouncedSearch("J");
debouncedSearch("Ja");
debouncedSearch("Jav");
debouncedSearch("Java");
// Only the last call ("Java") will execute after 500ms delay

// ============================================================================
// 2) THROTTLING
// ============================================================================
//
// 👉 "Execute function at regular intervals, no matter how many times triggered"
// 👉 Executes function ONCE per time interval.
// 👉 Useful for: scroll events, window resize, button clicks.
//
// ----------------------------------------------------------------------------
// Example: Throttling
function throttle(fn, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

function logScroll() {
  console.log("📜 Scroll event at", new Date().toLocaleTimeString());
}

const throttledScroll = throttle(logScroll, 1000);

// Simulating scroll events (fires every 50ms)
let interval = setInterval(throttledScroll, 50);
setTimeout(() => clearInterval(interval), 4000);

// Output: Will log only once per second, not 80 times!
// ============================================================================
//
// 📊 Quick Comparison
// ----------------------------------------------------------------------------
// Feature              | Debouncing                   | Throttling
// -----------------------------------------------------------------------------
// When executed?       | After user stops action      | At fixed intervals
// Example use case     | Search bar, resize           | Scroll, button spam
// Skips intermediate   | Yes (only last call matters) | Yes (only executes per interval)
//
// ============================================================================
// ❓ Interview Q&A
// ============================================================================
//
// Q1) What is Debouncing?
// 👉 A technique to call a function only after the user stops performing an action.
//
// Q2) What is Throttling?
// 👉 A technique to limit how often a function runs in a given time frame.
//
// Q3) Real-life examples?
// 👉 Debounce: Search suggestions should show only after typing stops.
// 👉 Throttle: Scroll handler should update position once every 200ms.
//
// Q4) Which improves performance more?
// 👉 Both do, depending on use case:
//    - Debounce = wait for pause
//    - Throttle = run at fixed pace
//
// Q5) Can you use both together?
// 👉 Yes, sometimes combined for maximum efficiency.
//
// ============================================================================
// ✅ Easy to Remember
// ----------------------------------------------------------------------------
// Debounce → "Wait until done" (e.g., typing search)
// Throttle → "Do at regular pace" (e.g., scroll)
// ============================================================================
// End of Debounce & Throttle Notes
// ============================================================================

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
