// ============================================================================
// 4) 📘 Advanced JS – JSON Handling
// ============================================================================
//
// Topics covered:
// 1) JSON.parse()
// 2) JSON.stringify()
//
// -----------------------------------------------------------------------------

// ============================================================================
// 1) JSON.parse()
// ============================================================================
// - Converts **JSON string** into a **JavaScript object**.
// - Useful when fetching JSON from APIs or reading local storage.
// - Must have valid JSON format: keys in double quotes.

let jsonString = '{"name":"Avi","age":25,"skills":["JS","React"]}';
let obj = JSON.parse(jsonString);

console.log(obj.name); // Avi
console.log(obj.age); // 25
console.log(obj.skills); // ["JS","React"]

// ✅ Notes:
// - Throws SyntaxError if JSON is invalid
// - Can use a **reviver function** to transform values while parsing:

let obj2 = JSON.parse(jsonString, (key, value) => {
  if (key === "age") return value + 1; // increment age
  return value;
});
console.log(obj2.age); // 26

// ============================================================================
// 2) JSON.stringify()
// ============================================================================
// - Converts **JavaScript object** into **JSON string**.
// - Useful to send data to APIs or store in localStorage.

let person = {
  name: "Ravi",
  age: 30,
  skills: ["HTML", "CSS", "JS"],
};

let jsonStr = JSON.stringify(person);
console.log(jsonStr);
// {"name":"Ravi","age":30,"skills":["HTML","CSS","JS"]}

// ✅ Notes:
// - Can pass **replacer array or function** to filter properties:

let jsonFiltered = JSON.stringify(person, ["name", "skills"]);
console.log(jsonFiltered);
// {"name":"Ravi","skills":["HTML","CSS","JS"]}

// - Can also use **space argument** for pretty-print:

let prettyJSON = JSON.stringify(person, null, 2);
console.log(prettyJSON);
/*
{
  "name": "Ravi",
  "age": 30,
  "skills": [
    "HTML",
    "CSS",
    "JS"
  ]
}
*/

// ============================================================================
// 🔑 Key Points Summary
// ============================================================================
// 1) JSON.parse() → JSON string → JS object
// 2) JSON.stringify() → JS object → JSON string
// 3) JSON format requires double quotes for keys and string values
// 4) Reviver (parse) and Replacer (stringify) allow transformation or filtering
// 5) Useful for API data exchange, localStorage, and saving config

// ============================================================================
// ❓ Q & A
// ============================================================================
// Q1) What happens if JSON.parse() receives invalid JSON?
// 👉 Throws SyntaxError.
//
// Q2) Can JSON.stringify() convert functions?
// 👉 No, functions and undefined are ignored.
//
// Q3) Why use JSON.stringify() with space argument?
// 👉 For pretty-printing JSON (better readability).
//
// Q4) What is the difference between JSON and JS object?
// 👉 JSON is a string format; JS object is an in-memory object.
//
// Q5) Can JSON.parse() revive values automatically?
// 👉 Only if you provide a reviver function to transform values.
