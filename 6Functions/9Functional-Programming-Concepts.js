// ============================================================================
// 9) Functional Programming Concepts
// ============================================================================
//
// ---------------------------------------------------------------
// Part 1: What is Functional Programming (FP)?
// ---------------------------------------------------------------
// 👉 Functional Programming is a programming paradigm where functions are
//    treated as "first-class citizens" and programs are built by combining
//    pure functions together.
//
// Core principles:
// - Functions are values (can be stored, passed, returned).
// - Avoid shared state / mutable data.
// - Avoid side-effects (pure functions).
// - Prefer immutability.
// - Declarative style (focus on "what" instead of "how").
//
// ---------------------------------------------------------------
// Part 2: Core Concepts
// ---------------------------------------------------------------

// 1) Pure Functions
// 👉 A function that:
//    - Given the same input, always returns the same output.
//    - Has no side effects (doesn't modify outside data).
function pureAdd(a, b) {
  return a + b; // ✅ pure
}
console.log(pureAdd(2, 3)); // 5

let x = 10;
function impureAdd(a) {
  return a + x; // ❌ depends on external variable
}
console.log(impureAdd(5)); // output changes if x changes!

// 2) Immutability
// 👉 Do not mutate (change) existing data. Instead, return a new one.
let arr2 = [1, 2, 3];
let newArr = [...arr2, 4]; // create new array instead of pushing into old
console.log(arr2); // [1, 2, 3]
console.log(newArr); // [1, 2, 3, 4]

// 3) First-Class Functions
// 👉 Functions can be assigned, passed, and returned.
const greet = () => "Hello!";
const executor = (fn) => fn();
console.log(executor(greet)); // "Hello!"

// 4) Higher-Order Functions
// 👉 A function that takes another function as argument or returns one.
function hofExample(fn, value) {
  return fn(value);
}
console.log(hofExample((x) => x * 2, 5)); // 10

// 5) Function Composition
// 👉 Combining small functions to build bigger functions.
const multiplyBy2 = (n) => n * 2;
const square2 = (n) => n * n;

// Compose manually
const multiplyThenSquare = (n) => square2(multiplyBy2(n));
console.log(multiplyThenSquare(3)); // (3*2)^2 = 36

// 6) Declarative vs Imperative
// Imperative → step by step (HOW)
let nums1 = [1, 2, 3, 4];
let doubled1 = [];
for (let i = 0; i < nums1.length; i++) {
  doubled1.push(nums1[i] * 2);
}
console.log(doubled1); // [2, 4, 6, 8]

// Declarative → WHAT you want
let doubledFP = nums1.map((n) => n * 2);
console.log(doubledFP); // [2, 4, 6, 8]

// 7) Map, Filter, Reduce (FP in JS)
let numbers1 = [1, 2, 3, 4, 5];

// Map → transform
let squares1 = numbers1.map((n) => n * n);
console.log(squares1); // [1, 4, 9, 16, 25]

// Filter → keep matching
let evens1 = numbers1.filter((n) => n % 2 === 0);
console.log(evens1); // [2, 4]

// Reduce → accumulate
let sum1 = numbers1.reduce((acc, n) => acc + n, 0);
console.log(sum1); // 15

// ---------------------------------------------------------------
// Part 3: Advanced FP Concepts
// ---------------------------------------------------------------

// 1) Currying & Partial Application
const add = (a) => (b) => a + b;
console.log(add(2)(3)); // 5

// 2) Recursion
// 👉 FP often uses recursion instead of loops.
function factorial(n) {
  return n === 0 ? 1 : n * factorial(n - 1);
}
console.log(factorial(5)); // 120

// 3) Lazy Evaluation (conceptual, shown using generator)
function* lazySquares(nums) {
  for (let n of nums) {
    console.log("Calculating square of", n);
    yield n * n;
  }
}
let it = lazySquares([1, 2, 3]);
console.log(it.next().value); // calculates only when needed → 1
console.log(it.next().value); // 4

// ---------------------------------------------------------------
// Part 4: Real-Life Example
// ---------------------------------------------------------------
// Imagine a shopping cart system:

let cart = [
  { item: "Book", price: 200 },
  { item: "Pen", price: 20 },
  { item: "Notebook", price: 100 },
];

// 1) Apply discount to all items (map)
let discounted = cart.map((p) => ({
  ...p,
  price: p.price * 0.9,
}));
console.log(discounted);

// 2) Filter items > 50 (filter)
let costly = discounted.filter((p) => p.price > 50);
console.log(costly);

// 3) Get total price (reduce)
let total = costly.reduce((sum, p) => sum + p.price, 0);
console.log(total);

// ---------------------------------------------------------------
// ❓ Interview Q&A
// ---------------------------------------------------------------
//
// Q1) What is functional programming?
// → A paradigm where functions are first-class, pure, and combined
//   to build programs in a declarative way.
//
// Q2) What are pure functions?
// → Functions that always return same output for same input and have no side effects.
//
// Q3) Why immutability is important in FP?
// → Avoids unexpected bugs, ensures predictability, helps with concurrency.
//
// Q4) Difference between declarative and imperative?
// → Imperative = HOW step by step, Declarative = WHAT outcome.
//
// Q5) What are map, filter, reduce in FP?
// → Core higher-order functions for transformation, selection, and accumulation.
//
// Q6) Why FP is popular in JS?
// → JS treats functions as first-class, has built-in HOFs, and supports immutability via spread/rest.
//
// ----------------------------------------------------------------------------
// End of Functional Programming Concepts
// ----------------------------------------------------------------------------
