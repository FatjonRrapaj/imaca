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
