/* 
-----------------------------------------------------------
7) Type Coercion vs Type Conversion
-----------------------------------------------------------
- Type Conversion → explicit (you convert yourself)
- Type Coercion → implicit (JS converts automatically)
*/

console.log("5" + 2); // "52" (string concatenation → coercion)
console.log("5" - 2); // 3   (string converted to number)

let numStr = "123";
console.log(Number(numStr)); // 123 (explicit conversion)
console.log(String(123)); // "123"
