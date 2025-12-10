// ============================================================================
// 10) 🌐 Web APIs (Fetch, Navigator, etc.) — JS Notes
// ============================================================================
//
// 📝 Theory:
// ----------
// Web APIs are built into the browser (NOT part of JavaScript itself).
// They let JS interact with the browser and the outside world.
//
// Examples of Web APIs:
// - Fetch API → for making HTTP requests
// - Navigator API → info about browser/device
// - Geolocation API → get user’s location
// - Storage API → localStorage, sessionStorage
// - DOM API → manipulate HTML elements
// - Web Workers, WebSockets, etc.
//
// These are provided by the browser, JS just "uses" them.
//
// ============================================================================
// 1) Fetch API
// ============================================================================
// Used to make HTTP requests (like AJAX, but modern and promise-based).
//
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json()) // convert to JSON
  .then((data) => console.log("✅ Data:", data))
  .catch((error) => console.error("❌ Error:", error));

// Async/Await version:
async function getPost() {
  try {
    let res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    let data = await res.json();
    console.log("✅ Async data:", data);
  } catch (err) {
    console.log("❌ Error:", err);
  }
}
getPost();

// ============================================================================
// 2) Navigator API
// ============================================================================
// Provides info about the browser and device.
//
console.log("Browser Info:", navigator.userAgent); // Browser version
console.log("Online:", navigator.onLine); // true if connected
console.log("Language:", navigator.language); // e.g., "en-US"

// Geolocation (with user permission):
navigator.geolocation.getCurrentPosition(
  (pos) =>
    console.log(
      "📍 Latitude:",
      pos.coords.latitude,
      "Longitude:",
      pos.coords.longitude
    ),
  (err) => console.log("❌ Error:", err.message)
);

// ============================================================================
// 3) Storage API (part of Web APIs)
// ============================================================================
// Save and retrieve data in browser.
//
// localStorage (persists until manually cleared)
localStorage.setItem("username", "Avi");
console.log(localStorage.getItem("username")); // Avi

// sessionStorage (cleared when tab closes)
sessionStorage.setItem("sessionId", "12345");
console.log(sessionStorage.getItem("sessionId")); // 12345

// ============================================================================
// 4) DOM API (part of Web APIs)
// ============================================================================
// Already seen → document.querySelector, addEventListener, etc.
//
document.body.style.background = "lightyellow"; // change background

// ============================================================================
// 5) Quick Recap
// ============================================================================
// - Web APIs are provided by the browser (not JavaScript).
// - They allow JS to talk to the outside world (network, storage, UI, device).
// - Common ones: Fetch, Navigator, Geolocation, Storage, DOM.
//
// ============================================================================
// 6) Interview Q&A
// ============================================================================
//
// Q1) What are Web APIs?
// A1) Browser features that JavaScript can use to interact with system, network,
//     or UI (e.g., fetch, navigator, DOM).
//
// Q2) Is fetch part of JavaScript?
// A2) No, it’s a Web API provided by browsers.
//
// Q3) Difference between localStorage and sessionStorage?
// A3) localStorage → data stays until cleared.
//     sessionStorage → data clears when tab closes.
//
// Q4) What does navigator.onLine do?
// A4) Returns true if the browser is connected to the internet.
//
// Q5) Can JavaScript access Geolocation without permission?
// A5) No, user must allow access to location.
//
// ============================================================================
// End of Notes
// ============================================================================
