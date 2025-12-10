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
