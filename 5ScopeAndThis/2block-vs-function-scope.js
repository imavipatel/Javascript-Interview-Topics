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
