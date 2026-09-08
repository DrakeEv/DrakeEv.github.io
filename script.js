// ---------- mobile nav ----------
const menuBtn = document.getElementById("menuBtn");
const siteNav = document.getElementById("siteNav");

menuBtn.addEventListener("click", () => {
  siteNav.classList.toggle("active");
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("active");
  });
});

// ---------- theme toggle ----------
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function applyStoredTheme() {
  let stored = null;
  try {
    stored = localStorage.getItem("theme");
  } catch (e) {
    /* storage unavailable, fall back to system preference */
  }
  if (stored) root.setAttribute("data-theme", stored);
}
applyStoredTheme();

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = current ? current === "dark" : prefersDark;
  const next = isDark ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {
    /* storage unavailable, theme just won't persist */
  }
});

// ---------- back to top ----------
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---------- scroll reveal ----------
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in-view"));
}
