import Image from "next/image";
import Link from "next/link";
import { hasPublicAsset } from "@/lib/public-assets";

type ProjectLink = {
  readonly label: string;
  readonly href: string;
};

type Project = {
  readonly name: string;
  readonly year: string;
  readonly description: string;
  readonly stack: readonly string[];
  readonly image: string;
  readonly imageAlt: string;
  readonly href: string;
  readonly secondaryLink?: ProjectLink;
};

const projects: readonly Project[] = [
  {
    name: "SpotifyCares Support Agent",
    year: "2026",
    description:
      "A retrieval-grounded support agent that drafts replies from vetted historical responses, with a policy engine that forces human escalation for security and payment cases. Evaluated on 150 labelled examples (36% intent accuracy vs 12% majority-class and 16% TF-IDF baselines).",
    stack: ["Python", "RAG", "Groq", "Gemini", "Streamlit"],
    image: "/images/projects/spotifycares.png",
    imageAlt: "SpotifyCares Support Agent interface",
    href: "https://github.com/nayanhasnolyf/spotifycares-support-agent",
  },
  {
    name: "Indian Shopify Finder",
    year: "2026",
    description:
      "A pipeline that discovers, verifies and extracts contact and brand data for Indian D2C Shopify stores, scaled from 303 to 2,026 verified stores.",
    stack: ["Python", "Beautiful Soup", "Multithreading"],
    image: "/images/projects/indian-shopify-finder.png",
    imageAlt: "Indian Shopify Finder pipeline",
    href: "https://github.com/nayanhasnolyf/indian-shopify-finder",
  },
  {
    name: "Spndx",
    year: "2026",
    description:
      "A finance dashboard for managing transactions, understanding spending and asking questions about financial data using natural language.",
    stack: ["React", "Node.js", "PostgreSQL", "Gemini"],
    image: "/images/projects/spndx.png",
    imageAlt: "Spndx finance dashboard interface",
    href: "https://spndx-financial-dashboard-workspace.vercel.app",
    secondaryLink: {
      label: "GitHub",
      href: "https://github.com/nayanhasnolyf/Spndx---financial-dashboard-workspace",
    },
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
        <div className="selected-work-header">
          <h2 className="selected-work-heading" id="work-heading">
            Selected <span className="heading-gradient">Work</span>
          </h2>
        </div>

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
                    aria-label={`${project.imageAlt}. Preview placeholder.`}
                  >
                    <span className="project-image-fallback-name">
                      {project.name}
                    </span>
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

                <div className="project-links">
                  <Link
                    className="project-link"
                    href={project.href}
                    aria-label={`View ${project.name} project, opens in a new tab`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="project-link-label">view project</span>
                    <span className="project-link-arrow" aria-hidden="true">
                      &#8594;
                    </span>
                  </Link>

                  {project.secondaryLink ? (
                    <Link
                      className="project-link project-link--secondary"
                      href={project.secondaryLink.href}
                      aria-label={`View ${project.name} on ${project.secondaryLink.label}, opens in a new tab`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="project-link-label">
                        {project.secondaryLink.label}
                      </span>
                      <span className="project-link-arrow" aria-hidden="true">
                        &#8594;
                      </span>
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
