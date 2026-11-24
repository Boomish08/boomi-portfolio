// ============================================================
// FILE:     src/components/Interests.jsx
// PURPOSE:  Five small icon cards. Data: interests in src/data/siteData.js.
// ============================================================
import Reveal from "./Reveal.jsx";
import SectionHead from "./SectionHead.jsx";
import Icon from "./Icon.jsx";
import { interests } from "../data/siteData.js";

export default function Interests() {
  return (
    <section className="section section-anchor section-compact" id="interests" aria-labelledby="interestsTitle">
      <div className="container">
        <SectionHead num="07" id="interestsTitle" title="Interests" />

        <ul className="interest-grid">
          {interests.map((item, i) => (
            <Reveal as="li" key={item.label} index={i} className="interest card">
              <Icon name={item.icon} className="icon icon-lg" />
              <span>{item.label}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
