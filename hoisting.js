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
