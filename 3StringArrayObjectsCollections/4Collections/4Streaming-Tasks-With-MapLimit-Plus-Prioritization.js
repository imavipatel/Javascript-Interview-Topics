/*  
=====================================================
📘 Streaming Tasks with mapLimit (Concurrency Control)
=====================================================

🔹 THEORY

1. What is `mapLimit`?
- `mapLimit` is a concurrency control function (commonly from `async` library in Node.js).
- It allows you to **process a list of tasks with a limit on how many run in parallel**.

2. Why do we need it?
- Running too many tasks at once (API calls, DB queries, file reads) can overload memory/CPU.
- Running them one by one is too slow.
- `mapLimit` gives a balance → process in parallel, but with a limit.

3. Key Features:
- Takes:
  - An array of items
  - A concurrency limit
  - An async worker function
- Ensures only "limit" number of tasks run at the same time.
- Moves to next tasks only when one finishes.
- Useful for **streaming, throttling, rate-limiting, and prioritization**.

-----------------------------------------------------
⭐ QUICK SUMMARY
- `mapLimit` = Run multiple async tasks in parallel but limit concurrency.
- Good for APIs, file processing, streaming jobs, etc.
=====================================================
*/

// --------------------------------------------------
// 🔹 Example 1: Using async.mapLimit (Node.js async library)
// --------------------------------------------------

import async from "async";

const tasks = [1, 2, 3, 4, 5, 6, 7, 8, 9];

async.mapLimit(
  tasks,
  3, // concurrency limit → run 3 tasks at once
  async (task) => {
    console.log(`Starting task ${task}`);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate work
    console.log(`Finished task ${task}`);
    return task * 2;
  },
  (err, results) => {
    if (err) throw err;
    console.log("All results:", results);
  }
);

/*  
Output:
Starting task 1
Starting task 2
Starting task 3
Finished task 1
Starting task 4
Finished task 2
Starting task 5
Finished task 3
Starting task 6
...
All results: [2, 4, 6, 8, 10, 12, 14, 16, 18]
*/

// --------------------------------------------------
// 🔹 Example 2: Custom mapLimit Implementation (no library)
// --------------------------------------------------
async function mapLimitCustom(tasks, limit, worker) {
  const results = [];
  let i = 0;

  async function run() {
    while (i < tasks.length) {
      const index = i++;
      results[index] = await worker(tasks[index]);
    }
  }

  // Run only "limit" workers in parallel
  await Promise.all(Array.from({ length: limit }, run));
  return results;
}

// Usage
(async () => {
  const results = await mapLimitCustom(
    [1, 2, 3, 4, 5],
    2, // limit concurrency to 2
    async (num) => {
      console.log(`Processing ${num}`);
      await new Promise((res) => setTimeout(res, 1000));
      return num * 10;
    }
  );
  console.log("Results:", results);
})();

/*  
Output:
Processing 1
Processing 2
Processing 3
Processing 4
Processing 5
Results: [10, 20, 30, 40, 50]
*/

// --------------------------------------------------
// 🔹 Example 3: Streaming Tasks with Prioritization
// --------------------------------------------------
async function streamWithPriority(tasks, limit) {
  // Sort tasks by priority
  tasks.sort((a, b) => b.priority - a.priority);

  return await mapLimitCustom(tasks, limit, async (task) => {
    console.log(`Executing: ${task.name} (priority: ${task.priority})`);
    await new Promise((res) => setTimeout(res, 1000));
    return task.name;
  });
}

// Usage
(async () => {
  const tasks = [
    { name: "Task A", priority: 2 },
    { name: "Task B", priority: 1 },
    { name: "Task C", priority: 3 },
    { name: "Task D", priority: 5 },
    { name: "Task E", priority: 4 },
  ];

  const results = await streamWithPriority(tasks, 2);
  console.log("Execution Order:", results);
})();

/*  
Output:
Executing: Task D (priority: 5)
Executing: Task E (priority: 4)
Executing: Task C (priority: 3)
Executing: Task A (priority: 2)
Executing: Task B (priority: 1)

Execution Order: [ 'Task D', 'Task E', 'Task C', 'Task A', 'Task B' ]
*/

/*  
=====================================================
📘 Task Queues & Rate Limiting
=====================================================

🔹 THEORY

1. What are Task Queues?
- A **queue system** to schedule async tasks.
- Prevents running everything at once → keeps system stable.
- Executes tasks in order (FIFO) with controlled delay.

2. What is Rate Limiting?
- Restricts **how often tasks run in a given timeframe**.
- Common in APIs (e.g., "Max 100 requests per minute").
- Prevents hitting server limits and avoids bans.

3. Techniques:
- `setTimeout` → Delay tasks to simulate throttling.
- `Promise.allSettled` → Run all tasks safely, collect results/errors.
- Used in messaging systems, APIs, streaming, job queues.

-----------------------------------------------------
⭐ QUICK SUMMARY
- Task Queue = Orderly execution of tasks.
- Rate Limiting = Restrict frequency of execution.
=====================================================
*/

// --------------------------------------------------
// 🔹 Example 4: Simple Task Queue with setTimeout
// --------------------------------------------------
function taskQueue(tasks, delay) {
  tasks.forEach((task, index) => {
    setTimeout(() => {
      console.log(`Executing task: ${task}`);
    }, index * delay);
  });
}

taskQueue(["T1", "T2", "T3", "T4"], 1000);

/*  
Output:
Executing task: T1  (after 1s)
Executing task: T2  (after 2s)
Executing task: T3  (after 3s)
Executing task: T4  (after 4s)
*/

// --------------------------------------------------
// 🔹 Example 5: Rate Limiting API Calls
// --------------------------------------------------
async function fakeApiCall(id) {
  console.log(`Calling API ${id}`);
  await new Promise((res) => setTimeout(res, 500));
  return `Response ${id}`;
}

async function rateLimitedCalls() {
  const tasks = Array.from({ length: 5 }, (_, i) => i + 1);

  // Run only 2 calls every second
  for (let i = 0; i < tasks.length; i += 2) {
    const chunk = tasks.slice(i, i + 2);
    const results = await Promise.allSettled(
      chunk.map((id) => fakeApiCall(id))
    );
    console.log("Batch Results:", results);
    await new Promise((res) => setTimeout(res, 1000));
  }
}

rateLimitedCalls();

/*  
Output:
Calling API 1
Calling API 2
Batch Results: [ { status: 'fulfilled', value: 'Response 1' }, { status: 'fulfilled', value: 'Response 2' } ]
Calling API 3
Calling API 4
Batch Results: [...]
Calling API 5
Batch Results: [...]
*/

/*  
-----------------------------------------------------
❓ Q&A (Interview Style)
-----------------------------------------------------

Q1: What problem does `mapLimit` solve?  
👉 It controls concurrency → prevents system overload while keeping good speed.  

Q2: How is it different from `map` and `forEach`?  
👉 - `map`/`forEach` runs sequentially or uncontrolled parallel.  
   - `mapLimit` ensures only "n" tasks run at once.  

Q3: Real-world use cases?  
👉 - Making multiple API calls (but avoid hitting rate limits).  
   - Processing large files in batches.  
   - Streaming tasks (video encoding, log processing).  
   - Job queues with prioritization.  

Q4: How to add prioritization?  
👉 Sort tasks by priority before processing. High-priority jobs execute first.  

Q5: What are Task Queues?  
👉 A system where tasks are executed in order (FIFO) with delay or limit.  

Q6: What is Rate Limiting?  
👉 Restricting how often tasks can be executed (e.g., APIs per second).  

Q7: Why use `Promise.allSettled` in queues?  
👉 It ensures both successful and failed results are collected → no crash on error.  

Q8: Complexity?  
👉 Time = O(n), Memory = O(limit) for mapLimit, O(n) for queue.  

-----------------------------------------------------
📊 Comparison Table (Quick Revision)
-----------------------------------------------------

| Feature            | mapLimit                         | Task Queue                          | Rate Limiting                          |
|--------------------|----------------------------------|-------------------------------------|----------------------------------------|
| Purpose            | Limit parallel async tasks       | Execute tasks in order (FIFO)       | Restrict frequency of execution        |
| Control            | Concurrency (how many at once)   | Execution order (one by one/delay)  | Time-based restriction (per second/min)|
| Best For           | APIs, file processing, streaming | Messaging, job scheduling           | API calls, avoiding server overload    |
| Implementation     | async.mapLimit / custom loop     | setTimeout loop                     | setTimeout + batching (Promise)        |
| Example            | Run 3 APIs at once               | Run tasks every 1s                  | Run only 2 calls/sec                   |

=====================================================
*/
