/* ============================================================
   FILE:     js/navigation.js
   PURPOSE:  Everything about moving around the page:
             - navbar gets a dark background after you scroll
             - hamburger menu open / close on mobile
             - the link of the section you are viewing turns gold
             - the thin gold scroll-progress bar at the top
             - the "back to top" button

   NOTE: Smooth scrolling itself is done by CSS (scroll-behavior: smooth
   in style.css) — no JavaScript needed for that.
   ============================================================ */

const navbar     = document.getElementById("navbar");
const navToggle  = document.getElementById("navToggle");
const navMenu    = document.getElementById("navMenu");
const navLinks   = document.querySelectorAll(".nav-link");
const progress   = document.getElementById("scrollProgress");


/* ----- Mobile menu ----- */
function setMenu(open) {
  navMenu.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));        // tells screen readers
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

navToggle.addEventListener("click", function () {
  setMenu(!navMenu.classList.contains("open"));                 // flip open <-> closed
});

// Close the menu when a link is tapped
navLinks.forEach(function (link) {
  link.addEventListener("click", function () { setMenu(false); });
});

// Close with the Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") setMenu(false);
});

// If the window grows to desktop size, make sure the menu state is reset
window.addEventListener("resize", function () {
  if (window.innerWidth > 960) setMenu(false);
});


/* ----- Scroll effects (navbar background, progress bar) ----- */
const toTop = document.getElementById("toTop");

function onScroll() {
  const scrolled = window.scrollY;

  navbar.classList.toggle("scrolled", scrolled > 40);

  // progress = how far down the page we are, from 0 to 1
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = total > 0 ? scrolled / total : 0;
  progress.style.transform = "scaleX(" + ratio + ")";
}

// "passive: true" tells the browser we won't block scrolling -> smoother
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();                                                     // run once at load


/* ----- Active section highlighting -----
   We watch every section. When one crosses the middle band of the screen,
   we make its matching nav link "active". */
const sections = document.querySelectorAll("main section[id]");

function setActive(id) {
  navLinks.forEach(function (link) {
    // href is "#about" -> compare with "#" + id
    link.classList.toggle("active", link.getAttribute("href") === "#" + id);
  });
}

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, {
    rootMargin: "-45% 0px -50% 0px"      // only a thin strip in the middle of the screen counts
  });

  sections.forEach(function (section) { sectionObserver.observe(section); });
}
