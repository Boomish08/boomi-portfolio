// ============================================================
// FILE:     src/components/Certificates.jsx
// PURPOSE:  The certificate gallery. Clicking "View Certificate" opens the pop-up.
//
// STATE:    selected -> the certificate being viewed (or null when closed)
//           This is "lifting state up": the gallery owns the state and gives
//           the modal what it needs through props.
// ============================================================
import { useState } from "react";
import Reveal from "./Reveal.jsx";
import SectionHead from "./SectionHead.jsx";
import Icon from "./Icon.jsx";
import CertificateModal from "./CertificateModal.jsx";
import { certificates } from "../data/certificates.js";

export default function Certificates() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="section section-anchor" id="certificates" aria-labelledby="certTitle">
      <div className="container">
        <SectionHead num="06" id="certTitle" title="Certificates" />
        <Reveal as="p" className="sub-note">
          Eight certificates earned through courses and programs. Click “View Certificate” on any card for full details.
        </Reveal>

        <div className="cert-grid">
          {certificates.map((c, index) => {
            const when = c.date ? c.date : c.duration; // single date or a duration
            return (
              <Reveal as="article" key={c.id} index={index % 4} className="card cert-card">
                <span className="cert-icon"><Icon name="award" /></span>
                <p className="cert-issuer">{c.issuer}</p>
                <h3>{c.title}</h3>
                <p className="cert-date">{when}</p>

                {(c.achievement || c.score || c.validUntil) && (
                  <div className="cert-badges">
                    {c.achievement && <span className="badge badge-gold">{c.achievement}</span>}
                    {c.score && <span className="badge">Score {c.score}</span>}
                    {c.validUntil && <span className="badge">Valid until {c.validUntil}</span>}
                  </div>
                )}

                <button type="button" className="cert-btn" onClick={() => setSelected(c)}>
                  View Certificate <Icon name="arrow" className="icon icon-sm" />
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      <CertificateModal cert={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
