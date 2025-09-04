/* 
===========================================================
📘 JavaScript Notes: Strict Mode, TDZ, Global Objects, == vs ===
===========================================================
Topics covered:
1) Strict Mode ('use strict')
2) Temporal Dead Zone (TDZ)
3) Shortest JS program / Hello World variations
4) Global object differences: window, global, globalThis
5) Comparison quirks (== vs ===)
===========================================================
*/

/* 
-----------------------------------------------------------
1) Strict Mode ('use strict')
-----------------------------------------------------------
🔹 Introduced in ES5
🔹 Makes JavaScript "safer" by:
   ✔ Preventing accidental globals
   ✔ Throwing errors for silent mistakes
   ✔ Restricting some features for cleaner code

👉 Activate by adding: "use strict"; at the top of file or function
*/

"use strict"; // activates strict mode for this file

// Example 1: Accidental globals
function sloppyMode() {
  x = 10; // ❌ without strict, this becomes global variable
  console.log(x);
}
// sloppyMode(); // ReferenceError in strict mode

// Example 2: Duplicates not allowed
// function bad(a, a) { return a + a; } // ❌ Error in strict mode

// Example 3: Safer 'this'
function showThis() {
  console.log(this);
}
showThis(); // ❌ undefined in strict mode (instead of window)

/* 
-----------------------------------------------------------
2) Temporal Dead Zone (TDZ)
-----------------------------------------------------------
🔹 The "time" between entering scope and variable initialization.
🔹 Variables declared with `let` and `const` exist in TDZ until assigned.
🔹 Accessing them before initialization → ReferenceError
*/

function tdzExample() {
  // console.log(a); // ❌ ReferenceError (TDZ)
  let a = 5;
  console.log(a); // ✅ works after initialization
}
tdzExample();

{
  // console.log(b); // ❌ TDZ
  const b = 42;
  console.log(b); // ✅ 42
}

/* 
-----------------------------------------------------------
3) Shortest JS program / Hello World
-----------------------------------------------------------
👉 Shortest valid JS program = empty file (it runs, does nothing)
👉 But for Hello World:
*/

// Browser:
console.log("Hello World"); // ✅ classic way
alert("Hello World"); // ✅ browser popup

// HTML inline:
// <script>alert("Hello World")</script>

// Node.js (terminal):
console.log("Hello World");

/* 
-----------------------------------------------------------
4) Global Object differences
-----------------------------------------------------------
🔹 Global object = the "top-level" object for the environment.
- Browser → window
- Node.js → global
- Universal (ES2020) → globalThis

Examples:
*/

// In browser:
// console.log(window === this); // ✅ true (non-strict)
// console.log(window.alert === alert); // ✅ true

// In Node.js:
// console.log(global.setTimeout === setTimeout); // ✅ true

// Universal way (works everywhere)
console.log(globalThis.setTimeout === setTimeout); // ✅ true

/* 
-----------------------------------------------------------
5) Comparison quirks (== vs ===)
-----------------------------------------------------------
🔹 == (loose equality)
   - Converts types before comparison
   - "Type coercion"
🔹 === (strict equality)
   - Compares both value & type
   - Safer and predictable

Examples:
*/

console.log(2 == "2"); // ✅ true (string "2" → number 2)
console.log(2 === "2"); // ❌ false (different types)

console.log(null == undefined); // ✅ true (special case)
console.log(null === undefined); // ❌ false (different types)

console.log(0 == false); // ✅ true (false → 0)
console.log(0 === false); // ❌ false (number vs boolean)

console.log("" == 0); // ✅ true ("" → 0)
console.log("" === 0); // ❌ false

console.log([1, 2] == "1,2"); // ✅ true (array → string)
//console.log([1, 2] === "1,2"); // ❌ false

/* 
-----------------------------------------------------------
Cheat Sheet
-----------------------------------------------------------
✔ 'use strict' → safer, prevents sloppy coding
✔ TDZ → variables exist but not accessible until initialized
✔ Shortest program = empty file, Hello World = console.log
✔ Global objects:
   - Browser = window
   - Node.js = global
   - Universal = globalThis
✔ == does type conversion, === does strict check
-----------------------------------------------------------
*/

/* 
-----------------------------------------------------------
Practice Questions
-----------------------------------------------------------

Q1) What happens if you assign a variable without declaring it in strict mode?
Answer: Throws ReferenceError (no accidental globals allowed).

-----------------------------------------------------------

Q2) What is Temporal Dead Zone (TDZ)?
Answer: The period between variable scope creation and initialization 
         where `let` and `const` cannot be accessed.

-----------------------------------------------------------

Q3) What is the shortest valid JS program?
Answer: Empty file.

-----------------------------------------------------------

Q4) Compare `==` and `===` for 0 and false.
Answer:
0 == false → true
0 === false → false

-----------------------------------------------------------

Q5) Which global object works everywhere?
Answer: globalThis (introduced ES2020).
-----------------------------------------------------------
*/
