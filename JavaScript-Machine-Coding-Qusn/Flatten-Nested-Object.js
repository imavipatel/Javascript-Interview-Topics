/*********************************************************
 * 📘 JavaScript Notes — Flatten Nested Object (ALL METHODS)
 *********************************************************/

/********************************************
 * 🟢 Problem Statement
 ********************************************/
/**
 * Convert a nested object into a flat object.
 *
 * Input:
 */
const user = {
  name: "Alice",
  age: 30,
  address: {
    street: "123 Main St",
    city: "Anytown",
    zipCode: "12345",
  },
  contact: {
    email: "alice@example.com",
    phone: "555-123-4567",
  },
};

/**
 * Expected Output:
 * {
 *  name: "Alice",
 *  age: 30,
 *  "address.street": "123 Main St",
 *  "address.city": "Anytown",
 *  "address.zipCode": "12345",
 *  "contact.email": "alice@example.com",
 *  "contact.phone": "555-123-4567"
 * }
 */

/********************************************
 * 🟢 Method 1: Recursive Method (BEST & MOST COMMON)
 ********************************************/
/**
 * ✔ Works for any nesting depth
 * ✔ Most interview-friendly solution
 */

function flattenObjectRecursive(obj, parentKey = "", result = {}) {
  for (let key in obj) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof obj[key] === "object" && obj[key] !== null) {
      flattenObjectRecursive(obj[key], newKey, result);
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}

console.log("Recursive:", flattenObjectRecursive(user));

/********************************************
 * 🟢 Method 2: Using One Loop (Fixed Depth Only)
 ********************************************/
/**
 * ✔ No recursion
 * ❌ Works ONLY when depth is known (2 levels)
 */

const oneLoopResult = {};

for (let key in user) {
  if (typeof user[key] === "object" && user[key] !== null) {
    for (let innerKey in user[key]) {
      oneLoopResult[`${key}.${innerKey}`] = user[key][innerKey];
    }
  } else {
    oneLoopResult[key] = user[key];
  }
}

console.log("One Loop:", oneLoopResult);

/********************************************
 * 🟢 Method 3: Reduce Method
 ********************************************/
/**
 * ✔ Functional programming style
 * ✔ Clean but slightly advanced
 */

function flattenObjectReduce(obj, parentKey = "") {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(acc, flattenObjectReduce(obj[key], newKey));
    } else {
      acc[newKey] = obj[key];
    }
    return acc;
  }, {});
}

console.log("Reduce:", flattenObjectReduce(user));

/********************************************
 * 🟢 Method 4: Stack / Iterative Method (No Recursion)
 ********************************************/
/**
 * ✔ Handles unknown depth
 * ✔ Avoids recursion (good for large objects)
 */

function flattenObjectStack(obj) {
  const result = {};
  const stack = [{ data: obj, parentKey: "" }];

  while (stack.length) {
    const { data, parentKey } = stack.pop();

    for (let key in data) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof data[key] === "object" && data[key] !== null) {
        stack.push({ data: data[key], parentKey: newKey });
      } else {
        result[newKey] = data[key];
      }
    }
  }
  return result;
}

console.log("Stack:", flattenObjectStack(user));

/********************************************
 * 🟢 Method 5: JSON Trick (NOT RECOMMENDED)
 ********************************************/
/**
 * ❌ Not safe
 * ❌ Loses structure & types
 * ❌ Mention only as a trick
 */

const jsonTrick = JSON.stringify(user);
console.log("JSON String:", jsonTrick);

/********************************************
 * 🟢 Interview Comparison
 ********************************************/
/**
 * Recursive       → ⭐ BEST, most accepted
 * One loop        → Only fixed depth
 * Reduce          → Functional, clean
 * Stack           → No recursion, scalable
 * JSON trick      → Avoid in interviews
 */

/********************************************
 * 🟢 Interview Q & A
 ********************************************/
/**
 * Q: Best method to flatten object?
 * A: Recursive approach.
 *
 * Q: Why avoid one-loop solution?
 * A: Breaks if nesting depth changes.
 *
 * Q: Why stack method?
 * A: Prevents call stack overflow.
 */

/*********************************************************
 * ✅ End of Notes
 *********************************************************/
