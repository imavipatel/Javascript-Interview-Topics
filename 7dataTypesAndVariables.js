/* 
===========================================================
📘 JavaScript Notes: Data Types & Variables
===========================================================
Topics Covered:
1) Primitive vs Non-Primitive Types
2) Symbol datatype
3) Mutable vs Immutable
4) let / const / var
5) undefined vs null vs not defined
6) Truthy & Falsy values
7) Type Coercion vs Type Conversion
8) Hoisting & Temporal Dead Zone
9) Illegal Shadowing
10) Additional Topics:
   - typeof vs instanceof
   - NaN, Infinity, -Infinity
   - BigInt introduction
   - Spread & Rest Operators
   - Destructuring (nested objects/arrays)
===========================================================
*/

/* 
-----------------------------------------------------------
1) Primitive vs Non-Primitive Types
-----------------------------------------------------------
🔹 Primitive Types → stored by VALUE (immutable)
   - Number, String, Boolean, Null, Undefined, Symbol, BigInt
🔹 Non-Primitive (Reference) Types → stored by REFERENCE
   - Objects, Arrays, Functions
*/

let num = 42; // Number
let str = "Hello"; // String
let bool = true; // Boolean
let nothing = null; // Null
let notAssigned; // Undefined
let unique = Symbol(); // Symbol
let big = 9007199254740991n; // BigInt

let arr = [1, 2, 3]; // Array (object type)
let obj = { a: 1 }; // Object
function greet() {
  return "Hi";
} // Function

console.log(typeof num); // number
console.log(typeof obj); // object
console.log(typeof greet); // function (special object)

/* 
-----------------------------------------------------------
2) Symbol datatype
-----------------------------------------------------------
🔹 Introduced in ES6
🔹 Used to create unique identifiers
🔹 Even if symbols have the same description, they are unique
*/

let sym1 = Symbol("id");
let sym2 = Symbol("id");
console.log(sym1 === sym2); // false (always unique)

let user = {
  name: "Alice",
  [Symbol("id")]: 123,
};
console.log(user); // { name: 'Alice', [Symbol(id)]: 123 }

/* 
-----------------------------------------------------------
3) Mutable vs Immutable
-----------------------------------------------------------
🔹 Immutable → cannot be changed (primitives)
🔹 Mutable → can be changed (objects, arrays)
*/

let a = "hello";
a[0] = "H"; // ❌ doesn't work
console.log(a); // "hello" (string is immutable)

let person = { name: "Bob" };
person.name = "Charlie"; // ✅ allowed
console.log(person); // { name: "Charlie" }

/* 
-----------------------------------------------------------
4) let / const / var
-----------------------------------------------------------
- var → function-scoped, hoisted, can be redeclared
- let → block-scoped, hoisted but TDZ, cannot be redeclared
- const → block-scoped, must be initialized, cannot be reassigned
*/

function testVar() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10 (var leaks outside block)
}
testVar();

function testLet() {
  if (true) {
    let y = 20;
    console.log(y); // works here
  }
  // console.log(y); // ❌ ReferenceError
}
testLet();

/* 
-----------------------------------------------------------
5) undefined vs null vs not defined
-----------------------------------------------------------
- undefined → variable declared but not assigned
- null → intentional empty value
- not defined → variable never declared
*/

let u;
console.log(u); // undefined

let n = null;
console.log(n); // null

// console.log(z); // ❌ ReferenceError: z is not defined

/* 
-----------------------------------------------------------
6) Truthy & Falsy values
-----------------------------------------------------------
🔹 Falsy → false, 0, "", null, undefined, NaN
🔹 Everything else → truthy
*/

if ("hello") console.log("Truthy"); // ✅ runs
if (0) console.log("Falsy"); // ❌ doesn’t run

console.log(Boolean("hi")); // true
console.log(Boolean("")); // false

/* 
-----------------------------------------------------------
7) Type Coercion vs Type Conversion
-----------------------------------------------------------
- Type Conversion → explicit (you convert yourself)
- Type Coercion → implicit (JS converts automatically)
*/

console.log("5" + 2); // "52" (string concatenation → coercion)
console.log("5" - 2); // 3   (string converted to number)

let numStr = "123";
console.log(Number(numStr)); // 123 (explicit conversion)
console.log(String(123)); // "123"

/* 
-----------------------------------------------------------
8) Hoisting & Temporal Dead Zone
-----------------------------------------------------------
- Hoisting → variables/functions moved to top of scope
- var → hoisted (undefined)
- let/const → hoisted but in TDZ (not usable until declared)
*/

console.log(a); // undefined (var hoisted)
var a = 10;

// console.log(b); // ❌ ReferenceError (TDZ)
let b = 20;

/* 
-----------------------------------------------------------
9) Illegal Shadowing
-----------------------------------------------------------
🔹 Shadowing = re-declaring variable in inner scope
🔹 let/const cannot shadow var in same scope
*/

var x = 10;
{
  // let x = 20; // ❌ Illegal shadowing
}
{
  let y = 30; // ✅ different variable
}

/* 
-----------------------------------------------------------
10) Additional Topics
-----------------------------------------------------------
*/

// typeof vs instanceof
console.log(typeof 123); // number
console.log(typeof []); // object
console.log([] instanceof Array); // true
console.log({} instanceof Object); // true

// NaN, Infinity, -Infinity
console.log(0 / 0); // NaN
console.log(1 / 0); // Infinity
console.log(-1 / 0); // -Infinity

// BigInt
let bigNum = 123456789012345678901234567890n;
console.log(bigNum + 10n); // works only with BigInt

// Spread Operator
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5]; // copy + add
console.log(arr2); // [1,2,3,4,5]

// Rest Operator
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// Destructuring
let person2 = { name: "Alice", age: 25, city: "NY" };
let { name, age } = person2;
console.log(name, age); // Alice 25

let nested = { p: { q: { r: 10 } } };
let {
  p: {
    q: { r },
  },
} = nested;
console.log(r); // 10

let [first, , third] = [10, 20, 30];
console.log(first, third); // 10, 30

/* 
-----------------------------------------------------------
Cheat Sheet
-----------------------------------------------------------
✔ Primitive = immutable (number, string, boolean, null, undefined, symbol, bigint)
✔ Non-primitive = reference (array, object, function)
✔ Symbol = unique, ES6
✔ let/const/var differences:
   - var → function scoped
   - let → block scoped
   - const → block scoped + cannot reassign
✔ undefined (not assigned), null (empty), not defined (no variable)
✔ Falsy → false, 0, "", null, undefined, NaN
✔ == → type coercion, === → strict compare
✔ Hoisting: var = undefined, let/const = TDZ
✔ Illegal shadowing = cannot shadow var with let/const in same scope
✔ typeof → type check, instanceof → object check
✔ NaN (not a number), Infinity, -Infinity
✔ BigInt → handles huge numbers
✔ Spread = expand, Rest = gather
✔ Destructuring = extract values from arrays/objects
-----------------------------------------------------------
*/

/* 
-----------------------------------------------------------
Practice Questions
-----------------------------------------------------------

Q1) What’s the difference between primitive and non-primitive data types?
Q2) Why is Symbol always unique?
Q3) Is string mutable or immutable in JS? Why?
Q4) What’s the difference between let, const, and var?
Q5) Difference between undefined, null, and not defined?
Q6) List all falsy values in JS.
Q7) What’s the difference between type coercion and type conversion?
Q8) What is Temporal Dead Zone?
Q9) What is illegal shadowing? Give an example.
Q10) What is the result of:
    console.log([] == 0);  // ?
    console.log([] === 0); // ?
Q11) What is BigInt and when should we use it?
Q12) Difference between spread and rest operator with example.
Q13) Destructure this object: 
     const obj = { a: { b: { c: 5 } } };
     // extract c
-----------------------------------------------------------
*/

// ===============================================================
// 📘 JavaScript Interview Notes (Beginner-Friendly)
// ===============================================================

// ---------------------------------------------------------------
// Q1) Difference between Primitive and Non-Primitive Data Types
// ---------------------------------------------------------------
/*
Primitive Types:
 - Number, String, Boolean, Null, Undefined, Symbol, BigInt
 - Immutable (value cannot be changed once created)
 - Stored directly in stack memory (by value)

Non-Primitive Types:
 - Objects (arrays, functions, dates, etc.)
 - Mutable (can be changed/updated)
 - Stored in heap memory (reference stored in stack)
*/

let a = 10; // Primitive
let b1 = a;
b1 = 20;
console.log(a, b1); // 10, 20 (copy made)

let obj1 = { name: "Alice" }; // Non-Primitive
let obj2 = obj1;
obj2.name = "Bob";
console.log(obj1.name); // "Bob" (reference shared)

// ---------------------------------------------------------------
// Q2) Why is Symbol always unique?
// ---------------------------------------------------------------
/*
Symbol → introduced in ES6
 - Even if description is same, each symbol is unique.
 - Used to create unique object keys (avoids accidental override).
*/

let s1 = Symbol("id");
let s2 = Symbol("id");
console.log(s1 === s2); // false (always unique!)

// ---------------------------------------------------------------
// Q3) Is string mutable or immutable in JS? Why?
// ---------------------------------------------------------------
/*
Strings in JS are immutable:
 - You cannot change individual characters.
 - If you modify, a new string is created.
*/

let str1 = "hello";
str1[0] = "H"; // ❌ does nothing
console.log(str1); // "hello"

let newStr1 = str1.toUpperCase();
console.log(newStr1); // "HELLO" (new string created)

// ---------------------------------------------------------------
// Q4) Difference between let, const, and var
// ---------------------------------------------------------------
/*
var:
 - Function-scoped
 - Hoisted, initialized with undefined
 - Allows redeclaration

let:
 - Block-scoped
 - Hoisted but not initialized (TDZ)
 - No redeclaration in same scope

const:
 - Block-scoped
 - Must be initialized at declaration
 - Cannot be reassigned, but objects/arrays can mutate
*/

var x = 1;
let y = 2;
const z = 3;

// ---------------------------------------------------------------
// Q5) Difference between undefined, null, and not defined
// ---------------------------------------------------------------
/*
undefined → variable declared but not assigned
null      → intentional absence of value
not defined → variable never declared
*/

let u1;
console.log(u1); // undefined
let n1 = null;
console.log(n1); // null
// console.log(nope); // ❌ ReferenceError: nope is not defined

// ---------------------------------------------------------------
// Q6) List all falsy values in JS
// ---------------------------------------------------------------
/*
Falsy values:
 - false
 - 0, -0
 - "" (empty string)
 - null
 - undefined
 - NaN
Everything else is truthy.
*/

console.log(Boolean(0)); // false
console.log(Boolean("")); // false
console.log(Boolean(" ")); // true (non-empty string)
console.log(Boolean([])); // true
console.log(Boolean({})); // true

// ---------------------------------------------------------------
// Q7) Difference between type coercion and type conversion
// ---------------------------------------------------------------
/*
Type Conversion → Explicit (done by developer)
Type Coercion   → Implicit (done by JS engine)
*/

console.log(Number("123")); // 123 (conversion)
console.log(String(456)); // "456"

console.log("5" + 2); // "52" (coercion → string concat)
console.log("5" - 2); // 3   (coercion → number)

// ---------------------------------------------------------------
// Q8) What is Temporal Dead Zone (TDZ)?
// ---------------------------------------------------------------
/*
TDZ → Time between variable hoisting and actual initialization.
Accessing variable in TDZ causes ReferenceError.
*/

console.log(a1); // undefined
var a1 = 10;

// console.log(b1); // ❌ ReferenceError (TDZ)
// let b1 = 20;

// ---------------------------------------------------------------
// Q9) What is Illegal Shadowing? Give an example.
// ---------------------------------------------------------------
/*
Shadowing = declaring a variable with same name in inner scope.
Illegal when var tries to shadow let/const (or redeclare in same scope).
*/

let city = "Paris";
{
  // var city = "Delhi"; // ❌ Illegal shadowing
  let city = "Delhi"; // ✅ Allowed (block scope)
  console.log(city);
}
console.log(city);

// ---------------------------------------------------------------
// Q10) What is the result of:
//      console.log([] == 0);
//      console.log([] === 0);
// ---------------------------------------------------------------
/*
== → checks after coercion
[] → converted to "" (string), then to 0 when compared to number
=> [] == 0 → true

=== → checks without coercion (different types: object vs number)
=> [] === 0 → false
*/

console.log([] == 0); // true
// console.log([] === 0); // false

// ---------------------------------------------------------------
// Q11) What is BigInt and when should we use it?
// ---------------------------------------------------------------
/*
BigInt → introduced in ES2020
 - Used to represent numbers larger than Number.MAX_SAFE_INTEGER
 - Safe for working with huge integers (cryptography, finance, etc.)
*/

let big1 = 123456789012345678901234567890n;
console.log(big1 + 10n); // works

// ---------------------------------------------------------------
// Q12) Difference between spread and rest operator with example
// ---------------------------------------------------------------
/*
Spread (...) → expands values
Rest   (...) → collects values
*/

let arr3 = [1, 2, 3];
let arr4 = [...arr3, 4, 5]; // spread
console.log(arr4); // [1,2,3,4,5]

function sum(...nums) {
  // rest
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// ---------------------------------------------------------------
// Q13) Destructure this object
// ---------------------------------------------------------------
/*
const obj = { a: { b: { c: 5 } } };
extract c
*/

const obj2 = { a: { b: { c: 5 } } };
const {
  a: {
    b: { c },
  },
} = obj2;
console.log(c); // 5
