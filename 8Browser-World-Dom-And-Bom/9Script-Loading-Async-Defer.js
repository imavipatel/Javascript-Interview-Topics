// ============================================================================
// 9) Script Loading: async / defer — JS Notes (Easy & Practical)
// ============================================================================
//
// Problem:
// --------
// By default, <script> blocks the HTML parsing until the script is downloaded
// and executed. This slows down page loading.
//
// Solution: Use async or defer attributes to load JS without blocking HTML.
//
// ============================================================================
// 1) Default <script> behavior
// ============================================================================
// <script src="main.js"></script>
//
// Steps:
// 1. Browser parses HTML
// 2. Sees <script>
// 3. Stops HTML parsing
// 4. Downloads script
// 5. Executes script
// 6. Resumes HTML parsing
//
// ❌ Blocks rendering (bad for performance).
//
// ============================================================================
// 2) async
// ============================================================================
// <script src="main.js" async></script>
//
// - Script is downloaded *asynchronously* (in parallel with HTML parsing).
// - BUT executes immediately once downloaded, even if HTML parsing is not done.
// - Execution order is NOT guaranteed (fastest script runs first).
//
// ✅ Good for independent scripts (e.g., analytics, ads).
// ❌ Not good if scripts depend on each other or DOM.
//
// Example:
//
// <script src="analytics.js" async></script>
// <script src="ads.js" async></script>
//
// - whichever loads first runs first.
// - might break if order matters.
//
// ============================================================================
// 3) defer
// ============================================================================
// <script src="main.js" defer></script>
//
// - Script is downloaded in parallel (like async).
// - BUT execution waits until after HTML parsing is finished.
// - Execution order is preserved (top to bottom).
//
// ✅ Best for main app scripts that depend on DOM being ready.
// ✅ Guaranteed order.
// ❌ Doesn’t work in old IE (<9).
//
// Example:
//
// <script src="lib.js" defer></script>
// <script src="app.js" defer></script>
//
// - lib.js downloaded, app.js downloaded
// - Both wait until HTML parsed
// - lib.js runs first, then app.js
//
// ============================================================================
// 4) Summary Table
// ============================================================================
//
// Attribute   | Download        | Execute              | Order
// ------------|-----------------|----------------------|----------------
// (none)      | During parsing  | Immediately          | Preserved
// async       | Parallel        | Immediately on ready | Not preserved
// defer       | Parallel        | After parsing done   | Preserved
//
// ============================================================================
// 5) Interview Q&A
// ============================================================================
//
// Q1) What problem do async and defer solve?
// A1) They prevent scripts from blocking HTML parsing, making pages load faster.
//
// Q2) Difference between async and defer?
// A2) async executes as soon as script is ready (order not guaranteed),
//     defer waits until HTML is fully parsed (order preserved).
//
// Q3) When to use async?
// A3) For independent scripts (analytics, ads, tracking).
//
// Q4) When to use defer?
// A4) For main scripts that depend on DOM or execution order.
//
// Q5) Which executes first: DOMContentLoaded or defer scripts?
// A5) Defer scripts run before DOMContentLoaded event.
//
// ============================================================================
// 6) Quick Recap (Easy to Remember)
// ============================================================================
// - async: "Load fast, run immediately, order doesn’t matter"
// - defer: "Load fast, run later, order preserved"
//
// ============================================================================
// End of Notes
// ============================================================================
