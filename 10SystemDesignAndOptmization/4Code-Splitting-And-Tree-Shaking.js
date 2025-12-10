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
