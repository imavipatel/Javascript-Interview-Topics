/*  
=====================================================
📘 Destructuring Assignment in Array
=====================================================

🔹 THEORY (Easy Language)  
- "Destructuring" means breaking down an array into smaller parts (variables).  
- Instead of accessing elements one by one with indexes, we can directly assign them.  
- It makes code cleaner and easier to read.  

✅ Syntax:  
let [a, b] = [1, 2];  // a=1, b=2  

We can:  
1. Extract values into variables.  
2. Skip unwanted values.  
3. Use default values if item is missing.  
4. Work with nested arrays.  
5. Swap variables easily.  

-----------------------------------------------------
1️⃣ BASIC EXAMPLE
-----------------------------------------------------
*/
let numbers = [10, 20, 30];
let [first, second, third] = numbers;

console.log(first); // 10
console.log(second); // 20
console.log(third); // 30

/*  
-----------------------------------------------------
2️⃣ SKIPPING VALUES
-----------------------------------------------------
*/
let arr = [1, 2, 3, 4];
let [x, , y] = arr; // skip 2nd element
console.log(x, y); // 1 3

/*  
-----------------------------------------------------
3️⃣ DEFAULT VALUES
-----------------------------------------------------
*/
let fruits = ["apple"];
let [fruit1, fruit2 = "banana"] = fruits;
console.log(fruit1); // apple
console.log(fruit2); // banana (default used)

/*  
-----------------------------------------------------
4️⃣ NESTED ARRAYS
-----------------------------------------------------
*/
let nested = [1, [2, 3]];
let [a, [b, c]] = nested;
console.log(a); // 1
console.log(b); // 2
console.log(c); // 3

/*  
-----------------------------------------------------
5️⃣ SWAPPING VARIABLES
-----------------------------------------------------
*/
let p = 5,
  q = 10;
[p, q] = [q, p]; // swap values
console.log(p, q); // 10 5

/*  
-----------------------------------------------------
6️⃣ REST OPERATOR WITH DESTRUCTURING
-----------------------------------------------------
*/
let colors = ["red", "green", "blue", "yellow"];
let [main, ...others] = colors;
console.log(main); // red
console.log(others); // ["green","blue","yellow"]

/*  
-----------------------------------------------------
7️⃣ USING IN FUNCTIONS
-----------------------------------------------------
*/
function getCoordinates() {
  return [40, 50];
}
let [lat, lon] = getCoordinates();
console.log(lat, lon); // 40 50

/*  
=====================================================
❓ Q&A (Interview Style)
=====================================================

Q1: What is array destructuring?  
👉 A way to unpack values from an array into variables.  

Q2: How to skip values while destructuring?  
👉 Use commas: `[a, , b] = [1,2,3]` → a=1, b=3.  

Q3: What happens if values are missing?  
👉 You can use defaults: `[a=10] = []` → a=10.  

Q4: Can we use destructuring for swapping?  
👉 Yes: `[a,b] = [b,a]`.  

Q5: What’s the use of `...rest` in destructuring?  
👉 Collects remaining items into an array.  

=====================================================
📊 QUICK REVISION
=====================================================
- `[a,b] = [1,2]` → assigns values directly.  
- Skipping: `[x,,y]`.  
- Defaults: `[a=5]`.  
- Nested: `[a,[b,c]]`.  
- Swap: `[a,b] = [b,a]`.  
- Rest: `[first,...rest]`.  
=====================================================
*/
