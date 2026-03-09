"use strict";

// ============================================================
// Burgerizza · Global JS
// Dark Mode + Toast + Cart Store
// ============================================================

// ── Dark Mode ────────────────────────────────────────────────
const ThemeManager = (() => {
  const KEY = "bzr_theme";

  function getTheme() {
    return localStorage.getItem(KEY) ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(KEY, theme);
    document.querySelectorAll(".dark-toggle input").forEach(t => {
      t.checked = theme === "dark";
    });
  }

  function toggle() {
    apply(getTheme() === "dark" ? "light" : "dark");
  }

  function init() {
    apply(getTheme());
    document.addEventListener("change", e => {
      if (e.target.closest(".dark-toggle")) toggle();
    });
  }

  return { init, toggle, apply, getTheme };
})();

// ── Toast Notifications ──────────────────────────────────────
function showToast(msg, type = "success", duration = 3000) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = `toast-item ${type}`;
  toast.innerHTML = `<div class="toast-dot"></div><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("hiding");
    toast.addEventListener("animationend", () => toast.remove());
  }, duration);
}

// ── Cart Store ───────────────────────────────────────────────
const CartStore = (() => {
  const KEY = "bzr_cart";

  function getAll() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  }

  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    _dispatch();
  }

  function addItem(item) {
    const items = getAll();
    const idx = items.findIndex(i => i.id === item.id && i.size === item.size);
    if (idx > -1) items[idx].qty += item.qty;
    else items.push({ ...item });
    save(items);
  }

  function removeItem(id, size) {
    save(getAll().filter(i => !(i.id === id && i.size === size)));
  }

  function updateQty(id, size, delta) {
    save(getAll().map(i =>
      (i.id === id && i.size === size) ? { ...i, qty: Math.max(1, i.qty + delta) } : i
    ));
  }

  function clear() { save([]); }

  function totalCount() { return getAll().reduce((s, i) => s + i.qty, 0); }

  function totalPrice() { return getAll().reduce((s, i) => s + i.qty * i.price, 0); }

  function _dispatch() { window.dispatchEvent(new CustomEvent("cart:updated")); }

  return { getAll, addItem, removeItem, updateQty, clear, totalCount, totalPrice };
})();

// ── Wishlist Store ───────────────────────────────────────────
const WishlistStore = (() => {
  const KEY = "bzr_wishlist";

  function getAll() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  }

  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("wishlist:updated"));
  }

  function toggle(item) {
    const items = getAll();
    const idx = items.findIndex(i => i.id === item.id);
    if (idx > -1) items.splice(idx, 1);
    else items.push(item);
    save(items);
    return idx === -1; // true = added
  }

  function has(id) { return getAll().some(i => i.id === id); }
  function count() { return getAll().length; }

  return { getAll, toggle, has, count };
})();

// ── Cart Badge Update ────────────────────────────────────────
function updateCartBadges() {
  const count = CartStore.totalCount();
  document.querySelectorAll(".cart-badge").forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
}

window.addEventListener("cart:updated", updateCartBadges);

// ── Init on DOM Ready ────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  ThemeManager.init();
  updateCartBadges();
});

// ── Bottom Nav — highlight active page ──────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".bottom-nav a").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === current);
  });
});
