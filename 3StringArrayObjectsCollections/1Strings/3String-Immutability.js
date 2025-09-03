/*  
===========================================
📘 String Immutability in JavaScript
===========================================

🔹 THEORY  
1. Strings in JavaScript are **immutable**.  
   - Once created, their value **cannot be changed**.  
   - Any operation that seems to "modify" a string actually **creates a new string**.  

2. Why?  
   - Strings are stored in memory as a fixed sequence of characters.  
   - Changing them directly would break references in multiple places.  
   - So JS ensures safety and consistency by making them immutable.  

3. Implications:  
   - String operations (replace, slice, concat, etc.) **return a new string**.  
   - The original string always remains unchanged.  

===========================================
*/

// --------------------------------------------------
// 🔹 Example 1: Modifying characters directly
// --------------------------------------------------
let str = "Hello";
str[0] = "Y"; // Trying to change "H" → "Y"
console.log(str); // "Hello" (unchanged)

// --------------------------------------------------
// 🔹 Example 2: Reassigning is different
// --------------------------------------------------
let greeting = "Hi";
greeting = "Hello"; // Creates a NEW string and reassigns
console.log(greeting); // "Hello"

// --------------------------------------------------
// 🔹 Example 3: Using string methods
// --------------------------------------------------
let text = "JavaScript";

let upper = text.toUpperCase();
console.log(upper); // "JAVASCRIPT"
console.log(text); // "JavaScript" (original unchanged)

let replaced = text.replace("Java", "Type");
console.log(replaced); // "TypeScript"
console.log(text); // "JavaScript" (still unchanged)

// --------------------------------------------------
// 🔹 Example 4: Concatenation
// --------------------------------------------------
let first = "Hello";
let second = first + " World";
console.log(second); // "Hello World"
console.log(first); // "Hello" (unchanged)

// --------------------------------------------------
// 🔹 Workaround: If you need "mutable-like" strings
// --------------------------------------------------
// Use arrays to manipulate characters
let mutableString = "Hello".split(""); // ["H","e","l","l","o"]
mutableString[0] = "Y";
let newString = mutableString.join("");
console.log(newString); // "Yello"

/*  
-----------------------------------------------------
❓ Q&A (Interview Style)
-----------------------------------------------------

Q1: Are strings in JavaScript mutable or immutable?  
👉 Strings are immutable — once created, they cannot be changed.

Q2: If I modify `str[0]`, will it change the string?  
👉 No. Strings don’t allow character-level mutation. It stays the same.

Q3: How can I "change" a string in JS then?  
👉 You can create a **new string** using concatenation, slice, replace, etc.  
   Example: `str = str.replace("a","b")`.

Q4: Why are strings immutable in JS?  
👉 For performance and security reasons. If strings were mutable, it would cause unexpected behavior when the same string is shared in multiple variables.

Q5: How do I emulate mutable strings?  
👉 Convert the string into an array of characters (`split`), modify it, then join it back.

-----------------------------------------------------
📊 QUICK REVISION
- Strings in JS are immutable.  
- Modifying characters directly doesn’t work.  
- String methods (replace, slice, concat, etc.) return **new strings**.  
- Use arrays if you want to manipulate characters.  
===========================================
*/
