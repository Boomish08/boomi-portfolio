// ============================================================
// FILE:     src/components/Icon.jsx
// PURPOSE:  Shows one icon from the Sprite.  Usage:  <Icon name="github" />
// PROPS:    name      -> which icon (matches id="i-<name>" in Sprite.jsx)
//           className -> optional extra CSS classes (e.g. "icon icon-lg")
//
// REACT IDEA:  PROPS are the inputs of a component, like function arguments.
// ============================================================
export default function Icon({ name, className = "icon" }) {
  return (
    <svg className={className} aria-hidden="true" focusable="false">
      <use href={`#i-${name}`} />
    </svg>
  );
}
