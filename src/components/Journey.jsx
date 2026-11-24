// ============================================================
// FILE:     src/components/Journey.jsx
// PURPOSE:  The learning-journey timeline. Items come from src/data/timeline.js.
// ============================================================
import Reveal from "./Reveal.jsx";
import SectionHead from "./SectionHead.jsx";
import { timeline } from "../data/timeline.js";

export default function Journey() {
  return (
    <section className="section section-anchor" id="journey" aria-labelledby="journeyTitle">
      <div className="container">
        <SectionHead num="04" id="journeyTitle" title="Learning Journey" />

        <ol className="timeline">
          {timeline.map((item) => (
            <Reveal as="li" key={item.title} className={`tl-item ${item.now ? "tl-now" : ""}`}>
              <span className="tl-dot" aria-hidden="true"></span>
              <time className="tl-date">{item.date}</time>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
