/* 
===========================================================
📘 JavaScript Notes: Execution Context & Hoisting
===========================================================
Topics covered:
1) Execution Context & Global Object
2) Global vs Function Execution Context
3) Lexical Environment vs Variable Environment
4) Hoisting of Variables and Functions
===========================================================
*/

/* 
-----------------------------------------------------------
1) Execution Context & Global Object
-----------------------------------------------------------

🔹 Execution Context = The environment where JS code is evaluated & executed.
- It contains:
  1. Variable Environment (vars declared with var, function declarations).
  2. Lexical Environment (let, const, functions, scope chain).
  3. This binding.

🔹 Global Execution Context (GEC)
- Created once when your JS program starts.
- Creates the **Global Object** (browser: window, Node: global).
- `this` in global scope → refers to the global object (in non-strict mode).
- Stores globally declared variables & functions.

Example:
*/

console.log(this); // In browser → Window object, in Node → {}
var a = 10;
function sayHi() {
  console.log("Hello!");
}

console.log(window.a); // 10 (because var attaches to global object in browsers)
sayHi(); // "Hello!"

/* 
-----------------------------------------------------------
2) Global vs Function Execution Context
-----------------------------------------------------------

🔹 Global Execution Context:
- Created once for the whole program.
- Variables/functions defined in global scope are stored here.

🔹 Function Execution Context:
- Created every time a function is called.
- Each has its own variable/lexical environment + `this`.
- When function finishes → its context is destroyed (unless referenced by closure).

Example:
*/

var msg = "Global";

function outer() {
  var msg = "Outer";

  function inner() {
    var msg = "Inner";
    console.log(msg); // "Inner" → looks in its own scope first
  }

  inner();
  console.log(msg); // "Outer"
}

outer();
console.log(msg); // "Global"

/* 
-----------------------------------------------------------
3) Lexical Environment vs Variable Environment
-----------------------------------------------------------

🔹 Lexical Environment:
- "Lexical" = related to where code is written.
- Contains variables declared with let, const, functions.
- Has a reference to outer (parent) environment → forms **scope chain**.

🔹 Variable Environment:
- Contains variables declared with var + function declarations.

✅ Important:
- In practice, modern JS engines merge them, but conceptually they differ.

Example:
*/

function demo() {
  var a = 1; // variable environment
  let b = 2; // lexical environment
  const c = 3; // lexical environment

  function nested() {
    console.log(a, b, c); // Scope chain → can access outer variables
  }

  nested();
}
demo(); // Output: 1 2 3

/* 
-----------------------------------------------------------
4) Hoisting of Variables and Functions
-----------------------------------------------------------

🔹 Hoisting = JS engine moves declarations to the top of their scope 
  during the "Creation Phase" of Execution Context.

- var → hoisted with default value `undefined`
- let/const → hoisted BUT in "Temporal Dead Zone" until declared → accessing them early throws error
- function declarations → hoisted with their full function body
- function expressions/arrow functions → behave like variables (var/let/const rules)

Example 1: var hoisting
*/

console.log(x); // undefined (hoisted, but not assigned)
var x = 5;
console.log(x); // 5

// Example 2: let/const hoisting
// console.log(y); // ❌ ReferenceError (TDZ)
let y = 10;

// Example 3: function declaration hoisting
sayHello(); // works → "Hello!"
function sayHello() {
  console.log("Hello!");
}

// Example 4: function expression (var)
try {
  sayBye(); // ❌ TypeError: sayBye is not a function
} catch (e) {
  console.log("Error:", e.message);
}
var sayBye = function () {
  console.log("Bye!");
};

/* 
-----------------------------------------------------------
ASCII Flow of Execution Context
-----------------------------------------------------------

1. Creation Phase (before code runs):
   - Allocate memory for variables & functions.
   - var → undefined
   - let/const → hoisted but in TDZ
   - function declarations → full function stored

2. Execution Phase:
   - Code runs line by line.
   - Variables assigned actual values.
   - Functions executed when called.

Example Code:
-----------------------------------------------------------
console.log(a);
var a = 2;
let b = 3;
function foo() { console.log("foo"); }
-----------------------------------------------------------

Creation Phase:
- a: undefined
- b: hoisted but TDZ
- foo: function object

Execution Phase:
- console.log(a) → undefined
- a = 2
- b = 3
- foo() available
-----------------------------------------------------------
*/

/* 
===========================================================
Quick Cheat Sheet
===========================================================
✔ Execution Context = (Lexical Env + Variable Env + this)
✔ Global Context → created once → contains global object
✔ Function Context → created per function call
✔ Lexical Env = let/const + scope chain
✔ Variable Env = var + function declarations
✔ Hoisting:
   - var = hoisted, initialized undefined
   - let/const = hoisted, TDZ
   - function declaration = hoisted with body
   - function expression/arrow = follow var/let/const rules
===========================================================
*/

/* 
Practice Questions:
-----------------------------------------------------------
1) What is the output?
console.log(a);
var a = 10;
function test() {
  console.log(a);
  var a = 20;
}
test();

Answer:
undefined  (outer log, var hoisted but not assigned yet)
undefined  (inner log, new var hoisted inside function)

-----------------------------------------------------------
2) Predict output:
foo();
bar();

function foo() { console.log("foo called"); }
var bar = function() { console.log("bar called"); };

Answer:
"foo called"
❌ TypeError (bar is undefined at call time)
-----------------------------------------------------------
*/
