/**
 * ============================================================
 * 📘 JavaScript Revision Notes (with 2-line theory each)
 * ============================================================
 *
 * =============================
 * SECTION 1: BASICS
 * =============================
 *
 * 1) let / const / var
 * - var is function-scoped + hoisted, can re-declare.
 * - let & const are block-scoped, safer for modern JS.
 *
 * 2) Hoisting
 * - JS moves declarations to the top of scope before execution.
 * - Variables declared with let/const are hoisted but not initialized.
 *
 * 3) Execution Context & Call Stack
 * - JS code runs inside Execution Context (memory + code).
 * - Call Stack keeps track of function execution order.
 *
 * 4) this
 * - Refers to object calling the function.
 * - Arrow functions don’t have their own this (inherit from parent).
 *
 * 5) Closures
 * - Inner function remembers variables of outer function even after it finishes.
 * - Useful for private variables, caching, and event handlers.
 */
function outer() {
  let count = 0;
  return () => ++count;
}
const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
/**
 *
 * =============================
 * SECTION 2: ASYNC JS
 * =============================
 *
 * 1) Event Loop
 * - JS is single-threaded but async via event loop.
 * - Tasks go into callback queue and are processed after stack clears.
 *
 * 2) Promises
 * - Object representing future completion/failure of async task.
 * - Avoids "callback hell".
 *
 * 3) async/await
 * - Syntactic sugar over promises.
 * - Makes async code look synchronous.
 */
async function fetchData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  console.log(await res.json());
}
/**
 *
 * =============================
 * SECTION 3: BROWSER STUFF
 * =============================
 *
 * 1) Critical Rendering Path
 * - Process of turning HTML/CSS/JS into pixels on screen.
 * - DOM + CSSOM → Render Tree → Layout → Paint.
 *
 * 2) Script loading
 * - async = load/run ASAP, defer = load async but run after parsing.
 *
 * 3) Storage
 * - localStorage = permanent, sessionStorage = per-tab, cookies = sent to server.
 *
 * 4) Events
 * - DOMContentLoaded → HTML ready, load → everything ready.
 * - beforeunload/unload → triggered on leaving page.
 *
 * 5) Service Workers
 * - Background workers that cache files.
 * - Enables offline browsing & push notifications.
 *
 * 6) Shadow DOM
 * - Provides encapsulated styles + DOM for web components.
 * - Prevents style conflicts across components.
 *
 * =============================
 * SECTION 4: PERFORMANCE
 * =============================
 *
 * 1) Reflow & Repaint
 * - Reflow = recalculating layout. Repaint = visual update.
 * - Minimize by batching DOM changes.
 *
 * 2) requestAnimationFrame
 * - Optimized way to update animations.
 * - Runs before browser repaint at ~60fps.
 *
 * 3) window.performance
 * - API to measure loading/performance.
 * - Use performance.now(), performance.timing.
 *
 * =============================
 * SECTION 5: ADVANCED JS
 * =============================
 *
 * 1) Classes (ES6)
 * - Syntactic sugar over prototypes.
 * - Used for creating reusable objects.
 *
 * 2) extends & super
 * - extends → inheritance, super → call parent constructor/methods.
 *
 * 3) Static & Private fields
 * - static → shared across class, not per instance.
 * - private (#) → accessible only inside class.
 *
 * 4) JSON handling
 * - JSON.stringify() → object → string.
 * - JSON.parse() → string → object.
 *
 * 5) Error Handling
 * - try/catch/finally for handling errors.
 * - Can create custom error classes.
 *
 * 6) Pipe & Compose
 * - Combine multiple functions into one.
 * - Pipe = left-to-right, Compose = right-to-left.
 */
const double = (x) => x * 2;
const square = (x) => x * x;
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, fn) => fn(v), x);
console.log(pipe(double, square)(3)); // 36
/**
 *
 * 7) Memoization
 * - Cache function results for performance.
 * - Useful in expensive calculations.
 */
function memoize(fn) {
  const cache = {};
  return (x) => cache[x] ?? (cache[x] = fn(x));
}
const slowFn = (x) => x * x;
const fastFn = memoize(slowFn);
/**
 *
 * 8) Generators
 * - Functions that can pause (yield) and resume.
 * - Great for async flows & iterators.
 */
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}
for (let v of gen()) console.log(v);
/**
 *
 * 9) Parallel Tasks
 * - Run multiple promises together with Promise.all().
 *
 * 10) Web Workers
 * - Run JS in separate thread.
 * - Prevents UI freezing, avoids memory leaks.
 *
 * 11) Security Basics
 * - XSS → malicious scripts → fix: sanitize inputs.
 * - CSRF → fake requests → fix: tokens, same-site cookies.
 *
 * 12) Lazy Loading
 * - Load resources only when needed.
 * - Infinite scroll = load data on scroll event.
 *
 * =============================
 * SECTION 6: EXTRA TOPICS
 * =============================
 *
 * 1) Decorators
 * - Special syntax to add behavior to classes/methods (mainly in TS).
 *
 * 2) Reflect API
 * - Utility methods for object manipulation.
 *
 * 3) Symbols
 * - Unique values, often used as hidden object keys.
 *
 * 4) Proxy
 * - Intercept operations like get/set.
 *
 * 5) Optional chaining
 * - obj?.prop?.nested → avoids runtime errors.
 *
 * =============================
 * SECTION 7: SYSTEM DESIGN & OPTIMIZATION
 * =============================
 *
 * 1) Polyfills
 * - Code that mimics newer features for old browsers.
 * - Example: Lodash provides ready-made utilities.
 *
 * 2) Performance optimization
 * - Use caching, debounce, throttle, async code, batching DOM changes.
 *
 * 3) Code splitting & Tree shaking
 * - Split bundles into smaller parts.
 * - Remove unused (dead) code.
 *
 * 4) Event-driven architecture
 * - Uses events (publish/subscribe) instead of direct calls.
 *
 * 5) Memory management
 * - GC cleans unused memory, avoid leaks by unsubscribing events.
 *
 * 6) DevTools tips
 * - Use console.log, debugger, performance tab for profiling.
 *
 * 7) Lazy evaluation
 * - Compute only when needed → improves efficiency.
 *
 * 8) Loops & DOM optimization
 * - Use documentFragment, minimize reflows.
 *
 * 9) Bundlers (Webpack/Rollup/Vite)
 * - Tools for bundling + optimizing JS/CSS.
 *
 * 10) Design Patterns
 * - Singleton → one instance.
 * - Factory → object creator.
 * - Observer → notify multiple listeners.
 * - Module → encapsulation.
 *
 * =============================
 * QUICK Q&A
 * =============================
 * Q: localStorage vs sessionStorage vs cookies?
 * A: local = permanent, session = tab-based, cookies = sent to server.
 *
 * Q: async vs defer?
 * A: async loads independently, runs ASAP. defer waits until HTML parsed.
 *
 * Q: Observer pattern example?
 * A: Event listeners, Redux subscriptions.
 *
 * Q: How to prevent XSS?
 * A: Escape/sanitize inputs.
 *
 * Q: What is tree-shaking?
 * A: Removing unused code at build time.
 *
 * ============================================================
 */
