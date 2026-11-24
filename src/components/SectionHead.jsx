// ============================================================
// FILE:     src/components/SectionHead.jsx
// PURPOSE:  The heading used by every section: number badge + title + gold line.
//           Written ONCE here, reused 8 times — that is the power of components.
// PROPS:    num (like "01"), id (for aria-labelledby), title
// ============================================================
import Reveal from "./Reveal.jsx";

export default function SectionHead({ num, id, title }) {
  return (
    <Reveal as="header" className="section-head">
      <span className="section-num">{num}</span>
      <h2 id={id}>{title}</h2>
      <span className="head-line" aria-hidden="true"></span>
    </Reveal>
  );
}
