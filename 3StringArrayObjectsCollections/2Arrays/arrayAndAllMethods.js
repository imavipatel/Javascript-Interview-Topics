// ===============================================================
// 📘 JavaScript Notes: Arrays
// ===============================================================

// ---------------------------------------------------------------
// 1) ARRAY BASICS
// ---------------------------------------------------------------
/*
- Arrays are special objects in JS used to store ordered collections.
- They can hold mixed data types (numbers, strings, objects, functions).
- Index starts from 0.
*/

let arr = [1, "hello", true, { key: "value" }];
console.log(arr[0]); // 1
console.log(arr[3]); // { key: "value" }

// ---------------------------------------------------------------
// 2) ARRAY METHODS: push, pop, shift, unshift
// ---------------------------------------------------------------
let numbers = [1, 2, 3];

// push → adds element at END
numbers.push(4);
console.log(numbers); // [1,2,3,4]

// pop → removes element from END
numbers.pop();
console.log(numbers); // [1,2,3]

// unshift → adds element at START
numbers.unshift(0);
console.log(numbers); // [0,1,2,3]

// shift → removes element from START
numbers.shift();
console.log(numbers); // [1,2,3]

// ---------------------------------------------------------------
// 3) HIGHER ORDER METHODS
// ---------------------------------------------------------------

let nums = [1, 2, 3, 4, 5];

// map → returns new array after applying function
let squared = nums.map((x) => x * x);
console.log(squared); // [1,4,9,16,25]

// filter → returns elements that pass condition
let even = nums.filter((x) => x % 2 === 0);
console.log(even); // [2,4]

// reduce → reduces array to single value
let sum = nums.reduce((acc, val) => acc + val, 0);
console.log(sum); // 15

// reduceRight → works right to left
let concat = ["a", "b", "c"].reduceRight((acc, val) => acc + val, "");
console.log(concat); // "cba"

// slice(start, end) → returns shallow copy
let sliceExample = nums.slice(1, 4);
console.log(sliceExample); // [2,3,4]

// splice(start, deleteCount, ...items) → modifies array
let spliceExample = [10, 20, 30, 40];
spliceExample.splice(1, 2, 25, 35);
console.log(spliceExample); // [10,25,35,40]

// flat(depth) → flattens nested arrays
let nested = [1, [2, [3, 4]]];
console.log(nested.flat(2)); // [1,2,3,4]

// forEach → loop (does not return new array)
nums.forEach((x) => console.log("Num:", x));

// some → checks if ANY element satisfies condition
console.log(nums.some((x) => x > 4)); // true

// every → checks if ALL elements satisfy condition
console.log(nums.every((x) => x > 0)); // true

// ---------------------------------------------------------------
// 4) ARRAY DISPATCH EVENT ON PUSH (Trick)
// ---------------------------------------------------------------
/*
By default, arrays don't "dispatch events".
But we can override push() method to trigger a custom action.
*/

let myArray = [];
myArray.push = function (...args) {
  console.log("Push detected:", args);
  return Array.prototype.push.apply(this, args);
};
myArray.push(10); // "Push detected: [10]"

// ---------------------------------------------------------------
// 5) DESTRUCTURING ASSIGNMENT
// ---------------------------------------------------------------
let [first, second] = [100, 200];
console.log(first, second); // 100 200

let [a, , b] = [1, 2, 3];
console.log(a, b); // 1 3

let [x, y, ...rest] = [10, 20, 30, 40];
console.log(x, y, rest); // 10 20 [30,40]

// ---------------------------------------------------------------
// 6) SPREAD & REST OPERATORS (Arrays)
// ---------------------------------------------------------------

// Spread → expand array
let arr1 = [1, 2];
let arr2 = [3, 4];
let combined = [...arr1, ...arr2];
console.log(combined); // [1,2,3,4]

// Rest → collect remaining values
function sumAll(...nums) {
  return nums.reduce((acc, val) => acc + val, 0);
}
console.log(sumAll(1, 2, 3, 4)); // 10

// ---------------------------------------------------------------
// 7) ADDITIONAL ARRAY METHODS
// ---------------------------------------------------------------

console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray("not array")); // false

// find → returns first match
let found = [5, 10, 15].find((x) => x > 8);
console.log(found); // 10

// findIndex → returns index of first match
let idx = [5, 10, 15].findIndex((x) => x > 8);
console.log(idx); // 1

// sort (⚠️ mutates array, sorts as string by default)
let toSort = [10, 1, 21];
console.log(toSort.sort()); // [1,10,21] (string compare)

// proper number sort
console.log(toSort.sort((a, b) => a - b)); // [1,10,21]

// reverse → reverses array
console.log([1, 2, 3].reverse()); // [3,2,1]

// join → creates string from array
console.log(["a", "b", "c"].join("-")); // "a-b-c"

// ---------------------------------------------------------------
// 8) BIT MANIPULATION INTRO
// ---------------------------------------------------------------
/*
Bitwise operations can be used in arrays.
Example: Find max element without Math.max
*/

let arrNums = [10, 25, 7, 50, 30];

let maxNum = arrNums.reduce((a, b) => (a > b ? a : b));
console.log(maxNum); // 50

// Or using ES5 Math.max with apply
console.log(Math.max.apply(null, arrNums)); // 50

// ---------------------------------------------------------------
// 9) QUIRKY QUESTION
// ---------------------------------------------------------------

var a1 = [1, 2, 3, 4, 5][(0, 1, 2, 3, 4)];
console.log(a1);

/*
Explanation:
- [1,2,3,4,5][0,1,2,3,4]
- Inside [] → JS takes only the LAST value in the comma expression → 4
- So it becomes [1,2,3,4,5][4] → 5
*/

// Output: 5

// ---------------------------------------------------------------
// 10) Q&A SECTION
// ---------------------------------------------------------------

// Q1: Difference between slice() and splice()?
// slice → returns new array (does NOT modify original)
// splice → modifies original array (can add/remove elements)

// Q2: Difference between map() and forEach()?
// map → returns new array
// forEach → executes function but returns undefined

// Q3: How does reduce() work?
// - Takes a callback(acc, curr) and accumulator
// - Iterates, returns single value

// Q4: What’s difference between some() and every()?
// some() → true if ANY element passes
// every() → true only if ALL elements pass

// Q5: Why does sort() behave weirdly with numbers?
// - Default sort compares as strings.
// Example: [10,2,3].sort() → [10,2,3] (string order)
// Fix: Provide compare function (a-b)

// Q6: What is array destructuring used for?
// - Extract values quickly
// - Cleaner than arr[0], arr[1]

// Q7: What’s the use of spread vs rest?
// Spread → expand array
// Rest → collect elements into array

// Q8: Explain Array.isArray()
// - Checks if value is true array
// typeof [] === "object", so Array.isArray is safer

// Q9: Can arrays in JS hold different types?
// Yes → JS arrays are dynamic, can hold any type

// Q10: What does var a = [1,2,3,4,5][0,1,2,3,4]; output?
// → 5 (last index in comma operator is 4)
