// Theme toggle — persists explicit choice, otherwise follows system preference.
(function applyStoredTheme() {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      document.documentElement.setAttribute("data-theme", stored);
    }
  } catch (_) { /* localStorage unavailable */ }
})();

function toggleTheme() {
  const root = document.documentElement;
  const current = root.getAttribute("data-theme");
  let next;
  if (current === "dark") next = "light";
  else if (current === "light") next = "dark";
  else {
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    next = systemDark ? "light" : "dark";
  }
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (_) { /* ignore */ }
}

const words = ["Reliable", "Scalable", "Distributed"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const el = document.getElementById("animated-words");
  if (!el) return; // Prevent error if element not found

  const currentWord = words[wordIndex];
  const displayedText = currentWord.substring(0, charIndex);
  el.innerText = displayedText;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeEffect, 120);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 60);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 800);
  }
}

// Run after DOM is fully loaded
document.addEventListener("DOMContentLoaded", typeEffect);
// Footer year
function updateFooterYear() {
  const yearElement = document.getElementById("footer-year");
  if (yearElement) {
    yearElement.innerText = new Date().getFullYear();
  }
}

// Navbar Toggle Logic
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.getElementById("mobile-menu");
  const navbarMenu = document.querySelector(".navbar-menu");

  if (mobileMenu && navbarMenu) {
    mobileMenu.addEventListener("click", () => {
      navbarMenu.classList.toggle("active");
    });
  }

  const themeToggleBtn = document.getElementById("theme-toggle");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }

  updateFooterYear();
});
