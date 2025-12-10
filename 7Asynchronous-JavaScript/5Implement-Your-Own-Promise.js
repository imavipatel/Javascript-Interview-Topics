// ============================================================================
// 5) Implement Your Own Promise (Educational Mini Promises/A+)
// ============================================================================
//
// 🎯 Goal
// -----
// Build a minimal Promise implementation to understand how real Promises work.
// We'll support:
//   - States: pending → fulfilled | rejected (immutable after settling)
//   - then(onFulfilled, onRejected) with chaining
//   - catch(onRejected)
//   - finally(onFinally)
//   - Static helpers: resolve, reject, all, allSettled, race, any
//   - Microtask scheduling (like real Promises)
//
// ⚠️ Note
// -----
// This is an educational implementation. Real Promises are more nuanced and
// handle many edge cases. Still, this covers the core resolution procedure,
// thenable assimilation, and async job queue semantics.
//
// ----------------------------------------------------------------------------
// Part 1: Core Concepts (Theory)
// ----------------------------------------------------------------------------
//
// 1) States
//    - PENDING: initial state
//    - FULFILLED: set with a value (resolved)
//    - REJECTED: set with a reason (error)
//    Once fulfilled/rejected → cannot change again.
//
// 2) Resolution Procedure
//    When resolving with a value:
//      - If the value is a thenable (i.e., has a `then` method),
//        we must "adopt" its state (call its then and follow its outcome).
//      - If resolving with itself → reject with TypeError (self-resolution).
//
// 3) Async Semantics
//    - then/catch/finally handlers must run asynchronously (microtasks).
//      We'll use `queueMicrotask` if available, else fallback to setTimeout(…, 0).
//
// 4) then() returns a NEW promise
//    - The return value of onFulfilled/onRejected becomes the resolution value
//      of the returned promise.
//    - If a handler throws, the returned promise rejects with that error.
//
// ----------------------------------------------------------------------------
// Part 2: Implementation
// ----------------------------------------------------------------------------

(function (global) {
  const PENDING = 0;
  const FULFILLED = 1;
  const REJECTED = 2;

  // Microtask queue helper (mimics native Promise jobs)
  function queueJob(fn) {
    if (typeof queueMicrotask === "function") {
      queueMicrotask(fn);
    } else if (typeof MutationObserver !== "undefined") {
      // Microtask fallback for older browsers
      const div = document.createElement("div");
      const observer = new MutationObserver(() => {
        observer.disconnect();
        fn();
      });
      observer.observe(div, { attributes: true });
      div.setAttribute("data-x", "1");
    } else {
      // Last resort (macrotask)
      setTimeout(fn, 0);
    }
  }

  class MyPromise {
    constructor(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("MyPromise resolver is not a function");
      }

      this._state = PENDING;
      this._value = undefined;
      this._handlers = []; // queued "then" handlers: { onFulfilled, onRejected, resolve, reject }

      const resolve = (value) => this._resolve(value);
      const reject = (reason) => this._reject(reason);

      try {
        executor(resolve, reject);
      } catch (err) {
        reject(err);
      }
    }

    // ---- Internal: resolve / reject / settle / flush ----

    _resolve(value) {
      if (this._state !== PENDING) return;

      // Self-resolution guard
      if (value === this) {
        return this._reject(
          new TypeError("Cannot resolve promise with itself")
        );
      }

      // Thenable assimilation
      if (value && (typeof value === "object" || typeof value === "function")) {
        let then;
        try {
          then = value.then; // may throw
        } catch (err) {
          return this._reject(err);
        }

        if (typeof then === "function") {
          let called = false;
          try {
            then.call(
              value,
              (v) => {
                if (!called) {
                  called = true;
                  this._resolve(v);
                }
              },
              (r) => {
                if (!called) {
                  called = true;
                  this._reject(r);
                }
              }
            );
            return; // important: don't continue
          } catch (err) {
            if (!called) this._reject(err);
            return;
          }
        }
      }

      // Fulfill with non-thenable value
      this._state = FULFILLED;
      this._value = value;
      this._flush();
    }

    _reject(reason) {
      if (this._state !== PENDING) return;

      this._state = REJECTED;
      this._value = reason;
      this._flush();
    }

    _flush() {
      // Schedule to run all handlers asynchronously
      queueJob(() => {
        while (this._handlers.length) {
          const { onFulfilled, onRejected, resolve, reject } =
            this._handlers.shift();

          try {
            if (this._state === FULFILLED) {
              if (typeof onFulfilled === "function") {
                // Handler return becomes next promise's resolution
                resolve(onFulfilled(this._value));
              } else {
                // If no handler, pass through value
                resolve(this._value);
              }
            } else if (this._state === REJECTED) {
              if (typeof onRejected === "function") {
                resolve(onRejected(this._value));
              } else {
                reject(this._value);
              }
            }
          } catch (err) {
            reject(err);
          }
        }
      });
    }

    // ---- Public API: then, catch, finally ----

    then(onFulfilled, onRejected) {
      return new MyPromise((resolve, reject) => {
        this._handlers.push({ onFulfilled, onRejected, resolve, reject });
        if (this._state !== PENDING) {
          this._flush(); // already settled → schedule handlers
        }
      });
    }

    catch(onRejected) {
      return this.then(undefined, onRejected);
    }

    finally(onFinally) {
      // Ensure onFinally runs and value/reason passes through
      return this.then(
        (v) =>
          MyPromise.resolve(
            isCallable(onFinally) ? onFinally() : undefined
          ).then(() => v),
        (e) =>
          MyPromise.resolve(
            isCallable(onFinally) ? onFinally() : undefined
          ).then(() => {
            throw e;
          })
      );
    }

    // ---- Static Helpers ----

    static resolve(value) {
      if (value instanceof MyPromise) return value;
      return new MyPromise((res) => res(value));
    }

    static reject(reason) {
      return new MyPromise((_, rej) => rej(reason));
    }

    static all(iterable) {
      const arr = Array.from(iterable);
      return new MyPromise((resolve, reject) => {
        if (arr.length === 0) return resolve([]);
        const out = new Array(arr.length);
        let done = 0;
        arr.forEach((p, i) => {
          MyPromise.resolve(p).then((val) => {
            out[i] = val;
            if (++done === arr.length) resolve(out);
          }, reject);
        });
      });
    }

    static allSettled(iterable) {
      const arr = Array.from(iterable);
      return MyPromise.all(
        arr.map((p) =>
          MyPromise.resolve(p)
            .then((value) => ({ status: "fulfilled", value }))
            .catch((reason) => ({ status: "rejected", reason }))
        )
      );
    }

    static race(iterable) {
      return new MyPromise((resolve, reject) => {
        for (const p of iterable) {
          MyPromise.resolve(p).then(resolve, reject);
        }
      });
    }

    static any(iterable) {
      const arr = Array.from(iterable);
      if (arr.length === 0) {
        // Mirror native behavior
        return MyPromise.reject(
          new AggregateError([], "All promises were rejected")
        );
      }
      let rejectedCount = 0;
      const errors = [];
      return new MyPromise((resolve, reject) => {
        arr.forEach((p, i) =>
          MyPromise.resolve(p).then(resolve, (err) => {
            errors[i] = err;
            if (++rejectedCount === arr.length) {
              reject(new AggregateError(errors, "All promises were rejected"));
            }
          })
        );
      });
    }
  }

  function isCallable(x) {
    return typeof x === "function";
  }

  // Expose globally for demos:
  global.MyPromise = MyPromise;
})(typeof globalThis !== "undefined" ? globalThis : window);

// ----------------------------------------------------------------------------
// Part 3: Usage Examples & Expected Behavior
// ----------------------------------------------------------------------------

// 1) Basic resolve / then / finally
const p1 = new MyPromise((resolve) => {
  setTimeout(() => resolve(42), 50);
});
p1.then((v) => {
  console.log("[p1] fulfilled with:", v); // 42
  return v + 1;
})
  .then((v) => {
    console.log("[p1] chained value:", v); // 43
  })
  .finally(() => {
    console.log("[p1] finally runs (pass-through)");
  });

// 2) Basic reject / catch / recovery
const p2 = new MyPromise((_, reject) => {
  setTimeout(() => reject(new Error("Boom!")), 30);
});
p2.then(() => {
  console.log("NEVER runs");
})
  .catch((e) => {
    console.log("[p2] caught:", e.message); // Boom!
    return "recovered";
  })
  .then((v) => {
    console.log("[p2] after recovery:", v); // recovered
  });

// 3) Thenable assimilation (adopt state of thenable)
const thenable = {
  then(resolve) {
    setTimeout(() => resolve("from thenable"), 10);
  },
};
MyPromise.resolve(thenable).then((v) => {
  console.log("[thenable] adopted:", v); // from thenable
});

// 4) Microtask ordering: handlers run after current call stack
console.log("A");
MyPromise.resolve("B").then((v) => console.log(v));
console.log("C");
// Expected order: A, C, B

// 5) Static helpers: all / allSettled / race / any
const delay = (ms, val, shouldReject = false) =>
  new MyPromise((res, rej) =>
    setTimeout(() => (shouldReject ? rej(val) : res(val)), ms)
  );

MyPromise.all([delay(10, "x"), delay(20, "y")]).then((arr) => {
  console.log("[all] ->", arr); // ["x", "y"]
});

MyPromise.allSettled([delay(10, "ok"), delay(5, "no", true)]).then((arr) => {
  console.log("[allSettled] ->", arr);
  // [ {status:"fulfilled", value:"ok"}, {status:"rejected", reason:"no"} ]
});

MyPromise.race([delay(30, "slow"), delay(10, "fast")]).then((v) => {
  console.log("[race] ->", v); // "fast"
});

MyPromise.any([delay(10, "bad", true), delay(5, "good")])
  .then((v) => {
    console.log("[any] ->", v); // "good"
  })
  .catch((e) => {
    console.log("[any] AggregateError:", e.errors);
  });

// 6) finally pass-through semantics
MyPromise.resolve(7)
  .finally(() => console.log("[finally] cleanup"))
  .then((v) => console.log("[finally] value preserved:", v)); // 7

// 7) Self-resolution guard (should reject)
const pSelf = new MyPromise((resolve) => resolve());
pSelf
  .then(() => {
    // Attempt to resolve with itself:
    return pSelf; // This should be handled by guard (reject TypeError)
  })
  .then(
    () => console.log("NEVER"),
    (e) => console.log("[self] rejected with:", e instanceof TypeError) // true
  );

// ----------------------------------------------------------------------------
// Part 4: Interview Q&A (Quick Notes)
// ----------------------------------------------------------------------------
//
// Q1) What are the states of a Promise?
//    👉 pending → fulfilled | rejected (final/immutable)
//
// Q2) Why must handlers run asynchronously?
//    👉 Spec requires promise reaction jobs to be queued (microtasks), ensuring
//       deterministic ordering and avoiding sync handler reentrancy.
//
// Q3) What is thenable assimilation?
//    👉 If resolve(x) where x has a callable `then`, we call it and adopt x’s
//       eventual state. This enables interop with "promise-like" objects.
//
// Q4) What does then() return?
//    👉 A NEW promise. The return value of the handler becomes its resolution.
//       Throwing in a handler causes the returned promise to reject.
//
// Q5) Difference between finally vs then?
//    👉 finally runs regardless of outcome, and passes through the original
//       value/reason, unless it throws or returns a rejecting promise.
//
// ----------------------------------------------------------------------------
// ✅ Summary
// ----------------------------------------------------------------------------
// - We built a minimal Promise with proper state machine, async semantics,
//   thenable assimilation, chaining, and common static helpers.
// - Use this to internalize how native Promises behave under the hood.
// ============================================================================
