// ---------------------------------------------------------------
// 7) Shortest JS Program & window
// ---------------------------------------------------------------
//
// ---------------------------------------------------------------
// Part 1: Shortest JavaScript Program
// ---------------------------------------------------------------
// 👉 The shortest valid JavaScript program is just an **empty file**.
// Why? Because JavaScript allows an empty source file as valid code.
//
// Example:
// (Imagine an empty file `empty.js`) → This is a valid JS program!
// It doesn’t do anything, but it's still valid.
//
// 👉 Another shortest possible statement is just a semicolon `;`.
// Semicolon by itself means "an empty statement".
//
// Example:
// ---------------------------------------------------------------
// Part 2: Global Object
// ---------------------------------------------------------------
// 👉 In JavaScript, when code runs, a **global execution context** is created.
// 👉 The "global object" is automatically available everywhere.
// 👉 Its name differs depending on the environment:
//
// - Browser:   `window`
// - Node.js:   `global`
// - Universal: `globalThis` (introduced in ES2020)
//
// ---------------------------------------------------------------
// Browser Example:
console.log(window);
// The "window" object contains:
// - DOM APIs (document, alert, etc.)
// - BOM APIs (navigator, location, history, etc.)
// - Global variables (var-declared ones become properties of window)

// ---------------------------------------------------------------
// Global object == this (non-strict, global scope in browsers)
//
// In browsers, at the top level (outside any function):
console.log(this === window); // true

// ---------------------------------------------------------------
// Node.js Example:
console.log(global);
// Global object in Node.js.
// Includes setTimeout, Buffer, process, etc.

console.log(this === global);
// false in Node.js (because top-level `this` is module.exports)

// ---------------------------------------------------------------
// Part 3: Practical Examples
// ---------------------------------------------------------------

// Example 1: Global variables attach to window in browsers
var x = 10;
console.log(window.x); // 10
// ⚠️ let/const DO NOT attach to window
let y = 20;
console.log(window.y); // undefined

// Example 2: Accessing global object safely with globalThis
console.log(globalThis.setTimeout === setTimeout); // true
// Works in browser + Node.js → universal access.

// Example 3: Why globalThis is useful
function detectEnv() {
  if (typeof window !== "undefined") {
    console.log("Running in Browser");
  } else if (typeof global !== "undefined") {
    console.log("Running in Node.js");
  }
}
detectEnv();

// Instead of writing this messy code, just use:
console.log(globalThis);
// It works everywhere.

// ---------------------------------------------------------------
// ❓ Interview Q&A
// ---------------------------------------------------------------
//
// Q1) What is the shortest valid JS program?
// 👉 An empty file OR a single semicolon `;`.
//
// Q2) What is the global object in browsers and Node.js?
// 👉 Browser: window, Node.js: global.
// 👉 Since ES2020 → globalThis works in both.
//
// Q3) Is `this` always equal to global object?
// 👉 In browsers, in non-strict mode, top-level `this === window`.
// 👉 In Node.js, top-level `this` refers to module.exports, not global.
// 👉 Inside functions (non-strict), `this` is global; in strict, `this = undefined`.
//
// Q4) Do let/const variables become properties of window?
// 👉 No. Only `var` attaches to the window object.
//
// Q5) Why was globalThis introduced?
// 👉 To provide a consistent way of accessing the global object across all environments (browser, Node, Web Workers).
