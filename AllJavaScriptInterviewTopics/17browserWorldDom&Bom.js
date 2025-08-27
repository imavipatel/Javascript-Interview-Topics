// ============================================================================
// 📘 Browser World – Full Notes
// ============================================================================
//
// Topics covered:
// 1) DOM & BOM
// 2) DOM methods, find/match elements
// 3) Event Handling: bubbling, capturing, delegation, emitter
// 4) event.stopPropagation vs preventDefault
// 5) Custom Events
// 6) MutationObserver, IntersectionObserver
// 7) Observer Pattern
// 8) Critical Rendering Path
// 9) script loading: async / defer
// 10) Web APIs (Fetch, Navigator, etc.)
// 11) XHR vs Fetch vs Axios
// 12) HTTP vs HTTPS
// 13) LocalStorage vs SessionStorage
// 14) Cookies vs SessionStorage vs LocalStorage
// 15) TTL & cookie expiry basics
// 16) Events: DOMContentLoaded, load, beforeunload, unload
// 17) Service Workers & Cache (basics)
// 18) Shadow DOM (basics)
// 19) Additional Topics
//    a) Reflow & Repaint (layout performance)
//    b) CSSOM & Render Tree overview
//    c) window.performance API
//    d) requestAnimationFrame
//    e) Browser memory leaks & debugging
// ============================================================================

// ============================================================================
// 1) DOM & BOM
// ============================================================================
//
// 👉 DOM (Document Object Model)
// - Representation of the web page in a tree-like structure.
// - Each HTML element becomes an object in this tree.
// - You can access, add, delete, or modify elements using JavaScript.
//
// 👉 BOM (Browser Object Model)
// - Represents everything provided by the browser outside the web page content.
// - Example: window, navigator, history, location, screen, etc.
// - BOM is the "browser environment".
//
// ============================================================================
// Example: DOM
// ============================================================================
document.body.style.background = "lightyellow";
// changes background color of the page

let heading = document.getElementById("title");
console.log(heading.innerText); // Accessing DOM element text

// ============================================================================
// Example: BOM
// ============================================================================
console.log(window.innerWidth); // width of the browser window
console.log(navigator.userAgent); // browser info
console.log(location.href); // current page URL
console.log(history.length); // no. of visited pages in this tab

// ============================================================================
// ✅ Q&A Section
// ============================================================================
//
// Q1) What is DOM in simple words?
// 👉 DOM is the tree structure of a webpage where HTML tags become objects
//     that we can access and modify using JavaScript.
//
// Q2) What is BOM in simple words?
// 👉 BOM is everything the browser provides apart from the webpage content
//     (like window size, history, navigator, location).
//
// Q3) Is document part of DOM or BOM?
// 👉 'document' is part of the DOM (represents the HTML).
//
// Q4) Is window part of DOM or BOM?
// 👉 'window' is part of the BOM (it is the global object in browsers).
//
// Q5) Relationship between DOM & BOM?
// 👉 window (BOM) contains document (DOM).
//
// Diagram:
// window (BOM)
//    └── document (DOM)
//          └── HTML Elements (h1, p, div, ...)
//
// ============================================================================
// ✅ Recap
// ----------------------------------------------------------------------------
// - DOM → Page content (HTML turned into objects).
// - BOM → Browser environment (window, history, navigator, etc.).
// - window (BOM) owns document (DOM).
// ============================================================================
// ============================================================================
// 2) DOM Methods – Finding / Matching Elements
// ============================================================================
//
// 👉 What does it mean?
// DOM gives us methods to "find" or "select" elements in the HTML so that
// JavaScript can interact with them.
//
// Example HTML for reference:
// <div id="box" class="container">
//   <p class="text">Hello</p>
//   <p class="text">World</p>
// </div>
//
// ============================================================================
// 📌 Common DOM Selection Methods
// ============================================================================
//
// 1) getElementById("id")
//    - Finds ONE element by its id.
//    - Always returns a single element (id is unique).
//
let box = document.getElementById("box");
console.log(box); // <div id="box" class="container">...</div>
//
// ---------------------------------------------------------------------------
// 2) getElementsByClassName("className")
//    - Finds ALL elements with the given class.
//    - Returns an HTMLCollection (like an array, but not exactly).
//
let texts = document.getElementsByClassName("text");
console.log(texts[0].innerText); // "Hello"
//
// ---------------------------------------------------------------------------
// 3) getElementsByTagName("tagName")
//    - Finds ALL elements with the given tag name.
//    - Example: "p", "div", "h1", etc.
//
let paragraphs = document.getElementsByTagName("p");
console.log(paragraphs.length); // 2
//
// ---------------------------------------------------------------------------
// 4) querySelector("selector")
//    - Finds the FIRST element that matches a CSS selector.
//    - More powerful, because we can use CSS selectors.
//
let firstText = document.querySelector(".text");
console.log(firstText.innerText); // "Hello"
//
// ---------------------------------------------------------------------------
// 5) querySelectorAll("selector")
//    - Finds ALL elements matching the CSS selector.
//    - Returns a NodeList (can use forEach).
//
let allTexts = document.querySelectorAll(".text");
allTexts.forEach((el) => console.log(el.innerText)); // "Hello", "World"
//
// ============================================================================
// 📌 Matching / Checking Elements
// ============================================================================
//
// 1) element.matches("selector")
//    - Checks if an element matches a given CSS selector.
//
console.log(firstText.matches(".text")); // true
console.log(firstText.matches("#box")); // false
//
// ---------------------------------------------------------------------------
// 2) element.closest("selector")
//    - Finds the closest parent (including itself) matching the selector.
//
console.log(firstText.closest(".container")); // <div id="box" class="container">...</div>
//
// ---------------------------------------------------------------------------
// 3) element.contains(otherElement)
//    - Checks if an element contains another element.
//
console.log(box.contains(firstText)); // true
//
// ============================================================================
// ✅ Q&A Section
// ============================================================================
//
// Q1) Difference between getElementById and querySelector?
// 👉 getElementById only works with IDs, but querySelector can use ANY CSS selector.
//
// Q2) Difference between getElementsByClassName vs querySelectorAll?
// 👉 getElementsByClassName returns HTMLCollection (live, updates automatically),
//    querySelectorAll returns NodeList (static, does not auto-update).
//
// Q3) Which is more modern and flexible?
// 👉 querySelector and querySelectorAll (because they support CSS selectors).
//
// Q4) What does matches() do?
// 👉 It checks if the element itself fits a CSS selector.
//
// Q5) What does closest() do?
// 👉 It walks UP the DOM tree to find the nearest parent matching the selector.
//
// ============================================================================
// ✅ Recap
// ----------------------------------------------------------------------------
// - getElementById → Find by ID
// - getElementsByClassName / getElementsByTagName → Find multiple elements
// - querySelector / querySelectorAll → Modern, use CSS selectors
// - matches() → Check if element fits selector
// - closest() → Find nearest parent
// - contains() → Check if parent contains child
// ============================================================================

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

// ============================================================================
// 4) event.stopPropagation vs event.preventDefault
// ============================================================================
//
// 👉 Both are methods on the Event object, but they do DIFFERENT things.
//
// ============================================================================
// 📌 1) event.stopPropagation()
// ----------------------------------------------------------------------------
// - Stops the event from traveling further (no bubbling/capturing).
// - Use it when you don’t want parent/ancestor elements to handle the event.
//

// Example HTML:
// <div id="parent">
//   <button id="child">Click Me</button>
// </div>

let parent1 = document.getElementById("parent");
let child1 = document.getElementById("child");

parent1.addEventListener("click", () => {
  console.log("Parent clicked!");
});

child1.addEventListener("click", (e) => {
  e.stopPropagation(); // Stops bubbling
  console.log("Child clicked only!");
});

// Output when clicking button:
// "Child clicked only!"
// (Parent listener does NOT fire because bubbling is stopped)

//
// ============================================================================
// 📌 2) event.preventDefault()
// ----------------------------------------------------------------------------
// - Prevents the DEFAULT action of an element (but event still bubbles).
// - Example: stop link navigation, stop form submission, etc.
//

// Example HTML:
// <a id="link" href="https://google.com">Go to Google</a>

let link = document.getElementById("link");

link.addEventListener("click", (e) => {
  e.preventDefault(); // Prevents browser navigation
  console.log("Default action prevented. Staying on same page!");
});

// Clicking link → does NOT redirect, but still logs message.
//
// ============================================================================
// 📌 3) Using Both Together
// ----------------------------------------------------------------------------
// Sometimes you need BOTH: prevent default + stop bubbling.

child.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  console.log("No default + no bubbling!");
});
//
// ============================================================================
// ✅ Q&A Section
// ----------------------------------------------------------------------------
//
// Q1) What does event.stopPropagation() do?
// 👉 Stops event from traveling further (no bubbling/capturing).
//
// Q2) What does event.preventDefault() do?
// 👉 Stops the element’s default browser action (like link navigation, form submit).
//
// Q3) Do they do the same thing?
// 👉 No. One controls event flow, the other controls default browser behavior.
//
// Q4) Can I use both together?
// 👉 Yes, if you want to stop browser’s default AND stop event flow.
//
// Q5) Example use case of preventDefault?
// 👉 Prevent a form from submitting when validation fails.
//
// Q6) Example use case of stopPropagation?
// 👉 Button inside a modal → prevent click from also closing modal via parent listener.
//
// ============================================================================
// ✅ Recap
// ----------------------------------------------------------------------------
// - stopPropagation → stop event from reaching parents
// - preventDefault → stop browser’s default action
// - They are DIFFERENT, but can be used together
// ============================================================================

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

// ============================================================================
// 6) MutationObserver & IntersectionObserver
// ============================================================================
//
// Easy, practical notes for beginners — theory, clear examples, tips, Q&A.
//
// ----------------------------------------------------------------------------
// What they are (in plain language)
// ----------------------------------------------------------------------------
// MutationObserver:
//  - Watches for changes in the DOM (elements added/removed, attributes changed,
//    text changed). Think: "Did the page structure change?"
//
// IntersectionObserver:
//  - Watches when an element becomes visible (or passes a visibility threshold)
//    relative to a root (viewport by default). Think: "Is this element on screen?"
//
// They solve different problems: one is about DOM structure/attributes, the other
// is about visibility relative to viewport/root.
//
// ----------------------------------------------------------------------------
// 1) MutationObserver — Watch DOM changes
// ----------------------------------------------------------------------------
// When to use:
//  - Reacting to nodes being added/removed (widgets inserted by other scripts)
//  - Detecting attribute/class changes (e.g., when another component toggles a class)
//  - Implementing light-weight reactivity without continuous polling
//
// Key API:
//  - new MutationObserver(callback)
//  - observer.observe(targetNode, options)
//  - observer.disconnect()
//  - callback receives (mutationsList, observer) — an array of MutationRecord
//
// MutationRecord important fields:
//  - type: "childList" | "attributes" | "characterData"
//  - target: node where change was observed
//  - addedNodes, removedNodes (NodeLists)
//  - attributeName (if attributes changed)
//  - oldValue (if requested via option)
//
// Example: Observe child nodes and attribute changes
const targetNode = document.getElementById("list"); // assume <ul id="list"></ul>

const observerConfig = {
  childList: true, // watch for added/removed children
  attributes: true, // watch for attribute changes
  subtree: false, // set true to watch descendants too
  attributeOldValue: true, // record previous attribute value
  characterData: false, // watch text changes (set true if needed)
};

const mutationCallback = (mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      if (mutation.addedNodes.length) {
        console.log("Nodes added:", mutation.addedNodes);
      }
      if (mutation.removedNodes.length) {
        console.log("Nodes removed:", mutation.removedNodes);
      }
    } else if (mutation.type === "attributes") {
      console.log(
        `Attribute "${mutation.attributeName}" changed on`,
        mutation.target,
        "old value:",
        mutation.oldValue
      );
    } else if (mutation.type === "characterData") {
      console.log(
        "Text changed in",
        mutation.target,
        "new value:",
        mutation.target.data
      );
    }
  }
};

const mo = new MutationObserver(mutationCallback);
mo.observe(targetNode, observerConfig);

// Trigger some mutations (demo)
const li = document.createElement("li");
li.textContent = "Item X";
targetNode.appendChild(li); // -> childList mutation
li.setAttribute("data-active", "1"); // -> attributes mutation
li.removeAttribute("data-active"); // -> attributes mutation
targetNode.removeChild(li); // -> childList mutation

// Stop observing when done
// mo.disconnect();

// Best practices (MutationObserver):
//  - Narrow scope: observe a specific subtree, not document.body (unless necessary).
//  - Use attributeFilter to only watch certain attributes.
//  - Heavy work inside callback? Batch or debounce to avoid layout thrashing.
//  - Disconnect observers when no longer needed to avoid memory leaks.
//
// Example: attributeFilter and subtree
// mo.observe(targetNode, { attributes: true, attributeFilter: ["class", "style"], subtree: true });

// ----------------------------------------------------------------------------
// 2) IntersectionObserver — Watch visibility of elements
// ----------------------------------------------------------------------------
// When to use:
//  - Lazy-loading images/videos when they come into view
//  - Infinite scroll (load more when sentinel becomes visible)
//  - Trigger animations when element is visible
//  - Reporting viewability metrics (ad viewability)
//
//
// Key API:
//  - new IntersectionObserver(callback, options)
//  - observer.observe(element)
//  - observer.unobserve(element)
//  - observer.disconnect()
//
// Options: { root, rootMargin, threshold }
//
//  - root: element used as viewport. null => browser viewport.
//  - rootMargin: CSS margins (e.g. "0px 0px 200px 0px") — lets you trigger earlier.
//  - threshold: number or array [0, 0.25, 1] — proportion of target visible to trigger.
//
// Callback receives (entries, observer). Each entry is an IntersectionObserverEntry:
//  - entry.target (the element)
//  - entry.isIntersecting (true if it intersects above threshold)
//  - entry.intersectionRatio (0.0 to 1.0)
//  - entry.boundingClientRect / intersectionRect (geometry info)
//
//
// Example 1: Lazy-load images
// HTML: <img data-src="big.jpg" width="600" height="400" alt="...">
const lazyImages = document.querySelectorAll("img[data-src]");

const lazyLoad = (entries, observer) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      // element is visible (per threshold)
      const img = entry.target;
      img.src = img.dataset.src; // start loading the real image
      img.removeAttribute("data-src"); // mark as loaded
      observer.unobserve(img); // no longer need to watch this image
    }
  }
};

const io = new IntersectionObserver(lazyLoad, {
  root: null, // viewport
  rootMargin: "0px 0px 200px 0px", // start loading 200px before it appears
  threshold: 0, // 0 means any pixel visible triggers it
});

lazyImages.forEach((img) => io.observe(img));

// Example 2: Infinite scroll sentinel
// HTML: <div id="sentinel"></div>
const sentinel = document.getElementById("sentinel");

const loadMore = async () => {
  // fetch or generate more DOM nodes, append to list
  console.log("Load more items...");
  // after appending items you may need to move the sentinel
};

const sentinelObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      sentinelObserver.unobserve(sentinel); // prevent double triggers while loading
      loadMore().then(() => sentinelObserver.observe(sentinel));
    }
  },
  { root: null, threshold: 0.1 }
);

sentinelObserver.observe(sentinel);

// Best practices (IntersectionObserver):
//  - Use rootMargin to prefetch (load before element fully appears).
//  - Use unobserve or disconnect when done to save resources.
//  - Choose threshold carefully (0 for any intersection, 1 for fully visible).
//  - Avoid observing huge numbers of elements individually — consider grouping
//    or using pagination if thousands of nodes are involved.
//
// ----------------------------------------------------------------------------
// 3) MutationObserver vs IntersectionObserver — quick comparison
// ----------------------------------------------------------------------------
// - MutationObserver: reacts to DOM structure & attribute changes.
// - IntersectionObserver: reacts to visibility of an element relative to a root.
// Use cases rarely overlap — choose the one matching the question: "Did DOM change?"
// vs "Is this element visible?"
//
// ----------------------------------------------------------------------------
// 4) Performance & Caveats
// ----------------------------------------------------------------------------
// - Both observers batch notifications and call your callback asynchronously,
//   so you get an array of changes (MutationRecord[] or IntersectionEntry[]).
// - Do NOT do heavy synchronous DOM reads/writes per mutation entry — batch them.
//   (Example: collect changes then apply DOM updates in one pass).
// - Always disconnect observers when component is removed to avoid memory leaks.
// - Older browsers: MutationObserver is widely supported; IntersectionObserver
//   has very good support but may need a polyfill for older browsers (IE).
//
// ----------------------------------------------------------------------------
// 5) Common pitfalls & simple fixes
// ----------------------------------------------------------------------------
// Pitfall: Observing entire document with MutationObserver and doing expensive work
// Fix: Observe a narrow subtree, use attributeFilter, and debounce updates.
//
// Pitfall: IntersectionObserver firing many times for many small elements
// Fix: Use sensible threshold and unobserve elements once handled.
//
// ----------------------------------------------------------------------------
// ✅ Q&A — quick revision (simple answers)
// ----------------------------------------------------------------------------
//
// Q1) What does MutationObserver do?
// A1) Watches DOM changes: nodes added/removed, attributes changed, text changed.
//
// Q2) What does IntersectionObserver do?
// A2) Watches element visibility relative to a root (e.g., viewport).
//
// Q3) How do you stop an observer?
// A3) Use observer.disconnect() to stop everything, or observer.unobserve(node) to stop a single node.
//
// Q4) How to get old attribute value with MutationObserver?
// A4) Set option attributeOldValue: true when observing — then mutation.oldValue is available.
//
// Q5) Can IntersectionObserver be used to lazy-load images?
// A5) Yes — observe images with data-src; when they intersect, set src and unobserve.
//
// Q6) Should observer callbacks be heavy?
// A6) No — keep callbacks light, batch work, and avoid forcing layouts inside the loop.
//
// Q7) What is threshold in IntersectionObserver?
// A7) A fraction (0-1) or array that determines how much of the target must be visible
//     before the callback fires (e.g., 0.5 means 50% visible).
//
// Q8) What is rootMargin?
// A8) Margin around the root bounding box (like CSS margin) to expand/shrink the root
//     for earlier/later triggering (useful for prefetching).
//
// Q9) Do observers run synchronously as soon as a change occurs?
// A9) No — the browser batches changes and calls the callback asynchronously with arrays
//     of changes. This reduces thrashing but means you should write your callback accordingly.
//
// Q10) How to avoid memory leaks?
// A10) Disconnect observers when element/component is removed (e.g., in component cleanup).
//
// ----------------------------------------------------------------------------
// Quick Recap
// ----------------------------------------------------------------------------
// - Use MutationObserver when you need to know that the DOM changed.
// - Use IntersectionObserver when you need to know that an element is visible.
// - Both are powerful, efficient alternatives to polling and manual checks.
// - Keep callbacks small, batch updates, and disconnect when finished.
//
// ============================================================================
// End of MutationObserver & IntersectionObserver notes
// ============================================================================

// ============================================================================
// 7) Observer Pattern — JS Notes (Simple, Practical, Interview-ready)
// ============================================================================
//
// What is it (plain language):
// ---------------------------
// The Observer Pattern is a design pattern where one object (the "subject"
// or "publisher") keeps a list of other objects ("observers" or "subscribers")
// and notifies them automatically when something changes. It's a "push" style
// of communication: subject pushes updates to observers.
//
// Real-world analogy:
// -------------------
// A magazine publisher (subject) notifies subscribers (observers) whenever a
// new issue is released. Subscribers can subscribe or unsubscribe anytime.
//
// Why it's useful:
// -----------------
// - Decouples components: publisher doesn't need to know the internals of
//   subscribers — only that they want updates.
// - Great for event systems, UI updates, pub/sub communication, WebSocket
//   message dispatch, and reactive programming.
//
// ============================================================================
// 1) Very simple implementation (basic publisher-subscriber)
// ============================================================================

class SimplePublisher {
  constructor() {
    this.subscribers = []; // store subscriber functions
  }

  subscribe(fn) {
    this.subscribers.push(fn);
    // return unsubscribe function for convenience
    return () => this.unsubscribe(fn);
  }

  unsubscribe(fn) {
    this.subscribers = this.subscribers.filter((s) => s !== fn);
  }

  notify(data) {
    // call each subscriber with the data
    this.subscribers.forEach((fn) => {
      try {
        fn(data);
      } catch (err) {
        // make sure one bad subscriber doesn't break others
        console.error("Subscriber error:", err);
      }
    });
  }
}

// Usage:
const publisher = new SimplePublisher();

const unsubA = publisher.subscribe((data) => console.log("A got:", data));
publisher.subscribe((data) => console.log("B got:", data));

publisher.notify("Issue #1");
// Output:
// A got: Issue #1
// B got: Issue #1

unsubA(); // unsubscribe A
publisher.notify("Issue #2");
// Output:
// B got: Issue #2

// ============================================================================
// 2) EventEmitter-style (multi-event observer)
// ============================================================================
// More flexible: multiple named events, on/off/once/emit

class EventEmitter {
  constructor() {
    this.handlers = new Map(); // eventName -> Set of handlers
  }

  on(event, fn) {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event).add(fn);
    return () => this.off(event, fn); // return unsubscribe
  }

  off(event, fn) {
    const set = this.handlers.get(event);
    if (!set) return;
    set.delete(fn);
    if (set.size === 0) this.handlers.delete(event);
  }

  once(event, fn) {
    const wrapper = (...args) => {
      fn(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }

  emit(event, ...args) {
    const set = this.handlers.get(event);
    if (!set) return;
    // iterate over copy to allow safe mutation during iteration
    Array.from(set).forEach((fn) => {
      try {
        fn(...args);
      } catch (e) {
        console.error("Handler error:", e);
      }
    });
  }
}

// Usage:
const ee = new EventEmitter();

ee.on("data", (d) => console.log("listener1:", d));
const unsub = ee.on("data", (d) => console.log("listener2:", d));

ee.emit("data", { id: 1 });
// listener1: { id: 1 }
// listener2: { id: 1 }

unsub(); // remove listener2
ee.emit("data", { id: 2 });
// listener1: { id: 2 }

ee.once("ready", () => console.log("ready fired once"));
ee.emit("ready"); // ready fired once
ee.emit("ready"); // nothing

// ============================================================================
// 3) Async notifications & ordering
// ============================================================================
// Observers can be notified synchronously (as above) or asynchronously.
// A common pattern is to queue notifications so handlers run later (microtask).

class AsyncPublisher extends SimplePublisher {
  notifyAsync(data) {
    // schedule notifications as microtask so callers don't get blocked
    queueMicrotask(() => this.notify(data));
  }
}

// ============================================================================
// 4) Use-cases (practical examples)
// ============================================================================
// - UI: component state changes -> many UI pieces update
// - WebSockets: server message -> distribute to listeners
// - Pub/Sub inside an app: feature modules communicate without tight coupling
// - Forms: validation engine notifies UI about validation status
//
// Example: WebSocket dispatcher (pseudo)
class WSPub {
  constructor(ws) {
    this.emitter = new EventEmitter();
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      // route by type field
      if (data.type) this.emitter.emit(data.type, data.payload);
    };
  }
  on(type, fn) {
    return this.emitter.on(type, fn);
  }
  off(type, fn) {
    return this.emitter.off(type, fn);
  }
}

// ============================================================================
// 5) Memory & performance considerations (what to watch for)
// ============================================================================
// - Always unsubscribe when a subscriber is destroyed (e.g., component unmount).
//   Otherwise you'll leak memory and call stale callbacks.
// - Use WeakRef/WeakMap only when subscribers are objects and you can accept
//   automatic garbage collection (advanced, not widely needed).
// - Avoid notifying thousands of subscribers synchronously — batch or debounce.
//
// Example: avoid leak by returning unsubscribe from subscribe() (seen above).
//
// ============================================================================
// 6) Differences: Observer Pattern vs Pub/Sub vs EventEmitter
// ============================================================================
// - Observer (classic): subject holds observers and calls them directly.
// - Pub/Sub (message bus): usually decoupled through a mediator/broker (publishers
//   don't know subscribers and vice versa).
// - EventEmitter: practical JS implementation combining features of both.
//
// ============================================================================
// 7) Interview Q&A
// ============================================================================
//
// Q1) What's the Observer Pattern in one sentence?
// A1) A pattern where a subject notifies registered observers about state changes.
//
// Q2) How do you prevent memory leaks with observers?
// A2) Ensure subscribers unsubscribe when no longer needed (returning an
//     unsubscribe function or using lifecycle hooks).
//
// Q3) When would you use EventEmitter over direct callbacks?
// A3) When you need named events, multiple listeners per event, once/unsubscribe helpers.
//
// Q4) Is Observer synchronous or asynchronous?
// A4) It can be both — basic implementations are synchronous, but you can schedule
//     notifications asynchronously (microtask/macrotask) to avoid blocking.
//
// Q5) How to handle errors in subscribers so one bad observer doesn't break others?
// A5) Wrap each callback in try/catch when notifying, log the error, continue.
//
// Q6) Can Observers affect the subject while being notified?
// A6) Yes — subscribers could call subject methods. To avoid inconsistent state,
//     notify using a snapshot of subscriber list or schedule notifications asynchronously.
//
// ============================================================================
// 8) Quick Recap (easy to remember)
// ============================================================================
// - Subject/Publisher keeps list of Observers/Subscribers.
// - Observers register/unregister themselves to receive updates.
// - notify() pushes updates to observers (synchronous or async).
// - Use EventEmitter for named events and richer API (on/off/once/emit).
// - Always unsubscribe to avoid memory leaks.
//
// ============================================================================
// End of Observer Pattern notes
// ============================================================================

// ============================================================================
// 8) Critical Rendering Path (CRP) — JS Notes (Easy & Practical)
// ============================================================================
//
// What is CRP?
// ------------
// Critical Rendering Path is the sequence of steps the browser takes to
// convert HTML, CSS, and JavaScript into *pixels on the screen*.
//
// Basically: "How does your code become a web page that you can see and use?"
//
// Why Important?
// --------------
// - Faster CRP = faster loading pages.
// - Understanding CRP helps you optimize performance (reduce blocking scripts,
//   minimize CSS/JS, lazy load images, etc.).
//
// ============================================================================
// 1) Steps in the Critical Rendering Path
// ============================================================================
//
// 🛠 Step 1: Parse HTML → DOM
// - Browser reads HTML and builds the Document Object Model (DOM).
// - Example: <p>Hello</p> becomes a DOM node.
//
// 🛠 Step 2: Parse CSS → CSSOM
// - Browser downloads CSS, parses it into a tree structure (CSSOM).
// - Example: p { color: red } applies to <p> node.
//
// 🛠 Step 3: Combine DOM + CSSOM → Render Tree
// - Browser merges DOM and CSSOM to know what each node looks like.
// - Example: <p>Hello</p> styled with red → "Render Tree node: red text 'Hello'".
//
// 🛠 Step 4: Layout (Reflow)
// - Browser calculates positions and sizes of elements (the geometry).
//
// 🛠 Step 5: Paint (Rasterization)
// - Browser paints pixels on the screen (colors, borders, text, etc.).
//
// 🛠 Step 6: Composite
// - Layers (like z-index, transforms) are combined and shown to the user.
//
// ============================================================================
// 2) Example Flow
// ============================================================================
//
// HTML:
// <html>
//   <head>
//     <style>
//       p { color: blue; }
//     </style>
//   </head>
//   <body>
//     <p>Hello World</p>
//   </body>
// </html>
//
// CRP steps:
// - HTML parsed → DOM: <p>Hello World</p>
// - CSS parsed → CSSOM: p { color: blue }
// - DOM + CSSOM → Render Tree
// - Layout: p positioned at (x, y) with width/height
// - Paint: text "Hello World" painted in blue
//
// ============================================================================
// 3) Render-blocking resources
// ============================================================================
// Some resources stop CRP until they’re ready:
// - CSS: page can’t render until CSSOM is built.
// - JS (without async/defer): can block DOM parsing.
// => Solution: use <script defer>, <script async>, minify, preload.
//
// ============================================================================
// 4) Optimizations (CRP Performance Tips)
// ============================================================================
// - Minimize critical resources (inline small CSS, defer JS).
// - Reduce size of CSS/JS (minify, compress).
// - Async/defer scripts to avoid blocking DOM.
// - Lazy load images & non-critical assets.
// - Use critical CSS (only load above-the-fold styles first).
//
// ============================================================================
// 5) Visual Diagram (Text Version)
// ============================================================================
// HTML -----> DOM
// CSS ------> CSSOM
// DOM + CSSOM -----> Render Tree
// Render Tree -----> Layout -----> Paint -----> Screen
//
// ============================================================================
// 6) Interview Q&A
// ============================================================================
//
// Q1) What is the Critical Rendering Path?
// A1) The sequence of steps browser takes to render pixels on the screen:
//      HTML → DOM → CSSOM → Render Tree → Layout → Paint → Composite.
//
// Q2) Why is CSS render-blocking?
// A2) Because without CSS, the browser doesn’t know how elements should look,
//      so it waits for CSSOM before painting.
//
// Q3) How to make JavaScript non-blocking?
// A3) Use "async" or "defer" attributes when loading scripts.
//
// Q4) Difference between DOM and Render Tree?
// A4) DOM = structure of the page; Render Tree = DOM + CSSOM with visible nodes only.
//
// Q5) How to optimize CRP for faster page load?
// A5) Reduce blocking resources, use critical CSS, defer JS, lazy load images.
//
// ============================================================================
// 7) Quick Recap (Easy to Remember)
// ============================================================================
// CRP steps:
//   1. HTML → DOM
//   2. CSS → CSSOM
//   3. DOM + CSSOM → Render Tree
//   4. Layout (positions/sizes)
//   5. Paint (pixels on screen)
//   6. Composite (final display)
//
// Performance tips:
//   - Defer/async JS
//   - Minimize CSS/JS
//   - Use critical CSS
//   - Lazy load non-critical assets
//
// ============================================================================
// End of CRP Notes
// ============================================================================

// ============================================================================
// 9) Script Loading: async / defer — JS Notes (Easy & Practical)
// ============================================================================
//
// Problem:
// --------
// By default, <script> blocks the HTML parsing until the script is downloaded
// and executed. This slows down page loading.
//
// Solution: Use async or defer attributes to load JS without blocking HTML.
//
// ============================================================================
// 1) Default <script> behavior
// ============================================================================
// <script src="main.js"></script>
//
// Steps:
// 1. Browser parses HTML
// 2. Sees <script>
// 3. Stops HTML parsing
// 4. Downloads script
// 5. Executes script
// 6. Resumes HTML parsing
//
// ❌ Blocks rendering (bad for performance).
//
// ============================================================================
// 2) async
// ============================================================================
// <script src="main.js" async></script>
//
// - Script is downloaded *asynchronously* (in parallel with HTML parsing).
// - BUT executes immediately once downloaded, even if HTML parsing is not done.
// - Execution order is NOT guaranteed (fastest script runs first).
//
// ✅ Good for independent scripts (e.g., analytics, ads).
// ❌ Not good if scripts depend on each other or DOM.
//
// Example:
//
// <script src="analytics.js" async></script>
// <script src="ads.js" async></script>
//
// - whichever loads first runs first.
// - might break if order matters.
//
// ============================================================================
// 3) defer
// ============================================================================
// <script src="main.js" defer></script>
//
// - Script is downloaded in parallel (like async).
// - BUT execution waits until after HTML parsing is finished.
// - Execution order is preserved (top to bottom).
//
// ✅ Best for main app scripts that depend on DOM being ready.
// ✅ Guaranteed order.
// ❌ Doesn’t work in old IE (<9).
//
// Example:
//
// <script src="lib.js" defer></script>
// <script src="app.js" defer></script>
//
// - lib.js downloaded, app.js downloaded
// - Both wait until HTML parsed
// - lib.js runs first, then app.js
//
// ============================================================================
// 4) Summary Table
// ============================================================================
//
// Attribute   | Download        | Execute              | Order
// ------------|-----------------|----------------------|----------------
// (none)      | During parsing  | Immediately          | Preserved
// async       | Parallel        | Immediately on ready | Not preserved
// defer       | Parallel        | After parsing done   | Preserved
//
// ============================================================================
// 5) Interview Q&A
// ============================================================================
//
// Q1) What problem do async and defer solve?
// A1) They prevent scripts from blocking HTML parsing, making pages load faster.
//
// Q2) Difference between async and defer?
// A2) async executes as soon as script is ready (order not guaranteed),
//     defer waits until HTML is fully parsed (order preserved).
//
// Q3) When to use async?
// A3) For independent scripts (analytics, ads, tracking).
//
// Q4) When to use defer?
// A4) For main scripts that depend on DOM or execution order.
//
// Q5) Which executes first: DOMContentLoaded or defer scripts?
// A5) Defer scripts run before DOMContentLoaded event.
//
// ============================================================================
// 6) Quick Recap (Easy to Remember)
// ============================================================================
// - async: "Load fast, run immediately, order doesn’t matter"
// - defer: "Load fast, run later, order preserved"
//
// ============================================================================
// End of Notes
// ============================================================================

// ============================================================================
// 10) 🌐 Web APIs (Fetch, Navigator, etc.) — JS Notes
// ============================================================================
//
// 📝 Theory:
// ----------
// Web APIs are built into the browser (NOT part of JavaScript itself).
// They let JS interact with the browser and the outside world.
//
// Examples of Web APIs:
// - Fetch API → for making HTTP requests
// - Navigator API → info about browser/device
// - Geolocation API → get user’s location
// - Storage API → localStorage, sessionStorage
// - DOM API → manipulate HTML elements
// - Web Workers, WebSockets, etc.
//
// These are provided by the browser, JS just "uses" them.
//
// ============================================================================
// 1) Fetch API
// ============================================================================
// Used to make HTTP requests (like AJAX, but modern and promise-based).
//
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json()) // convert to JSON
  .then((data) => console.log("✅ Data:", data))
  .catch((error) => console.error("❌ Error:", error));

// Async/Await version:
async function getPost() {
  try {
    let res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    let data = await res.json();
    console.log("✅ Async data:", data);
  } catch (err) {
    console.log("❌ Error:", err);
  }
}
getPost();

// ============================================================================
// 2) Navigator API
// ============================================================================
// Provides info about the browser and device.
//
console.log("Browser Info:", navigator.userAgent); // Browser version
console.log("Online:", navigator.onLine); // true if connected
console.log("Language:", navigator.language); // e.g., "en-US"

// Geolocation (with user permission):
navigator.geolocation.getCurrentPosition(
  (pos) =>
    console.log(
      "📍 Latitude:",
      pos.coords.latitude,
      "Longitude:",
      pos.coords.longitude
    ),
  (err) => console.log("❌ Error:", err.message)
);

// ============================================================================
// 3) Storage API (part of Web APIs)
// ============================================================================
// Save and retrieve data in browser.
//
// localStorage (persists until manually cleared)
localStorage.setItem("username", "Avi");
console.log(localStorage.getItem("username")); // Avi

// sessionStorage (cleared when tab closes)
sessionStorage.setItem("sessionId", "12345");
console.log(sessionStorage.getItem("sessionId")); // 12345

// ============================================================================
// 4) DOM API (part of Web APIs)
// ============================================================================
// Already seen → document.querySelector, addEventListener, etc.
//
document.body.style.background = "lightyellow"; // change background

// ============================================================================
// 5) Quick Recap
// ============================================================================
// - Web APIs are provided by the browser (not JavaScript).
// - They allow JS to talk to the outside world (network, storage, UI, device).
// - Common ones: Fetch, Navigator, Geolocation, Storage, DOM.
//
// ============================================================================
// 6) Interview Q&A
// ============================================================================
//
// Q1) What are Web APIs?
// A1) Browser features that JavaScript can use to interact with system, network,
//     or UI (e.g., fetch, navigator, DOM).
//
// Q2) Is fetch part of JavaScript?
// A2) No, it’s a Web API provided by browsers.
//
// Q3) Difference between localStorage and sessionStorage?
// A3) localStorage → data stays until cleared.
//     sessionStorage → data clears when tab closes.
//
// Q4) What does navigator.onLine do?
// A4) Returns true if the browser is connected to the internet.
//
// Q5) Can JavaScript access Geolocation without permission?
// A5) No, user must allow access to location.
//
// ============================================================================
// End of Notes
// ============================================================================

// ============================================================================
// 11)  📡 XHR vs Fetch vs Axios — JS Notes
// ============================================================================
//
// 📝 Theory:
// ----------
// In JavaScript, we often need to make HTTP requests (to APIs).
// There are 3 main ways:
//
// 1) XHR (XMLHttpRequest) → Old, callback-based, complicated
// 2) Fetch API → Modern, built-in, Promise-based
// 3) Axios → External library, easy syntax, supports extra features
//
// ============================================================================
// 1) XMLHttpRequest (XHR)
// ============================================================================
// - Old way of making HTTP requests
// - Uses callbacks (not promises)
// - Verbose and harder to use
//
let xhr = new XMLHttpRequest();
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1");
xhr.onload = function () {
  if (xhr.status === 200) {
    console.log("✅ XHR Response:", JSON.parse(xhr.responseText));
  } else {
    console.log("❌ XHR Error:", xhr.status);
  }
};
xhr.send();

// ============================================================================
// 2) Fetch API
// ============================================================================
// - Modern, built-in to browsers
// - Uses Promises
// - Cleaner than XHR
//
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((res) => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  })
  .then((data) => console.log("✅ Fetch Response:", data))
  .catch((err) => console.log("❌ Fetch Error:", err));

// Async/Await version (cleaner):
async function getData() {
  try {
    let res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    let data = await res.json();
    console.log("✅ Fetch with async/await:", data);
  } catch (e) {
    console.log("❌ Fetch Error:", e);
  }
}
getData();

// ============================================================================
// 3) Axios (External Library)
// ============================================================================
// - Promise-based like fetch, but with more features
// - Handles JSON automatically
// - Better error handling
// - Supports interceptors (modify request/response)
// - Works in both browser & Node.js
//
// (Need to install: npm install axios)
//
/*
import axios from "axios";

axios.get("https://jsonplaceholder.typicode.com/posts/1")
  .then((res) => console.log("✅ Axios Response:", res.data))
  .catch((err) => console.log("❌ Axios Error:", err));
*/

// ============================================================================
// 4) Comparison
// ============================================================================
//
// XHR:
// - Old, callback-based
// - More complex syntax
// - Still works but rarely used directly
//
// Fetch:
// - Modern, built-in, Promise-based
// - Cleaner syntax, supports async/await
// - Doesn’t auto-timeout requests
// - Needs extra handling for older browsers
//
// Axios:
// - External library
// - Easier syntax than Fetch
// - Auto JSON conversion
// - Built-in timeout, interceptors
// - Works in Node.js and browser
//
// ============================================================================
// 5) Interview Q&A
// ============================================================================
//
// Q1) Which one is better: XHR, Fetch, or Axios?
// A1) Fetch is the modern standard (built-in). Axios is great for advanced
//     features like interceptors, timeouts, and Node.js support.
//
// Q2) Does Fetch automatically reject on HTTP error (404, 500)?
// A2) No! Fetch only rejects on network errors. For HTTP errors, you must check `res.ok`.
//
// Q3) Does Axios auto-convert response to JSON?
// A3) Yes, Axios automatically parses JSON. Fetch requires `res.json()`.
//
// Q4) Is Fetch part of JavaScript?
// A4) No, Fetch is a Web API provided by the browser.
//
// Q5) Can XHR use Promises?
// A5) No, it’s callback-based. But we can wrap it manually in a Promise.
//
// ============================================================================
// End of Notes
// ============================================================================

// ============================================================================
// 12) 🌐 HTTP vs HTTPS — JS Notes
// ============================================================================
//
// 📝 Theory:
// ----------
// When we open a website, the browser communicates with the server using a protocol.
// The two common protocols are:
//   ✅ HTTP  → HyperText Transfer Protocol (NOT secure)
//   ✅ HTTPS → HyperText Transfer Protocol Secure (secure, uses encryption)
//
// -----------------------------------------------------------------------------
// 1) HTTP (HyperText Transfer Protocol)
// -----------------------------------------------------------------------------
// - Basic protocol to transfer data between browser & server
// - Data is sent as plain text (no encryption)
// - Anyone (like hackers) can "listen" (intercept) and read your data
// - Used in older websites, not safe for login, banking, payments
//
// Example URL:  http://example.com
//
// -----------------------------------------------------------------------------
// 2) HTTPS (HyperText Transfer Protocol Secure)
// -----------------------------------------------------------------------------
// - Secure version of HTTP
// - Uses SSL/TLS encryption to protect data
// - Ensures:
//    🔒 Confidentiality → Data is encrypted (hackers can't read it)
//    ✅ Integrity → Data cannot be modified during transfer
//    🪪 Authentication → Confirms the server is real (via SSL certificate)
// - Used in all modern websites (banking, e-commerce, APIs)
//
// Example URL:  https://example.com
//
// -----------------------------------------------------------------------------
// 3) Key Differences
// -----------------------------------------------------------------------------
//
// HTTP:
//   - No encryption
//   - Data sent in plain text
//   - Not safe for sensitive info
//
// HTTPS:
//   - Data encrypted using SSL/TLS
//   - Secure communication
//   - Required for modern apps & SEO ranking
//
// -----------------------------------------------------------------------------
// 4) Small Example
// -----------------------------------------------------------------------------
//
// Imagine you send your password "12345" to the server:
//
// 🔓 With HTTP:  "12345" → travels openly (anyone can read)
// 🔒 With HTTPS: "12345" → encrypted as "gibberishData@#$" (only server can decode)
//
// -----------------------------------------------------------------------------
// 5) Interview Q&A
// -----------------------------------------------------------------------------
//
// Q1) What is the difference between HTTP and HTTPS?
// A1) HTTP sends data in plain text (not secure), while HTTPS encrypts data using SSL/TLS (secure).
//
// Q2) Why is HTTPS important?
// A2) It protects sensitive data (like passwords, credit cards) from hackers,
//     and also builds trust with users (browser shows 🔒 padlock).
//
// Q3) What does SSL/TLS do?
// A3) It encrypts the communication between browser and server, so hackers cannot read or modify data.
//
// Q4) Can we run an e-commerce website on HTTP?
// A4) No, it's unsafe. Modern browsers also block payments on non-HTTPS sites.
//
// Q5) Does HTTPS make a website faster?
// A5) Slightly yes! Because of HTTP/2 support, HTTPS can be faster in many cases.
//
// -----------------------------------------------------------------------------
// ✅ Easy way to remember
// -----------------------------------------------------------------------------
// "S" in HTTPS = "Secure"
// If website URL starts with "https://", your data is encrypted and safer.
//
// ============================================================================
// End of Notes
// ============================================================================

// ============================================================================
// 13) 💾 LocalStorage vs SessionStorage — JS Notes
// ============================================================================
//
// 📝 Theory:
// ----------
// Both `localStorage` and `sessionStorage` are part of the **Web Storage API**.
// They are used to store key–value pairs in the browser, like a mini database.
//
// ✅ Similarities:
// - Both store data in browser
// - Data stored as **string key-value pairs**
// - More storage (5–10 MB) than cookies (~4KB)
// - Cannot send data automatically to the server (unlike cookies)
// - Accessed using: setItem, getItem, removeItem, clear
//
// -----------------------------------------------------------------------------
// 1) localStorage
// -----------------------------------------------------------------------------
// - Data is saved permanently in the browser (until manually cleared).
// - Survives page refresh & browser restart.
// - Good for storing user preferences, theme, cart data.
//
// Example:
localStorage.setItem("theme", "dark"); // Save data
console.log(localStorage.getItem("theme")); // "dark"
localStorage.removeItem("theme"); // Remove one
localStorage.clear(); // Clear all

// Even if you close browser and open again → data is still there! 🔒
//
// -----------------------------------------------------------------------------
// 2) sessionStorage
// -----------------------------------------------------------------------------
// - Data exists only for the current **tab/session**.
// - Cleared automatically when the tab is closed.
// - Good for temporary data (form inputs, one-time session).
//
// Example:
sessionStorage.setItem("username", "Avi"); // Save data
console.log(sessionStorage.getItem("username")); // "Avi"
sessionStorage.removeItem("username"); // Remove one
sessionStorage.clear(); // Clear all

// If you refresh the tab → data is there.
// But if you close the tab/browser → data is gone! 🗑️
//
// -----------------------------------------------------------------------------
// 3) Key Differences
// -----------------------------------------------------------------------------
//
// localStorage:
//   - Data persists even after closing browser
//   - Used for long-term data (preferences, saved cart)
//
// sessionStorage:
//   - Data removed once tab/browser is closed
//   - Used for temporary data (session login, one-time form state)
//
// -----------------------------------------------------------------------------
// 4) Practical Example
// -----------------------------------------------------------------------------
//
// Example: Online Shopping Cart
//
// - localStorage → Save user cart so even if they come tomorrow, items are still there.
// - sessionStorage → Store temporary coupon code, which should vanish after session ends.
//
// -----------------------------------------------------------------------------
// 5) Interview Q&A
// -----------------------------------------------------------------------------
//
// Q1) What is the difference between localStorage and sessionStorage?
// A1) localStorage persists data permanently (until cleared), sessionStorage stores data only for the session/tab.
//
// Q2) Does data in localStorage expire?
// A2) No. It stays until you manually clear it (or user clears browser storage).
//
// Q3) When would you use sessionStorage?
// A3) When you need temporary data (e.g., storing form data while filling, or session-based login).
//
// Q4) How much data can be stored in localStorage/sessionStorage?
// A4) Around 5–10 MB (depends on browser).
//
// Q5) Are localStorage/sessionStorage secure?
// A5) Safer than cookies (not auto-sent to server), BUT data is visible to JavaScript,
//     so avoid storing sensitive info like passwords.
//
// -----------------------------------------------------------------------------
// ✅ Easy way to remember
// -----------------------------------------------------------------------------
// localStorage = "long-term storage" (persists forever)
// sessionStorage = "short-term storage" (tab/session only)
//
// ============================================================================
// End of Notes
// ============================================================================

// ============================================================================
// 14) 🍪 Cookies vs 💾 LocalStorage vs 📄 SessionStorage — JS Notes
// ============================================================================
//
// 📝 Theory
// ----------
// All three (Cookies, localStorage, sessionStorage) are ways to store data
// in the browser. But they differ in **size, expiry, and usage**.
//
// -----------------------------------------------------------------------------
// 1) Cookies
// -----------------------------------------------------------------------------
// - Oldest storage mechanism (used since the early web).
// - Can store only ~4KB data.
// - Automatically sent to the server with every HTTP request (slower).
// - Used for: authentication tokens, server-side sessions.
// - Expiry: You can set expiry date (default: deleted when browser closes).
//
// Example:
document.cookie = "user=Avi; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";
console.log(document.cookie); // "user=Avi"

// -----------------------------------------------------------------------------
// 2) localStorage
// -----------------------------------------------------------------------------
// - Modern storage (HTML5).
// - Can store ~5–10MB of data (much bigger than cookies).
// - Data persists even after closing/reopening the browser.
// - NOT automatically sent to the server (faster).
// - Used for: preferences, saved cart, theme, offline data.
//
// Example:
localStorage.setItem("theme", "dark");
console.log(localStorage.getItem("theme")); // "dark"
localStorage.removeItem("theme");

// -----------------------------------------------------------------------------
// 3) sessionStorage
// -----------------------------------------------------------------------------
// - Similar to localStorage but temporary.
// - Data exists only until the tab/browser is closed.
// - Useful for temporary data (session login, form filling).
//
// Example:
sessionStorage.setItem("page", "home");
console.log(sessionStorage.getItem("page")); // "home"
sessionStorage.clear();

// -----------------------------------------------------------------------------
// 4) Key Differences (Comparison Table)
// -----------------------------------------------------------------------------
//
// Feature              | Cookies           | localStorage        | sessionStorage
// ---------------------------------------------------------------------------------
// Capacity             | ~4KB              | 5–10MB              | 5–10MB
// Expiry               | Manual / set date | Never (until cleared)| On tab close
// Sent to server?      | ✅ Yes             | ❌ No                | ❌ No
// Access (JS API)      | document.cookie   | localStorage API    | sessionStorage API
// Good for             | Authentication    | Long-term data      | Temporary data
//
// -----------------------------------------------------------------------------
// 5) Practical Example
// -----------------------------------------------------------------------------
//
// - Cookies: store JWT token for login (needs to be sent to server).
// - localStorage: store cart items so they persist after user revisits site.
// - sessionStorage: store a one-time coupon applied during the session.
//
// -----------------------------------------------------------------------------
// 6) Interview Q&A
// -----------------------------------------------------------------------------
//
// Q1) What is the main difference between cookies, localStorage, and sessionStorage?
// A1) Cookies are small and sent to the server automatically, while localStorage
//     and sessionStorage are larger and stay only in the browser.
//
// Q2) Which one should you use for authentication?
// A2) Cookies (because they are sent to the server with requests).
//
// Q3) Why is localStorage better for storing user preferences than cookies?
// A3) It is bigger (5–10MB), faster (not sent to server), and persists across sessions.
//
// Q4) What happens to sessionStorage if you close the browser tab?
// A4) It gets cleared immediately (data gone).
//
// Q5) Which one is most secure?
// A5) None should store passwords directly.
//     Cookies (HttpOnly, Secure) can be safer for tokens.
//     localStorage/sessionStorage can be vulnerable to XSS.
//
// -----------------------------------------------------------------------------
// ✅ Easy way to remember
// -----------------------------------------------------------------------------
// - Cookies 🍪 = Small, server-linked, old-school
// - localStorage 💾 = Big box, permanent, client-only
// - sessionStorage 📄 = Big box, but temporary (tab-only)
//
// ============================================================================
// End of Notes
// ============================================================================

// ============================================================================
// 15) ⏳ TTL & 🍪 Cookie Expiry Basics — JS Notes
// ============================================================================
//
// 📝 Theory
// ----------
// TTL = "Time To Live" → how long data stays valid before it expires.
//
// In browsers, the most common place we use TTL is in **cookies**.
// - A cookie can be set with an expiry date (or max-age).
// - After expiry, the browser automatically deletes it.
// - If no expiry is set → cookie becomes a "session cookie"
//   (it lasts only until the browser/tab is closed).
//
// -----------------------------------------------------------------------------
// 1) Cookie Expiry with "expires"
// -----------------------------------------------------------------------------
// You can set a cookie with an expiry date/time.

document.cookie = "user=Avi; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";
console.log(document.cookie); // "user=Avi"

// After Dec 31, 2025 → this cookie will be deleted automatically.

// -----------------------------------------------------------------------------
// 2) Cookie Expiry with "max-age"
// -----------------------------------------------------------------------------
// max-age sets cookie lifetime in SECONDS (relative, easier to use).
// Example: expire after 60 seconds

document.cookie = "session=12345; max-age=60; path=/";
console.log(document.cookie); // "session=12345"

// After 60 seconds → cookie automatically removed.

// -----------------------------------------------------------------------------
// 3) Session Cookies
// -----------------------------------------------------------------------------
// If you don’t set "expires" or "max-age",
// cookie will be deleted when browser/tab is closed.

document.cookie = "theme=dark";
console.log(document.cookie); // "theme=dark"
// ❌ Deleted after browser close

// -----------------------------------------------------------------------------
// 4) TTL in General (Beyond Cookies)
// -----------------------------------------------------------------------------
// TTL is also used in:
// - DNS (how long before domain info refreshes).
// - Cache storage (how long cached data stays valid).
// - Databases/Redis (expiry on stored values).
//
// Example: Redis → set key with TTL of 120 seconds:
//   SETEX user:1 120 "Avi"
// After 120s → key auto-deleted.
//
// -----------------------------------------------------------------------------
// 5) Why Cookie Expiry Matters
// -----------------------------------------------------------------------------
// - Authentication: JWT tokens/cookies should expire after certain time.
// - Security: Expired cookies reduce risk if stolen.
// - Performance: Prevents storing unnecessary old data.
//
// -----------------------------------------------------------------------------
// 6) Interview Q&A
// -----------------------------------------------------------------------------
//
// Q1) What is TTL?
// A1) TTL (Time To Live) is the lifespan of data before it is deleted automatically.
//
// Q2) How do you set cookie expiry?
// A2) Either using `expires=<date>` or `max-age=<seconds>`.
//
// Q3) Difference between "expires" and "max-age"?
// A3)
// - expires → exact date/time in GMT (absolute).
// - max-age → number of seconds from now (relative).
//
// Q4) What happens if a cookie has no expiry?
// A4) It becomes a session cookie and gets deleted when browser closes.
//
// Q5) Which one is better to use: "expires" or "max-age"?
// A5) `max-age` is more reliable, because `expires` depends on system clock.
//
// -----------------------------------------------------------------------------
// ✅ Easy way to remember
// -----------------------------------------------------------------------------
// - expires = "End date" (like an expiry date on milk carton 🥛).
// - max-age = "Countdown" (like a timer ⏱️).
// - No expiry = "Session only" (ends when you close the tab 🚪).
//
// ============================================================================
// End of Notes
// ============================================================================

// ============================================================================
// 16) 🎉 Browser Events: DOMContentLoaded, load, beforeunload, unload — JS Notes
// ============================================================================
//
// 📝 Theory
// ----------
// These are special browser lifecycle events that tell us what stage the page is in.
//
// 1) DOMContentLoaded → Fires when HTML is fully parsed,
//    but images, styles, and sub-resources may NOT be loaded yet.
//    ✅ Best for running DOM-related JavaScript quickly.
//
// 2) load → Fires when EVERYTHING (HTML, CSS, images, scripts, fonts, etc.)
//    is fully loaded.
//    ✅ Use if you need ALL resources ready (e.g., image size).
//
// 3) beforeunload → Fires before user leaves/refreshes the page.
//    ✅ Used to show "Do you want to leave?" confirmation.
//
// 4) unload → Fires when the page is unloading (closed/refresh/navigate away).
//    ✅ Used for cleanup (analytics pings, save state).
//    ❌ But not reliable for async tasks (browser may kill them).
//
// -----------------------------------------------------------------------------
// 1) DOMContentLoaded Example
// -----------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM is ready (but images might still be loading).");
  document.body.style.background = "lightyellow"; // Safe to manipulate DOM
});

// -----------------------------------------------------------------------------
// 2) load Example
// -----------------------------------------------------------------------------

window.addEventListener("load", () => {
  console.log("✅ Everything is fully loaded (images, CSS, etc.)");
});

// -----------------------------------------------------------------------------
// 3) beforeunload Example
// -----------------------------------------------------------------------------

window.addEventListener("beforeunload", (event) => {
  event.preventDefault(); // Standard way
  event.returnValue = ""; // Some browsers require this
  // Shows confirmation popup: "Do you want to leave this site?"
});

// -----------------------------------------------------------------------------
// 4) unload Example
// -----------------------------------------------------------------------------

window.addEventListener("unload", () => {
  console.log("🚪 Page is being closed/unloaded");
  // Can send analytics or cleanup here (sync only).
});

// -----------------------------------------------------------------------------
// 5) Timeline Analogy
// -----------------------------------------------------------------------------
//
// Page Load Lifecycle:
//    1. Browser starts loading HTML
//    2. ✅ DOMContentLoaded → HTML structure ready
//    3. ✅ load → Everything (CSS, images, fonts) ready
//    4. 🚪 beforeunload → User tries to leave/refresh
//    5. 🚪 unload → Page closed/navigated away
//
// -----------------------------------------------------------------------------
// 6) Interview Q&A
// -----------------------------------------------------------------------------
//
// Q1) Difference between DOMContentLoaded and load?
// A1)
// - DOMContentLoaded → only HTML parsed (fast).
// - load → all resources (CSS, images, iframes) loaded (slower).
//
// Q2) Which event is better for initializing JS?
// A2) DOMContentLoaded → because you can safely access the DOM quickly.
//
// Q3) Why use beforeunload?
// A3) To warn users if they might lose unsaved work before leaving.
//
// Q4) Can we rely on unload for saving data?
// A4) No, because async tasks may be killed. Use `navigator.sendBeacon()` instead.
//
// Q5) Example real-life analogy?
// A5)
// - DOMContentLoaded → "The stage is set, actors are ready" 🎭
// - load → "Audience, props, and costumes are also ready" 👗🎤
// - beforeunload → "Someone about to leave the theatre" 🚶‍♂️
// - unload → "The theatre is now closed" 🔒
//
// -----------------------------------------------------------------------------
// ✅ Easy way to remember
// -----------------------------------------------------------------------------
// - DOMContentLoaded = HTML ready 📄
// - load = EVERYTHING ready 📦
// - beforeunload = about to leave ⚠️
// - unload = already leaving 🚪
//
// ============================================================================
// End of Notes
// ============================================================================

// ============================================================================
// 17) 🚀 Service Workers & Cache (Basics) — JS Notes
// ============================================================================
//
// 📝 Theory
// ----------
//
// 1) What is a Service Worker?
// - A Service Worker is a special script that runs in the background
//   (separate from the main browser thread).
// - It can intercept network requests, cache responses, and make apps work offline.
//
// ✅ Key Features:
//   - Runs in the background
//   - Can intercept HTTP requests
//   - Provides Offline-first experience
//   - Uses Cache API to store/retrieve resources
//
// ⚠️ Rules:
//   - Runs only on HTTPS (except localhost)
//   - It’s event-driven (install, activate, fetch events)
//
// -----------------------------------------------------------------------------
// 2) Life Cycle of a Service Worker
// -----------------------------------------------------------------------------
//    Register → Install → Activate → Fetch (runs on every request)
//
// Example analogy 🎭:
// - Register: "Hire a worker"
// - Install: "Train worker & give tools"
// - Activate: "Worker is ready for duty"
// - Fetch: "Worker handles incoming requests"
//
// -----------------------------------------------------------------------------
// 3) Example: Registering a Service Worker
// -----------------------------------------------------------------------------

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => console.log("✅ Service Worker registered"))
    .catch((err) => console.log("❌ SW registration failed", err));
}

// -----------------------------------------------------------------------------
// 4) Inside sw.js (Service Worker File)
// -----------------------------------------------------------------------------

// Install Event → Cache files initially
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache-v1").then((cache) => {
      return cache.addAll(["/", "/index.html", "/style.css", "/script.js"]);
    })
  );
  console.log("📦 Service Worker: Installed and cached files");
});

// Activate Event → Cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== "my-cache-v1")
            .map((key) => caches.delete(key))
        )
      )
  );
  console.log("♻️ Service Worker: Activated and cleaned old caches");
});

// Fetch Event → Intercept requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request); // Cache-first, fallback to network
    })
  );
});

// -----------------------------------------------------------------------------
// 5) Cache API (Basics)
// -----------------------------------------------------------------------------
async function cacheExample() {
  const cache = await caches.open("my-cache");
  await cache.put("/hello.txt", new Response("Hello World!")); // Save
  const response = await cache.match("/hello.txt"); // Read
  console.log(await response.text()); // Output: Hello World!
}
cacheExample();

// -----------------------------------------------------------------------------
// 6) Interview Q&A
// -----------------------------------------------------------------------------
//
// Q1) What is a Service Worker?
// A1) A script that runs in the background, intercepts requests, and enables offline caching.
//
// Q2) Why are Service Workers HTTPS only?
// A2) For security reasons (they can intercept network requests, so must be secure).
//
// Q3) What are the main events in a Service Worker lifecycle?
// A3) install → activate → fetch.
//
// Q4) How is Service Worker different from LocalStorage?
// A4) - LocalStorage stores key-value data (synchronous).
//     - Service Worker manages caching of full requests/responses (async).
//
// Q5) Can a Service Worker update automatically?
// A5) Yes, browser checks for updates every time the page loads.
//
// -----------------------------------------------------------------------------
// ✅ Easy way to remember
// -----------------------------------------------------------------------------
// Service Worker = "Middleman between Browser & Server"
// - Install → Cache stuff initially
// - Activate → Remove old junk
// - Fetch → Serve cached data (or network if missing)
// Makes websites work offline like an "App".
//
// ============================================================================
// End of Notes
// ============================================================================

// ============================================================================
// 🍽️ Service Worker Real-World Analogy (Restaurant Waiter)
// ============================================================================
//
// Imagine you go to a restaurant:
//
// 1) Register → You hire a waiter (register service worker).
// 2) Install → The waiter memorizes the menu and keeps a notepad (cache files).
// 3) Activate → Old waiters leave, only the new waiter serves you (clear old caches).
// 4) Fetch → Whenever you order food (make a network request):
//       - If the waiter already wrote it down in the notepad (cached response),
//         he serves it instantly 🍲 (offline support).
//       - If not, he goes to the kitchen (fetch from server).
//
// ✅ Benefit:
//   - Faster service (cached responses).
//   - Even if the kitchen (server) is closed, waiter can still serve you
//     something from his notes (offline).
//
// -----------------------------------------------------------------------------
// Quick Example Mapping:
// -----------------------------------------------------------------------------
// 🍴 Restaurant → Browser
// 👨‍🍳 Kitchen → Real Server
// 🧑‍🍳 Waiter → Service Worker
// 📝 Notepad → Cache API
// 🍲 Food → Response (data, images, HTML)
//
// ============================================================================
//
// So, remember:
// - Service Worker = Waiter
// - Cache = Waiter’s notepad
// - Fetch = Order food
//
// ============================================================================
// ```

// ============================================================================
// 18) 🌑 Shadow DOM (Basics)
// ============================================================================
//
// 👉 What is Shadow DOM?
// - Shadow DOM is a way to keep a part of the DOM **isolated** from the rest.
// - It is used in **Web Components** so that styles & scripts don’t leak in/out.
// - Think of it as a "private DOM" inside an element.
//
// 👉 Why use Shadow DOM?
// 1) Encapsulation → Styles/scripts won’t conflict with outside page.
// 2) Reusability → Build custom elements that work everywhere.
// 3) Clean separation → Easier to maintain.
//
// ============================================================================
// 📌 Real-World Analogy
// ============================================================================
//
// 🏠 Your house → Main DOM
// 🛏 Bedroom → Shadow DOM
// 👀 Outsiders can’t see inside your bedroom (private styles).
// 🎨 Paint inside your bedroom doesn’t affect outside walls.
//
// Example:
// - If you style <button> in Shadow DOM → It won’t be affected by global CSS.
// - Outside styles also won’t mess up your button.
//
// ============================================================================
// 📌 Example Code
// ============================================================================

// Create a custom element with Shadow DOM
class MyButton extends HTMLElement {
  constructor() {
    super();

    // Attach Shadow DOM (open means you can inspect in devtools)
    let shadow = this.attachShadow({ mode: "open" });

    // Create button element
    let button = document.createElement("button");
    button.textContent = "Click Me!";

    // Add some private styles
    let style = document.createElement("style");
    style.textContent = `
      button {
        background: purple;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
      }
    `;

    // Append style + button to shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(button);
  }
}

// Define the custom element
customElements.define("my-button", MyButton);

// Usage in HTML:
// <my-button></my-button>
//
// Even if global CSS says `button { background: red }`,
// this shadow DOM button will still stay purple! 🎨
//
// ============================================================================
// 📌 Q&A
// ============================================================================
//
// Q1: What is Shadow DOM?
// A: A "private DOM" inside an element that keeps styles and structure isolated.
//
// Q2: Why do we need Shadow DOM?
// A: To prevent CSS/JS conflicts and make reusable components.
//
// Q3: What is the difference between open vs closed Shadow DOM?
// A:
//   - open → you can access via element.shadowRoot
//   - closed → hidden from outside scripts
//
// Q4: Example of real-world use?
// A: Browser’s <input type="range"> uses Shadow DOM internally to style the slider.
//
// Q5: Does global CSS affect Shadow DOM?
// A: ❌ No, they are completely isolated.
//
// ============================================================================

// ============================================================================
// 19) 🌐 Additional Browser Topics
// ============================================================================
//
// Topics:
// 1) Reflow & Repaint (layout performance)
// 2) CSSOM & Render Tree overview
// 3) window.performance API
// 4) requestAnimationFrame
// 5) Browser memory leaks & debugging
// ============================================================================

// ============================================================================
// 1) Reflow & Repaint (Layout Performance)
// ============================================================================
//
// 👉 Reflow = When the browser recalculates positions & sizes of elements.
// 👉 Repaint = When the browser redraws the pixels (color, background, etc.).
//
// ⚡ Example:
// - Change element width/height → causes Reflow + Repaint.
// - Change only color → causes Repaint.
//
// ============================================================================
// 📌 Example
let box1 = document.getElementById("box");
box1.style.width = "200px"; // Reflow + Repaint
box1.style.background = "red"; // Only Repaint
//
// ============================================================================
// Q&A
// Q1: What is Reflow? → Recalculating layout (positions & sizes).
// Q2: What is Repaint? → Redrawing pixels (color, style).
// Q3: Which is more expensive? → Reflow (slower, costly).
// Q4: How to reduce? → Use CSS classes instead of inline style, avoid frequent DOM changes.
// ============================================================================

// ============================================================================
// 2) CSSOM & Render Tree overview
// ============================================================================
//
// 👉 CSSOM = CSS Object Model (browser’s internal structure of CSS).
// 👉 Render Tree = Combination of DOM + CSSOM → used to paint the page.
//
// ⚡ Process:
// - HTML → DOM
// - CSS → CSSOM
// - DOM + CSSOM → Render Tree
// - Render Tree → Painting on screen
//
// ============================================================================
// 📌 Example
// HTML: <p>Hello</p>
// CSS: p { color: red }
//
// DOM → knows "p element exists"
// CSSOM → knows "p should be red"
// Render Tree → p element (red)
// ============================================================================
// Q&A
// Q1: What is CSSOM? → Internal representation of CSS.
// Q2: What is Render Tree? → DOM + CSSOM together.
// Q3: Why important? → Browser cannot paint until both DOM + CSSOM are ready.
// ============================================================================

// ============================================================================
// 3) window.performance API
// ============================================================================
//
// 👉 Used to measure website performance (loading time, resources).
//
// ============================================================================
// 📌 Example
console.log(window.performance.now());
// Time (in ms) since page started loading
//
// console.log(window.performance.timing);
// Gives detailed timings (DNS lookup, response, DOM load, etc.)
//
// ============================================================================
// Q&A
// Q1: What is performance.now()? → High-resolution timestamp in ms.
// Q2: What is performance.timing? → Detailed loading metrics.
// Q3: Why useful? → To measure speed and optimize websites.
// ============================================================================

// ============================================================================
// 4) requestAnimationFrame
// ============================================================================
//
// 👉 Special method for smooth animations.
// 👉 Tells browser: "Run this function before next repaint."
// 👉 Better than setInterval because it syncs with display refresh (60fps).
//
// ============================================================================
// 📌 Example
function animateBox() {
  let box = document.getElementById("box");
  let pos = 0;

  function move() {
    pos += 2;
    box.style.left = pos + "px";

    if (pos < 200) {
      requestAnimationFrame(move);
    }
  }
  requestAnimationFrame(move);
}
animateBox();
//
// ============================================================================
// Q&A
// Q1: Why use requestAnimationFrame? → Smooth, efficient animations.
// Q2: Difference vs setInterval? → requestAnimationFrame syncs with monitor refresh.
// Q3: When does it pause? → Automatically pauses if tab is inactive (saves CPU).
// ============================================================================

// ============================================================================
// 5) Browser Memory Leaks & Debugging
// ============================================================================
//
// 👉 Memory Leak = When memory is not released after use.
// 👉 Causes:
//   - Unremoved event listeners
//   - Global variables not cleared
//   - DOM elements kept in memory after removal
//
// ============================================================================
// 📌 Example
let btn = document.getElementById("btn");
function clickHandler() {
  console.log("clicked");
}
btn.addEventListener("click", clickHandler);

// ❌ Memory Leak if we never remove it when btn is removed
// ✅ Fix:
btn.removeEventListener("click", clickHandler);
//
// ============================================================================
// Q&A
// Q1: What is a memory leak? → Memory used but never released.
// Q2: Common causes? → Event listeners, global variables, unused DOM nodes.
// Q3: How to debug? → Chrome DevTools → Memory tab → check heap snapshots.
// ============================================================================
