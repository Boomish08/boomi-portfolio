// ============================================================
// FILE:     src/components/ScrollProgress.jsx
// PURPOSE:  The thin gold bar at the very top that fills as you scroll.
// NOTE:     We use useRef and change the bar's style directly instead of
//           useState. Scroll fires many times per second, and changing state
//           each time would re-draw the component constantly.
// ============================================================
import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = total > 0 ? window.scrollY / total : 0; // 0 to 1
      barRef.current.style.transform = `scaleX(${ratio})`;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="scroll-progress" ref={barRef} aria-hidden="true"></div>;
}
