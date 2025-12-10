// ============================================================================
// 5) Event-Driven Architecture Basics
// ============================================================================

// -----------------------------------------------------------------------------
// Theory
// -----------------------------------------------------------------------------
// Event-Driven Architecture (EDA) is a programming paradigm where the flow
// of the program is determined by events such as user actions, messages, or
// system signals.

// Key concepts:
// 1) Event: an occurrence like click, input, or data received
// 2) Event emitter: a component that triggers events
// 3) Event listener: a function that responds to an event
// 4) Decoupling: producers and consumers of events are loosely coupled

// Benefits:
// - Improves modularity
// - Makes systems reactive and scalable
// - Useful in front-end (DOM events) and back-end (Node.js EventEmitter)

// -----------------------------------------------------------------------------
// Example 1: Basic Event Emitter in Node.js
// -----------------------------------------------------------------------------
const EventEmitter = require("events");
const emitter = new EventEmitter();

// Create a listener
emitter.on("orderPlaced", (orderId) => {
  console.log(`Order received: ${orderId}`);
});

// Trigger the event
emitter.emit("orderPlaced", 101);
// Output: Order received: 101

// -----------------------------------------------------------------------------
// Example 2: Event-Driven in Browser (DOM events)
// -----------------------------------------------------------------------------
const btn1 = document.getElementById("buyBtn");

btn1.addEventListener("click", () => {
  console.log("Buy button clicked!");
});

// Clicking the button triggers the event listener function

// -----------------------------------------------------------------------------
// Benefits of Event-Driven Architecture
// -----------------------------------------------------------------------------
// - Asynchronous handling → improves performance
// - Decouples components → easier maintenance
// - Scalable design → suitable for microservices and large apps
// - Reactive programming → responds to changes/events dynamically

// -----------------------------------------------------------------------------
// ❓ Q & A
// -----------------------------------------------------------------------------

// Q1) What is Event-Driven Architecture?
// 👉 A design pattern where events control program flow, and components react to events asynchronously.

// Q2) What is the difference between an event emitter and listener?
// 👉 Emitter triggers events; listener responds to those events.

// Q3) Why is EDA useful in JavaScript?
// 👉 JS is single-threaded; EDA allows async, non-blocking operations like user input, API calls, and real-time updates.

// Q4) Can Event-Driven Architecture be used on the backend?
// 👉 Yes, Node.js uses EventEmitter to handle async events, e.g., file I/O, network requests.

// Q5) Give a real-life example of EDA.
// 👉 Online shopping: placing an order triggers events like payment processing, inventory update, and shipping notification.
