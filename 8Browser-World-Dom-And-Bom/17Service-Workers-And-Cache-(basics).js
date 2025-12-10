// ============================================================================
// 17) 🚀 Service Workers & Cache (Basics) — JS Notes
// ============================================================================
//
// 📝 Theory
// ----------
//
// 1) What is a Service Worker?
// - A Service Worker is a special script that runs in the background
//   (separate from the main browser thread).
// - It can intercept network requests, cache responses, and make apps work offline.
//
// ✅ Key Features:
//   - Runs in the background
//   - Can intercept HTTP requests
//   - Provides Offline-first experience
//   - Uses Cache API to store/retrieve resources
//
// ⚠️ Rules:
//   - Runs only on HTTPS (except localhost)
//   - It’s event-driven (install, activate, fetch events)
//
// -----------------------------------------------------------------------------
// 2) Life Cycle of a Service Worker
// -----------------------------------------------------------------------------
//    Register → Install → Activate → Fetch (runs on every request)
//
// Example analogy 🎭:
// - Register: "Hire a worker"
// - Install: "Train worker & give tools"
// - Activate: "Worker is ready for duty"
// - Fetch: "Worker handles incoming requests"
//
// -----------------------------------------------------------------------------
// 3) Example: Registering a Service Worker
// -----------------------------------------------------------------------------

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => console.log("✅ Service Worker registered"))
    .catch((err) => console.log("❌ SW registration failed", err));
}

// -----------------------------------------------------------------------------
// 4) Inside sw.js (Service Worker File)
// -----------------------------------------------------------------------------

// Install Event → Cache files initially
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache-v1").then((cache) => {
      return cache.addAll(["/", "/index.html", "/style.css", "/script.js"]);
    })
  );
  console.log("📦 Service Worker: Installed and cached files");
});

// Activate Event → Cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== "my-cache-v1")
            .map((key) => caches.delete(key))
        )
      )
  );
  console.log("♻️ Service Worker: Activated and cleaned old caches");
});

// Fetch Event → Intercept requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request); // Cache-first, fallback to network
    })
  );
});

// -----------------------------------------------------------------------------
// 5) Cache API (Basics)
// -----------------------------------------------------------------------------
async function cacheExample() {
  const cache = await caches.open("my-cache");
  await cache.put("/hello.txt", new Response("Hello World!")); // Save
  const response = await cache.match("/hello.txt"); // Read
  console.log(await response.text()); // Output: Hello World!
}
cacheExample();

// -----------------------------------------------------------------------------
// 6) Interview Q&A
// -----------------------------------------------------------------------------
//
// Q1) What is a Service Worker?
// A1) A script that runs in the background, intercepts requests, and enables offline caching.
//
// Q2) Why are Service Workers HTTPS only?
// A2) For security reasons (they can intercept network requests, so must be secure).
//
// Q3) What are the main events in a Service Worker lifecycle?
// A3) install → activate → fetch.
//
// Q4) How is Service Worker different from LocalStorage?
// A4) - LocalStorage stores key-value data (synchronous).
//     - Service Worker manages caching of full requests/responses (async).
//
// Q5) Can a Service Worker update automatically?
// A5) Yes, browser checks for updates every time the page loads.
//
// -----------------------------------------------------------------------------
// ✅ Easy way to remember
// -----------------------------------------------------------------------------
// Service Worker = "Middleman between Browser & Server"
// - Install → Cache stuff initially
// - Activate → Remove old junk
// - Fetch → Serve cached data (or network if missing)
// Makes websites work offline like an "App".
//
// ============================================================================
// End of Notes
// ============================================================================
// ============================================================================
// 🍽️ Service Worker Real-World Analogy (Restaurant Waiter)
// ============================================================================
//
// Imagine you go to a restaurant:
//
// 1) Register → You hire a waiter (register service worker).
// 2) Install → The waiter memorizes the menu and keeps a notepad (cache files).
// 3) Activate → Old waiters leave, only the new waiter serves you (clear old caches).
// 4) Fetch → Whenever you order food (make a network request):
//       - If the waiter already wrote it down in the notepad (cached response),
//         he serves it instantly 🍲 (offline support).
//       - If not, he goes to the kitchen (fetch from server).
//
// ✅ Benefit:
//   - Faster service (cached responses).
//   - Even if the kitchen (server) is closed, waiter can still serve you
//     something from his notes (offline).
//
// -----------------------------------------------------------------------------
// Quick Example Mapping:
// -----------------------------------------------------------------------------
// 🍴 Restaurant → Browser
// 👨‍🍳 Kitchen → Real Server
// 🧑‍🍳 Waiter → Service Worker
// 📝 Notepad → Cache API
// 🍲 Food → Response (data, images, HTML)
//
// ============================================================================
//
// So, remember:
// - Service Worker = Waiter
// - Cache = Waiter’s notepad
// - Fetch = Order food
//
// ============================================================================
// ```
