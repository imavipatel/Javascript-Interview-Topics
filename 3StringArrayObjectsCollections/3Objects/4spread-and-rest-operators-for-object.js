/*  
=====================================================
📘 Spread & Rest Operators for Objects
=====================================================

🔹 THEORY:
- Spread (`...`) is used to **expand** object properties into another object.
- Rest (`...`) is used to **collect** remaining properties into a new object.
- Both are very useful for cloning, merging, and destructuring objects.
- ⚠️ Important: They only do a **shallow copy** (nested objects remain referenced).

-----------------------------------------------------
🔹 SPREAD OPERATOR (expands object)
-----------------------------------------------------
*/

// Example 1: Cloning an object
const obj1 = { a: 1, b: 2 };
const clone = { ...obj1 };
console.log(clone); // { a: 1, b: 2 }

// Example 2: Merging two objects
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 2, c: 3, d: 4 }

// Example 3: Overriding properties
const overridden = { ...obj1, b: 99 };
console.log(overridden); // { a: 1, b: 99 }

// Example 4: Shallow copy issue
const nested = { x: { y: 10 } };
const shallowCopy = { ...nested };
shallowCopy.x.y = 20;
console.log(nested.x.y); // 20 ❌ (because it's still referencing same object)
/*
-----------------------------------------------------
🔹 REST OPERATOR (collects properties)
-----------------------------------------------------
*/

const user = { id: 1, name: "Alice", age: 25, country: "India" };

// Example 1: Extract specific properties & collect rest
const { name, ...rest } = user;
console.log(name); // "Alice"
console.log(rest); // { id: 1, age: 25, country: "India" }

// Example 2: Rest in function parameters
function printUser({ name, ...other }) {
  console.log(name); // Alice
  console.log(other); // { id: 1, age: 25, country: "India" }
}
printUser(user);
/*
-----------------------------------------------------
❓ Q&A
-----------------------------------------------------

Q1: What is the difference between spread and rest in objects?  
👉 Spread expands object properties, Rest collects remaining properties.

Q2: Is object spread a deep copy?  
👉 No, it’s a shallow copy. Nested objects remain linked.

Q3: Can we use spread & rest together?  
👉 Yes! Example:  
   const { a, ...rest } = { a:1, b:2, c:3 };  
   const newObj = { ...rest, d:4 };  
   console.log(newObj); // { b:2, c:3, d:4 }

-----------------------------------------------------
⭐ QUICK SUMMARY
- Spread (`...obj`) → Clones/merges object properties
- Rest (`...rest`)  → Collects remaining properties in destructuring
- Both perform SHALLOW copy
=====================================================
*/
