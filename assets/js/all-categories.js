"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const chips  = document.querySelectorAll(".cat-chip");
  const cards  = document.querySelectorAll("#allRestGrid .rest-card");
  const count  = document.getElementById("resultCount");
  const search = document.getElementById("searchInput");

  function filter() {
    const active  = document.querySelector(".cat-chip.active")?.dataset.cat || "all";
    const query   = search?.value.toLowerCase().trim() || "";
    let visible   = 0;

    cards.forEach(card => {
      const cats = card.dataset.cats || "";
      const name = card.querySelector(".rest-card-name")?.textContent.toLowerCase() || "";
      const matchCat  = active === "all" || cats.includes(active);
      const matchText = !query || name.includes(query);
      const show = matchCat && matchText;
      card.style.display = show ? "" : "none";
      if (show) visible++;
    });

    if (count) count.textContent = `${visible} Restaurant${visible !== 1 ? "s" : ""}`;
  }

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      filter();
    });
  });

  let debounce;
  search?.addEventListener("input", () => {
    clearTimeout(debounce);
    debounce = setTimeout(filter, 200);
  });

  document.querySelectorAll(".sort-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".sort-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
});
