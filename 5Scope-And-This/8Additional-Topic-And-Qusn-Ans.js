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
