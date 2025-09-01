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
