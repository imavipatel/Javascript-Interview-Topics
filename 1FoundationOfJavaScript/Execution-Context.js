/*

Everything in javascript happens inside the execution context.
It is a container inside which JS runs.
It is an abstract concept that holds information about the 
environment within which the current code is being executed

Execution Context =>

Memory(Memory Component) => Key:Value (Variable Environment)
Code(Code Component) => Thread of Execution

In the container the first component is memory component.
And the 2nd component is code component.

Memory component has all the variables and functions in key value pairs.
it is also called Variable Environment.

Code Component is a place where code is executed one line at a time.
it is also called the thread of execution.

JS is a synchronous, single-threaded language.

Synchronus - One command at a time
Single-threaded = In a specific synchronus order.

Types of Execution Context:

1. Global Execution Context: This is the default execution context. 
It is created when the JavaScript engine starts executing the code. 
There is only one global execution context per 

2. Function Execution Context: Created whenever a function is invoked. Each function has its own execution context.

3. Eval Execution Context: Created when code is executed inside an eval function.

Eval : The eval function in JavaScript is a built-in function 
that evaluates a string of JavaScript code in the context of 
the current execution environment

When eval is called, it creates a new execution context, 
known as the Eval Execution Context. This context is 
similar to the Global and Function Execution Contexts 
but is created specifically for the code being evaluated 
by eval.

Example :
*/

var x = 10;
var y = 20;

function testEval() {
    var z = 30;
    eval('var result = x + y + z;');
    console.log(result); // 60
}

testEval();




 
 
 
