// ============================================================================
// 6) 📘 Advanced JS – Pipe & Compose Functions
// ============================================================================
//
// Topics covered:
// 1) compose() function
// 2) pipe() function
//
// -----------------------------------------------------------------------------

// ============================================================================
// 1) compose()
// ============================================================================
// - compose() executes functions **right-to-left**.
// - Result of one function becomes input for the previous.
// - Useful for **functional programming** to combine multiple operations.

const multiplyBy2 = (x) => x * 2;
const add3 = (x) => x + 3;
const square = (x) => x * x;

// Compose utility
const compose =
  (...fns) =>
  (value) =>
    fns.reduceRight((acc, fn) => fn(acc), value);

const composedFn = compose(square, add3, multiplyBy2);
console.log(composedFn(5));
// Step by step:
// multiplyBy2(5) => 10
// add3(10) => 13
// square(13) => 169
// ✅ Output: 169

// ============================================================================
// 2) pipe()
// ============================================================================
// - pipe() executes functions **left-to-right**.
// - Makes code easier to read in sequential steps.

const pipe =
  (...fns) =>
  (value) =>
    fns.reduce((acc, fn) => fn(acc), value);

const pipedFn = pipe(multiplyBy2, add3, square);
console.log(pipedFn(5));
// Step by step:
// multiplyBy2(5) => 10
// add3(10) => 13
// square(13) => 169
// ✅ Output: 169

// ============================================================================
// 🔑 Key Points Summary
// ============================================================================
// 1) compose → right-to-left execution of functions
// 2) pipe → left-to-right execution
// 3) Both are used in **functional programming** to avoid nested calls
// 4) Helps **write cleaner and reusable code**
// 5) Functions must be **pure** for consistent results

// ============================================================================
// ❓ Q & A
// ============================================================================
// Q1) Difference between pipe and compose?
// 👉 compose: right-to-left, pipe: left-to-right execution
//
// Q2) Can we use compose/pipe with async functions?
// 👉 Yes, but need extra handling (e.g., promises or async/await)
//
// Q3) Why use pipe/compose instead of nested function calls?
// 👉 For readability, maintainability, and cleaner code.
//
// Q4) Can pipe/compose accept any number of functions?
// 👉 Yes, you can pass any number of functions using rest parameters.
//
// Q5) Do functions in compose/pipe modify the original input?
// 👉 Ideally not. They should be pure functions to avoid side-effects.
