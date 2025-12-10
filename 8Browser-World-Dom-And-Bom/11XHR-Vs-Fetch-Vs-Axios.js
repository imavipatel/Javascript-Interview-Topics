// ============================================================================
// 11)  📡 XHR vs Fetch vs Axios — JS Notes
// ============================================================================
//
// 📝 Theory:
// ----------
// In JavaScript, we often need to make HTTP requests (to APIs).
// There are 3 main ways:
//
// 1) XHR (XMLHttpRequest) → Old, callback-based, complicated
// 2) Fetch API → Modern, built-in, Promise-based
// 3) Axios → External library, easy syntax, supports extra features
//
// ============================================================================
// 1) XMLHttpRequest (XHR)
// ============================================================================
// - Old way of making HTTP requests
// - Uses callbacks (not promises)
// - Verbose and harder to use
//
let xhr = new XMLHttpRequest();
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1");
xhr.onload = function () {
  if (xhr.status === 200) {
    console.log("✅ XHR Response:", JSON.parse(xhr.responseText));
  } else {
    console.log("❌ XHR Error:", xhr.status);
  }
};
xhr.send();

// ============================================================================
// 2) Fetch API
// ============================================================================
// - Modern, built-in to browsers
// - Uses Promises
// - Cleaner than XHR
//
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((res) => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  })
  .then((data) => console.log("✅ Fetch Response:", data))
  .catch((err) => console.log("❌ Fetch Error:", err));

// Async/Await version (cleaner):
async function getData() {
  try {
    let res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    let data = await res.json();
    console.log("✅ Fetch with async/await:", data);
  } catch (e) {
    console.log("❌ Fetch Error:", e);
  }
}
getData();

// ============================================================================
// 3) Axios (External Library)
// ============================================================================
// - Promise-based like fetch, but with more features
// - Handles JSON automatically
// - Better error handling
// - Supports interceptors (modify request/response)
// - Works in both browser & Node.js
//
// (Need to install: npm install axios)
//
/*
import axios from "axios";

axios.get("https://jsonplaceholder.typicode.com/posts/1")
  .then((res) => console.log("✅ Axios Response:", res.data))
  .catch((err) => console.log("❌ Axios Error:", err));
*/

// ============================================================================
// 4) Comparison
// ============================================================================
//
// XHR:
// - Old, callback-based
// - More complex syntax
// - Still works but rarely used directly
//
// Fetch:
// - Modern, built-in, Promise-based
// - Cleaner syntax, supports async/await
// - Doesn’t auto-timeout requests
// - Needs extra handling for older browsers
//
// Axios:
// - External library
// - Easier syntax than Fetch
// - Auto JSON conversion
// - Built-in timeout, interceptors
// - Works in Node.js and browser
//
// ============================================================================
// 5) Interview Q&A
// ============================================================================
//
// Q1) Which one is better: XHR, Fetch, or Axios?
// A1) Fetch is the modern standard (built-in). Axios is great for advanced
//     features like interceptors, timeouts, and Node.js support.
//
// Q2) Does Fetch automatically reject on HTTP error (404, 500)?
// A2) No! Fetch only rejects on network errors. For HTTP errors, you must check `res.ok`.
//
// Q3) Does Axios auto-convert response to JSON?
// A3) Yes, Axios automatically parses JSON. Fetch requires `res.json()`.
//
// Q4) Is Fetch part of JavaScript?
// A4) No, Fetch is a Web API provided by the browser.
//
// Q5) Can XHR use Promises?
// A5) No, it’s callback-based. But we can wrap it manually in a Promise.
//
// ============================================================================
// End of Notes
// ============================================================================
