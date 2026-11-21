/* ============================================================
   FILE:     js/cursor.js
   PURPOSE:  A subtle gold cursor for desktop: a small dot that follows the
             mouse instantly + a ring that follows with a smooth delay.
             The ring grows over buttons and links.

   SAFETY RULES (from the project brief):
     - Only on devices with a real mouse  -> (hover: hover) and (pointer: fine)
     - Never on phones / tablets / touchscreens
     - Never when the visitor asked for reduced motion
     - The cursor elements have pointer-events: none (see style.css),
       so they can never block a click.
   ============================================================ */

const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const wantsLessMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (hasMouse && !wantsLessMotion) {
  const dot  = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");

  document.body.classList.add("custom-cursor-on");   // CSS now hides the normal arrow

  let mouseX = 0, mouseY = 0;      // where the mouse really is
  let ringX  = 0, ringY  = 0;      // where the ring currently is (it lags behind)

  document.addEventListener("mousemove", function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    // The dot jumps straight to the mouse
    dot.style.transform = "translate(" + mouseX + "px, " + mouseY + "px)";
    dot.classList.add("visible");
    ring.classList.add("visible");
  });

  // The ring moves 15% of the remaining distance every frame = smooth "easing"
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = "translate(" + ringX + "px, " + ringY + "px)";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hide when the mouse leaves the window
  document.addEventListener("mouseleave", function () {
    dot.classList.remove("visible");
    ring.classList.remove("visible");
  });

  // Grow the ring over anything clickable.
  // mouseover/mouseout "bubble", so one listener on the document covers every element.
  const clickable = "a, button, input, textarea, label, [role='button'], .card";

  document.addEventListener("mouseover", function (event) {
    if (event.target.closest(clickable)) ring.classList.add("hover");
  });
  document.addEventListener("mouseout", function (event) {
    if (event.target.closest(clickable)) ring.classList.remove("hover");
  });

  // Shrink slightly while the button is held down
  document.addEventListener("mousedown", function () { ring.classList.add("down"); });
  document.addEventListener("mouseup",   function () { ring.classList.remove("down"); });
}
