// ============================================================================
// 2) DOM Methods – Finding / Matching Elements
// ============================================================================
//
// 👉 What does it mean?
// DOM gives us methods to "find" or "select" elements in the HTML so that
// JavaScript can interact with them.
//
// Example HTML for reference:
// <div id="box" class="container">
//   <p class="text">Hello</p>
//   <p class="text">World</p>
// </div>
//
// ============================================================================
// 📌 Common DOM Selection Methods
// ============================================================================
//
// 1) getElementById("id")
//    - Finds ONE element by its id.
//    - Always returns a single element (id is unique).
//
let box = document.getElementById("box");
console.log(box); // <div id="box" class="container">...</div>
//
// ---------------------------------------------------------------------------
// 2) getElementsByClassName("className")
//    - Finds ALL elements with the given class.
//    - Returns an HTMLCollection (like an array, but not exactly).
//
let texts = document.getElementsByClassName("text");
console.log(texts[0].innerText); // "Hello"
//
// ---------------------------------------------------------------------------
// 3) getElementsByTagName("tagName")
//    - Finds ALL elements with the given tag name.
//    - Example: "p", "div", "h1", etc.
//
let paragraphs = document.getElementsByTagName("p");
console.log(paragraphs.length); // 2
//
// ---------------------------------------------------------------------------
// 4) querySelector("selector")
//    - Finds the FIRST element that matches a CSS selector.
//    - More powerful, because we can use CSS selectors.
//
let firstText = document.querySelector(".text");
console.log(firstText.innerText); // "Hello"
//
// ---------------------------------------------------------------------------
// 5) querySelectorAll("selector")
//    - Finds ALL elements matching the CSS selector.
//    - Returns a NodeList (can use forEach).
//
let allTexts = document.querySelectorAll(".text");
allTexts.forEach((el) => console.log(el.innerText)); // "Hello", "World"
//
// ============================================================================
// 📌 Matching / Checking Elements
// ============================================================================
//
// 1) element.matches("selector")
//    - Checks if an element matches a given CSS selector.
//
console.log(firstText.matches(".text")); // true
console.log(firstText.matches("#box")); // false
//
// ---------------------------------------------------------------------------
// 2) element.closest("selector")
//    - Finds the closest parent (including itself) matching the selector.
//
console.log(firstText.closest(".container")); // <div id="box" class="container">...</div>
//
// ---------------------------------------------------------------------------
// 3) element.contains(otherElement)
//    - Checks if an element contains another element.
//
console.log(box.contains(firstText)); // true
//
// ============================================================================
// ✅ Q&A Section
// ============================================================================
//
// Q1) Difference between getElementById and querySelector?
// 👉 getElementById only works with IDs, but querySelector can use ANY CSS selector.
//
// Q2) Difference between getElementsByClassName vs querySelectorAll?
// 👉 getElementsByClassName returns HTMLCollection (live, updates automatically),
//    querySelectorAll returns NodeList (static, does not auto-update).
//
// Q3) Which is more modern and flexible?
// 👉 querySelector and querySelectorAll (because they support CSS selectors).
//
// Q4) What does matches() do?
// 👉 It checks if the element itself fits a CSS selector.
//
// Q5) What does closest() do?
// 👉 It walks UP the DOM tree to find the nearest parent matching the selector.
//
// ============================================================================
// ✅ Recap
// ----------------------------------------------------------------------------
// - getElementById → Find by ID
// - getElementsByClassName / getElementsByTagName → Find multiple elements
// - querySelector / querySelectorAll → Modern, use CSS selectors
// - matches() → Check if element fits selector
// - closest() → Find nearest parent
// - contains() → Check if parent contains child
// ============================================================================
