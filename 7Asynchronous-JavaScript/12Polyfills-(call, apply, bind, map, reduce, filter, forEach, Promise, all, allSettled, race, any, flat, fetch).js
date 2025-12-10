// ============================================================================
// 12) Polyfills in JavaScript || Polyfills (call, apply, bind, map, reduce, filter, forEach, Promise, all, allSettled, race, any, flat, fetch)
// ============================================================================
//
// 📌 What is a Polyfill?
// A polyfill is custom code (usually written in JS) that provides functionality
// that older browsers/environments may not support natively.
//
// Example: Older browsers don’t support Array.map(), so we write our own
// version (polyfill) to make it work.
//
// ----------------------------------------------------------------------------
// 1) Function.prototype.call Polyfill
// ----------------------------------------------------------------------------
Function.prototype.myCall = function (context, ...args) {
  context = context || globalThis; // default to global
  const fnSymbol = Symbol();
  context[fnSymbol] = this; // "this" is the function
  let result = context[fnSymbol](...args);
  delete context[fnSymbol];
  return result;
};

// Example
function greet(msg) {
  console.log(msg + " " + this.name);
}
greet.myCall({ name: "Avi" }, "Hello"); // Hello Avi

// ❓ Q: What is call()?
// 👉 A: Immediately calls a function with a given "this" and arguments.

// ----------------------------------------------------------------------------
// 2) Function.prototype.apply Polyfill
// ----------------------------------------------------------------------------
Function.prototype.myApply = function (context, args) {
  context = context || globalThis;
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  let result = context[fnSymbol](...args);
  delete context[fnSymbol];
  return result;
};

greet.myApply({ name: "Patel" }, ["Hi"]); // Hi Patel

// ❓ Q: Difference between call and apply?
// 👉 A: call() takes args individually, apply() takes them as an array.

// ----------------------------------------------------------------------------
// 3) Function.prototype.bind Polyfill
// ----------------------------------------------------------------------------
Function.prototype.myBind = function (context, ...args) {
  let fn = this;
  return function (...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};

let boundFn = greet.myBind({ name: "JS" }, "Welcome");
boundFn(); // Welcome JS

// ❓ Q: What does bind() do?
// 👉 A: Returns a new function with "this" fixed and preset arguments.

// ----------------------------------------------------------------------------
// 4) Array.prototype.map Polyfill
// ----------------------------------------------------------------------------
Array.prototype.myMap = function (callback) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

console.log([1, 2, 3].myMap((x) => x * 2)); // [2, 4, 6]

// ❓ Q: Why use map?
// 👉 A: To transform each element of an array into a new array.

// ----------------------------------------------------------------------------
// 5) Array.prototype.filter Polyfill
// ----------------------------------------------------------------------------
Array.prototype.myFilter = function (callback) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

console.log([1, 2, 3, 4].myFilter((x) => x % 2 === 0)); // [2, 4]

// ❓ Q: Why use filter?
// 👉 A: To create a new array only with elements that pass a condition.

// ----------------------------------------------------------------------------
// 6) Array.prototype.reduce Polyfill
// ----------------------------------------------------------------------------
Array.prototype.myReduce = function (callback, initialValue) {
  let acc = initialValue !== undefined ? initialValue : this[0];
  let start = initialValue !== undefined ? 0 : 1;
  for (let i = start; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }
  return acc;
};

console.log([1, 2, 3].myReduce((sum, x) => sum + x, 0)); // 6

// ❓ Q: Why use reduce?
// 👉 A: To combine array elements into a single value.

// ----------------------------------------------------------------------------
// 7) Array.prototype.forEach Polyfill
// ----------------------------------------------------------------------------
Array.prototype.myForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

[10, 20, 30].myForEach((x) => console.log(x));
// 10, 20, 30

// ----------------------------------------------------------------------------
// 8) Promise Polyfill (basic)
// ----------------------------------------------------------------------------
function MyPromise(executor) {
  let onResolve, onReject;
  let resolved = false,
    rejected = false,
    value;

  function resolve(val) {
    resolved = true;
    value = val;
    if (onResolve) onResolve(val);
  }
  function reject(err) {
    rejected = true;
    value = err;
    if (onReject) onReject(err);
  }

  this.then = function (cb) {
    onResolve = cb;
    if (resolved) cb(value);
    return this;
  };

  this.catch = function (cb) {
    onReject = cb;
    if (rejected) cb(value);
    return this;
  };

  executor(resolve, reject);
}

new MyPromise((res) => res("Polyfill works!")).then(console.log);

// ----------------------------------------------------------------------------
// 9) Promise.all Polyfill
// ----------------------------------------------------------------------------
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let completed = 0;

    promises.forEach((p, i) => {
      Promise.resolve(p).then((val) => {
        results[i] = val;
        completed++;
        if (completed === promises.length) resolve(results);
      }, reject);
    });
  });
};

Promise.myAll([Promise.resolve(1), Promise.resolve(2)]).then(console.log); // [1, 2]

// ----------------------------------------------------------------------------
// 10) Promise.allSettled Polyfill
// ----------------------------------------------------------------------------
Promise.myAllSettled = function (promises) {
  return Promise.all(
    promises.map((p) =>
      Promise.resolve(p)
        .then((val) => ({ status: "fulfilled", value: val }))
        .catch((err) => ({ status: "rejected", reason: err }))
    )
  );
};

Promise.myAllSettled([Promise.resolve(1), Promise.reject("Err")]).then(
  console.log
);

// ----------------------------------------------------------------------------
// 11) Promise.race Polyfill
// ----------------------------------------------------------------------------
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => Promise.resolve(p).then(resolve, reject));
  });
};

// ----------------------------------------------------------------------------
// 12) Promise.any Polyfill
// ----------------------------------------------------------------------------
Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    let errors = [];
    let pending = promises.length;

    promises.forEach((p, i) =>
      Promise.resolve(p)
        .then(resolve)
        .catch((err) => {
          errors[i] = err;
          pending--;
          if (pending === 0) reject(errors);
        })
    );
  });
};

// ----------------------------------------------------------------------------
// 13) Array.prototype.flat Polyfill
// ----------------------------------------------------------------------------
Array.prototype.myFlat = function (depth = 1) {
  let result = [];
  this.forEach((el) => {
    if (Array.isArray(el) && depth > 0) {
      result.push(...el.myFlat(depth - 1));
    } else {
      result.push(el);
    }
  });
  return result;
};

console.log([1, [2, [3, [4]]]].myFlat(2)); // [1, 2, 3, [4]]

// ----------------------------------------------------------------------------
// 14) fetch Polyfill (using XMLHttpRequest)
// ----------------------------------------------------------------------------
function myFetch(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300
        ? resolve(xhr.responseText)
        : reject(xhr.statusText);
    xhr.onerror = () => reject("Network Error");
    xhr.send();
  });
}

// Example:
// myFetch("https://jsonplaceholder.typicode.com/todos/1")
//   .then(console.log)
//   .catch(console.error);

// ----------------------------------------------------------------------------
// ❓ Interview Q&A (Easy to Remember)
// ----------------------------------------------------------------------------
//
// Q1) What is a polyfill?
// 👉 A piece of code that implements a feature that is not supported natively.
//
// Q2) Difference between call, apply, bind?
// 👉 call → calls function immediately with args
// 👉 apply → same but args as array
// 👉 bind → returns a new function
//
// Q3) Which array methods are higher-order? (accept callback)
// 👉 map, filter, reduce, forEach
//
// Q4) Difference between Promise.all & allSettled?
// 👉 all → fails fast (rejects if one fails)
// 👉 allSettled → waits for all (success/fail info)
//
// Q5) Promise.any vs race?
// 👉 any → returns first success, ignores failures
// 👉 race → returns first settled (success or fail)
//
// Q6) Why polyfills matter?
// 👉 They make modern JS features work in older environments.
//
// ============================================================================
// End of Polyfills Notes
// ============================================================================
