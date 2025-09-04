/*  
=====================================================
📌 Deep Freeze Object in JavaScript
=====================================================

📝 THEORY
-----------------------------------------------------
- By default, `Object.freeze(obj)` only creates a **shallow freeze**.
  → It prevents adding, deleting, or modifying properties at the first level.
  → But nested objects remain mutable.  

- A **Deep Freeze** ensures that the ENTIRE object, including all nested objects,
  becomes completely immutable.  

- Why use Deep Freeze?
  ✅ Protects objects from accidental modification.  
  ✅ Useful in large applications, Redux state management, and immutable data structures.  
  ✅ Prevents unexpected side effects.  

-----------------------------------------------------
🔹 PART 1: Shallow Freeze (default)
-----------------------------------------------------
*/

const user = {
  name: "Avi",
  details: { city: "Ahmedabad" },
};

Object.freeze(user);

user.name = "Patel"; // ❌ ignored
user.details.city = "Mumbai"; // ✅ allowed (nested object not frozen)

console.log(user);
// { name: "Avi", details: { city: "Mumbai" } }

/*  
👉 Problem: Nested objects are NOT frozen.
*/

/*  
-----------------------------------------------------
🔹 PART 2: Implement Deep Freeze
-----------------------------------------------------
*/

function deepFreeze(obj) {
  // First freeze the object itself
  Object.freeze(obj);

  // Then go through all properties
  Object.keys(obj).forEach((key) => {
    if (
      typeof obj[key] === "object" && // must be an object
      obj[key] !== null && // not null
      !Object.isFrozen(obj[key]) // not already frozen
    ) {
      deepFreeze(obj[key]); // recursively freeze
    }
  });

  return obj;
}

// Usage
const deepUser = {
  name: "Avi",
  details: { city: "Ahmedabad", address: { pincode: 380001 } },
};

deepFreeze(deepUser);

deepUser.details.city = "Mumbai"; // ❌ change ignored
deepUser.details.address.pincode = 400001; // ❌ change ignored

console.log(deepUser);
// { name: "Avi", details: { city: "Ahmedabad", address: { pincode: 380001 } } }

/*  
-----------------------------------------------------
🔹 PART 3: Modern Alternative
-----------------------------------------------------
- In modern browsers, you can use `structuredClone()` to clone
  and then deepFreeze the result if you need immutability.
*/

/*  
-----------------------------------------------------
❓ Q&A (Interview Style)
-----------------------------------------------------

Q1: What is the difference between Object.freeze() and Deep Freeze?
👉 - Object.freeze() → Shallow freeze (only top-level properties frozen).
   - Deep Freeze → Recursively freezes all nested objects.

Q2: Why do we need Deep Freeze?
👉 To ensure objects are fully immutable, preventing accidental or malicious changes.

Q3: Does Deep Freeze improve performance?
👉 Not directly. In fact, freezing can add overhead. It's mainly for safety and predictability.

Q4: How can we check if an object is frozen?
👉 Use `Object.isFrozen(obj)` → returns true if frozen.

Q5: Is Deep Freeze reversible?
👉 No, once frozen you cannot unfreeze. You'd need to clone and create a new object.

-----------------------------------------------------
⭐ QUICK SUMMARY:
- freeze → shallow (only top-level locked).
- deepFreeze → recursive, makes entire object immutable.
- Useful in Redux / state management / security sensitive code.
=====================================================
*/
