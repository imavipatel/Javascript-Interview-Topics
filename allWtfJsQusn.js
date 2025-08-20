//2010 02 12 foonanny

console.log("foo" + +"bar");
console.log("foo" + +"10");
console.log("foo" + +10);
console.log("foo" + -"bar");
console.log("foo" + !!"bar");
console.log("foo" + +"bar" === "fooNan");
console.log("foo" + +"bar" === "fooNaN");

//2010 02 12 function context fun
// console.log((x=[].reverse)())
// console.log((x=[].reverse)()=== window)
// console.log(window)

//2010 02 12 maths fun

console.log(typeof NaN);
console.log(typeof NaN === "number");
console.log(typeof Infinity);
console.log(typeof Infinity === "number");
console.log(typeof -Infinity);
console.log(typeof -Infinity === "number");
console.log(Infinity == 1 / 0);
console.log(Infinity === 1 / 0);

console.log(0.1 + 0.2);
console.log(0.3);
console.log(0.1 + 0.2 === 0.3);

//2010 02 12 min number treachery

console.log(Number.MIN_VALUE);
console.log(Number.MIN_VALUE > 0);
console.log(Number.MIN_VALUE < 0);
console.log(Number.MIN_VALUE > -1);
console.log(Number.MIN_VALUE < -1);
console.log(Number.MIN_VALUE === 0);
console.log(Number.MIN_VALUE === -1);
console.log(Number.MIN_VALUE === -0);

//2010 02 12 number fun // not a number is number

console.log("this is NaN part");
console.log(typeof NaN);
console.log(NaN);

//not a number is not a number
console.log(NaN == NaN);
console.log(NaN === NaN);
console.log(Infinity === Infinity);
console.log(null === null);
console.log(undefined === undefined);
console.log(0 === 0);
console.log(1 + undefined);
console.log(1 + null);
console.log(1 + NaN);
console.log(1 + Infinity);

//2010 02 12 null is not an object

console.log(typeof null);
console.log(null == null);
console.log(null instanceof Object);

// 2010 02 12 parseint treachery
console.log("parsing number");
console.log(parseInt(0.5));
console.log(parseInt(0.05));
console.log(parseInt("06"));
console.log(parseInt("09"));
console.log(parseInt("09.9"));
console.log(parseInt("08"));

//2010 02 13 null is not falsy

console.log("comparing null with false");
console.log(null == false);
console.log(null == true);
console.log(null === 0);
console.log(null === 1);
console.log(null === undefined);
/* Type coercion attempt to convert the oprands to the same type before making the comparison.
tries to convert array to primitive value. For an empty array this conversion results in
an empty string. An empty string is falsy. So, [] == false is true. 
empty string '' is coerced to number which result to 0 the boolean */

console.log([] == false);
console.log([] == true);
console.log({} == false);
console.log({} == true);
console.log("" == false);
console.log("" == true);
console.log(0 == false);
console.log(0 == true);
console.log(1 == false);
console.log(1 == true);

// 2010 02 13 string is not string

console.log("comparing string with string");
console.log("string" == "string");
console.log("string" instanceof String);
/* 'string' is a primitive value, not an object.
instanceof operator checks if the object is an instance of a specific object type.
String is an object type. 'string' is a primitive value. */

//2010 02 15 accidental global
// (function(){
//     var x=y=1;
// })();

// console.log(x)
// console.log(y)

//2010 02 15 careful

console.log([] == ![]);
/* 
empty array truthy than ! this make false
empty[] == false 
false become zero
when object compared to number js convert the object to primitve value
empty [] convert to empty string ''
empty string coerced to number 0

so 0==0 true
*/

//2010 02 15 coerce equality

console.log(3 == "3");
console.log(3 === "3");

console.log(3 != "3");
console.log(3 !== "3");
console.log(3 != 3);
console.log(3 !== 3);

console.log("milk".length == "meat".length);
console.log("python".length == "jargon".length);

//2010 02 15 firebug reserved

var console = {};
