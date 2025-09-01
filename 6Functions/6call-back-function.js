// ============================================================================
// 6. Callback Functions
// ============================================================================
//
// ---------------------------------------------------------------
// Part 1: What is a Callback?
// ---------------------------------------------------------------
// 👉 A *callback* is a function you pass to another function so it can be
//    called (invoked back) later.
// 👉 Callbacks can be:
//    - Synchronous: executed immediately during the call.
//    - Asynchronous: executed later (after some delay / I/O / event).
//
// Why callbacks?
// - In JS, many operations are asynchronous (timers, network, disk, UI).
// - We need a way to say: "When you're done, run THIS."
//
// Signature conventions:
// - Array methods: (value, index, array)
// - Node.js style (error-first): (err, data)
// - Custom: whatever your API defines (but document it!)
//
// ---------------------------------------------------------------
// Example 1: Synchronous callback
// ---------------------------------------------------------------

function greet(name, formatter /* <- callback */) {
  return formatter(`Hello, ${name}`);
}

function toUpper(str) {
  return str.toUpperCase();
}

console.log(greet("Avi", toUpper)); // "HELLO, AVI"

// ---------------------------------------------------------------
// Example 2: Asynchronous callback (setTimeout)
// ---------------------------------------------------------------

console.log("A");
setTimeout(() => console.log("B (from timer)"), 0);
console.log("C");
// Output order: A, C, B
// Explanation: setTimeout goes to the macrotask queue, runs after current call stack.

// ---------------------------------------------------------------
// Part 2: Callbacks in the Wild
// ---------------------------------------------------------------
// 1) DOM events (Browser only)
// document.querySelector("#btn").addEventListener("click", (e) => {
//   console.log("Clicked!", e.target);
// });

// 2) Array methods (sync)
const nums = [1, 2, 3, 4];
const doubled = nums.map((n) => n * 2); // callback runs for each item
console.log(doubled); // [2, 4, 6, 8]

// ---------------------------------------------------------------
// Part 3: Error-First (Node.js) Callback Pattern
// ---------------------------------------------------------------
// Convention: callback(err, data)
// - If success → err = null, data = result
// - If failure → err = Error, data = undefined

function fakeReadFile(path, cb /* (err, data) */) {
  setTimeout(() => {
    if (typeof path !== "string") {
      cb(new Error("Path must be a string"));
    } else {
      cb(null, `Contents of ${path}`);
    }
  }, 300);
}

// Success:
fakeReadFile("notes.txt", (err, data) => {
  if (err) return console.error("ERR:", err.message);
  console.log("OK:", data); // e.g., "OK: Contents of notes.txt"
});

// Failure:
fakeReadFile(123, (err, data) => {
  if (err) return console.error("ERR:", err.message); // "Path must be a string"
  console.log("OK:", data);
});

// ---------------------------------------------------------------
// Part 4: Callback Hell (Pyramid of Doom) & Refactors
// ---------------------------------------------------------------
// Problem: Deeply nested callbacks become hard to read/maintain.

function getUser(id, cb) {
  setTimeout(() => cb(null, { id, name: "Avi" }), 200);
}
function getOrders(userId, cb) {
  setTimeout(() => cb(null, [{ id: 1 }, { id: 2 }]), 200);
}
function getOrderDetails(orderId, cb) {
  setTimeout(() => cb(null, { id: orderId, total: 99 }), 200);
}

// ❌ Callback hell example:
getUser(7, (err, user) => {
  if (err) return console.error(err);
  getOrders(user.id, (err, orders) => {
    if (err) return console.error(err);
    getOrderDetails(orders[0].id, (err, details) => {
      if (err) return console.error(err);
      console.log("Details:", details); // { id: 1, total: 99 }
    });
  });
});

// ✅ Refactor 1: Name the callbacks (still callbacks, but flatter)
function onUser(err, user) {
  if (err) return console.error(err);
  getOrders(user.id, onOrders);
}
function onOrders(err, orders) {
  if (err) return console.error(err);
  getOrderDetails(orders[0].id, onDetails);
}
function onDetails(err, details) {
  if (err) return console.error(err);
  console.log("Details (named):", details);
}
getUser(7, onUser);

// ✅ Refactor 2: Promises / async-await (beyond callbacks but practical)
// (You can wrap these API functions in Promises to avoid nesting)

// ---------------------------------------------------------------
// Part 5: Inversion of Control & "call only once" guards
// ---------------------------------------------------------------
// With callbacks, you hand control to third-party code → risk of:
// - Calling your callback multiple times
// - Not calling your callback at all
// - Calling with wrong arguments
//
// Mitigation: create a "once" wrapper to ensure single invocation.

function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

const init = once(() => console.log("Initialized only once"));
init(); // "Initialized only once"
init(); // (no output)

// ---------------------------------------------------------------
// Part 6: `this` Pitfall with Callbacks (+ Fixes)
// ---------------------------------------------------------------
// When passing methods as callbacks, `this` can be lost.

const userObj = {
  name: "JS",
  say() {
    console.log("Hello,", this.name);
  },
};

// Problem: passing method reference loses this
setTimeout(userObj.say, 10); // "Hello, undefined" (or "Hello, window.name" in browsers)

// Fix 1: bind
setTimeout(userObj.say.bind(userObj), 20); // "Hello, JS"

// Fix 2: wrap with arrow (lexical this of surrounding scope—not always same)
setTimeout(() => userObj.say(), 30); // "Hello, JS"

// ---------------------------------------------------------------
// Part 7: Build Your Own HOFs with Callbacks
// ---------------------------------------------------------------

// 1) Custom forEach
function forEach(list, cb /* (value, index, array) */) {
  for (let i = 0; i < list.length; i++) {
    cb(list[i], i, list);
  }
}
forEach(["a", "b", "c"], (val, i) => console.log(i, val));
// 0 "a"
// 1 "b"
// 2 "c"

// 2) Custom map
function map(list, cb) {
  const out = [];
  forEach(list, (val, i, arr) => out.push(cb(val, i, arr)));
  return out;
}
console.log(map([1, 2, 3], (x) => x * 3)); // [3, 6, 9]

// 3) Debounce (common UI utility)
// - Waits for quiet time before invoking callback (e.g., typing)
function debounce(fn, delay = 300) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), delay);
  };
}
// Usage (browser):
// window.addEventListener("resize", debounce(() => console.log("resized"), 200));

// 4) Throttle (invoke at most once per interval)
function throttle(fn, interval = 300) {
  let last = 0;
  let pending;
  return function (...args) {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn.apply(this, args);
    } else {
      // optional: queue a trailing call
      clearTimeout(pending);
      pending = setTimeout(() => {
        last = Date.now();
        fn.apply(this, args);
      }, interval - (now - last));
    }
  };
}
// Usage (browser):
// document.addEventListener("scroll", throttle(() => console.log("scroll"), 100));

// ---------------------------------------------------------------
// Part 8: Mixing Callbacks with Microtasks/Macrotasks
// ---------------------------------------------------------------
// - setTimeout/setInterval → macrotasks
// - Promise.then / queueMicrotask → microtasks
// Microtasks run *before* the next macrotask.

console.log("1 sync");

setTimeout(() => console.log("4 macrotask (timeout)"), 0);

Promise.resolve()
  .then(() => console.log("2 microtask (promise then)"))
  .then(() => console.log("3 microtask (promise chain)"));

/*
Order:
1 sync
2 microtask (promise then)
3 microtask (promise chain)
4 macrotask (timeout)
*/

// ---------------------------------------------------------------
// Part 9: From Callback to Promise (promisify)
// ---------------------------------------------------------------
// Many modern APIs use Promises. You can convert error-first callbacks to Promises.

function promisify(fn /* expects (..args, cb) */) {
  return (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (err, data) => (err ? reject(err) : resolve(data)));
    });
}

const readFileP = promisify(fakeReadFile);
readFileP("notes.txt").then(console.log).catch(console.error);
// "Contents of notes.txt"

// ---------------------------------------------------------------
// Part 10: Defensive Callback API Design
// ---------------------------------------------------------------
// Tips when designing functions that accept callbacks:
// - Document the callback signature clearly.
// - Decide sync vs async execution and be consistent.
// - Consider always async (use queueMicrotask to normalize timing).
// - Validate that a provided "callback" is actually a function.
// - Ensure you never call callbacks more than once without reason.

function doWork(data, cb) {
  if (typeof cb !== "function") {
    throw new TypeError("Callback must be a function");
  }
  // normalize to async (even if fast)
  queueMicrotask(() => cb(null, data.toUpperCase()));
}

doWork("ok", (err, res) => {
  if (err) return console.error(err);
  console.log("Normalized async:", res); // "OK"
});

// ---------------------------------------------------------------
// ❓ Interview Q&A
// ---------------------------------------------------------------
//
// Q1) What is a callback?
// → A function passed into another function to be executed later.
//
// Q2) Difference between synchronous and asynchronous callbacks?
// → Sync: executed immediately during the call.
//   Async: executed later, after I/O/timer/event completes.
//
// Q3) What is error-first callback style?
// → Node.js convention: callback(err, data). err is null on success.
//
// Q4) What is callback hell and how to avoid it?
// → Deeply nested callbacks. Avoid by: naming callbacks, modularizing,
//   and/or converting to Promises/async-await.
//
// Q5) What is inversion of control?
// → You give control to another function/library to decide *when/how* your
//   callback is called. Guard with `once`, timeouts, validation.
//
// Q6) How to handle `this` when passing object methods as callbacks?
// → Use `.bind(obj)` or wrap with an arrow function to preserve the context.
//
// Q7) Microtask vs macrotask with callbacks?
// → Promise callbacks go to microtask queue; setTimeout goes to macrotask.
//   Microtasks flush before macrotasks.
//
// Q8) Real-world utilities built with callbacks?
// → Debounce, throttle, custom map/filter/forEach, event handlers, middleware.
//
// ----------------------------------------------------------------------------
// End of Callback Functions notes
// ----------------------------------------------------------------------------
