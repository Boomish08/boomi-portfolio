// ============================================================
// FILE:     src/components/About.jsx
// PURPOSE:  About me, quick facts, career goal and future interests.
// ============================================================
import Reveal from "./Reveal.jsx";
import SectionHead from "./SectionHead.jsx";
import Icon from "./Icon.jsx";
import { futureInterests } from "../data/siteData.js";

const facts = [
  { icon: "pin", label: "Based in", text: "Avinashi, Tamil Nadu, India" },
  { icon: "cap", label: "Studying", text: "B.Sc. Computer Technology, 3rd year" },
  { icon: "cpu", label: "Focus", text: "Full-Stack Development & AI-integrated database systems" },
  { icon: "sparkles", label: "Mindset", text: "Introverted, observant, adaptive" },
];

export default function About() {
  return (
    <section className="section section-anchor" id="about" aria-labelledby="aboutTitle">
      <div className="container">
        <SectionHead num="01" id="aboutTitle" title="About Me" />

        <div className="about-grid">
          <Reveal className="about-text" direction="left">
            <p className="lead">I'm Boomish V, a Computer Technology student who believes in observing, learning and building more than talking.</p>
            <p>Currently pursuing my third year of B.Sc. Computer Technology at KPR College of Arts, Science and Research, I'm exploring modern web development, Artificial Intelligence and emerging technologies.</p>
            <p>I'm an independent learner with interests in technology, gaming and gadgets. I enjoy understanding how things work, adapting to new ideas and continuously improving my skills.</p>
            <p>I'm still on my learning journey, but I'm building towards a future in the corporate technology industry.</p>
          </Reveal>

          <Reveal as="aside" className="about-card card" direction="right" aria-label="Quick facts">
            <h3 className="card-kicker">Quick Facts</h3>
            <ul className="facts">
              {facts.map((f) => (
                <li key={f.label}>
                  <Icon name={f.icon} />
                  <span><strong>{f.label}</strong> {f.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="goal-grid">
          <Reveal as="article" className="card goal-card">
            <h3 className="card-kicker">Career Goal</h3>
            <p className="goal-quote">“To work in a corporate technology industry and develop my technical skills while contributing to real-world software development projects.”</p>
          </Reveal>
          <Reveal as="article" index={1} className="card goal-card">
            <h3 className="card-kicker">Future Interests</h3>
            <ul className="chip-list">
              {futureInterests.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
