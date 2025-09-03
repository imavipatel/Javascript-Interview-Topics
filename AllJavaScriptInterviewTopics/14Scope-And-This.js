// ===============================================================
// 📘 JavaScript Notes: Scope & Scope Chain
// ===============================================================
//
// Topics covered:
// 1) Scope & Scope Chain
// 2) Block vs Function Scope
// 3) Lexical vs Dynamic Scope
// 4) this keyword (global / function / arrow / class)
// 5) Difference: call vs apply vs bind
// 6) Implicit and Explicit Binding
// 7) Shortest JS program & window
// 8) Additional Topics
//    - new.target
//    - globalThis
//    - Shadowed variables (illegal shadowing)
//    - Closures impact on scope
// 9) Q&A Section
// 10) Common Mistakes & Gotchas
// ===============================================================

// ---------------------------------------------------------------
// 1) Scope & Scope Chain
// ---------------------------------------------------------------
// Scope = where variables are accessible.
// Scope Chain = mechanism to look up variables in outer scopes.

let globalVar = "I am global";

function outer() {
  let outerVar = "I am outer";
  function inner() {
    let innerVar = "I am inner";
    console.log(globalVar); // ✅ Found in global
    console.log(outerVar); // ✅ Found in outer
    console.log(innerVar); // ✅ Found in inner
  }
  inner();
}

outer();

// ---------------------------------------------------------------
// 2) Block vs Function Scope
// ---------------------------------------------------------------
// Block scope → variables declared with let/const inside {} only live there.
// Function scope → var is scoped to entire function, ignoring block {}.

{
  let a = 10;
  const b = 20;
  var c = 30;
}
// console.log(a); // ❌ ReferenceError
// console.log(b); // ❌ ReferenceError
console.log(c); // ✅ 30 (function scoped, leaked outside block)

// ---------------------------------------------------------------
// 3) Lexical vs Dynamic Scope
// ---------------------------------------------------------------
//
// 👉 Scope = "where a variable can be accessed in code".
// 👉 There are 2 possible models of scope in programming languages:
//    1) Lexical Scope (used by JS, C, Java, etc.)
//    2) Dynamic Scope (used by some older languages like Bash, Lisp)
//
// ⚡ JavaScript uses **Lexical Scope**, meaning that scope is determined
//    by the *physical position of code* (where it is written).
//    It does NOT depend on who called the function.
// ---------------------------------------------------------------

// ---------------------------------------------------------------
// Lexical Scope Example
// ---------------------------------------------------------------
//
// Here `lexical` variable is defined outside printLexical.
// So printLexical() will always use the variable from where
// it was **written**, not from who calls it.

let lexical = "outer";

function printLexical() {
  console.log(lexical); // Looks where function is written
}

function callFn(fn) {
  let lexical = "inner"; // This doesn't matter!
  fn(); // call printLexical
}

callFn(printLexical); // "outer" (NOT "inner")

// ---------------------------------------------------------------
// Why "outer"?
// Because `printLexical` was DEFINED in the outer scope, so it
// closes over (remembers) that `lexical` variable, regardless of
// who calls it later.

// ---------------------------------------------------------------
// Dynamic Scope Example (NOT in JS, but for understanding)
// ---------------------------------------------------------------
//
// If JS were dynamically scoped, the caller’s environment would matter.
// That means printLexical would use the `lexical` from callFn.
//
// Pseudo-code (NOT JavaScript):
//
// let lexical = "outer";
//
// function printLexical() {
//   print lexical; // would depend on who calls me
// }
//
// function callFn(fn) {
//   let lexical = "inner";
//   fn();  // would print "inner" in dynamic scoping
// }
//
// callFn(printLexical); // "inner" in dynamic languages
//
// 👉 This is how Bash or Lisp behave.
// ---------------------------------------------------------------

// ---------------------------------------------------------------
// Practical Example in JavaScript
// ---------------------------------------------------------------
//
// Inner functions always use the variable where they are defined
// (lexical), not from where they are called.

function outer() {
  let message = "Hello from outer";

  function inner() {
    console.log(message); // closes over "message"
  }

  return inner;
}

let fn = outer();
fn(); // "Hello from outer"

// Even though outer() has finished running,
// inner() still remembers the lexical scope → closure.

// ---------------------------------------------------------------
// 🎯 Easy Theory Summary
// ---------------------------------------------------------------
// - Lexical Scope: Based on code position (where function is written).
// - Dynamic Scope: Based on call stack (who calls the function).
// - JS = Lexical scope language.
// - Because of lexical scope, closures are possible in JS.

// ---------------------------------------------------------------
// ❓ Common Interview Q&A
// ---------------------------------------------------------------
//
// Q1) What is Lexical Scope in JavaScript?
// 👉 Lexical scope means a function remembers the environment
//    (variables) from where it was defined, not from where it is called.
//
// Q2) What is the difference between Lexical and Dynamic Scope?
// 👉 Lexical = determined at write-time (code position).
// 👉 Dynamic = determined at run-time (call position).
//
// Q3) How do closures relate to lexical scope?
// 👉 Closures exist because functions in JS remember their lexical scope
//    even after the outer function has finished executing.

// ---------------------------------------------------------------
// 4) this keyword (global / function / arrow / class)
// ---------------------------------------------------------------
//
// 👉 The `this` keyword in JavaScript behaves differently depending on
//    where and how it is used.
// 👉 It does NOT refer to the function itself, but to the object that
//    "owns" the function execution context.
// 👉 Rules change between:
//    - Global context
//    - Normal function calls
//    - Arrow functions
//    - Object methods
//    - Classes / constructors
//
// Let's break each case step by step with examples & theory.
// ---------------------------------------------------------------

// ---------------------------------------------------------------
// Global Context
// ---------------------------------------------------------------
//
// In global scope, `this` refers to the global object.
// - In Browser → `window`
// - In Node.js → `{}` (module.exports) instead of `global`
console.log(this); // Browser: window | Node: {}

// ---------------------------------------------------------------
// Normal Function
// ---------------------------------------------------------------
//
// Rule: In a normal function call, `this` depends on **strict mode**.
// - Strict mode (`'use strict'`) → `this = undefined`
// - Non-strict mode → `this = global object`

function normalFn() {
  console.log(this);
}
normalFn(); // undefined (strict) OR window (non-strict)

// ---------------------------------------------------------------
// Arrow Function
// ---------------------------------------------------------------
//
// Rule: Arrow functions do NOT have their own `this`.
// Instead, they use `this` from their **lexical scope**
// (the place where they were created).

const arrowFn = () => {
  console.log(this);
};
arrowFn();
// In browser: window
// In Node: {} (same as global `this` in this file)

// ---------------------------------------------------------------
// Inside Object
// ---------------------------------------------------------------
//
// Case 1: Normal method → `this` refers to the object that calls it.
// Case 2: Arrow method → does not bind `this`, so it takes from
//         outer (global) scope.

let obj = {
  name: "JS",
  sayName: function () {
    console.log(this.name); // ✅ "JS" → this = obj
  },
  arrowSay: () => {
    console.log(this.name); // ❌ undefined → this = global scope
  },
};
obj.sayName();
obj.arrowSay();

//
// 👉 Why undefined in arrowSay?
// Because arrow functions don't get their own `this`.
// They inherit from the surrounding scope, which here is the file/global,
// not the object.

// ---------------------------------------------------------------
// Inside Class
// ---------------------------------------------------------------
//
// In classes (or constructor functions), `this` refers to the
// object being created from the class.

class Person {
  constructor(name) {
    this.name = name; // "this" = the new object
  }
  getName() {
    console.log(this.name);
  }
}

let p = new Person("Alice");
p.getName(); // Alice

//
// 👉 When using `new`, a brand-new object is created.
//    - `this` inside constructor points to that new object.
//    - The methods inside class also use that same `this`.
//
// Caution: If you pass methods as callbacks, you may lose `this` binding.
// Example:
let callback = p.getName;
callback(); // ❌ undefined (lost this reference)

// ---------------------------------------------------------------
// 🎯 Easy Theory Summary
// ---------------------------------------------------------------
// - Global scope → `this = window` (browser) OR `{}` (Node).
// - Normal function → strict → undefined, non-strict → window.
// - Arrow function → no own `this`, takes from outer lexical scope.
// - Object method (normal) → `this = object` that calls it.
// - Object method (arrow) → no binding, inherits from outer scope.
// - Class/Constructor → `this` = new instance created.

// ---------------------------------------------------------------
// ❓ Common Interview Q&A
// ---------------------------------------------------------------

// Q1: Why does arrow function not bind `this`?
// 👉 Because arrow functions were designed to avoid the “losing this”
//    problem. They use lexical scoping for `this`.
// Example:
let obj2 = {
  name: "Lexical",
  arrow: () => console.log(this.name), // this = outer scope
};
obj2.arrow(); // ❌ undefined

// Q2: How to fix lost `this` in class methods?
// 👉 Solution: Use .bind(), or arrow functions in class methods.

class User {
  constructor(name) {
    this.name = name;
    this.getName = this.getName.bind(this); // ✅ Fix
  }
  getName() {
    console.log(this.name);
  }
}
let u = new User("Bob");
setTimeout(u.getName, 1000); // Bob

// ---------------------------------------------------------------
// 5) Difference: call vs apply vs bind
// ---------------------------------------------------------------
//
// 👉 In JavaScript, functions are objects.
// Every function gets some special methods: `call`, `apply`, and `bind`.
// These methods allow us to manually set what `this` refers to.
//
// Why needed?
// - Normally, `this` depends on how a function is called.
// - But sometimes, we want to control or "borrow" methods for
//   another object → that’s where call, apply, bind help.
// ---------------------------------------------------------------

function greet(greeting, punctuation) {
  console.log(greeting + " " + this.name + punctuation);
}

let user1 = { name: "Avi" };

// ---------------------------------------------------------------
// 1) call()
// ---------------------------------------------------------------
// - Immediately calls the function.
// - First argument = the "this" context.
// - Next arguments = passed one by one (comma separated).

greet.call(user1, "Hello", "!");
// "Hello Avi!"
// Here: this → user1 , greeting = "Hello", punctuation = "!"

// ---------------------------------------------------------------
// 2) apply()
// ---------------------------------------------------------------
// - Same as call(), BUT arguments are passed as an array.
// - Useful when arguments are already in an array.

greet.apply(user1, ["Hi", "!!"]);
// "Hi Avi!!"

// ---------------------------------------------------------------
// 3) bind()
// ---------------------------------------------------------------
// - Does NOT call the function immediately.
// - Instead, returns a NEW function with "this" permanently set.
// - You can call that new function later.

let bound = greet.bind(user1, "Hey"); // partially applied
bound("?");
// "Hey Avi?"
// Here: this → user, greeting = "Hey", punctuation = "?"

// ---------------------------------------------------------------
// ✅ Key Difference Summary
// ---------------------------------------------------------------
//
// call → Calls function immediately, args individually.
// apply → Calls function immediately, args in array.
// bind → Returns new function with "this" fixed (use later).

// ---------------------------------------------------------------
// 📌 Practical Examples
// ---------------------------------------------------------------

// Example 1: Borrowing methods
let person1 = { name: "Alice" };
let person2 = { name: "Bob" };

function sayHello() {
  console.log("Hello " + this.name);
}

sayHello.call(person1); // Hello Alice
sayHello.call(person2); // Hello Bob

// Example 2: Using apply for Math.max with array
let numbers = [3, 7, 2, 9];
let max = Math.max.apply(null, numbers);
console.log(max); // 9
// Here we "spread" the array into function args using apply.

// Example 3: bind for callbacks
let button1 = {
  text: "Click Me",
  click() {
    console.log(this.text);
  },
};

let unbound = button1.click;
unbound();
// undefined (in strict mode) → loses context

let boundClick = button1.click.bind(button1);
boundClick();
// "Click Me" (context preserved)

// ---------------------------------------------------------------
// ❓ Common Interview Q&A
// ---------------------------------------------------------------
//
// Q1) What is the difference between call, apply, and bind?
// 👉 call & apply → call function immediately with custom this.
// 👉 bind → returns new function with fixed this (delayed execution).
// 👉 Difference between call & apply → arguments format (individual vs array).
//
// Q2) When should you use apply over call?
// 👉 When arguments are already in an array (e.g., Math.max).
//
// Q3) Why is bind useful?
// 👉 For preserving `this` in callbacks, timers, or event listeners.
//
// Q4) What happens if you pass null or undefined as `this`?
// 👉 In non-strict mode: `this` becomes global object (window in browser).
// 👉 In strict mode: `this` stays `null` or `undefined`.
//
// Q5) Can bind do partial application?
// 👉 Yes. You can pre-fill some arguments when binding (like in "Hey Avi?" example).

// ---------------------------------------------------------------
// 6) Implicit and Explicit Binding
// ---------------------------------------------------------------
//
// In JavaScript, the value of "this" depends on HOW a function is called.
//
// ---------------------------------------------------------------
// 1) Implicit Binding
// ---------------------------------------------------------------
// 👉 When a function is called as a property of an object (obj.method()),
//    "this" automatically refers to that object.
//    → "this" is bound implicitly (auto).
//
// Example:
let car = {
  brand: "Tesla",
  drive: function () {
    console.log(this.brand + " drives");
  },
};

car.drive();
// "Tesla drives"
// Why? Because drive() is called with car as the object → this = car.

// ⚠️ Common Pitfall:
let driveFn = car.drive;
driveFn();
// undefined (in strict mode) or global object in non-strict.
// Why? Because now it's a plain function call, NOT attached to car.

// ---------------------------------------------------------------
// 2) Explicit Binding
// ---------------------------------------------------------------
// 👉 Sometimes we want to control what "this" refers to manually.
// 👉 We use call(), apply(), or bind() to explicitly set "this".
//
// Example:
function showName() {
  console.log(this.name);
}
let person = { name: "Bob" };

showName.call(person);
// "Bob"
// Here we forced "this" to be person.

// Using apply (args in array)
function greet(greeting) {
  console.log(greeting + " " + this.name);
}
greet.apply(person, ["Hello"]); // "Hello Bob"

// Using bind (returns new function)
let boundFn = greet.bind(person, "Hi");
boundFn(); // "Hi Bob"

// ---------------------------------------------------------------
// 📌 Implicit vs Explicit Binding Quick Comparison
// ---------------------------------------------------------------
//
// Implicit Binding:
// - Happens automatically when function is called as obj.method().
// - "this" points to the object before the dot.
//
// Explicit Binding:
// - You control "this" using call, apply, or bind.
// - Useful for borrowing methods or ensuring correct "this" in callbacks.

// ---------------------------------------------------------------
// ✅ Practical Real-World Examples
// ---------------------------------------------------------------

// Example 1: Borrowing array methods for array-like objects
let arrayLike = { 0: "a", 1: "b", length: 2 };
let result = Array.prototype.join.call(arrayLike, "-");
console.log(result);
// "a-b"
// Explicit binding: we borrowed join() from arrays.

// Example 2: setTimeout losing context
let user = {
  name: "Alice",
  sayName: function () {
    console.log(this.name);
  },
};

setTimeout(user.sayName, 1000);
// undefined → loses implicit binding (plain function call)

setTimeout(user.sayName.bind(user), 1000);
// "Alice" → explicit binding fixes the problem.

// Example 3: Nested objects
let outer = {
  name: "Outer",
  inner: {
    name: "Inner",
    sayName: function () {
      console.log(this.name);
    },
  },
};

outer.inner.sayName(); // <-- Valid program, does nothing!
// "Inner" → implicit binding → this = inner

// ---------------------------------------------------------------
// ❓ Common Interview Q&A
// ---------------------------------------------------------------
//
// Q1) What is implicit binding in JavaScript?
// 👉 When a function is called as a method of an object,
//    "this" automatically refers to that object.
//
// Q2) What is explicit binding in JavaScript?
// 👉 When we manually set "this" using call, apply, or bind.
//
// Q3) What happens when you lose implicit binding?
// 👉 If a method is assigned to a variable or passed as callback,
//    it becomes a normal function call, and "this" becomes undefined
//    (in strict mode) or global object (in non-strict).
//
// Q4) Which is stronger, implicit or explicit binding?
// 👉 Explicit binding always overrides implicit binding.
//
// Q5) Real-life use of explicit binding?
// 👉 Fixing "this" in callbacks, borrowing methods from other objects,
//    or ensuring consistent context in event handlers.
//

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

// ---------------------------------------------------------------
// 8) Additional Topics
// ---------------------------------------------------------------

// ===============================================================
// Part 1: new.target
// ===============================================================
//
// 👉 What is it?
// - `new.target` is a special meta-property in JS.
// - It lets you detect if a function (or constructor) was called using `new`.
//
// 👉 Why do we need it?
// - Normally, functions can be called with or without `new`.
// - But constructors (intended for creating objects) should be used with `new`.
// - `new.target` helps us enforce that rule.
//
// Example:
function Example() {
  if (!new.target) {
    console.log("Not called with new");
  } else {
    console.log("Called with new");
  }
}
Example(); // Not called with new
new Example(); // Called with new

// Another Example → Prevent misuse of constructor
function Person(name) {
  if (!new.target) {
    throw new Error("Use 'new' with Person()");
  }
  this.name = name;
}
let p1 = new Person("Alice"); // ✅ Works
// let q1 = Person("Bob");    // ❌ Throws error

// ===============================================================
// Part 2: globalThis
// ===============================================================
//
// 👉 The "global object" varies across environments:
//    - Browser: window
//    - Node.js: global
//    - Web Workers: self
// 👉 ES2020 introduced `globalThis` as a universal solution.
//
// Example:
console.log(globalThis); // Works everywhere

// Browser check
console.log(window === globalThis); // true (browser)

// Node check
console.log(global === globalThis); // true (Node.js)

// Why useful?
// Instead of writing conditional code:
let env = typeof window !== "undefined" ? window : global;
console.log(env);
// Just write:
console.log(globalThis);

// ===============================================================
// Part 3: Illegal Shadowing
// ===============================================================
//
// 👉 Shadowing happens when a variable in an inner scope
//    has the same name as one in an outer scope.
// 👉 Legal shadowing: allowed if "let" or "const" redeclare inside block.
// 👉 Illegal shadowing: occurs when "var" tries to redeclare a variable
//    that was declared with let/const in the same or outer scope.
//
// Example:
function shadowingExample() {
  let a = 10;
  {
    // var a = 20; // ❌ Illegal shadowing → SyntaxError
    let a = 20; // ✅ Legal shadowing → allowed
    console.log(a); // 20
  }
  console.log(a); // 10
}
shadowingExample();

// Why illegal with var?
// - `var` is function-scoped (not block-scoped).
// - So it would try to "leak" into the outer scope,
//   conflicting with the let/const declaration.

// ===============================================================
// Part 4: Closures & Scope
// ===============================================================
//
// 👉 What is a closure?
// - A closure is formed when an inner function "remembers"
//   variables from its outer function, even after the outer function has finished executing.
//
// 👉 Why important?
// - Enables data privacy (private variables).
// - Used in event handlers, callbacks, async functions, etc.
//
// Example:
function closureFn() {
  let count = 0; // private variable
  return function () {
    count++;
    console.log(count);
  };
}

let counter = closureFn();
counter(); // 1
counter(); // 2
counter(); // 3
// Even though closureFn has finished execution,
// the inner function still has access to `count`.

// Another Example: Private state
function makeBankAccount(initial) {
  let balance = initial;
  return {
    deposit: function (amount) {
      balance += amount;
      console.log("Balance:", balance);
    },
    withdraw: function (amount) {
      if (amount > balance) {
        console.log("Insufficient funds");
      } else {
        balance -= amount;
        console.log("Balance:", balance);
      }
    },
  };
}

let account = makeBankAccount(100);
account.deposit(50); // Balance: 150
account.withdraw(70); // Balance: 80
// "balance" is private → not directly accessible.

// ===============================================================
// ❓ Interview Q&A
// ===============================================================
//
// Q1) What is `new.target`?
// 👉 A meta-property that tells whether a function was called with `new`.
// 👉 Useful to enforce constructor usage.
//
// Q2) What is `globalThis` and why was it introduced?
// 👉 A universal way to access the global object across all environments.
// 👉 Before ES2020, devs had to write conditional checks (window, global, self).
//
// Q3) What is illegal shadowing?
// 👉 When `var` tries to redeclare a variable already declared with let/const in the same scope. Causes SyntaxError.
// 👉 Legal shadowing works if both are block-scoped (let/const).
//
// Q4) What are closures?
// 👉 Closures are functions that "remember" the variables from their lexical scope.
// 👉 Even after the outer function returns, the inner function keeps access to those variables.
//
// Q5) Where are closures used in real life?
// 👉 Data hiding (private variables), event handlers, currying, setTimeout callbacks, React hooks (useState, useEffect).

// ---------------------------------------------------------------
// 9) Q&A SECTION
// ---------------------------------------------------------------

// Q1) What is the Scope Chain?
// - It’s how JS resolves variables: looks in local scope, then outer scopes, then global.

// Q2) Block vs Function scope difference?
// - let/const → block scope.
// - var → function scope, leaks outside block.

// Q3) Why is JS lexically scoped?
// - Because scope is determined by where code is written, not where it’s called.

// Q4) Difference between this in arrow vs function?
// - Arrow → inherits parent’s this (lexical).
// - Function → depends on caller.

// Q5) call vs apply vs bind?
// - call: invoke immediately, args list.
// - apply: invoke immediately, args array.
// - bind: returns new function with fixed this.

// Q6) Implicit vs Explicit binding?
// - Implicit: when called as obj.method(), this = obj.
// - Explicit: when forced via call/apply/bind.

// Q7) Shortest JS program?
// - Empty file is valid. In browser, "window" still exists as global.

// Q8) What is new.target used for?
// - Detect constructor calls and prevent misuse.

// Q9) What is globalThis?
// - Safe reference to global object (works in browser, Node, WebWorker).

// Q10) What is illegal shadowing?
// - When var tries to redeclare same name as let/const in same scope block → error.

// Q11) How do closures affect scope?
// - They keep outer variables alive, allowing persistent state.

// ---------------------------------------------------------------
// 10) COMMON MISTAKES & GOTCHAS
// ---------------------------------------------------------------

// ❌ Mistake 1: Confusing lexical vs dynamic scope
let msg = "outer";
function printMsg() {
  console.log(msg);
}
function caller(fn) {
  let msg = "inner";
  fn(); // prints "outer", not "inner"
}

// ❌ Mistake 2: Arrow function as method
let userObj = {
  name: "Sam",
  getName: () => console.log(this.name),
};
userObj.getName(); // undefined (arrow doesn’t bind this)

// ❌ Mistake 3: Forgetting bind
let button = {
  label: "Click",
  click: function () {
    console.log(this.label);
  },
};
setTimeout(button.click, 1000); // undefined (this lost)
setTimeout(button.click.bind(button), 1000); // Click

// ❌ Mistake 4: var shadowing let/const
function testShadow() {
  let x = 10;
  {
    // var x = 20; // SyntaxError (illegal shadowing)
  }
}

// ❌ Mistake 5: Misusing closures → memory leaks
function bigClosure() {
  let hugeData = new Array(1000000).fill("data");
  return function () {
    console.log("Still holding hugeData");
  };
}
let leak = bigClosure(); // hugeData stays in memory until leak=null
