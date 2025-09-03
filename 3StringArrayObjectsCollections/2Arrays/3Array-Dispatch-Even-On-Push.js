/*  
=====================================================
📘 Array Dispatch Event on push
=====================================================

🔹 THEORY (Simple Language)  
Normally, JavaScript arrays do not "notify" us when new items are added.  
If we want to **listen for array changes (like push)**, we must create a wrapper or use Proxy.  

👉 Two common ways:  
1. **Override array methods** (push, pop, etc.) to dispatch an event.  
2. **Use Proxy** to intercept array operations (more powerful).  

This helps in cases like:
- UI re-rendering when data changes  
- Logging / debugging  
- Implementing "reactive" data like Vue/React internals  

-----------------------------------------------------
1️⃣ METHOD 1: Override push()
-----------------------------------------------------
*/
let arr = [];
// Save original push
let oldPush = arr.push;

// Override push
arr.push = function (...items) {
  console.log("Event: Items pushed →", items);
  return oldPush.apply(this, items); // call original push
};

arr.push(10); // Event: Items pushed → [10]
arr.push(20, 30); // Event: Items pushed → [20, 30]
console.log(arr); // [10, 20, 30]

/*  
-----------------------------------------------------
2️⃣ METHOD 2: Using Proxy (Better)
-----------------------------------------------------
*/
function createObservableArray() {
  let internalArray = [];
  return new Proxy(internalArray, {
    get(target, prop) {
      if (prop === "push") {
        return function (...items) {
          console.log("Event: Items pushed →", items);
          return Array.prototype.push.apply(target, items);
        };
      }
      return target[prop];
    },
  });
}

let arr2 = createObservableArray();
arr2.push("A"); // Event: Items pushed → ["A"]
arr2.push("B", "C"); // Event: Items pushed → ["B","C"]
console.log(arr2); // ["A","B","C"]

/*  
-----------------------------------------------------
3️⃣ METHOD 3: Custom Event Dispatch
-----------------------------------------------------
*/
class ObservableArray extends Array {
  push(...items) {
    super.push(...items);
    let event = new CustomEvent("arrayPush", { detail: items });
    document.dispatchEvent(event);
    return this.length;
  }
}

let arr3 = new ObservableArray();
document.addEventListener("arrayPush", (e) => {
  console.log("Array push detected:", e.detail);
});
arr3.push(100); // Array push detected: [100]
arr3.push(200, 300); // Array push detected: [200, 300]

/*  
=====================================================
❓ Q&A (Interview Style)
=====================================================

Q1: Why do we need "dispatch on push"?  
👉 To make arrays reactive (UI updates, logging, syncing with server).  

Q2: Which method is best?  
👉 Proxy is best (handles all methods, not just push).  

Q3: What’s the drawback of overriding push()?  
👉 Only push is tracked, other methods (pop, splice) won’t be tracked.  

Q4: Can we integrate with browser events?  
👉 Yes → use CustomEvent to broadcast globally.  

Q5: How do frameworks handle this internally?  
👉 Vue.js (v2) used Object.defineProperty to track changes,  
   Vue3 uses Proxy for reactivity.  

=====================================================
📊 QUICK REVISION
=====================================================
- Override push → Simple, works only for push.  
- Proxy → Powerful, intercepts all array operations.  
- CustomEvent → Lets arrays talk to the DOM event system.  
=====================================================
*/
