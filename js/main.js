/* ============================================================
   FILE:     js/main.js
   PURPOSE:  1) Holds the portfolio DATA (skills, certificates, projects)
             2) Builds the cards on the page from that data
             3) Controls the certificate pop-up (modal)
             4) Handles the contact form + copy-email button

   WHY DATA IN ARRAYS?
     Instead of copy-pasting 8 certificate cards in HTML, we describe each
     certificate ONCE as an object, put the objects in an array, and let a
     loop build the cards. To add a new certificate or project later, you
     only add ONE new object below — no HTML changes needed.

   JAVASCRIPT CONCEPTS USED HERE:
     const / let        variables           (const = never reassigned)
     [ ... ]            array               (an ordered list)
     { key: value }     object              (a labelled bundle of info)
     .map(), .forEach() loop over an array
     `text ${var}`      template literal    (a string with variables inside)
     document.getElementById()   find an element on the page (DOM)
     addEventListener()          react to clicks, typing, submits
   ============================================================ */


/* ------------------------------------------------------------
   PART 1 — DATA
   ------------------------------------------------------------ */

/* Skills I have studied. level: 1 = Foundation, 2 = Practising, 3 = Hands-on
   (Edit these honestly as you grow — never exaggerate.) */
const skills = [
  { name: "HTML",            level: 2, note: "Page structure and semantic tags." },
  { name: "Python",          level: 2, note: "Core programming and problem solving." },
  { name: "Java",            level: 1, note: "Object-oriented programming basics." },
  { name: "SQL",             level: 3, note: "Querying and managing data (internship practice)." },
  { name: "Oracle Database", level: 3, note: "Database design and data management." }
];

const levelNames = { 1: "Foundation", 2: "Practising", 3: "Hands-on" };

/* Things I am learning right now */
const learning = [
  { name: "JavaScript", note: "Making pages interactive — this portfolio is my practice ground." },
  { name: "React.js",   note: "Building reusable components for the next version." },
  { name: "Node.js",    note: "Running JavaScript on the server side." },
  { name: "MongoDB",    note: "Storing data in a NoSQL database." },
  { name: "AI & ML",    note: "Strengthening Python and machine-learning fundamentals." }
];

/* Certificates.
   To show a real certificate image later:
     1. Put the picture in  assets/certificates/
     2. Set  image: "assets/certificates/mern-stack.jpg"  on that certificate.
   Until then the pop-up shows a clearly-labelled placeholder. */
const certificates = [
  {
    id: "mern-stack",
    title: "Certificate Program in MERN Stack",
    issuer: "FutureSkills Prime (MeitY–NASSCOM)",
    achievement: "Gold",
    score: "91%",
    date: "01 September 2026",
    image: "assets/certificates/mern-stack.jpg"
  },
  {
    id: "react-js",
    title: "Certificate Program in React JS",
    issuer: "FutureSkills Prime (MeitY–NASSCOM)",
    achievement: "Gold",
    score: "86%",
    date: "01 September 2026",
    image: "assets/certificates/react-js.jpg"
  },
  {
    id: "oracle-ai-database",
    title: "Oracle AI Database Certified Foundations Associate",
    issuer: "Oracle University",
    date: "01 September 2026",
    image: "assets/certificates/oracle-ai-database.jpg"
  },
  {
    id: "front-end-development",
    title: "Front End Development",
    issuer: "Tamil Nadu Skill Development Corporation",
    program: "Naan Mudhalvan Scheme",
    conductedBy: "Oracle",
    date: "27 June 2026",
    image: "assets/certificates/front-end-development.jpg"
  },
  {
    id: "yuva-ai",
    title: "YUVA AI For All",
    issuer: "TCS iON",
    offeredBy: "IndiaAI",
    date: "23 June 2026",
    image: "assets/certificates/yuva-ai.jpg"
  },
  {
    id: "fullstack-masterclass",
    title: "30 Days MasterClass in Full Stack Development",
    issuer: "NoviTech R&D Private Limited",
    duration: "18 August – 25 September 2026",
    image: "assets/certificates/fullstack-masterclass.jpg"
  },
  {
    id: "uiux-masterclass",
    title: "30 Days MasterClass in UI/UX Design",
    issuer: "NoviTech R&D Private Limited",
    duration: "05 August – 11 September 2026",
    image: "assets/certificates/uiux-masterclass.jpg"
  }
];

/* Projects. Add a new object here when you finish a new project.
   Leave  live: ""  until the project is deployed — the button will show as "coming soon". */
const projects = [
  {
    number: "01",
    title: "BOOMI Developer Portfolio",
    type: "Personal Portfolio Website",
    status: "In Development",
    description: "A personal portfolio showcasing my education, skills, certificates, projects and learning journey. It is the main project of my Full-Stack MERN learning path and grows as I learn.",
    details: [
      "Built with separate HTML, CSS and JavaScript files",
      "Responsive layout with a mobile menu",
      "Certificate gallery, contact form and music player"
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    future: ["React", "Node.js", "Express.js", "MongoDB"],
    image: "assets/images/project-portfolio.jpg",
    github: "https://github.com/Boomish08/boomi-portfolio",
    live: ""
  }
];


/* ------------------------------------------------------------
   PART 2 — BUILD THE CARDS
   Each function loops over an array and returns HTML text.
   ------------------------------------------------------------ */

const skillsGrid   = document.getElementById("skillsGrid");
const learningGrid = document.getElementById("learningGrid");
const projectsGrid = document.getElementById("projectsGrid");
const certGrid     = document.getElementById("certGrid");

/* ----- Skills ----- */
function renderSkills() {
  skillsGrid.innerHTML = skills.map(function (skill, index) {
    // Make 3 little bars; the first "level" bars are gold ("on")
    let pips = "";
    for (let i = 1; i <= 3; i++) {
      pips += `<i class="${i <= skill.level ? "on" : ""}"></i>`;
    }
    return `
      <article class="card skill-card reveal" style="--i:${index}">
        <div class="skill-top">
          <h4 class="skill-name">${skill.name}</h4>
          <span class="pips" aria-hidden="true">${pips}</span>
        </div>
        <p class="skill-level">${levelNames[skill.level]}</p>
        <p class="skill-note">${skill.note}</p>
      </article>`;
  }).join("");
}

/* ----- Currently learning ----- */
function renderLearning() {
  learningGrid.innerHTML = learning.map(function (item, index) {
    return `
      <article class="card learn-card reveal" style="--i:${index}">
        <span class="learn-status"><span class="learn-dot" aria-hidden="true"></span>In progress</span>
        <h4>${item.name}</h4>
        <p class="skill-note">${item.note}</p>
      </article>`;
  }).join("");
}

/* ----- Projects ----- */
function renderProjects() {
  let html = projects.map(function (p, index) {
    const techItems   = p.tech.map(function (t) { return `<li>${t}</li>`; }).join("");
    const futureItems = p.future.map(function (t) { return `<li>${t}</li>`; }).join("");
    const detailItems = p.details.map(function (d) { return `<li>• ${d}</li>`; }).join("");

    // Live demo button: real link if we have one, otherwise a disabled "coming soon" button
    const liveButton = p.live
      ? `<a class="btn btn-primary" href="${p.live}" target="_blank" rel="noopener noreferrer">Live Demo <svg class="icon"><use href="#i-external"></use></svg></a>`
      : `<span class="btn btn-outline" aria-disabled="true">Live demo — after deployment</span>`;

    return `
      <article class="card project-card reveal" style="--i:${index}">
        <div class="project-thumb">
          <span class="project-status">${p.status}</span>
          <img src="${p.image}" alt="Screenshot of the ${p.title} website" loading="lazy" />
        </div>
        <div class="project-body">
          <span class="project-num">PROJECT ${p.number}</span>
          <h3>${p.title}</h3>
          <p class="project-type">${p.type}</p>
          <p class="project-desc">${p.description}</p>
          <ul class="muted small">${detailItems}</ul>
          <p class="tech-label">Built with</p>
          <ul class="tech-list">${techItems}</ul>
          <p class="tech-label">Coming next</p>
          <ul class="tech-list future">${futureItems}</ul>
          <div class="project-links">
            <a class="btn btn-outline" href="${p.github}" target="_blank" rel="noopener noreferrer"><svg class="icon"><use href="#i-github"></use></svg> GitHub</a>
            ${liveButton}
          </div>
        </div>
      </article>`;
  }).join("");

  // A clearly labelled placeholder card so the layout shows where future projects will go
  html += `
    <article class="card project-card project-placeholder reveal" style="--i:${projects.length}">
      <span class="plus" aria-hidden="true">+</span>
      <span class="badge badge-soft">Placeholder</span>
      <h3>Next Project</h3>
      <p>A new project will appear here once I finish building it.</p>
    </article>`;

  projectsGrid.innerHTML = html;
}

/* ----- Certificates ----- */
function renderCertificates() {
  certGrid.innerHTML = certificates.map(function (c, index) {
    // Some certificates have a single date, some a duration
    const when = c.date ? c.date : c.duration;
    let badges = "";
    if (c.achievement) badges += `<span class="badge badge-gold">${c.achievement}</span>`;
    if (c.score)       badges += `<span class="badge">Score ${c.score}</span>`;
    if (c.validUntil)  badges += `<span class="badge">Valid until ${c.validUntil}</span>`;

    return `
      <article class="card cert-card reveal" style="--i:${index % 4}">
        <span class="cert-icon"><svg class="icon"><use href="#i-award"></use></svg></span>
        <p class="cert-issuer">${c.issuer}</p>
        <h3>${c.title}</h3>
        <p class="cert-date">${when}</p>
        ${badges ? `<div class="cert-badges">${badges}</div>` : ""}
        <button type="button" class="cert-btn" data-id="${c.id}">View Certificate <svg class="icon icon-sm"><use href="#i-arrow"></use></svg></button>
      </article>`;
  }).join("");
}

renderSkills();
renderLearning();
renderProjects();
renderCertificates();


/* ------------------------------------------------------------
   PART 3 — CERTIFICATE MODAL (pop-up)
   We use the built-in HTML <dialog> element. It already handles:
   the dark backdrop, the Esc key, and keeping keyboard focus inside.
   ------------------------------------------------------------ */

const certModal   = document.getElementById("certModal");
const certPreview = document.getElementById("certPreview");
const certTitle   = document.getElementById("certModalTitle");
const certIssuer  = document.getElementById("certModalIssuer");
const certDetails = document.getElementById("certModalDetails");

function openCertificate(id) {
  // find() returns the first certificate whose id matches
  const c = certificates.find(function (item) { return item.id === id; });
  if (!c) return;

  certTitle.textContent  = c.title;
  certIssuer.textContent = c.issuer;

  // Rows of details: [label, value]. Rows with no value are skipped.
  const rows = [
    ["Program",      c.program],
    ["Conducted by", c.conductedBy],
    ["Offered by",   c.offeredBy],
    ["Achievement",  c.achievement],
    ["Score",        c.score],
    ["Date",         c.date],
    ["Duration",     c.duration],
    ["Valid until",  c.validUntil]
  ];
  certDetails.innerHTML = rows
    .filter(function (row) { return row[1]; })
    .map(function (row) { return `<div><dt>${row[0]}</dt><dd>${row[1]}</dd></div>`; })
    .join("");

  // Show the real image if one was added, else a labelled placeholder
  if (c.image) {
    certPreview.innerHTML = `<img src="${c.image}" alt="Certificate: ${c.title}" />`;
  } else {
    certPreview.innerHTML = `
      <div class="preview-placeholder">
        <svg class="icon"><use href="#i-award"></use></svg>
        <p>Certificate image placeholder.<br />Add the picture to <code>assets/certificates/</code> and set <code>image</code> in <code>js/main.js</code>.</p>
      </div>`;
  }

  certModal.showModal();                    // opens the dialog
  document.body.style.overflow = "hidden";  // stop the page scrolling behind it
}

// One listener on the whole grid ("event delegation") — works for every button
certGrid.addEventListener("click", function (event) {
  const button = event.target.closest(".cert-btn");
  if (button) openCertificate(button.dataset.id);   // data-id="..." in the HTML
});

document.getElementById("certModalClose").addEventListener("click", function () { certModal.close(); });

// Click on the dark area outside the box closes it
certModal.addEventListener("click", function (event) {
  if (event.target === certModal) certModal.close();
});

// Whenever it closes (button, Esc, backdrop) give the page its scrolling back
certModal.addEventListener("close", function () { document.body.style.overflow = ""; });


/* ------------------------------------------------------------
   PART 4 — COPY EMAIL BUTTON
   ------------------------------------------------------------ */
const copyBtn   = document.getElementById("copyEmailBtn");
const copyLabel = document.getElementById("copyLabel");
const myEmail   = "minecrusher82@gmail.com";

function showCopied() {
  copyLabel.textContent = "Copied!";
  copyBtn.classList.add("copied");
  setTimeout(function () {                       // after 2 seconds, go back to normal
    copyLabel.textContent = "Copy";
    copyBtn.classList.remove("copied");
  }, 2000);
}

copyBtn.addEventListener("click", function () {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(myEmail).then(showCopied).catch(function () {});
  } else {
    // Old-browser fallback: select a hidden text box and copy from it
    const temp = document.createElement("textarea");
    temp.value = myEmail;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
    showCopied();
  }
});


/* ------------------------------------------------------------
   PART 5 — CONTACT FORM (front-end validation only)
   Later, in the MERN phase, the submit step will send the data to a
   Node.js/Express API and save it in MongoDB. Nothing secret goes here.
   ------------------------------------------------------------ */
const form       = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

// Each rule returns an error message, or "" when the field is fine
const rules = {
  name: function (value) {
    if (value.trim().length < 2) return "Please enter your name (at least 2 letters).";
    return "";
  },
  email: function (value) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;   // text @ text . text
    if (!pattern.test(value.trim())) return "Please enter a valid email, like name@example.com.";
    return "";
  },
  message: function (value) {
    if (value.trim().length < 10) return "Your message should be at least 10 characters.";
    return "";
  }
};

function validateField(fieldName) {
  const input = form.elements[fieldName];
  const error = rules[fieldName](input.value);
  const wrapper = input.parentElement;            // the <div class="field">
  document.getElementById(fieldName + "Error").textContent = error;
  wrapper.classList.toggle("invalid", error !== "");
  input.setAttribute("aria-invalid", error !== "" ? "true" : "false");
  return error === "";
}

// Check a field when the user leaves it, and re-check while typing if it was wrong
Object.keys(rules).forEach(function (fieldName) {
  const input = form.elements[fieldName];
  input.addEventListener("blur", function () { validateField(fieldName); });
  input.addEventListener("input", function () {
    if (input.parentElement.classList.contains("invalid")) validateField(fieldName);
  });
});

function showStatus(type, text) {
  formStatus.textContent = text;
  formStatus.className = "form-status show " + type;   // type is "success" or "error"
}

form.addEventListener("submit", function (event) {
  event.preventDefault();               // stop the browser's normal page-reload submit

  // Validate ALL fields (don't stop at the first wrong one)
  const results = Object.keys(rules).map(validateField);
  if (results.includes(false)) {
    showStatus("error", "Please fix the highlighted fields and try again.");
    return;
  }

  const name    = form.elements.name.value.trim();
  const email   = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  showStatus("success", "Thank you, " + name + "! Opening your email app so you can send this message.");

  // Until the backend exists, open the visitor's email app with the message filled in
  const subject = encodeURIComponent("Portfolio message from " + name);
  const body    = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
  window.location.href = "mailto:" + myEmail + "?subject=" + subject + "&body=" + body;

  form.reset();
});


/* ------------------------------------------------------------
   PART 6 — SMALL EXTRAS
   ------------------------------------------------------------ */
document.getElementById("year").textContent = new Date().getFullYear();
