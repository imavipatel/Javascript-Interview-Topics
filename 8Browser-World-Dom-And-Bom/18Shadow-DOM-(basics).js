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
