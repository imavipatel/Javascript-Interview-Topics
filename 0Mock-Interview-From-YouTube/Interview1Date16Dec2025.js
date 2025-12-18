console.log([] == []);
//console.log([] === []);

//What is difference btw arrow function and normal function.

//Can we use new keyword with arrow function.

// var a = 50;
// {
//   var a = 500;
// }

// let b = a;
// {
//   let b = 50000;
// }

// console.log(b); //500 because var is function scope and let and const is block scope

var a = 50;
function add1() {
  var a = 500;
}

let b = a;
function add2() {
  let b = 50000;
}

console.log(b); // 50 bcz var is a function scope inner a will not modify outer a

const arr = [1, 4, 5]; //we have to remove the element 4
// arr.splice(1, 1);

// replace 4 with 6

arr[1] = 6;
//or
arr.fill(6, 1, 2);

console.log(arr);

console.log(2 - "2");
console.log(2 + "2");
console.log("2" - "2");

console.log("Abhi" - 2);

const arr1 = [2, 2, 1, 5, 6, 8, 10, 1, 7, 8]; //return the array with number which comes more than once.

//Approach 1

// Step 1: sort the array (in-place)
arr1.sort((a, b) => a - b);

// Step 2: find duplicates
const result = [];

for (let i = 1; i < arr1.length; i++) {
  if (arr1[i] === arr1[i - 1] && arr1[i] !== result[result.length - 1]) {
    result.push(arr1[i]);
  }
}

console.log(result);

//Approach2

const duplicates = arr1.filter((item, index) => arr1.indexOf(item) !== index);

const result2 = [...new Set(duplicates)];

console.log(result2);

//Approach 3

const count = {};
const results1 = [];

for (let num of arr1) {
  count[num] = (count[num] || 0) + 1;
}

for (let key in count) {
  if (count[key] > 1) {
    results1.push(Number(key));
  }
}

console.log(results1);
