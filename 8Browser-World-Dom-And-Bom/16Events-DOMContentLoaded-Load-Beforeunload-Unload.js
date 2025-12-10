// ============================================================================
// 16) 🎉 Browser Events: DOMContentLoaded, load, beforeunload, unload — JS Notes
// ============================================================================
//
// 📝 Theory
// ----------
// These are special browser lifecycle events that tell us what stage the page is in.
//
// 1) DOMContentLoaded → Fires when HTML is fully parsed,
//    but images, styles, and sub-resources may NOT be loaded yet.
//    ✅ Best for running DOM-related JavaScript quickly.
//
// 2) load → Fires when EVERYTHING (HTML, CSS, images, scripts, fonts, etc.)
//    is fully loaded.
//    ✅ Use if you need ALL resources ready (e.g., image size).
//
// 3) beforeunload → Fires before user leaves/refreshes the page.
//    ✅ Used to show "Do you want to leave?" confirmation.
//
// 4) unload → Fires when the page is unloading (closed/refresh/navigate away).
//    ✅ Used for cleanup (analytics pings, save state).
//    ❌ But not reliable for async tasks (browser may kill them).
//
// -----------------------------------------------------------------------------
// 1) DOMContentLoaded Example
// -----------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM is ready (but images might still be loading).");
  document.body.style.background = "lightyellow"; // Safe to manipulate DOM
});

// -----------------------------------------------------------------------------
// 2) load Example
// -----------------------------------------------------------------------------

window.addEventListener("load", () => {
  console.log("✅ Everything is fully loaded (images, CSS, etc.)");
});

// -----------------------------------------------------------------------------
// 3) beforeunload Example
// -----------------------------------------------------------------------------

window.addEventListener("beforeunload", (event) => {
  event.preventDefault(); // Standard way
  event.returnValue = ""; // Some browsers require this
  // Shows confirmation popup: "Do you want to leave this site?"
});

// -----------------------------------------------------------------------------
// 4) unload Example
// -----------------------------------------------------------------------------

window.addEventListener("unload", () => {
  console.log("🚪 Page is being closed/unloaded");
  // Can send analytics or cleanup here (sync only).
});

// -----------------------------------------------------------------------------
// 5) Timeline Analogy
// -----------------------------------------------------------------------------
//
// Page Load Lifecycle:
//    1. Browser starts loading HTML
//    2. ✅ DOMContentLoaded → HTML structure ready
//    3. ✅ load → Everything (CSS, images, fonts) ready
//    4. 🚪 beforeunload → User tries to leave/refresh
//    5. 🚪 unload → Page closed/navigated away
//
// -----------------------------------------------------------------------------
// 6) Interview Q&A
// -----------------------------------------------------------------------------
//
// Q1) Difference between DOMContentLoaded and load?
// A1)
// - DOMContentLoaded → only HTML parsed (fast).
// - load → all resources (CSS, images, iframes) loaded (slower).
//
// Q2) Which event is better for initializing JS?
// A2) DOMContentLoaded → because you can safely access the DOM quickly.
//
// Q3) Why use beforeunload?
// A3) To warn users if they might lose unsaved work before leaving.
//
// Q4) Can we rely on unload for saving data?
// A4) No, because async tasks may be killed. Use `navigator.sendBeacon()` instead.
//
// Q5) Example real-life analogy?
// A5)
// - DOMContentLoaded → "The stage is set, actors are ready" 🎭
// - load → "Audience, props, and costumes are also ready" 👗🎤
// - beforeunload → "Someone about to leave the theatre" 🚶‍♂️
// - unload → "The theatre is now closed" 🔒
//
// -----------------------------------------------------------------------------
// ✅ Easy way to remember
// -----------------------------------------------------------------------------
// - DOMContentLoaded = HTML ready 📄
// - load = EVERYTHING ready 📦
// - beforeunload = about to leave ⚠️
// - unload = already leaving 🚪
//
// ============================================================================
// End of Notes
// ============================================================================
