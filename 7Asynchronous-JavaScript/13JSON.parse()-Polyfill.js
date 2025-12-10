// ============================================================================
// 13) JSON.parse() Polyfill
// ============================================================================
//
// 📌 What is JSON.parse?
// - JSON.parse() is used to convert a JSON string into a JavaScript object.
// - Example:
//     let str = '{"name":"Avi","age":25}';
//     let obj = JSON.parse(str);
//     console.log(obj.name); // Avi
//
// ----------------------------------------------------------------------------
// 🌟 Why do we need a polyfill?
// Older environments might not support JSON.parse().
// So we write our own implementation.
//
// ----------------------------------------------------------------------------
// ✅ Simple Polyfill using eval() (not safe for production)
// ----------------------------------------------------------------------------
function myJSONParse(jsonString) {
  return eval("(" + jsonString + ")");
}

// Example
let str = '{"name":"Avi","age":25,"skills":["JS","React"]}';
let obj = myJSONParse(str);
console.log(obj.name); // Avi
console.log(obj.skills); // ["JS","React"]

// ❌ Problem: eval() executes any code (unsafe).
// Example: myJSONParse('console.log("Hacked!")'); // executes code! 😱

// ----------------------------------------------------------------------------
// ✅ Safer Polyfill using Function constructor
// ----------------------------------------------------------------------------
function mySafeJSONParse(jsonString) {
  return new Function("return " + jsonString)();
}

let obj2 = mySafeJSONParse(str);
console.log(obj2.age); // 25

// ----------------------------------------------------------------------------
// ✅ Even Safer: Validate JSON before parsing (basic check)
// ----------------------------------------------------------------------------
function myValidatedJSONParse(jsonString) {
  // Allow only valid JSON characters
  if (
    /^[\],:{}\s]*$/.test(
      jsonString
        .replace(/\\["\\\/bfnrtu]/g, "@") // escape sequences
        .replace(
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          "]"
        )
        .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
    )
  ) {
    return eval("(" + jsonString + ")");
  }
  throw new Error("Invalid JSON string!");
}

try {
  let obj3 = myValidatedJSONParse('{"x":10,"y":20}');
  console.log(obj3); // { x: 10, y: 20 }
} catch (e) {
  console.error(e.message);
}

// ----------------------------------------------------------------------------
// ❓ Interview Q&A
// ----------------------------------------------------------------------------
//
// Q1) What does JSON.parse() do?
// 👉 Converts JSON string into JavaScript object.
//
// Q2) Why is using eval() risky in polyfill?
// 👉 Because eval can run malicious code (security issue).
//
// Q3) What’s the safer alternative to eval?
// 👉 Using `Function("return " + str)()` or proper validation before parsing.
//
// Q4) Difference between JSON and object literal?
// 👉 JSON: pure data format (strings, numbers, arrays, objects, booleans, null).
// 👉 Object literal: actual JS object in memory with methods, prototypes, etc.
//
// Q5) Can JSON contain functions?
// 👉 ❌ No, JSON only supports basic data types (string, number, object, array, boolean, null).
//
// ----------------------------------------------------------------------------
// ✅ Easy to Remember
// ----------------------------------------------------------------------------
// JSON.parse(str)  → String ➡ Object
// JSON.stringify(obj) → Object ➡ String
//
// ============================================================================
// End of JSON.parse() Polyfill Notes
// ============================================================================
