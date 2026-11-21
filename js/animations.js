/* ============================================================
   FILE:     js/animations.js
   PURPOSE:  1) Scroll reveal  — elements fade in when you scroll to them
             2) Typing effect  — the rotating words in the hero
             3) Gold dust      — light floating particles on a <canvas>

   Needs: main.js to have run first (it creates the cards we reveal).
   Works with: css/animations.css (the .reveal / .is-visible classes)

   Everything respects "prefers-reduced-motion": if the visitor asked
   their device to reduce motion, we skip the moving parts.
   ============================================================ */

// Did the visitor ask for less motion? (true / false)
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/* ------------------------------------------------------------
   1) SCROLL REVEAL
   IntersectionObserver tells us when an element enters the screen.
   That is far lighter than listening to every scroll event.
   ------------------------------------------------------------ */
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");   // CSS does the animating
        observer.unobserve(entry.target);           // only animate once
      }
    });
  }, {
    threshold: 0.12,                    // fire when 12% of the element is visible
    rootMargin: "0px 0px -40px 0px"     // ...a little before it reaches the bottom edge
  });

  revealItems.forEach(function (item) { revealObserver.observe(item); });
} else {
  // Old browser or reduced motion: just show everything
  revealItems.forEach(function (item) { item.classList.add("is-visible"); });
}


/* ------------------------------------------------------------
   2) TYPING EFFECT
   Types a word letter by letter, pauses, deletes it, then types the next.
   setTimeout() = "run this function again after N milliseconds".
   ------------------------------------------------------------ */
const typingEl = document.getElementById("typingText");
const words = ["Full-Stack Developer", "AI & ML Enthusiast", "Database Learner", "Quiet Builder"];

let wordIndex = 0;     // which word we are on
let charIndex = 0;     // how many letters are showing
let deleting  = false; // typing or deleting?

function typeLoop() {
  const word = words[wordIndex];

  if (!deleting) {
    charIndex++;                                        // add a letter
    typingEl.textContent = word.slice(0, charIndex);    // slice(0, n) = first n letters
    if (charIndex === word.length) {                    // finished the word -> pause, then delete
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 85);
  } else {
    charIndex--;                                        // remove a letter
    typingEl.textContent = word.slice(0, charIndex);
    if (charIndex === 0) {                              // finished deleting -> next word
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;       // % wraps back to 0 after the last word
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 45);
  }
}

if (typingEl && !reduceMotion) {
  typingEl.textContent = "";
  setTimeout(typeLoop, 1400);          // wait for the hero entrance to finish
}
// With reduced motion, the HTML already shows "Full-Stack Developer" and nothing changes.


/* ------------------------------------------------------------
   3) GOLD DUST PARTICLES
   A <canvas> is a blank drawing board. 30–50 tiny gold dots drift upward.
   requestAnimationFrame() asks the browser to call us before each screen
   refresh (~60 times a second). We pause when the tab is hidden to save battery.
   ------------------------------------------------------------ */
const canvas = document.getElementById("particles");

if (canvas && !reduceMotion) {
  const ctx = canvas.getContext("2d");
  let particles = [];
  let width, height, running = true;

  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);   // sharp on retina, but capped
    width  = window.innerWidth;
    height = window.innerHeight;
    canvas.width  = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    // Fewer particles on small screens = smoother on phones
    const count = width < 720 ? 22 : 46;
    particles = [];
    for (let i = 0; i < count; i++) particles.push(makeParticle(true));
  }

  function makeParticle(randomY) {
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : height + 10,
      size: Math.random() * 1.6 + 0.4,
      speed: Math.random() * 0.25 + 0.08,
      drift: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.45 + 0.15
    };
  }

  function drawFrame() {
    if (!running) return;
    ctx.clearRect(0, 0, width, height);

    particles.forEach(function (p, i) {
      p.y -= p.speed;           // move up
      p.x += p.drift;           // wiggle sideways a little
      if (p.y < -10) particles[i] = makeParticle(false);   // left the top -> respawn at the bottom

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(212, 175, 55, " + p.alpha + ")";
      ctx.fill();
    });

    requestAnimationFrame(drawFrame);
  }

  resizeCanvas();
  drawFrame();

  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);                       // "debounce": wait until resizing stops
    resizeTimer = setTimeout(resizeCanvas, 200);
  });

  document.addEventListener("visibilitychange", function () {
    running = !document.hidden;
    if (running) drawFrame();
  });
}
