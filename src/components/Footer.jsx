// ============================================================
// FILE:     src/components/Footer.jsx
// PURPOSE:  Bottom of the page: brand, motto, copyright, back-to-top button.
// ============================================================
import Icon from "./Icon.jsx";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-brand">BOOMI<span className="brand-dot">.</span></p>
        <p className="footer-motto">Observe. Learn. Adapt. Build.</p>
        <p className="muted small">© {year} Boomish V · Built with React &amp; Vite</p>
      </div>
      <a href="#home" className="to-top" aria-label="Back to top"><Icon name="up" /></a>
    </footer>
  );
}
