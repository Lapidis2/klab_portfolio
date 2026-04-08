const sections = document.querySelectorAll(".reveal");
const sunBtn = document.querySelector(".sun-btn");
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.18 });

sections.forEach((section) => observer.observe(section));

sunBtn?.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light");
  sunBtn.innerHTML = isLight
    ? '<i class="fa-regular fa-moon"></i>'
    : '<i class="fa-regular fa-sun"></i>';
});

menuBtn?.addEventListener("click", () => navLinks?.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => navLinks?.classList.remove("open"));
});

function setupFilters(groupSelector, listSelector) {
  const tabs = document.querySelectorAll(`${groupSelector} a`);
  const items = document.querySelectorAll(`${listSelector} article`);
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const selected = tab.dataset.filter || "all";
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      items.forEach((item) => {
        const categories = (item.dataset.category || "").split(" ");
        const visible = selected === "all" || categories.includes(selected);
        item.classList.toggle("is-hidden", !visible);
      });
    });
  });
}

setupFilters('[data-filter-group="projects"]', "#project-list");
setupFilters('[data-filter-group="blogs"]', "#blog-list");

const quoteTrack = document.querySelector("#quotes-track");
document.querySelectorAll(".quote-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!quoteTrack) return;
    const dir = btn.dataset.dir === "next" ? 1 : -1;
    quoteTrack.scrollBy({ left: dir * 445, behavior: "smooth" });
  });
});

// Subtle parallax on hero orbits for a premium feel.
const heroVisual = document.querySelector(".hero-visual");
if (heroVisual) {
  heroVisual.addEventListener("mousemove", (e) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    heroVisual.style.transform = `translate(${x}px, ${y}px)`;
  });
  heroVisual.addEventListener("mouseleave", () => {
    heroVisual.style.transform = "translate(0, 0)";
  });
}
