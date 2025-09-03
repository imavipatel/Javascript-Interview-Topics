/*  
=====================================================
📘 Bit Manipulation Intro + Find Max in Array (ES5)
=====================================================

🔹 THEORY (Easy Language)
- Bit manipulation means working with numbers at the binary level (0s and 1s).  
- Computers store numbers in binary, so bitwise operations are very fast.  
- Common bitwise operators in JS:  
  - &  (AND)  
  - |  (OR)  
  - ^  (XOR)  
  - ~  (NOT)  
  - << (Left shift)  
  - >> (Right shift)  

💡 Why learn it?  
- Helps in optimization, algorithm problems, and interview coding rounds.  
- Many tricks (like swapping without extra variable, checking even/odd, finding unique numbers) use bits.  

-----------------------------------------------------
1️⃣ Simple Max Element Problem
-----------------------------------------------------
We want to find the maximum element from an array.  
Normally we use `Math.max` or a loop.  
Here, we will use **bitwise trick**.

Idea:  
- Compare two numbers using subtraction and right shift.  
- Example: `(a - b) >> 31` gives `-1` if `a < b`, else `0`.  

-----------------------------------------------------
2️⃣ Max of Two Numbers using Bitwise
-----------------------------------------------------
*/
function getMax(a, b) {
  // Trick: if (a-b) >> 31 = -1, then b is greater, else a
  return a - ((a - b) & ((a - b) >> 31));
}

console.log(getMax(5, 9)); // 9
console.log(getMax(15, 7)); // 15

/*  
Explanation:
- (a - b) >> 31 → shifts sign bit to all 32 bits.
   If a < b → negative → -1 (all bits 1)
   If a >= b → 0
- (a - b) & -1 → keeps (a - b)
- Subtracting adjusts to pick the bigger number.
*/

/*  
-----------------------------------------------------
3️⃣ Find Max in Array using ES5 Loop
-----------------------------------------------------
*/
function findMax(arr) {
  var max = arr[0];
  for (var i = 1; i < arr.length; i++) {
    max = getMax(max, arr[i]);
  }
  return max;
}

console.log(findMax([3, 7, 2, 9, 5])); // 9
console.log(findMax([-10, -5, -20, -1])); // -1

/*  
-----------------------------------------------------
4️⃣ Compare with Normal ES5 Math.max
-----------------------------------------------------
*/
var arr = [3, 7, 2, 9, 5];
console.log(Math.max.apply(null, arr)); // 9

/*  
=====================================================
❓ Q&A (Interview Style)
=====================================================

Q1: What is bit manipulation?  
👉 Working directly with binary representation of numbers using operators like &, |, ^, <<, >>.  

Q2: Why use bit manipulation if Math.max exists?  
👉 In interviews/competitive coding, it’s asked to test low-level knowledge. Bit tricks can also be faster in some cases.  

Q3: How does `(a - b) >> 31` work?  
👉 It shifts the sign bit → gives `0` if positive, `-1` if negative.  

Q4: Can we use this method for arrays with negatives?  
👉 Yes, the method still works correctly.  

Q5: What’s the time complexity of finding max with loop?  
👉 O(n), because we compare each element once.  

=====================================================
📊 QUICK REVISION
=====================================================
- Bit manipulation = binary tricks (fast & low-level).  
- `(a - b) >> 31` → -1 if a<b else 0.  
- Max of 2 numbers without if/else.  
- Loop + bit trick → find max in array.  
- Alternative in ES5 → `Math.max.apply(null, arr)`.  
=====================================================
*/
