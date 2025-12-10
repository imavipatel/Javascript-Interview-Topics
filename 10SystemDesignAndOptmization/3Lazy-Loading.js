// ============================================================================
// 3) Lazy Loading
// ============================================================================

// -----------------------------------------------------------------------------
// Theory
// -----------------------------------------------------------------------------
// Lazy Loading is a technique where you load resources (images, scripts, modules)
// only when they are needed, instead of loading everything upfront.
// This improves performance, reduces initial page load time, and saves bandwidth.

// Common use-cases:
// 1) Images on a long webpage → load only when they are visible in viewport
// 2) Modules in a web app → import only when needed
// 3) Components in frameworks like React/Vue → dynamic imports

// -----------------------------------------------------------------------------
// Example 1: Lazy loading images using IntersectionObserver
// -----------------------------------------------------------------------------
const images = document.querySelectorAll("img[data-src]");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src; // load actual image
        observer.unobserve(img); // stop observing after loading
      }
    });
  },
  { threshold: 0.1 }
);

images.forEach((img) => observer.observe(img));

// HTML example:
// <img data-src="large-image.jpg" src="placeholder.jpg" alt="Lazy Image">

// -----------------------------------------------------------------------------
// Example 2: Lazy loading JS modules dynamically
// -----------------------------------------------------------------------------
document.getElementById("loadBtn").addEventListener("click", async () => {
  const module = await import("./mathModule.js");
  console.log(module.add(5, 10)); // only loaded when button clicked
});

// -----------------------------------------------------------------------------
// Benefits of Lazy Loading
// -----------------------------------------------------------------------------
// - Faster initial page load
// - Reduced bandwidth usage
// - Improved user experience
// - Helps with SEO for critical content

// -----------------------------------------------------------------------------
// ❓ Q & A
// -----------------------------------------------------------------------------

// Q1) What is lazy loading?
// 👉 Lazy loading is a technique to defer loading of resources until they are needed.

// Q2) How does IntersectionObserver help in lazy loading images?
// 👉 It monitors when an element enters the viewport and triggers the loading only then.

// Q3) Why is lazy loading important for performance?
// 👉 It reduces initial load time, saves bandwidth, and improves responsiveness of the page.

// Q4) Can lazy loading be applied to JavaScript modules?
// 👉 Yes, dynamic imports allow modules to be loaded only when required.

// Q5) Difference between eager loading and lazy loading?
// 👉 Eager loading → loads all resources upfront, Lazy loading → loads resources on-demand.
