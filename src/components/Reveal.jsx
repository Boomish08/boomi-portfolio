// ============================================================
// FILE:     src/components/Reveal.jsx
// PURPOSE:  Wrap anything in <Reveal> and it fades in when scrolled into view.
//           (This replaces the "scroll reveal" code from the old animations.js.)
//
// PROPS:    as        -> which HTML tag to draw ("div", "article", "li" ...)
//           index     -> position in a list; gives the staggered delay
//           direction -> "up" (default), "left" or "right"
//           className -> extra CSS classes
//           children  -> whatever is placed between <Reveal> and </Reveal>
//
// HOOKS USED:
//   useRef    -> a handle to the real HTML element
//   useState  -> remembers "visible: true/false"
//   useEffect -> starts watching the element after it appears
// ============================================================
import { useEffect, useRef, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion.js";

export default function Reveal({
  as: Tag = "div",
  index = 0,
  direction = "up",
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Old browser or reduced motion: just show it
    if (reduced || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // only animate once
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  const directionClass =
    direction === "left" ? "reveal-left" : direction === "right" ? "reveal-right" : "";

  // Build the class list: "reveal reveal-left is-visible card ..."
  const classes = ["reveal", directionClass, visible ? "is-visible" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} className={classes} style={{ "--i": index }} {...rest}>
      {children}
    </Tag>
  );
}
