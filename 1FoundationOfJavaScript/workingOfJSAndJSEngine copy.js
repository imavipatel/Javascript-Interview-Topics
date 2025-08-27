/* 
===========================================================
📘 JavaScript Deep Notes for Beginners
===========================================================
This file contains theory + examples for:
1) JavaScript & JS Engine
2) Parsing & Execution Context
3) Memory Allocation & Garbage Collection
4) Types of Garbage Collection & Memory Leaks
5) Event Loop & Single-threaded nature
===========================================================
*/

/* 
-----------------------------------------------------------
1) JavaScript & JS Engine
-----------------------------------------------------------
- JavaScript is a high-level, interpreted, single-threaded language. 
- But "interpreted" is not fully correct today → modern engines (V8, SpiderMonkey, JavaScriptCore) actually "compile" JS into efficient machine code.

🔹 How a JS Engine works (Simplified Pipeline):
1) Tokenization → Breaks source code into tokens (keywords, identifiers, operators).
2) Parsing → Builds an AST (Abstract Syntax Tree) from tokens.
3) Compilation → 
   - Early engines interpreted directly (slow).
   - Modern engines (like V8) compile to bytecode and optimize hot code using JIT (Just-in-time compilation).
4) Execution → Run compiled code. Optimized paths make repeated functions much faster.

Think of it like: 
Your code (text) → Tokens → AST → Bytecode → Optimized Machine Code → Execution

*/

function add(a, b) {
  return a + b;
}
console.log(add(2, 3)); // Output: 5

/* 
-----------------------------------------------------------
2) Parsing & Execution
-----------------------------------------------------------
JS runs code inside "Execution Contexts":
- Global Execution Context → created once when your file/script runs.
- Function Execution Context → created every time a function is invoked.

Each context has:
  - Lexical Environment (variables, function declarations, scope chain).
  - Variable Environment.
  - `this` binding.

🔹 Hoisting:
- var/function declarations are hoisted to the top of scope.
- let/const are hoisted too, but live in the Temporal Dead Zone (TDZ) → cannot be used before their line of code.

🔹 Execution happens in 2 phases:
1. Creation Phase → allocate memory, hoist declarations.
2. Execution Phase → run code line by line, assign values, execute functions.
*/

console.log(a); // undefined (var is hoisted)
var a = 10;

// console.log(b); // ❌ ReferenceError (TDZ for let)
// let b = 20;

sayHi(); // works because function declarations are hoisted
function sayHi() {
  console.log("Hi");
}

/* 
🔹 Closures
Functions remember the scope in which they were created, even after the outer function is finished.
*/

function outer() {
  console.log(x); // undefined
  var x = 1;
  let y = 2;
  return function inner() {
    console.log(x + y); // inner "closes over" x and y
  };
}
const f = outer();
f(); // Output: 3

/* 
-----------------------------------------------------------
3) Memory Allocation & Garbage Collection
-----------------------------------------------------------
Where does data live?
- Primitives (numbers, strings, booleans, null, undefined, symbols, bigint):
  → stored as values (usually on the stack or inline).
- Objects/arrays/functions:
  → stored in the heap. Variables hold references to these objects.

Garbage Collection (GC):
- JS automatically frees memory of unreachable objects.
- "Reachability" = can the object still be reached from the "roots" (like global variables or current function variables)?
- If not → it is garbage.

*/

let obj = { big: new Array(1_000_000).fill("x") };
obj = null; // Now unreachable → GC can reclaim the memory

/* 
-----------------------------------------------------------
4) Types of Garbage Collection & Memory Leaks
-----------------------------------------------------------

🔹 Common GC algorithms:
1) Mark-and-Sweep → mark reachable objects, sweep the rest.
2) Generational GC → most objects die young, so memory is divided into Young/Old generations.
3) Incremental/Concurrent GC → do collection in small steps to avoid long pauses.
4) Compaction → move survivors together to reduce fragmentation.

🔹 Memory Leaks:
When you accidentally keep references alive so GC cannot clean up.

Examples:
1) Accidental globals
2) Unstopped timers/intervals
3) Event listeners not removed
4) Detached DOM nodes
5) Large caches (Map/Object) without cleanup
6) Closures capturing large unused data
*/

function leakExample() {
  leaked = "I am global"; // ❌ no var/let/const → becomes global
}
leakExample();
// fix: use 'use strict' + let/const

// ❌ Interval leak
const id = setInterval(() => {
  console.log("leaking...");
}, 1000);
// fix: clearInterval(id);

// ❌ Event listener leak
function attach() {
  const big = new Array(1_000_000).fill("x");
  const handler = () => console.log(big.length);
  window.addEventListener("resize", handler);
  // fix: window.removeEventListener('resize', handler);
}

/* 
-----------------------------------------------------------
5) Event Loop & Single-threaded JS
-----------------------------------------------------------
🔹 Key fact:
JavaScript is single-threaded → only one piece of code runs at a time.

But JS can handle async operations thanks to:
- Call Stack (where functions execute)
- Web APIs (timers, DOM events, fetch, etc. handled by browser/Node)
- Callback Queues:
   - Macro-task Queue → setTimeout, setInterval, setImmediate, DOM events.
   - Micro-task Queue → Promise.then/catch/finally, queueMicrotask, MutationObserver.

🔹 Event Loop:
1. Execute synchronous code on the stack.
2. Empty the Microtask Queue.
3. Take next task from the Macro-task Queue.
4. Repeat.

Important rule: Microtasks always run before Macrotasks.
*/

console.log("A");

setTimeout(() => console.log("B (timeout 0)"), 0);

Promise.resolve()
  .then(() => console.log("C (microtask 1)"))
  .then(() => console.log("D (microtask 2)"));

console.log("E");

// Output: A → E → C → D → B

/* 
Another Example:
*/
console.log("1");
fetch("https://example.com").then(() => console.log("2 (microtask)"));
console.log("3");
// Output: 1 → 3 → 2

/* 
-----------------------------------------------------------
ASCII Diagram of Event Loop (Browser)
-----------------------------------------------------------

Call Stack (runs now)
--------------------
| console.log('A') |
--------------------

Web APIs
--------------------
| setTimeout(fn,0) |
| fetch(...)       |
--------------------

Callback Queues
-------------------------------
Microtask Queue: [Promise.then]
Macrotask Queue: [setTimeout]
-------------------------------

Order: Sync → Microtasks → Macrotask

-----------------------------------------------------------
*/

/* 
-----------------------------------------------------------
Quick Cheat Sheet
-----------------------------------------------------------
✔ JS Engine parses → compiles → executes code.
✔ Execution Context = environment where code runs (global, function).
✔ Hoisting = var/function moved up, let/const in TDZ.
✔ Memory managed by GC → free unreachable objects.
✔ Memory leaks happen when references stay alive unnecessarily.
✔ Event loop: Sync → Microtasks → Macrotasks.
✔ Promises (microtasks) always run before setTimeout (macrotasks).
-----------------------------------------------------------
*/

/* 
Practice Question 1:
*/
console.log("start");
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
console.log("end");
// Expected: start → end → promise → timeout

/* 
Practice Question 2 (Memory Leak):
*/
function leak() {
  const big = new Array(1_000_000).fill("x");
  const handler = () => console.log(big.length);
  window.addEventListener("resize", handler);
}
leak();
// Problem: event listener keeps 'big' in memory.
// Fix: window.removeEventListener('resize', handler);
