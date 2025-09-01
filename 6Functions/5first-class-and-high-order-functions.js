// ============================================================================
// 5) First-Class & Higher-Order Functions
// ============================================================================
//
// -----------------------------------------------------------------------------
// 📌 Part 1: First-Class Functions
// -----------------------------------------------------------------------------
//
// ✅ Theory:
// - In JavaScript, **functions are first-class citizens** (or first-class objects).
// - This means functions are treated like values/objects.
// - Functions can be:
//    1. Assigned to variables
//    2. Passed as arguments
//    3. Returned from other functions
//    4. Stored in objects/arrays
//
// 👉 Because of this property, powerful concepts like callbacks, closures,
//    functional programming, and higher-order functions are possible.
//
// ----------------------------------------------------------------------------
// ✅ Example 1: Assigning function to variable
// ----------------------------------------------------------------------------

function sayHello() {
  return "Hello!";
}

let greet = sayHello; // assign function reference
console.log(greet()); // "Hello!"

// ----------------------------------------------------------------------------
// ✅ Example 2: Passing function as argument
// ----------------------------------------------------------------------------

function operate(fn, a, b) {
  return fn(a, b);
}

function add(x, y) {
  return x + y;
}
function multiply(x, y) {
  return x * y;
}

console.log(operate(add, 5, 3)); // 8
console.log(operate(multiply, 5, 3)); // 15

// ----------------------------------------------------------------------------
// ✅ Example 3: Returning function from another function
// ----------------------------------------------------------------------------

function outer() {
  return function inner() {
    return "I am inner!";
  };
}

let innerFn = outer(); // outer returns a function
console.log(innerFn()); // "I am inner!"

// ----------------------------------------------------------------------------
// ✅ Example 4: Storing functions in data structures
// ----------------------------------------------------------------------------

let arr = [
  function (x) {
    return x * 2;
  },
  function (x) {
    return x * 3;
  },
];

console.log(arr); // 10
console.log(arr); // 15

// -----------------------------------------------------------------------------
// 📌 Part 2: Higher-Order Functions (HOFs)
// -----------------------------------------------------------------------------
//
// ✅ Theory:
// - A **higher-order function** is a function that does at least one of these:
//    1. Takes another function as an argument (callback).
//    2. Returns another function.
//
// - They are possible because functions are first-class citizens.
// - Very common in JS → map, filter, reduce are HOFs.
//
// ----------------------------------------------------------------------------
// ✅ Example 1: Function taking another function (callback)
// ----------------------------------------------------------------------------

function greetUser(name, formatter) {
  return "Hello " + formatter(name);
}

function upperCase(str) {
  return str.toUpperCase();
}

console.log(greetUser("avi", upperCase)); // "Hello AVI"

// ----------------------------------------------------------------------------
// ✅ Example 2: Function returning another function
// ----------------------------------------------------------------------------

function multiplier(factor) {
  return function (n) {
    return n * factor;
  };
}

let double = multiplier(2);
let triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// ----------------------------------------------------------------------------
// ✅ Example 3: Array methods (map, filter, reduce)
// ----------------------------------------------------------------------------

let numbers = [1, 2, 3, 4, 5];

let squares = numbers.map((n) => n * n); // HOF: map takes a function
console.log(squares); // [1, 4, 9, 16, 25]

let evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // [2, 4]

let sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

// ----------------------------------------------------------------------------
// ✅ Example 4: Real-life Higher-Order Function (authentication middleware)
// ----------------------------------------------------------------------------
//
// Imagine a middleware wrapper for checking login before accessing a route.

function withAuth(fn) {
  return function (user) {
    if (!user || !user.loggedIn) {
      console.log("Access denied");
    } else {
      fn(user);
    }
  };
}

function dashboard(user) {
  console.log("Welcome " + user.name);
}

let protectedDashboard = withAuth(dashboard);

protectedDashboard({ name: "Avi", loggedIn: true }); // "Welcome Avi"
protectedDashboard({ name: "Bob", loggedIn: false }); // "Access denied"

// -----------------------------------------------------------------------------
// 🎯 Interview Q&A
// -----------------------------------------------------------------------------
//
// Q1: What are First-Class Functions?
// 👉 Functions treated like values (can be assigned, passed, returned).
//
// Q2: What is a Higher-Order Function?
// 👉 A function that takes another function as argument OR returns a function.
//
// Q3: Give real-world examples of HOFs in JS.
// 👉 map, filter, reduce, setTimeout, addEventListener.
//
// Q4: Why are HOFs powerful?
// 👉 They enable abstraction, reusability, modularity, and functional programming style.
//
// Q5: Can every first-class function be higher-order?
// 👉 No. First-class is the capability, HOF is a use of that capability.
