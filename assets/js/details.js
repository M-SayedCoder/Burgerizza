"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const sizePrices = { Small: 5, Medium: 10, Large: 15 };
  let selectedSize = "Large";
  let qty = 1;

  const sizeEls    = document.querySelectorAll(".size-btn");
  const minusBtn   = document.getElementById("minusBtn");
  const plusBtn    = document.getElementById("plusBtn");
  const qtyEl      = document.getElementById("qtyDisplay");
  const totalEl    = document.getElementById("totalPrice");
  const addBtn     = document.getElementById("addToCartBtn");
  const wishBtn    = document.getElementById("wishlistBtn");

  function updateTotal() {
    totalEl.textContent = "$" + (sizePrices[selectedSize] * qty);
  }

  sizeEls.forEach(el => {
    el.addEventListener("click", () => {
      sizeEls.forEach(s => s.classList.remove("active-size"));
      el.classList.add("active-size");
      selectedSize = el.dataset.size;
      updateTotal();
    });
  });

  minusBtn?.addEventListener("click", () => {
    if (qty > 1) { qty--; qtyEl.textContent = qty; updateTotal(); }
  });
  plusBtn?.addEventListener("click",  () => { qty++; qtyEl.textContent = qty; updateTotal(); });

  addBtn?.addEventListener("click", () => {
    CartStore.addItem({
      id:    "burger-classic-beef",
      name:  "Classic Beef Burger",
      size:  selectedSize,
      price: sizePrices[selectedSize],
      qty,
    });
    showToast("Added to cart 🛒", "success");

    // animate button
    addBtn.innerHTML = '<i class="bi bi-check2"></i> Added!';
    addBtn.style.background = "var(--success)";
    setTimeout(() => {
      addBtn.innerHTML = '<i class="bi bi-bag-plus"></i> Add to Cart';
      addBtn.style.background = "";
    }, 1800);
  });

  // Wishlist
  const ITEM = { id: "burger-classic-beef", name: "Classic Beef Burger", price: 15, img: "Burger" };
  if (WishlistStore.has(ITEM.id)) wishBtn?.classList.add("active");

  wishBtn?.addEventListener("click", () => {
    const added = WishlistStore.toggle(ITEM);
    wishBtn.classList.toggle("active", added);
    showToast(added ? "Added to wishlist ❤️" : "Removed from wishlist", added ? "info" : "error");
  });

  updateTotal();
});

function swapImg(thumb) {
  document.querySelectorAll(".thumb").forEach(t => t.classList.remove("active"));
  thumb.classList.add("active");
  document.getElementById("mainImg").src = thumb.src;
}
