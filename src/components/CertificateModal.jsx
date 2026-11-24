// ============================================================
// FILE:     src/components/CertificateModal.jsx
// PURPOSE:  The certificate pop-up. Uses the built-in HTML <dialog> element,
//           which gives us the dark backdrop, the Esc key and keyboard-focus
//           handling for free.
//
// PROPS:    cert    -> the certificate object to show (or null = closed)
//           onClose -> a function the parent gives us; we call it when closing
//
// HOOKS:    useRef    -> handle to the <dialog> so we can call showModal()
//           useEffect -> open/close the dialog whenever "cert" changes
//           useState  -> remember if the image failed to load
// ============================================================
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon.jsx";

// Shows the picture, or a clearly-labelled placeholder if it is missing.
function Preview({ cert }) {
  const [failed, setFailed] = useState(false);

  if (cert.image && !failed) {
    return <img src={cert.image} alt={`Certificate: ${cert.title}`} onError={() => setFailed(true)} />;
  }

  return (
    <div className="preview-placeholder">
      <Icon name="award" />
      <p>
        Certificate image placeholder.<br />
        Add the picture as <code>public{cert.image}</code>
      </p>
    </div>
  );
}

export default function CertificateModal({ cert, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (cert && !dialog.open) {
      dialog.showModal();                    // open
      document.body.style.overflow = "hidden"; // stop page scrolling behind it
    }
    if (!cert && dialog.open) dialog.close(); // close
  }, [cert]);

  // The dialog fires "close" for the X button, the Esc key and backdrop clicks
  function handleClose() {
    document.body.style.overflow = "";
    onClose();
  }

  // Rows of details: [label, value]. Rows with no value are skipped.
  const rows = cert
    ? [
        ["Program", cert.program],
        ["Conducted by", cert.conductedBy],
        ["Offered by", cert.offeredBy],
        ["Achievement", cert.achievement],
        ["Score", cert.score],
        ["Date", cert.date],
        ["Duration", cert.duration],
        ["Valid until", cert.validUntil],
      ].filter((row) => row[1])
    : [];

  return (
    <dialog
      className="cert-modal"
      ref={dialogRef}
      aria-labelledby="certModalTitle"
      onClose={handleClose}
      // Click on the dark area (the dialog itself, not its content) closes it
      onClick={(e) => { if (e.target === dialogRef.current) dialogRef.current.close(); }}
    >
      <button type="button" className="modal-close" aria-label="Close certificate details" onClick={() => dialogRef.current.close()}>
        <Icon name="close" />
      </button>

      {cert && (
        <div className="modal-body">
          <div className="modal-preview">
            {/* key={cert.id} makes React start a fresh Preview for each certificate */}
            <Preview key={cert.id} cert={cert} />
          </div>
          <div className="modal-info">
            <p className="eyebrow">{cert.issuer}</p>
            <h3 id="certModalTitle">{cert.title}</h3>
            <dl className="modal-details">
              {rows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </dialog>
  );
}
