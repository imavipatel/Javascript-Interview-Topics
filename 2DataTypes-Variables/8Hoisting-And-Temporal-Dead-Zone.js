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
