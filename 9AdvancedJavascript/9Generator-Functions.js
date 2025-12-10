// ============================================================================
// 9) 📘 Advanced JS – Generator Functions
// ============================================================================
//
// Topics covered:
// 1) Basics of Generator Functions
// 2) Yield, next(), and state
// 3) Iterating generators
// 4) Practical examples
//
// -----------------------------------------------------------------------------

// ============================================================================
// 1) Basics of Generator Functions
// ============================================================================
// - Generator functions are special functions that **can pause and resume** execution.
// - Declared using `function*` syntax.
// - `yield` is used to pause function and return a value.
// - `next()` resumes the function and returns { value, done }.

function* simpleGenerator() {
  console.log("Start");
  yield 1;
  console.log("Middle");
  yield 2;
  console.log("End");
  yield 3;
}

const gen = simpleGenerator();

console.log(gen.next()); // Start → { value: 1, done: false }
console.log(gen.next()); // Middle → { value: 2, done: false }
console.log(gen.next()); // End → { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// ============================================================================
// 2) Yield, next(), and state
// ============================================================================
// - `yield` pauses execution and sends value to the caller.
// - `next(value)` can send a value **back into the generator**.
// - `done` tells if generator is finished.

function* generatorWithInput() {
  const a = yield "Enter A";
  const b = yield "Enter B";
  return a + b;
}

const g = generatorWithInput();
console.log(g.next()); // { value: 'Enter A', done: false }
console.log(g.next(5)); // { value: 'Enter B', done: false } (5 assigned to a)
console.log(g.next(10)); // { value: 15, done: true } (10 assigned to b)

// ============================================================================
// 3) Iterating Generators
// ============================================================================
// - Generators are **iterables** → can use `for..of` loop.

function* countUpTo(n) {
  for (let i = 1; i <= n; i++) {
    yield i;
  }
}

for (let num of countUpTo(5)) {
  console.log(num); // 1 2 3 4 5
}

// ============================================================================
// 4) Practical Examples
// ============================================================================

// a) Infinite generator
function* infiniteCounter() {
  let i = 1;
  while (true) {
    yield i++;
  }
}

const counter = infiniteCounter();
console.log(counter.next().value); // 1
console.log(counter.next().value); // 2
console.log(counter.next().value); // 3

// b) Using generators for async flow (simplified)
function asyncFlow(generator) {
  const iterator = generator();

  function handleNext(next) {
    if (next.done) return;
    next.value.then((res) => handleNext(iterator.next(res)));
  }

  handleNext(iterator.next());
}

// Example generator for async calls
function* fetchDataGenerator() {
  const user = yield fetch("https://jsonplaceholder.typicode.com/users/1").then(
    (res) => res.json()
  );
  console.log(user.name);
}

asyncFlow(fetchDataGenerator);

// ============================================================================
// 🔑 Key Points Summary
// ============================================================================
// 1) Generators pause/resume execution using yield
// 2) next() advances generator and can pass value back
// 3) Useful for **lazy evaluation** or async flows
// 4) Generators are iterables → can use for..of loop
// 5) Infinite sequences, pipelines, and async flows can be implemented elegantly

// ============================================================================
// ❓ Q & A
// ============================================================================
// Q1) Difference between normal function and generator function?
// 👉 Normal functions run to completion; generators can pause and resume using yield.
//
// Q2) Can generators be infinite?
// 👉 Yes, useful for lazy evaluation or counters.
//
// Q3) How to send values into a generator?
// 👉 Use next(value); value is assigned to the last yield expression.
//
// Q4) Can generators be used for async code?
// 👉 Yes, with helper functions or libraries like co or async/await.
//
// Q5) What is the structure of next() return value?
// 👉 { value: ..., done: true/false }
