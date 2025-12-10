// ============================================================================
// 1) DOM & BOM
// ============================================================================
//
// 👉 DOM (Document Object Model)
// - Representation of the web page in a tree-like structure.
// - Each HTML element becomes an object in this tree.
// - You can access, add, delete, or modify elements using JavaScript.
//
// 👉 BOM (Browser Object Model)
// - Represents everything provided by the browser outside the web page content.
// - Example: window, navigator, history, location, screen, etc.
// - BOM is the "browser environment".
//
// ============================================================================
// Example: DOM
// ============================================================================
document.body.style.background = "lightyellow";
// changes background color of the page

let heading = document.getElementById("title");
console.log(heading.innerText); // Accessing DOM element text

// ============================================================================
// Example: BOM
// ============================================================================
console.log(window.innerWidth); // width of the browser window
console.log(navigator.userAgent); // browser info
console.log(location.href); // current page URL
console.log(history.length); // no. of visited pages in this tab

// ============================================================================
// ✅ Q&A Section
// ============================================================================
//
// Q1) What is DOM in simple words?
// 👉 DOM is the tree structure of a webpage where HTML tags become objects
//     that we can access and modify using JavaScript.
//
// Q2) What is BOM in simple words?
// 👉 BOM is everything the browser provides apart from the webpage content
//     (like window size, history, navigator, location).
//
// Q3) Is document part of DOM or BOM?
// 👉 'document' is part of the DOM (represents the HTML).
//
// Q4) Is window part of DOM or BOM?
// 👉 'window' is part of the BOM (it is the global object in browsers).
//
// Q5) Relationship between DOM & BOM?
// 👉 window (BOM) contains document (DOM).
//
// Diagram:
// window (BOM)
//    └── document (DOM)
//          └── HTML Elements (h1, p, div, ...)
//
// ============================================================================
// ✅ Recap
// ----------------------------------------------------------------------------
// - DOM → Page content (HTML turned into objects).
// - BOM → Browser environment (window, history, navigator, etc.).
// - window (BOM) owns document (DOM).
// ============================================================================
