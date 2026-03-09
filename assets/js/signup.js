"use strict";
document.addEventListener("DOMContentLoaded", () => {
  // Tabs
  document.querySelectorAll(".auth-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".auth-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById("loginForm").style.display    = tab.dataset.tab === "login"    ? "block" : "none";
      document.getElementById("registerForm").style.display = tab.dataset.tab === "register" ? "block" : "none";
    });
  });

  // Password toggle
  document.getElementById("togglePw")?.addEventListener("click", () => {
    const input = document.getElementById("loginPw");
    const icon  = document.querySelector("#togglePw i");
    if (input.type === "password") {
      input.type = "text";
      icon.className = "bi bi-eye-slash";
    } else {
      input.type = "password";
      icon.className = "bi bi-eye";
    }
  });

  // Login
  document.getElementById("loginBtn")?.addEventListener("click", () => {
    const email = document.getElementById("loginEmail")?.value.trim();
    const pw    = document.getElementById("loginPw")?.value.trim();
    if (!email || !pw) return showToast("Please fill in all fields", "error");
    showToast("Welcome back! 👋", "success");
    setTimeout(() => { window.location.href = "index.html"; }, 1200);
  });

  // Register
  document.getElementById("registerBtn")?.addEventListener("click", () => {
    const name  = document.getElementById("regName")?.value.trim();
    const email = document.getElementById("regEmail")?.value.trim();
    const pw    = document.getElementById("regPw")?.value.trim();
    if (!name || !email || !pw) return showToast("Please fill in all fields", "error");
    if (pw.length < 8) return showToast("Password must be at least 8 characters", "error");
    showToast("Account created! Welcome 🎉", "success");
    setTimeout(() => { window.location.href = "index.html"; }, 1200);
  });
});
