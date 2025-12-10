// ============================================================================
// 3) Event Handling: Bubbling, Capturing, Delegation, Emitter
// ============================================================================
//
// 👉 What are events?
// Events are actions that happen in the browser (click, keypress, scroll, etc.).
// We use JavaScript to "listen" and "react" to them using event listeners.
//
// Example HTML (for explanation):
// <div id="parent">
//   <button id="child">Click Me</button>
// </div>
//
// ============================================================================
// 📌 1) Event Bubbling
// ----------------------------------------------------------------------------
// - By default, events move UP from the target element to its parents.
// - Example: Clicking button → fires on button → then parent → then body → etc.
//
let child = document.getElementById("child");
let parent = document.getElementById("parent");

child.addEventListener("click", () => {
  console.log("Button clicked!"); // fires first
});

parent.addEventListener("click", () => {
  console.log("Parent div clicked!"); // fires second
});
//
// Order: Button → Parent (bubbling up)
//
// ============================================================================
// 📌 2) Event Capturing (Trickling)
// ----------------------------------------------------------------------------
// - Opposite of bubbling: event travels DOWN from root → target.
// - To enable capturing, pass { capture: true } in addEventListener.
//
parent.addEventListener(
  "click",
  () => {
    console.log("Parent capturing!");
  },
  { capture: true }
);

child.addEventListener("click", () => {
  console.log("Child clicked!");
});
//
// Order with capturing: Parent (capturing) → Child
//
// ============================================================================
// 📌 3) Event Delegation
// ----------------------------------------------------------------------------
// - Instead of adding event listeners to many children,
//   we add ONE listener to the parent and check the target.
// - Useful when dynamically adding/removing elements.
//
parent.addEventListener("click", (e) => {
  if (e.target && e.target.id === "child") {
    console.log("Delegated: Button clicked!");
  }
});
//
// Advantage: Better performance (fewer listeners), works for dynamic elements.
//
// ============================================================================
// 📌 4) Event Emitter (Custom Events)
// ----------------------------------------------------------------------------
// - We can create our own events and trigger them.
//
// Example: custom "hello" event
let myDiv = document.createElement("div");

myDiv.addEventListener("hello", (e) => {
  console.log("Hello event received:", e.detail);
});

// Dispatch custom event
let event1 = new CustomEvent("hello", { detail: { name: "Avi" } });
myDiv.dispatchEvent(event1);
// Output: Hello event received: { name: "Avi" }
//
// ============================================================================
// ✅ Q&A Section
// ----------------------------------------------------------------------------
//
// Q1) What is event bubbling?
// 👉 Event goes from child → parent → ancestors.
//
// Q2) What is event capturing?
// 👉 Event goes from parent → child (top to bottom).
//
// Q3) Which phase runs by default?
// 👉 Bubbling phase (unless you set { capture: true }).
//
// Q4) What is event delegation and why use it?
// 👉 Attach one listener on parent → handle many children.
//    Benefits: performance + dynamic element handling.
//
// Q5) What is an Event Emitter?
// 👉 A way to create and trigger custom events in JS.
//
// Q6) How to stop bubbling?
// 👉 Use event.stopPropagation().
//
// Example:
// child.addEventListener("click", (e) => {
//   e.stopPropagation(); // Prevents event going to parent
// });
//
// ============================================================================
// ✅ Recap
// ----------------------------------------------------------------------------
// - Bubbling → child → parent → body
// - Capturing → parent → child
// - Delegation → one parent listener for many children
// - Emitter → create/trigger your own events
// ============================================================================
