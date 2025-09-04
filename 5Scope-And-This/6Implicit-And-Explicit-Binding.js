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
