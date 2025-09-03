/*  
=====================================================
📘 Template Literals & Tagged Templates in JavaScript
=====================================================

🔹 THEORY  
1. **Template Literals**  
   - Introduced in ES6.  
   - Use backticks (`` ` ``) instead of quotes.  
   - Support multi-line strings, variable interpolation, and expressions.  
   - Syntax: `` `Hello ${name}!` ``  

2. **Tagged Templates**  
   - Advanced form of template literals.  
   - You can use a "tag function" to process template literals.  
   - The function receives string parts and placeholders separately.  
   - Useful for custom string formatting, sanitization (avoid XSS), and i18n (translations).  

=====================================================
*/

// --------------------------------------------------
// 🔹 Template Literals Basics
// --------------------------------------------------
const name = "Avi";
const age = 25;

// Normal string concatenation
console.log("My name is " + name + " and I am " + age + " years old.");

// Using template literals
console.log(`My name is ${name} and I am ${age} years old.`);

// --------------------------------------------------
// 🔹 Multi-line Strings
// --------------------------------------------------
const poem = `
Roses are red,
Violets are blue,
JavaScript is fun,
And so are you!
`;
console.log(poem);

// --------------------------------------------------
// 🔹 Expressions inside Template Literals
// --------------------------------------------------
const a = 10;
const b = 20;
console.log(`The sum of ${a} and ${b} is ${a + b}`);
// "The sum of 10 and 20 is 30"

// --------------------------------------------------
// 🔹 Tagged Templates
// --------------------------------------------------
function myTag(strings, ...values) {
  console.log("Strings:", strings); // Array of string parts
  console.log("Values:", values); // Array of dynamic values

  return strings[0] + values[0].toUpperCase() + strings[1];
}

const user = "avi";
const place = "India";

// Pass template literal to tag function
const result = myTag`Hello ${user}, welcome to ${place}!`;

console.log(result);
// Output: "Hello AVI, welcome to "
// Explanation: myTag customized how placeholders were combined

// --------------------------------------------------
// 🔹 Example: Sanitizing Input (preventing XSS)
// --------------------------------------------------
function safeHTML(strings, ...values) {
  return strings.reduce((result, str, i) => {
    let val = values[i] || "";
    val = String(val).replace(/</g, "&lt;").replace(/>/g, "&gt;"); // escape HTML
    return result + str + val;
  }, "");
}

const userInput = "<script>alert('Hacked!')</script>";
const safe = safeHTML`User input: ${userInput}`;
console.log(safe);
// Output: "User input: &lt;script&gt;alert('Hacked!')&lt;/script&gt;"

// --------------------------------------------------
// 🔹 Example: Internationalization (i18n)
// --------------------------------------------------
function i18n(strings, ...values) {
  const translations = {
    Hello: "Hola",
    World: "Mundo",
  };
  return strings.reduce(
    (acc, str, i) =>
      acc + (translations[values[i - 1]] || values[i - 1] || "") + str
  );
}
console.log(i18n`Say: ${"Hello"} ${"World"}!`); // "Say: Hola Mundo!"

/*  
-----------------------------------------------------
❓ Q&A (Interview Style)
-----------------------------------------------------

Q1: What are template literals?  
👉 Strings written with backticks (`` ` ``) that support variables (`${}`), expressions, and multi-lines.

Q2: Difference between normal strings and template literals?  
👉 Normal strings need `+` for concatenation.  
   Template literals support `${expression}` for interpolation.

Q3: What are Tagged Templates?  
👉 Functions that let you customize how template literals are processed.  

Q4: Use case of Tagged Templates?  
👉 - Sanitizing user input (prevent XSS).  
   - Custom formatting (currency, dates).  
   - Internationalization (i18n).  

Q5: Are template literals mutable?  
👉 No. Like all strings in JS, they are immutable.  

-----------------------------------------------------
📊 QUICK REVISION
- Use backticks for template literals.
- `${}` → inject variables or expressions.
- Supports multi-line strings.
- Tagged templates → use function to customize behavior.
- Use cases: sanitize input, i18n, formatting.
=====================================================
*/
