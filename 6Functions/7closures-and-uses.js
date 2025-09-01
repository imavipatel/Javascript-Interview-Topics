// ============================================================================
// 7) Closures & Uses
// ============================================================================
//
// ---------------------------------------------------------------
// Part 1: What is a Closure?
// ---------------------------------------------------------------
// 👉 A closure is created when a function "remembers" variables
//    from the scope in which it was created, even after that scope has finished.
//
// In simpler terms:
// - Inner function + variables from its outer function = Closure
//
// JS functions are "first-class" → they carry their scope chain with them.
//
// Key idea: Lexical scope = scope decided at function definition, not call.
//
// ---------------------------------------------------------------
// Example 1: Basic closure
// ---------------------------------------------------------------
function outer() {
  let secret = "🔑"; // local variable
  return function inner() {
    // inner function "remembers" secret
    console.log("Secret is:", secret);
  };
}

let fnClosure = outer(); // outer() finished, but "secret" is still alive
fnClosure(); // Secret is: 🔑

// ---------------------------------------------------------------
// Part 2: Why are Closures powerful?
// ---------------------------------------------------------------
// - Data hiding (private variables)
// - Encapsulation (like classes, but lighter)
// - Function factories (generate specialized functions)
// - Event handlers (remember state between calls)
// - Memoization/caching
// - Async tasks (callbacks/promises remember their scope)

// ---------------------------------------------------------------
// Part 3: Private variables with closures
// ---------------------------------------------------------------
function createCounter() {
  let count = 0; // private variable
  return {
    increment: () => ++count,
    decrement: () => --count,
    get: () => count,
  };
}

let c = createCounter();
console.log(c.increment()); // 1
console.log(c.increment()); // 2
console.log(c.get()); // 2
console.log(c.decrement()); // 1
// "count" cannot be accessed directly → hidden in closure.

// ---------------------------------------------------------------
// Part 4: Function Factories
// ---------------------------------------------------------------
function makeMultiplier(factor) {
  return function (num) {
    return num * factor; // remembers "factor"
  };
}

const double1 = makeMultiplier(2);
const triple1 = makeMultiplier(3);

console.log(double1(5)); // 10
console.log(triple1(5)); // 15

// ---------------------------------------------------------------
// Part 5: Closures in Loops (Common Pitfall)
// ---------------------------------------------------------------
// Problem: var is function-scoped, all callbacks "share" same variable
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log("var i:", i), i * 100);
}
// Output: var i: 4, var i: 4, var i: 4

// Fix 1: let (block scoped, new binding each iteration)
for (let j = 1; j <= 3; j++) {
  setTimeout(() => console.log("let j:", j), j * 100);
}
// Output: let j: 1, let j: 2, let j: 3

// Fix 2: IIFE (closure captures current value)
for (var k = 1; k <= 3; k++) {
  ((x) => setTimeout(() => console.log("IIFE k:", x), x * 100))(k);
}

// ---------------------------------------------------------------
// Part 6: Closures in Async Functions
// ---------------------------------------------------------------
function delayedLogger(msg, delay) {
  setTimeout(() => {
    console.log("Logged:", msg); // closure remembers msg
  }, delay);
}

delayedLogger("Hello after 500ms", 500);

// ---------------------------------------------------------------
// Part 7: Memoization / Caching
// ---------------------------------------------------------------
function memoize(fn) {
  const cache = {};
  return function (x) {
    if (x in cache) {
      console.log("Fetching from cache:", x);
      return cache[x];
    }
    console.log("Computing result for:", x);
    const result = fn(x);
    cache[x] = result;
    return result;
  };
}

function slowSquare(n) {
  for (let i = 0; i < 1e7; i++); // pretend slow
  return n * n;
}

const fastSquare1 = memoize(slowSquare);
console.log(fastSquare1(5)); // computes
console.log(fastSquare1(5)); // fetches from cache

// ---------------------------------------------------------------
// Part 8: Module Pattern
// ---------------------------------------------------------------
const UserModule = (function () {
  let name = "anonymous"; // private
  return {
    setName: (newName) => (name = newName),
    greet: () => console.log("Hello,", name),
  };
})();

UserModule.greet(); // "Hello, anonymous"
UserModule.setName("Avi");
UserModule.greet(); // "Hello, Avi"

// ---------------------------------------------------------------
// Part 9: Practical Uses
// ---------------------------------------------------------------
// 1) Event Handlers
function makeHandler(name) {
  return function () {
    console.log("Clicked by:", name);
  };
}
// (Browser only)
// document.querySelector("#btn").addEventListener("click", makeHandler("Avi"));

// 2) Once-only Functions
function once(fn) {
  let called = false;
  return function (...args) {
    if (!called) {
      called = true;
      return fn.apply(this, args);
    }
  };
}
const init1 = once(() => console.log("Init only once"));
init1(); // Init only once
init1(); // nothing

// ---------------------------------------------------------------
// ❓ Interview Q&A
// ---------------------------------------------------------------
//
// Q1) What is a closure?
// → A closure is a function bundled with its lexical environment.
//   It "remembers" variables from its outer scope even after that scope has closed.
//
// Q2) Why do we need closures?
// → For data hiding, private state, functional programming patterns,
//   async callbacks, memoization, etc.
//
// Q3) Common pitfalls?
// → Using `var` inside loops with async functions (fix with let/IIFE).
//
// Q4) Example of closures in real life?
// → Event handlers: a button click callback "remembers" variables
//   from when it was created.
//
// Q5) Are closures bad for memory?
// → If misused, closures can keep variables alive longer than needed,
//   causing memory leaks. But usually they are very efficient and idiomatic.
//
// ----------------------------------------------------------------------------
// End of Closures & Uses notes
// ----------------------------------------------------------------------------
