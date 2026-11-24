// ============================================================
// FILE:     src/hooks/useTyping.js
// PURPOSE:  The typing effect for the hero. Give it a list of words and it
//           returns the text that should be showing RIGHT NOW.
//           (Same idea as typeLoop() in the old animations.js.)
// ============================================================
import { useEffect, useState } from "react";
import useReducedMotion from "./useReducedMotion.js";

export default function useTyping(words) {
  const reduced = useReducedMotion();
  const [text, setText] = useState(words[0]); // start with a full word (good for reduced motion)

  useEffect(() => {
    if (reduced) return; // visitor wants less motion: keep the static word

    let wordIndex = 0;   // which word we are on
    let charIndex = 0;   // how many letters are showing
    let deleting = false;
    let timer;

    function tick() {
      const word = words[wordIndex];
      if (!deleting) {
        charIndex++;
        setText(word.slice(0, charIndex)); // first n letters
        if (charIndex === word.length) {
          deleting = true;
          timer = setTimeout(tick, 1800);  // pause, then delete
          return;
        }
        timer = setTimeout(tick, 85);
      } else {
        charIndex--;
        setText(word.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length; // % wraps back to 0
          timer = setTimeout(tick, 400);
          return;
        }
        timer = setTimeout(tick, 45);
      }
    }

    setText("");
    timer = setTimeout(tick, 1400); // wait for the hero entrance
    return () => clearTimeout(timer); // cleanup: stop the loop if the component disappears
  }, [reduced, words]);

  return text;
}
