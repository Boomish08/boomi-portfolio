// ============================================================
// FILE:     src/components/Contact.jsx
// PURPOSE:  Contact section: email + copy button, social links, and a form
//           with validation. (Replaces the form code in the old main.js.)
//
// REACT IDEA — CONTROLLED INPUTS:
//   Every input's value lives in React state (values). When the user types,
//   onChange updates the state, and React re-draws the input. React always
//   "knows" what is in the form.
//
// LATER (MERN phase): the submit step will send the data to an Express API
// that saves it in MongoDB. Nothing secret ever goes in front-end code.
// ============================================================
import { useState } from "react";
import Reveal from "./Reveal.jsx";
import SectionHead from "./SectionHead.jsx";
import Icon from "./Icon.jsx";
import { EMAIL, socialLinks } from "../data/siteData.js";

// Each rule returns an error message, or "" when the field is fine
const rules = {
  name: (value) => (value.trim().length < 2 ? "Please enter your name (at least 2 letters)." : ""),
  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
      ? ""
      : "Please enter a valid email, like name@example.com.",
  message: (value) => (value.trim().length < 10 ? "Your message should be at least 10 characters." : ""),
};

const emptyForm = { name: "", email: "", message: "" };
const labels = { name: "Your name", email: "Your email", message: "Your message" };

export default function Contact() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState(emptyForm); // same shape: an error text per field
  const [status, setStatus] = useState({ type: "", text: "" });
  const [copied, setCopied] = useState(false);

  // ----- copy email -----
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatus({ type: "error", text: "Could not copy automatically. Please select the email and copy it." });
    }
  }

  // ----- form helpers -----
  function validateField(field, value) {
    const error = rules[field](value);
    setErrors((prev) => ({ ...prev, [field]: error })); // copy old errors, change one
    return error === "";
  }

  function handleChange(e) {
    const { name, value } = e.target; // which input, and what was typed
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) validateField(name, value); // re-check while typing if it was wrong
  }

  function handleSubmit(e) {
    e.preventDefault(); // stop the browser's page-reload submit

    // Validate ALL fields (don't stop at the first wrong one)
    const results = Object.keys(rules).map((field) => validateField(field, values[field]));
    if (results.includes(false)) {
      setStatus({ type: "error", text: "Please fix the highlighted fields and try again." });
      return;
    }

    const name = values.name.trim();
    setStatus({ type: "success", text: `Thank you, ${name}! Opening your email app so you can send this message.` });

    // Until the backend exists, open the visitor's email app with the message filled in
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${values.message.trim()}\n\n— ${name} (${values.email.trim()})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

    setValues(emptyForm);
  }

  return (
    <section className="section section-anchor" id="contact" aria-labelledby="contactTitle">
      <div className="container">
        <SectionHead num="08" id="contactTitle" title="Get In Touch" />

        <div className="contact-grid">
          <Reveal className="contact-info" direction="left">
            <p className="lead">Open to internships, learning opportunities and conversations with fellow tech enthusiasts. I may be quiet — but I always reply.</p>

            <div className="email-box card">
              <Icon name="mail" className="icon icon-lg" />
              <div className="email-text">
                <span className="muted small">Email</span>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
              <button type="button" className={`copy-btn ${copied ? "copied" : ""}`} onClick={copyEmail} aria-label="Copy email address">
                <Icon name="copy" /><span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            <ul className="contact-links">
              {socialLinks.map((s) => (
                <li key={s.name}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    <Icon name={s.icon} /> {s.name} <Icon name="external" className="icon icon-sm" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="form" className="contact-form card" direction="right" onSubmit={handleSubmit} noValidate>
            <h3 className="card-kicker">Send a Message</h3>

            {Object.keys(rules).map((field) => (
              <div key={field} className={`field ${errors[field] ? "invalid" : ""}`}>
                {field === "message" ? (
                  <textarea
                    id={field} name={field} rows="5" placeholder=" " required
                    value={values[field]} onChange={handleChange}
                    onBlur={(e) => validateField(field, e.target.value)}
                    aria-invalid={errors[field] ? "true" : "false"}
                  />
                ) : (
                  <input
                    id={field} name={field} type={field === "email" ? "email" : "text"} placeholder=" "
                    autoComplete={field === "email" ? "email" : "name"} required
                    value={values[field]} onChange={handleChange}
                    onBlur={(e) => validateField(field, e.target.value)}
                    aria-invalid={errors[field] ? "true" : "false"}
                  />
                )}
                <label htmlFor={field}>{labels[field]}</label>
                <p className="field-error" role="alert">{errors[field]}</p>
              </div>
            ))}

            <button type="submit" className="btn btn-primary btn-block">
              Send Message <Icon name="arrow" />
            </button>

            <p className={`form-status ${status.text ? "show" : ""} ${status.type}`} role="status" aria-live="polite">
              {status.text}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
