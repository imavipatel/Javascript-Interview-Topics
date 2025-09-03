//Random qurated question

//Qusn 1:
console.log("Qusn 1===>");

let x = 10;

const check = () => {
  console.log(x);
  if (true) {
    var x = 20;
  }
};

check(); //Explanation for Qusn 1  ==> The variable `x` is hoisted to the top of the function scope, but its value is not assigned until after the console.log statement. So it logs `undefined` instead of `10`.

//Output: undefined

//Qusn 2:
console.log("Qusn 2===>");

console.log(1 + "1"); //Output: "11" (string concatenation) // js converts number to string
console.log(1 - "1"); //Output: 0 (number subtraction) // js converts string to number
console.log("11" + 1); //Output: "111" (string concatenation)
console.log("11" + "1"); //Output: "111" (string concatenation)
console.log("11" + 1 + 1); //Output: "1111" (string concatenation)
console.log(1 + 1 + "11"); //Output: "211" (number addition followed by string concatenation)
console.log(1 - 1 + "11"); //Output: "011" (number subtraction followed by string concatenation)
console.log("11" - 1); //Output: 10 (number subtraction)

//Qusn 3:
console.log("Qusn 3===>");
const arr = [1, , 3];

console.log(arr.length); //Output: 3 (length includes empty slots)
console.log(arr[1]); //Output: undefined (empty slot, not a defined value)
console.log(1 in arr); //Output: false (index 1 does not exist, it's an empty slot)
console.log(2 in arr); //Output: true (index 2 exists with value 3)

//Qusn 4:
console.log("Qusn 4===>");

let first = "Ankit";
let second = "❤️";

console.log(first.length); //Output: 5 (length of the string "Ankit")
console.log(second.length); //Output: 2 (length of the string "❤️") //js use UTF-16 under the hood. js counts units not actual visible char
//UTF-16 uses 2 code units to represent the heart emoji, so its length is 2.

//UTF-16 is a character encoding that uses one or two 16-bit code units to represent characters. Most common characters (like letters and numbers) use one code unit,
// while some special characters (like emojis) use two code units.
//Example: The heart emoji ❤️ is represented by two code units in UTF-16, so its length is 2.
//Two code unit like is "𐍈" (U+10300) which is a letter in Gothic script, also takes 2 code units in UTF-16.

//Qusn 5:
console.log("Qusn 5===>");

var sample1 = [5, 3, 6, 1];
var sample2 = ["jhon", "ruby", "michel"];
var sample3 = ["sales", "accounts", "admin"];
var array = [];
array.push.apply(sample1, sample2, sample3);
console.log(sample1);

//Output: [5, 3, 6, 1, "jhon", "ruby", "michel"] //apply method is used to push multiple arrays into one array

//Explanation for Qusn 5  ==> The `apply` method is used to call the `push` function with the `sample1` array as the context, and it spreads the elements of `sample2` and `sample3` into the `sample1` array.
//So, it effectively appends all elements from `sample2` and `sample3` to `sample1`, resulting in a single array containing all elements.

//Sample3 are ignored because `apply` only takes two arguments: the first is the context (the array to push into), and the second is an array of elements to push.

//Qusn 6:
console.log("Qusn 6===>");
console.log("110101101110110011".split(0, 5));

//Explanation for Qusn 6  ==>
//Output: ["11", "1", "11", "111", "11"]
//The `split` method splits a string into an array of substrings based on the specified separator.
//In this case, it splits the string "110101101110110011" at each occurrence of '0', resulting in an array of substrings.
//The second argument (5) is the limit, which specifies the maximum number of splits to be made.
//So it returns the first 5 substrings before the limit is reached.

//Note: The `split` method does not include the separator in the resulting array, so '0' is not included in the output.

//Qusn 7:
console.log("Qusn 7===>");
function Example() {
  let y;
  console.log(x, y); // Here x is Implicit Global. //var is hoisted, so it is undefined. let y is block-scoped and not initialized yet, so it is undefined.
  if (true) {
    var x = 10;
    let y = 10;
    console.log(x, y); // Here x is 10 (from the block), y is 10 (from the block)
  }
  console.log(x, y); // Here x is 10 (from the block), y is still undefined // because the outer y is not initialized yet.
  //x is function scoped so it is hoisted to the top of the function, and x value in block will refer to the outer x.
}

Example();

//Explanation for Qusn 7  ==> var x is function-scoped and hoisted, so x is undefined initially, even before its declaration. let y is block-scoped, so the outer y is separate from the inner y. Outside the block, y remains uninitialized.

//Qusn 8:
console.log("Qusn 8===>");

const person = {
  name: "Ankit Patel",
  getName: () => {
    console.log(this.name);
  },
  getName() {
    console.log(this.name);
  },
};
person.getName(); //Output: 'Ankit Patel' (using regular function, this refers to the person object)
/*
Arrow functions do not have their own this.
They inherit this from the lexical scope (i.e., where the function was defined). In this case, it's the global scope.

Regular functions (like the second getName()) use this based on how they are called.
When called as person.getName(), this refers to person.

Duplicate keys: If you declare two properties with the same name in an object, the last one wins.

*/

//Qusn 9:

console.log("Qusn 9===>");

const persons = {
  name: "Ankit Patel",
  getName: function () {
    console.log(this.name);
  },
};
persons.getName(); //Output: 'Ankit Patel' (using regular function, this refers to the persons object)

//Explanation for Qusn 9  ==> In this case, the getName function is a regular function, so when it is called as persons.getName(), this refers to the persons object.
//The output will be 'Ankit Patel' because this.name refers to the name property of the persons object.

//Qusn 10
console.log("Qusn 10===>");
const obj = {
  value: 42,
  showArrow: function () {
    setTimeout(() => {
      console.log("Qusn10===>", this.value);
    }, 1000);
  },
  showNormal: function () {
    setTimeout(
      function () {
        console.log("Qusn10===>", this.value);
      }.bind(this),
      1000
    );
  },
};

console.log(obj.showArrow()); //42
console.log(obj.showNormal()); //42

/*
Arrow functions inherit this from where they're defined, so this.value works inside setTimeout as expected.

Regular functions have their own this, so we use .bind(this) to make sure it still refers to the object.
*/

//Qusn 11:
console.log("Qusn 11===>");

function a() {
  console.log(b);
  console.log(d);
}

var b = 10; //10
let d = 12; //12
a(); //Output: 10 //Explanation for Qusn 11  ==> The variable `b` is hoisted to the top of the function scope, so when `a()` is called, it logs the value of `b`, which is 10.

//Qusn 12:
console.log("Qusn 12===>");

function a() {
  c();
  function c() {
    console.log(b);
  }
}

var b = 10;
a(); ////Output: 10 var or let same output
//Explanation for Qusn 12  ==> The function `c` is defined inside `a`, and it logs the value of `b`. Since `b` is hoisted to the top of the scope, it logs 10 when `c()` is called.

//Qusn 13:
console.log("Qusn 13===>");

var p = 1;
function outerFn() {
  var p = 2;
  function innterFn() {
    p++;
    console.log(p);
    var p = 3;
    console.log(p);
  }
  innterFn();
  console.log(p);
}
outerFn(); //Output: NaN 3 2

/*
Concept	What Happened
Hoisting	var p inside innterFn was hoisted (declared, not assigned)
Shadowing	Local p in innterFn shadows p in outerFn
undefined++	Becomes NaN because p was undefined when incremented
console.log(p)	Prints current value of local p at each step
*/

//Qusn 14:
console.log("Qusn 14===>");

const arr1 = [1, 2, 3, 4, 5];

for (var i = 0; i < arr1.length; i++) {
  setTimeout(function () {
    console.log("Qusn14===>", i);
  }, 1000);
}

//Explanation for Qusn 14  ==> The loop completes before the setTimeout callbacks execute, so by the time they run, `i` is 5 (the loop's final value). All callbacks will log 5.

//Qusn 15:
console.log("Qusn 15===>");

const arr2 = [1, 2, 3, 4, 5];

for (let i = 0; i < arr2.length; i++) {
  setTimeout(function () {
    console.log("Qusn15===>", i);
  }, 1000);
}

//Explanation for Qusn 15  ==> Using `let` creates a new scope for each iteration of the loop. Each callback retains its own `i`, so they log 0, 1, 2, 3, and 4 respectively.

//Qusn 16:
console.log("Qusn 16===>");

// frequently asked
const arr3 = [1, 2, 3, 4, 5];
for (var i = 0; i < arr3.length; i++) {
  (function (i) {
    setTimeout(function () {
      console.log("Qusn16===>", i);
    }, 1000);
  })(i); // Pass `i` as an argument to the IIFE
}
//Explanation for Qusn 16  ==> This uses an IIFE (Immediately Invoked Function Expression) to create a new scope for each iteration, capturing the current value of `i`. Each callback logs its own `i`, so they log 0, 1, 2, 3, and 4 respectively.

//Qusn 17:
console.log("Qusn 17===>");

var a = 10;
xt();
yt();
// z();

function xt() {
  var a = 20;
  console.log(this.a);
}
function yt() {
  console.log(this.a);
}
const z = () => {
  console.log(this.a);
};

//Explanation for Qusn 17  ==>
//For non strict mode, `this` refers to the global object (window in browsers) when not called as a method of an object.
// In strict mode, `this` would be undefined if not set explicitly.
// In the global context, `this` refers to the global object (window in browsers).
// `xt()` logs 10 because it uses `this.a`, which refers to the global `a`.
// `yt()` also logs 10 for the same reason.
// `z()` is an arrow function, which does not have its own `this`, so it also refers to the global object, logging 10.

//In strict mode, if you had `use strict` at the top of your script, `this` would be `undefined` in `xt()`, `yt()`, and `z()`, leading to a TypeError when trying to access `this.a` since `this` would not have an `a` property.
//10 10 , ReferenceError

// xt(), yt() -> this share global scope z() -> tried to access before initialization

//Qusn 18:
console.log("Qusn 18===>");

// this is follow up question for above question
let a1 = 10;
x2();
y2();
// z1();

function x2() {
  console.log(this.a1);
}
function y2() {
  console.log(this.a1);
}
const z1 = () => {
  console.log(this.a1);
};

//Explanation for Qusn 18  ==>
//In strict mode, `this` is `undefined` in functions that are not called as methods of an object.
//In the global context, `this` refers to the global object (window in browsers).

// undefined, undefined , ReferenceError

// In regular functions (x2() and y2()), this refers to the global object, which does not have variable a so it return undefined.

//Qusn 19:
console.log("Qusn 19===>");

function func() {
  try {
    console.log(1);
    return;
  } catch (e) {
    console.log(2);
  } finally {
    console.log(3);
  }
  console.log(4);
}
func();
//Explanation for Qusn 19  ==>
//Output: 1 3
//The try block executes and logs 1, then returns. However, before the function actually returns, the finally block executes and logs 3.
//The code after the finally block (console.log(4)) is ignored because the function has already returned.

//Even if there is a return inside the try or catch, the finally block always executes before the function actually returns.
//But once finally finishes, the control goes back to the return → function exits → anything after try-catch-finally is ignored.

//Qusn 20:
console.log("Qusn 20===>");

let objs = { name: "John" };
let weakMap = new WeakMap();
weakMap.set(objs, "Person");

console.log(weakMap.has(objs));

objs = null;

setTimeout(() => {
  console.log("Qusn20===>", weakMap.has(objs));
}, 1000);

//When you want to associate data with an object, but don’t want to prevent that object from being cleaned up.

//Common in libraries or DOM manipulations, where memory leaks are a concern.

/*
obj is now null, so weakMap.has(null) is effectively what you’re running.

But null is not a valid key in a WeakMap (remember: keys must be non-null objects).

So weakMap.has(obj) → becomes weakMap.has(null) → which returns false.
*/

//Qusn 21:
console.log("Qusn 21===>");

const myObject = {
  name: "Test",
  getFunctionName: function () {
    console.log(this.name);
  },
  getArrowFunctionName: () => {
    console.log(this.name);
  },
  updateArrowFunctionScope: function () {
    const innerArrowFunction = () => {
      console.log(this.name);
    };
    innerArrowFunction();
  },
};

myObject.getFunctionName();
myObject.getArrowFunctionName();
myObject.updateArrowFunctionScope();

//Regular functions get their this from how they are called, so this refers to the object (myObject) when using function() {}.

//Arrow functions don't have their own this; they inherit it from where they're defined, so this may be undefined or global, not the object.

//Qusn 22:
console.log("Qusn 22===>");

// asked similar question in mindtickle
function outer() {
  console.log(a);
  var a = 10;
  function inner() {
    console.log(a);
    return 10;
    function a() {
      var a = 10;
    }
  }
  inner();
}
outer();

//Explanation for Qusn 22  ==>
//Output: undefined function a() { var a = 10; }
//var and function declarations are hoisted; console.log(a) in outer() logs undefined because a is hoisted but not yet assigned.

//In inner(), the function a() is hoisted as a local variable, so console.log(a) logs the function definition itself.

//Qusn 23:
console.log("Qusn 23===>");

//asked in dream 11

var doc = "Soni's frontend doc";
const obj1 = {
  doc: "soni",
  printName: function () {
    return this.doc;
  },
  printNameArrow: () => {
    return this.doc;
  },
  IIFE: (function () {
    // console.log(this)
    return this.doc;
  })(),
  IIFEArrow: (() => {
    // console.log(this)
    return this.doc;
  })(),
};
console.log(obj1.printName());
console.log(obj1.printNameArrow());
console.log(obj1.IIFE);
console.log(obj1.IIFEArrow);

//Explanation for Qusn 23  ==> For not strict mode, `this` in the context of obj1 refers to the global object (window in browsers), so it accesses the global `doc` variable.
//Output: soni Soni's frontend doc Soni's frontend doc Soni's frontend doc
//In printName(), this refers to obj1, so it returns obj1.doc.
//In printNameArrow(), this refers to the global context (window in browsers), so it returns the global doc variable.
//IIFE runs in the global context, so it returns the global doc variable.
//IIFEArrow also runs in the global context, so it returns the global doc variable.

//For strict mode, `this` would be undefined in the arrow function, and IIFE and IFFEArrow would not have access to the global `doc` variable, So it will be undefined.

//Qusn 24:
console.log("Qusn 24===>");

function add5(x) {
  return x + 5;
}

function multiplyBy3(x) {
  return x * 3;
}

function compose(f, g) {
  return function (x) {
    return f(g(x));
  };
}

const addThenMultiply = compose(multiplyBy3, add5);
console.log(addThenMultiply(2));

//Explanation for Qusn 24  ==> The compose function takes two functions f and g, and returns a new function that applies g to x, then applies f to the result.
//In this case, it first adds 5 to the input (2 + 5 = 7), then multiplies the result by 3 (7 * 3 = 21).
//So addThenMultiply(2) returns 21.

//Qusn 25:
console.log("Qusn 25===>");

console.log(typeof null);
console.log(typeof undefined);
console.log(null === undefined);
console.log(null == undefined);
console.log(2 * "2");
console.log(2 * "Hello");

//Explanation for Qusn 25  ==>
//typeof null returns "object" (this is a known JavaScript quirk).
//typeof undefined returns "undefined".
//null and undefined are not strictly equal (===) because they are of different types, but they are loosely equal (==) because both represent the absence of a value.
//2 * '2' returns 4 because JavaScript coerces the string '2' to a number.
//2 * 'Hello' returns NaN (Not a Number) because 'Hello' cannot be coerced to a number.

//Qusn 26:
console.log("Qusn 26===>");

console.log([1, 2, 3] + [3, 2, 1]);

//Explanation for Qusn 26  ==>
//When you use the + operator with arrays, JavaScript converts the arrays to strings and then concatenates them.
//So [1,2,3] becomes "1,2,3" and [3,2,1] becomes "3,2,1", resulting in "1,2,33,2,1".

//Qusn 27:
console.log("Qusn 27===>");

class Counter {
  #number = 10;

  increment() {
    this.#number++;
  }

  getNum() {
    return this.#number;
  }
}

const counter = new Counter();
//console.log(counter.#number); // This will throw a SyntaxError because #number is a private field
console.log(counter.increment()); // This will log undefined because increment() does not return anything
console.log(counter.getNum());

//Explanation for Qusn 27  ==>
//Output: SyntaxError: Private field '#number' must be declared in an enclosing class
//Private fields (like #number) cannot be accessed outside the class definition, even from instances of the class.
//To access the private field, you should use a public method like getNum() to retrieve its value.

//Qusn 28:
console.log("Qusn 28===>");

var name = "test";

function callName() {
  (name = "test2"), console.log(name);
}
callName();
console.log(name);

//Explanation for Qusn 28  ==>
//Output: test2 test2
//In the function callName(), name is assigned 'test2'. Since name is not declared with var, let, or const inside
// the function, it modifies the global variable name.
//So both console.log(name) inside and outside the function will log 'test2'.

//Qusn 29:
console.log("Qusn 29===>");

console.log([] == []);
console.log({} == {});
console.log(2 == "2");
// console.log({} === {});

//Explanation for Qusn 29  ==>
//Output: false false true false
//[] == [] and {} == {} return false because they are comparing object references, which are different for each new array or object.
//2 == "2" returns true because JavaScript coerces the string "2" to a number before comparison.
//{} === {} returns false for the same reason as above; they are different object references.

//Qusn 30:
console.log("Qusn 30===>");

const arr4 = [10, -1, 2];

console.log(arr4.sort());

//Explanation for Qusn 30  ==>
//Output: [-1, 10, 2]
//The sort() method converts elements to strings and sorts them lexicographically (dictionary order).
//So '10' comes before '2' because '1' is less than '2' in string comparison.
//To sort numerically, you can pass a compare function: arr4.sort((a, b) => a - b);

//Qusn 31:
console.log("Qusn 31===>");

//asked in Publicis Sapient
console.log(7 > 6 > 5);

//Explanation for Qusn 31  ==>
//Output: false
//This expression is evaluated from left to right.
//First, 7 > 6 evaluates to true (which is coerced to 1 in the next comparison).
//Then, 1 > 5 evaluates to false.
//So the final result is false.

//Qusn 32:
console.log("Qusn 32===>");

let c = 0;
c = ++c + c++ + --c + c--;
console.log(c);

//Explanation for Qusn 32  ==>
//Output: 1
//Let's break it down step by step:
//1. ++c increments c to 1, so it evaluates to 1.
//2. c++ uses the current value of c (1) and then increments it to 2.
//3. --c decrements c back to 1, so it evaluates to 1.
//4. c-- uses the current value of c (1) and then decrements it to 0.
//So the expression becomes: 1 + 1 + 1 + 1 = 4,

//Qusn 33:
console.log("Qusn 33===>");

//What will happen when we will clik on button ?

/*

<div onclick="console.log('first div')">
  <div onclick="console.log('second div')">
    <button onclick="console.log('button')">Click!</button>
  </div>
</div>;

*/

//Explanation for Qusn 33  ==>
//Output: button second div first div
//When the button is clicked, the event bubbles up from the button to the second div, then to the first div.
//So all three console.log statements will execute in order: first for the button, then for the second div, and finally for the first div.

//Qusn 34:
console.log("Qusn 34===>");

async function foo() {
  console.log(1);
  await Promise.resolve();
  console.log(2);
}

foo();
console.log(3);

//Explanation for Qusn 34  ==>
//Output: 1 3 2
//When foo() is called, it logs 1, then hits the await statement.
//The await pauses the execution of foo() until the Promise resolves, allowing the event loop to continue.
//So it logs 3 next, and finally, when the Promise resolves, it logs 2.
//This demonstrates how async/await works in JavaScript, allowing asynchronous code to be written in a more synchronous style.

//Qusn 35:
console.log("Qusn 35===>");

Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.reject("Error")])
  .then((values) => console.log("Resolved:", values))
  .catch((err) => console.log("Caught:", err));

//Explanation for Qusn 35  ==>
//Output: Caught: Error
//Promise.all() waits for all promises to resolve, but if any promise rejects, it immediately rejects with that error.
//In this case, the third promise rejects with "Error", so the catch block is executed, logging "Caught: Error".

//Qusn 36:
console.log("Qusn 36===>");

Promise.all([Promise.resolve(1), undefined, null])
  .then((values) => console.log("Resolved:", values))
  .catch((err) => console.log("Caught:", err));

//Explanation for Qusn 36  ==>
//Output: Resolved: [ 1, undefined, null ]
//Promise.all() resolves when all promises resolve or if there are non-promise values.
//In this case, the first value is a resolved promise, and the other two are non-promise values (undefined and null), so it resolves with an array containing those values.

//Qusn 37:
console.log("Qusn 37===>");

//asked in multiplier

console.log("Start");
new Promise((resolve, rej) => {
  console.log("Promise1");
  resolve("resolved");
  console.log("Promise2");
}).then((data) => console.log(data));
console.log("end");

//Explanation for Qusn 37  ==>
//Output: Start Promise1 Promise2 end resolved
//The synchronous code runs first, logging "Start", "Promise1", and "Promise2".
//Then the promise resolves, and the then() callback is executed, logging "resolved".
//This demonstrates how promises work in JavaScript: they allow asynchronous operations to be handled after the synchronous code has executed.

//Qusn 38:
console.log("Qusn 38===>");

console.log("Start");
setTimeout(() => {
  console.log("Timeout");
}, 0);
Promise.resolve().then(() => {
  console.log("Promise");
});
console.log("End");

//Explanation for Qusn 38  ==>
//Output: Start End Promise Timeout
//The synchronous code runs first, logging "Start" and "End".
//Then the promise resolves, logging "Promise".
//Finally, the setTimeout callback is executed, logging "Timeout".
//This demonstrates the event loop in JavaScript: promises are resolved before setTimeout callbacks, even if they are scheduled with a delay of 0 milliseconds.

//Qusn 39:
console.log("Qusn 39===>");

console.log("Start");

setTimeout(() => {
  console.log("Timeout 1");
  Promise.resolve().then(() => {
    console.log("Promise 1");
  });
  setTimeout(() => {
    console.log("Timeout 2");
  }, 0);
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 2");
});

console.log("End");

//Explanation for Qusn 39  ==>
//Output: Start End Promise 2 Timeout 1 Promise 1 Timeout 2
//The synchronous code runs first, logging "Start" and "End".
//Then the first promise resolves, logging "Promise 2".
//Next, the setTimeout callback for "Timeout 1" is executed, logging "Timeout 1".
//Inside that callback, another promise resolves, logging "Promise 1".
//Finally, the second setTimeout callback logs "Timeout 2".
//This demonstrates how nested promises and timeouts work in JavaScript's event loop.

//Qusn 40:
console.log("Qusn 40===>");

Promise.resolve(1)
  .then((x) => x + 1)
  .then((x) => {
    throw new Error("An error occurred!");
  })
  .catch((err) => {
    console.log(err.message);
    return 5;
  })
  .then((x) => console.log(x));

//Explanation for Qusn 40  ==>
//Output: An error occurred! 5
//The first promise resolves with 1, then adds 1 to it, resulting in 2.
//The next then() throws an error, which is caught by the catch() block.
//The catch() logs the error message and returns 5.
//Finally, the last then() logs 5.
//This demonstrates how error handling works in promise chains in JavaScript.

//Qusn 41:
console.log("Qusn 41===>");

const promise = new Promise((resolve, reject) => {
  resolve("First");
  resolve("Second");
  reject("Third");
});

promise.then((res) => console.log(res)).catch((err) => console.log(err));

//Explanation for Qusn 41  ==>
//Output: First
//A promise can only resolve/reject once. The subsequent resolve and reject calls are ignored.
//The promise is resolved with "First", so the then() callback is executed, logging "First".
//Subsequent calls to resolve() and reject() are ignored because a promise can only be settled once.

//Qusn 42:
console.log("Qusn 42===>");

console.log("Start");

async function foo() {
  console.log("Foo Start");
  await new Promise((resolve) => setTimeout(resolve, 0));
  console.log("Foo End");
}

foo().then(() => {
  console.log("After Foo");
});

console.log("End");

//Explanation for Qusn 42  ==>
//Output: Start Foo Start End Foo End After Foo

//'Start', 'Foo Start', and 'End' are logged immediately because they are synchronous.

//await setTimeout(...) pauses foo() and schedules the rest ('Foo End') as a macrotask.

//After the timer, 'Foo End' runs, and then the .then() logs 'After Foo' as a microtask.

//Qusn 43:
console.log("Qusn 43===>");

Promise.reject("Error")
  .catch((err) => {
    console.log("Caught:", err);
    return "Recovered";
  })
  .finally(() => {
    console.log("Finally 2");
  })
  .then((value) => {
    console.log("Then:", value);
  });

//Explanation for Qusn 43  ==>
//Output: Caught: Error Finally 2 Then: Recovered
//The promise is rejected with "Error", which is caught in the catch() block.
//The catch() logs "Caught: Error" and returns "Recovered".
//The finally() block executes next, logging "Finally 2".
//Finally, the then() block logs "Then: Recovered" with the value returned from the catch() block.
//This demonstrates how promise chaining works with catch() and finally() in JavaScript.

//Qusn 44:
console.log("Qusn 44===>");

let e = { greeting: "Hey!" };
let f;

f = e;
e.greeting = "Hello";

console.log(e.greeting);
console.log(f.greeting);
//Explanation for Qusn 44  ==>
//Output: Hello Hello
//Both e and f reference the same object in memory.
//When e.greeting is updated, f.greeting reflects the change because they point to the same object.

//Qusn 45:
console.log("Qusn 45===>");

const obj2 = { value: 10 };

function calculate(add, multiply) {
  return (this.value + add) * multiply;
}

const newObj = { value: 20 };

console.log(calculate.call(obj2, 5, 2));
console.log(calculate.apply(newObj, [3, 4]));

const boundCalc = calculate.bind(obj2, 2);
console.log(boundCalc(3));

//Explanation for Qusn 45  ==>
//Output: 30 92 36
//Using call(), the function is invoked with obj2 as this, adding 5 to obj2.value (10) and multiplying by 2, resulting in 30.
//Using apply(), the function is invoked with newObj as this, adding 3 to newObj.value (20) and multiplying by 4, resulting in 92.
//Using bind(), the function is bound to obj2 with an initial argument of 2,
// and when called with 3, it adds 2 to obj2.value (10) and multiplies by 3, resulting in 36.

//Qusn 46:
console.log("Qusn 46===>");

const obj3 = {
  name: "John",
  getName: function () {
    return this.name;
  },
};

const bound1 = obj3.getName.bind({ name: "Frank" });
const bound2 = bound1.bind({ name: "Grace" });

console.log(bound1());
console.log(bound2());

//Explanation for Qusn 46  ==>
///Output: Frank Frank
/*
💡 Important Concept: .bind() is one-time effective
When you use .bind(), it returns a new function with this permanently set to the object you passed.

If you try to bind the result again, the new .bind() call has no effect.

i.e., Second .bind() is ignored — this is already bound and cannot be rebound.
*/

//Qusn 47:
console.log("Qusn 47===>");

const obj4 = Object.freeze({
  a: 1,
  b: { c: 2 },
});

obj4.b.c = 3;
obj4.d = 4;

console.log(obj4);

//Explanation for Qusn 47  ==>
//Output: { a: 1, b: { c: 3 } }
//Object.freeze() makes the object immutable, but it only applies to the top-level properties.
//You can still modify nested objects (like obj4.b.c), but you cannot add new properties (like obj4.d).
//So obj4 remains unchanged at the top level, but the nested property b.c is modified to 3.

//Qusn 48:
console.log("Qusn 48===>");

const userDetails = {
  firstName: "John",
  lastName: "Doe",
  age: 25,
  address: { city: "Bangalore", country: "USA" },
};

let cloneUserDetails = { ...userDetails };

//Updating original object
userDetails.age = 18;
userDetails.address.city = "chennai";

console.log(cloneUserDetails.age);
console.log(cloneUserDetails.address.city);

//Explanation for Qusn 48  ==>
//Output: 25 chennai
//The spread operator creates a shallow copy of the userDetails object.
//So cloneUserDetails.age remains 25 because it was copied before the original object was modified.
//However, cloneUserDetails.address.city is still "chennai" because the address object is a reference type, and changes to nested objects affect both copies.
//To create a deep copy, you would need to use a method like JSON.parse(JSON.stringify(userDetails)) or a library like Lodash's _.cloneDeep().

//Qusn 49:
console.log("Qusn 49===>");

const obj5 = {
  _value: 1,
  get value() {
    return this._value * 2;
  },
  set value(val) {
    this._value = val + 1;
  },
};

obj5.value = 5;
console.log(obj5.value);

//Explanation for Qusn 49  ==>
//Output: 12
//The setter method value(val) is called when you assign a value to obj5.value.
//It sets _value to val + 1, so obj5._value becomes 6 (5 + 1).
//The getter method value() returns this._value * 2, which is 6 * 2 = 12.
//So the final output is 12.

//Qusn 50:
console.log("Qusn 50===>");

function Animal() {
  this.species = "Animal";
}

Animal.prototype.getSpecies = function () {
  return this.species;
};

function Dog() {
  this.species = "Dog";
}

Dog.prototype = new Animal();

const dog = new Dog();
console.log(dog.getSpecies());

//Explanation for Qusn 50  ==>
//Output: Dog
//The Dog constructor sets this.species to "Dog", and Dog.prototype is set to an instance of Animal.
//When dog.getSpecies() is called, it looks up the prototype chain and finds the getSpecies method in Animal.prototype, which returns this.species.
//Since this refers to the dog instance, it returns "Dog".
//This demonstrates inheritance in JavaScript using prototypes.

//Qusn 51:
console.log("Qusn 51===>");

function A() {}
function B() {}

A.prototype = new B();

const a2 = new A();
console.log(a2 instanceof A);
console.log(a2 instanceof B);

//Explanation for Qusn 51  ==>
//Output: true true
//When you create an instance of A, it inherits from B because A.prototype is set to a new instance of B.
//So a instanceof A returns true because a is an instance of A.
//a instanceof B also returns true because a's prototype chain includes an instance of B.
//This demonstrates how prototype inheritance works in JavaScript.

//Qusn 52:
console.log("Qusn 52===>");

function Person(name) {
  this.name = name;
  return { name: "John" };
}

const person1 = new Person("Alice");
console.log(person1.name);

//Explanation for Qusn 52  ==>
//Output: John
//When a constructor explicitly returns an object, the returned object overrides this.
//In this case, the returned object { name: "John" } becomes the instance of Person.
//So person1.name is "John" instead of "Alice".

//Qusn 53:
console.log("Qusn 53===>");

function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  return "Hello, " + this.name;
};

function Employee(name, job) {
  Person.call(this, name); // Call the Person constructor
  this.job = job;
}

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.sayHello = function () {
  return "Hello, I am " + this.name + " and I work as a " + this.job;
};

const employee = new Employee("Alice", "Developer");
console.log(employee.sayHello());

//Explanation for Qusn 53:

//Output: Hello, I am Alice and I work as a Developer.
//The Employee constructor calls the Person constructor with the name parameter,
//so this.name is set to "Alice". The sayHello method in Employee.prototype
//overrides the one in Person.prototype, and it can access both this.name and this.job.

//Qusn 54:
console.log("Qusn 54===>");

console.log("10" - "4" + "2");
//Explanation for Qusn 54  ==>
//Output: 62
//In this expression, "10" - "4" is evaluated first.
//Since both operands are strings, JavaScript converts them to numbers and performs subtraction.
//So, 10 - 4 equals 6.
//Then, 6 + "2" is evaluated.
//Here, 6 is a number and "2" is a string, so JavaScript converts the number to a string and performs string concatenation.
//Thus, the final result is "62".

//Qusn 55:
console.log("Qusn 55===>");

console.log("5" + 3 - 2);
//Explanation for Qusn 55  ==>
//Output: 51
//In this expression, "5" + 3 is evaluated first.
//Since "5" is a string and 3 is a number, JavaScript converts the number to a string and performs string concatenation.
//So, "5" + 3 equals "53".
//Then, "53" - 2 is evaluated.
//Here, "53" is a string and 2 is a number, so JavaScript converts the string to a number and performs subtraction.
//Thus, the final result is 53 - 2 = 51.

//Qusn 56:
console.log("Qusn 56===>");

const { a: x5 = 10, b: y5 = 20 } = { a: undefined, b: null };

console.log(x5);
console.log(y5);

//Explanation for Qusn 56  ==>
//Output: 10 20
//a: x5 = 10 → Take property a from the object, rename it to x5, and if it’s undefined, use default 10.
//Here, a is undefined, so x5 becomes 10.
//b: y5 = 20 → Take property b from the object, rename it to y5, and if it’s undefined, use default 20.
//Here, b is null — and default values are only applied when the value is undefined, not when it’s null.
//So y5 becomes null.

//Qusn 57:
console.log("Qusn 57===>");

// asked in mindtree
console.log(NaN == NaN);

//Explanation for Qusn 57  ==>
//Output: false
//In JavaScript, NaN is not equal to anything, including itself.
//So, NaN == NaN returns false.

//Qusn 58:
console.log("Qusn 58===>");

const obj4a = {
  a: 1,
};

console.log(obj4a.hasOwnProperty("a"));
console.log(obj4a.hasOwnProperty("b"));

//Explanation for Qusn 58  ==>
//Output: true, false
//a is a direct property of obj so its true
//The hasOwnProperty method returns true if the object has the specified property as its own (not inherited) property.
//In this case, obj4 does not have a property "b", so it returns false.

//Qusn 59:
console.log("Qusn 59===>");

const obj5a = {
  a: 1,
  b: 2,
};

console.log(Object.keys(obj5a));
console.log(Object.values(obj5a));
console.log(Object.entries(obj5a));

//Explanation for Qusn 59  ==>
//Output: ["a", "b"] [1, 2] [["a", 1], ["b", 2]]
//Object.keys() returns an array of the object's own property names (keys).
//Object.values() returns an array of the object's own property values.
//Object.entries() returns an array of the object's own property [key, value] pairs.

//Qusn 60
console.log("Qusn 60===>");

const obj5b = {
  hasOwnProperty: function () {
    return "return!";
  },
  a: 1,
};

console.log(obj5b.hasOwnProperty("a"));

//Explanation for Qusn 60  ==>
//Output: return!
//the hasOwnProperty method is overridden in obj5, so it doesn't call the original Object.prototype.hasOwnProperty method

//Qusn 61:
console.log("Qusn 61===>");

const obj6 = { a: 1 };
const obj7 = Object.create(obj6);

console.log(obj7.__proto__ === obj6);

//Explanation for Qusn 61  ==>
//Output: true
//The __proto__ property of an object points to its prototype.
//In this case, obj7 is created with obj6 as its prototype, so obj7.__proto__ === obj6 is true.

//Qusn 62:
console.log("Qusn 62===>");

const obj8 = { a: 1, b: 2 };
delete obj8.a;
console.log(obj8.a);
console.log("a" in obj8);

//Explanation for Qusn 62  ==>
//Output: undefined, false
//The in operator checks if the property exists in the object or its prototype chain.
//In this case, 'a' is deleted from obj8, so it no longer exists in obj8 or its prototype chain.
//So obj8.a is undefined, and "a" in obj8 returns false.

//Qusn 63:
console.log("Qusn 63===>");

console.log(a8);
console.log(b8);
console.log(c8);

var a8 = 10;
let b8 = 20;
const c8 = 30;
