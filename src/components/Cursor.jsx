// ============================================================
// FILE:     src/components/Cursor.jsx
// PURPOSE:  Subtle gold cursor for desktop: a dot that follows the mouse
//           instantly + a ring that follows with a smooth delay.
//
// SAFETY RULES:
//   - Only on devices with a real mouse  (hover: hover) and (pointer: fine)
//   - Never on touch screens, never when reduced motion is requested
//   - pointer-events: none (in CSS) means it can never block a click
// ============================================================
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const wantsLessMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasMouse || wantsLessMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    document.body.classList.add("custom-cursor-on"); // CSS now hides the normal arrow

    let mouseX = 0, mouseY = 0; // where the mouse really is
    let ringX = 0, ringY = 0;   // where the ring currently is (it lags behind)
    let frameId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      dot.classList.add("visible");
      ring.classList.add("visible");
    };

    // The ring moves 15% of the remaining distance each frame = smooth easing
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      frameId = requestAnimationFrame(animateRing);
    };
    animateRing();

    const clickable = "a, button, input, textarea, label, [role='button'], .card";
    const onOver = (e) => { if (e.target.closest(clickable)) ring.classList.add("hover"); };
    const onOut = (e) => { if (e.target.closest(clickable)) ring.classList.remove("hover"); };
    const onDown = () => ring.classList.add("down");
    const onUp = () => ring.classList.remove("down");
    const onLeave = () => { dot.classList.remove("visible"); ring.classList.remove("visible"); };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);

    // CLEANUP: undo everything if the component is removed
    return () => {
      cancelAnimationFrame(frameId);
      document.body.classList.remove("custom-cursor-on");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true"></div>
      <div className="cursor-ring" ref={ringRef} aria-hidden="true"></div>
    </>
  );
}
