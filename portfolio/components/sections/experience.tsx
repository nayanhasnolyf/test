export function Experience() {
  return (
    <section className="experience" aria-labelledby="experience-heading">
      <div className="page-container experience-layout">
        <h2 className="experience-heading" id="experience-heading">
          Experience
        </h2>

        <div className="experience-role">
          <h3 className="experience-title">Web Development Intern</h3>
          <p className="experience-company">
            Market Orbit <span aria-hidden="true">&middot;</span> Remote
          </p>
        </div>

        <time className="experience-date" dateTime="2026-05/2026-06">
          May 2026 <span aria-hidden="true">&mdash;</span> Jun 2026
        </time>

        <p className="experience-description">
          Worked across the frontend and backend of a production website using
          Next.js, TypeScript, Express, Prisma and PostgreSQL.
        </p>
      </div>
    </section>
  );
}
