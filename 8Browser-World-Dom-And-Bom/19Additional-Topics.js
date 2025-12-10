// ============================================================================
// 19) 🌐 Additional Browser Topics
// ============================================================================
//
// Topics:
// 1) Reflow & Repaint (layout performance)
// 2) CSSOM & Render Tree overview
// 3) window.performance API
// 4) requestAnimationFrame
// 5) Browser memory leaks & debugging
// ============================================================================

// ============================================================================
// 1) Reflow & Repaint (Layout Performance)
// ============================================================================
//
// 👉 Reflow = When the browser recalculates positions & sizes of elements.
// 👉 Repaint = When the browser redraws the pixels (color, background, etc.).
//
// ⚡ Example:
// - Change element width/height → causes Reflow + Repaint.
// - Change only color → causes Repaint.
//
// ============================================================================
// 📌 Example
let box1 = document.getElementById("box");
box1.style.width = "200px"; // Reflow + Repaint
box1.style.background = "red"; // Only Repaint
//
// ============================================================================
// Q&A
// Q1: What is Reflow? → Recalculating layout (positions & sizes).
// Q2: What is Repaint? → Redrawing pixels (color, style).
// Q3: Which is more expensive? → Reflow (slower, costly).
// Q4: How to reduce? → Use CSS classes instead of inline style, avoid frequent DOM changes.
// ============================================================================

// ============================================================================
// 2) CSSOM & Render Tree overview
// ============================================================================
//
// 👉 CSSOM = CSS Object Model (browser’s internal structure of CSS).
// 👉 Render Tree = Combination of DOM + CSSOM → used to paint the page.
//
// ⚡ Process:
// - HTML → DOM
// - CSS → CSSOM
// - DOM + CSSOM → Render Tree
// - Render Tree → Painting on screen
//
// ============================================================================
// 📌 Example
// HTML: <p>Hello</p>
// CSS: p { color: red }
//
// DOM → knows "p element exists"
// CSSOM → knows "p should be red"
// Render Tree → p element (red)
// ============================================================================
// Q&A
// Q1: What is CSSOM? → Internal representation of CSS.
// Q2: What is Render Tree? → DOM + CSSOM together.
// Q3: Why important? → Browser cannot paint until both DOM + CSSOM are ready.
// ============================================================================

// ============================================================================
// 3) window.performance API
// ============================================================================
//
// 👉 Used to measure website performance (loading time, resources).
//
// ============================================================================
// 📌 Example
console.log(window.performance.now());
// Time (in ms) since page started loading
//
// console.log(window.performance.timing);
// Gives detailed timings (DNS lookup, response, DOM load, etc.)
//
// ============================================================================
// Q&A
// Q1: What is performance.now()? → High-resolution timestamp in ms.
// Q2: What is performance.timing? → Detailed loading metrics.
// Q3: Why useful? → To measure speed and optimize websites.
// ============================================================================

// ============================================================================
// 4) requestAnimationFrame
// ============================================================================
//
// 👉 Special method for smooth animations.
// 👉 Tells browser: "Run this function before next repaint."
// 👉 Better than setInterval because it syncs with display refresh (60fps).
//
// ============================================================================
// 📌 Example
function animateBox() {
  let box = document.getElementById("box");
  let pos = 0;

  function move() {
    pos += 2;
    box.style.left = pos + "px";

    if (pos < 200) {
      requestAnimationFrame(move);
    }
  }
  requestAnimationFrame(move);
}
animateBox();
//
// ============================================================================
// Q&A
// Q1: Why use requestAnimationFrame? → Smooth, efficient animations.
// Q2: Difference vs setInterval? → requestAnimationFrame syncs with monitor refresh.
// Q3: When does it pause? → Automatically pauses if tab is inactive (saves CPU).
// ============================================================================

// ============================================================================
// 5) Browser Memory Leaks & Debugging
// ============================================================================
//
// 👉 Memory Leak = When memory is not released after use.
// 👉 Causes:
//   - Unremoved event listeners
//   - Global variables not cleared
//   - DOM elements kept in memory after removal
//
// ============================================================================
// 📌 Example
let btn = document.getElementById("btn");
function clickHandler() {
  console.log("clicked");
}
btn.addEventListener("click", clickHandler);

// ❌ Memory Leak if we never remove it when btn is removed
// ✅ Fix:
btn.removeEventListener("click", clickHandler);
//
// ============================================================================
// Q&A
// Q1: What is a memory leak? → Memory used but never released.
// Q2: Common causes? → Event listeners, global variables, unused DOM nodes.
// Q3: How to debug? → Chrome DevTools → Memory tab → check heap snapshots.
// ============================================================================
