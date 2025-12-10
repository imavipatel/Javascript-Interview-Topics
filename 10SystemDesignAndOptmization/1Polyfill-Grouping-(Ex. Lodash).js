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
