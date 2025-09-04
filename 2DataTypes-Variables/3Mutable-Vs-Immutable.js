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
