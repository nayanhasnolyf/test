import Link from "next/link";

const contactLinks = [
  {
    label: "github",
    href: "https://github.com/nayanhasnolyf",
  },
  {
    label: "linkedin",
    href: "https://linkedin.com/in/nayan-pokhriyal-7a1756323",
  },
  {
    label: "resume",
    href: "/resume.pdf",
  },
] as const;

export function AboutContact() {
  return (
    <section className="about-contact" id="about" aria-label="About and contact">
      <div className="page-container about-contact-layout">
        <div className="about-column" aria-labelledby="about-heading">
          <h2 className="about-contact-heading" id="about-heading">
            About Me
          </h2>

          <p className="about-name">I&apos;m Nayan.</p>

          <div className="about-copy">
            <p>
              I study Electronics Engineering with a focus on VLSI, but most of
              my time outside class ends up in software.
            </p>
            <p>
              I&apos;m especially interested in backend systems, AI,
              infrastructure and turning ideas into impact.
            </p>
            <p className="about-closing">Always learning. Always building.</p>
          </div>
        </div>

        <div
          className="contact-column"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <h2 className="about-contact-heading" id="contact-heading">
            Let&apos;s Connect
          </h2>

          <address className="contact-details">
            <a href="mailto:nayanpokhriyal25@gmail.com">
              nayanpokhriyal25@gmail.com
            </a>
            <span>Bangalore, India</span>
          </address>

          <nav className="contact-links" aria-label="Social and document links">
            {contactLinks.map((link) => (
              <Link
                className="contact-link"
                href={link.href}
                key={link.label}
                aria-label={`${link.label}, opens in a new tab`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{link.label}</span>
                <span className="contact-link-arrow" aria-hidden="true">
                  &#8594;
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
