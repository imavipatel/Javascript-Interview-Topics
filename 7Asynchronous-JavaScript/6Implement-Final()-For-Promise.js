// ============================================================================
// 6) Implement finally() for Promise
// ============================================================================

// ----------------------------------------------------------------------------
// 🔹 THEORY
// ----------------------------------------------------------------------------
// 1. What is finally()?
//    - A method in Promises that runs AFTER the promise is settled
//      (either resolved ✅ or rejected ❌).
//    - Useful for cleanup tasks → closing DB, hiding loaders, releasing memory.
//
// 2. Behavior of finally():
//    - Does NOT modify the resolved value or rejection reason.
//    - It always passes through the same value/reason to the next then/catch.
//    - If finally() throws an error → the promise will reject with that error.
//
// 3. Why use finally()?
//    - Keeps code DRY (Don’t Repeat Yourself).
//    - Without finally(), you’d have to duplicate cleanup code in both
//      .then() and .catch().
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// ✅ Native Example
// ----------------------------------------------------------------------------
let p3 = Promise.resolve("Success");

p3.finally(() => {
  console.log("Cleanup after success"); // runs always
}).then((val) => {
  console.log("Resolved with:", val);
});

// Output:
// Cleanup after success
// Resolved with: Success

// ----------------------------------------------------------------------------
let p4 = Promise.reject("Failure");

p4.finally(() => {
  console.log("Cleanup after error"); // runs always
}).catch((err) => {
  console.log("Rejected with:", err);
});

// Output:
// Cleanup after error
// Rejected with: Failure

// ----------------------------------------------------------------------------
// 4. How to Implement finally()?
// ----------------------------------------------------------------------------
// Trick → Use `then()` internally because it handles both resolve and reject.
// Implementation must:
// - Always run the callback.
// - Pass through the original value/reason UNLESS the callback throws.
// ----------------------------------------------------------------------------

// ✅ Polyfill for Promise.prototype.finally
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (onFinally) {
    return this.then(
      (value) => Promise.resolve(onFinally()).then(() => value),
      (reason) =>
        Promise.resolve(onFinally()).then(() => {
          throw reason;
        })
    );
  };
}

// ----------------------------------------------------------------------------
// ✅ Test Our Polyfill
// ----------------------------------------------------------------------------

// Case 1: Resolved
Promise.resolve(42)
  .finally(() => {
    console.log("Case 1: cleanup after success");
  })
  .then((val) => {
    console.log("Case 1: value =", val);
  });

// Output:
// Case 1: cleanup after success
// Case 1: value = 42

// ----------------------------------------------------------------------------

// Case 2: Rejected
Promise.reject("Error occurred")
  .finally(() => {
    console.log("Case 2: cleanup after failure");
  })
  .catch((err) => {
    console.log("Case 2: caught =", err);
  });

// Output:
// Case 2: cleanup after failure
// Case 2: caught = Error occurred

// ----------------------------------------------------------------------------

// Case 3: finally itself throws
Promise.resolve("Data")
  .finally(() => {
    console.log("Case 3: inside finally");
    throw new Error("Error from finally");
  })
  .then((val) => {
    console.log("Case 3: value =", val);
  })
  .catch((err) => {
    console.log("Case 3: caught =", err.message);
  });

// Output:
// Case 3: inside finally
// Case 3: caught = Error from finally

// ----------------------------------------------------------------------------
// 📌 INTERVIEW NOTES
// ----------------------------------------------------------------------------
// Q1: What is the purpose of finally()?
// A1: To run cleanup code regardless of promise outcome (resolve or reject).
//
// Q2: Does finally() change the value of the promise?
// A2: No, it passes through the original value/reason, unless it throws an error.
//
// Q3: How can you implement finally()?
// A3: Using then(), wrapping the callback, and ensuring the value/reason passes.
//
// Q4: Where is finally() most useful?
// A4: Cleaning up resources (DB connections, timers, hiding loaders).
// ============================================================================
