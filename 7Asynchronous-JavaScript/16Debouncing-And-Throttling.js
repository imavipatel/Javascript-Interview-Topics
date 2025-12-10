// ============================================================================
// 16) Debouncing & Throttling
// ============================================================================
//
// 📌 Why needed?
// - In JavaScript, events like typing, scrolling, resizing, or clicking
//   can fire many times in a short period.
// - This may cause performance issues (too many function calls).
// - To control this, we use: Debouncing & Throttling.
//
// ============================================================================
// 1) DEBOUNCING
// ============================================================================
//
// 👉 "Wait until user stops typing (or action stops) before calling function"
// 👉 Executes function ONLY after a certain delay since the LAST event.
// 👉 Useful for: search box, autocomplete, resize events.
//
// ----------------------------------------------------------------------------
// Example: Debouncing
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer); // reset timer every time function is called
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function searchQuery(query) {
  console.log("🔍 Searching for:", query);
}

// Wrap the search function with debounce
const debouncedSearch = debounce(searchQuery, 500);

// Simulating user typing
debouncedSearch("J");
debouncedSearch("Ja");
debouncedSearch("Jav");
debouncedSearch("Java");
// Only the last call ("Java") will execute after 500ms delay

// ============================================================================
// 2) THROTTLING
// ============================================================================
//
// 👉 "Execute function at regular intervals, no matter how many times triggered"
// 👉 Executes function ONCE per time interval.
// 👉 Useful for: scroll events, window resize, button clicks.
//
// ----------------------------------------------------------------------------
// Example: Throttling
function throttle(fn, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

function logScroll() {
  console.log("📜 Scroll event at", new Date().toLocaleTimeString());
}

const throttledScroll = throttle(logScroll, 1000);

// Simulating scroll events (fires every 50ms)
let interval = setInterval(throttledScroll, 50);
setTimeout(() => clearInterval(interval), 4000);

// Output: Will log only once per second, not 80 times!
// ============================================================================
//
// 📊 Quick Comparison
// ----------------------------------------------------------------------------
// Feature              | Debouncing                   | Throttling
// -----------------------------------------------------------------------------
// When executed?       | After user stops action      | At fixed intervals
// Example use case     | Search bar, resize           | Scroll, button spam
// Skips intermediate   | Yes (only last call matters) | Yes (only executes per interval)
//
// ============================================================================
// ❓ Interview Q&A
// ============================================================================
//
// Q1) What is Debouncing?
// 👉 A technique to call a function only after the user stops performing an action.
//
// Q2) What is Throttling?
// 👉 A technique to limit how often a function runs in a given time frame.
//
// Q3) Real-life examples?
// 👉 Debounce: Search suggestions should show only after typing stops.
// 👉 Throttle: Scroll handler should update position once every 200ms.
//
// Q4) Which improves performance more?
// 👉 Both do, depending on use case:
//    - Debounce = wait for pause
//    - Throttle = run at fixed pace
//
// Q5) Can you use both together?
// 👉 Yes, sometimes combined for maximum efficiency.
//
// ============================================================================
// ✅ Easy to Remember
// ----------------------------------------------------------------------------
// Debounce → "Wait until done" (e.g., typing search)
// Throttle → "Do at regular pace" (e.g., scroll)
// ============================================================================
// End of Debounce & Throttle Notes
// ============================================================================
