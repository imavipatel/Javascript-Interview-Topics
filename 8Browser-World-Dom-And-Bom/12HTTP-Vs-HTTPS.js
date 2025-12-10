// ============================================================================
// 12) 🌐 HTTP vs HTTPS — JS Notes
// ============================================================================
//
// 📝 Theory:
// ----------
// When we open a website, the browser communicates with the server using a protocol.
// The two common protocols are:
//   ✅ HTTP  → HyperText Transfer Protocol (NOT secure)
//   ✅ HTTPS → HyperText Transfer Protocol Secure (secure, uses encryption)
//
// -----------------------------------------------------------------------------
// 1) HTTP (HyperText Transfer Protocol)
// -----------------------------------------------------------------------------
// - Basic protocol to transfer data between browser & server
// - Data is sent as plain text (no encryption)
// - Anyone (like hackers) can "listen" (intercept) and read your data
// - Used in older websites, not safe for login, banking, payments
//
// Example URL:  http://example.com
//
// -----------------------------------------------------------------------------
// 2) HTTPS (HyperText Transfer Protocol Secure)
// -----------------------------------------------------------------------------
// - Secure version of HTTP
// - Uses SSL/TLS encryption to protect data
// - Ensures:
//    🔒 Confidentiality → Data is encrypted (hackers can't read it)
//    ✅ Integrity → Data cannot be modified during transfer
//    🪪 Authentication → Confirms the server is real (via SSL certificate)
// - Used in all modern websites (banking, e-commerce, APIs)
//
// Example URL:  https://example.com
//
// -----------------------------------------------------------------------------
// 3) Key Differences
// -----------------------------------------------------------------------------
//
// HTTP:
//   - No encryption
//   - Data sent in plain text
//   - Not safe for sensitive info
//
// HTTPS:
//   - Data encrypted using SSL/TLS
//   - Secure communication
//   - Required for modern apps & SEO ranking
//
// -----------------------------------------------------------------------------
// 4) Small Example
// -----------------------------------------------------------------------------
//
// Imagine you send your password "12345" to the server:
//
// 🔓 With HTTP:  "12345" → travels openly (anyone can read)
// 🔒 With HTTPS: "12345" → encrypted as "gibberishData@#$" (only server can decode)
//
// -----------------------------------------------------------------------------
// 5) Interview Q&A
// -----------------------------------------------------------------------------
//
// Q1) What is the difference between HTTP and HTTPS?
// A1) HTTP sends data in plain text (not secure), while HTTPS encrypts data using SSL/TLS (secure).
//
// Q2) Why is HTTPS important?
// A2) It protects sensitive data (like passwords, credit cards) from hackers,
//     and also builds trust with users (browser shows 🔒 padlock).
//
// Q3) What does SSL/TLS do?
// A3) It encrypts the communication between browser and server, so hackers cannot read or modify data.
//
// Q4) Can we run an e-commerce website on HTTP?
// A4) No, it's unsafe. Modern browsers also block payments on non-HTTPS sites.
//
// Q5) Does HTTPS make a website faster?
// A5) Slightly yes! Because of HTTP/2 support, HTTPS can be faster in many cases.
//
// -----------------------------------------------------------------------------
// ✅ Easy way to remember
// -----------------------------------------------------------------------------
// "S" in HTTPS = "Secure"
// If website URL starts with "https://", your data is encrypted and safer.
//
// ============================================================================
// End of Notes
// ============================================================================
