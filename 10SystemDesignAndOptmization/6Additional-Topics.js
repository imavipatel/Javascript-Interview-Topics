// ============================================================================
// 6) Additional Advanced Topics
//    a) Memory management & profiling
//    b) Debugger / DevTools tips for JS
//    c) Lazy evaluation & caching strategies
//    d) Optimizing loops & DOM manipulations
//    e) Webpack / Rollup / Vite optimization overview
//    f) Design Patterns in JavaScript (Singleton, Factory, Observer, etc.)
//
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
