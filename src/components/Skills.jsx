// ============================================================
// FILE:     src/components/Skills.jsx
// PURPOSE:  "Studied & Practised" skills with level bars, and the separate
//           "Currently Exploring" cards. Data comes from src/data/skills.js.
//
// REACT IDEA:  A small component (Pips) can live in the same file and be
//              used inside a bigger one.
// ============================================================
import Reveal from "./Reveal.jsx";
import SectionHead from "./SectionHead.jsx";
import { skills, learning, levelNames } from "../data/skills.js";

// Three little bars; the first "level" bars are gold.
function Pips({ level }) {
  return (
    <span className="pips" aria-hidden="true">
      {[1, 2, 3].map((n) => (
        <i key={n} className={n <= level ? "on" : ""}></i>
      ))}
    </span>
  );
}

export default function Skills() {
  return (
    <section className="section section-anchor" id="skills" aria-labelledby="skillsTitle">
      <div className="container">
        <SectionHead num="03" id="skillsTitle" title="Skills" />

        <Reveal as="h3" className="sub-title">Studied &amp; Practised</Reveal>
        <Reveal as="p" className="sub-note">Honest student-level indicators — no made-up percentages.</Reveal>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <Reveal as="article" key={skill.name} index={index} className="card skill-card">
              <div className="skill-top">
                <h4 className="skill-name">{skill.name}</h4>
                <Pips level={skill.level} />
              </div>
              <p className="skill-level">{levelNames[skill.level]}</p>
              <p className="skill-note">{skill.note}</p>
            </Reveal>
          ))}
        </div>

        <Reveal as="ul" className="legend" aria-label="Skill level legend">
          {[1, 2, 3].map((n) => (
            <li key={n}><Pips level={n} /> {levelNames[n]}</li>
          ))}
        </Reveal>

        <Reveal as="h3" className="sub-title learning-title" id="learning">
          Currently Exploring <span className="pulse-dot" aria-hidden="true"></span>
        </Reveal>
        <Reveal as="p" className="sub-note">My learning journey right now — not yet mastered, and I'm proud to say so.</Reveal>

        <div className="learning-grid">
          {learning.map((item, index) => (
            <Reveal as="article" key={item.name} index={index} className="card learn-card">
              <span className="learn-status"><span className="learn-dot" aria-hidden="true"></span>In progress</span>
              <h4>{item.name}</h4>
              <p className="skill-note">{item.note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
