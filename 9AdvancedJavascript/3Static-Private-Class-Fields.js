// ============================================================================
// 3) 📘 Advanced JS – Classes: Static & Private Fields
// ============================================================================
//
// Topics covered:
// 1) Static Fields
// 2) Private Fields
//
// -----------------------------------------------------------------------------

// ============================================================================
// 1) Static Fields
// ============================================================================
// - Belongs to the **class itself**, NOT the instances/objects.
// - Can be accessed using ClassName.fieldName
// - Useful for **constants, counters, utility methods**.

class Counter {
  static count = 0; // static field

  constructor() {
    Counter.count++; // increment static count
  }

  static showCount() {
    // static method
    console.log(`Total objects created: ${Counter.count}`);
  }
}

let c1 = new Counter();
let c2 = new Counter();
let c3 = new Counter();

Counter.showCount(); // Total objects created: 3
// ✅ Note: c1.count → undefined (cannot access static field from instance)

// ============================================================================
// 2) Private Fields
// ============================================================================
// - Prefixed with `#`
// - Accessible ONLY inside the class.
// - Useful for **data hiding / encapsulation**.

class Person {
  #ssn; // private field

  constructor(name, ssn) {
    this.name = name;
    this.#ssn = ssn;
  }

  showSSN() {
    console.log(`SSN of ${this.name} is ${this.#ssn}`);
  }
}

let p4 = new Person("Avi", "123-45-6789");
p4.showSSN(); // SSN of Avi is 123-45-6789
// console.log(p4.#ssn); // ❌ SyntaxError, private field not accessible outside

// ✅ Note: Private fields help **hide sensitive data** and prevent accidental changes.

// ============================================================================
// 🔑 Key Points Summary
// ============================================================================
// 1) Static fields belong to the class, not the instances.
// 2) Access static fields/methods via ClassName.field or ClassName.method()
// 3) Private fields start with #, only accessible inside the class.
// 4) Helps encapsulation and data hiding.
// 5) Static fields can be used for counters, constants, or utility methods.

// ============================================================================
// ❓ Q & A
// ============================================================================
// Q1) Can static fields be accessed via objects?
// 👉 No, only via ClassName.fieldName
//
// Q2) Can private fields be accessed outside the class?
// 👉 No, only methods inside the class can access them.
//
// Q3) Can static methods access private fields directly?
// 👉 No, static methods cannot access instance private fields.
//
// Q4) Can private fields be inherited by child classes?
// 👉 No, private fields are **not inherited**.
//
// Q5) Why use static fields?
// 👉 To store class-level data or utility functions shared by all instances.
