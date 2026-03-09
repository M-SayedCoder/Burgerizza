"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Payment tabs
  document.querySelectorAll(".pay-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".pay-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById("cardForm").style.display   = tab.dataset.pay === "card"   ? "block" : "none";
      document.getElementById("cashForm").style.display   = tab.dataset.pay === "cash"   ? "block" : "none";
      document.getElementById("walletForm").style.display = tab.dataset.pay === "wallet" ? "block" : "none";
    });
  });

  // Card number formatting
  document.getElementById("cardNumber")?.addEventListener("input", e => {
    let v = e.target.value.replace(/\D/g, "").slice(0,16);
    e.target.value = v.replace(/(.{4})/g, "$1 ").trim();
    const brand = document.getElementById("cardBrand");
    if (brand) brand.textContent = v.startsWith("4") ? "💳" : v.startsWith("5") ? "💳" : v.length > 0 ? "💳" : "";
  });

  // Expiry formatting
  document.getElementById("cardExpiry")?.addEventListener("input", e => {
    let v = e.target.value.replace(/\D/g, "").slice(0,4);
    if (v.length >= 2) v = v.slice(0,2) + " / " + v.slice(2);
    e.target.value = v;
  });

  // Render cart items in summary
  function renderSummary() {
    const items = CartStore.getAll();
    const el    = document.getElementById("checkoutItems");
    const sub   = document.getElementById("coSubtotal");
    const tot   = document.getElementById("coTotal");
    if (!el) return;

    if (items.length === 0) {
      el.innerHTML = '<div style="font-size:14px;color:var(--text-secondary);padding:8px 0;">No items in cart</div>';
    } else {
      el.innerHTML = items.map(i => `
        <div class="checkout-items-row">
          <span>${i.name} × ${i.qty}</span>
          <span>$${(i.price * i.qty).toFixed(2)}</span>
        </div>
      `).join("");
    }

    const total = CartStore.totalPrice();
    if (sub) sub.textContent = `$${total.toFixed(2)}`;
    if (tot) tot.textContent = `$${total.toFixed(2)}`;
  }
  renderSummary();

  // Place order
  document.getElementById("placeOrderBtn")?.addEventListener("click", () => {
    const activeTab = document.querySelector(".pay-tab.active")?.dataset.pay;

    if (activeTab === "card") {
      const name   = document.getElementById("cardName")?.value.trim();
      const number = document.getElementById("cardNumber")?.value.trim();
      const expiry = document.getElementById("cardExpiry")?.value.trim();
      const cvv    = document.getElementById("cardCvv")?.value.trim();
      if (!name || !number || !expiry || !cvv) {
        return showToast("Please fill in all card details", "error");
      }
    }

    CartStore.clear();
    document.getElementById("successModal").style.display = "flex";
  });

  // Wallet opts
  document.querySelectorAll(".wallet-opt").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".wallet-opt").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
});
