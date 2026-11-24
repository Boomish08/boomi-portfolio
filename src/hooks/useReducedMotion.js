// ============================================================
// FILE:     src/hooks/useReducedMotion.js
// PURPOSE:  A custom HOOK. It answers one question: "Did the visitor ask
//           their device to reduce motion?"  Returns true or false.
//
// REACT IDEA:  A hook is a function whose name starts with "use".
//              Custom hooks let many components share the same logic.
// ============================================================
import { useEffect, useState } from "react";

export default function useReducedMotion() {
  // useState keeps a value that React remembers between renders.
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // useEffect runs code AFTER the component appears on screen.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update); // cleanup
  }, []);

  return reduced;
}
