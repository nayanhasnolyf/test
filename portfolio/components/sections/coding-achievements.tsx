import Image from "next/image";
import { HacksurgexAchievement } from "@/components/sections/hacksurgex-achievement";
import { Divider } from "@/components/ui/divider";
import { hasPublicAsset } from "@/lib/public-assets";

const codingAchievements = [
  {
    title: "Hack SurgeX",
    metadataPrefix: "Runner-up · ",
    metadataAccent: "Mar 2026",
    description:
      "Secured 2nd place at a national hackathon by building MolGenix within 36 hours.",
    image: "/images/achievements/hacksurgex.jpg",
    imageAlt: "Hack SurgeX team receiving their runner-up certificate",
    imageClassName: "achievement-image--hacksurgex",
  },
  {
    title: "Athernex",
    metadataPrefix: "",
    metadataAccent: "4th place",
    metadataMiddle: " out of 400+ teams · ",
    metadataEndAccent: "Apr 2026",
    description: "Ranked 4th at a national hackathon across India.",
    image: "/images/achievements/athernex.jpg",
    imageAlt: "Athernex hackathon participants gathered on a sports field",
    imageClassName: "achievement-image--athernex",
  },
] as const;

export function CodingAchievements() {
  return (
    <section
      className="coding-achievements"
      id="achievements"
      aria-labelledby="achievements-heading"
    >
      <div className="page-container">
        <Divider />

        <div className="coding-achievements-header">
          <h2 className="coding-achievements-heading" id="achievements-heading">
            <span className="heading-gradient">Hackathons</span>
          </h2>
        </div>

        <div className="achievement-grid achievement-grid--two-col">
          {codingAchievements.map((achievement) =>
            achievement.title === "Hack SurgeX" ? (
              <HacksurgexAchievement
                certificateAvailable={hasPublicAsset(
                  "/images/achievements/hacksurgex-certificate.jpeg",
                )}
                key={achievement.title}
              />
            ) : (
              <figure className="achievement" key={achievement.title}>
                <div className="achievement-image-frame">
                  <Image
                    alt={achievement.imageAlt}
                    className={`achievement-image ${achievement.imageClassName}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 600px) calc(100vw - 24px), (max-width: 1440px) 48vw, 680px"
                    src={achievement.image}
                  />
                </div>

                <figcaption className="achievement-caption">
                  <h3 className="achievement-title">{achievement.title}</h3>
                  <p className="achievement-metadata">
                    {achievement.metadataPrefix}
                    <span className="meta-accent">
                      {achievement.metadataAccent}
                    </span>
                    {"metadataMiddle" in achievement
                      ? achievement.metadataMiddle
                      : null}
                    {"metadataEndAccent" in achievement ? (
                      <span className="meta-accent">
                        {achievement.metadataEndAccent}
                      </span>
                    ) : null}
                  </p>
                  <p className="achievement-description">
                    {achievement.description}
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
