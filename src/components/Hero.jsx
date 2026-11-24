// ============================================================
// FILE:     src/components/Hero.jsx
// PURPOSE:  The first section: name, typing line, buttons, social links, portrait.
//
// REACT IDEAS:
//   - useTyping(...) is our custom hook; it gives us the text to show.
//   - {curly braces} in JSX insert JavaScript values into the HTML.
//   - JSX uses className instead of class.
//   - style={{ "--d": "0.1s" }} sets a CSS variable (the animation delay).
// ============================================================
import Icon from "./Icon.jsx";
import useTyping from "../hooks/useTyping.js";
import { typingWords, socialLinks } from "../data/siteData.js";

export default function Hero() {
  const typedText = useTyping(typingWords);

  return (
    <section className="hero section-anchor" id="home" aria-labelledby="heroTitle">
      <div className="container hero-grid">
        <div className="hero-text">
          <p className="eyebrow hero-in" style={{ "--d": "0.1s" }}>
            <span className="eyebrow-line"></span>LESS TALK. MORE WORK.
          </p>

          <h1 className="hero-title hero-in" id="heroTitle" style={{ "--d": "0.25s" }}>
            Hello, I'm <span className="gold-text">BOOMI.</span>
          </h1>

          <p className="hero-typing hero-in" style={{ "--d": "0.4s" }}>
            <span className="typing-static">I'm an aspiring</span>
            <span className="typing-word">{typedText}</span>
            <span className="caret" aria-hidden="true"></span>
          </p>

          <p className="hero-sub hero-in" style={{ "--d": "0.55s" }}>
            Aspiring Full-Stack Developer exploring modern web technologies, Artificial Intelligence and the future of intelligent software.
          </p>

          <p className="hero-intro hero-in" style={{ "--d": "0.7s" }}>
            Hello! I am Boomish V, pursuing my third year of B.Sc. Computer Technology at KPR College of Arts, Science and Research. I am an independent learner and gamer who shows equal interest in both. Currently, I am learning new technology skills to develop my technical and AI knowledge.
          </p>

          <div className="hero-actions hero-in" style={{ "--d": "0.85s" }}>
            <a href="#projects" className="btn btn-primary">Explore My Work <Icon name="arrow" /></a>
            <a href="#about" className="btn btn-outline">About Me</a>
          </div>

          <ul className="social-row hero-in" style={{ "--d": "1s" }} aria-label="Social links">
            {socialLinks.map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="icon-link" aria-label={`${s.name} profile (opens in a new tab)`}>
                  <Icon name={s.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-visual hero-in" style={{ "--d": "0.5s" }}>
          <div className="portrait">
            <div className="portrait-glow" aria-hidden="true"></div>
            <div className="portrait-frame">
              <img
                src="/assets/images/boomi-profile.jpg"
                alt="Portrait of Boomish V standing beside a black and gold lamp post"
                width="900"
                height="1313"
                fetchPriority="high"
              />
            </div>
            <span className="float-chip chip-1" aria-hidden="true">Python</span>
            <span className="float-chip chip-2" aria-hidden="true">SQL</span>
            <span className="float-chip chip-3" aria-hidden="true">AI</span>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-hint" aria-label="Scroll down to About section">
        <span className="mouse"><span className="wheel"></span></span>
        <span className="scroll-text">Scroll</span>
      </a>
    </section>
  );
}
