// ===============================================================
// 📘 JavaScript Notes: Objects
// ===============================================================

// Topics covered:
// 1) Object.freeze
// 2) Object.seal
// 3) Object.assign
// 4) Deep Freeze Object
// 5) Shallow copy vs Deep copy (cloning techniques)
// 6) Spread & Rest Operators for objects
// 7) proto, Prototype Chain & Inheritance
// 8) Object.keys, Object.values, Object.entries, Object.hasOwnProperty
// 9) Q&A (important interview questions)
// ===============================================================

// ---------------------------------------------------------------
// 1) OBJECT BASICS
// ---------------------------------------------------------------
/*
- Objects in JS are collections of key-value pairs.
- Keys are always strings (or symbols).
- Values can be anything: primitive or non-primitive.
*/

let person = {
  name: "Alice",
  age: 25,
  isStudent: false,
};
console.log(person.name); // "Alice"
console.log(person["age"]); // 25

// ---------------------------------------------------------------
// 2) OBJECT.FREEZE()
// ---------------------------------------------------------------
/*
- Makes object IMMUTABLE (cannot add/remove/modify properties).
- Shallow freeze → nested objects still mutable.
*/

let obj1 = { a: 1, b: { c: 2 } };
Object.freeze(obj1);

obj1.a = 10; // ❌ ignored
obj1.d = 100; // ❌ cannot add
obj1.b.c = 200; // ✅ works (nested not frozen)

console.log(obj1); // { a:1, b:{c:200} }

// ---------------------------------------------------------------
// 3) OBJECT.SEAL()
// ---------------------------------------------------------------
/*
- Cannot add/remove properties.
- Can modify EXISTING properties.
*/

let obj2 = { x: 10, y: 20 };
Object.seal(obj2);

obj2.x = 100; // ✅ allowed
delete obj2.y; // ❌ not allowed
obj2.z = 300; // ❌ not allowed

console.log(obj2); // { x:100, y:20 }

// ---------------------------------------------------------------
// 4) OBJECT.ASSIGN()
// ---------------------------------------------------------------
/*
- Copies values from source object(s) into a target object.
- Returns the modified target object.
*/

let target = { a: 1, b: 2 };
let source = { b: 4, c: 5 };

let result = Object.assign(target, source);
console.log(result); // { a:1, b:4, c:5 }
console.log(target === result); // true (same object)

// ---------------------------------------------------------------
// 5) DEEP FREEZE FUNCTION
// ---------------------------------------------------------------
/*
- Custom function to freeze nested objects too.
*/

function deepFreeze(obj) {
  Object.freeze(obj);
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      deepFreeze(obj[key]);
    }
  });
  return obj;
}

let deepObj = { a: { b: { c: 10 } } };
deepFreeze(deepObj);
deepObj.a.b.c = 100; // ❌ ignored
console.log(deepObj.a.b.c); // 10

// ---------------------------------------------------------------
// 6) SHALLOW COPY VS DEEP COPY
// ---------------------------------------------------------------

let original = { a: 1, b: { c: 2 } };

// Shallow copy → only first level copied
let shallow = { ...original };
shallow.b.c = 99;
console.log(original.b.c); // 99 (same reference!)

/*
Deep Copy Techniques:
1. JSON.parse(JSON.stringify(obj))  → simple but loses functions, symbols
2. structuredClone(obj) → modern browsers
3. Recursion or libraries like lodash.cloneDeep
*/

let deep = JSON.parse(JSON.stringify(original));
deep.b.c = 500;
console.log(original.b.c); // 99 (not affected)

// ---------------------------------------------------------------
// 7) SPREAD & REST OPERATORS (Objects)
// ---------------------------------------------------------------

// Spread (copy/merge objects)
let objA = { x: 1, y: 2 };
let objB = { y: 3, z: 4 };
let merged = { ...objA, ...objB };
console.log(merged); // { x:1, y:3, z:4 }

// Rest (collect remaining properties)
let { x, ...rest } = merged;
console.log(x); // 1
console.log(rest); // { y:3, z:4 }

// ---------------------------------------------------------------
// 8) PROTO, PROTOTYPE CHAIN & INHERITANCE
// ---------------------------------------------------------------
/*
- Every object in JS has a hidden [[Prototype]] (accessible via __proto__).
- Prototype chain → JS looks for property in object, then its prototype, etc.
- Inheritance uses this mechanism.
*/

let animal = { eats: true };
let rabbit = { jumps: true };

// Set prototype
rabbit.__proto__ = animal;

console.log(rabbit.eats); // true (inherited from animal)
console.log(rabbit.jumps); // true (own property)

// Constructor + prototype example
function Person(name) {
  this.name = name;
}
Person.prototype.sayHi = function () {
  return "Hi, I'm " + this.name;
};

let p1 = new Person("Bob");
console.log(p1.sayHi()); // "Hi, I'm Bob"

// ---------------------------------------------------------------
// 9) ADDITIONAL OBJECT METHODS
// ---------------------------------------------------------------

let objExtra = { a: 10, b: 20, c: 30 };

console.log(Object.keys(objExtra)); // ["a","b","c"]
console.log(Object.values(objExtra)); // [10,20,30]
console.log(Object.entries(objExtra)); // [["a",10],["b",20],["c",30]]

console.log(objExtra.hasOwnProperty("a")); // true
console.log(objExtra.hasOwnProperty("toString")); // false (in prototype)

// ---------------------------------------------------------------
// 10) Q&A SECTION
// ---------------------------------------------------------------

// Q1: Difference between Object.freeze() and Object.seal()?
// freeze → cannot add/remove/modify (immutable)
// seal → cannot add/remove, but can modify existing properties

// Q2: What’s the difference between shallow copy and deep copy?
// Shallow → only top level copied, nested still referenced
// Deep → fully independent copy

// Q3: Why is JSON.parse(JSON.stringify(obj)) not always safe?
// - Removes functions, undefined, symbols, Date objects
// Use structuredClone() or libraries for safer deep cloning

// Q4: How does prototype chain work?
// - JS looks for property in object
// - If not found, looks in prototype (__proto__)
// - Keeps going up until null

// Q5: Difference between Object.assign() and spread operator?
// Both copy properties
// assign() mutates target, spread returns new object

// Q6: When should we use Object.freeze()?
// - When we want truly immutable objects
// - Good for constants or config objects

// Q7: What does Object.hasOwnProperty() do?
// - Checks if property exists directly on object, not via prototype

// Q8: Explain Rest with object destructuring
let car = { brand: "Tesla", model: "X", year: 2024 };
let { brand, ...info } = car;
console.log(brand); // "Tesla"
console.log(info); // { model:"X", year:2024 }

// Q9: Can prototype be changed after object creation?
// Yes, using Object.setPrototypeOf(obj, proto), but not recommended (slow)

// Q10: What’s difference between __proto__ and prototype?
// __proto__ → property of objects (points to prototype)
// prototype → property of constructor functions
