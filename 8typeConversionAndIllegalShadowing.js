// ---------------------------------------------------------
// 📘 JavaScript Notes: + vs - Coercion & Illegal Shadowing
// ---------------------------------------------------------

/* 
===========================================================
PART 1 — Why "5" + 2 === "52"  and  "5" - 2 === 3
===========================================================

The + operator in JS has TWO meanings:
  1) Numeric addition
  2) String concatenation

Which one happens? 
- If EITHER operand is a string (or becomes a string during conversion),
  + performs STRING CONCATENATION.
- Otherwise, it performs NUMERIC ADDITION.

The - operator ONLY does numeric subtraction.
- It converts both operands to numbers (using ToNumber) and subtracts.
*/

/* 
-----------------------------------------------------------
Detailed Steps: "5" + 2
-----------------------------------------------------------
*/
console.log("5" + 2); // "52"
// 1) Left operand is "5" (a string).
// 2) Because one operand is a string, + means string concatenation.
// 3) 2 is converted to "2".
// 4) "5" + "2" → "52"

/* 
-----------------------------------------------------------
Detailed Steps: "5" - 2
-----------------------------------------------------------
*/
console.log("5" - 2); // 3
// 1) - operator always numeric.
// 2) ToNumber("5") → 5, ToNumber(2) → 2.
// 3) 5 - 2 = 3

/* 
-----------------------------------------------------------
More coercion examples (to build intuition)
-----------------------------------------------------------
*/
console.log("5" + true); // "5true"
console.log("5" - true); // 4
console.log("5" + null); // "5null"
console.log("5" - null); // 5
console.log("5" + undefined); // "5undefined"
console.log("5" - undefined); // NaN
console.log("5" * "2"); // 10
console.log([] + 1); // "1"
console.log([] - 1); // -1
console.log([1, 2] + 3); // "1,23"
console.log([1, 2] - 1); // NaN
console.log({} + "x"); // "[object Object]x"
console.log(1 + {}); // "1[object Object]"

/* 
===========================================================
REFERENCE TABLE — Type Conversions in JavaScript
===========================================================
*/

/* 
--- ToNumber conversions ---
undefined   → NaN
null        → 0
true        → 1
false       → 0
"" (empty)  → 0
"123"       → 123
"123abc"    → NaN   (cannot parse fully as a number)
[] (empty)  → 0     ([] → "" → 0)
[99]        → 99    ([99] → "99" → 99)
[1,2]       → NaN   ("1,2" → NaN)
{}          → NaN   (object cannot convert to number by default)

--- ToString conversions ---
undefined   → "undefined"
null        → "null"
true        → "true"
false       → "false"
123         → "123"
[] (empty)  → ""    (empty array joins to empty string)
[1,2]       → "1,2"
{}          → "[object Object]"
*/

console.log(Number(undefined)); // NaN
console.log(Number(null)); // 0
console.log(Number(true)); // 1
console.log(Number(false)); // 0
console.log(Number("123")); // 123
console.log(Number("123abc")); // NaN
console.log(Number([])); // 0
console.log(Number([99])); // 99
console.log(Number([1, 2])); // NaN
console.log(Number({})); // NaN

console.log(String(undefined)); // "undefined"
console.log(String(null)); // "null"
console.log(String(true)); // "true"
console.log(String(false)); // "false"
console.log(String(123)); // "123"
console.log(String([])); // ""
console.log(String([1, 2])); // "1,2"
console.log(String({})); // "[object Object]"

/* 
===========================================================
PART 2 — Illegal Shadowing
===========================================================
*/

("use strict"); // good practice for catching errors

/* Legal shadowing (different scopes) */
var A = 1;
{
  let A = 2; // ✅ block scope shadows outer
  console.log("inner A:", A); // 2
}
console.log("outer A:", A); // 1

/* Illegal shadowing examples */

// let C = 1;
// var C = 2; // ❌ SyntaxError: Identifier 'C' has already been declared

// function test1() {
//   var D = 1;
//   let D = 2; // ❌ not allowed in the same function scope
// }

// let E = 1;
// {
//   var E = 2; // ❌ var hoists, collides with outer let
// }

// let F = 1;
// let F = 2;   // ❌ redeclaration in same scope

// function t(P) {
//   let P = 2; // ❌ param and let in same scope conflict
// }

/* Legal shadowing examples */
let city = "Paris";
{
  let city = "Delhi"; // ✅ allowed in different scope
  console.log(city); // "Delhi"
}
console.log(city); // "Paris"

/* 
===========================================================
Cheat Sheet
===========================================================
+ operator:
  - If either operand is a string → concatenation
  - Otherwise → numeric addition

- operator:
  - Always numeric, converts operands to Number

Common ToNumber conversions:
  true → 1, false → 0, null → 0, undefined → NaN, "" → 0

Illegal shadowing:
  - var hoists to global/function scope → can collide with let/const
  - Redeclaring let/const in the same scope is illegal
  - Shadowing across different scopes is legal
*/

/* 
===========================================================
Practice — Predict the output
===========================================================
*/
console.log("7" + 3); // "73"
console.log("7" - 3); // 4
console.log(true + 2); // 3
console.log(false + "2"); // "false2"
console.log(null + 1); // 1
console.log(undefined + 1); // NaN
