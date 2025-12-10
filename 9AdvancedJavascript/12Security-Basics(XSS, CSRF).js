// ============================================================================
// 12) 📘 Advanced JS – Security Basics (XSS, CSRF)
// ============================================================================
//
// Topics covered:
// 1) What is XSS (Cross-Site Scripting)
// 2) Types of XSS
// 3) Preventing XSS
// 4) What is CSRF (Cross-Site Request Forgery)
// 5) Preventing CSRF
//
// -----------------------------------------------------------------------------

// ============================================================================
// 1) What is XSS (Cross-Site Scripting)
// ============================================================================
// - XSS is a security vulnerability where **attacker injects malicious scripts** into webpages
// - Can steal cookies, session tokens, or perform actions on behalf of the user

// Example of XSS (vulnerable site)
const userInput = "<img src=x onerror=alert('Hacked!') />";
document.getElementById("output").innerHTML = userInput;
// ⚠️ This executes attacker-provided script

// ============================================================================
// 2) Types of XSS
// ============================================================================
// 1) **Stored XSS** → Malicious code is stored on server (database, comments) and served to users
// 2) **Reflected XSS** → Malicious code is in URL/query, reflected immediately
// 3) **DOM-based XSS** → Manipulates DOM directly using unsafe JS

// ============================================================================
// 3) Preventing XSS
// ============================================================================
// - Always **sanitize user input**
// - Avoid `innerHTML` with untrusted content
// - Use `textContent` instead of `innerHTML`
// - Use libraries like DOMPurify to clean input

const safeInput = "<img src=x onerror=alert('Hacked!') />";
document.getElementById("output").textContent = safeInput;
// ✅ Renders safely as text, no script execution

// ============================================================================
// 4) What is CSRF (Cross-Site Request Forgery)
// ============================================================================
// - CSRF tricks **authenticated users** into performing unwanted actions
// - Example: user logged in to bank, attacker sends a hidden request from malicious site

/*
<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="amount" value="1000">
  <input type="hidden" name="to" value="attackerAccount">
  <input type="submit" />
</form>
*/
// If user is logged in, this may transfer money without their consent

// ============================================================================
// 5) Preventing CSRF
// ============================================================================
// 1) **CSRF tokens** → unique per session, verified by server
// 2) **SameSite cookies** → restrict cookies to same origin
// 3) **Double submit cookies** → send token in cookie + request body
// 4) Use **custom headers** in AJAX requests

// Example: Fetch with CSRF token
fetch("/api/transfer", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "CSRF-Token": "abc123",
  },
  body: JSON.stringify({ amount: 1000, to: "friendAccount" }),
});

// ============================================================================
// 🔑 Key Points Summary
// ============================================================================
// 1) XSS → attacker injects scripts into your site; prevent by sanitizing input
// 2) CSRF → attacker forces user to make unwanted requests; prevent with tokens/SameSite cookies
// 3) Always validate and escape input/output in web apps
// 4) Modern frameworks (React, Angular) handle some XSS automatically, but vigilance is needed

// ============================================================================
// ❓ Q & A
// ============================================================================
// Q1) What is the difference between XSS and CSRF?
// 👉 XSS injects malicious scripts; CSRF forces authenticated users to perform actions without consent.
//
// Q2) Can XSS steal cookies?
// 👉 Yes, attacker scripts can read cookies if not HttpOnly.
//
// Q3) How can we prevent XSS?
// 👉 Sanitize input, use textContent, use security libraries like DOMPurify.
//
// Q4) How can we prevent CSRF?
// 👉 Use CSRF tokens, SameSite cookies, custom headers, or double submit cookies.
//
// Q5) Are modern frameworks safe from XSS?
// 👉 Mostly yes for typical use cases, but unsafe patterns (innerHTML, eval) can still be exploited.
