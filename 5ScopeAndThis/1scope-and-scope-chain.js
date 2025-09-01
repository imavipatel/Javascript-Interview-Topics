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
