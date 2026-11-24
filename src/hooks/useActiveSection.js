// ============================================================
// FILE:     src/hooks/useActiveSection.js
// PURPOSE:  Tells the navbar which section is on screen right now.
//           Returns the id of that section, e.g. "about".
// HOW:      IntersectionObserver watches each section. A thin strip in the
//           middle of the screen counts as "current".
// ============================================================
import { useEffect, useState } from "react";

export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}
