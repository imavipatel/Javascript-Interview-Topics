// ============================================================================
// 📘 Advanced JS – Lazy Loading & Infinite Scroll
// ============================================================================
//
// Topics covered:
// 1) What is Lazy Loading
// 2) How to implement Lazy Loading
// 3) What is Infinite Scroll
// 4) How to implement Infinite Scroll
// 5) Practical examples
//
// -----------------------------------------------------------------------------

// ============================================================================
// 1) What is Lazy Loading
// ============================================================================
// - Lazy Loading is a technique to **load content only when needed**.
// - Helps reduce **initial load time** and **improve performance**.
// - Common use cases: images, videos, components on a page.

// Example: Lazy loading images with "loading" attribute

// <img src="big-image.jpg" loading="lazy" alt="Lazy Image">

// JS example: using IntersectionObserver
const lazyImages = document.querySelectorAll("img.lazy");

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // load actual image
      img.classList.remove("lazy");
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach((img) => observer.observe(img));

// ============================================================================
// 2) How to implement Lazy Loading
// ============================================================================
// - Use **IntersectionObserver API** → detects when element enters viewport
// - Load content dynamically when needed
// - Stop observing element after it is loaded to save resources

// ============================================================================
// 3) What is Infinite Scroll
// ============================================================================
// - Infinite Scroll dynamically loads more content as user scrolls down
// - Common in social media feeds, blogs, or product listings
// - Keeps the user engaged without page reload

// Example concept:
// - Detect scroll position
// - Fetch more data when near bottom of page
// - Append data to DOM

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    // Near bottom → load more content
    loadMoreContent();
  }
});

function loadMoreContent() {
  // Simulate fetching data
  for (let i = 0; i < 5; i++) {
    const div = document.createElement("div");
    div.textContent = "New content item";
    document.body.appendChild(div);
  }
}

// ============================================================================
// 4) Practical Examples
// ============================================================================

// a) Lazy load images
/*
<img data-src="image1.jpg" class="lazy" />
<img data-src="image2.jpg" class="lazy" />
*/

// JS handles loading only when images appear in viewport (see IntersectionObserver above)

// b) Infinite scroll for articles
// - Fetch API can be used to load new articles dynamically
// fetch("/api/articles?page=2")
//   .then(res => res.json())
//   .then(data => appendArticles(data));

// ============================================================================
// 🔑 Key Points Summary
// ============================================================================
// 1) Lazy Loading → load resources only when needed (improves performance)
// 2) Infinite Scroll → dynamically load more content as user scrolls
// 3) IntersectionObserver is better than scroll events for lazy loading
// 4) Always manage memory and remove observers after use
// 5) Combine lazy loading + infinite scroll for efficient long pages

// ============================================================================
// ❓ Q & A
// ============================================================================
// Q1) Why use Lazy Loading?
// 👉 To reduce initial load time and bandwidth usage, improving performance.
//
// Q2) How is IntersectionObserver used in lazy loading?
// 👉 Observes elements entering viewport and triggers loading logic.
//
// Q3) Difference between Lazy Loading and Infinite Scroll?
// 👉 Lazy Loading → defer loading of content until needed.
// 👉 Infinite Scroll → dynamically append content as user scrolls.
//
// Q4) Can we use Infinite Scroll without Lazy Loading?
// 👉 Yes, but it may increase initial memory and load time if images are large.
//
// Q5) How to prevent performance issues with many scroll events?
// 👉 Use **debouncing/throttling** or IntersectionObserver for better efficiency.
