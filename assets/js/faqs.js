"use strict";

const FAQ_DATA = [
  {
    category: "🛒 Ordering",
    items: [
      { q: "How do I place an order?", a: "Browse restaurants, add items to your cart, choose your delivery address, apply a promo code if you have one, and proceed to checkout." },
      { q: "Can I modify my order after placing it?", a: "Orders can be modified within 2 minutes of placement. After that, contact our support team for assistance." },
      { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, American Express, Apple Pay, Google Pay, and cash on delivery." },
    ]
  },
  {
    category: "🚴 Delivery",
    items: [
      { q: "How long does delivery take?", a: "Average delivery time is 20–35 minutes depending on your location and restaurant preparation time." },
      { q: "Is delivery free?", a: "Delivery is free on all orders! No hidden fees." },
      { q: "Can I track my order?", a: "Yes! Once your order is picked up, you'll get real-time tracking. Go to Order History → Track Order." },
    ]
  },
  {
    category: "🎟️ Promo Codes",
    items: [
      { q: "How do I use a promo code?", a: "Add items to your cart, then enter your promo code in the 'Promo Code' field before checkout." },
      { q: "Can I use multiple promo codes?", a: "Only one promo code can be applied per order." },
      { q: "Why is my promo code not working?", a: "Check that the code is spelled correctly, hasn't expired, and meets the minimum order requirement." },
    ]
  },
  {
    category: "❤️ Account",
    items: [
      { q: "How do I create an account?", a: "Click 'Sign In' in the header, then choose 'Create Account'. Fill in your details and you're good to go!" },
      { q: "How do I save favourite items?", a: "Tap the heart icon on any item or restaurant to add it to your Wishlist." },
      { q: "How do I change my delivery address?", a: "Go to Profile → Addresses to add or edit your delivery addresses." },
    ]
  },
];

function renderFAQs(filter = "") {
  const container = document.getElementById("faqContainer");
  if (!container) return;

  const html = FAQ_DATA.map(cat => {
    const items = cat.items.filter(i =>
      !filter || i.q.toLowerCase().includes(filter) || i.a.toLowerCase().includes(filter)
    );
    if (items.length === 0) return "";

    return `<div class="faq-category">
      <div class="faq-category-title">${cat.category}</div>
      ${items.map((item, idx) => `
        <div class="faq-item" data-id="${cat.category}-${idx}">
          <div class="faq-q">
            <span>${item.q}</span>
            <i class="bi bi-chevron-down faq-chevron"></i>
          </div>
          <div class="faq-a">${item.a}</div>
        </div>
      `).join("")}
    </div>`;
  }).join("");

  container.innerHTML = html || `<div class="empty-state"><div class="empty-state-icon">🔍</div><div class="empty-state-title">No results found</div></div>`;

  container.querySelectorAll(".faq-item").forEach(item => {
    item.querySelector(".faq-q")?.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      container.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFAQs();

  const search = document.getElementById("faqSearch");
  let debounce;
  search?.addEventListener("input", () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => renderFAQs(search.value.toLowerCase().trim()), 200);
  });
});
