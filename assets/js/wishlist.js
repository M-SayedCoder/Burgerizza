"use strict";

const DEMO_ITEMS = [
  { id: "burger-classic-beef", name: "Classic Beef Burger", price: 15, emoji: "🍔" },
  { id: "pizza-margherita",    name: "Margherita Pizza",    price: 12, emoji: "🍕" },
  { id: "pasta-carbonara",     name: "Pasta Carbonara",     price: 14, emoji: "🍝" },
];

function renderWishlist() {
  const grid  = document.getElementById("wishlistGrid");
  const empty = document.getElementById("emptyWishlist");
  const items = WishlistStore.getAll();

  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = "";
    empty.style.display = "flex";
    return;
  }

  empty.style.display = "none";
  grid.innerHTML = `<div class="wishlist-grid">${items.map(item => `
    <div class="wish-card">
      <div class="wish-card-img">${item.emoji || "🍽️"}</div>
      <div class="wish-card-body">
        <div class="wish-card-name">${item.name}</div>
        <div class="wish-card-price">From $${item.price}</div>
        <div class="wish-card-actions">
          <button class="btn-brand add-cart-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">
            <i class="bi bi-cart-plus"></i> Add to Cart
          </button>
          <button class="wish-remove remove-wish-btn" data-id="${item.id}">
            <i class="bi bi-heart-break"></i>
          </button>
        </div>
      </div>
    </div>
  `).join("")}</div>`;

  grid.querySelectorAll(".add-cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      CartStore.addItem({ id: btn.dataset.id, name: btn.dataset.name, size: "Medium", price: +btn.dataset.price, qty: 1 });
      showToast("Added to cart 🛒", "success");
    });
  });

  grid.querySelectorAll(".remove-wish-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const all  = WishlistStore.getAll();
      const item = all.find(i => i.id === btn.dataset.id);
      if (item) WishlistStore.toggle(item);
      showToast("Removed from wishlist", "error");
      renderWishlist();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Seed demo items if empty
  if (WishlistStore.getAll().length === 0) {
    DEMO_ITEMS.forEach(i => WishlistStore.toggle(i));
  }
  renderWishlist();
});
