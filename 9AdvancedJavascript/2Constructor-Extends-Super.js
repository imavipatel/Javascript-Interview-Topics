// ============================================================================
// 2) 📘 Advanced JS – Classes: constructor, extends, super
// ============================================================================
//
// Topics covered:
// 1) constructor() – special method to initialize objects
// 2) extends – class inheritance
// 3) super – call parent constructor/methods
//
// -----------------------------------------------------------------------------

// ============================================================================
// 1) constructor()
// ============================================================================
// - Special method in a class.
// - Automatically runs when a new object is created.
// - Used to initialize object properties.
// - Only ONE constructor is allowed per class.

class Person {
  constructor(name, age) {
    // constructor method
    this.name = name; // initialize property
    this.age = age; // initialize property
  }

  sayHello() {
    console.log(`Hi, I am ${this.name}, and I am ${this.age} years old.`);
  }
}

let p2 = new Person("Avi", 25);
let p3 = new Person("Ravi", 30);

p2.sayHello(); // Hi, I am Avi, and I am 25 years old.
p3.sayHello(); // Hi, I am Ravi, and I am 30 years old.

// ✅ Notes:
// - Constructor is called **automatically** with `new` keyword.
// - You can’t create multiple constructors in one class.

// ============================================================================
// 2) extends
// ============================================================================
// - Used to implement **inheritance** in JavaScript (ES6).
// - Child class inherits **properties and methods** from parent class.
// - Child class can also add its own methods/properties.

class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

// Dog inherits Animal
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // call parent constructor
    this.breed = breed; // child property
  }

  bark() {
    console.log(`${this.name} barks!`);
  }
}

let a1 = new Animal("Generic Animal");
a1.speak(); // Generic Animal makes a sound

let d1 = new Dog("Tommy", "Labrador");
d1.speak(); // Tommy makes a sound (inherited)
d1.bark(); // Tommy barks! (child method)
console.log(d1.breed); // Labrador

// ============================================================================
// 3) super
// ============================================================================
// - Special keyword to access **parent class constructor** or **methods**.
// - Must be called in child constructor before using `this`.
// - Can also call parent methods using `super.methodName()`.

class Animal2 {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog2 extends Animal2 {
  constructor(name, breed) {
    super(name); // call parent constructor
    this.breed = breed;
  }

  speak() {
    super.speak(); // call parent method
    console.log(`${this.name} barks!`); // child method
  }
}

let d2 = new Dog2("Rocky", "Beagle");
d2.speak();
// Rocky makes a sound.
// Rocky barks!

// ============================================================================
// 🔑 Key Points Summary
// ============================================================================
// 1) constructor() -> initialize object properties, auto-called.
// 2) extends -> child class inherits parent class.
// 3) super() -> call parent constructor or methods.
// 4) Child can override parent methods.
// 5) Must call super() in child constructor before using `this`.

// ============================================================================
// ❓ Q & A
// ============================================================================
// Q1) Can a class have multiple constructors?
// 👉 No, only one constructor per class.
//
// Q2) What happens if you don't call super() in child constructor?
// 👉 JS will throw a ReferenceError when using `this`.
//
// Q3) Can child class override parent methods?
// 👉 Yes, by redefining the same method.
//
// Q4) Can you call parent methods without overriding?
// 👉 Yes, using super.methodName().
//
// Q5) Difference between constructor and super?
// 👉 constructor() initializes the current class.
// 👉 super() calls parent constructor or methods.
