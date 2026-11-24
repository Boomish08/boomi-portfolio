// ============================================================
// FILE:     src/main.jsx
// PURPOSE:  The ENTRY POINT. This is the first JavaScript file that runs.
//           It finds <div id="root"> in index.html and tells React
//           to draw our <App /> inside it.
//
// The three CSS imports are the same three files from the HTML version.
// Order matters: later files can override earlier ones.
// ============================================================
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "./styles/style.css";
import "./styles/animations.css";
import "./styles/responsive.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
