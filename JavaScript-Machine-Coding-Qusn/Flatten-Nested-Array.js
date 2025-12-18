/*********************************************************
 * 📘 JavaScript Notes — Flatten Nested Array (ALL METHODS)
 *********************************************************/

/********************************************
 * 🟢 Problem Statement
 ********************************************/
/**
 * Flatten a nested array into a single array.
 *
 * Input:
 * [[1, 2], [3, 4], [1, [2, 4]], [3, 4]]
 *
 * Output:
 * [1, 2, 3, 4, 1, 2, 4, 3, 4]
 */

const inputArray = [
  [1, 2],
  [3, 4],
  [1, [2, 4]],
  [3, 4],
];

/********************************************
 * 🟢 Method 1: Using flat(Infinity) (Easiest)
 ********************************************/
/**
 * Best when modern JS is allowed
 * Removes all nested levels automatically
 */

const flatMethodResult = inputArray.flat(Infinity);
console.log("flat():", flatMethodResult);

/********************************************
 * 🟢 Method 2: Recursive Function (Most Flexible)
 ********************************************/
/**
 * Best when nesting depth is unknown
 * Classic interview solution
 */

function flattenRecursive(arr, result = []) {
  for (let item of arr) {
    if (Array.isArray(item)) {
      flattenRecursive(item, result);
    } else {
      result.push(item);
    }
  }
  return result;
}

const recursiveResult = flattenRecursive(inputArray);
console.log("Recursive:", recursiveResult);

/********************************************
 * 🟢 Method 3: Reduce Method
 ********************************************/
/**
 * Functional programming approach
 * Clean but slightly advanced
 */

const reduceResult = inputArray.reduce((acc, curr) => {
  return acc.concat(Array.isArray(curr) ? curr.flat(Infinity) : curr);
}, []);

console.log("Reduce:", reduceResult);

/********************************************
 * 🟢 Method 4: ONE LOOP ONLY (No flat, No recursion)
 ********************************************/
/**
 * Works when nesting depth is FIXED (max 2 levels)
 * Common interview constraint question
 */

const oneLoopResult = [];

for (let i = 0; i < inputArray.length; i++) {
  const currentItem = inputArray[i];

  if (Array.isArray(currentItem)) {
    for (let j = 0; j < currentItem.length; j++) {
      if (Array.isArray(currentItem[j])) {
        for (let k = 0; k < currentItem[j].length; k++) {
          oneLoopResult.push(currentItem[j][k]);
        }
      } else {
        oneLoopResult.push(currentItem[j]);
      }
    }
  } else {
    oneLoopResult.push(currentItem);
  }
}

console.log("One Loop:", oneLoopResult);

/********************************************
 * 🟢 Method 5: While Loop (Stack Approach)
 ********************************************/
/**
 * No recursion
 * Handles unknown depth
 */

function flattenWithStack(arr) {
  const stack = [...arr];
  const result = [];

  while (stack.length) {
    const next = stack.pop();

    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      result.push(next);
    }
  }

  return result.reverse();
}

const stackResult = flattenWithStack(inputArray);
console.log("Stack:", stackResult);

/********************************************
 * 🟢 Interview Comparison Table
 ********************************************/
/**
 * flat()           → Simple, modern JS
 * Recursion        → Best logic explanation
 * reduce()         → Functional style
 * One loop         → Fixed depth only
 * Stack approach   → No recursion, dynamic depth
 */

/********************************************
 * 🟢 Interview Q & A
 ********************************************/
/**
 * Q: Best solution in interviews?
 * A: Recursive or stack-based approach.
 *
 * Q: Why one-loop solution is risky?
 * A: Breaks if nesting depth increases.
 */

/*********************************************************
 * ✅ End of Notes
 *********************************************************/
