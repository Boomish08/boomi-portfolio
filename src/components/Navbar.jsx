// ============================================================
// FILE:     src/components/Navbar.jsx
// PURPOSE:  The top navigation bar: dark background after scrolling,
//           mobile hamburger menu, and the gold "active section" link.
//           (Replaces the old navigation.js.)
//
// STATE (things that change and make React re-draw):
//   menuOpen -> is the mobile menu open?
//   scrolled -> has the page scrolled more than 40px?
// ============================================================
import { useEffect, useState } from "react";
import { navLinks } from "../data/siteData.js";
import useActiveSection from "../hooks/useActiveSection.js";

const sectionIds = navLinks.map((link) => link.id); // ["home", "about", ...]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);

  // Navbar background after scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu with Escape, and when the window becomes wide
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    const onResize = () => { if (window.innerWidth > 960) setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
      <nav className="nav-inner container" aria-label="Main navigation">
        <a href="#home" className="brand" aria-label="BOOMI. — back to top">
          BOOMI<span className="brand-dot">.</span>
        </a>

        <button
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="navMenu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="bar"></span><span className="bar"></span><span className="bar"></span>
        </button>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`} id="navMenu">
          {/* .map() builds one <li> for every link in the array */}
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`nav-link ${link.id === "contact" ? "nav-cta" : ""} ${active === link.id ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
