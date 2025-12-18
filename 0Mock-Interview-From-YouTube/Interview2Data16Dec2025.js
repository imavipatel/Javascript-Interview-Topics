//Difference Between session storage and Local Storage.

/*

🔹 Local Storage
✅ What it is

Stores data permanently in the browser.
Data does not get deleted when:
Browser is closed
Tab is closed
System is restarted

✅ Lifetime
👉 Until you manually clear it or clear browser data.

✅ Scope
Shared across all tabs/windows of the same origin (domain).

✅ Storage Size
Around 5–10 MB (browser dependent).

✅ Example Use Cases
User theme (dark/light mode)
Remember login info
Language preference
*/

/*
🔹 Session Storage
✅ What it is

Stores data only for one browser tab/session.

Data is deleted when:

Tab is closed
Browser is closed

✅ Lifetime
👉 Only until the tab is open.

✅ Scope
Available only in the current tab.
Not shared across tabs.

✅ Storage Size
Around 5 MB.

✅ Example Use Cases
Form data during a single session
OTP verification flow
*/

//Can you give me some string method used in string

// length, charAt, trim, slice, split, includes, match, toUpperCase, toLowerCase

//Write Different Falsy Values in JavaScript

undefined, null, 0, "", false, NaN;

//Q. What is difference btw default export and export

//Named exports allow exporting multiple values and must be imported using the same name with {},
// while a default export allows only one export per file and can be imported with any name without {}.

//Q. What is difference btw async and differ

/*********************************************************
 * 📘 JavaScript Notes
 * Topic: Difference Between async and defer
 *********************************************************/

/********************************************
 * 🟢 What are async and defer?
 ********************************************/
/**
 * `async` and `defer` are attributes used with the <script> tag
 * to control how JavaScript files are loaded and executed
 * in the browser.
 *
 * They help improve page loading performance.
 */

/********************************************
 * 🟢 Normal Script (No async / defer)
 ********************************************/
/**
 * <script src="app.js"></script>
 *
 * How it works:
 * 1. Browser starts parsing HTML
 * 2. HTML parsing STOPS
 * 3. JS file downloads
 * 4. JS file executes
 * 5. HTML parsing continues
 *
 * ❌ Problem:
 * - Slows down page loading
 */

/********************************************
 * 🟢 async
 ********************************************/
/**
 * <script src="app.js" async></script>
 *
 * How async works:
 * - JS file downloads in parallel with HTML parsing
 * - Executes immediately after download finishes
 * - HTML parsing pauses only during execution
 *
 * ❗ Important Points:
 * - Execution order is NOT guaranteed
 * - Script may run before DOM is fully ready
 *
 * ✅ Best Use Cases:
 * - Analytics scripts
 * - Ads
 * - Tracking scripts
 * - Independent scripts
 */

/********************************************
 * 🟢 defer
 ********************************************/
/**
 * <script src="app.js" defer></script>
 *
 * How defer works:
 * - JS file downloads in parallel with HTML parsing
 * - Script executes AFTER HTML parsing is complete
 * - Scripts execute in correct order
 *
 * ❗ Important Points:
 * - DOM is fully ready
 * - Runs before DOMContentLoaded event
 *
 * ✅ Best Use Cases:
 * - Main application logic
 * - DOM manipulation
 * - React / Angular / Vue apps
 */

/********************************************
 * 🟢 async vs defer (Comparison Table)
 ********************************************/
/**
 * | Feature            | async                 | defer                 |
 * |-------------------|----------------------|----------------------|
 * | HTML parsing      | Continues            | Continues            |
 * | Script download   | Parallel             | Parallel             |
 * | Script execution  | Immediately          | After HTML parsing   |
 * | Execution order   | ❌ Not guaranteed     | ✅ Guaranteed        |
 * | DOM ready         | ❌ Not sure           | ✅ Yes               |
 * | Best for          | Analytics, ads       | App logic            |
 */

/********************************************
 * 🟢 Interview Trap Question
 ********************************************/
/**
 * <script async src="a.js"></script>
 * <script async src="b.js"></script>
 *
 * ❓ Which runs first?
 * 👉 No guarantee
 *
 * <script defer src="a.js"></script>
 * <script defer src="b.js"></script>
 *
 * ❓ Which runs first?
 * 👉 a.js then b.js
 */

/********************************************
 * 🟢 Visual Flow (Easy Understanding)
 ********************************************/
/**
 * Normal:
 * HTML ⏸️ JS ⏸️ HTML
 *
 * Async:
 * HTML ➡️ JS (any time)
 *
 * Defer:
 * HTML ➡️ HTML finished ➡️ JS
 */

/********************************************
 * 🟢 One-Line Interview Answer
 ********************************************/
/**
 * async loads scripts in parallel and executes them
 * immediately after download without order guarantee,
 * while defer loads scripts in parallel but executes them
 * after HTML parsing in the correct order.
 */

/********************************************
 * 🟢 When to Use What?
 ********************************************/
/**
 * Use async:
 * - When script does not depend on DOM
 * - When script does not depend on other scripts
 *
 * Use defer:
 * - When script needs DOM
 * - When script depends on other scripts
 */

/*********************************************************
 * ✅ End of Notes
 *********************************************************/

let str = "Deepansh VishwaKarma"; //Find the first repeated character in the string

/*********************************************************
 * 📘 JavaScript String Interview Notes
 * Topic: Find First Repeated Character in a String
 *********************************************************/

/********************************************
 * 🟢 Problem Statement
 ********************************************/
/**
 * Given a string:
 * let str = "Deepansh VishwaKarma";
 *
 * Find the FIRST character that is repeated.
 */

/********************************************
 * 🟢 Approach 1: Using Object (Best & Simple)
 ********************************************/
/**
 * Idea:
 * - Loop through each character
 * - Store count of characters in an object
 * - If a character appears again, return it
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

function firstRepeatedChar(str) {
  const seen = {};

  for (let char of str) {
    if (seen[char]) {
      return char;
    }
    seen[char] = 1;
  }

  return null; // no repeated character
}

console.log(firstRepeatedChar(str)); // e

/********************************************
 * 🟢 Explanation (Beginner Friendly)
 ********************************************/
/**
 * Step 1: Start reading string from left to right
 * Step 2: Save each character in an object
 * Step 3: If character is already present → repeated
 * Step 4: Return immediately (first repeated)
 *
 * D e e p a n s h ...
 *     ↑
 *     first repeated character
 */

/********************************************
 * 🟢 Approach 2: Using Set
 ********************************************/
/**
 * Idea:
 * - Set stores only unique values
 * - If Set already has the character → repeated
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

function firstRepeatedCharUsingSet(str) {
  const set = new Set();

  for (let char of str) {
    if (set.has(char)) {
      return char;
    }
    set.add(char);
  }

  return null;
}

console.log(firstRepeatedCharUsingSet(str)); // e

/********************************************
 * 🟢 Case Sensitivity Note (Interview Point)
 ********************************************/
/**
 * JavaScript is case-sensitive:
 * 'D' !== 'd'
 *
 * "VishwaKarma"
 * 'K' and 'k' are different
 */

/********************************************
 * 🟢 Ignoring Spaces (Optional Enhancement)
 ********************************************/

function firstRepeatedCharIgnoreSpace(str) {
  const set = new Set();

  for (let char of str) {
    if (char === " ") continue;

    if (set.has(char)) {
      return char;
    }
    set.add(char);
  }

  return null;
}

console.log(firstRepeatedCharIgnoreSpace(str)); // e

/********************************************
 * 🟢 One-Line Interview Answer
 ********************************************/
/**
 * Loop through the string, store characters in a Set or
 * object, and return the first character that appears
 * more than once.
 */

/*********************************************************
 * ✅ End of Notes
 *********************************************************/

function abc(a = 10, b = 20) {
  return a + b;
}

console.log(abc(100, 500));
console.log(abc(700));
console.log(abc());

//Tell me the difference btw event bubbling and event capturing
