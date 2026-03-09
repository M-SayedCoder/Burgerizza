"use strict";

const ORDERS = [
  {
    id: "#BRZ-20482", restaurant: "Rose Garden Restaurant", status: "active",
    items: ["Classic Beef Burger × 2", "Fries × 1"],
    total: 35, date: "Today, 2:14 PM"
  },
  {
    id: "#BRZ-20391", restaurant: "Italiano Pizza House", status: "delivered",
    items: ["Margherita Pizza × 1", "Pepperoni Calzone × 1"],
    total: 28, date: "Yesterday, 7:30 PM"
  },
  {
    id: "#BRZ-20240", restaurant: "Pasta House", status: "delivered",
    items: ["Pasta Carbonara × 2"],
    total: 22, date: "Mar 7, 12:00 PM"
  },
  {
    id: "#BRZ-20100", restaurant: "Rose Garden Restaurant", status: "cancelled",
    items: ["Hot Dog Combo × 3"],
    total: 27, date: "Mar 5, 6:45 PM"
  },
];

function renderOrders(filter = "all") {
  const container = document.getElementById("ordersContainer");
  if (!container) return;

  const filtered = filter === "all" ? ORDERS : ORDERS.filter(o => o.status === filter);

  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty-state">
      <div class="empty-state-icon">📋</div>
      <div class="empty-state-title">No orders here</div>
      <p class="empty-state-text">You have no ${filter} orders yet.</p>
    </div>`;
    return;
  }

  container.innerHTML = filtered.map(order => `
    <div class="order-card">
      <div class="order-card-header">
        <div>
          <div class="order-card-id">${order.id}</div>
          <div style="font-size:13px;color:var(--text-tertiary);margin-top:2px;">${order.restaurant}</div>
        </div>
        <span class="order-badge ${order.status}">
          ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>
      <div class="order-items">${order.items.join("<br>")}</div>
      <div class="order-card-footer">
        <span class="order-date"><i class="bi bi-clock"></i> ${order.date}</span>
        <span class="order-total">$${order.total}</span>
      </div>
      <div class="order-actions">
        ${order.status === "active" ? `<a href="order-tracking.html" class="btn-brand"><i class="bi bi-geo-alt"></i> Track Order</a>` : ""}
        ${order.status === "delivered" ? `<button class="btn-brand reorder-btn" data-id="${order.id}"><i class="bi bi-arrow-repeat"></i> Reorder</button>` : ""}
        <button class="btn-ghost"><i class="bi bi-receipt"></i> View Receipt</button>
      </div>
    </div>
  `).join("");

  container.querySelectorAll(".reorder-btn").forEach(btn => {
    btn.addEventListener("click", () => showToast("Items added to cart! 🛒", "success"));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderOrders();

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderOrders(btn.dataset.tab);
    });
  });
});
