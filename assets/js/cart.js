"use strict";

// ── Promo Codes ────────────────────────────────────────────
const PROMO_CODES = {
  "WELCOME40": 40,
  "SAVE20":    20,
  "BURGER10":  10,
  "FREE15":    15,
};

let activePromo = null;
let activeDiscount = 0;

// ── Render Cart ────────────────────────────────────────────
function renderCart() {
  const items = CartStore.getAll();
  const list  = document.getElementById("cartItemsList");
  const empty = document.getElementById("emptyCart");
  const btn   = document.getElementById("checkoutBtn");

  if (!list) return;

  if (items.length === 0) {
    list.innerHTML  = "";
    empty.style.display  = "flex";
    if (btn) btn.style.opacity = "0.5";
    updateSummary([]);
    return;
  }

  empty.style.display = "none";
  if (btn) btn.style.opacity = "1";

  const emojis = { burger: "🍔", pizza: "🍕", pasta: "🍝", hotdog: "🌭" };

  list.innerHTML = items.map(item => {
    const emoji = emojis[item.id?.split("-")[0]] || "🍽️";
    return `
    <div class="cart-item" data-id="${item.id}" data-size="${item.size}">
      <div class="cart-item-img">${emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">Size: ${item.size}</div>
        <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <div class="qty-control">
        <button class="qty-btn minus-btn" data-id="${item.id}" data-size="${item.size}">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn plus-btn"  data-id="${item.id}" data-size="${item.size}">+</button>
      </div>
      <button class="cart-item-remove remove-btn" data-id="${item.id}" data-size="${item.size}">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>`;
  }).join("");

  // Bind buttons
  list.querySelectorAll(".minus-btn").forEach(b => {
    b.addEventListener("click", () => {
      CartStore.updateQty(b.dataset.id, b.dataset.size, -1);
      renderCart();
    });
  });
  list.querySelectorAll(".plus-btn").forEach(b => {
    b.addEventListener("click", () => {
      CartStore.updateQty(b.dataset.id, b.dataset.size, +1);
      renderCart();
    });
  });
  list.querySelectorAll(".remove-btn").forEach(b => {
    b.addEventListener("click", () => {
      CartStore.removeItem(b.dataset.id, b.dataset.size);
      showToast("Item removed from cart", "error");
      renderCart();
    });
  });

  updateSummary(items);
}

function updateSummary(items) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = activePromo ? (subtotal * activeDiscount / 100) : 0;
  const total    = subtotal - discount;

  const subEl  = document.getElementById("summarySubtotal");
  const totEl  = document.getElementById("summaryTotal");
  const discEl = document.getElementById("summaryDiscount");
  const discRow= document.getElementById("discountRow");

  if (subEl)  subEl.textContent  = `$${subtotal.toFixed(2)}`;
  if (totEl)  totEl.textContent  = `$${total.toFixed(2)}`;
  if (discEl) discEl.textContent = `-$${discount.toFixed(2)}`;
  if (discRow) discRow.style.display = activePromo ? "flex" : "none";
}

// ── Promo Code Logic ───────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  const applyBtn   = document.getElementById("applyPromo");
  const promoInput = document.getElementById("promoInput");
  const promoBadge = document.getElementById("promoBadge");
  const clearBtn   = document.getElementById("clearCartBtn");

  applyBtn?.addEventListener("click", () => {
    const code = promoInput?.value.trim().toUpperCase();
    if (!code) return showToast("Enter a promo code first", "warning");
    if (PROMO_CODES[code]) {
      activePromo    = code;
      activeDiscount = PROMO_CODES[code];
      promoBadge.textContent = `${code} applied — ${activeDiscount}% OFF!`;
      promoBadge.style.display = "flex";
      showToast(`Promo applied! ${activeDiscount}% OFF 🎉`, "success");
      renderCart();
    } else {
      showToast("Invalid promo code", "error");
      promoBadge.style.display = "none";
    }
  });

  promoInput?.addEventListener("keydown", e => {
    if (e.key === "Enter") applyBtn?.click();
  });

  clearBtn?.addEventListener("click", () => {
    if (CartStore.getAll().length === 0) return;
    CartStore.clear();
    showToast("Cart cleared", "info");
    renderCart();
  });
});
