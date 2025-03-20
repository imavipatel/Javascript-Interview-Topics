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