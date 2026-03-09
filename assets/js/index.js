"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Category chip filter
  document.querySelectorAll(".cat-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".cat-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
    });
  });

  // Greeting by time
  const greetEl = document.querySelector(".hero-greeting");
  if (greetEl) {
    const h = new Date().getHours();
    const greet = h < 12 ? "Good morning! ☀️" : h < 17 ? "Good afternoon! 👋" : "Good evening! 🌙";
    greetEl.textContent = greet;
  }

  // Newsletter toast
  const newsBtn = document.querySelector(".footer-newsletter .btn-brand");
  const newsInput = document.querySelector(".footer-newsletter .bzr-input");
  newsBtn?.addEventListener("click", () => {
    if (newsInput?.value.trim()) {
      showToast("Subscribed successfully! 🎉", "success");
      newsInput.value = "";
    } else {
      showToast("Please enter a valid email", "error");
    }
  });
});
