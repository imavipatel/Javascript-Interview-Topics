// ============================================================================
// 11) Compose Polyfills
// ============================================================================
//
// 🔹 What does "compose" mean?
// In functional programming, "compose" means combining multiple functions
// together to form a new function.
//
// Formula (right-to-left):
//   compose(f, g)(x) === f(g(x))
//
// So: "Do g first, then f".
//
// Why useful?
// - Makes function pipelines clean and readable.
// - Avoids deeply nested function calls.
// - Common in libraries like Redux, Lodash, Ramda.
//
// ----------------------------------------------------------------------------
// Part 1: Example without compose
// ----------------------------------------------------------------------------
function double(x) {
  return x * 2;
}
function square(x) {
  return x * x;
}

// Without compose:
let result1 = double(square(3)); // square first, then double → 18
console.log("Without compose:", result1);

// ----------------------------------------------------------------------------
// Part 2: Compose implementation (polyfill)
// ----------------------------------------------------------------------------
function compose(...fns) {
  return function (x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}

// Usage:
let doMath = compose(double, square); // do square, then double
console.log("Compose result:", doMath(3)); // 18

// ----------------------------------------------------------------------------
// Part 3: Another Example with more functions
// ----------------------------------------------------------------------------
function addOne(x) {
  return x + 1;
}
function half(x) {
  return x / 2;
}

let combined = compose(half, double, addOne);
// Step: addOne(3) → 4 → double(4) → 8 → half(8) → 4
console.log("Compose multiple:", combined(3));

// ----------------------------------------------------------------------------
// Part 4: Pipe (left-to-right version of compose)
// ----------------------------------------------------------------------------
// Sometimes you want left-to-right flow: pipe(f, g)(x) = g(f(x))

function pipe(...fns) {
  return function (x) {
    return fns.reduce((acc, fn) => fn(acc), x);
  };
}

let piped = pipe(addOne, double, half);
// Step: addOne(3) → 4 → double(4) → 8 → half(8) → 4
console.log("Pipe multiple:", piped(3));

// ----------------------------------------------------------------------------
// Part 5: Compose vs Pipe
// ----------------------------------------------------------------------------
// compose(f, g)(x) = f(g(x))  (Right-to-left)
// pipe(f, g)(x) = g(f(x))     (Left-to-right)
//
// Example:
// compose(double, square)(3) → double(square(3)) = 18
// pipe(square, double)(3) → double(square(3)) = 18 (same order, but easier to read)

// ----------------------------------------------------------------------------
// Part 6: Real-life Example
// ----------------------------------------------------------------------------
// Data transformations
let toUpper = (str) => str.toUpperCase();
let exclaim = (str) => str + "!";
let greet = (name) => "Hello " + name;

let excitedGreeting = compose(exclaim, toUpper, greet);
console.log(excitedGreeting("avi")); // "HELLO AVI!"

// ----------------------------------------------------------------------------
// ❓ Interview Q&A
// ----------------------------------------------------------------------------
// Q1) What is function composition?
// A1: Combining multiple small functions into a single function, where the
//     output of one becomes the input of the next.
//
// Q2) What is the difference between compose and pipe?
// A2: compose runs functions right-to-left, pipe runs left-to-right.
//
// Q3) Why use compose instead of just nesting calls?
// A3: It keeps code clean, avoids deep nesting, and allows building reusable
//     function pipelines.
//
// Q4) Where is compose used in real-world JS?
// A4: Libraries like Redux use compose for combining middlewares; it's also
//     common in functional programming libraries (Ramda, Lodash).
//
// Q5) Can compose work with async functions?
// A5: Yes, but you’ll need an async-aware compose that handles Promises
//     (await each step before passing to the next).
//
//
// ----------------------------------------------------------------------------
// End of "Compose Polyfills" notes
// ============================================================================
