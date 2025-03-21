//Scope

/* 
Scope determines the accessibility of varaible object and functions.
In Javascript, a variable has 3 types of scope
1. block scope 2. function scope 3. global scope

*/

/*
1.Block Scope: Variables declared with let or const within 
a block (e.g., inside a {}) are only accessible within that block. 
This was introduced in ES6.

Example==>
*/

{
    let blockScopedVariable = "I'm only accessible within this block";
    console.log(blockScopedVariable); // This works
}

//console.log(blockScopedVariable); // ReferenceError: blockScopedVariable is not defined

/*
2. Function Scope: Variables declared with var, let, const inside a function are only accessible within that function.
*/

function myFunctionScope(){
    var functionScopedVariable =  "I'm only accessible within this function";
    console.log(functionScopedVariable); // This works
}

myFunctionScope();

//console.log(functionScopedVariable); // ReferenceError: functionScopedVariable is not defined

/*
3. Global Scope: Variables declared outside any function or block are accessible from anywhere in the code.
*/

// console.log(globalVariable); 

var globalVariable = "I'm accessible anywhere in the code";

function myGlobalScope() {
    console.log(globalVariable); // This works
}

myGlobalScope()


console.log(globalVariable); // This works

/*
Understanding scope is crucial for managing variable accessibility and avoiding potential issues such as variable collisions and unintended side effects.
*/

/*

Temporal Dead Zone : The Temporal Dead Zone refers to the period where a variable 
exists in a scope but cannot be accessed until it is initialized. 
The TDZ starts from the beginning of the block until the variable 
is declared and initialized. It primarily affects variables 
declared with let and const, unlike var, which is hoisted and 
accessible (as undefined) throughout the function scope.

Example:
*/

console.log(myLet); // ReferenceError: Cannot access 'myVar' before initialization
let myLet = "Hello, World!";
console.log(myLet); // This works and logs "Hello, World!"

//Comparison with var

console.log(myVar); // undefined
var myVar = "Hello, World!";
console.log(myVar); // This works and logs "Hello, World!"

{
    // TDZ starts here
    console.log(myVar); // ReferenceError: Cannot access 'myVar' before initialization
    let myVar = "Hello, World!";
    // TDZ ends here
    console.log(myVar); // This works and logs "Hello, World!"
}

/*
Key Points:=>

1. The TDZ applies to variables declared with let and const.
2. Accessing a variable in the TDZ results in a ReferenceError.
3. The TDZ starts at the beginning of the block and ends when the variable is declared and initialized.
4. Variables declared with var do not have a TDZ and are initialized with undefined.
*/