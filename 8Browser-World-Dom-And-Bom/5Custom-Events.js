// ============================================================================
// 5) Custom Events
// ============================================================================
//
// 📌 What are Custom Events?
// - Built-in way to create your own events in JavaScript
// - Useful for communication between components or DOM elements
// - Created using `new CustomEvent()` and dispatched with `.dispatchEvent()`
// -----------------------------------------------------------------------------

// --------------------------
// Basic Custom Event Example
// --------------------------

// 1) Create a custom event
let greetEvent = new CustomEvent("greet", {
  detail: { name: "Avi", msg: "Hello 👋" },
});

// 2) Listen for it
document.addEventListener("greet", (e) => {
  console.log("Custom Event Triggered!");
  console.log("Data:", e.detail); // { name: "Avi", msg: "Hello 👋" }
});

// 3) Dispatch it
document.dispatchEvent(greetEvent);

// Output:
// Custom Event Triggered!
// Data: { name: "Avi", msg: "Hello 👋" }

// -----------------------------------------------------------------------------

// --------------------------
// Custom Event with Bubbling
// --------------------------
//
// HTML structure assumed:
// <div id="parent">
//   <button id="child">Click Me</button>
// </div>

let parent2 = document.getElementById("parent");
let child2 = document.getElementById("child");

// Parent listens for custom event
parent2.addEventListener("notifyParent", (e) => {
  console.log("✅ Parent received custom event from child!");
  console.log("Data from child:", e.detail);

  // Stop further bubbling
  e.stopPropagation();
});

// Root document also listens
document.addEventListener("notifyParent", () => {
  console.log("🌍 Document also got the event!");
});

// Child dispatches the custom event
child2.addEventListener("click", () => {
  let customEvent = new CustomEvent("notifyParent", {
    detail: { msg: "Hello from child 👶" },
    bubbles: true, // allow bubbling up
  });

  child.dispatchEvent(customEvent);
});

// Output when button clicked:
// ✅ Parent received custom event from child!
// Data from child: { msg: "Hello from child 👶" }
// (Document won’t log because stopPropagation stopped it)
//
// If we remove e.stopPropagation() in parent handler, output will also include:
// 🌍 Document also got the event!

// -----------------------------------------------------------------------------

// ✅ Q&A Section
// -----------------------------------------------------------------------------

// Q1) Why use custom events?
// 👉 To make code modular and let elements/components talk without direct calls.
//
// Q2) Why use bubbling in custom events?
// 👉 Lets child → parent → document communication naturally happen.
//
// Q3) What does e.stopPropagation() do?
// 👉 Stops the event from continuing up the DOM tree.
//
// Q4) Can we pass data in custom events?
// 👉 Yes, via the `detail` property.
//
// -----------------------------------------------------------------------------

// ✅ Recap
// -----------------------------------------------------------------------------

// - Use `new CustomEvent(eventName, { detail, bubbles })` to create events
// - Dispatch with `.dispatchEvent()`
// - Listen with `.addEventListener()`
// - Bubbling lets events travel up DOM tree
// - stopPropagation() halts event flow
// - Great for modular, reusable, component-based code
// ============================================================================
