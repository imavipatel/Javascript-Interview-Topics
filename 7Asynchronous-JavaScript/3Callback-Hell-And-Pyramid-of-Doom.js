// -----------------------------------------------------------------------------
// 3) Callback Hell & Pyramid of Doom
// -----------------------------------------------------------------------------
//
// -----------------------------------------------------------------------------
// Part 1: What are Callbacks?
// -----------------------------------------------------------------------------
//
// - A callback is a function passed as an argument to another function,
//   which is executed later (asynchronous tasks, event handling, etc.)
//
// Example:
function fetchData(callback) {
  setTimeout(() => {
    callback("✅ Data fetched");
  }, 1000);
}
fetchData((result) => console.log(result));

//
// Problem: When multiple async tasks depend on each other → nested callbacks!
// This leads to "Callback Hell".
//
// -----------------------------------------------------------------------------
// Part 2: Callback Hell
// -----------------------------------------------------------------------------
//
// - Callback Hell = deeply nested callbacks, making code hard to read, debug,
//   and maintain.
// - Often called the "Pyramid of Doom" due to triangular nested structure.
//
// Example:
setTimeout(() => {
  console.log("Step 1: User authenticated");
  setTimeout(() => {
    console.log("Step 2: User profile fetched");
    setTimeout(() => {
      console.log("Step 3: User orders fetched");
      setTimeout(() => {
        console.log("Step 4: Order details fetched");
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

// Output (after delays):
// Step 1: User authenticated
// Step 2: User profile fetched
// Step 3: User orders fetched
// Step 4: Order details fetched
//
// ❌ Problems with Callback Hell:
// - Hard to read (nested structure)
// - Hard to debug
// - Error handling is messy
// - Code not reusable
//
// -----------------------------------------------------------------------------
// Part 3: Pyramid of Doom (Visualization)
// -----------------------------------------------------------------------------
//
// Looks like this:
//
// function task1() {
//   task2(() => {
//     task3(() => {
//       task4(() => {
//         task5(() => {
//           // ... endless nesting
//         });
//       });
//     });
//   });
// }
//
// Code structure visually resembles a "pyramid" 🔺
//
// -----------------------------------------------------------------------------
// Part 4: Solving Callback Hell
// -----------------------------------------------------------------------------
//
// ✅ 1) Use Named Functions
// Instead of nesting anonymous functions, create named ones.
//
function step1() {
  console.log("Step 1");
  setTimeout(step2, 1000);
}
function step2() {
  console.log("Step 2");
  setTimeout(step3, 1000);
}
function step3() {
  console.log("Step 3");
}
setTimeout(step1, 1000);

//
// ✅ 2) Use Promises
// Promises flatten the nesting by using .then() chaining.
//
function fetchUser() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("User Authenticated"), 1000)
  );
}
function fetchProfile() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Profile Fetched"), 1000)
  );
}
function fetchOrders() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Orders Fetched"), 1000)
  );
}

// Chaining Promises
fetchUser()
  .then((res) => {
    console.log(res);
    return fetchProfile();
  })
  .then((res) => {
    console.log(res);
    return fetchOrders();
  })
  .then((res) => {
    console.log(res);
  });

//
// ✅ 3) Use Async/Await
// Makes async code look synchronous.
//
async function getUserDetails() {
  let user = await fetchUser();
  console.log(user);

  let profile = await fetchProfile();
  console.log(profile);

  let orders = await fetchOrders();
  console.log(orders);
}
getUserDetails();

// -----------------------------------------------------------------------------
// Part 5: ❓ Interview Q&A
// -----------------------------------------------------------------------------
//
// Q1) What is Callback Hell?
// 👉 A situation when multiple async tasks are nested inside callbacks,
//    creating unreadable "pyramid-shaped" code.
//
// Q2) Why is it bad?
// 👉 Hard to read, debug, maintain, and handle errors properly.
//
// Q3) How to avoid Callback Hell?
// 👉 Use named functions, Promises, Async/Await.
//
// Q4) What is Pyramid of Doom?
// 👉 The triangular shape of deeply nested callbacks.
//
// Q5) How do Promises/Async-Await solve callback hell?
// 👉 They flatten nested code into sequential, readable flow.
//
// -----------------------------------------------------------------------------
// ✅ Summary
// -----------------------------------------------------------------------------
// - Callbacks are useful, but too many → Callback Hell.
// - Callback Hell = Pyramid of Doom (deep nesting).
// - Solutions: Named functions, Promises, Async/Await.
//
