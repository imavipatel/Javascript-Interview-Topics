// ============================================================================
// 8) Critical Rendering Path (CRP) — JS Notes (Easy & Practical)
// ============================================================================
//
// What is CRP?
// ------------
// Critical Rendering Path is the sequence of steps the browser takes to
// convert HTML, CSS, and JavaScript into *pixels on the screen*.
//
// Basically: "How does your code become a web page that you can see and use?"
//
// Why Important?
// --------------
// - Faster CRP = faster loading pages.
// - Understanding CRP helps you optimize performance (reduce blocking scripts,
//   minimize CSS/JS, lazy load images, etc.).
//
// ============================================================================
// 1) Steps in the Critical Rendering Path
// ============================================================================
//
// 🛠 Step 1: Parse HTML → DOM
// - Browser reads HTML and builds the Document Object Model (DOM).
// - Example: <p>Hello</p> becomes a DOM node.
//
// 🛠 Step 2: Parse CSS → CSSOM
// - Browser downloads CSS, parses it into a tree structure (CSSOM).
// - Example: p { color: red } applies to <p> node.
//
// 🛠 Step 3: Combine DOM + CSSOM → Render Tree
// - Browser merges DOM and CSSOM to know what each node looks like.
// - Example: <p>Hello</p> styled with red → "Render Tree node: red text 'Hello'".
//
// 🛠 Step 4: Layout (Reflow)
// - Browser calculates positions and sizes of elements (the geometry).
//
// 🛠 Step 5: Paint (Rasterization)
// - Browser paints pixels on the screen (colors, borders, text, etc.).
//
// 🛠 Step 6: Composite
// - Layers (like z-index, transforms) are combined and shown to the user.
//
// ============================================================================
// 2) Example Flow
// ============================================================================
//
// HTML:
// <html>
//   <head>
//     <style>
//       p { color: blue; }
//     </style>
//   </head>
//   <body>
//     <p>Hello World</p>
//   </body>
// </html>
//
// CRP steps:
// - HTML parsed → DOM: <p>Hello World</p>
// - CSS parsed → CSSOM: p { color: blue }
// - DOM + CSSOM → Render Tree
// - Layout: p positioned at (x, y) with width/height
// - Paint: text "Hello World" painted in blue
//
// ============================================================================
// 3) Render-blocking resources
// ============================================================================
// Some resources stop CRP until they’re ready:
// - CSS: page can’t render until CSSOM is built.
// - JS (without async/defer): can block DOM parsing.
// => Solution: use <script defer>, <script async>, minify, preload.
//
// ============================================================================
// 4) Optimizations (CRP Performance Tips)
// ============================================================================
// - Minimize critical resources (inline small CSS, defer JS).
// - Reduce size of CSS/JS (minify, compress).
// - Async/defer scripts to avoid blocking DOM.
// - Lazy load images & non-critical assets.
// - Use critical CSS (only load above-the-fold styles first).
//
// ============================================================================
// 5) Visual Diagram (Text Version)
// ============================================================================
// HTML -----> DOM
// CSS ------> CSSOM
// DOM + CSSOM -----> Render Tree
// Render Tree -----> Layout -----> Paint -----> Screen
//
// ============================================================================
// 6) Interview Q&A
// ============================================================================
//
// Q1) What is the Critical Rendering Path?
// A1) The sequence of steps browser takes to render pixels on the screen:
//      HTML → DOM → CSSOM → Render Tree → Layout → Paint → Composite.
//
// Q2) Why is CSS render-blocking?
// A2) Because without CSS, the browser doesn’t know how elements should look,
//      so it waits for CSSOM before painting.
//
// Q3) How to make JavaScript non-blocking?
// A3) Use "async" or "defer" attributes when loading scripts.
//
// Q4) Difference between DOM and Render Tree?
// A4) DOM = structure of the page; Render Tree = DOM + CSSOM with visible nodes only.
//
// Q5) How to optimize CRP for faster page load?
// A5) Reduce blocking resources, use critical CSS, defer JS, lazy load images.
//
// ============================================================================
// 7) Quick Recap (Easy to Remember)
// ============================================================================
// CRP steps:
//   1. HTML → DOM
//   2. CSS → CSSOM
//   3. DOM + CSSOM → Render Tree
//   4. Layout (positions/sizes)
//   5. Paint (pixels on screen)
//   6. Composite (final display)
//
// Performance tips:
//   - Defer/async JS
//   - Minimize CSS/JS
//   - Use critical CSS
//   - Lazy load non-critical assets
//
// ============================================================================
// End of CRP Notes
// ============================================================================
