// ============================================================================
// 📘 Bonus – System Design & Optimization Concepts
// ============================================================================
//
// Topics covered:
// 1) Polyfill grouping (e.g., Lodash)
// 2) Performance optimization in JS
// 3) Lazy Loading
// 4) Code splitting & tree shaking
// 5) Event-Driven Architecture Basics
// 6) Additional Topics
//    a) Memory management & profiling
//    b) Debugger / DevTools tips for JS
//    c) Lazy evaluation & caching strategies
//    d) Optimizing loops & DOM manipulations
//    e) Webpack / Rollup / Vite optimization overview
//    f) Design Patterns in JavaScript (Singleton, Factory, Observer, etc.)
//
// -----------------------------------------------------------------------------

// ============================================================================
// 1) Polyfill Grouping (e.g., Lodash)
// ============================================================================

// -----------------------------------------------------------------------------
// Theory
// -----------------------------------------------------------------------------
// - **Polyfills** are code snippets that add support for modern JavaScript
//   features in older browsers or environments that don’t natively support them.
// - **Grouping polyfills** means combining many utility functions together
//   in one library or module so you don’t have to write multiple small polyfills.
// - **Lodash** is a popular utility library that provides many polyfills and helpers
//   for arrays, objects, strings, functions, etc.

// Benefits:
// 1) Code reusability
// 2) Cross-browser compatibility
// 3) Cleaner and maintainable code

// -----------------------------------------------------------------------------
// Example 1: Polyfill for Array.prototype.flat
// -----------------------------------------------------------------------------
if (!Array.prototype.flat) {
  Array.prototype.flat = function (depth = 1) {
    return this.reduce((acc, val) => {
      return acc.concat(
        Array.isArray(val) && depth > 1 ? val.flat(depth - 1) : val
      );
    }, []);
  };
}

const arr = [1, [2, [3, 4]]];
console.log(arr.flat(2)); // [1, 2, 3, 4]

// -----------------------------------------------------------------------------
// Example 2: Lodash utility
// -----------------------------------------------------------------------------
/*
Lodash provides grouped utilities like:
- _.debounce(fn, delay)
- _.cloneDeep(obj)
- _.merge(obj1, obj2)
- _.isEqual(val1, val2)
*/

const _ = require("lodash"); // Node.js example

const logMessage = () => console.log("Event triggered!");
const debouncedLog = _.debounce(logMessage, 300);
debouncedLog(); // Will execute after 300ms if not called again

// -----------------------------------------------------------------------------
// Example 3: Custom utility grouping (mini Lodash-like)
// -----------------------------------------------------------------------------
const utils = {
  cloneDeep: (obj) => JSON.parse(JSON.stringify(obj)),
  isArray: (val) => Array.isArray(val),
  flatten: (arr) => arr.reduce((a, b) => a.concat(b), []),
};

const obj = { a: 1, b: { c: 2 } };
const clone = utils.cloneDeep(obj);
console.log(clone); // { a: 1, b: { c: 2 } }
console.log(utils.isArray([1, 2])); // true
console.log(utils.flatten([1, [2, 3]])); // [1,2,3]

// -----------------------------------------------------------------------------
// ❓ Q & A
// -----------------------------------------------------------------------------

// Q1) What is a polyfill?
// 👉 A polyfill is code that adds support for modern JS features in older browsers.

// Q2) Why group polyfills in a library like Lodash?
// 👉 To provide a single package of utility functions for arrays, objects, functions, etc., saving development time.

// Q3) Give an example of when you would need a polyfill.
// 👉 Example: Array.prototype.flat is not supported in older browsers, so we can polyfill it.

// Q4) How does Lodash improve code quality?
// 👉 Provides tested, reusable utility functions and handles edge cases, reducing bugs.

// Q5) Can you write your own small polyfill grouping?
// 👉 Yes, as shown in Example 3: creating an object with multiple utility functions like cloneDeep, flatten, etc.

// ============================================================================
// 2) Performance Optimization in JavaScript
// ============================================================================

// -----------------------------------------------------------------------------
// Theory
// -----------------------------------------------------------------------------
// JavaScript performance optimization is about making your code run faster
// and use fewer resources. This is crucial for large applications, animations,
// or heavy DOM manipulations.

// Common techniques:
// 1) Minimize DOM manipulation → batch updates instead of updating one element at a time
// 2) Debounce / throttle expensive operations (scroll, resize, input events)
// 3) Avoid blocking the main thread → move heavy calculations to Web Workers
// 4) Use requestAnimationFrame for smooth animations
// 5) Reduce memory leaks → clean up event listeners and DOM references
// 6) Use efficient algorithms → prefer O(n) over O(n^2) when possible

// -----------------------------------------------------------------------------
// Example 1: Batch DOM Updates
// -----------------------------------------------------------------------------
const container = document.getElementById("list");
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
  const li = document.createElement("li");
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}

container.appendChild(fragment); // Appending all at once → faster than 1000 appends

// -----------------------------------------------------------------------------
// Example 2: Debouncing an input
// -----------------------------------------------------------------------------
function expensiveSearch() {
  console.log("Search triggered!");
}

let debounceTimeout;
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", (e) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => expensiveSearch(), 300);
});

// -----------------------------------------------------------------------------
// Example 3: requestAnimationFrame for animations
// -----------------------------------------------------------------------------
const box = document.getElementById("box");
let position = 0;

function moveBox() {
  position += 2;
  box.style.left = position + "px";

  if (position < 500) {
    requestAnimationFrame(moveBox); // Optimized animation
  }
}

requestAnimationFrame(moveBox);

// -----------------------------------------------------------------------------
// Example 4: Avoid memory leaks
// -----------------------------------------------------------------------------
const btn = document.getElementById("btn");
function handleClick() {
  console.log("Button clicked");
}
btn.addEventListener("click", handleClick);

// Later, if the button is removed, detach the listener:
btn.removeEventListener("click", handleClick);

// -----------------------------------------------------------------------------
// ❓ Q & A
// -----------------------------------------------------------------------------

// Q1) What is DOM batching and why is it important?
// 👉 DOM batching combines multiple DOM changes into one operation to reduce reflows/repaints and improve performance.

// Q2) What is the difference between debounce and throttle?
// 👉 Debounce: waits for a pause in events before executing a function (e.g., search input).
// 👉 Throttle: executes a function at regular intervals (e.g., scroll events).

// Q3) Why use requestAnimationFrame instead of setTimeout for animations?
// 👉 requestAnimationFrame syncs with the browser’s refresh rate for smoother animations and better performance.

// Q4) How can memory leaks affect performance?
// 👉 Memory leaks keep references alive unnecessarily, leading to higher memory usage and slower execution.

// Q5) Name some other optimization techniques in JS.
// 👉 Efficient algorithms, lazy loading, Web Workers, caching data, minimizing reflows/repaints, tree shaking in build tools.

// ============================================================================
// 3) Lazy Loading
// ============================================================================

// -----------------------------------------------------------------------------
// Theory
// -----------------------------------------------------------------------------
// Lazy Loading is a technique where you load resources (images, scripts, modules)
// only when they are needed, instead of loading everything upfront.
// This improves performance, reduces initial page load time, and saves bandwidth.

// Common use-cases:
// 1) Images on a long webpage → load only when they are visible in viewport
// 2) Modules in a web app → import only when needed
// 3) Components in frameworks like React/Vue → dynamic imports

// -----------------------------------------------------------------------------
// Example 1: Lazy loading images using IntersectionObserver
// -----------------------------------------------------------------------------
const images = document.querySelectorAll("img[data-src]");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src; // load actual image
        observer.unobserve(img); // stop observing after loading
      }
    });
  },
  { threshold: 0.1 }
);

images.forEach((img) => observer.observe(img));

// HTML example:
// <img data-src="large-image.jpg" src="placeholder.jpg" alt="Lazy Image">

// -----------------------------------------------------------------------------
// Example 2: Lazy loading JS modules dynamically
// -----------------------------------------------------------------------------
document.getElementById("loadBtn").addEventListener("click", async () => {
  const module = await import("./mathModule.js");
  console.log(module.add(5, 10)); // only loaded when button clicked
});

// -----------------------------------------------------------------------------
// Benefits of Lazy Loading
// -----------------------------------------------------------------------------
// - Faster initial page load
// - Reduced bandwidth usage
// - Improved user experience
// - Helps with SEO for critical content

// -----------------------------------------------------------------------------
// ❓ Q & A
// -----------------------------------------------------------------------------

// Q1) What is lazy loading?
// 👉 Lazy loading is a technique to defer loading of resources until they are needed.

// Q2) How does IntersectionObserver help in lazy loading images?
// 👉 It monitors when an element enters the viewport and triggers the loading only then.

// Q3) Why is lazy loading important for performance?
// 👉 It reduces initial load time, saves bandwidth, and improves responsiveness of the page.

// Q4) Can lazy loading be applied to JavaScript modules?
// 👉 Yes, dynamic imports allow modules to be loaded only when required.

// Q5) Difference between eager loading and lazy loading?
// 👉 Eager loading → loads all resources upfront, Lazy loading → loads resources on-demand.

// ============================================================================
// 4) Code Splitting & Tree Shaking
// ============================================================================

// -----------------------------------------------------------------------------
// Theory
// -----------------------------------------------------------------------------
// Code Splitting:
// - Break your JavaScript into smaller chunks (modules) instead of one big bundle.
// - Helps to load only the code needed for the current page or feature.
// - Commonly used with modern bundlers: Webpack, Rollup, Vite.
// - Reduces initial page load time and improves performance.

// Tree Shaking:
// - Removes unused (dead) code from your final bundle.
// - Works with ES6 module syntax (import/export).
// - Reduces bundle size and improves loading speed.

// -----------------------------------------------------------------------------
// Example 1: Code Splitting with dynamic imports
// -----------------------------------------------------------------------------
document.getElementById("loadFeature").addEventListener("click", async () => {
  // Module loaded only when button clicked
  const module = await import("./featureModule.js");
  module.showFeature();
});

// -----------------------------------------------------------------------------
// Example 2: Tree Shaking with ES6 modules
// -----------------------------------------------------------------------------

// utils.js
export function usedFunction() {
  console.log("I am used!");
}
export function unusedFunction() {
  console.log("I am not used!");
}

// main.js
import { usedFunction } from "./utils.js";
usedFunction();
// The bundler will remove unusedFunction from final bundle during build

// -----------------------------------------------------------------------------
// Benefits
// -----------------------------------------------------------------------------
// - Faster initial load
// - Smaller bundle size
// - Better performance for large applications
// - Optimized user experience

// -----------------------------------------------------------------------------
// ❓ Q & A
// -----------------------------------------------------------------------------

// Q1) What is code splitting?
// 👉 Breaking code into smaller chunks/modules so only required code is loaded.

// Q2) How is code splitting achieved?
// 👉 Using dynamic imports (import()) or splitting routes/components in frameworks.

// Q3) What is tree shaking?
// 👉 Removing unused code from the final bundle during the build process.

// Q4) What type of module system is required for tree shaking?
// 👉 ES6 modules (import/export) – CommonJS doesn’t support tree shaking fully.

// Q5) Why are code splitting and tree shaking important for web apps?
// 👉 They improve performance, reduce bundle size, and make apps faster to load and run.

// ============================================================================
// 5) Event-Driven Architecture Basics
// ============================================================================

// -----------------------------------------------------------------------------
// Theory
// -----------------------------------------------------------------------------
// Event-Driven Architecture (EDA) is a programming paradigm where the flow
// of the program is determined by events such as user actions, messages, or
// system signals.

// Key concepts:
// 1) Event: an occurrence like click, input, or data received
// 2) Event emitter: a component that triggers events
// 3) Event listener: a function that responds to an event
// 4) Decoupling: producers and consumers of events are loosely coupled

// Benefits:
// - Improves modularity
// - Makes systems reactive and scalable
// - Useful in front-end (DOM events) and back-end (Node.js EventEmitter)

// -----------------------------------------------------------------------------
// Example 1: Basic Event Emitter in Node.js
// -----------------------------------------------------------------------------
const EventEmitter = require("events");
const emitter = new EventEmitter();

// Create a listener
emitter.on("orderPlaced", (orderId) => {
  console.log(`Order received: ${orderId}`);
});

// Trigger the event
emitter.emit("orderPlaced", 101);
// Output: Order received: 101

// -----------------------------------------------------------------------------
// Example 2: Event-Driven in Browser (DOM events)
// -----------------------------------------------------------------------------
const btn1 = document.getElementById("buyBtn");

btn1.addEventListener("click", () => {
  console.log("Buy button clicked!");
});

// Clicking the button triggers the event listener function

// -----------------------------------------------------------------------------
// Benefits of Event-Driven Architecture
// -----------------------------------------------------------------------------
// - Asynchronous handling → improves performance
// - Decouples components → easier maintenance
// - Scalable design → suitable for microservices and large apps
// - Reactive programming → responds to changes/events dynamically

// -----------------------------------------------------------------------------
// ❓ Q & A
// -----------------------------------------------------------------------------

// Q1) What is Event-Driven Architecture?
// 👉 A design pattern where events control program flow, and components react to events asynchronously.

// Q2) What is the difference between an event emitter and listener?
// 👉 Emitter triggers events; listener responds to those events.

// Q3) Why is EDA useful in JavaScript?
// 👉 JS is single-threaded; EDA allows async, non-blocking operations like user input, API calls, and real-time updates.

// Q4) Can Event-Driven Architecture be used on the backend?
// 👉 Yes, Node.js uses EventEmitter to handle async events, e.g., file I/O, network requests.

// Q5) Give a real-life example of EDA.
// 👉 Online shopping: placing an order triggers events like payment processing, inventory update, and shipping notification.

// ============================================================================
// 6) Additional Advanced Topics
// ============================================================================

// -----------------------------------------------------------------------------
// 6a) Memory Management & Profiling
// -----------------------------------------------------------------------------

// Theory:
// JavaScript automatically manages memory via garbage collection.
// But developers must avoid memory leaks to keep apps performant.
// Memory leaks occur when objects are no longer needed but are still referenced.

// Example: Avoiding memory leaks with DOM elements
let container1 = document.getElementById("container");
function createDiv() {
  const div = document.createElement("div");
  container1.appendChild(div);
  // Remove after some time to free memory
  setTimeout(() => container1.removeChild(div), 5000);
}
createDiv();

// Profiling in DevTools:
// - Open Chrome DevTools → Memory tab
// - Take heap snapshots to find memory leaks
// - Use allocation instrumentation to track object creation

// Q&A:
// Q1) What causes memory leaks in JS?
// 👉 Unused references, closures keeping memory alive, detached DOM nodes.
// Q2) How can you detect memory leaks?
// 👉 Using browser DevTools Memory profiling and heap snapshots.

// -----------------------------------------------------------------------------
// 6b) Debugger / DevTools tips for JS
// -----------------------------------------------------------------------------

// Theory:
// Modern browsers provide DevTools to debug JS, optimize performance, and inspect DOM.

// Tips:
// - Use `debugger;` statement to pause execution
// - Console methods: console.log, console.table, console.time, console.timeEnd
// - Breakpoints: conditional, DOM changes, XHR/fetch
// - Network tab: monitor API calls
// - Performance tab: measure paint, layout, scripting times

// Example:
function add(a, b) {
  debugger; // pause here during DevTools inspection
  return a + b;
}
add(5, 10);

// Q&A:
// Q1) How do you pause JS execution for debugging?
// 👉 Use `debugger;` or DevTools breakpoints.
// Q2) How to measure function execution time?
// 👉 console.time("label"); func(); console.timeEnd("label");

/**
 * =========================================================
 * 6c) 📘 JavaScript Notes – Lazy Evaluation & Caching Strategies
 * =========================================================
 *
 * 🟢 THEORY
 * --------------------------------------------
 * 1) Lazy Evaluation:
 *    - "Lazy" means: do not compute something until it is
 *      actually needed.
 *    - This helps save performance and memory.
 *    - Example: In mathematics, we don’t calculate a number
 *      unless the result is required.
 *    - In JavaScript, we can delay function calls, API fetches,
 *      or image loading until the moment they are needed.
 *
 * 2) Caching:
 *    - "Cache" means: store a result for future reuse.
 *    - Example: If we already calculated 2+3 once, next time
 *      we can just use the stored result instead of recalculating.
 *    - Caching avoids repeating expensive work (like fetching
 *      API data, complex math operations, etc.).
 *
 * 3) Memoization:
 *    - Special type of caching where we remember the result of
 *      a function for given inputs.
 *    - If the function is called again with the same inputs,
 *      we return the cached result instead of re-running it.
 *
 * --------------------------------------------
 * ✅ Benefits of Lazy + Caching:
 * - Faster performance
 * - Saves CPU time and network calls
 * - Improves User Experience (less lag)
 * - Useful in real-world apps:
 *   → API caching, image lazy loading, infinite scroll
 *
 * =========================================================
 */

//
// 🔹 Example 1: Lazy Evaluation (calculate only when needed)
//
function lazySquare() {
  let cache = {};
  return function (n) {
    if (cache[n]) {
      console.log("Fetching from cache...");
      return cache[n];
    }
    console.log("Calculating...");
    cache[n] = n * n;
    return cache[n];
  };
}

const square = lazySquare();
console.log(square(5)); // "Calculating..." → 25
console.log(square(5)); // "Fetching from cache..." → 25

//
// 🔹 Example 2: Memoization (store function results)
//
function memoizedAdd() {
  let cache = {};
  return function (a, b) {
    let key = `${a},${b}`;
    if (cache[key]) {
      console.log("From cache...");
      return cache[key];
    }
    console.log("Calculating...");
    cache[key] = a + b;
    return cache[key];
  };
}

const add = memoizedAdd();
console.log(add(2, 3)); // "Calculating..." → 5
console.log(add(2, 3)); // "From cache..." → 5

//
// 🔹 Example 3: API Response Caching
//
let apiCache = {};

async function fetchUser(id) {
  if (apiCache[id]) {
    console.log("From cache...");
    return apiCache[id];
  }

  console.log("Fetching from API...");
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = await res.json();
  apiCache[id] = data; // store in cache
  return data;
}

// Usage:
// fetchUser(1).then(console.log);
// fetchUser(1).then(console.log); // second time → cache

//
// 🔹 Example 4: Lazy Loading + Caching (Images)
//
function lazyLoadImage(src) {
  const img = new Image();
  img.src = src; // Loads only when assigned
  document.body.appendChild(img);
}

// Usage:
// lazyLoadImage("large-image.jpg");

/**
 * =========================================================
 * ❓ Q&A for Interviews
 * =========================================================
 *
 * Q1: What is lazy evaluation?
 *    → It means delaying the execution of a task until its
 *      result is actually required.
 *
 * Q2: What is caching?
 *    → It is storing results/data so that repeated requests
 *      can be served faster.
 *
 * Q3: What is memoization?
 *    → A form of caching applied to functions: remember inputs
 *      and their results to avoid recomputation.
 *
 * Q4: What are real-world examples?
 *    → API caching, Fibonacci calculation, image lazy loading,
 *      infinite scroll in social media apps.
 *
 * Q5: Difference between caching and lazy loading?
 *    → Caching = store results for reuse.
 *      Lazy Loading = load/compute only when needed.
 *
 * =========================================================
 */

/**
 * =========================================================
 * 📘 JavaScript Notes – Optimizing Loops & DOM Manipulations
 * =========================================================
 *
 * 🟢 THEORY
 * --------------------------------------------
 * 🔹 Why Optimization is Needed?
 * - Loops and DOM manipulations are two of the most expensive
 *   operations in JavaScript.
 * - Inefficient code can cause slow performance, laggy UI,
 *   and high memory usage.
 *
 * --------------------------------------------
 * 🔹 Optimizing Loops
 * 1) Minimize work inside loops
 *    - Avoid putting heavy calculations, DOM queries,
 *      or function calls directly inside loops.
 *    - Example: Instead of querying `array.length` every time,
 *      store it in a variable.
 *
 * 2) Choose the right loop
 *    - `for` loops are faster than `forEach` in most cases,
 *      but `forEach`/`map` are more readable.
 *    - Optimize only when performance is critical.
 *
 * 3) Break early
 *    - If you find what you need, stop the loop using `break`
 *      to save time.
 *
 * 4) Batch expensive work
 *    - Instead of running 1000 iterations at once,
 *      process them in chunks using `setTimeout` or
 *      `requestIdleCallback` to avoid blocking UI.
 *
 * --------------------------------------------
 * 🔹 Optimizing DOM Manipulations
 * 1) Minimize reflows/repaints
 *    - Each DOM change (adding elements, changing style)
 *      can cause re-render.
 *    - Batch changes together instead of making them one by one.
 *
 * 2) Use DocumentFragment
 *    - Create elements in memory first, then attach once to DOM.
 *
 * 3) Avoid forced synchronous layout
 *    - Accessing `offsetHeight`, `clientWidth`, etc. right after
 *      DOM changes forces the browser to recalculate layout.
 *    - Try to read DOM values first, then write changes.
 *
 * 4) Virtual DOM / Frameworks
 *    - React, Vue, Angular use Virtual DOM to minimize costly
 *      direct DOM manipulations.
 *
 * --------------------------------------------
 * ✅ Summary
 * - Loops → Minimize work inside, break early, batch processing
 * - DOM → Minimize reflows, use DocumentFragment, avoid repeated queries
 *
 * =========================================================
 */

//
// 🔹 Example 1: Optimized Loop
//
let arr1 = [1, 2, 3, 4, 5];

// ❌ Bad: Access length every iteration
for (let i = 0; i < arr1.length; i++) {
  console.log(arr1[i]);
}

// ✅ Good: Store length in variable
for (let i = 0, len = arr1.length; i < len; i++) {
  console.log(arr1[i]);
}

//
// 🔹 Example 2: Break Early
//
function findNumber(arr, target) {
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] === target) {
      return `Found ${target} at index ${i}`;
    }
  }
  return "Not found";
}

console.log(findNumber([1, 2, 3, 4, 5], 3));

//
// 🔹 Example 3: DOM Manipulation (Inefficient)
//
function addItemsBad() {
  for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    document.body.appendChild(div); // Each append → reflow/repaint
  }
}

//
// 🔹 Example 4: DOM Manipulation (Efficient with DocumentFragment)
//
function addItemsGood() {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div); // Work in memory
  }
  document.body.appendChild(fragment); // Single reflow/repaint
}

//
// 🔹 Example 5: Batch Loop with setTimeout (avoid blocking UI)
//
function processLargeArray(arr) {
  let i = 0;
  function processChunk() {
    let count = 0;
    while (i < arr.length && count < 100) {
      console.log("Processing:", arr[i]);
      i++;
      count++;
    }
    if (i < arr.length) {
      setTimeout(processChunk, 0); // Yield to UI
    }
  }
  processChunk();
}

processLargeArray(new Array(1000).fill("data"));

/**
 * =========================================================
 * ❓ Q&A for Interviews
 * =========================================================
 *
 * Q1: Why are loops expensive?
 *    → Because they repeat operations many times, and if each
 *      iteration has heavy work (like DOM calls), performance drops.
 *
 * Q2: Why is DOM manipulation expensive?
 *    → Each change can cause reflow (layout recalculation) and
 *      repaint (redrawing UI), which are CPU-heavy operations.
 *
 * Q3: How do you optimize DOM updates?
 *    → Batch updates with DocumentFragment, minimize style changes,
 *      and avoid forced synchronous layout.
 *
 * Q4: Difference between reflow and repaint?
 *    → Reflow = recalculating element positions/sizes.
 *      Repaint = applying visual changes (like color).
 *      Reflow is more expensive than repaint.
 *
 * Q5: Real-world example of optimization?
 *    → Adding 1000 items to a list:
 *       ❌ Append one by one → 1000 reflows
 *       ✅ Use DocumentFragment → 1 reflow
 *
 * =========================================================
 */

/**
 * ==============================================================
 * 📘 JavaScript Notes – Webpack / Rollup / Vite Optimization
 * ==============================================================
 *
 * 🟢 THEORY
 * --------------------------------------------------------------
 * 🔹 Why Build Tools?
 * - Modern apps have many JS, CSS, images, and dependencies.
 * - Build tools help us:
 *    ✅ Bundle (combine files into fewer ones)
 *    ✅ Optimize (minify, tree-shake, compress)
 *    ✅ Improve performance (code splitting, caching)
 *
 * --------------------------------------------------------------
 * 🔹 Webpack
 * - A very powerful and flexible bundler.
 * - Works with plugins + loaders for handling CSS, images, TS, etc.
 * - Great for large, complex apps.
 * - Supports:
 *    * Code Splitting (dynamic imports)
 *    * Tree Shaking (remove unused code)
 *    * Hot Module Replacement (HMR)
 *    * Asset optimization
 * - Downside: More config-heavy, slower than newer tools.
 *
 * --------------------------------------------------------------
 * 🔹 Rollup
 * - A bundler focused on libraries/packages.
 * - Produces smaller, clean bundles with ES Modules.
 * - Best for publishing JS libraries (React components, utils, etc.)
 * - Supports tree shaking better than Webpack.
 * - Downsides: Not as feature-rich for apps (needs plugins for CSS, etc.)
 *
 * --------------------------------------------------------------
 * 🔹 Vite
 * - A modern build tool built on top of Rollup + ESBuild.
 * - Features:
 *    * Dev server with near-instant startup (uses native ES Modules)
 *    * Fast HMR (Hot Module Replacement)
 *    * Uses Rollup internally for production build
 *    * Best for modern front-end frameworks (React, Vue, Svelte)
 * - Optimized for **developer experience** + **performance**
 *
 * --------------------------------------------------------------
 * 🔹 When to use what?
 * - Webpack → Large, enterprise-level apps needing full control.
 * - Rollup → Libraries / NPM packages where bundle size matters.
 * - Vite    → Modern apps (React/Vue/Svelte) for fast dev + optimized prod.
 *
 * --------------------------------------------------------------
 * 🔹 Key Optimizations
 * 1) Tree Shaking → Remove unused code (works best with ES Modules).
 * 2) Code Splitting → Load only needed chunks (lazy loading).
 * 3) Minification → Remove whitespace, shorten variable names.
 * 4) Caching → Use hashed filenames (`bundle.[hash].js`).
 * 5) Image/Asset optimization → Compress images, inline small assets.
 *
 * ==============================================================
 */

//
// 🔹 Example 1: Webpack Code Splitting (dynamic import)
//
/**
 * Webpack automatically splits code when using `import()`
 */
function loadModule() {
  import("./math.js").then((module) => {
    console.log("Sum:", module.add(2, 3));
  });
}
loadModule();

//
// 🔹 Example 2: Rollup Config (rollup.config.js)
//
/**
 * export default {
 *   input: "src/index.js",
 *   output: {
 *     file: "dist/bundle.js",
 *     format: "esm", // ES module
 *   },
 *   plugins: [
 *     terser() // Minify output
 *   ]
 * };
 */

//
// 🔹 Example 3: Vite Lazy Loading (React)
//
/**
 * import React, { Suspense } from "react";
 * const LazyComponent = React.lazy(() => import("./BigComponent"));
 *
 * function App() {
 *   return (
 *     <Suspense fallback={<div>Loading...</div>}>
 *       <LazyComponent />
 *     </Suspense>
 *   );
 * }
 */

//
// 🔹 Example 4: Tree Shaking (works with Rollup / Webpack / Vite)
//
/**
 * math.js
 * export function add(a, b) { return a + b; }
 * export function multiply(a, b) { return a * b; }
 *
 * main.js
 * import { add } from "./math.js"; // ✅ Only add() included in bundle
 * console.log(add(2, 3));
 */

/**
 * ==============================================================
 * ❓ Q&A for Interviews
 * ==============================================================
 *
 * Q1: What is the difference between Webpack, Rollup, and Vite?
 *    → Webpack = flexible, config-heavy, great for apps.
 *      Rollup  = best for libraries (small, clean output).
 *      Vite    = fastest dev experience, modern framework support.
 *
 * Q2: What is Tree Shaking?
 *    → A process of removing unused code from final bundle.
 *      Works best with ES Module (`import/export`) syntax.
 *
 * Q3: What is Code Splitting?
 *    → Splitting bundle into smaller chunks that load on demand
 *      (e.g., lazy loading a route in React).
 *
 * Q4: Why is Vite faster than Webpack?
 *    → Uses native ES Modules in dev (no bundling), and ESBuild
 *      for pre-bundling (written in Go, much faster).
 *
 * Q5: When should you use Rollup instead of Webpack?
 *    → When building a **JavaScript library** for npm where bundle
 *      size and clean ES module output matters more than dev server.
 *
 * Q6: Real-world optimization examples?
 *    - Webpack: Split vendor + app bundles for caching.
 *    - Rollup: Tree shake utils library to reduce bundle size.
 *    - Vite: Lazy load big components to improve load time.
 *
 * ==============================================================
 */

/**
 * ==============================================================
 * 📘 JavaScript Notes – Design Patterns (Singleton, Factory, Observer, etc.)
 * ==============================================================
 *
 * 🟢 THEORY
 * --------------------------------------------------------------
 * 🔹 What are Design Patterns?
 * - They are **reusable solutions** to common software problems.
 * - They help write **clean, maintainable, and scalable** code.
 *
 * --------------------------------------------------------------
 * 🔹 Common JS Design Patterns
 *
 * 1) Singleton Pattern
 * - Ensures only **one instance** of a class/object exists.
 * - Useful for global configurations, databases, logging, etc.
 *
 * 2) Factory Pattern
 * - Provides a way to create objects **without exposing** the
 *   creation logic to the client.
 * - Useful when creating many similar objects with slight differences.
 *
 * 3) Observer Pattern
 * - One object (subject) maintains a list of dependents (observers).
 * - When the subject changes → all observers are **notified**.
 * - Used in event systems, Redux, UI frameworks, etc.
 *
 * 4) Module Pattern
 * - Encapsulates code into reusable, self-contained modules.
 * - Helps avoid polluting the global namespace.
 *
 * 5) Prototype Pattern
 * - Objects inherit from other objects.
 * - JS natively supports this via `Object.create` and prototypes.
 *
 * --------------------------------------------------------------
 * 🔹 Why use Patterns?
 * - Avoid reinventing the wheel.
 * - Improves team collaboration (common language).
 * - Makes code extensible and easier to maintain.
 *
 * ==============================================================
 */

//
// 🔹 Example 1: Singleton Pattern
//
/**
 * Only one instance of `Database` will ever exist.
 */
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance; // Return existing instance
    }
    this.data = [];
    Database.instance = this;
  }

  add(item) {
    this.data.push(item);
  }

  getAll() {
    return this.data;
  }
}

const db1 = new Database();
const db2 = new Database();
db1.add("User1");

console.log(db1.getAll()); // ["User1"]
console.log(db1 === db2); // true ✅ Only one instance

//
// 🔹 Example 2: Factory Pattern
//
/**
 * Factory creates different types of users.
 */
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}

class UserFactory {
  createUser(name, role) {
    return new User(name, role);
  }
}

const factory = new UserFactory();
const admin = factory.createUser("Alice", "Admin");
const guest = factory.createUser("Bob", "Guest");

console.log(admin, guest);

//
// 🔹 Example 3: Observer Pattern
//
/**
 * Subject notifies observers when state changes.
 */
class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(data) {
    console.log(`${this.name} received update: ${data}`);
  }
}

const subject = new Subject();
const obs1 = new Observer("Observer1");
const obs2 = new Observer("Observer2");

subject.subscribe(obs1);
subject.subscribe(obs2);

subject.notify("New Data Available");
// Observer1 received update: New Data Available
// Observer2 received update: New Data Available

//
// 🔹 Example 4: Module Pattern
//
/**
 * Encapsulates private and public methods.
 */
const CounterModule = (function () {
  let count = 0; // private variable

  function increment() {
    count++;
    console.log("Count:", count);
  }

  function reset() {
    count = 0;
    console.log("Counter reset.");
  }

  return {
    increment,
    reset,
  };
})();

CounterModule.increment(); // Count: 1
CounterModule.increment(); // Count: 2
CounterModule.reset(); // Counter reset.

//
// 🔹 Example 5: Prototype Pattern
//
/**
 * Objects inherit properties from prototypes.
 */
const vehicle = {
  drive() {
    console.log("Driving...");
  },
};

const car = Object.create(vehicle);
car.wheels = 4;

car.drive(); // Driving...
console.log(car.wheels); // 4

/**
 * ==============================================================
 * ❓ Q&A for Interviews
 * ==============================================================
 *
 * Q1: What is the Singleton Pattern? Give example.
 *    → Ensures only one instance of a class exists.
 *      Example: Database connection manager.
 *
 * Q2: Difference between Factory and Constructor?
 *    → Factory = handles object creation logic (flexible, hides details).
 *      Constructor = directly creates objects with `new`.
 *
 * Q3: What is the Observer Pattern?
 *    → Subject maintains observers and notifies them when data changes.
 *      Example: Event listeners in JS, Redux store subscriptions.
 *
 * Q4: What is the Module Pattern?
 *    → Encapsulation of private/public methods using IIFE.
 *
 * Q5: Where do we use the Prototype Pattern?
 *    → To achieve inheritance in JavaScript using `Object.create`.
 *
 * Q6: Real-world usage of these patterns?
 *    - Singleton → Config, logging, DB connection.
 *    - Factory   → UI elements (buttons, modals).
 *    - Observer  → Event systems, Redux, WebSockets.
 *    - Module    → Utilities, reusable helpers.
 *    - Prototype → Reusing methods across objects.
 *
 * ==============================================================
 */
