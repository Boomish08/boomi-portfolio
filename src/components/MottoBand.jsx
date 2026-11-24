// ============================================================
// FILE:     src/components/MottoBand.jsx
// PURPOSE:  The big "LESS TALK. MORE WORK." band under the hero.
// ============================================================
import { Fragment } from "react";
import Reveal from "./Reveal.jsx";

const words = ["Observe", "Learn", "Adapt", "Build"];

export default function MottoBand() {
  return (
    <section className="motto" aria-label="Brand motto">
      <div className="container">
        <Reveal as="p" className="motto-main">
          LESS TALK. <span className="gold-text">MORE WORK.</span>
        </Reveal>

        <Reveal as="ul" index={1} className="motto-words">
          {words.map((word, i) => (
            // A fragment <> lets us return two siblings without an extra wrapper tag
            <Fragment key={word}>
              <li>{word}</li>
              {i < words.length - 1 && <li className="diamond" aria-hidden="true">◆</li>}
            </Fragment>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
