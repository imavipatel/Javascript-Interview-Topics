// ============================================================================
// 12) Additional Topics in Functions
// ============================================================================

// ---------------------------------------------------------------
// 12.1) Arguments Object
// ---------------------------------------------------------------
// 👉 `arguments` is an array-like object available inside functions.
// 👉 Contains all arguments passed to the function (even if not defined in parameters).
// 👉 NOT available in arrow functions.

function showArgs(a, b) {
  console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3 }
}
showArgs(1, 2, 3);

// ⚠️ Limitations:
// - It's array-like (has length, can access by index), but NOT a real array.
// - No array methods (map, filter, etc.) directly.

// Example: converting arguments to real array
function sumAll() {
  let arr = Array.from(arguments);
  return arr.reduce((a, b) => a + b, 0);
}
console.log(sumAll(1, 2, 3, 4)); // 10

// ---------------------------------------------------------------
// 12.2) Rest & Spread in Function Parameters
// ---------------------------------------------------------------
// ✅ Rest → Collects multiple arguments into an array
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// ✅ Spread → Expands arrays/objects into elements
let arr3 = [1, 2, 3];
console.log(Math.max(...arr3)); // 3

// Rest + Spread together
function multiply(factor, ...nums) {
  return nums.map((n) => n * factor);
}
console.log(multiply(2, 1, 2, 3)); // [2, 4, 6]

// ---------------------------------------------------------------
// 12.3) Recursion & Tail Recursion Optimization
// ---------------------------------------------------------------
// 👉 Recursion = function calling itself.
// 👉 Tail recursion = recursive call is the LAST operation in the function.
// Some engines optimize tail recursion to save memory (not all JS engines).

// Example: Factorial (normal recursion)
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5)); // 120

// Example: Factorial (tail recursion style)
function factorialTail(n, acc = 1) {
  if (n === 0) return acc;
  return factorialTail(n - 1, n * acc);
}
console.log(factorialTail(5)); // 120
// ⚠️ JS (as of now) doesn’t guarantee tail-call optimization in all engines.

// ---------------------------------------------------------------
// 12.4) Pure vs Impure Functions
// ---------------------------------------------------------------
// ✅ Pure Function:
// - Same input → same output
// - No side effects (doesn’t change external state)

function pureAdd(a, b) {
  return a + b;
}
console.log(pureAdd(2, 3)); // 5

// ❌ Impure Function:
let x1 = 10;
function impureAdd(y) {
  return (x1 += y); // modifies external state
}
console.log(impureAdd(5)); // 15
console.log(impureAdd(5)); // 20 (different result for same input!)

// ---------------------------------------------------------------
// 12.5) Function Properties (length, name)
// ---------------------------------------------------------------
function demoFn(a, b, c) {}
console.log(demoFn.length); // 3 → number of declared parameters
console.log(demoFn.name); // "demoFn" → function name

let anon = function (x, y) {};
console.log(anon.name); // "anon" (inferred by variable name)

// ---------------------------------------------------------------
// 12.6) Function Hoisting Nuances
// ---------------------------------------------------------------
// ✅ Function Declarations → fully hoisted (can call before definition)
hello();
function hello() {
  console.log("Hello World!");
}

// ❌ Function Expressions → NOT hoisted
// greet(); // ❌ Error: Cannot access 'greet' before initialization
const greet = function () {
  console.log("Hi there!");
};

// Arrow functions behave like function expressions → not hoisted.

// ---------------------------------------------------------------
// 12.7) Function to Measure Performance
// ---------------------------------------------------------------
// 👉 Use Date.now() or performance.now() to measure execution time.

function measurePerformance(fn, ...args) {
  let start = performance.now();
  let result = fn(...args);
  let end = performance.now();
  console.log(`Execution Time: ${end - start} ms`);
  return result;
}

// Example: Measuring factorial
let res = measurePerformance(factorial, 10);
console.log("Result:", res);

// ---------------------------------------------------------------
// ❓ Interview Q&A
// ---------------------------------------------------------------
//
// Q1) What is the difference between `arguments` and rest parameters?
// 👉 `arguments`: array-like, older, not available in arrow functions.
// 👉 Rest: modern syntax, real array, works only at the end of params.
//
// Q2) What is recursion, and what is tail recursion?
// 👉 Recursion: function calls itself.
// 👉 Tail recursion: recursive call is the last statement (can be optimized).
//
// Q3) Difference between pure and impure functions?
// 👉 Pure: no side effects, same input → same output.
// 👉 Impure: depends on or modifies external state.
//
// Q4) What are function properties like length and name used for?
// 👉 length: number of declared params, name: function’s identifier.
//
// Q5) What is hoisting in functions?
// 👉 Declarations hoisted fully, expressions/arrow functions are not.
//
// Q6) How do you measure performance of a function?
// 👉 Use `performance.now()` (high resolution) or `Date.now()`.
//
// ----------------------------------------------------------------------------
// End of Additional Topics
// ----------------------------------------------------------------------------

// ============================================================================
// ❓ Interview Q&A (Summary)
// ============================================================================
// Q1) Difference between declaration vs expression?
// A: Declaration is hoisted, expression is not.
// Q2) Why arrow functions? When NOT to use them?
// A: Shorter + lexical this. Don’t use in objects/constructors.
// Q3) What is closure and its uses?
// A: Function + its lexical scope. Used for data hiding, modules.
// Q4) Explain currying & infinite currying.
// Q5) What is memoization?
// A: Caching function results to improve performance.
// Q6) Difference between generators and normal functions?
// A: Generators can pause/resume with yield.
// Q7) What is tail recursion?
// A: Optimized recursion where last operation is recursive call.
// ============================================================================
