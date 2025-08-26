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

// -----------------------------------------------------------------------------
// 6c) Lazy Evaluation & Caching Strategies
// -----------------------------------------------------------------------------

// Theory:
// Lazy evaluation → compute value only when needed
// Caching → store computed value to avoid repeated calculations

// Example: Lazy evaluation with getter
const lazyObj = {
  _value: null,
  get value() {
    if (!this._value) {
      console.log("Computing value...");
      this._value = 100 + 50;
    }
    return this._value;
  },
};

console.log(lazyObj.value); // Computing value... 150
console.log(lazyObj.value); // 150 (cached, no recomputation)

// Q&A:
// Q1) What is lazy evaluation?
// 👉 Compute a value only when needed.
// Q2) How does caching help performance?
// 👉 Prevents repeated expensive calculations.

// -----------------------------------------------------------------------------
// 6d) Optimizing Loops & DOM Manipulations
// -----------------------------------------------------------------------------

// Theory:
// - Minimize DOM access inside loops
// - Use DocumentFragment to batch DOM updates
// - Avoid nested loops when possible

// Example: Optimized DOM updates
const list = document.getElementById("list");
const fragment1 = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const li = document.createElement("li");
  li.textContent = `Item ${i}`;
  fragment1.appendChild(li);
}
list.appendChild(fragment1);

// Q&A:
// Q1) Why avoid frequent DOM access in loops?
// 👉 DOM manipulations are expensive; batching improves performance.
// Q2) What is DocumentFragment?
// 👉 An in-memory DOM node used to insert multiple elements at once.

// -----------------------------------------------------------------------------
// 6e) Webpack / Rollup / Vite Optimization Overview
// -----------------------------------------------------------------------------

// Theory:
// Modern bundlers optimize JS performance via:
// - Tree shaking → remove unused code
// - Code splitting → lazy load modules
// - Minification → reduce bundle size
// - Caching → long-term caching via hashes

// Example (Webpack dynamic import):
// const module = await import("./heavyModule.js"); // lazy load

// Q&A:
// Q1) What is tree shaking?
// 👉 Removing unused code from final bundle.
// Q2) What is code splitting?
// 👉 Breaking code into smaller chunks for on-demand loading.

// -----------------------------------------------------------------------------
// 6f) Design Patterns in JavaScript (Singleton, Factory, Observer, etc.)
// -----------------------------------------------------------------------------

// Singleton Pattern → only one instance
const Singleton = (function () {
  let instance;
  function init() {
    return { name: "Singleton Instance" };
  }
  return {
    getInstance: function () {
      if (!instance) instance = init();
      return instance;
    },
  };
})();
console.log(Singleton.getInstance());

// Factory Pattern → create objects with different types
function CarFactory(type) {
  if (type === "Tesla") return { brand: "Tesla", electric: true };
  if (type === "BMW") return { brand: "BMW", electric: false };
}
console.log(CarFactory("Tesla"));

// Observer Pattern → event subscription
class Subject {
  constructor() {
    this.observers = [];
  }
  subscribe(fn) {
    this.observers.push(fn);
  }
  notify(data) {
    this.observers.forEach((fn) => fn(data));
  }
}
const subject = new Subject();
subject.subscribe((data) => console.log("Observer 1:", data));
subject.notify("Event occurred!");

// Q&A:
// Q1) What is the Singleton pattern?
// 👉 Ensures only one instance of a class/object exists.
// Q2) What is the Observer pattern?
// 👉 Allows objects to subscribe and react to events or changes.
// Q3) What is the Factory pattern?
// 👉 A function/class that creates objects of different types without exposing constructor logic.
