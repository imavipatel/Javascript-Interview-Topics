// ============================================================================
// 1) 📘 Advanced JS – Classes & Inheritance (ES6)
// ============================================================================
//
// 1) Classes
// ----------------------------------------------------------------------------
// - A class is a blueprint/template to create objects.
// - Introduced in ES6 (syntactic sugar over constructor functions).
// - Contains:
//    a) constructor() -> runs automatically when object is created.
//    b) methods -> functions inside a class.
//
// ✅ Example:
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Hi, I am ${this.name}, and I am ${this.age} years old.`);
  }
}

let p1 = new Person("Avi", 25);
p1.sayHello(); // Hi, I am Avi, and I am 25 years old.

// ----------------------------------------------------------------------------
// 2) Inheritance
// ----------------------------------------------------------------------------
// - One class can reuse properties & methods of another class.
// - Done using "extends" keyword.
// - Child class can override parent methods.
// - "super()" is used to call parent constructor/methods.
//
// ✅ Example:
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // calls Animal's constructor
    this.breed = breed;
  }

  speak() {
    // overriding
    console.log(`${this.name} barks!`);
  }
}

let a = new Animal("Generic Animal");
a.speak(); // Generic Animal makes a sound

let d = new Dog("Tommy", "Labrador");
d.speak(); // Tommy barks!
console.log(d.breed); // Labrador

// ----------------------------------------------------------------------------
// 3) Key Points
// ----------------------------------------------------------------------------
// - class = blueprint for objects
// - constructor() = special function to initialize object
// - extends = inheritance keyword
// - super() = calls parent constructor/methods
// - Child class can override parent methods
//
// ----------------------------------------------------------------------------
// 4) Q & A
// ----------------------------------------------------------------------------
// Q1) What is a class in JS?
//     -> A blueprint to create objects with properties & methods.
//
// Q2) What is inheritance?
//     -> Reusing parent class features in child class using "extends".
//
// Q3) What is constructor()?
//     -> Special method that initializes object properties.
//
// Q4) Why use super()?
//     -> To call parent constructor/methods inside child class.
//
// Q5) Can child class override parent methods?
//     -> Yes, by redefining same method inside child class.
//
// ============================================================================
