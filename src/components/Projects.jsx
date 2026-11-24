// ============================================================
// FILE:     src/components/Projects.jsx
// PURPOSE:  Project cards built from src/data/projects.js, plus one clearly
//           labelled "Placeholder" card for future projects.
// ============================================================
import Reveal from "./Reveal.jsx";
import SectionHead from "./SectionHead.jsx";
import Icon from "./Icon.jsx";
import { projects } from "../data/projects.js";

function ProjectCard({ project, index }) {
  return (
    <Reveal as="article" index={index} className="card project-card">
      <div className="project-thumb">
        <span className="project-status">{project.status}</span>
        <img src={project.image} alt={`Screenshot of the ${project.title} website`} loading="lazy" />
      </div>

      <div className="project-body">
        <span className="project-num">PROJECT {project.number}</span>
        <h3>{project.title}</h3>
        <p className="project-type">{project.type}</p>
        <p className="project-desc">{project.description}</p>

        <ul className="muted small">
          {project.details.map((d) => <li key={d}>• {d}</li>)}
        </ul>

        <p className="tech-label">Built with</p>
        <ul className="tech-list">
          {project.tech.map((t) => <li key={t}>{t}</li>)}
        </ul>

        <p className="tech-label">Coming next</p>
        <ul className="tech-list future">
          {project.future.map((t) => <li key={t}>{t}</li>)}
        </ul>

        <div className="project-links">
          <a className="btn btn-outline" href={project.github} target="_blank" rel="noopener noreferrer">
            <Icon name="github" /> GitHub
          </a>
          {/* If there is a live link show a real button, otherwise a disabled one */}
          {project.live ? (
            <a className="btn btn-primary" href={project.live} target="_blank" rel="noopener noreferrer">
              Live Demo <Icon name="external" />
            </a>
          ) : (
            <span className="btn btn-outline" aria-disabled="true">Live demo — after deployment</span>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section className="section section-anchor" id="projects" aria-labelledby="projectsTitle">
      <div className="container">
        <SectionHead num="05" id="projectsTitle" title="Projects" />

        <div className="projects-grid">
          {projects.map((p, i) => <ProjectCard key={p.number} project={p} index={i} />)}

          <Reveal as="article" index={projects.length} className="card project-card project-placeholder">
            <span className="plus" aria-hidden="true">+</span>
            <span className="badge badge-soft">Placeholder</span>
            <h3>Next Project</h3>
            <p>A new project will appear here once I finish building it.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
