// ============================================================================
// ⚙️ 6. Functions in JavaScript
// ============================================================================
// Functions are the heart of JavaScript. They allow code reusability, abstraction,
// and functional programming. Let's go step by step.

// -----------------------------------------------------------------------------
// Topics covered:
// 1) Function Declaration & Expression
// 2) Arrow Functions
// 3) IIFE
// 4) Default Parameters
// 5) First-Class & Higher-Order Functions
// 6) Callback Functions
// 7) Closures & Uses
// 8) Currying and Infinite Currying
// 9) Functional Programming Concepts
// 10) Caching Functions
// 11) Generator Functions
// 12) Additional Topics
//      a) Arguments object
//      b) Rest & Spread in function parameters
//      c) Recursion & Tail Recursion
//      d) Pure vs Impure functions
//      e) Function properties (length, name)
//      f) Function hoisting nuances
//      g) Measuring function performance
// ============================================================================

// ---------------------------------------------------------------
// 1. Function Declaration vs Function Expression
// ---------------------------------------------------------------
//
// ---------------------------------------------------------------
// Part 1: Function Declaration
// ---------------------------------------------------------------
// 👉 Function Declaration = defining a function with the `function` keyword
// 👉 It must have a **name**.
// 👉 It is **hoisted** → we can call the function *before* its definition.
//
// Syntax:
function greet() {
  console.log("Hello from a function declaration!");
}

// Usage:
greet(); // "Hello from a function declaration!"

// Hoisting Example:
sayHi(); // ✅ Works, even though defined later
function sayHi() {
  console.log("Hi (Declaration is hoisted)");
}

// ---------------------------------------------------------------
// Part 2: Function Expression
// ---------------------------------------------------------------
// 👉 Function Expression = assigning a function to a variable
// 👉 Can be **named** or **anonymous**
// 👉 NOT hoisted → must be defined before calling
//
// Syntax (Anonymous):
const greetExpr = function () {
  console.log("Hello from a function expression!");
};
greetExpr(); // "Hello from a function expression!"

// Syntax (Named Expression):
const greetNamed = function myFunc() {
  console.log("Hello from a NAMED function expression!");
};
greetNamed(); // Works
// myFunc(); // ❌ Error (myFunc is only visible inside its own body)

// ---------------------------------------------------------------
// Part 3: Differences
// ---------------------------------------------------------------
//
// 1. Declaration is hoisted → usable before definition
// 2. Expression is not hoisted → usable only after definition
// 3. Expression can be anonymous; Declaration must be named
// 4. Expression allows functions as values (useful for callbacks, etc.)

// ---------------------------------------------------------------
// Part 4: Examples in Action
// ---------------------------------------------------------------

// Example 1: Callback function using Function Expression
setTimeout(function () {
  console.log("I run after 1 second (function expression as callback)");
}, 1000);

// Example 2: Passing function as value
function runOperation(fn) {
  fn();
}
runOperation(function () {
  console.log("Running operation passed as function expression");
});

// Example 3: Named Expression in recursion
const factorial = function fact(n) {
  if (n === 0) return 1;
  return n * fact(n - 1); // fact is accessible inside function body
};
console.log(factorial(5)); // 120

// ---------------------------------------------------------------
// ❓ Interview Q&A
// ---------------------------------------------------------------
//
// Q1) What is the difference between Function Declaration and Function Expression?
// 👉 Declaration is hoisted and must have a name.
// 👉 Expression is not hoisted, can be anonymous, often used as values.
//
// Q2) Can Function Declarations be used before their definition?
// 👉 Yes, because they are hoisted.
//
// Q3) Why are Function Expressions useful?
// 👉 Useful for callbacks, passing as arguments, or returning from functions.
//
// Q4) What happens if you name a Function Expression?
// 👉 The name is only available inside the function body (good for recursion).
//
// Q5) Which one is better for recursion – Declaration or Expression?
// 👉 Both can be used, but named expressions are useful in recursion without polluting the global scope.

// -----------------------------------------------------------------------------
// 2) Arrow Functions
// -----------------------------------------------------------------------------
//
// ---------------------------------------------------------------
// Part 1: What are Arrow Functions?
// ---------------------------------------------------------------
// 👉 Arrow functions were introduced in ES6 (2015).
// 👉 They provide a shorter and cleaner syntax for writing functions.
// 👉 They are always **expressions** (not declarations).
//
// Syntax Examples:
//
// Normal function expression:
const add1 = function (a, b) {
  return a + b;
};
console.log(add1(2, 3)); // 5

// Arrow function (shorter):
const add2 = (a, b) => a + b;
console.log(add2(2, 3)); // 5

// ---------------------------------------------------------------
// Part 2: Syntax Variations
// ---------------------------------------------------------------

// 1. With one parameter → parentheses optional
const square = (x) => x * x;
console.log(square(5)); // 25

// 2. With zero or multiple parameters → parentheses required
const greet = () => console.log("Hello!");
greet(); // "Hello!"

const multiply = (a, b) => a * b;
console.log(multiply(3, 4)); // 12

// 3. With multiple statements → need curly braces + explicit return
const divide = (a, b) => {
  console.log("Dividing numbers...");
  return a / b;
};
console.log(divide(10, 2)); // 5

// ---------------------------------------------------------------
// Part 3: Lexical `this` (main difference)
// ---------------------------------------------------------------
// 👉 Normal functions → `this` depends on how function is called.
// 👉 Arrow functions → `this` is taken (lexically) from surrounding scope.

let obj = {
  name: "JavaScript",
  normal: function () {
    console.log("Normal:", this.name);
  },
  arrow: () => {
    console.log("Arrow:", this.name);
  },
};
obj.normal(); // "Normal: JavaScript"
obj.arrow(); // "Arrow: undefined" (or global `this` in browsers)

// ---------------------------------------------------------------
// Part 4: Arrow Functions vs Normal Functions
// ---------------------------------------------------------------
//
// Differences:
// 1. Syntax → Arrow is shorter.
// 2. `this` → Arrow inherits from surrounding scope, Normal creates its own.
// 3. `arguments` → Normal has `arguments` object, Arrow does not.
// 4. Constructor → Normal functions can be used with `new`, Arrow cannot.
// 5. Methods → Avoid arrow for object methods (they don’t bind `this`).
// 6. Prototype → Normal functions have a prototype, Arrow functions don’t.

// Example: No `arguments` in arrow
function normalFn(a, b) {
  console.log(arguments); // [Arguments] { '0': 1, '1': 2 }
}
normalFn(1, 2);

const arrowFn = (a, b) => {
  // console.log(arguments); // ❌ Error: arguments is not defined
};
arrowFn(1, 2);

// Example: Cannot use as constructor
function Person(name) {
  this.name = name;
}
const p1 = new Person("Alice"); // Works

const PersonArrow = (name) => {
  this.name = name;
};
// const p2 = new PersonArrow("Bob"); // ❌ TypeError: PersonArrow is not a constructor

// ---------------------------------------------------------------
// Part 5: When NOT to use Arrow Functions
// ---------------------------------------------------------------
//
// ❌ As object methods (because they don’t have their own `this`)
// ❌ As constructors
// ❌ When we need `arguments` object
//
// ✅ Great for:
// - Callbacks (setTimeout, map, filter, etc.)
// - Short inline functions
// - Preserving `this` in nested functions

// Example: setTimeout with arrow
function Timer() {
  this.seconds = 0;
  setInterval(() => {
    this.seconds++;
    console.log(this.seconds);
  }, 1000);
}
const t = new Timer();
// (works because arrow inherits `this` from Timer)

// ---------------------------------------------------------------
// ❓ Interview Q&A
// ---------------------------------------------------------------
//
// Q1) What is the main difference between normal and arrow functions?
// 👉 Normal functions have their own `this`; arrow functions inherit from surrounding scope.
//
// Q2) Do arrow functions have `arguments`?
// 👉 No, they don’t. You can use rest parameters `(...args)` instead.
//
// Q3) Can arrow functions be used as constructors?
// 👉 No, they cannot. Only normal functions or classes can be used with `new`.
//
// Q4) Why were arrow functions introduced?
// 👉 To provide shorter syntax and fix common issues with `this` in callbacks.
//
// Q5) When should you avoid using arrow functions?
// 👉 As object methods, constructors, or when you need `arguments` object.
//
// Q6) Why are arrow functions good for callbacks?
// 👉 Because they automatically capture `this` from the outer scope, avoiding the need for `.bind(this)`.
//

// -----------------------------------------------------------------------------
// 6.3) IIFE — Immediately Invoked Function Expression
// -----------------------------------------------------------------------------
//
// ---------------------------------------------------------------
// Part 1: What is an IIFE?
// ---------------------------------------------------------------
// 👉 IIFE = a function that is defined AND executed immediately.
// 👉 Pattern: wrap a function in parentheses to turn it into an *expression*,
//    then immediately call it with another pair of parentheses.
//
// Two canonical forms:
// (function () { /*...*/ })();   // popular
// (function () { /*...*/ }());   // also valid
//
// Why parentheses?
// - `function foo(){}` at top-level is a *declaration* (not executed).
// - `(function(){})` turns it into an *expression*, which you can then call.
//
// Key benefits:
// - Creates its own scope → avoid polluting global scope.
// - Encapsulates private variables / one-time setup.
// - Useful before ES6 modules / block scoping (`let`/`const`) existed.
//
// Quick example:
(function () {
  console.log("IIFE executed");
})();

// ---------------------------------------------------------------
// Part 2: Avoid polluting the global scope (privacy)
// ---------------------------------------------------------------
// 👉 Variables inside an IIFE are private; not accessible outside.
// 👉 Great for creating modules with private state (pre-ES6).
let counter = (function () {
  let count = 0; // private
  return function () {
    count++;
    return count;
  };
})();
console.log(counter()); // 1
console.log(counter()); // 2
// `count` is not visible here; only accessible via returned function.

// ---------------------------------------------------------------
// Part 3: Passing arguments into an IIFE
// ---------------------------------------------------------------
// 👉 You can pass globals or config in a controlled way.
// 👉 Helpful to alias long globals or lock references for minification.
(function (global, doc) {
  // Using short aliases inside:
  const title = doc.title;
  // Expose a minimal API:
  global.appTitle = () => title;
})(typeof window !== "undefined" ? window : globalThis, document);

console.log(appTitle()); // current document title

// ---------------------------------------------------------------
// Part 4: Arrow IIFE & Async IIFE
// ---------------------------------------------------------------
// Arrow IIFE:
(() => {
  const msg = "Arrow IIFE running";
  console.log(msg);
})();

// Async IIFE → emulate top-level await (useful in Node < v14 or older bundlers)
(async () => {
  const data = await Promise.resolve({ ok: true });
  console.log("Async IIFE:", data.ok); // true
})();

// ---------------------------------------------------------------
// Part 5: IIFE vs Block Scope (`{}` with let/const)
// ---------------------------------------------------------------
// Today, block scope often replaces IIFEs for scoping.
// But IIFE is still useful when you need a *function scope* (e.g., `var`),
// or you want to immediately compute & return a value.
{
  // Block scope
  let a = 1;
}
// console.log(a); // ❌ ReferenceError

const CONFIG = (() => {
  // compute once, freeze, and expose
  const env = (globalThis.location && globalThis.location.host) || "localhost";
  const cfg = { env, version: "1.0.0" };
  return Object.freeze(cfg);
})();
console.log(CONFIG.env); // e.g., "localhost"

// ---------------------------------------------------------------
// Part 6: One-time initialization / feature detection
// ---------------------------------------------------------------
// 👉 IIFE lets you run setup code once and export only what you need.
const supportsPassive = (function () {
  let supported = false;
  try {
    const opts = Object.defineProperty({}, "passive", {
      get() {
        supported = true;
      },
    });
    window.addEventListener("test", null, opts);
    window.removeEventListener("test", null, opts);
  } catch (e) {}
  return supported;
})();
console.log("Passive listeners supported?", supportsPassive);

// ---------------------------------------------------------------
// Part 7: Named IIFE for recursion/debugging
// ---------------------------------------------------------------
// 👉 Naming helps with self-calls and better stack traces.
const factorialOnce = (function factFactory() {
  function fact(n) {
    return n <= 1 ? 1 : n * fact(n - 1);
  }
  return fact;
})();
console.log(factorialOnce(5)); // 120

// ---------------------------------------------------------------
// Part 8: Historical pattern — fixing loop closures (pre-let era)
// ---------------------------------------------------------------
// Before `let`, `var` caused a common closure bug in loops.
// IIFE captured the current value of i.
var fns = [];
for (var i = 0; i < 3; i++) {
  (function (iCopy) {
    fns.push(function () {
      console.log("iCopy =", iCopy);
    });
  })(i);
}
fns[0](); // 0
fns[1](); // 1
fns[2](); // 2
// With let, we can simply do: for (let i=0; i<3; i++) { ... }

// ---------------------------------------------------------------
// Part 9: Return values from IIFE
// ---------------------------------------------------------------
// 👉 IIFE returns whatever you return from the function body.
const onceComputed = (function () {
  const heavy = 2 ** 20; // pretend heavy compute
  return heavy + 1;
})();
console.log("Computed once:", onceComputed); // 1048577

// ---------------------------------------------------------------
// Part 10: Semicolon-safety when concatenating files
// ---------------------------------------------------------------
// 👉 If a previous file ends without a semicolon, starting an IIFE with `(`
//    could merge tokens and cause syntax errors.
// 👉 Safe pattern: begin file with a leading semicolon.
(() => {
  // safe even if previous file forgot semicolon
  // ...
})();

// ---------------------------------------------------------------
// Part 11: Mini “module” using IIFE (classic pattern)
// ---------------------------------------------------------------
// Encapsulate private state and export a public API.
const MathModule = (function () {
  // private:
  const PI = 3.14159;
  function areaCircle(r) {
    return PI * r * r;
  }
  function perimeterCircle(r) {
    return 2 * PI * r;
  }

  // public:
  return {
    areaCircle,
    perimeterCircle,
  };
})();
console.log(MathModule.areaCircle(3)); // 28.27431
console.log(MathModule.perimeterCircle(3)); // 18.84954

// ---------------------------------------------------------------
// ❓ Interview Q&A
// ---------------------------------------------------------------
//
// Q1) What is an IIFE and why use it?
// → A function expression that runs immediately. It creates a private scope,
//   avoids global pollution, and lets you run one-time initialization.
//
// Q2) Why do we wrap the function in parentheses?
// → To convert a function *declaration* into a *function expression*. Only
//   expressions can be immediately invoked.
//
// Q3) Difference between IIFE and block scope?
// → Block scope (`{}`) works with `let/const` and is simpler for scoping variables.
//   IIFE creates a *function scope*, can return values, and is useful for older code,
//   module-like patterns, or one-time computations.
//
// Q4) What is an async IIFE used for?
// → To use `await` at “top level” without making the whole file async.
//   Helpful in scripts that need async initialization.
//
// Q5) Can arrow functions be used as IIFEs?
// → Yes: `(() => { /*...*/ })();` They’re concise for short one-offs.
//
// Q6) How do you pass arguments into an IIFE?
// → `(function(a,b){ /*...*/ })(1,2);` Useful to inject globals or config.
//
// Q7) Do we still need IIFEs with ES modules?
// → Less often. ES modules have their own file scope by default. Still,
//   IIFEs remain handy for one-off computation, universal scripts, or legacy code.
//
// Q8) What’s the semicolon issue with IIFEs?
// → If the previous file didn’t end with `;`, starting an IIFE with `(`
//   may cause syntax errors. Use a leading `;` to be safe.
//
// -----------------------------------------------------------------------------
// End of IIFE notes

// ============================================================================
// 4) Default Parameters
// ============================================================================
//
// 📌 Theory:
// - Introduced in ES6 (2015).
// - Default parameters allow us to set initial values for function parameters.
// - If an argument is `undefined`, the default value is used.
// - `null` will NOT trigger default value (only `undefined` does).
// - Makes code cleaner, avoids manual checks.
//
// ----------------------------------------------------------------------------
// ✅ Example 1: Basic usage
// ----------------------------------------------------------------------------

function greet(name = "Guest") {
  return `Hello, ${name}`;
}

console.log(greet("Avi")); // Hello, Avi
console.log(greet()); // Hello, Guest (default used)

// ----------------------------------------------------------------------------
// ✅ Example 2: Multiple default parameters
// ----------------------------------------------------------------------------

function multiply(a = 2, b = 3) {
  return a * b;
}

console.log(multiply()); // 6 (2*3)
console.log(multiply(5)); // 15 (5*3)
console.log(multiply(5, 10)); // 50

// ----------------------------------------------------------------------------
// ✅ Example 3: Expressions as default values
// ----------------------------------------------------------------------------
//
// - Default parameters can be expressions, even function calls.

function randomMultiplier(n = Math.floor(Math.random() * 10)) {
  return n * 2;
}

console.log(randomMultiplier()); // Different result each time
console.log(randomMultiplier(5)); // 10 (uses given value)

// ----------------------------------------------------------------------------
// ✅ Example 4: Default parameters with other parameters
// ----------------------------------------------------------------------------
//
// Default parameters can use previous parameters.

function greetUser(name, greeting = `Hello, ${name}`) {
  return greeting;
}

console.log(greetUser("Avi")); // "Hello, Avi"
console.log(greetUser("Avi", "Hi!")); // "Hi!"

// ----------------------------------------------------------------------------
// ✅ Example 5: Difference between undefined & null
// ----------------------------------------------------------------------------

function test(x = 10) {
  console.log(x);
}

test(); // 10 (default used, since argument is missing → undefined)
test(undefined); // 10 (default used, explicit undefined)
test(null); // null (default NOT used)

// ----------------------------------------------------------------------------
// ✅ Example 6: Default parameters with destructuring
// ----------------------------------------------------------------------------

function printUser({ name = "Guest", age = 18 } = {}) {
  console.log(`Name: ${name}, Age: ${age}`);
}

printUser({ name: "Avi", age: 25 }); // Name: Avi, Age: 25
printUser({ name: "Avi" }); // Name: Avi, Age: 18
printUser(); // Name: Guest, Age: 18

// ----------------------------------------------------------------------------
// ❌ Pitfalls to remember
// ----------------------------------------------------------------------------
// 1. Only `undefined` triggers default value, not `null` or 0.
// 2. Default parameter evaluated each time function is called.
// 3. Be careful when using objects/arrays as defaults (shared reference).

function addToArray(val, arr = []) {
  arr.push(val);
  return arr;
}

console.log(addToArray(1)); // [1]
console.log(addToArray(2)); // [2] → not [1,2], because new [] created each time.

// ----------------------------------------------------------------------------
// 🎯 Interview Q&A
// ----------------------------------------------------------------------------
//
// Q1: What are default parameters in JavaScript?
//     → Parameters that use a fallback value if no argument (or undefined) is passed.
//
// Q2: When was it introduced?
//     → In ES6 (2015).
//
// Q3: Difference between `undefined` and `null` with default parameters?
//     → `undefined` triggers the default value, `null` does not.
//
// Q4: Can we use functions or expressions as default values?
//     → Yes, defaults can be any valid expression.
//
// Q5: Real use case?
//     → Functions with optional arguments (e.g., API calls, config options).
//
// ----------------------------------------------------------------------------

// ============================================================================
// 5) First-Class & Higher-Order Functions
// ============================================================================
//
// -----------------------------------------------------------------------------
// 📌 Part 1: First-Class Functions
// -----------------------------------------------------------------------------
//
// ✅ Theory:
// - In JavaScript, **functions are first-class citizens** (or first-class objects).
// - This means functions are treated like values/objects.
// - Functions can be:
//    1. Assigned to variables
//    2. Passed as arguments
//    3. Returned from other functions
//    4. Stored in objects/arrays
//
// 👉 Because of this property, powerful concepts like callbacks, closures,
//    functional programming, and higher-order functions are possible.
//
// ----------------------------------------------------------------------------
// ✅ Example 1: Assigning function to variable
// ----------------------------------------------------------------------------

function sayHello() {
  return "Hello!";
}

let greet = sayHello; // assign function reference
console.log(greet()); // "Hello!"

// ----------------------------------------------------------------------------
// ✅ Example 2: Passing function as argument
// ----------------------------------------------------------------------------

function operate(fn, a, b) {
  return fn(a, b);
}

function add(x, y) {
  return x + y;
}
function multiply(x, y) {
  return x * y;
}

console.log(operate(add, 5, 3)); // 8
console.log(operate(multiply, 5, 3)); // 15

// ----------------------------------------------------------------------------
// ✅ Example 3: Returning function from another function
// ----------------------------------------------------------------------------

function outer() {
  return function inner() {
    return "I am inner!";
  };
}

let innerFn = outer(); // outer returns a function
console.log(innerFn()); // "I am inner!"

// ----------------------------------------------------------------------------
// ✅ Example 4: Storing functions in data structures
// ----------------------------------------------------------------------------

let arr = [
  function (x) {
    return x * 2;
  },
  function (x) {
    return x * 3;
  },
];

console.log(arr); // 10
console.log(arr); // 15

// -----------------------------------------------------------------------------
// 📌 Part 2: Higher-Order Functions (HOFs)
// -----------------------------------------------------------------------------
//
// ✅ Theory:
// - A **higher-order function** is a function that does at least one of these:
//    1. Takes another function as an argument (callback).
//    2. Returns another function.
//
// - They are possible because functions are first-class citizens.
// - Very common in JS → map, filter, reduce are HOFs.
//
// ----------------------------------------------------------------------------
// ✅ Example 1: Function taking another function (callback)
// ----------------------------------------------------------------------------

function greetUser(name, formatter) {
  return "Hello " + formatter(name);
}

function upperCase(str) {
  return str.toUpperCase();
}

console.log(greetUser("avi", upperCase)); // "Hello AVI"

// ----------------------------------------------------------------------------
// ✅ Example 2: Function returning another function
// ----------------------------------------------------------------------------

function multiplier(factor) {
  return function (n) {
    return n * factor;
  };
}

let double = multiplier(2);
let triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// ----------------------------------------------------------------------------
// ✅ Example 3: Array methods (map, filter, reduce)
// ----------------------------------------------------------------------------

let numbers = [1, 2, 3, 4, 5];

let squares = numbers.map((n) => n * n); // HOF: map takes a function
console.log(squares); // [1, 4, 9, 16, 25]

let evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // [2, 4]

let sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

// ----------------------------------------------------------------------------
// ✅ Example 4: Real-life Higher-Order Function (authentication middleware)
// ----------------------------------------------------------------------------
//
// Imagine a middleware wrapper for checking login before accessing a route.

function withAuth(fn) {
  return function (user) {
    if (!user || !user.loggedIn) {
      console.log("Access denied");
    } else {
      fn(user);
    }
  };
}

function dashboard(user) {
  console.log("Welcome " + user.name);
}

let protectedDashboard = withAuth(dashboard);

protectedDashboard({ name: "Avi", loggedIn: true }); // "Welcome Avi"
protectedDashboard({ name: "Bob", loggedIn: false }); // "Access denied"

// -----------------------------------------------------------------------------
// 🎯 Interview Q&A
// -----------------------------------------------------------------------------
//
// Q1: What are First-Class Functions?
// 👉 Functions treated like values (can be assigned, passed, returned).
//
// Q2: What is a Higher-Order Function?
// 👉 A function that takes another function as argument OR returns a function.
//
// Q3: Give real-world examples of HOFs in JS.
// 👉 map, filter, reduce, setTimeout, addEventListener.
//
// Q4: Why are HOFs powerful?
// 👉 They enable abstraction, reusability, modularity, and functional programming style.
//
// Q5: Can every first-class function be higher-order?
// 👉 No. First-class is the capability, HOF is a use of that capability.

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

// ============================================================================
// 8) Currying and Infinite Currying
// ============================================================================
//
// ---------------------------------------------------------------
// Part 1: What is Currying?
// ---------------------------------------------------------------
// 👉 Currying = transforming a function with multiple arguments
//    into a sequence of functions, each taking ONE argument.
//
// Example (non-curried):
//   f(a, b, c)
//
// Curried version:
//   f(a)(b)(c)
//
// Why? → Helps with code reusability, partial application, functional style.
//
// ---------------------------------------------------------------
// Part 2: Basic Currying Example
// ---------------------------------------------------------------
function add(a, b) {
  return a + b;
}
console.log(add(2, 3)); // 5

// Curried version
function curriedAdd(a) {
  return function (b) {
    return a + b;
  };
}
console.log(curriedAdd(2)(3)); // 5

// Partial application possible:
const add5 = curriedAdd(5);
console.log(add5(10)); // 15

// ---------------------------------------------------------------
// Part 3: Generic Currying Function
// ---------------------------------------------------------------
// Helper to curry any function with fixed number of args
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args); // enough args → call original
    } else {
      return (...next) => curried(...args, ...next);
    }
  };
}

function sum3(a, b, c) {
  return a + b + c;
}

const curriedSum3 = curry(sum3);

console.log(curriedSum3(1)(2)(3)); // 6
console.log(curriedSum3(1, 2)(3)); // 6
console.log(curriedSum3(1)(2, 3)); // 6

// ---------------------------------------------------------------
// Part 4: Infinite Currying
// ---------------------------------------------------------------
// 👉 Infinite currying allows chaining calls endlessly until
//    a "terminator" condition is met.
//    (commonly when no argument is passed)

function infiniteSum(a) {
  return function (b) {
    if (b !== undefined) {
      return infiniteSum(a + b); // keep chaining
    }
    return a; // stop when called with no arg
  };
}

console.log(infiniteSum(1)(2)(3)(4)()); // 10
console.log(infiniteSum(5)(10)(15)()); // 30

// ---------------------------------------------------------------
// Part 5: Practical Uses of Currying
// ---------------------------------------------------------------
// 1) Function Reuse (specialization)
function multiply(a, b) {
  return a * b;
}
const curriedMultiply = curry(multiply);
const double2 = curriedMultiply(2);
const triple2 = curriedMultiply(3);

console.log(double2(10)); // 20
console.log(triple2(10)); // 30

// 2) Event Handling (browser)
function handleEvent(eventType) {
  return function (elementId) {
    return function (callback) {
      // In browser only:
      // document.getElementById(elementId).addEventListener(eventType, callback);
      console.log(`Event '${eventType}' bound to #${elementId}`);
    };
  };
}

handleEvent("click")("btnSubmit")(() => console.log("Submitted!"));
// Output: Event 'click' bound to #btnSubmit

// ---------------------------------------------------------------
// Part 6: Advanced Infinite Currying - Variadic Sum
// ---------------------------------------------------------------
// Instead of ending with (), you can use valueOf / toString trick
function chainSum(a) {
  let sum = a;
  function inner(b) {
    sum += b;
    return inner;
  }
  inner.valueOf = () => sum;
  inner.toString = () => sum;
  return inner;
}

console.log(chainSum(1)(2)(3)(4)); // [Function: inner]
console.log(chainSum(1)(2)(3)(4) + 0); // 10 (forces valueOf)

// In browser/Node REPL, just printing will show function,
// but in operations (+, template strings), it auto-coerces.

// ---------------------------------------------------------------
// ❓ Interview Q&A
// ---------------------------------------------------------------
//
// Q1) What is currying?
// → Converting a function with multiple arguments into a series
//   of functions that each take one argument.
//
// Q2) Why is currying useful?
// → Code reuse, partial application, functional composition, readability.
//
// Q3) Difference between currying and partial application?
// → Currying transforms function to unary chain (f(a)(b)(c)).
//   Partial application fixes some arguments but keeps others open (f(1, _, 3)).
//
// Q4) What is infinite currying?
// → Currying where function keeps returning another function until
//   a stopping condition (like empty call or coercion).
//
// Q5) Real-world use cases of currying?
// → Event binding, logging utilities, mathematical function reuse,
//   API call builders (e.g., createRequest("GET")("users")).
//
// ----------------------------------------------------------------------------
// End of Currying & Infinite Currying notes
// ----------------------------------------------------------------------------

// ============================================================================
// 9) Functional Programming Concepts
// ============================================================================
//
// ---------------------------------------------------------------
// Part 1: What is Functional Programming (FP)?
// ---------------------------------------------------------------
// 👉 Functional Programming is a programming paradigm where functions are
//    treated as "first-class citizens" and programs are built by combining
//    pure functions together.
//
// Core principles:
// - Functions are values (can be stored, passed, returned).
// - Avoid shared state / mutable data.
// - Avoid side-effects (pure functions).
// - Prefer immutability.
// - Declarative style (focus on "what" instead of "how").
//
// ---------------------------------------------------------------
// Part 2: Core Concepts
// ---------------------------------------------------------------

// 1) Pure Functions
// 👉 A function that:
//    - Given the same input, always returns the same output.
//    - Has no side effects (doesn't modify outside data).
function pureAdd(a, b) {
  return a + b; // ✅ pure
}
console.log(pureAdd(2, 3)); // 5

let x = 10;
function impureAdd(a) {
  return a + x; // ❌ depends on external variable
}
console.log(impureAdd(5)); // output changes if x changes!

// 2) Immutability
// 👉 Do not mutate (change) existing data. Instead, return a new one.
let arr2 = [1, 2, 3];
let newArr = [...arr2, 4]; // create new array instead of pushing into old
console.log(arr2); // [1, 2, 3]
console.log(newArr); // [1, 2, 3, 4]

// 3) First-Class Functions
// 👉 Functions can be assigned, passed, and returned.
const greet = () => "Hello!";
const executor = (fn) => fn();
console.log(executor(greet)); // "Hello!"

// 4) Higher-Order Functions
// 👉 A function that takes another function as argument or returns one.
function hofExample(fn, value) {
  return fn(value);
}
console.log(hofExample((x) => x * 2, 5)); // 10

// 5) Function Composition
// 👉 Combining small functions to build bigger functions.
const multiplyBy2 = (n) => n * 2;
const square2 = (n) => n * n;

// Compose manually
const multiplyThenSquare = (n) => square2(multiplyBy2(n));
console.log(multiplyThenSquare(3)); // (3*2)^2 = 36

// 6) Declarative vs Imperative
// Imperative → step by step (HOW)
let nums1 = [1, 2, 3, 4];
let doubled1 = [];
for (let i = 0; i < nums1.length; i++) {
  doubled1.push(nums1[i] * 2);
}
console.log(doubled1); // [2, 4, 6, 8]

// Declarative → WHAT you want
let doubledFP = nums1.map((n) => n * 2);
console.log(doubledFP); // [2, 4, 6, 8]

// 7) Map, Filter, Reduce (FP in JS)
let numbers1 = [1, 2, 3, 4, 5];

// Map → transform
let squares1 = numbers1.map((n) => n * n);
console.log(squares1); // [1, 4, 9, 16, 25]

// Filter → keep matching
let evens1 = numbers1.filter((n) => n % 2 === 0);
console.log(evens1); // [2, 4]

// Reduce → accumulate
let sum1 = numbers1.reduce((acc, n) => acc + n, 0);
console.log(sum1); // 15

// ---------------------------------------------------------------
// Part 3: Advanced FP Concepts
// ---------------------------------------------------------------

// 1) Currying & Partial Application
const add = (a) => (b) => a + b;
console.log(add(2)(3)); // 5

// 2) Recursion
// 👉 FP often uses recursion instead of loops.
function factorial(n) {
  return n === 0 ? 1 : n * factorial(n - 1);
}
console.log(factorial(5)); // 120

// 3) Lazy Evaluation (conceptual, shown using generator)
function* lazySquares(nums) {
  for (let n of nums) {
    console.log("Calculating square of", n);
    yield n * n;
  }
}
let it = lazySquares([1, 2, 3]);
console.log(it.next().value); // calculates only when needed → 1
console.log(it.next().value); // 4

// ---------------------------------------------------------------
// Part 4: Real-Life Example
// ---------------------------------------------------------------
// Imagine a shopping cart system:

let cart = [
  { item: "Book", price: 200 },
  { item: "Pen", price: 20 },
  { item: "Notebook", price: 100 },
];

// 1) Apply discount to all items (map)
let discounted = cart.map((p) => ({
  ...p,
  price: p.price * 0.9,
}));
console.log(discounted);

// 2) Filter items > 50 (filter)
let costly = discounted.filter((p) => p.price > 50);
console.log(costly);

// 3) Get total price (reduce)
let total = costly.reduce((sum, p) => sum + p.price, 0);
console.log(total);

// ---------------------------------------------------------------
// ❓ Interview Q&A
// ---------------------------------------------------------------
//
// Q1) What is functional programming?
// → A paradigm where functions are first-class, pure, and combined
//   to build programs in a declarative way.
//
// Q2) What are pure functions?
// → Functions that always return same output for same input and have no side effects.
//
// Q3) Why immutability is important in FP?
// → Avoids unexpected bugs, ensures predictability, helps with concurrency.
//
// Q4) Difference between declarative and imperative?
// → Imperative = HOW step by step, Declarative = WHAT outcome.
//
// Q5) What are map, filter, reduce in FP?
// → Core higher-order functions for transformation, selection, and accumulation.
//
// Q6) Why FP is popular in JS?
// → JS treats functions as first-class, has built-in HOFs, and supports immutability via spread/rest.
//
// ----------------------------------------------------------------------------
// End of Functional Programming Concepts
// ----------------------------------------------------------------------------

// ============================================================================
// 10) Caching Functions (Memoization)
// ============================================================================
//
// ---------------------------------------------------------------
// Part 1: What is Memoization?
// ---------------------------------------------------------------
// 👉 Memoization is an optimization technique used to speed up functions by
//    caching (remembering) their previously computed results.
//
// 👉 Idea:
// - Expensive function calls (like recursion, heavy calculations, API calls)
//   should not be recomputed if the same input is given again.
// - Store the result in a cache (object, Map, WeakMap).
// - If the function is called again with the same input → return from cache.
//
// ✅ Improves performance.
// ❌ Increases memory usage (cache storage).
//
// ---------------------------------------------------------------
// Part 2: Example Without Memoization
// ---------------------------------------------------------------
function slowSquare(n) {
  console.log("Computing...");
  return n * n;
}

console.log(slowSquare(5)); // "Computing..." 25
console.log(slowSquare(5)); // "Computing..." 25 (recomputed every time!)

// ---------------------------------------------------------------
// Part 3: Memoization Function
// ---------------------------------------------------------------
function memoize(fn) {
  let cache = {}; // store results
  return function (n) {
    if (cache[n] !== undefined) {
      console.log("Returning from cache...");
      return cache[n];
    }
    console.log("Computing and caching...");
    cache[n] = fn(n);
    return cache[n];
  };
}

// Wrap slow function with memoize
let fastSquare = memoize(slowSquare);

console.log(fastSquare(5)); // Computing and caching... 25
console.log(fastSquare(5)); // Returning from cache... 25

// ---------------------------------------------------------------
// Part 4: Practical Example – Fibonacci (Huge Performance Boost)
// ---------------------------------------------------------------

// ❌ Normal recursive Fibonacci (slow for large n)
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
console.log(fib(10)); // 55 (many repeated calls!)

// ✅ Optimized with memoization
function memoizeFib(fn) {
  let cache = {};
  return function f(n) {
    if (n in cache) return cache[n];
    if (n <= 1) return n;
    cache[n] = f(n - 1) + f(n - 2);
    return cache[n];
  };
}

let fastFib = memoizeFib(fib);
console.log(fastFib(40)); // much faster than normal recursion

// ---------------------------------------------------------------
// Part 5: Advanced Notes
// ---------------------------------------------------------------
// 1) Cache Keys
// - In above example, cache works only for single number `n`.
// - For multiple arguments, we can use JSON.stringify(args) as cache key.
//
// 2) Cache Storage
// - Object → simple, works fine.
// - Map → better for complex keys.
// - WeakMap → avoids memory leaks (garbage collected if object keys not used).
//
// 3) Tradeoff
// - Memory usage increases if too many results stored.
// - Need cache eviction strategies (LRU, TTL) in real-world.
//
// ---------------------------------------------------------------
// Part 6: Real-World Uses
// ---------------------------------------------------------------
// - API calls (avoid making same request multiple times).
// - Recursion heavy tasks (like Fibonacci, DP problems).
// - CPU-heavy math calculations.
// - UI rendering optimizations (React memoization).
//
// ---------------------------------------------------------------
// ❓ Interview Q&A
// ---------------------------------------------------------------
//
// Q1) What is memoization?
// 👉 Technique to cache function results to avoid recomputation.
//
// Q2) Difference between caching and memoization?
// 👉 Caching = generic storage for data.
// 👉 Memoization = caching specific to function calls.
//
// Q3) Where is memoization useful?
// 👉 Recursion (Fibonacci, factorial), expensive calculations, repeated function calls.
//
// Q4) What are limitations?
// 👉 High memory usage, not useful if inputs are always unique.
//
// Q5) Difference between Object cache vs Map vs WeakMap?
// 👉 Object/Map: store results manually.
// 👉 WeakMap: allows garbage collection of unused keys (prevents memory leaks).
//
// ----------------------------------------------------------------------------
// End of Caching Functions (Memoization)
// ----------------------------------------------------------------------------

// ============================================================================
// 11) Generator Functions
// ============================================================================
//
// ---------------------------------------------------------------
// Part 1: What are Generator Functions?
// ---------------------------------------------------------------
// 👉 Generator functions are **special functions** that can be paused and resumed.
// 👉 Declared with: `function*` (note the `*`).
// 👉 They return a **Generator Object** (iterator).
//
// ✅ Key features:
// - Use `yield` keyword to pause execution.
// - Calling `.next()` resumes execution from the last yield.
// - Each `.next()` returns an object: { value: X, done: boolean }.
// - `done: true` → generator is finished.
//
// ---------------------------------------------------------------
// Part 2: Basic Example
// ---------------------------------------------------------------
function* genNumbers() {
  yield 1; // pause here
  yield 2; // pause here
  yield 3; // pause here
}

let g = genNumbers();

console.log(g.next()); // { value: 1, done: false }
console.log(g.next()); // { value: 2, done: false }
console.log(g.next()); // { value: 3, done: false }
console.log(g.next()); // { value: undefined, done: true }

// ---------------------------------------------------------------
// Part 3: Iterating Generators
// ---------------------------------------------------------------
// 👉 Generator objects are iterable → can use for...of
for (let num of genNumbers()) {
  console.log(num); // 1, 2, 3
}

// ---------------------------------------------------------------
// Part 4: Infinite Generators
// ---------------------------------------------------------------
// Generators don’t need to finish → useful for infinite sequences
function* naturalNumbers() {
  let n = 1;
  while (true) {
    yield n++;
  }
}

let numbers2 = naturalNumbers();
console.log(numbers2.next().value); // 1
console.log(numbers2.next().value); // 2
console.log(numbers2.next().value); // 3
// … continues infinitely

// ---------------------------------------------------------------
// Part 5: Passing Values to Generators
// ---------------------------------------------------------------
// 👉 We can send data back into generator using next(arg)
function* greeter() {
  let name = yield "What is your name?";
  yield `Hello, ${name}!`;
}

let greet = greeter();
console.log(greet.next()); // { value: "What is your name?", done: false }
console.log(greet.next("Alice")); // { value: "Hello, Alice!", done: false }
console.log(greet.next()); // { value: undefined, done: true }

// ---------------------------------------------------------------
// Part 6: Generators vs Normal Functions
// ---------------------------------------------------------------
// ✅ Normal Function → runs completely, cannot be paused.
// ✅ Generator Function → runs step by step, can pause/resume with yield.
//
// Example:
function normalFn() {
  return 42;
}
console.log(normalFn()); // 42 (no pause possible)

function* generatorFn() {
  yield 10;
  yield 20;
}
let it1 = generatorFn();
console.log(it1.next()); // { value: 10, done: false }
console.log(it1.next()); // { value: 20, done: false }

// ---------------------------------------------------------------
// Part 7: Real-World Uses of Generators
// ---------------------------------------------------------------
// 1) Lazy Iteration (generate values on demand).
// 2) Infinite sequences (like streams, numbers).
// 3) Asynchronous control flow (before async/await, generators + promises used).
// 4) Data pipelines (step-by-step processing of data).
//
// Example: Generating Fibonacci sequence lazily
function* fibonacci() {
  let a = 0,
    b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3
console.log(fib.next().value); // 5

// ---------------------------------------------------------------
// ❓ Interview Q&A
// ---------------------------------------------------------------
//
// Q1) What is a generator function?
// 👉 A function declared with `function*` that can pause (yield) and resume.
//
// Q2) What does yield do?
// 👉 Pauses execution, returns a value, resumes when `.next()` is called.
//
// Q3) Difference between normal functions and generators?
// 👉 Normal functions run fully; generators run step-by-step and can pause.
//
// Q4) What are real-world use cases?
// 👉 Lazy evaluation, infinite sequences, async flow control, data pipelines.
//
// Q5) Can generators be iterated with for...of?
// 👉 Yes, generators are iterable and support `for...of`, spread, etc.
//
// ----------------------------------------------------------------------------
// End of Generator Functions
// ----------------------------------------------------------------------------

// ============================================================================
// 12) Additional Topics in Functions
// ============================================================================

// ---------------------------------------------------------------
// 12.1) Arguments Object
// ---------------------------------------------------------------
// 👉 `arguments` is an array-like object available inside functions.
// 👉 Contains all arguments passed to the function (even if not defined in parameters).
// 👉 NOT available in arrow functions.

function showArgs(a, b) {
  console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3 }
}
showArgs(1, 2, 3);

// ⚠️ Limitations:
// - It's array-like (has length, can access by index), but NOT a real array.
// - No array methods (map, filter, etc.) directly.

// Example: converting arguments to real array
function sumAll() {
  let arr = Array.from(arguments);
  return arr.reduce((a, b) => a + b, 0);
}
console.log(sumAll(1, 2, 3, 4)); // 10

// ---------------------------------------------------------------
// 12.2) Rest & Spread in Function Parameters
// ---------------------------------------------------------------
// ✅ Rest → Collects multiple arguments into an array
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// ✅ Spread → Expands arrays/objects into elements
let arr3 = [1, 2, 3];
console.log(Math.max(...arr3)); // 3

// Rest + Spread together
function multiply(factor, ...nums) {
  return nums.map((n) => n * factor);
}
console.log(multiply(2, 1, 2, 3)); // [2, 4, 6]

// ---------------------------------------------------------------
// 12.3) Recursion & Tail Recursion Optimization
// ---------------------------------------------------------------
// 👉 Recursion = function calling itself.
// 👉 Tail recursion = recursive call is the LAST operation in the function.
// Some engines optimize tail recursion to save memory (not all JS engines).

// Example: Factorial (normal recursion)
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5)); // 120

// Example: Factorial (tail recursion style)
function factorialTail(n, acc = 1) {
  if (n === 0) return acc;
  return factorialTail(n - 1, n * acc);
}
console.log(factorialTail(5)); // 120
// ⚠️ JS (as of now) doesn’t guarantee tail-call optimization in all engines.

// ---------------------------------------------------------------
// 12.4) Pure vs Impure Functions
// ---------------------------------------------------------------
// ✅ Pure Function:
// - Same input → same output
// - No side effects (doesn’t change external state)

function pureAdd(a, b) {
  return a + b;
}
console.log(pureAdd(2, 3)); // 5

// ❌ Impure Function:
let x1 = 10;
function impureAdd(y) {
  return (x1 += y); // modifies external state
}
console.log(impureAdd(5)); // 15
console.log(impureAdd(5)); // 20 (different result for same input!)

// ---------------------------------------------------------------
// 12.5) Function Properties (length, name)
// ---------------------------------------------------------------
function demoFn(a, b, c) {}
console.log(demoFn.length); // 3 → number of declared parameters
console.log(demoFn.name); // "demoFn" → function name

let anon = function (x, y) {};
console.log(anon.name); // "anon" (inferred by variable name)

// ---------------------------------------------------------------
// 12.6) Function Hoisting Nuances
// ---------------------------------------------------------------
// ✅ Function Declarations → fully hoisted (can call before definition)
hello();
function hello() {
  console.log("Hello World!");
}

// ❌ Function Expressions → NOT hoisted
// greet(); // ❌ Error: Cannot access 'greet' before initialization
const greet = function () {
  console.log("Hi there!");
};

// Arrow functions behave like function expressions → not hoisted.

// ---------------------------------------------------------------
// 12.7) Function to Measure Performance
// ---------------------------------------------------------------
// 👉 Use Date.now() or performance.now() to measure execution time.

function measurePerformance(fn, ...args) {
  let start = performance.now();
  let result = fn(...args);
  let end = performance.now();
  console.log(`Execution Time: ${end - start} ms`);
  return result;
}

// Example: Measuring factorial
let res = measurePerformance(factorial, 10);
console.log("Result:", res);

// ---------------------------------------------------------------
// ❓ Interview Q&A
// ---------------------------------------------------------------
//
// Q1) What is the difference between `arguments` and rest parameters?
// 👉 `arguments`: array-like, older, not available in arrow functions.
// 👉 Rest: modern syntax, real array, works only at the end of params.
//
// Q2) What is recursion, and what is tail recursion?
// 👉 Recursion: function calls itself.
// 👉 Tail recursion: recursive call is the last statement (can be optimized).
//
// Q3) Difference between pure and impure functions?
// 👉 Pure: no side effects, same input → same output.
// 👉 Impure: depends on or modifies external state.
//
// Q4) What are function properties like length and name used for?
// 👉 length: number of declared params, name: function’s identifier.
//
// Q5) What is hoisting in functions?
// 👉 Declarations hoisted fully, expressions/arrow functions are not.
//
// Q6) How do you measure performance of a function?
// 👉 Use `performance.now()` (high resolution) or `Date.now()`.
//
// ----------------------------------------------------------------------------
// End of Additional Topics
// ----------------------------------------------------------------------------

// ============================================================================
// ❓ Interview Q&A (Summary)
// ============================================================================
// Q1) Difference between declaration vs expression?
// A: Declaration is hoisted, expression is not.
// Q2) Why arrow functions? When NOT to use them?
// A: Shorter + lexical this. Don’t use in objects/constructors.
// Q3) What is closure and its uses?
// A: Function + its lexical scope. Used for data hiding, modules.
// Q4) Explain currying & infinite currying.
// Q5) What is memoization?
// A: Caching function results to improve performance.
// Q6) Difference between generators and normal functions?
// A: Generators can pause/resume with yield.
// Q7) What is tail recursion?
// A: Optimized recursion where last operation is recursive call.
// ============================================================================
