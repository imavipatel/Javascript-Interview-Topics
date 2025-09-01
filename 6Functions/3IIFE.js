// -----------------------------------------------------------------------------
// 3) IIFE — Immediately Invoked Function Expression
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
