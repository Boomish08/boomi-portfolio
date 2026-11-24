// ============================================================
// FILE:     src/components/Particles.jsx
// PURPOSE:  Gold dust drifting upward, drawn on a <canvas>.
//           30-50 tiny dots on desktop, fewer on phones. Paused when the
//           tab is hidden. Not drawn at all with reduced motion.
//
// HOOKS:    useRef for the canvas, useEffect to start the animation and
//           (very important) to STOP it again in the cleanup function.
// ============================================================
import { useEffect, useRef } from "react";

export default function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let width = 0, height = 0;
    let running = true;
    let frameId;
    let resizeTimer;

    function makeParticle(randomY) {
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : height + 10,
        size: Math.random() * 1.6 + 0.4,
        speed: Math.random() * 0.25 + 0.08,
        drift: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.45 + 0.15,
      };
    }

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2); // sharp but capped
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = width < 720 ? 22 : 46; // fewer particles on phones
      particles = [];
      for (let i = 0; i < count; i++) particles.push(makeParticle(true));
    }

    function drawFrame() {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p, i) => {
        p.y -= p.speed; // move up
        p.x += p.drift; // wiggle sideways
        if (p.y < -10) particles[i] = makeParticle(false); // respawn at the bottom
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        ctx.fill();
      });
      frameId = requestAnimationFrame(drawFrame);
    }

    const onResize = () => {
      clearTimeout(resizeTimer); // "debounce": wait until resizing stops
      resizeTimer = setTimeout(resize, 200);
    };
    const onVisibility = () => {
      running = !document.hidden;
      if (running) drawFrame();
    };

    resize();
    drawFrame();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frameId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas id="particles" ref={canvasRef} aria-hidden="true"></canvas>;
}
