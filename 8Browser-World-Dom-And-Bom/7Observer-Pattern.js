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
