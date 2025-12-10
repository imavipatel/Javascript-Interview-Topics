/*

# JavaScript & TypeScript Interview Notes (Expanded)

Below is a complete, expanded collection of **JavaScript + TypeScript theory**, **code examples**, **interview questions**, and **detailed answers**.

---

# ✅ SECTION 1 — What is TypeScript?

## **Theory**

TypeScript is a **typed superset** of JavaScript. It enhances JavaScript by adding:

* Static typing → detect errors before runtime
* Interfaces → define object structures
* Generics → create reusable, type‑safe components
* Enums, tuples, utility types, narrowing, decorators

### **How TS Works Internally?**

1. Developer writes `.ts` code
2. TypeScript compiler (`tsc`) checks for errors
3. Compiler transpiles TS → plain JS
4. Browser/Node executes JS

### **Code Example**

```ts
let age: number = 25;
function greet(name: string) {
  return `Hello ${name}`;
}
```

---

## **Interview Questions + Answers**

**Q1. What is TypeScript?**
**A:** A superset of JavaScript that adds static typing and compiles to JavaScript.

**Q2. Why use TS over JS?**
**A:** Better tooling, static type safety, cleaner refactoring.

**Q3. Can the browser run TypeScript directly?**
**A:** No. TS must be compiled to JS.

**Q4. JS vs TS?**
**A:** TS includes types, generics, interfaces, enums, compile‑time checking.

**Q5. How TS helps in large apps?**
**A:** Prevents type‑based bugs, improves collaboration and maintainability.

---

# ✅ SECTION 2 — Installation & tsconfig.json

## **Theory**

`tsc --init` creates `tsconfig.json`. It configures:

* module system
* target JS version
* strict mode
* include/exclude files

### **Code Example (tsconfig.json)**

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "outDir": "dist"
  }
}
```

---

## **Interview Questions**

**Q1. What is tsconfig.json?**
Controls compilation settings.

**Q2. What is strict mode in TS?**
Activates strict type rules like `noImplicitAny`.

**Q3. Does TS prevent all runtime errors?**
No. It prevents type errors only.

---

# ✅ SECTION 3 — Basic Types

## **Theory**

TS has built‑in types:

* string, number, boolean
* null, undefined
* tuple
* array
* enum
* union, intersection
* any, unknown, never

### **Code Example**

```ts
let value: number | string = "avi";
let user: [number, string] = [1, "Avi"];

enum Role { ADMIN, USER }
```

---

## **Interview Q&A**

**Q1. What is a union type?**
Multiple allowed types: `number | string`.

**Q2. any vs unknown?**
`any` disables checks; `unknown` requires narrowing.

**Q3. What is tuple?**
Fixed‑length typed array.

**Q4. What is enum?**
Set of named constants.

---

# ✅ SECTION 4 — Type Inference vs Annotation

## **Theory**

**Inference:** TS figures out types.
**Annotation:** Developer specifies types manually.

### **Code Example**

```ts
let a = 10; // inferred
let b: number = 20; // annotated
```

## **Interview Q&A**

**Q1. What is type inference?**
TS detects types automatically.

**Q2. When use annotation?**
When inference is unclear or needs strictness.

---

# ✅ SECTION 5 — Object Types

## **Theory**

Objects can be typed with `type` or `interface`.

### **Code Example**

```ts
type User = { id: number; name: string; age?: number };
```

## **Interview Q&A**

**Q1. What are optional properties?**
Properties marked with `?`.

**Q2. How enforce object shape?**
Use `type` or `interface`.

---

# ✅ SECTION 6 — Interfaces

## **Theory**

Interfaces define structure and support inheritance.

### **Code Example**

```ts
interface Person { id: number; name: string; }
interface Employee extends Person { salary: number; }
```

## **Interview Q&A**

**Q1. What is an interface?**
Defines contract for object.

**Q2. interface vs type?**
Interface → extendable, merging. Type → unions, primitives.

**Q3. Interface merging?**
Yes. Interfaces with same name merge.

**Q4. Can type extend interface?**
Yes using intersections.

---

# ✅ SECTION 7 — Type Aliases

## **Theory**

`type` gives a name to a type.

### **Code Example**

```ts
type Status = "success" | "failed";
```

## **Interview Q&A**

**Q1. When use type?**
For unions, primitives, function signatures.

**Q2. Can type alias extend?**
Yes via intersections.

---

# ✅ SECTION 8 — Functions

## **Theory**

TS supports typed params, overloads, optional/default params, never type.

### **Code Example**

```ts
function add(a: number, b: number): number { return a + b; }
```

## **Interview Q&A**

**Q1. never vs void?**
`void` = no return; `never` = never returns.

**Q2. What are overloads?**
Two or more function signatures.

---

# ✅ SECTION 9 — Classes & OOP

## **Theory**

Supports OOP with modifiers: `private`, `public`, `protected`, `readonly`.

### **Code Example**

```ts
class Car {
  private model: string;
  constructor(model: string) { this.model = model; }
}
```

## **Interview Q&A**

**Q1. What is private?**
Accessible only inside class.

**Q2. protected vs private?**
Protected works in subclasses.

**Q3. What is readonly?**
Can't modify after initialization.

---

# ✅ SECTION 10 — Generics

## **Theory**

Generics allow reusable type‑safe components.

### **Code Example**

```ts
function identity<T>(value: T): T { return value; }
```

## **Interview Q&A**

**Q1. What are generics?**
Templates for types.

**Q2. Why better than any?**
Preserve type safety.

**Q3. Bounded generic?**
`<T extends object>`.

---

# ✅ SECTION 11 — Utility Types

## **Theory**

TS provides built‑in types: Partial, Required, Readonly, Record, Pick, Omit.

### **Code Example**

````ts
type PartialUser = Partial<{ id: number; name: string }>;```

## **Interview Q&A**
**Q1. Pick vs Omit?**  
Pick selects keys; Omit removes.

**Q2. Use case of Partial?**  
Updating profile.

**Q3. What is Record?**  
Key → value type mapping.

**Q4. What is ReturnType?**  
Extract function return type.

---

# ✅ SECTION 12 — Type Narrowing

## **Theory**
Narrowing uses `typeof`, `instanceof`, `in`, equality checks.

### **Code Example**
```ts
function printId(id: number | string) {
  if (typeof id === "string") console.log(id.toUpperCase());
}
````

## **Interview Q&A**

**Q1. What is narrowing?**
Refining union type.

**Q2. How TS narrows unions?**
typeof, in, instanceof.

**Q3. Discriminated union?**
Union with common literal field.

---

# ✅ SECTION 13 — Advanced Types

### **Code Examples**

```ts
type A = { x: number } & { y: number };

keyof User  // "id" | "name"

type X = User["id"];

type IsString<T> = T extends string ? true : false;
```

## **Interview Q&A**

**Q1. Intersection type?**
Combine two types.

**Q2. What is keyof?**
Returns property names.

**Q3. Mapped type?**
Iterate over keys.

**Q4. Conditional type?**
TS version of if‑else.

---

# ✅ SECTION 14 — Modules

### **Code Example**

```ts
export const PI = 3.14;
export function sum(a: number, b: number) { return a + b; }
```

## Q&A

**Q1. Default vs named export?**
Default = 1 per file, Named = multiple.

**Q2. ES Modules vs CJS?**
ESM → import/export, CJS → require/module.exports.

---

# ✅ SECTION 15 — any vs unknown vs never

### **Code Example**

```ts
function throwErr(): never { throw new Error(); }
```

## Q&A

**Q1. any vs unknown?**
Unknown is safer.

**Q2. When use never?**
Infinite loops, error throwing.

**Q3. Use case of unknown?**
When you don"

*/
