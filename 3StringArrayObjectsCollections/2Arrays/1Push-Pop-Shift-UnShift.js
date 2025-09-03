/*  
===========================================
📘 Array Methods: push, pop, shift, unshift
===========================================

🔹 THEORY  
Arrays in JavaScript are dynamic. You can easily add or remove elements.  
The methods `push`, `pop`, `shift`, and `unshift` help in managing arrays efficiently.  

1. push() → Adds one or more elements to the **end** of an array.  
   - Returns the new length of the array.  

2. pop() → Removes the **last** element from an array.  
   - Returns the removed element.  

3. shift() → Removes the **first** element from an array.  
   - Returns the removed element.  
   - All remaining elements are shifted left.  

4. unshift() → Adds one or more elements to the **beginning** of an array.  
   - Returns the new length of the array.  
   - All existing elements are shifted right.  

⚡ Performance:  
- `push` & `pop` → Fast (O(1))  
- `shift` & `unshift` → Slower (O(n)) because all elements need to be reindexed.  

===========================================
*/

// --------------------------------------------------
// 🔹 Example 1: push()
// --------------------------------------------------
let arr1 = [1, 2, 3];
let newLength1 = arr1.push(4, 5);
console.log(arr1); // [1, 2, 3, 4, 5]
console.log(newLength1); // 5

// --------------------------------------------------
// 🔹 Example 2: pop()
// --------------------------------------------------
let arr2 = [10, 20, 30];
let removedElement1 = arr2.pop();
console.log(arr2); // [10, 20]
console.log(removedElement1); // 30

// --------------------------------------------------
// 🔹 Example 3: shift()
// --------------------------------------------------
let arr3 = [100, 200, 300];
let removedElement2 = arr3.shift();
console.log(arr3); // [200, 300]
console.log(removedElement2); // 100

// --------------------------------------------------
// 🔹 Example 4: unshift()
// --------------------------------------------------
let arr4 = ["b", "c"];
let newLength2 = arr4.unshift("a", "z");
console.log(arr4); // ["a", "z", "b", "c"]
console.log(newLength2); // 4

// --------------------------------------------------
// 🔹 Example 5: Combination of methods
// --------------------------------------------------
let arr5 = [];
arr5.push("first"); // ["first"]
arr5.unshift("zero"); // ["zero", "first"]
arr5.push("second"); // ["zero", "first", "second"]
arr5.shift(); // removes "zero"
arr5.pop(); // removes "second"
console.log(arr5); // ["first"]

/*  
-----------------------------------------------------
❓ Q&A (Interview Style)
-----------------------------------------------------

Q1: Difference between push & unshift?  
👉 push → adds elements at end.  
👉 unshift → adds elements at beginning.  

Q2: Difference between pop & shift?  
👉 pop → removes from end.  
👉 shift → removes from beginning.  

Q3: Which are faster?  
👉 push & pop are faster (O(1)).  
👉 shift & unshift are slower (O(n)) because they reindex array elements.  

Q4: What do these methods return?  
👉 push & unshift → new length of array.  
👉 pop & shift → removed element.  

Q5: Can these methods be used on empty arrays?  
👉 Yes. pop() or shift() will just return `undefined`.  

-----------------------------------------------------
📊 QUICK REVISION
- push → add end → returns new length  
- pop → remove end → returns removed element  
- unshift → add beginning → returns new length  
- shift → remove beginning → returns removed element  
- Performance → push/pop = fast, shift/unshift = slow  
===========================================
*/
