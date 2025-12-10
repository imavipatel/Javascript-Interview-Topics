// ============================================================================
// 5) 📘 Advanced JS – Error Handling (try/catch/finally, custom errors)
// ============================================================================
//
// Topics covered:
// 1) try/catch/finally
// 2) throw custom errors
//
// -----------------------------------------------------------------------------

// ============================================================================
// 1) try/catch/finally
// ============================================================================
// - JavaScript uses try/catch to **handle runtime errors** gracefully.
// - try → contains code that may throw an error
// - catch → handles the error
// - finally → always executes (optional), cleanup code

try {
  console.log("Start of try block");
  let result = 10 / 0; // no error in JS, returns Infinity
  console.log("Result:", result);

  // Throwing a manual error
  throw new Error("Something went wrong!");
} catch (err) {
  console.log("Caught error:", err.message);
  // Caught error: Something went wrong!
} finally {
  console.log("Finally block executed");
}

// ✅ Notes:
// - Code after throw in try is skipped
// - finally executes regardless of error occurrence
// - Multiple catch blocks not supported in JS (ES10+ supports optional chaining for error handling)

// ============================================================================
// 2) Custom Errors
// ============================================================================
// - You can create your own error types using `throw`
// - Can be used for validation or business logic errors

function validateAge(age) {
  if (age < 0) throw new RangeError("Age cannot be negative");
  if (age > 120) throw new RangeError("Age cannot exceed 120");
  console.log("Valid age:", age);
}

try {
  validateAge(-5);
} catch (err) {
  console.log(err.name + ":", err.message);
  // RangeError: Age cannot be negative
}

try {
  validateAge(150);
} catch (err) {
  console.log(err.name + ":", err.message);
  // RangeError: Age cannot exceed 120
}

validateAge(25); // Valid age: 25

// ✅ Notes:
// - Common error types: Error, TypeError, RangeError, SyntaxError, ReferenceError
// - Custom errors improve **debugging & clarity** in larger apps

// ============================================================================
// 🔑 Key Points Summary
// ============================================================================
// 1) try → run risky code
// 2) catch → handle errors gracefully
// 3) finally → always executes, used for cleanup
// 4) throw → manually throw errors
// 5) Custom errors → create meaningful messages for developers or users
// 6) Use error.name and error.message to identify issues

// ============================================================================
// ❓ Q & A
// ============================================================================
// Q1) Does finally execute if there is no error?
// 👉 Yes, finally always executes.
//
// Q2) Can catch block be skipped?
// 👉 Only if try block has no error and catch exists (catch still executes only on error)
//
// Q3) What are common built-in error types in JS?
// 👉 Error, TypeError, ReferenceError, RangeError, SyntaxError
//
// Q4) How to create a custom error?
// 👉 Use `throw new Error("message")` or `throw new RangeError("message")`
//
// Q5) Why use try/catch/finally?
// 👉 To handle runtime errors safely and prevent app crash.
