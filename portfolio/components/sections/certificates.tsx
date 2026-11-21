import { CertificateCard } from "@/components/sections/certificate-card";
import { Divider } from "@/components/ui/divider";
import { hasPublicAsset } from "@/lib/public-assets";

const certificates = [
  {
    title: "AI Engineer Agentic Track: Agents & MCP",
    issuer: "Udemy",
    date: "Jan 2026",
    detail: "17-hour course on building AI agents and Model Context Protocol tooling.",
    image: "/images/certificates/udemy-agentic-ai.jpg",
    credentialUrl: "",
  },
  {
    title: "JPMorgan Chase Software Engineering Job Simulation",
    issuer: "Forage",
    date: "Feb 2026",
    detail: "Spring Boot, Kafka and REST APIs.",
    image: "/images/certificates/jpmorgan-forage.jpg",
    credentialUrl: "",
  },
  {
    title: "Docker & Kubernetes Masterclass",
    issuer: "Scaler",
    date: "Sep 2024",
    detail: "Containerisation and orchestration fundamentals.",
    image: "/images/certificates/scaler-docker-kubernetes.jpg",
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
