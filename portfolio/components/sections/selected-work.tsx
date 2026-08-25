import Image from "next/image";
import Link from "next/link";
import { hasPublicAsset } from "@/lib/public-assets";

const projects = [
  {
    name: "Spndx",
    year: "2026",
    description:
      "A finance dashboard for managing transactions, understanding spending and asking questions about financial data using natural language.",
    stack: ["React", "Node.js", "PostgreSQL", "Gemini"],
    image: "/images/projects/spndx.png",
    imageAlt: "Spndx finance dashboard interface",
    href: "https://spndx-financial-dashboard-workspace.vercel.app",
  },
  {
    name: "MolGenix",
    year: "2026",
    description:
      "An AI-assisted drug discovery platform built during a 36-hour hackathon with molecular similarity search, ADMET prediction and docking simulation.",
    stack: ["Python", "FastAPI", "PostgreSQL", "ChromaDB"],
    image: "/images/projects/molgenix.png",
    imageAlt: "MolGenix AI-assisted drug discovery platform interface",
    href: "https://github.com/Yash07-pixel/molgenix",
  },
] as const;

export function SelectedWork() {
  return (
    <section className="selected-work" id="work" aria-labelledby="work-heading">
      <div className="page-container">
        <h2 className="selected-work-heading" id="work-heading">
          Selected Work
        </h2>

        <div className="project-list">
          {projects.map((project) => (
            <article className="project-row" key={project.name}>
              <div className="project-image-frame">
                {hasPublicAsset(project.image) ? (
                  <Image
                    alt={project.imageAlt}
                    className="project-image"
                    fill
                    loading="lazy"
                    sizes="(max-width: 720px) calc(100vw - 24px), (max-width: 959px) calc(100vw - 32px), (max-width: 1440px) 64vw, 920px"
                    src={project.image}
                  />
                ) : (
                  <div
                    className="project-image-fallback"
                    role="img"
                    aria-label={`${project.imageAlt}. Preview image unavailable.`}
                  >
                    Preview unavailable
                  </div>
                )}
              </div>

              <div className="project-details">
                <div className="project-heading-row">
                  <h3 className="project-name">{project.name}</h3>
                  <time className="project-year" dateTime={project.year}>
                    {project.year}
                  </time>
                </div>

                <p className="project-description">{project.description}</p>

                <p className="project-stack" aria-label="Technologies used">
                  {project.stack.join(" / ")}
                </p>

                <Link
                  className="project-link"
                  href={project.href}
                  aria-label={`View ${project.name} project, opens in a new tab`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>view project</span>
                  <span className="project-link-arrow" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
