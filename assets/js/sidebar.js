"use strict";
// ============================================================
// Burgerizza — Sidebar (slides from LEFT)
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  const sidebar  = document.getElementById("sidebar");
  const overlay  = document.getElementById("sidebarOverlay");
  const openBtn  = document.getElementById("sidebarToggle");
  const closeBtn = document.getElementById("sidebarClose");
  if (!sidebar) return;

  function openSidebar() {
    sidebar.classList.add("open");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  openBtn?.addEventListener("click", openSidebar);
  closeBtn?.addEventListener("click", closeSidebar);
  overlay?.addEventListener("click", closeSidebar);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeSidebar(); });

  // Highlight active page link
  const current = window.location.pathname.split("/").pop() || "index.html";
  sidebar.querySelectorAll(".sidebar-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === current);
  });
});
