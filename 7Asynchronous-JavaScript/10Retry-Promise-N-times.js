// ============================================================================
// 10) Retry Promise N times
// ============================================================================
//
// 🔹 Goal (Simple):
// When an async task (like a network request) fails temporarily, try it again
// up to N times so transient errors don't break your app. Each retry can wait
// a little (delay) or use exponential backoff.
//
// Use-cases:
// - Flaky network requests
// - Temporary API rate limits
// - Intermittent DB or service timeouts
//
// Important idea (in plain English):
// - Try the operation.
// - If it succeeds → done.
// - If it fails → wait (maybe) and try again, up to a maximum number of attempts.
// - If all attempts fail → return the last error so the caller can handle it.
//
// ----------------------------------------------------------------------------
// Part 1: Basic retry wrapper (fixed attempts, no delay)
// ----------------------------------------------------------------------------
function retry(fn, attempts = 3) {
  // fn must be a function that returns a Promise when called.
  return function (...args) {
    let tries = 0;
    function attempt() {
      tries++;
      return fn(...args).catch((err) => {
        if (tries >= attempts) {
          // ran out of attempts → rethrow last error
          return Promise.reject(err);
        }
        // otherwise try again
        return attempt();
      });
    }
    return attempt();
  };
}

/*
Example usage (simulate a flaky task):
- The following fakeTask randomly fails to show retry behavior.
*/
function flakyTask() {
  return new Promise((resolve, reject) => {
    const succeed = Math.random() > 0.6; // 40% success
    setTimeout(() => {
      if (succeed) resolve("OK");
      else reject(new Error("Temporary error"));
    }, 200);
  });
}

const safeFlaky = retry(flakyTask, 5);

// Running:
safeFlaky()
  .then((v) => console.log("Succeeded:", v))
  .catch((e) => console.log("Failed after retries:", e.message));

// Output example (non-deterministic):
// - either "Succeeded: OK" (if any attempt succeeded)
// - or "Failed after retries: Temporary error" (if all attempts failed)

// ----------------------------------------------------------------------------
// Part 2: Retry with fixed delay between attempts
// ----------------------------------------------------------------------------
function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

function retryWithDelay(fn, attempts = 3, delay = 500) {
  return function (...args) {
    let tries = 0;
    function attempt() {
      tries++;
      return fn(...args).catch((err) => {
        if (tries >= attempts) return Promise.reject(err);
        return sleep(delay).then(attempt);
      });
    }
    return attempt();
  };
}

// Usage:
const safeFlakyWithDelay = retryWithDelay(flakyTask, 4, 300);
safeFlakyWithDelay()
  .then((v) => console.log("Succeeded with delay:", v))
  .catch((e) => console.log("Failed after retries (delay):", e.message));

// ----------------------------------------------------------------------------
// Part 3: Exponential Backoff (delay grows each retry)
// ----------------------------------------------------------------------------
// delay = baseDelay * 2^(attempt-1)  (1x, 2x, 4x, 8x, ...)
function retryExponential(fn, attempts = 5, baseDelay = 200) {
  return function (...args) {
    let tries = 0;
    function attempt() {
      tries++;
      return fn(...args).catch((err) => {
        if (tries >= attempts) return Promise.reject(err);
        const wait = baseDelay * Math.pow(2, tries - 1);
        // optional: add jitter to avoid thundering herd
        const jitter = Math.random() * (wait / 4);
        return sleep(wait + jitter).then(attempt);
      });
    }
    return attempt();
  };
}

// Usage:
const safeFlakyBackoff = retryExponential(flakyTask, 5, 100);
safeFlakyBackoff()
  .then((v) => console.log("Succeeded with backoff:", v))
  .catch((e) => console.log("Failed after backoff retries:", e.message));

// ----------------------------------------------------------------------------
// Part 4: Retry with predicate (only retry for certain errors/statuses)
// ----------------------------------------------------------------------------
// Useful when some errors should NOT be retried (e.g., 4xx client errors).

function retryIf(fn, attempts = 3, delay = 200, shouldRetry = (_err) => true) {
  return function (...args) {
    let tries = 0;
    function attempt() {
      tries++;
      return fn(...args).catch((err) => {
        // ask the predicate whether to retry
        if (!shouldRetry(err) || tries >= attempts) return Promise.reject(err);
        return sleep(delay).then(attempt);
      });
    }
    return attempt();
  };
}

/*
Example: Only retry for network errors (simulated by err.isNetwork)
*/
function simulatedFetch() {
  return new Promise((res, rej) => {
    const err =
      Math.random() > 0.7
        ? { isNetwork: false, message: "400 Bad" }
        : { isNetwork: true, message: "Network fail" };
    setTimeout(() => (Math.random() > 0.5 ? res("data") : rej(err)), 100);
  });
}

const retryNetworkOnly = retryIf(
  simulatedFetch,
  4,
  200,
  (err) => !!err.isNetwork
);
retryNetworkOnly()
  .then((v) => console.log("Network-only retry succeeded:", v))
  .catch((e) => console.log("Network-only retry failed:", e));

// ----------------------------------------------------------------------------
// Part 5: Async/Await style (loop instead of recursion)
// ----------------------------------------------------------------------------
// Some prefer using async/await with a for-loop for readability.

function retryAwait(fn, attempts = 3, delay = 200) {
  return async function (...args) {
    let lastErr;
    for (let i = 0; i < attempts; i++) {
      try {
        return await fn(...args);
      } catch (err) {
        lastErr = err;
        if (i === attempts - 1) break; // last attempt -> give up
        await sleep(delay);
      }
    }
    throw lastErr;
  };
}

// Usage:
const safeFlakyAwait = retryAwait(flakyTask, 4, 250);
(async () => {
  try {
    const r = await safeFlakyAwait();
    console.log("Await-style succeeded:", r);
  } catch (e) {
    console.log("Await-style failed:", e.message);
  }
})();

// ----------------------------------------------------------------------------
// Part 6: Retry an HTTP fetch with AbortController and backoff (browser)
// ----------------------------------------------------------------------------
// Example pattern (browser environment):
/*
async function fetchWithRetry(url, options = {}, attempts = 3, baseDelay = 500) {
  for (let i = 0; i < attempts; i++) {
    const controller = new AbortController();
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      if (!res.ok && res.status >= 400 && res.status < 500) {
        // client errors: don't retry
        throw new Error(`HTTP ${res.status}`);
      }
      return res; // success
    } catch (err) {
      if (i === attempts - 1) throw err;
      const wait = baseDelay * Math.pow(2, i);
      await sleep(wait);
      // optionally controller.abort() if you want to cancel in-flight fetch on next retry
    }
  }
}
*/

// ----------------------------------------------------------------------------
// Part 7: Important Notes & Best Practices (easy language)
// ----------------------------------------------------------------------------
// - Be careful: retrying non-idempotent operations (e.g., POST that creates) may
//   cause duplicate side-effects. Prefer retrying idempotent requests (GET, PUT).
// - Use backoff (exponential) to reduce load on the server when many clients retry.
// - Add jitter (randomness) to avoid synchronized retries (thundering herd).
// - Limit attempts to avoid infinite loops and wasted resources.
// - Consider overall timeout or cancellation (AbortController) in real apps.
// - Decide which errors are retryable (network/timeouts) vs not (validation errors).
//
// ----------------------------------------------------------------------------
// ❓ Interview Q&A
// ----------------------------------------------------------------------------
// Q1) What is retrying a Promise?
// A1: Attempting the same async operation multiple times when it fails, up to N tries.
//
// Q2) Why exponential backoff?
// A2: To progressively wait longer between tries, reducing server pressure and
//     increasing chance the transient issue clears.
//
// Q3) When should you NOT retry?
// A3: When operations are non-idempotent (they cause permanent side-effects) or
//     when the error is a client error (e.g., 400 Bad Request).
//
// Q4) How to add jitter, in simple words?
// A4: Add a small random amount to the wait time so many clients don't retry at once.
//
// Q5) Should retries be infinite?
// A5: No — always cap attempts and consider an overall timeout or cancellation.
//
// ----------------------------------------------------------------------------
// End of "Retry Promise N times" notes
// ============================================================================
