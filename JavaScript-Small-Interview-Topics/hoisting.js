/*
Hoisting==>
Hoisting in javascript is a behavior in which a function or variable can we
used before declaration.
var is hoisted but let and const are not hoisted.
variable declared with let and const are hoisted, but they are not initialized.
Accessing them before the declaration results in a ReferenceError.
*/
//Example
//varaible hoisting with var

console.log(hoistedVar)
var hoistedVar = 'This variable is hoisted'
console.log(hoistedVar)

//function hoisting
hoistedFunction()

function hoistedFunction (){
    console.log('I am hoisted function')
}

//Variable hoisting with let and const

try {
    console.log(hoistedLet)
} catch (error) {
    console.log(error) 
}

let hoistedLet = 'This variable is hoisted with let'

try {
    console.log(hoistedConst)
} catch (error) {
    console.log(error) 
}

const hoistedConst = 'This variable is hoisted with const'

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

/*

1. What is hoisting in JavaScript?

Answer: Hoisting is a JavaScript behavior where variable and function 
declarations are moved to the top of their containing scope during 
the compilation phase. This means you can use variables and 
functions before they are declared in the code.

2. Are variables declared with let and const hoisted?
Answer: Yes, variables declared with let and const are hoisted, 
but they are not initialized. Accessing them before their declaration 
results in a ReferenceError due to the Temporal Dead Zone (TDZ).

3. What is the Temporal Dead Zone (TDZ)?

Answer: The Temporal Dead Zone (TDZ) is the period between 
the entering of the block where a variable is defined and 
the point where the variable is actually declared and initialized. 
During this period, accessing the variable will result in a ReferenceError.

4. What happens when you try to access a variable declared with var before its declaration?

Answer: When you try to access a variable declared with var before 
its declaration, it returns undefined because var declarations 
are hoisted and initialized with undefined.

5.What is the difference between hoisting of var and let/const?

Answer: Variables declared with var are hoisted and initialized 
with undefined, making them accessible before their declaration. 
Variables declared with let and const are hoisted but not initialized, 
resulting in a ReferenceError if accessed before their declaration 
due to the Temporal Dead Zone (TDZ).

6. Can function declarations be hoisted?
Answer: Yes, function declarations are hoisted to the top of their 
containing scope, and they are fully initialized. This means 
you can call a function before its declaration in the code.

7. What will be the output of the following code?
*/
console.log(hoistedVar);
var hoistedVar = 'This variable is hoisted';
console.log(hoistedVar);

/*
The first console.log prints undefined because hoistedVar is 
hoisted and initialized with undefined. The second console.log 
prints the assigned value.
*/

/*
8. What will be the output of the following code?
*/
try {
    console.log(hoistedLets);
} catch (error) {
    console.log(error);
}
let hoistedLets = 'This variable is hoisted with let';

/*
The hoistedLets variable is in the Temporal Dead Zone until 
its declaration and initialization, resulting in a ReferenceError.
*/

/*
9.What will be the output of the following code?
*/

hoistedFunction();
function hoistedFunction() {
    console.log('I am a hoisted function');
}

/*
Function declarations are hoisted and fully initialized, 
so you can call the function before its declaration.
*/

/*
10. Explain the difference between function declarations 
and function expressions in terms of hoisting.

Answer: Function declarations are hoisted and fully initialized, 
meaning you can call the function before its declaration. 
Function expressions, whether assigned to var, let, or const, 
are hoisted differently. The variable declaration is hoisted, 
but the assignment (the function definition) is not. 
This means you cannot call a function expression before its assignment.
*/

console.log(myFunction); // undefined
var myFunction = function() {
    console.log('This is a function expression');
};
myFunction(); // This works and logs "This is a function expression"

/*
In this example, myFunction is hoisted and initialized with undefined, 
so calling it before the assignment results in undefined.
*/


/*

hello()

const hello = ()=>{
    console.log('hello')
}

hello()

hello2()

function hello2(){
    console.log('hello 2');
}

hello2()

console.log(hello3)
console.log(hello3())

var hello3 = function (){
    console.log(3)
}

hello3()

*/