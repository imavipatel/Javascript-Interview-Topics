//Closure
/* Closure means in Javascript that an inner function always has 
access to the variable of it outer function even after the outer function has returned.
1. It has access to its own scope( variable defined between its curly brackets);
2. It has access to its outer functions variables
3, It has access to the global variables.

Example====>
*/

let globalVariable = 'I am global variable'

function outerFunction(){
    let outerVariable = 'I am outer function variable'
    function innerFunction(){
        let innerVariable ='I am inner function variable'

        console.log(outerVariable);
        console.log(innerVariable)
        console.log(globalVariable)
        console.log(lowerGlobalVariable)
    }
    return innerFunction()
}

let lowerGlobalVariable = 'I am lower global variable'

outerFunction()

/*
Use of Closure==>
1. Data Privacy and Encapsulation
*/