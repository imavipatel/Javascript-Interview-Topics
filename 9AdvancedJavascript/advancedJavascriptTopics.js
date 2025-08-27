// ============================================================================
// 🔥 9. Advanced JavaScript Topics
// ============================================================================
//
// Topics:
// 1) Classes & Inheritance (ES6)
// 2) constructor, extends, super
// 3) Static & Private class fields
// 4) JSON handling
// 5) Error Handling (try/catch/finally, custom errors)
// 6) Pipe & Compose functions
// 7) Memoisation & Caching
// 8) Advanced memoization + caching strategies
// 9) Generator Functions
// 10) Execute Tasks in Parallel
// 11) Web Workers (avoid memory leaks)
// 12) Security Basics (XSS, CSRF)
// 13) Lazy Loading & Infinite Scroll
// 14) Additional Topics
//    a) Decorators (TS / advanced JS)
//    b) Reflect API
//    c) Symbols in classes
//    d) Proxy & Proxy traps
//    e) Optional chaining inside class methods
// ============================================================================

// ============================================================================
// 1) 📘 Advanced JS – Classes & Inheritance (ES6)
// ============================================================================
//
// 1) Classes
// ----------------------------------------------------------------------------
// - A class is a blueprint/template to create objects.
// - Introduced in ES6 (syntactic sugar over constructor functions).
// - Contains:
//    a) constructor() -> runs automatically when object is created.
//    b) methods -> functions inside a class.
//
// ✅ Example:
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Hi, I am ${this.name}, and I am ${this.age} years old.`);
  }
}

let p1 = new Person("Avi", 25);
p1.sayHello(); // Hi, I am Avi, and I am 25 years old.

// ----------------------------------------------------------------------------
// 2) Inheritance
// ----------------------------------------------------------------------------
// - One class can reuse properties & methods of another class.
// - Done using "extends" keyword.
// - Child class can override parent methods.
// - "super()" is used to call parent constructor/methods.
//
// ✅ Example:
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // calls Animal's constructor
    this.breed = breed;
  }

  speak() {
    // overriding
    console.log(`${this.name} barks!`);
  }
}

let a = new Animal("Generic Animal");
a.speak(); // Generic Animal makes a sound

let d = new Dog("Tommy", "Labrador");
d.speak(); // Tommy barks!
console.log(d.breed); // Labrador

// ----------------------------------------------------------------------------
// 3) Key Points
// ----------------------------------------------------------------------------
// - class = blueprint for objects
// - constructor() = special function to initialize object
// - extends = inheritance keyword
// - super() = calls parent constructor/methods
// - Child class can override parent methods
//
// ----------------------------------------------------------------------------
// 4) Q & A
// ----------------------------------------------------------------------------
// Q1) What is a class in JS?
//     -> A blueprint to create objects with properties & methods.
//
// Q2) What is inheritance?
//     -> Reusing parent class features in child class using "extends".
//
// Q3) What is constructor()?
//     -> Special method that initializes object properties.
//
// Q4) Why use super()?
//     -> To call parent constructor/methods inside child class.
//
// Q5) Can child class override parent methods?
//     -> Yes, by redefining same method inside child class.
//
// ============================================================================

// ============================================================================
// 2) 📘 Advanced JS – Classes: constructor, extends, super
// ============================================================================
//
// Topics covered:
// 1) constructor() – special method to initialize objects
// 2) extends – class inheritance
// 3) super – call parent constructor/methods
//
// -----------------------------------------------------------------------------

// ============================================================================
// 1) constructor()
// ============================================================================
// - Special method in a class.
// - Automatically runs when a new object is created.
// - Used to initialize object properties.
// - Only ONE constructor is allowed per class.

class Person {
  constructor(name, age) {
    // constructor method
    this.name = name; // initialize property
    this.age = age; // initialize property
  }

  sayHello() {
    console.log(`Hi, I am ${this.name}, and I am ${this.age} years old.`);
  }
}

let p2 = new Person("Avi", 25);
let p3 = new Person("Ravi", 30);

p2.sayHello(); // Hi, I am Avi, and I am 25 years old.
p3.sayHello(); // Hi, I am Ravi, and I am 30 years old.

// ✅ Notes:
// - Constructor is called **automatically** with `new` keyword.
// - You can’t create multiple constructors in one class.

// ============================================================================
// 2) extends
// ============================================================================
// - Used to implement **inheritance** in JavaScript (ES6).
// - Child class inherits **properties and methods** from parent class.
// - Child class can also add its own methods/properties.

class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

// Dog inherits Animal
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // call parent constructor
    this.breed = breed; // child property
  }

  bark() {
    console.log(`${this.name} barks!`);
  }
}

let a1 = new Animal("Generic Animal");
a1.speak(); // Generic Animal makes a sound

let d1 = new Dog("Tommy", "Labrador");
d1.speak(); // Tommy makes a sound (inherited)
d1.bark(); // Tommy barks! (child method)
console.log(d1.breed); // Labrador

// ============================================================================
// 3) super
// ============================================================================
// - Special keyword to access **parent class constructor** or **methods**.
// - Must be called in child constructor before using `this`.
// - Can also call parent methods using `super.methodName()`.

class Animal2 {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog2 extends Animal2 {
  constructor(name, breed) {
    super(name); // call parent constructor
    this.breed = breed;
  }

  speak() {
    super.speak(); // call parent method
    console.log(`${this.name} barks!`); // child method
  }
}

let d2 = new Dog2("Rocky", "Beagle");
d2.speak();
// Rocky makes a sound.
// Rocky barks!

// ============================================================================
// 🔑 Key Points Summary
// ============================================================================
// 1) constructor() -> initialize object properties, auto-called.
// 2) extends -> child class inherits parent class.
// 3) super() -> call parent constructor or methods.
// 4) Child can override parent methods.
// 5) Must call super() in child constructor before using `this`.

// ============================================================================
// ❓ Q & A
// ============================================================================
// Q1) Can a class have multiple constructors?
// 👉 No, only one constructor per class.
//
// Q2) What happens if you don't call super() in child constructor?
// 👉 JS will throw a ReferenceError when using `this`.
//
// Q3) Can child class override parent methods?
// 👉 Yes, by redefining the same method.
//
// Q4) Can you call parent methods without overriding?
// 👉 Yes, using super.methodName().
//
// Q5) Difference between constructor and super?
// 👉 constructor() initializes the current class.
// 👉 super() calls parent constructor or methods.

// ============================================================================
// 3) 📘 Advanced JS – Classes: Static & Private Fields
// ============================================================================
//
// Topics covered:
// 1) Static Fields
// 2) Private Fields
//
// -----------------------------------------------------------------------------

// ============================================================================
// 1) Static Fields
// ============================================================================
// - Belongs to the **class itself**, NOT the instances/objects.
// - Can be accessed using ClassName.fieldName
// - Useful for **constants, counters, utility methods**.

class Counter {
  static count = 0; // static field

  constructor() {
    Counter.count++; // increment static count
  }

  static showCount() {
    // static method
    console.log(`Total objects created: ${Counter.count}`);
  }
}

let c1 = new Counter();
let c2 = new Counter();
let c3 = new Counter();

Counter.showCount(); // Total objects created: 3
// ✅ Note: c1.count → undefined (cannot access static field from instance)

// ============================================================================
// 2) Private Fields
// ============================================================================
// - Prefixed with `#`
// - Accessible ONLY inside the class.
// - Useful for **data hiding / encapsulation**.

class Person {
  #ssn; // private field

  constructor(name, ssn) {
    this.name = name;
    this.#ssn = ssn;
  }

  showSSN() {
    console.log(`SSN of ${this.name} is ${this.#ssn}`);
  }
}

let p4 = new Person("Avi", "123-45-6789");
p4.showSSN(); // SSN of Avi is 123-45-6789
// console.log(p4.#ssn); // ❌ SyntaxError, private field not accessible outside

// ✅ Note: Private fields help **hide sensitive data** and prevent accidental changes.

// ============================================================================
// 🔑 Key Points Summary
// ============================================================================
// 1) Static fields belong to the class, not the instances.
// 2) Access static fields/methods via ClassName.field or ClassName.method()
// 3) Private fields start with #, only accessible inside the class.
// 4) Helps encapsulation and data hiding.
// 5) Static fields can be used for counters, constants, or utility methods.

// ============================================================================
// ❓ Q & A
// ============================================================================
// Q1) Can static fields be accessed via objects?
// 👉 No, only via ClassName.fieldName
//
// Q2) Can private fields be accessed outside the class?
// 👉 No, only methods inside the class can access them.
//
// Q3) Can static methods access private fields directly?
// 👉 No, static methods cannot access instance private fields.
//
// Q4) Can private fields be inherited by child classes?
// 👉 No, private fields are **not inherited**.
//
// Q5) Why use static fields?
// 👉 To store class-level data or utility functions shared by all instances.

// ============================================================================
// 4) 📘 Advanced JS – JSON Handling
// ============================================================================
//
// Topics covered:
// 1) JSON.parse()
// 2) JSON.stringify()
//
// -----------------------------------------------------------------------------

// ============================================================================
// 1) JSON.parse()
// ============================================================================
// - Converts **JSON string** into a **JavaScript object**.
// - Useful when fetching JSON from APIs or reading local storage.
// - Must have valid JSON format: keys in double quotes.

let jsonString = '{"name":"Avi","age":25,"skills":["JS","React"]}';
let obj = JSON.parse(jsonString);

console.log(obj.name); // Avi
console.log(obj.age); // 25
console.log(obj.skills); // ["JS","React"]

// ✅ Notes:
// - Throws SyntaxError if JSON is invalid
// - Can use a **reviver function** to transform values while parsing:

let obj2 = JSON.parse(jsonString, (key, value) => {
  if (key === "age") return value + 1; // increment age
  return value;
});
console.log(obj2.age); // 26

// ============================================================================
// 2) JSON.stringify()
// ============================================================================
// - Converts **JavaScript object** into **JSON string**.
// - Useful to send data to APIs or store in localStorage.

let person = {
  name: "Ravi",
  age: 30,
  skills: ["HTML", "CSS", "JS"],
};

let jsonStr = JSON.stringify(person);
console.log(jsonStr);
// {"name":"Ravi","age":30,"skills":["HTML","CSS","JS"]}

// ✅ Notes:
// - Can pass **replacer array or function** to filter properties:

let jsonFiltered = JSON.stringify(person, ["name", "skills"]);
console.log(jsonFiltered);
// {"name":"Ravi","skills":["HTML","CSS","JS"]}

// - Can also use **space argument** for pretty-print:

let prettyJSON = JSON.stringify(person, null, 2);
console.log(prettyJSON);
/*
{
  "name": "Ravi",
  "age": 30,
  "skills": [
    "HTML",
    "CSS",
    "JS"
  ]
}
*/

// ============================================================================
// 🔑 Key Points Summary
// ============================================================================
// 1) JSON.parse() → JSON string → JS object
// 2) JSON.stringify() → JS object → JSON string
// 3) JSON format requires double quotes for keys and string values
// 4) Reviver (parse) and Replacer (stringify) allow transformation or filtering
// 5) Useful for API data exchange, localStorage, and saving config

// ============================================================================
// ❓ Q & A
// ============================================================================
// Q1) What happens if JSON.parse() receives invalid JSON?
// 👉 Throws SyntaxError.
//
// Q2) Can JSON.stringify() convert functions?
// 👉 No, functions and undefined are ignored.
//
// Q3) Why use JSON.stringify() with space argument?
// 👉 For pretty-printing JSON (better readability).
//
// Q4) What is the difference between JSON and JS object?
// 👉 JSON is a string format; JS object is an in-memory object.
//
// Q5) Can JSON.parse() revive values automatically?
// 👉 Only if you provide a reviver function to transform values.

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

// ============================================================================
// 6) 📘 Advanced JS – Pipe & Compose Functions
// ============================================================================
//
// Topics covered:
// 1) compose() function
// 2) pipe() function
//
// -----------------------------------------------------------------------------

// ============================================================================
// 1) compose()
// ============================================================================
// - compose() executes functions **right-to-left**.
// - Result of one function becomes input for the previous.
// - Useful for **functional programming** to combine multiple operations.

const multiplyBy2 = (x) => x * 2;
const add3 = (x) => x + 3;
const square = (x) => x * x;

// Compose utility
const compose =
  (...fns) =>
  (value) =>
    fns.reduceRight((acc, fn) => fn(acc), value);

const composedFn = compose(square, add3, multiplyBy2);
console.log(composedFn(5));
// Step by step:
// multiplyBy2(5) => 10
// add3(10) => 13
// square(13) => 169
// ✅ Output: 169

// ============================================================================
// 2) pipe()
// ============================================================================
// - pipe() executes functions **left-to-right**.
// - Makes code easier to read in sequential steps.

const pipe =
  (...fns) =>
  (value) =>
    fns.reduce((acc, fn) => fn(acc), value);

const pipedFn = pipe(multiplyBy2, add3, square);
console.log(pipedFn(5));
// Step by step:
// multiplyBy2(5) => 10
// add3(10) => 13
// square(13) => 169
// ✅ Output: 169

// ============================================================================
// 🔑 Key Points Summary
// ============================================================================
// 1) compose → right-to-left execution of functions
// 2) pipe → left-to-right execution
// 3) Both are used in **functional programming** to avoid nested calls
// 4) Helps **write cleaner and reusable code**
// 5) Functions must be **pure** for consistent results

// ============================================================================
// ❓ Q & A
// ============================================================================
// Q1) Difference between pipe and compose?
// 👉 compose: right-to-left, pipe: left-to-right execution
//
// Q2) Can we use compose/pipe with async functions?
// 👉 Yes, but need extra handling (e.g., promises or async/await)
//
// Q3) Why use pipe/compose instead of nested function calls?
// 👉 For readability, maintainability, and cleaner code.
//
// Q4) Can pipe/compose accept any number of functions?
// 👉 Yes, you can pass any number of functions using rest parameters.
//
// Q5) Do functions in compose/pipe modify the original input?
// 👉 Ideally not. They should be pure functions to avoid side-effects.

// ============================================================================
// 7) 📘 Advanced JS – Memoization & Caching
// ============================================================================
//
// Topics covered:
// 1) Memoization
// 2) Caching functions
//
// -----------------------------------------------------------------------------

// ============================================================================
// 1) Memoization
// ============================================================================
// - Memoization is a **technique to store results** of expensive function calls.
// - If the same inputs occur again, return the **cached result** instead of recalculating.
// - Improves performance, especially for recursive or heavy computations.

function slowFib(n) {
  if (n <= 1) return n;
  return slowFib(n - 1) + slowFib(n - 2);
}

console.log(slowFib(10)); // 55 (takes longer for larger n)

// Memoized version
function memoize(fn) {
  const cache = {};
  return function (n) {
    if (cache[n] !== undefined) {
      console.log("Fetching from cache:", n);
      return cache[n];
    }
    console.log("Calculating:", n);
    const result = fn(n);
    cache[n] = result;
    return result;
  };
}

const fastFib = memoize(slowFib);
console.log(fastFib(10)); // Calculating: 10 → 55
console.log(fastFib(10)); // Fetching from cache: 10 → 55

// ============================================================================
// 2) Caching Functions
// ============================================================================
// - Similar to memoization but can be applied to **any function**.
// - Useful for **API responses, expensive calculations, or database queries**.

function fetchUserData(id) {
  console.log("Fetching data for user:", id);
  return { id, name: "User" + id };
}

const cacheFunc = (fn) => {
  const cache = {};
  return function (id) {
    if (cache[id]) return cache[id];
    const result = fn(id);
    cache[id] = result;
    return result;
  };
};

const cachedFetch = cacheFunc(fetchUserData);
console.log(cachedFetch(1)); // Fetching data for user: 1
console.log(cachedFetch(1)); // Returned from cache

// ============================================================================
// 🔑 Key Points Summary
// ============================================================================
// 1) Memoization stores results of function calls for future reuse
// 2) Caching is general technique to save expensive computations or API calls
// 3) Helps improve **performance** and reduce redundant processing
// 4) Use carefully: caching too much data can increase memory usage
// 5) Works best with **pure functions** (no side-effects)

// ============================================================================
// ❓ Q & A
// ============================================================================
// Q1) Difference between memoization and caching?
// 👉 Memoization caches **function results**, caching can store any expensive computation or data.
//
// Q2) Can memoization work with multiple arguments?
// 👉 Yes, but the cache key must be unique (e.g., using JSON.stringify(args)).
//
// Q3) Should we memoize functions with side-effects?
// 👉 No, memoization should be used with **pure functions** only.
//
// Q4) How is memoization implemented in JS?
// 👉 Usually with an object or Map to store results keyed by input parameters.
//
// Q5) Why is memoization important in recursion?
// 👉 Prevents repeated calculation of same subproblems, improving efficiency exponentially.

// ============================================================================
// 8) 📘 Advanced JS – Advanced Memoization & Caching Strategies
// ============================================================================
//
// Topics covered:
// 1) Memoization with multiple arguments
// 2) LRU (Least Recently Used) caching
// 3) Time-based cache expiration
//
// -----------------------------------------------------------------------------

// ============================================================================
// 1) Memoization with Multiple Arguments
// ============================================================================
// - Simple memoization works well for a single argument.
// - For multiple arguments, use **JSON.stringify(args)** as cache key.

function add(a, b) {
  console.log("Calculating:", a, b);
  return a + b;
}

function memoizeMultipleArgs(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key] !== undefined) {
      console.log("Fetching from cache:", key);
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const cachedAdd = memoizeMultipleArgs(add);
console.log(cachedAdd(2, 3)); // Calculating: 2 3 → 5
console.log(cachedAdd(2, 3)); // Fetching from cache: [2,3] → 5

// ============================================================================
// 2) LRU (Least Recently Used) Cache
// ============================================================================
// - LRU cache stores only a **limited number of items**.
// - When cache is full, **oldest used item is removed**.
// - Useful in memory-constrained applications.

class LRUCache {
  constructor(limit = 3) {
    this.cache = new Map();
    this.limit = limit;
  }

  get(key) {
    if (!this.cache.has(key)) return null;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value); // move to end (most recently used)
    return value;
  }

  set(key, value) {
    if (this.cache.size >= this.limit) {
      const firstKey = this.cache.keys().next().value; // remove oldest
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}

const lru = new LRUCache(2);
lru.set("a", 1);
lru.set("b", 2);
console.log(lru.get("a")); // 1
lru.set("c", 3); // removes "b"
console.log(lru.get("b")); // null

// ============================================================================
// 3) Time-based Cache Expiration
// ============================================================================
// - Automatically remove cached items after a **TTL (time-to-live)**.

function cacheWithTTL(fn, ttl = 3000) {
  const cache = new Map();
  return function (key) {
    const now = Date.now();
    if (cache.has(key)) {
      const { value, expiry } = cache.get(key);
      if (now < expiry) {
        console.log("Fetching from cache:", key);
        return value;
      } else {
        cache.delete(key); // expired
      }
    }
    const value = fn(key);
    cache.set(key, { value, expiry: now + ttl });
    return value;
  };
}

function fetchData(id) {
  console.log("Fetching data:", id);
  return { id, name: "User" + id };
}

const cachedFetchTTL = cacheWithTTL(fetchData, 2000);
console.log(cachedFetchTTL(1)); // Fetching data: 1
setTimeout(() => console.log(cachedFetchTTL(1)), 1000); // From cache
setTimeout(() => console.log(cachedFetchTTL(1)), 2500); // Fetching again (expired)

// ============================================================================
// 🔑 Key Points Summary
// ============================================================================
// 1) Memoization can handle multiple arguments using JSON.stringify as key
// 2) LRU cache helps manage memory by removing least recently used items
// 3) TTL-based cache automatically expires data after given time
// 4) Advanced caching improves **performance and memory usage**
// 5) Best used with **pure functions** to ensure correct results

// ============================================================================
// ❓ Q & A
// ============================================================================
// Q1) Why use JSON.stringify for multiple arguments in memoization?
// 👉 To generate a unique key for different argument combinations.
//
// Q2) What is LRU cache and when to use it?
// 👉 Stores limited items; removes least recently used when full. Useful in memory-sensitive apps.
//
// Q3) How does TTL caching work?
// 👉 Cache stores data with expiry time; expired items are recalculated or refetched.
//
// Q4) Can memoization work with asynchronous functions?
// 👉 Yes, but you need to store Promises in the cache.
//
// Q5) Difference between simple memoization and advanced caching?
// 👉 Simple memoization stores unlimited results; advanced caching may limit size, expire items, or handle multiple arguments.

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

// ============================================================================
// 10) 📘 Advanced JS – Execute Tasks in Parallel
// ============================================================================
//
// Topics covered:
// 1) What is parallel execution
// 2) Using Promise.all
// 3) Using Promise.allSettled
// 4) Practical examples
//
// -----------------------------------------------------------------------------

// ============================================================================
// 1) What is Parallel Execution?
// ============================================================================
// - Parallel execution means **running multiple asynchronous tasks simultaneously**.
// - This is faster than running them **sequentially**.
// - JavaScript is single-threaded, but async tasks (like fetch or setTimeout) are handled in **background threads** (Web APIs) and results are returned via the **event loop**.

// Example: Sequential vs Parallel
async function sequentialTasks() {
  console.time("Sequential");
  await new Promise((r) => setTimeout(r, 1000)); // task 1
  await new Promise((r) => setTimeout(r, 1000)); // task 2
  console.timeEnd("Sequential"); // ~2 seconds
}

async function parallelTasks() {
  console.time("Parallel");
  await Promise.all([
    new Promise((r) => setTimeout(r, 1000)), // task 1
    new Promise((r) => setTimeout(r, 1000)), // task 2
  ]);
  console.timeEnd("Parallel"); // ~1 second
}

sequentialTasks();
parallelTasks();

// ============================================================================
// 2) Using Promise.all
// ============================================================================
// - `Promise.all([...promises])` runs all promises in parallel
// - Resolves **only when all promises succeed**
// - If any promise fails, the entire Promise.all rejects

const task1 = () =>
  new Promise((res) => setTimeout(() => res("Task 1 done"), 1000));
const task2 = () =>
  new Promise((res) => setTimeout(() => res("Task 2 done"), 2000));

Promise.all([task1(), task2()])
  .then((results) => console.log(results)) // ["Task 1 done", "Task 2 done"]
  .catch((err) => console.error(err));

// ============================================================================
// 3) Using Promise.allSettled
// ============================================================================
// - `Promise.allSettled([...promises])` waits for **all promises** to finish regardless of success/failure
// - Returns an array of objects { status: "fulfilled"/"rejected", value/reason }

const task3 = () => Promise.resolve("Success");
const task4 = () => Promise.reject("Failed");

Promise.allSettled([task3(), task4()]).then((results) => console.log(results));
/*
[
  { status: "fulfilled", value: "Success" },
  { status: "rejected", reason: "Failed" }
]
*/

// ============================================================================
// 4) Practical Examples
// ============================================================================

// a) Fetch multiple APIs in parallel
async function fetchUsersAndPosts() {
  const [users, posts] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users").then((r) => r.json()),
    fetch("https://jsonplaceholder.typicode.com/posts").then((r) => r.json()),
  ]);
  console.log("Users:", users.length);
  console.log("Posts:", posts.length);
}

fetchUsersAndPosts();

// ============================================================================
// 🔑 Key Points Summary
// ============================================================================
// 1) Parallel execution speeds up multiple async tasks
// 2) Use Promise.all for all tasks succeeding
// 3) Use Promise.allSettled to handle failures individually
// 4) JavaScript async tasks still run on single-threaded main thread, but underlying IO is parallel
// 5) Avoid unnecessary sequential awaits when tasks are independent

// ============================================================================
// ❓ Q & A
// ============================================================================
// Q1) Difference between sequential and parallel execution?
// 👉 Sequential runs one after another; parallel runs multiple tasks at the same time.
//
// Q2) When to use Promise.all vs Promise.allSettled?
// 👉 Use Promise.all if you want all tasks to succeed. Use allSettled if you want results even if some fail.
//
// Q3) Does Promise.all execute in a new thread?
// 👉 No, JS is single-threaded; Promise tasks run via Web APIs or event loop asynchronously.
//
// Q4) Can we mix async/await with parallel execution?
// 👉 Yes, wrap multiple await promises inside Promise.all() for parallelism.
//
// Q5) What happens if one promise in Promise.all fails?
// 👉 The entire Promise.all rejects immediately.

// ============================================================================
// 11) 📘 Advanced JS – Web Workers (Avoid Memory Leaks)
// ============================================================================
//
// Topics covered:
// 1) What are Web Workers
// 2) Creating a Web Worker
// 3) Communicating with Web Workers
// 4) Terminating Web Workers
// 5) Avoiding memory leaks
//
// -----------------------------------------------------------------------------

// ============================================================================
// 1) What are Web Workers
// ============================================================================
// - Web Workers allow **running JavaScript in a separate background thread**.
// - Useful for **heavy computations**, so main UI thread is not blocked.
// - Web Workers cannot access DOM directly; communicate via messages.
// - Helps **improve performance and responsiveness**.

// ============================================================================
// 2) Creating a Web Worker
// ============================================================================
// - Create a worker using `new Worker("worker.js")`
// - The worker runs code in `worker.js` independently.

// Example: worker.js
/*
self.addEventListener("message", (event) => {
  const data = event.data;
  // Do some heavy computation
  let sum = 0;
  for (let i = 0; i < data; i++) sum += i;
  self.postMessage(sum); // send result back
});
*/

// Main JS file
const worker = new Worker("worker.js");
worker.postMessage(1000000); // send data to worker
worker.addEventListener("message", (event) => {
  console.log("Result from worker:", event.data); // sum of 0..999999
});

// ============================================================================
// 3) Communicating with Web Workers
// ============================================================================
// - `postMessage(data)` → send data to worker
// - Worker uses `postMessage(result)` → send data back
// - `onmessage` or `addEventListener("message")` → listen for messages

worker.onmessage = (event) => {
  console.log("Worker replied:", event.data);
};

// ============================================================================
// 4) Terminating Web Workers
// ============================================================================
// - To avoid memory leaks, **always terminate workers when done**.
// - `worker.terminate()` → stops the worker
// - Example:

worker.terminate();

// ============================================================================
// 5) Avoiding Memory Leaks
// ============================================================================
// 1) Always terminate workers when no longer needed
// 2) Remove message listeners if worker will persist
// 3) Avoid passing large objects repeatedly; serialize/transfer if possible
// 4) Keep background computation light and finite

// Example: Proper cleanup
const worker2 = new Worker("worker.js");
worker2.postMessage(500000);
const handleMsg = (event) => console.log("Worker2 result:", event.data);
worker2.addEventListener("message", handleMsg);

// After completion
setTimeout(() => {
  worker2.removeEventListener("message", handleMsg);
  worker2.terminate();
  console.log("Worker2 terminated and cleaned up.");
}, 2000);

// ============================================================================
// 🔑 Key Points Summary
// ============================================================================
// 1) Web Workers run JS in a **separate thread**, preventing UI blocking
// 2) Cannot access DOM directly; use messages for communication
// 3) Always terminate workers to **avoid memory leaks**
// 4) Good for **heavy computations, long loops, or async tasks**
// 5) Use message listeners carefully to prevent lingering references

// ============================================================================
// ❓ Q & A
// ============================================================================
// Q1) Can a Web Worker access the DOM directly?
// 👉 No, workers run in a separate thread without access to DOM.
//
// Q2) How do we communicate with a worker?
// 👉 Using `postMessage(data)` and listening with `onmessage`.
//
// Q3) What happens if we don’t terminate a worker?
// 👉 Worker continues running in background → can cause memory leaks.
//
// Q4) Can we have multiple workers?
// 👉 Yes, multiple workers can run in parallel for separate tasks.
//
// Q5) When should we use Web Workers?
// 👉 For CPU-intensive tasks, like image processing, large computations, or async data processing, to keep UI responsive.

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

// ============================================================================
// 📘 Advanced JS – Lazy Loading & Infinite Scroll
// ============================================================================
//
// Topics covered:
// 1) What is Lazy Loading
// 2) How to implement Lazy Loading
// 3) What is Infinite Scroll
// 4) How to implement Infinite Scroll
// 5) Practical examples
//
// -----------------------------------------------------------------------------

// ============================================================================
// 1) What is Lazy Loading
// ============================================================================
// - Lazy Loading is a technique to **load content only when needed**.
// - Helps reduce **initial load time** and **improve performance**.
// - Common use cases: images, videos, components on a page.

// Example: Lazy loading images with "loading" attribute

// <img src="big-image.jpg" loading="lazy" alt="Lazy Image">

// JS example: using IntersectionObserver
const lazyImages = document.querySelectorAll("img.lazy");

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // load actual image
      img.classList.remove("lazy");
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach((img) => observer.observe(img));

// ============================================================================
// 2) How to implement Lazy Loading
// ============================================================================
// - Use **IntersectionObserver API** → detects when element enters viewport
// - Load content dynamically when needed
// - Stop observing element after it is loaded to save resources

// ============================================================================
// 3) What is Infinite Scroll
// ============================================================================
// - Infinite Scroll dynamically loads more content as user scrolls down
// - Common in social media feeds, blogs, or product listings
// - Keeps the user engaged without page reload

// Example concept:
// - Detect scroll position
// - Fetch more data when near bottom of page
// - Append data to DOM

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    // Near bottom → load more content
    loadMoreContent();
  }
});

function loadMoreContent() {
  // Simulate fetching data
  for (let i = 0; i < 5; i++) {
    const div = document.createElement("div");
    div.textContent = "New content item";
    document.body.appendChild(div);
  }
}

// ============================================================================
// 4) Practical Examples
// ============================================================================

// a) Lazy load images
/*
<img data-src="image1.jpg" class="lazy" />
<img data-src="image2.jpg" class="lazy" />
*/

// JS handles loading only when images appear in viewport (see IntersectionObserver above)

// b) Infinite scroll for articles
// - Fetch API can be used to load new articles dynamically
// fetch("/api/articles?page=2")
//   .then(res => res.json())
//   .then(data => appendArticles(data));

// ============================================================================
// 🔑 Key Points Summary
// ============================================================================
// 1) Lazy Loading → load resources only when needed (improves performance)
// 2) Infinite Scroll → dynamically load more content as user scrolls
// 3) IntersectionObserver is better than scroll events for lazy loading
// 4) Always manage memory and remove observers after use
// 5) Combine lazy loading + infinite scroll for efficient long pages

// ============================================================================
// ❓ Q & A
// ============================================================================
// Q1) Why use Lazy Loading?
// 👉 To reduce initial load time and bandwidth usage, improving performance.
//
// Q2) How is IntersectionObserver used in lazy loading?
// 👉 Observes elements entering viewport and triggers loading logic.
//
// Q3) Difference between Lazy Loading and Infinite Scroll?
// 👉 Lazy Loading → defer loading of content until needed.
// 👉 Infinite Scroll → dynamically append content as user scrolls.
//
// Q4) Can we use Infinite Scroll without Lazy Loading?
// 👉 Yes, but it may increase initial memory and load time if images are large.
//
// Q5) How to prevent performance issues with many scroll events?
// 👉 Use **debouncing/throttling** or IntersectionObserver for better efficiency.

// ============================================================================
// 📘 Advanced JS – Additional Topics
// ============================================================================
//
// Topics covered:
// 1) Decorators (TypeScript / advanced JS)
// 2) Reflect API
// 3) Symbols in classes
// 4) Proxy & Proxy traps
// 5) Optional chaining inside class methods
//
// -----------------------------------------------------------------------------

// ============================================================================
// 1) Decorators (TypeScript / advanced JS)
// ============================================================================
// - Decorators are **functions that can modify classes or methods**.
// - Commonly used in TypeScript, Angular, or advanced JS patterns
// - Example: Logging method calls

function log(target, key, descriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args) {
    console.log(`Calling ${key} with`, args);
    return original.apply(this, args);
  };
  return descriptor;
}

class Calculator {
  @log
  add(a, b) {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(2, 3); // Logs: Calling add with [2,3] → returns 5

// Q: When are decorators useful?
// 👉 Useful for logging, validation, authorization, or modifying behavior dynamically

// ============================================================================
// 2) Reflect API
// ============================================================================
// - Provides methods to **interact with objects dynamically** (metadata, properties)
// - Examples: get, set, deleteProperty, apply

const obj1 = { x: 10 };
console.log(Reflect.get(obj1, "x")); // 10
Reflect.set(obj1, "y", 20);
console.log(obj1.y); // 20
Reflect.deleteProperty(obj1, "x");
console.log(obj1.x); // undefined

// Q: Why use Reflect over normal operations?
// 👉 Reflect provides a consistent API, useful in meta-programming or Proxy handling

// ============================================================================
// 3) Symbols in classes
// ============================================================================
// - Symbols are **unique identifiers** (cannot conflict with other properties)
// - Often used for **private-like fields** in classes

const id = Symbol("id");

class User {
  constructor(name) {
    this.name = name;
    this[id] = Math.floor(Math.random() * 1000);
  }
  showId() {
    console.log(this[id]);
  }
}

const u = new User("Alice");
u.showId(); // Unique random number
console.log(u.id); // undefined (symbol is hidden)

// Q: Why use Symbols?
// 👉 Avoid property name collisions and mimic private properties

// ============================================================================
// 4) Proxy & Proxy traps
// ============================================================================
// - Proxy allows **intercepting operations** on objects (get, set, delete)
// - Example: Validation and logging

const person1 = { name: "Bob", age: 25 };
const proxy = new Proxy(person1, {
  get(target, prop) {
    console.log(`Getting ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(`Setting ${prop} = ${value}`);
    target[prop] = value;
    return true;
  },
});

console.log(proxy.name); // Logs: Getting name → Bob
proxy.age = 30; // Logs: Setting age = 30

// ============================================================================
// 5) Optional chaining inside class methods
// ============================================================================
// - Optional chaining ?. helps **avoid errors when accessing nested properties**
// - Example:

class Company {
  constructor(department) {
    this.department = department;
  }
  getManagerName() {
    return this.department?.manager?.name ?? "No manager";
  }
}

const c11 = new Company({ manager: { name: "Eve" } });
const c22 = new Company({});
console.log(c11.getManagerName()); // Eve
console.log(c22.getManagerName()); // No manager

// Q: Why use optional chaining?
// 👉 Avoid runtime errors when accessing deep or optional properties

// ============================================================================
// 🔑 Key Points Summary
// ============================================================================
// 1) Decorators → modify class/method behavior dynamically
// 2) Reflect → meta-programming, dynamic property handling
// 3) Symbols → unique keys, mimic private fields
// 4) Proxy → intercept object operations, implement validation/logging
// 5) Optional chaining → safe access to nested properties, avoid errors

// ============================================================================
// ❓ Q & A
// ============================================================================
// Q1) Can decorators be used in vanilla JS?
// 👉 Experimental, mostly in TypeScript or with Babel transpiler.
//
// Q2) How does Reflect differ from normal property access?
// 👉 Provides unified API for meta-programming and works nicely with Proxies.
//
// Q3) Can Symbols truly make properties private?
// 👉 Not fully private, but hidden from normal enumeration and name collisions.
//
// Q4) What is the benefit of using Proxy traps?
// 👉 Allows runtime interception of operations like get, set, delete, apply.
//
// Q5) How does optional chaining help inside class methods?
// 👉 Avoids runtime errors when nested properties may be undefined/null.
