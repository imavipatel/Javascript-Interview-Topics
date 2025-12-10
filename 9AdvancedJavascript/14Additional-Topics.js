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
