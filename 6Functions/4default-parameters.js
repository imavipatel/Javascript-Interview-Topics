// ============================================================================
// 4) Default Parameters
// ============================================================================
//
// 📌 Theory:
// - Introduced in ES6 (2015).
// - Default parameters allow us to set initial values for function parameters.
// - If an argument is `undefined`, the default value is used.
// - `null` will NOT trigger default value (only `undefined` does).
// - Makes code cleaner, avoids manual checks.
//
// ----------------------------------------------------------------------------
// ✅ Example 1: Basic usage
// ----------------------------------------------------------------------------

function greet(name = "Guest") {
  return `Hello, ${name}`;
}

console.log(greet("Avi")); // Hello, Avi
console.log(greet()); // Hello, Guest (default used)

// ----------------------------------------------------------------------------
// ✅ Example 2: Multiple default parameters
// ----------------------------------------------------------------------------

function multiply(a = 2, b = 3) {
  return a * b;
}

console.log(multiply()); // 6 (2*3)
console.log(multiply(5)); // 15 (5*3)
console.log(multiply(5, 10)); // 50

// ----------------------------------------------------------------------------
// ✅ Example 3: Expressions as default values
// ----------------------------------------------------------------------------
//
// - Default parameters can be expressions, even function calls.

function randomMultiplier(n = Math.floor(Math.random() * 10)) {
  return n * 2;
}

console.log(randomMultiplier()); // Different result each time
console.log(randomMultiplier(5)); // 10 (uses given value)

// ----------------------------------------------------------------------------
// ✅ Example 4: Default parameters with other parameters
// ----------------------------------------------------------------------------
//
// Default parameters can use previous parameters.

function greetUser(name, greeting = `Hello, ${name}`) {
  return greeting;
}

console.log(greetUser("Avi")); // "Hello, Avi"
console.log(greetUser("Avi", "Hi!")); // "Hi!"

// ----------------------------------------------------------------------------
// ✅ Example 5: Difference between undefined & null
// ----------------------------------------------------------------------------

function test(x = 10) {
  console.log(x);
}

test(); // 10 (default used, since argument is missing → undefined)
test(undefined); // 10 (default used, explicit undefined)
test(null); // null (default NOT used)

// ----------------------------------------------------------------------------
// ✅ Example 6: Default parameters with destructuring
// ----------------------------------------------------------------------------

function printUser({ name = "Guest", age = 18 } = {}) {
  console.log(`Name: ${name}, Age: ${age}`);
}

printUser({ name: "Avi", age: 25 }); // Name: Avi, Age: 25
printUser({ name: "Avi" }); // Name: Avi, Age: 18
printUser(); // Name: Guest, Age: 18

// ----------------------------------------------------------------------------
// ❌ Pitfalls to remember
// ----------------------------------------------------------------------------
// 1. Only `undefined` triggers default value, not `null` or 0.
// 2. Default parameter evaluated each time function is called.
// 3. Be careful when using objects/arrays as defaults (shared reference).

function addToArray(val, arr = []) {
  arr.push(val);
  return arr;
}

console.log(addToArray(1)); // [1]
console.log(addToArray(2)); // [2] → not [1,2], because new [] created each time.

// ----------------------------------------------------------------------------
// 🎯 Interview Q&A
// ----------------------------------------------------------------------------
//
// Q1: What are default parameters in JavaScript?
//     → Parameters that use a fallback value if no argument (or undefined) is passed.
//
// Q2: When was it introduced?
//     → In ES6 (2015).
//
// Q3: Difference between `undefined` and `null` with default parameters?
//     → `undefined` triggers the default value, `null` does not.
//
// Q4: Can we use functions or expressions as default values?
//     → Yes, defaults can be any valid expression.
//
// Q5: Real use case?
//     → Functions with optional arguments (e.g., API calls, config options).
//
// ----------------------------------------------------------------------------
