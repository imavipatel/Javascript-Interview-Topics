/*  
=====================================================
📘 String Methods in JavaScript (Full Notes)
=====================================================

🔹 THEORY
- Strings in JS are **immutable** → once created, cannot be changed.
- String methods return **new strings** (do not modify original).
- Common methods help with accessing, extracting, replacing, searching, and formatting strings.

=====================================================
⭐ METHODS COVERED
- charAt(), slice(), substring(), replace(), match(), includes(),
  startsWith(), endsWith(), repeat(), padStart(), padEnd()
- trim(), trimStart(), trimEnd(), split(), concat(), toUpperCase(), toLowerCase()
- indexOf(), lastIndexOf(), search()
=====================================================
*/

// --------------------------------------------------
// 🔹 charAt(index)
// Returns the character at the given index
// --------------------------------------------------
const str1 = "JavaScript";
console.log(str1.charAt(0)); // "J"
console.log(str1.charAt(4)); // "S"
console.log(str1.charAt(20)); // "" (empty string if index out of range)

// --------------------------------------------------
// 🔹 slice(start, end)
// Extracts part of string → supports negative indices
// --------------------------------------------------
const str2 = "Hello World";
console.log(str2.slice(0, 5)); // "Hello"
console.log(str2.slice(6)); // "World"
console.log(str2.slice(-5)); // "World"

// --------------------------------------------------
// 🔹 substring(start, end)
// Similar to slice, but negative values = 0
// --------------------------------------------------
console.log(str2.substring(0, 5)); // "Hello"
console.log(str2.substring(6)); // "World"
console.log(str2.substring(-5, 5)); // "Hello" (negative = 0)

// --------------------------------------------------
// 🔹 replace(search, replaceValue)
// Replaces first occurrence (use regex with /g for all)
// --------------------------------------------------
const str3 = "I like JavaScript. JavaScript is fun!";
console.log(str3.replace("JavaScript", "JS"));
// "I like JS. JavaScript is fun!"
console.log(str3.replace(/JavaScript/g, "JS"));
// "I like JS. JS is fun!"

// --------------------------------------------------
// 🔹 match(regex)
// Returns array of matches
// --------------------------------------------------
const str4 = "abc123xyz456";
console.log(str4.match(/\d+/g)); // ["123", "456"]
console.log(str4.match(/[a-z]+/g)); // ["abc", "xyz"]

// --------------------------------------------------
// 🔹 includes(substring)
// Checks if substring exists → returns true/false
// --------------------------------------------------
const str5 = "Hello World";
console.log(str5.includes("Hello")); // true
console.log(str5.includes("hey")); // false

// --------------------------------------------------
// 🔹 startsWith(prefix)
// Checks if string starts with given text
// --------------------------------------------------
console.log(str5.startsWith("Hello")); // true
console.log(str5.startsWith("World")); // false

// --------------------------------------------------
// 🔹 endsWith(suffix)
// Checks if string ends with given text
// --------------------------------------------------
console.log(str5.endsWith("World")); // true
console.log(str5.endsWith("Hello")); // false

// --------------------------------------------------
// 🔹 repeat(count)
// Repeats string count times
// --------------------------------------------------
const str6 = "Ha!";
console.log(str6.repeat(3)); // "Ha!Ha!Ha!"

// --------------------------------------------------
// 🔹 padStart(targetLength, padString)
// Pads string at the start until length is met
// --------------------------------------------------
const str7 = "5";
console.log(str7.padStart(3, "0")); // "005"
console.log(str7.padStart(5, "*")); // "****5"

// --------------------------------------------------
// 🔹 padEnd(targetLength, padString)
// Pads string at the end until length is met
// --------------------------------------------------
console.log(str7.padEnd(3, "0")); // "500"
console.log(str7.padEnd(5, "-")); // "5----"

// --------------------------------------------------
// 🔹 trim()
// Removes whitespace from both ends
// --------------------------------------------------
const str8 = "   Hello JS   ";
console.log(str8.trim()); // "Hello JS"

// --------------------------------------------------
// 🔹 trimStart() / trimEnd()
// Removes whitespace from start or end
// --------------------------------------------------
console.log(str8.trimStart()); // "Hello JS   "
console.log(str8.trimEnd()); // "   Hello JS"

// --------------------------------------------------
// 🔹 split(separator)
// Splits string into array
// --------------------------------------------------
const str9 = "apple,banana,cherry";
console.log(str9.split(",")); // ["apple", "banana", "cherry"]
console.log(str9.split("")); // ["a","p","p","l","e",...]

// --------------------------------------------------
// 🔹 concat(str)
// Joins two or more strings
// --------------------------------------------------
const s1 = "Hello";
const s2 = "World";
console.log(s1.concat(" ", s2)); // "Hello World"

// --------------------------------------------------
// 🔹 toUpperCase() / toLowerCase()
// Converts string case
// --------------------------------------------------
const str10 = "JavaScript";
console.log(str10.toUpperCase()); // "JAVASCRIPT"
console.log(str10.toLowerCase()); // "javascript"

// --------------------------------------------------
// 🔹 indexOf(substring)
// Returns index of first occurrence (or -1)
// --------------------------------------------------
const str11 = "Hello World";
console.log(str11.indexOf("World")); // 6
console.log(str11.indexOf("JS")); // -1

// --------------------------------------------------
// 🔹 lastIndexOf(substring)
// Returns index of last occurrence
// --------------------------------------------------
const str12 = "Hello Hello World";
console.log(str12.lastIndexOf("Hello")); // 6

// --------------------------------------------------
// 🔹 search(regex)
// Searches using regex (returns first index or -1)
// --------------------------------------------------
const str13 = "Learn JavaScript now!";
console.log(str13.search(/JavaScript/)); // 6
console.log(str13.search(/Python/)); // -1

/*  
-----------------------------------------------------
❓ Q&A (Interview Style)
-----------------------------------------------------

Q1: Difference between slice() and substring()?  
👉 - `slice()` supports negative indices.  
   - `substring()` treats negatives as 0.  

Q2: Does replace() modify original string?  
👉 No, strings are immutable → it returns a new string.  

Q3: How to replace all occurrences in a string?  
👉 Use regex with `g` flag → `str.replace(/word/g, "new")`.  

Q4: Difference between trim(), trimStart(), trimEnd()?  
👉 - `trim()` removes spaces from both ends.  
   - `trimStart()` → start only.  
   - `trimEnd()` → end only.  

Q5: Difference between indexOf() and search()?  
👉 - `indexOf()` works with plain substrings.  
   - `search()` works with regex.  

Q6: When to use padStart/padEnd?  
👉 Useful for formatting (e.g., `"5".padStart(2,"0")` → `"05"`).  

Q7: Does toUpperCase() modify string?  
👉 No, it returns a new string (original remains same).  

-----------------------------------------------------
📊 QUICK REVISION
- charAt → get character
- slice / substring → extract part
- replace → replace substring
- match → regex match
- includes → check substring
- startsWith / endsWith → prefix/suffix
- repeat → duplicate string
- padStart / padEnd → format padding
- trim / trimStart / trimEnd → remove spaces
- split → string → array
- concat → join strings
- toUpperCase / toLowerCase → change case
- indexOf / lastIndexOf → find positions
- search → regex search
=====================================================
*/
