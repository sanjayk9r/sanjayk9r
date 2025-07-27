
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

typeEffect();

// Run after DOM is fully loaded
document.addEventListener("DOMContentLoaded", typeEffect);
// Footer year
function updateFooterYear() {
  const yearElement = document.getElementById("footer-year");
  if (yearElement) {
    yearElement.innerText = new Date().getFullYear();
  }
}

// Call the function once DOM is ready
document.addEventListener("DOMContentLoaded", updateFooterYear);
