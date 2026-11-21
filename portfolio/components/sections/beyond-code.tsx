import Image from "next/image";
import { NccAchievement } from "@/components/sections/ncc-achievement";
import { Divider } from "@/components/ui/divider";
import { hasPublicAsset } from "@/lib/public-assets";

const experiences = [
  {
    title: "NCC 'C' Certificate",
    metadataPrefix: "",
    metadataAccent: "2023 — 2026",
    description:
      "Three years of leadership, discipline, team coordination and community service.",
    image: "/images/achievements/ncc.jpeg",
    imageAlt: "NCC cadets posing together in uniform",
    imageClassName: "achievement-image--ncc",
  },
  {
    title: "Under 25 Summit",
    metadataPrefix: "Core Team · ",
    metadataAccent: "2026",
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
        <Divider />

        <div className="beyond-code-header">
          <h2 className="beyond-code-heading" id="beyond-code-heading">
            Beyond the <span className="heading-gradient">Code</span>
          </h2>
          <p className="beyond-code-intro">
            Leadership, discipline and building communities away from the
            keyboard.
          </p>
        </div>

        <div className="achievement-grid achievement-grid--two-col">
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
                    sizes="(max-width: 600px) calc(100vw - 24px), (max-width: 1440px) 48vw, 680px"
                    src={experience.image}
                  />
                </div>

                <figcaption className="achievement-caption">
                  <h3 className="achievement-title">{experience.title}</h3>
                  <p className="achievement-metadata">
                    {experience.metadataPrefix}
                    <span className="meta-accent">
                      {experience.metadataAccent}
                    </span>
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
