/*  
=====================================================
📘 mapLimit() Concurrency in JavaScript
=====================================================

🔹 THEORY

1. What is mapLimit?
- `mapLimit()` is a concurrency control pattern.
- It allows you to process a list of items (like `Array.map`) but limits how many tasks run **in parallel**.
- Useful when working with async tasks (e.g., API calls, DB queries, file reads).

2. Why use it?
- Running all async tasks in parallel can overwhelm memory, CPU, or external services.
- Running them sequentially is safe but slow.
- `mapLimit` provides a **balance** → at most `N` tasks run concurrently, and when one finishes, the next starts.

3. Real-world use cases:
- Processing large sets of files.
- API rate limiting.
- Batch processing (e.g., upload/download with concurrency cap).

-----------------------------------------------------
⭐ QUICK SUMMARY
- mapLimit = `map()` but with a concurrency limit.
- Improves performance + prevents overload.
=====================================================
*/

// --------------------------------------------------
// 🔹 Example 1: mapLimit Implementation
// --------------------------------------------------
function mapLimit(arr, limit, asyncFn) {
  let index = 0; // track next task
  let active = 0; // active running tasks
  let results = []; // store results

  return new Promise((resolve, reject) => {
    function runNext() {
      // If all tasks finished → resolve
      if (index === arr.length && active === 0) {
        resolve(results);
        return;
      }

      // If limit reached or no more tasks → return
      while (active < limit && index < arr.length) {
        const currentIndex = index++;
        const item = arr[currentIndex];
        active++;

        asyncFn(item)
          .then((res) => {
            results[currentIndex] = res;
          })
          .catch(reject)
          .finally(() => {
            active--;
            runNext(); // Start next when one finishes
          });
      }
    }

    runNext();
  });
}

// --------------------------------------------------
// 🔹 Example 2: Usage
// --------------------------------------------------
function mockApiCall(id) {
  return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * 2000) + 500;
    setTimeout(() => {
      console.log(`✅ Finished task ${id} (delay ${delay}ms)`);
      resolve(`Result ${id}`);
    }, delay);
  });
}

const tasks = [1, 2, 3, 4, 5, 6];

// Run with concurrency limit = 2
mapLimit(tasks, 2, mockApiCall).then((results) => {
  console.log("All Results:", results);
});

/*  
Output (order may vary):
✅ Finished task 1 (delay 500ms)
✅ Finished task 2 (delay 1500ms)
✅ Finished task 3 (delay 800ms)
✅ Finished task 4 (delay 1200ms)
✅ Finished task 5 (delay 700ms)
✅ Finished task 6 (delay 1000ms)
All Results: [ 'Result 1', 'Result 2', 'Result 3', 'Result 4', 'Result 5', 'Result 6' ]
*/

// --------------------------------------------------
// 🔹 Example 3: Real-World API Fetch with Limit
// --------------------------------------------------
async function fetchData(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const data = await response.json();
  console.log(`Fetched Post ${id}`);
  return data.title;
}

mapLimit([1, 2, 3, 4, 5], 2, fetchData).then((titles) => {
  console.log("Fetched Titles:", titles);
});

/*  
-----------------------------------------------------
❓ Q&A (Interview Style)
-----------------------------------------------------

Q1: Why not use Promise.all() instead of mapLimit?  
👉 `Promise.all()` runs everything in parallel → might overload system.  
   `mapLimit` controls concurrency.

Q2: How does mapLimit improve performance?  
👉 It ensures only `limit` number of tasks run at a time → prevents crashes and throttling.

Q3: Can mapLimit preserve order of results?  
👉 Yes ✅ we store results by `index`.

Q4: Where is mapLimit commonly used?  
👉 - API rate limiting  
   - Large file processing  
   - Batch operations in servers  

Q5: Can we use libraries instead of writing our own?  
👉 Yes → `async` library in Node.js provides `mapLimit`.  

*/
