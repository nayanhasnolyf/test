import { CertificateCard } from "@/components/sections/certificate-card";
import { Divider } from "@/components/ui/divider";
import { hasPublicAsset } from "@/lib/public-assets";

const certificates = [
  {
    title: "Introduction to Computer Science (CS50x)",
    issuer: "Harvard University",
    date: "Nov 2026",
    detail: "Python and SQL, with the course's problem sets and final project.",
    image: "/images/certificates/harvard-cs50x.jpg",
    credentialUrl: "",
  },
  {
    title: "JPMorgan Chase Software Engineering Job Simulation",
    issuer: "Forage",
    date: "Feb 2026",
    detail: "Java, Spring Boot, Kafka and REST APIs.",
    credentialId: "SyvQuyCXzz6Pbf2Yw",
    image: "/images/certificates/jpmorgan-forage.jpg",
    credentialUrl: "",
  },
  {
    title: "AI Engineer Agentic Track: The Complete Agent & MCP Course",
    issuer: "Udemy",
    date: "Jan 2026",
    detail: "17-hour course on building AI agents and Model Context Protocol tooling.",
    credentialId: "UC-bbbe98e4-1467-44a7-b8c5-5cb5e4e3c43c",
    image: "/images/certificates/udemy-agentic-ai.jpg",
    credentialUrl: "",
  },
  {
    title: "Fundamentals of Docker and Kubernetes",
    issuer: "Scaler",
    date: "Sep 2025",
    detail: "Containerisation and orchestration fundamentals.",
    image: "/images/certificates/scaler-docker-kubernetes.jpg",
    credentialUrl: "",
  },
  {
    title: "Intro to SQL",
    issuer: "Kaggle",
    date: "Aug 2025",
    detail: "SQL and Google BigQuery.",
    image: "/images/certificates/kaggle-intro-sql.jpg",
    credentialUrl: "",
  },
  {
    title: "Python",
    issuer: "Kaggle",
    date: "Aug 2024",
    detail: "Core Python programming.",
    image: "/images/certificates/kaggle-python.jpg",
    credentialUrl: "",
  },
] as const;

const licences: readonly {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
}[] = [
  // TODO(Nayan): add real licences here (for example professional licences or registrations).
  // Render the "Licences" subgroup only when this array is non-empty.
];

export function Certificates() {
  return (
    <section
      className="certificates"
      id="certificates"
      aria-labelledby="certificates-heading"
    >
      <div className="page-container">
        <Divider />

        <div className="certificates-header">
          <h2 className="certificates-heading" id="certificates-heading">
            Certificates &amp; <span className="heading-gradient">Licences</span>
          </h2>
        </div>

        <div
          className="certificate-subgroup"
          aria-labelledby="certificates-subgroup-heading"
        >
          <h3
            className="certificate-subgroup-heading"
            id="certificates-subgroup-heading"
          >
            Certificates
          </h3>

          <div className="certificate-grid">
            {certificates.map((certificate) => (
              <CertificateCard
                key={`${certificate.issuer}-${certificate.title}`}
                title={certificate.title}
                issuer={certificate.issuer}
                date={certificate.date}
                detail={certificate.detail}
                credentialId={
                  "credentialId" in certificate
                    ? certificate.credentialId
                    : undefined
                }
                image={certificate.image}
                imageAvailable={hasPublicAsset(certificate.image)}
                credentialUrl={certificate.credentialUrl}
              />
            ))}
          </div>
        </div>

        {licences.length > 0 ? (
          <div
            className="certificate-subgroup"
            aria-labelledby="licences-subgroup-heading"
          >
            <h3
              className="certificate-subgroup-heading"
              id="licences-subgroup-heading"
            >
              Licences
            </h3>

            <div className="certificate-grid">
              {licences.map((licence) => (
                <CertificateCard
                  key={`${licence.issuer}-${licence.title}`}
                  title={licence.title}
                  issuer={licence.issuer}
                  date={licence.date}
                  credentialId={licence.credentialId}
                  credentialUrl={licence.credentialUrl}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
