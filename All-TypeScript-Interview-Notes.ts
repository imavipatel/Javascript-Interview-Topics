/* 
===================================================================
📌 1. WHAT IS TYPESCRIPT?
===================================================================

✔ TypeScript = JavaScript + static typing
✔ Superset of JavaScript (every JS program is valid TS)
✔ Compiles down to plain JavaScript
✔ Helps avoid runtime errors through type checking
✔ Used in React, React Native, Node.js, Angular, etc.

*/

/* 
===================================================================
📌 2. INSTALLATION & BASIC SETUP
===================================================================
*/

/*

// Install TypeScript compiler
npm install -g typescript

// Create tsconfig.json
tsc --init

// Compile TS → JS
tsc index.ts

*/

/* 
===================================================================
📌 3. BASIC TYPES IN TYPESCRIPT
===================================================================
*/

let age: number = 25;
let username: string = "Avi";
let isActive: boolean = true;

// union
let id: number | string = 101;

// any → avoid
let data: any = "hello";

// unknown → safer than any
let value: unknown = 10;

// array
let nums: number[] = [1, 2, 3];
let names: Array<string> = ["avi", "raj"];

// tuple
let user: [number, string] = [1, "Avi"];

// enum
enum Role {
  ADMIN,
  USER,
  GUEST,
}

let r: Role = Role.ADMIN;

// null / undefined
let n: null = null;
let u: undefined = undefined;

/* 
===================================================================
📌 4. TYPE INFERENCE VS TYPE ANNOTATION
===================================================================

TypeScript automatically infers types if possible.

*/

// Type Inference
let a = 10; // inferred number
let b = "Hello"; // inferred string

// Type Annotation
let c: number = 100;

/* 
===================================================================
📌 5. OBJECT TYPES
===================================================================
*/

type User = {
  id: number;
  name: string;
  age?: number; // optional
};

const u1: User = {
  id: 1,
  name: "Avi",
};

/* 
===================================================================
📌 6. INTERFACES (Important)
===================================================================

Interfaces define object shapes and allow extension
*/

interface Person {
  id: number;
  name: string;
  email?: string;
}

const p1: Person = {
  id: 1,
  name: "Avi",
};

// Extending interface
interface Employee extends Person {
  salary: number;
}

const e1: Employee = {
  id: 1,
  name: "Avi",
  salary: 50000,
};

/* 
===================================================================
📌 7. TYPE ALIASES (type vs interface)
===================================================================

type is more flexible (unions, primitives)
interface is better for object structure

*/

type Status = "success" | "failed" | "pending";

let s1: Status = "success";

type Point = {
  x: number;
  y: number;
};

/* 
===================================================================
📌 8. FUNCTIONS IN TYPESCRIPT
===================================================================
*/

// function annotation
function add(a: number, b: number): number {
  return a + b;
}

// arrow function
const multiply = (x: number, y: number): number => x * y;

// optional parameter
function greet(name?: string) {
  return `Hello ${name || "guest"}`;
}

// default param
function power(x: number, y: number = 2) {
  return x ** y;
}

// never type
function throwErr(msg: string): never {
  throw new Error(msg);
}

/* 
===================================================================
📌 9. CLASSES IN TYPESCRIPT (OOP)
===================================================================
*/

class Car {
  private model: string; // only inside class
  public price: number; // everywhere
  readonly year: number; // cannot modify

  constructor(model: string, price: number, year: number) {
    this.model = model;
    this.price = price;
    this.year = year;
  }

  getModel() {
    return this.model;
  }
}

const c1 = new Car("BMW", 5000000, 2024);

// inheritance
class ElectricCar extends Car {
  battery: number = 100;
}

/* 
===================================================================
📌 10. GENERICS (VERY IMPORTANT)
===================================================================
*/

function identity<T>(value: T): T {
  return value;
}

identity<string>("Hello");
identity<number>(100);

// generic array
function wrap<T>(item: T): T[] {
  return [item];
}

// generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
}

const r1: ApiResponse<string[]> = {
  data: ["avi", "raj"],
  status: 200,
};

/* 
===================================================================
📌 11. UTILITY TYPES (SUPER IMPORTANT)
===================================================================

⭐ MOST ASKED IN INTERVIEWS ⭐

*/

type UserTS = {
  id: number;
  name: string;
  age: number;
};

// Partial — makes all optional
type PartialUser = Partial<UserTS>;

// Required — opposite of Partial
type RequiredUser = Required<UserTS>;

// Readonly — no modification
type ReadonlyUser = Readonly<UserTS>;

// Pick — choose selected keys
type JustName = Pick<UserTS, "name">;

// Omit — remove keys
type WithoutAge = Omit<UserTS, "age">;

// Record — key-value mapping
type ScoreMap = Record<string, number>;

const marks: ScoreMap = {
  math: 90,
  sci: 85,
};

/* 
===================================================================
📌 12. TYPE NARROWING (ESSENTIAL)
===================================================================
*/

function printId(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id * 2);
  }
}

// narrowing by "in"
type Admin = { admin: true };
type User2 = { user: true };

function checkRole(person: Admin | User2) {
  if ("admin" in person) console.log("Admin");
}

// narrowing by instanceof
function logDate(date: Date | string) {
  if (date instanceof Date) {
    console.log(date.getFullYear());
  }
}

/* 
===================================================================
📌 13. ADVANCED TYPES
===================================================================
*/

// Intersection
type A = { x: number };
type B = { y: number };
type C = A & B;

// keyof
type UserKeys = keyof UserTS; // "id" | "name" | "age"

// Indexed Access Types
type AgeType = UserTS["age"]; // number

// Conditional types
type IsString<T> = T extends string ? true : false;

/* 
===================================================================
📌 14. MODULES
===================================================================
*/

// math.ts
export const PI = 3.14;
export function sum(a: number, b: number) {
  return a + b;
}

// index.ts
// import { PI, sum } from "./math";

/*

✅ 5. never vs unknown vs any
any – disables type checking
unknown – must narrow before use
never – function never returns

*/
