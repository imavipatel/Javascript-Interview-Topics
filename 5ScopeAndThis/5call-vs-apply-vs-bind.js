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
