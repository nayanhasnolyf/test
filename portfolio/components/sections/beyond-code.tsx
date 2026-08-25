import Image from "next/image";
import { NccAchievement } from "@/components/sections/ncc-achievement";
import { hasPublicAsset } from "@/lib/public-assets";

const experiences = [
  {
    title: "Hack SurgeX",
    metadata: "Runner-up · Mar 2026",
    description:
      "Secured 2nd place at a national hackathon by building MolGenix within 36 hours.",
    image: "/images/achievements/hacksurgex.jpg",
    imageAlt: "Hack SurgeX team receiving their runner-up certificate",
    imageClassName: "achievement-image--hacksurgex",
  },
  {
    title: "Athernex",
    metadata: "4th place out of 400+ teams · Apr 2026",
    description: "Ranked 4th at a national hackathon across India.",
    image: "/images/achievements/athernex.jpg",
    imageAlt: "Athernex hackathon participants gathered on a sports field",
    imageClassName: "achievement-image--athernex",
  },
  {
    title: "NCC 'C' Certificate",
    metadata: "2023 — 2026",
    description:
      "Three years of leadership, discipline, team coordination and community service.",
    image: "/images/achievements/ncc.jpg",
    imageAlt: "NCC cadets posing together in uniform",
    imageClassName: "achievement-image--ncc",
  },
  {
    title: "Under 25 Summit",
    metadata: "Core Team · 2026",
    description:
      "Sales lead and marketing coordinator for a 550+ attendee youth festival.",
    image: "/images/achievements/under25.jpg",
    imageAlt: "Under 25 Summit core team gathered on stage",
    imageClassName: "achievement-image--under25",
  },
] as const;

export function BeyondCode() {
  return (
    <section
      className="beyond-code"
      id="beyond-code"
      aria-labelledby="beyond-code-heading"
    >
      <div className="page-container">
        <div className="beyond-code-header">
          <h2 className="beyond-code-heading" id="beyond-code-heading">
            Beyond the Code
          </h2>
        </div>

        <div className="achievement-grid">
          {experiences.map((experience) =>
            experience.title === "NCC 'C' Certificate" ? (
              <NccAchievement
                certificateAvailable={hasPublicAsset(
                  "/images/achievements/ncc-certificate.jpg",
                )}
                key={experience.title}
              />
            ) : (
              <figure className="achievement" key={experience.title}>
                <div className="achievement-image-frame">
                  <Image
                    alt={experience.imageAlt}
                    className={`achievement-image ${experience.imageClassName}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 600px) calc(100vw - 24px), (max-width: 1100px) 48vw, 24vw"
                    src={experience.image}
                  />
                </div>

                <figcaption className="achievement-caption">
                  <h3 className="achievement-title">{experience.title}</h3>
                  <p className="achievement-metadata">
                    {experience.metadata}
                  </p>
                  <p className="achievement-description">
                    {experience.description}
                  </p>
                </figcaption>
              </figure>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
