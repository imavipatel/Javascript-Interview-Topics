/* 
===========================================================
📘 JavaScript Notes: ECMAScript & ES6+ Features
===========================================================
Topics covered:
1) ECMAScript & ES6+ overview
2) let / const / block scope
3) Arrow functions (why introduced, when to use, when not)
4) Template literals & tagged templates
5) Destructuring assignment
6) Modules (import/export)
7) Optional chaining ?. & nullish coalescing ??
===========================================================
*/

/* 
-----------------------------------------------------------
1) ECMAScript & ES6+ Overview
-----------------------------------------------------------
🔹 ECMAScript (ES) = the specification that defines JavaScript.
- Different versions: ES5 (2009), ES6/ES2015 (major update), then yearly updates.
- ES6+ refers to ES2015 and all features after it.

Why ES6 was big:
✔ Block scoping (let, const)
✔ Arrow functions
✔ Template literals
✔ Destructuring
✔ Default parameters
✔ Modules
✔ Promises, async/await
✔ Classes, etc.
*/

/* 
-----------------------------------------------------------
2) let / const / Block Scope
-----------------------------------------------------------
🔹 var = function-scoped, hoisted, allows redeclaration
🔹 let = block-scoped, hoisted but in TDZ (Temporal Dead Zone)
🔹 const = block-scoped, must be initialized, cannot be reassigned

Example:
*/

function varExample() {
  if (true) {
    var x = 10; // function-scoped
  }
  console.log(x); // 10 (x is still accessible outside block)
}
varExample();

function letConstExample() {
  if (true) {
    let y = 20; // block-scoped
    const z = 30; // block-scoped
    console.log(y, z); // 20 30
  }
  // console.log(y); // ❌ ReferenceError
}
letConstExample();

// const object/array = contents can change, but reference cannot
const person = { name: "Alice" };
person.name = "Bob"; // ✅ allowed
// person = {}; // ❌ not allowed

/* 
-----------------------------------------------------------
3) Arrow Functions
-----------------------------------------------------------
🔹 Shorter syntax for functions
🔹 Lexical `this` (does not create its own this)
🔹 Great for callbacks & inline functions

WHY introduced in ES6?
----------------------------------
- Before ES6, writing functions was long (function keyword everywhere).
- "this" keyword was confusing in callbacks (lost context).
- Arrow functions solved:
  ✔ Cleaner, shorter code
  ✔ "this" is inherited (lexical scope)

Example:
*/

// Regular function
function add(a, b) {
  return a + b;
}

// Arrow function
const addArrow = (a, b) => a + b;

console.log(add(2, 3), addArrow(2, 3)); // 5 5

/* 
When to USE Arrow Functions ✅
----------------------------------
1) When you want shorter syntax
2) For small one-line functions
3) For callbacks (map, filter, forEach, setTimeout)
4) When you want `this` to be inherited from outer scope
*/

const nums = [1, 2, 3, 4];
const doubled = nums.map((n) => n * 2);
console.log(doubled); // [2,4,6,8]

// Arrow keeps `this` from parent
const obj = {
  value: 42,
  arrow: function () {
    setTimeout(() => {
      console.log("Arrow this:", this.value); // ✅ 42
    }, 500);
  },
};
obj.arrow();

/* 
When NOT to use Arrow Functions ❌
----------------------------------
1) When you need your own `this` (methods in objects/classes)
2) When using as a constructor function (cannot use with `new`)
3) When you need `arguments` object (arrow functions don’t have it)
*/

// ❌ Arrow as method
const user = {
  name: "Alice",
  sayHi: () => {
    console.log("Hi, I'm " + this.name);
    // ❌ undefined (this = outer scope, not user)
  },
};
user.sayHi();

// ✅ Use regular function for methods
const user2 = {
  name: "Bob",
  sayHi() {
    console.log("Hi, I'm " + this.name);
  },
};
user2.sayHi(); // "Hi, I'm Bob"

// ❌ Arrow cannot be a constructor
const Person = (name) => {
  this.name = name;
};
// let p = new Person("Sam"); // ❌ Error: Person is not a constructor

// ✅ Use regular function
function PersonFn(name) {
  this.name = name;
}
let p = new PersonFn("Sam");
console.log(p.name); // "Sam"

// ❌ Arrow has no arguments object
const testArgs = () => {
  console.log(arguments); // ❌ ReferenceError
};
// testArgs(1,2,3);

function normalArgs() {
  console.log(arguments); // ✅ [1,2,3]
}
normalArgs(1, 2, 3);

/* 
-----------------------------------------------------------
4) Template Literals & Tagged Templates
-----------------------------------------------------------
🔹 Template literals = backticks (` `) for strings
- Allow interpolation → ${expression}
- Allow multi-line strings

Example:
*/

let name = "Sam";
let age = 25;

let intro = `My name is ${name}, I am ${age} years old.`;
console.log(intro);

let multiLine = `This is
a multi-line
string.`;
console.log(multiLine);

// Tagged Templates: function to process template literals
function tag(strings, ...values) {
  console.log("Strings:", strings);
  console.log("Values:", values);
  return strings[0] + values[0].toUpperCase();
}

let result = tag`Hello ${name}!`;
console.log(result); // "Hello SAM!"

/* 
-----------------------------------------------------------
5) Destructuring Assignment
-----------------------------------------------------------
🔹 Extract values from arrays/objects into variables easily.

Array Destructuring:
*/
const numsArr = [1, 2, 3];
const [first, second] = numsArr;
console.log(first, second); // 1 2

// Skipping
const [, , third] = numsArr;
console.log(third); // 3

// Default value
const [x, y, z = 100] = [10, 20];
console.log(z); // 100

// Object Destructuring
const userObj = { id: 1, username: "alice", age: 22 };
const { username, age: userAge } = userObj;
console.log(username, userAge); // "alice" 22

// Nested Destructuring
const person2 = {
  name: "Tom",
  address: { city: "NY", zip: 12345 },
};
const {
  address: { city },
} = person2;
console.log(city); // "NY"

/* 
-----------------------------------------------------------
6) Modules (import / export)
-----------------------------------------------------------
🔹 ES6 Modules → split code into files
- export: share variables/functions
- import: bring them into other files

Example: (in separate files)

// file: math.js
export const add = (a, b) => a + b;
export const sub = (a, b) => a - b;

// file: app.js
import { add, sub } from "./math.js";
console.log(add(2,3)); // 5
console.log(sub(5,3)); // 2

// Default export
// file: greet.js
export default function greet(name) {
  console.log("Hello", name);
}

// file: app.js
import greet from "./greet.js";
greet("Sam"); // Hello Sam
*/

/* 
-----------------------------------------------------------
7) Optional Chaining ?. & Nullish Coalescing ??
-----------------------------------------------------------
🔹 Optional Chaining (?.)
- Safely access nested properties without errors
- If property doesn’t exist → returns undefined instead of crashing

Example:
*/
const userData = { profile: { name: "Alice" } };
console.log(userData.profile?.name); // "Alice"
console.log(userData.profile?.age); // undefined
// console.log(userData.profile.age); // ❌ would crash if profile was null

/* 
🔹 Nullish Coalescing (??)
- Provides a default value ONLY if the left side is null or undefined
- Different from || (which also treats 0, "", false as falsy)

Example:
*/
let a = null;
let b = 0;

console.log(a ?? "Default"); // "Default" (null → fallback)
console.log(b ?? "Default"); // 0 (0 is NOT null/undefined)

console.log(b || "Default"); // "Default" (|| treats 0 as falsy)

/* 
===========================================================
Quick Cheat Sheet
===========================================================
✔ ES6 = major JS update (2015) + yearly additions
✔ let / const = block-scoped
✔ Arrow functions = shorter, lexical this
   → ✅ use for callbacks, one-liners, inherited this
   → ❌ avoid for methods, constructors, arguments
✔ Template literals = backticks, ${}, multi-line
✔ Tagged templates = custom string processing
✔ Destructuring = extract from arrays/objects
✔ Modules = export/import
✔ Optional chaining (?.) = safe property access
✔ Nullish coalescing (??) = default only for null/undefined
===========================================================
*/

/* 
Practice Questions
-----------------------------------------------------------
1) What’s the output?
let a;
console.log(a ?? "default");

Answer: "default" (a is undefined)

-----------------------------------------------------------
2) Fix this:
const arr = [1, 2];
const [x, y, z] = arr;
console.log(z);

Answer: z = undefined. To fix, give default → const [x, y, z=10] = arr;

-----------------------------------------------------------
3) Why does this fail?
const obj = {};
console.log(obj.details.name);

Answer: ❌ TypeError. Use optional chaining → obj.details?.name;

-----------------------------------------------------------
4) Why shouldn’t we use arrow functions as methods in objects?

Answer: Because arrow functions don’t have their own `this`, they inherit from outer scope.
-----------------------------------------------------------
*/
