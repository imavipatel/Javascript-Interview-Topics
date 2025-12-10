// ============================================================================
// 14) 🍪 Cookies vs 💾 LocalStorage vs 📄 SessionStorage — JS Notes
// ============================================================================
//
// 📝 Theory
// ----------
// All three (Cookies, localStorage, sessionStorage) are ways to store data
// in the browser. But they differ in **size, expiry, and usage**.
//
// -----------------------------------------------------------------------------
// 1) Cookies
// -----------------------------------------------------------------------------
// - Oldest storage mechanism (used since the early web).
// - Can store only ~4KB data.
// - Automatically sent to the server with every HTTP request (slower).
// - Used for: authentication tokens, server-side sessions.
// - Expiry: You can set expiry date (default: deleted when browser closes).
//
// Example:
document.cookie = "user=Avi; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";
console.log(document.cookie); // "user=Avi"

// -----------------------------------------------------------------------------
// 2) localStorage
// -----------------------------------------------------------------------------
// - Modern storage (HTML5).
// - Can store ~5–10MB of data (much bigger than cookies).
// - Data persists even after closing/reopening the browser.
// - NOT automatically sent to the server (faster).
// - Used for: preferences, saved cart, theme, offline data.
//
// Example:
localStorage.setItem("theme", "dark");
console.log(localStorage.getItem("theme")); // "dark"
localStorage.removeItem("theme");

// -----------------------------------------------------------------------------
// 3) sessionStorage
// -----------------------------------------------------------------------------
// - Similar to localStorage but temporary.
// - Data exists only until the tab/browser is closed.
// - Useful for temporary data (session login, form filling).
//
// Example:
sessionStorage.setItem("page", "home");
console.log(sessionStorage.getItem("page")); // "home"
sessionStorage.clear();

// -----------------------------------------------------------------------------
// 4) Key Differences (Comparison Table)
// -----------------------------------------------------------------------------
//
// Feature              | Cookies           | localStorage        | sessionStorage
// ---------------------------------------------------------------------------------
// Capacity             | ~4KB              | 5–10MB              | 5–10MB
// Expiry               | Manual / set date | Never (until cleared)| On tab close
// Sent to server?      | ✅ Yes             | ❌ No                | ❌ No
// Access (JS API)      | document.cookie   | localStorage API    | sessionStorage API
// Good for             | Authentication    | Long-term data      | Temporary data
//
// -----------------------------------------------------------------------------
// 5) Practical Example
// -----------------------------------------------------------------------------
//
// - Cookies: store JWT token for login (needs to be sent to server).
// - localStorage: store cart items so they persist after user revisits site.
// - sessionStorage: store a one-time coupon applied during the session.
//
// -----------------------------------------------------------------------------
// 6) Interview Q&A
// -----------------------------------------------------------------------------
//
// Q1) What is the main difference between cookies, localStorage, and sessionStorage?
// A1) Cookies are small and sent to the server automatically, while localStorage
//     and sessionStorage are larger and stay only in the browser.
//
// Q2) Which one should you use for authentication?
// A2) Cookies (because they are sent to the server with requests).
//
// Q3) Why is localStorage better for storing user preferences than cookies?
// A3) It is bigger (5–10MB), faster (not sent to server), and persists across sessions.
//
// Q4) What happens to sessionStorage if you close the browser tab?
// A4) It gets cleared immediately (data gone).
//
// Q5) Which one is most secure?
// A5) None should store passwords directly.
//     Cookies (HttpOnly, Secure) can be safer for tokens.
//     localStorage/sessionStorage can be vulnerable to XSS.
//
// -----------------------------------------------------------------------------
// ✅ Easy way to remember
// -----------------------------------------------------------------------------
// - Cookies 🍪 = Small, server-linked, old-school
// - localStorage 💾 = Big box, permanent, client-only
// - sessionStorage 📄 = Big box, but temporary (tab-only)
//
// ============================================================================
// End of Notes
// ============================================================================
