// ============================================================
// FILE:     src/App.jsx
// PURPOSE:  The ROOT COMPONENT. It does not contain details — it just
//           puts all the other components in order, like a table of contents.
//
// REACT IDEA:  A page = a tree of small components.
//              <App> contains <Navbar>, <Hero>, <About> ... each in its own file.
// ============================================================
import Sprite from "./components/Sprite.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Cursor from "./components/Cursor.jsx";
import Particles from "./components/Particles.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import MottoBand from "./components/MottoBand.jsx";
import About from "./components/About.jsx";
import Education from "./components/Education.jsx";
import Skills from "./components/Skills.jsx";
import Journey from "./components/Journey.jsx";
import Projects from "./components/Projects.jsx";
import Certificates from "./components/Certificates.jsx";
import Interests from "./components/Interests.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";

export default function App() {
  return (
    <>
      <Sprite />
      <a className="skip-link" href="#main">Skip to main content</a>
      <ScrollProgress />
      <Cursor />
      <Particles />
      <Navbar />

      <main id="main">
        <Hero />
        <MottoBand />
        <About />
        <Education />
        <Skills />
        <Journey />
        <Projects />
        <Certificates />
        <Interests />
        <Contact />
      </main>

      <Footer />
      <MusicPlayer />
    </>
  );
}
