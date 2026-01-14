// ============================================================================
// 15) ⏳ TTL & 🍪 Cookie Expiry Basics — JS Notes
// ============================================================================
//
// 📝 Theory
// ----------
// TTL = "Time To Live" → how long data stays valid before it expires.
//
// In browsers, the most common place we use TTL is in **cookies**.
// - A cookie can be set with an expiry date (or max-age).
// - After expiry, the browser automatically deletes it.
// - If no expiry is set → cookie becomes a "session cookie"
//   (it lasts only until the browser/tab is closed).
//
// -----------------------------------------------------------------------------
// 1) Cookie Expiry with "expires"
// -----------------------------------------------------------------------------
// You can set a cookie with an expiry date/tie.

document.cookie = "user=Avi; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";
console.log(document.cookie); // "user=Avi"

// After Dec 31, 2025 → this cookie will be deleted automatically.

// -----------------------------------------------------------------------------
// 2) Cookie Expiry with "max-age"
// -----------------------------------------------------------------------------
// max-age sets cookie lifetime in SECONDS (relative, easier to use).
// Example: expire after 60 seconds

document.cookie = "session=12345; max-age=60; path=/";
console.log(document.cookie); // "session=12345"

// After 60 seconds → cookie automatically removed.

// -----------------------------------------------------------------------------
// 3) Session Cookies
// -----------------------------------------------------------------------------
// If you don’t set "expires" or "max-age",
// cookie will be deleted when browser/tab is closed.

document.cookie = "theme=dark";
console.log(document.cookie); // "theme=dark"
// ❌ Deleted after browser close

// -----------------------------------------------------------------------------
// 4) TTL in General (Beyond Cookies)
// -----------------------------------------------------------------------------
// TTL is also used in:
// - DNS (how long before domain info refreshes).
// - Cache storage (how long cached data stays valid).
// - Databases/Redis (expiry on stored values).
//
// Example: Redis → set key with TTL of 120 seconds:
//   SETEX user:1 120 "Avi"
// After 120s → key auto-deleted.
//
// -----------------------------------------------------------------------------
// 5) Why Cookie Expiry Matters
// -----------------------------------------------------------------------------
// - Authentication: JWT tokens/cookies should expire after certain time.
// - Security: Expired cookies reduce risk if stolen.
// - Performance: Prevents storing unnecessary old data.
//
// -----------------------------------------------------------------------------
// 6) Interview Q&A
// -----------------------------------------------------------------------------
//
// Q1) What is TTL?
// A1) TTL (Time To Live) is the lifespan of data before it is deleted automatically.
//
// Q2) How do you set cookie expiry?
// A2) Either using `expires=<date>` or `max-age=<seconds>`.
//
// Q3) Difference between "expires" and "max-age"?
// A3)
// - expires → exact date/time in GMT (absolute).
// - max-age → number of seconds from now (relative).
//
// Q4) What happens if a cookie has no expiry?
// A4) It becomes a session cookie and gets deleted when browser closes.
//
// Q5) Which one is better to use: "expires" or "max-age"?
// A5) `max-age` is more reliable, because `expires` depends on system clock.
//
// -----------------------------------------------------------------------------
// ✅ Easy way to remember
// -----------------------------------------------------------------------------
// - expires = "End date" (like an expiry date on milk carton 🥛).
// - max-age = "Countdown" (like a timer ⏱️).
// - No expiry = "Session only" (ends when you close the tab 🚪).
//
// ============================================================================
// End of Notes
// ============================================================================
