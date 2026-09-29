const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");

function setMenuOpen(open) {
  navLinks.classList.toggle("open", open);
  menuButton.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuButton.addEventListener("click", () => setMenuOpen(!navLinks.classList.contains("open")));
navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));

const header = document.getElementById("site-header");
const updateHeaderShadow = () => header.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", updateHeaderShadow, { passive: true });
updateHeaderShadow();

const revealSelector = [
  ".stats-grid > div", ".eyebrow", ".section-title", ".body-copy", ".focus-item", ".detail-row",
  ".spec-table", ".label-grid p", ".feature-row", ".tier", ".contact-detail", ".contact-legal",
  ".cert-strip", ".footer-main > div", ".legal-crumbs", ".legal-meta", ".legal-toc", ".legal-section", ".legal-contact",
].join(",");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const targets = [];
  document.querySelectorAll(revealSelector).forEach((el) => {
    if (el.closest(".hero") || el.parentElement.closest(".reveal")) return;
    el.classList.add("reveal");
    targets.push(el);
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((entry, i) => {
        const el = entry.target;
        el.style.transitionDelay = `${Math.min(i, 6) * 90}ms`;
        el.classList.add("is-visible");
        el.addEventListener("transitionend", () => { el.style.transitionDelay = ""; }, { once: true });
        revealObserver.unobserve(el);
      });
  }, { rootMargin: "0px 0px -8% 0px" });

  targets.forEach((el) => revealObserver.observe(el));
} else {
  document.documentElement.classList.remove("js-reveal");
}

const tocLinks = document.querySelectorAll(".legal-toc a[href^='#']");
if (tocLinks.length) {
  const linkFor = new Map([...tocLinks].map((link) => [link.getAttribute("href").slice(1), link]));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      tocLinks.forEach((link) => link.classList.remove("active"));
      linkFor.get(entry.target.id)?.classList.add("active");
    });
  }, { rootMargin: "-20% 0px -70% 0px" });
  document.querySelectorAll(".legal-section").forEach((section) => observer.observe(section));
}
