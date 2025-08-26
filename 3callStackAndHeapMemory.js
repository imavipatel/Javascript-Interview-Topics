/* 
===========================================================
📘 JavaScript Notes: Call Stack & Memory Heap
===========================================================
Topics covered:
1) Call Stack
2) Memory Heap
3) Function Call Management
4) Stack Overflow Example
5) Memory Leak Examples
===========================================================
*/

/* 
-----------------------------------------------------------
1) Call Stack
-----------------------------------------------------------
🔹 Call Stack = data structure that keeps track of 
   "where in the program we are".

- When a function is called → it gets pushed (added) to the stack.
- When a function returns → it gets popped (removed) from the stack.
- The top of the stack is always the currently running function.

If stack gets too big → "Stack Overflow" error.

Example:
*/

function first() {
  console.log("Inside first()");
  second();
  console.log("Exiting first()");
}

function second() {
  console.log("Inside second()");
}

first();

/*
Execution:
1. Call first() → push "first" onto stack
2. Inside first → call second() → push "second"
3. second() finishes → pop "second"
4. Continue first() → finish → pop "first"
*/

/* 
-----------------------------------------------------------
2) Memory Heap
-----------------------------------------------------------
🔹 Heap = large memory region for storing objects, arrays, functions.
- Unlike stack (which is ordered LIFO), heap is more like "free storage".
- Variables reference heap memory.
- Garbage Collector (GC) cleans unused objects from heap.

Example:
*/

let obj1 = { name: "Alice" }; // stored in heap
let obj2 = { name: "Bob" };
let arr = [1, 2, 3]; // array in heap

// Variables (obj1, obj2, arr) hold references (pointers) to heap objects

/* 
-----------------------------------------------------------
3) Function Call Management
-----------------------------------------------------------
🔹 Stack manages the "order" of function execution.
- JS is single-threaded → only one call stack.
- Each function call creates a new execution context → pushed to stack.
- Once finished → popped off.

Example:
*/

function greet(name) {
  return "Hello, " + name;
}

function welcome() {
  const message = greet("Sam");
  console.log(message);
}

welcome();

/*
Stack steps:
- call welcome() → push
- inside welcome → call greet("Sam") → push
- greet returns → pop greet
- continue welcome → log result → pop welcome
*/

/* 
-----------------------------------------------------------
4) Stack Overflow Example
-----------------------------------------------------------
🔹 Happens when functions keep calling themselves without exit condition.
- The call stack keeps growing until it runs out of memory.

Example:
*/

// ❌ Dangerous: will crash
function infiniteRecursion() {
  return infiniteRecursion(); // calls itself forever
}
// infiniteRecursion(); // Uncomment → "RangeError: Maximum call stack size exceeded"

// ✅ Correct recursion (with base case)
function factorial(n) {
  if (n === 1) return 1; // base case
  return n * factorial(n - 1); // recursive case
}
console.log(factorial(5)); // 120

/* 
-----------------------------------------------------------
5) Memory Leak Examples
-----------------------------------------------------------
🔹 Memory leak = memory that should be freed but stays allocated 
   because something still references it.

Common causes:
1) Global variables
2) Timers/intervals not cleared
3) Event listeners not removed
4) Large caches with no cleanup

Example 1: Accidental Global
*/
function leakGlobal() {
  leakedVar = "Oops, global!"; // ❌ no var/let/const
}
leakGlobal();
console.log(window.leakedVar); // stays on global object

// Fix:
("use strict");
function noLeak() {
  let safeVar = "Scoped properly!";
}

/* 
Example 2: Unstopped Timer
*/
let bigArray = new Array(1000000).fill("data");
let id = setInterval(() => {
  console.log("Still running...");
}, 1000);
// If not cleared → bigArray stays in memory
// clearInterval(id); // ✅ Fix

/* 
Example 3: Event Listener Leak
*/
function attachHandler() {
  const hugeData = new Array(1000000).fill("X");
  function onResize() {
    console.log("Resized:", hugeData.length);
  }
  window.addEventListener("resize", onResize);
  // If never removed → hugeData is never garbage collected
}
// attachHandler();

// Fix: removeEventListener when no longer needed

/* 
-----------------------------------------------------------
ASCII Visualization
-----------------------------------------------------------

Stack (LIFO) → function calls
---------------------------------
| greet("Sam")                 |
| welcome()                    |
---------------------------------

Heap (dynamic objects)
---------------------------------
obj1 -> { name: "Alice" }
obj2 -> { name: "Bob" }
arr  -> [1, 2, 3]
---------------------------------

Stack Overflow:
- Infinite recursion fills stack frames until memory runs out.

Memory Leak:
- Unused heap objects stay alive if references remain.

-----------------------------------------------------------
*/

/* 
===========================================================
Quick Cheat Sheet
===========================================================
✔ Call Stack = manages function calls (LIFO).
✔ Memory Heap = stores objects/arrays/functions (dynamic).
✔ Stack Overflow = infinite recursion / deep calls.
✔ Memory Leaks = unused heap objects still referenced.
✔ Always:
   - Use let/const (avoid accidental globals).
   - Clear timers & intervals.
   - Remove unused event listeners.
   - Manage caches wisely.
===========================================================
*/

/* 
Practice Questions
-----------------------------------------------------------
1) What happens here?
function recurse() {
  recurse();
}
recurse();

Answer: Stack Overflow (RangeError: Maximum call stack size exceeded).

-----------------------------------------------------------
2) Fix this recursive factorial:
function fact(n) {
  return n * fact(n - 1);
}
fact(5);

Answer: Missing base case → Add if(n===1) return 1.

-----------------------------------------------------------
3) Why is this a memory leak?
let arr = new Array(1_000_000).fill("x");
setInterval(() => console.log(arr.length), 1000);

Answer: arr stays in memory forever because closure keeps it alive 
until interval is cleared.
-----------------------------------------------------------
*/
