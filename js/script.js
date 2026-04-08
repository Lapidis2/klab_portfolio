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

(function initTestimonialCarousel() {
  const track = document.querySelector("#quotes-track");
  const dotsWrap = document.querySelector("#quote-dots");
  if (!track || !dotsWrap) return;

  const cards = () => [...track.querySelectorAll("blockquote")];

  function gapPx() {
    const g = getComputedStyle(track).gap || getComputedStyle(track).columnGap;
    const n = parseFloat(g);
    return Number.isFinite(n) ? n : 24;
  }

  function stepPx() {
    const c = cards();
    if (!c.length) return 0;
    return c[0].offsetWidth + gapPx();
  }

  function visibleCount() {
    const c = cards();
    if (!c.length) return 1;
    const g = gapPx();
    let used = 0;
    let n = 0;
    for (const el of c) {
      const w = el.offsetWidth;
      const need = n === 0 ? w : used + g + w;
      if (need <= track.clientWidth + 0.5) {
        used = need;
        n += 1;
      } else break;
    }
    return Math.max(1, n);
  }

  function dotCount() {
    const c = cards();
    if (!c.length) return 1;
    const v = visibleCount();
    return Math.max(1, c.length - v + 1);
  }

  function rebuildDots() {
    const n = dotCount();
    dotsWrap.innerHTML = "";
    for (let i = 0; i < n; i += 1) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `quote-dot${i === 0 ? " is-active" : ""}`;
      btn.setAttribute("aria-label", `Slide ${i + 1} of ${n}`);
      btn.setAttribute("role", "tab");
      btn.addEventListener("click", () => {
        const s = stepPx();
        if (s <= 0) return;
        track.scrollTo({ left: i * s, behavior: "smooth" });
      });
      dotsWrap.appendChild(btn);
    }
  }

  function syncActiveDot() {
    const s = stepPx();
    if (s <= 0) return;
    const dots = dotsWrap.querySelectorAll(".quote-dot");
    if (!dots.length) return;
    let idx = Math.round(track.scrollLeft / s);
    const max = dots.length - 1;
    idx = Math.max(0, Math.min(max, idx));
    dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
  }

  let scrollRaf = 0;
  track.addEventListener("scroll", () => {
    if (scrollRaf) cancelAnimationFrame(scrollRaf);
    scrollRaf = requestAnimationFrame(syncActiveDot);
  }, { passive: true });

  let resizeT = 0;
  window.addEventListener("resize", () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => {
      rebuildDots();
      syncActiveDot();
    }, 120);
  });

  document.querySelectorAll(".quote-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dir = btn.dataset.dir === "next" ? 1 : -1;
      const s = stepPx();
      if (s <= 0) return;
      track.scrollBy({ left: dir * s, behavior: "smooth" });
    });
  });

  rebuildDots();
  syncActiveDot();
})();

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
