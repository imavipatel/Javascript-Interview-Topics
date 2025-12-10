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
