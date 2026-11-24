// vite.config.js — settings for Vite, the tool that runs and builds our React app.
// "plugin-react" teaches Vite how to read JSX (HTML-like code inside JavaScript).
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
