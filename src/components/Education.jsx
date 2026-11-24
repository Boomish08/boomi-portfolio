// ============================================================
// FILE:     src/components/Education.jsx
// PURPOSE:  Education cards. The TEXT lives in src/data/education.js —
//           to add or edit details, change that file, not this one.
// ============================================================
import Reveal from "./Reveal.jsx";
import SectionHead from "./SectionHead.jsx";
import Icon from "./Icon.jsx";
import { mainEducation, otherEducation } from "../data/education.js";

export default function Education() {
  return (
    <section className="section section-anchor" id="education" aria-labelledby="eduTitle">
      <div className="container">
        <SectionHead num="02" id="eduTitle" title="Education" />

        <div className="edu-grid">
          <Reveal as="article" className="card edu-main">
            <span className="badge">{mainEducation.badge}</span>
            <h3>{mainEducation.degree}</h3>
            <p className="edu-school">{mainEducation.school}</p>
            <ul className="meta-list">
              <li><Icon name="cap" /> {mainEducation.period}</li>
              <li><Icon name="pin" /> {mainEducation.place}</li>
            </ul>
          </Reveal>

          {otherEducation.map((item, i) => (
            <Reveal as="article" key={item.title} index={i + 1} className="card edu-side">
              <h3>{item.title}</h3>
              <p className="edu-school">{item.school}</p>
              {/* Show the note only if there is one: condition && thing-to-show */}
              {item.note && <p className="muted">{item.note}</p>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
