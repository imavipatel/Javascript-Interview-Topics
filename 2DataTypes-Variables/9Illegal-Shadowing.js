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
