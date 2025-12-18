/*********************************************************
 * 📘 JavaScript Notes — Print 1 to 10 with 1s Delay
 *********************************************************/

/********************************************
 * 🟢 Problem Statement
 ********************************************/
/**
 * Print numbers from 1 to 10
 * Each number should print after 1 second
 *
 * Output:
 * 1 (after 1s)
 * 2 (after 2s)
 * ...
 * 10 (after 10s)
 */

/********************************************
 * 🟢 Method 1: setTimeout + let (Most Common)
 ********************************************/
/**
 * ✔ Simple
 * ✔ Interview-friendly
 * ✔ let creates block scope (important)
 */

for (let i = 1; i <= 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}

/********************************************
 * 🟢 Method 2: setTimeout + var (Using IIFE)
 ********************************************/
/**
 * ❗ var has function scope
 * ✔ Fix using IIFE (Immediately Invoked Function Expression)
 */

for (var i = 1; i <= 10; i++) {
  (function (num) {
    setTimeout(() => {
      console.log(num);
    }, num * 1000);
  })(i);
}

/********************************************
 * 🟢 Method 3: async / await + setTimeout (BEST LOGIC)
 ********************************************/
/**
 * ✔ Very clean
 * ✔ Easy to understand
 * ✔ Preferred in modern JS
 */

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function printNumbers() {
  for (let i = 1; i <= 10; i++) {
    await delay(1000);
    console.log(i);
  }
}

printNumbers();

/********************************************
 * 🟢 Method 4: setInterval (Simple Alternative)
 ********************************************/
/**
 * ✔ Uses interval instead of timeout
 * ❌ Must clear interval manually
 */

let count = 1;

const intervalId = setInterval(() => {
  console.log(count);
  count++;

  if (count > 10) {
    clearInterval(intervalId);
  }
}, 1000);

/********************************************
 * 🟢 Method 5: Recursive setTimeout
 ********************************************/
/**
 * ✔ No loop
 * ✔ Good logic-based solution
 */

function printRecursive(num) {
  if (num > 10) return;

  setTimeout(() => {
    console.log(num);
    printRecursive(num + 1);
  }, 1000);
}

printRecursive(1);

/********************************************
 * 🟢 Interview Comparison
 ********************************************/
/**
 * setTimeout + let     → Simple & common
 * var + IIFE           → Closure knowledge
 * async/await          → ⭐ BEST (modern JS)
 * setInterval          → Easy but manual stop
 * Recursive timeout    → Logic-focused
 */

/********************************************
 * 🟢 Interview Q & A
 ********************************************/
/**
 * Q: Why does `var` fail without IIFE?
 * A: var has function scope, so all callbacks share same value.
 *
 * Q: Best approach?
 * A: async/await with Promise-based delay.
 *
 * Q: Is this async or sync?
 * A: Async (uses event loop & timers).
 */

/*********************************************************
 * ✅ End of Notes
 *********************************************************/
