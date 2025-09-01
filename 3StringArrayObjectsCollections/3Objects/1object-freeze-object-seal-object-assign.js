/*  
=====================================================
📌 OBJECT METHODS: freeze, seal, assign
=====================================================

📝 THEORY
-----------------------------------------------------
1. Object.freeze(obj)
- Freezes an object: prevents adding, deleting, or changing properties.
- Makes the object immutable (but only at the top level).
- Nested objects are NOT frozen (shallow freeze).

2. Object.seal(obj)
- Seals an object: prevents adding or deleting properties.
- BUT allows modification of existing properties.
- Also shallow (nested objects can still be modified).

3. Object.assign(target, ...sources)
- Copies properties from one or more source objects into a target object.
- Returns the modified target object.
- Creates a SHALLOW copy (nested objects are still referenced).

-----------------------------------------------------
🔹 PART 1: Object.freeze()
-----------------------------------------------------
*/

const user = {
  name: "Avi",
  details: { city: "Ahmedabad" },
};

Object.freeze(user);

user.name = "Patel"; // ❌ ignored in strict mode, won't change
user.age = 25; // ❌ cannot add
delete user.name; // ❌ cannot delete

console.log(user.name); // "Avi"
console.log(user); // { name: "Avi", details: { city: "Ahmedabad" } }

// BUT nested object is NOT frozen
user.details.city = "Mumbai"; // ✅ allowed
console.log(user.details.city); // "Mumbai"

/*  
-----------------------------------------------------
🔹 PART 2: Object.seal()
-----------------------------------------------------
*/

const car = {
  brand: "Tesla",
  model: "X",
};

Object.seal(car);

car.brand = "BMW"; // ✅ allowed (modification works)
car.year = 2024; // ❌ cannot add new properties
delete car.model; // ❌ cannot delete properties

console.log(car); // { brand: "BMW", model: "X" }

/*  
-----------------------------------------------------
🔹 PART 3: Object.assign()
-----------------------------------------------------
*/

const target = { a: 1, b: 2 };
const source1 = { b: 4, c: 5 };
const source2 = { d: 6 };

const result = Object.assign(target, source1, source2);

console.log(result);
// { a: 1, b: 4, c: 5, d: 6 }  (target is modified)

console.log(target);
// same as result (target itself is changed)

// Shallow copy example
const obj1 = { nested: { x: 10 } };
const obj2 = Object.assign({}, obj1);

obj2.nested.x = 20;

console.log(obj1.nested.x); // 20 ❌ (because nested object is still shared)

/*  
-----------------------------------------------------
❓ Q&A (Interview Style)
-----------------------------------------------------

Q1: What is the difference between freeze and seal?
👉 - freeze: no add, no delete, no modify (completely immutable).  
   - seal: no add, no delete, but modification allowed.  

Q2: Does freeze make nested objects immutable?
👉 No, it's shallow. You need `Object.freeze()` on each nested object (or deep freeze function).  

Q3: What does Object.assign() return?
👉 It returns the target object after copying properties.  

Q4: Is Object.assign() deep copy?
👉 No, it's a shallow copy (nested references remain linked).  

Q5: How to create a safe immutable deep copy?
👉 Use structuredClone(obj) (modern), JSON.parse(JSON.stringify(obj)), or libraries like lodash.  

-----------------------------------------------------
⭐ QUICK SUMMARY:
- freeze → fully locks object (no add/delete/modify).  
- seal → prevents add/delete, but modification allowed.  
- assign → copies properties (shallow copy).  
=====================================================
*/

/*  
-----------------------------------------------------
🔹 BONUS: Deep Freeze Utility
-----------------------------------------------------
*/

function deepFreeze(obj) {
  // Freeze the current object
  Object.freeze(obj);

  // Recursively freeze properties if they are objects
  Object.keys(obj).forEach((key) => {
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Object.isFrozen(obj[key])
    ) {
      deepFreeze(obj[key]);
    }
  });

  return obj;
}

// Example usage:
const deepUser = {
  name: "Avi",
  details: { city: "Ahmedabad", address: { pincode: 380001 } },
};

deepFreeze(deepUser);

deepUser.details.city = "Mumbai"; // ❌ won't change
deepUser.details.address.pincode = 400001; // ❌ won't change

console.log(deepUser);
// { name: "Avi", details: { city: "Ahmedabad", address: { pincode: 380001 } } }
