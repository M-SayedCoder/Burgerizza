"use strict";

let selectedStars = 0;

const REVIEWS = [
  { name: "Sarah M.", avatar: "👩", stars: 5, text: "Absolutely amazing! The Classic Beef Burger was juicy and perfectly cooked. Delivery was super fast too!", date: "2 hours ago", likes: 14 },
  { name: "Ahmed K.", avatar: "👨‍🦱", stars: 5, text: "Best food delivery app I've used. The Pasta Carbonara was restaurant quality at home. Will order again!", date: "Yesterday", likes: 9 },
  { name: "Layla T.", avatar: "👩‍🦰", stars: 4, text: "Great selection of restaurants. Pizza was delicious, though delivery took a bit longer than estimated.", date: "3 days ago", likes: 6 },
  { name: "Omar F.", avatar: "🧑", stars: 5, text: "The promo codes are a great touch! Used WELCOME40 and saved a bunch. Food was hot and fresh.", date: "1 week ago", likes: 22 },
  { name: "Nadia R.", avatar: "👩‍🦳", stars: 3, text: "Food was good but my order was slightly cold when it arrived. The tracking feature is really helpful though.", date: "1 week ago", likes: 3 },
];

let reviews = [...REVIEWS];

function starsHtml(n) {
  return Array.from({length: 5}, (_, i) =>
    `<i class="bi bi-star${i < n ? '-fill' : ''}"></i>`
  ).join("");
}

function renderReviews() {
  const list = document.getElementById("reviewsList");
  if (!list) return;
  list.innerHTML = reviews.map((r, i) => `
    <div class="review-card">
      <div class="review-header">
        <div class="review-avatar">${r.avatar}</div>
        <div>
          <div class="review-author">${r.name}</div>
          <div class="review-date">${r.date}</div>
        </div>
        <div class="review-stars">${starsHtml(r.stars)}</div>
      </div>
      <div class="review-text">${r.text}</div>
      <div class="review-likes" data-idx="${i}">
        <i class="bi bi-hand-thumbs-up"></i> ${r.likes} helpful
      </div>
    </div>
  `).join("");

  list.querySelectorAll(".review-likes").forEach(el => {
    el.addEventListener("click", () => {
      const idx = +el.dataset.idx;
      reviews[idx].likes++;
      el.innerHTML = `<i class="bi bi-hand-thumbs-up-fill" style="color:var(--brand);"></i> ${reviews[idx].likes} helpful`;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderReviews();

  // Star picker
  const picker = document.getElementById("starPicker");
  picker?.querySelectorAll("i").forEach((star, idx) => {
    star.addEventListener("mouseenter", () => {
      picker.querySelectorAll("i").forEach((s, i) => s.classList.toggle("filled", i <= idx));
    });
    star.addEventListener("mouseleave", () => {
      picker.querySelectorAll("i").forEach((s, i) => s.classList.toggle("filled", i < selectedStars));
    });
    star.addEventListener("click", () => {
      selectedStars = idx + 1;
    });
  });

  // Submit review
  document.getElementById("submitReview")?.addEventListener("click", () => {
    const text = document.getElementById("reviewText")?.value.trim();
    if (!selectedStars) return showToast("Please select a star rating", "warning");
    if (!text) return showToast("Please write a review", "warning");

    const newReview = { name: "You", avatar: "🙂", stars: selectedStars, text, date: "Just now", likes: 0 };
    reviews.unshift(newReview);
    renderReviews();
    document.getElementById("reviewText").value = "";
    selectedStars = 0;
    picker?.querySelectorAll("i").forEach(s => s.classList.remove("filled"));
    showToast("Review submitted! Thank you 🙏", "success");
  });

  // Sort
  document.getElementById("reviewSort")?.addEventListener("change", e => {
    const val = e.target.value;
    if (val === "highest") reviews.sort((a,b) => b.stars - a.stars);
    else if (val === "lowest") reviews.sort((a,b) => a.stars - b.stars);
    else reviews = [...REVIEWS];
    renderReviews();
  });
});
