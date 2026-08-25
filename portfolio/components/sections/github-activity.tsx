import Link from "next/link";
import {
  getGitHubActivity,
  type ContributionDay,
} from "@/lib/github";

const weekdays = [
  { label: "Mon", value: 1 },
  { label: "Tue", value: 2 },
  { label: "Wed", value: 3 },
  { label: "Thu", value: 4 },
  { label: "Fri", value: 5 },
  { label: "Sat", value: 6 },
  { label: "Sun", value: 0 },
] as const;

function formatUpdateTime(value: string) {
  const updatedAt = new Date(value);
  const elapsed = Date.now() - updatedAt.getTime();
  const days = Math.max(0, Math.floor(elapsed / 86_400_000));

  if (days === 0) return "today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;

  const months = Math.floor(days / 30);
  if (months === 1) return "1 month ago";
  if (months < 12) return `${months} months ago`;

  const years = Math.floor(months / 12);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}

function contributionClass(level: ContributionDay["level"]) {
  return `contribution-cell contribution-cell--${level.toLowerCase().replaceAll("_", "-")}`;
}

export async function GitHubActivity() {
  const activity = await getGitHubActivity();

  return (
    <section
      className="github-activity"
      id="github"
      aria-labelledby="github-heading"
    >
      <div className="page-container github-activity-inner">
        <header className="github-activity-header">
          <h2 className="github-activity-heading" id="github-heading">
            On GitHub
          </h2>
          <p className="github-activity-intro">
            some days are more productive than others.
          </p>
        </header>

        <div className="github-activity-layout">
          <div className="contribution-panel">
            {activity.contributions ? (
              <>
                <div
                  className="contribution-graph"
                  role="img"
                  aria-label={`${activity.contributions.total} GitHub contributions in the last year`}
                >
                  <div className="contribution-weekdays" aria-hidden="true">
                    {weekdays.map((day) => (
                      <span key={day.value}>{day.label}</span>
                    ))}
                  </div>

                  <div className="contribution-scroll">
                    <div className="contribution-weeks" aria-hidden="true">
                      {activity.contributions.weeks.map((week, weekIndex) => (
                        <div className="contribution-week" key={weekIndex}>
                          {weekdays.map(({ value }) => {
                            const day = week.days.find(
                              (candidate) => candidate.weekday === value,
                            );

                            return day ? (
                              <span
                                className={contributionClass(day.level)}
                                key={day.date}
                                title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                              />
                            ) : (
                              <span
                                className="contribution-cell contribution-cell--empty"
                                key={`${weekIndex}-${value}`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="contribution-summary">
                  <span>{activity.contributions.total} contributions</span>
                  <div
                    className="contribution-legend"
                    role="img"
                    aria-label="Contribution intensity from less to more"
                  >
                    <span>Less</span>
                    {[
                      "none",
                      "first-quartile",
                      "second-quartile",
                      "third-quartile",
                      "fourth-quartile",
                    ].map((level) => (
                      <span
                        className={`contribution-cell contribution-cell--${level}`}
                        key={level}
                        aria-hidden="true"
                      />
                    ))}
                    <span>More</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="github-unavailable" role="status">
                <p>Contribution activity is temporarily unavailable.</p>
                {activity.contributionError ? (
                  <span>Configure a server-side GitHub token to load it.</span>
                ) : null}
              </div>
            )}
          </div>

          <div className="recent-repositories">
            <h3 className="recent-repositories-heading">Recently pushing</h3>

            {activity.repositories.length ? (
              <ul className="repository-list">
                {activity.repositories.map((repository) => (
                  <li key={repository.url}>
                    <Link
                      className="repository-row"
                      href={repository.url}
                      aria-label={`${repository.name}, updated ${formatUpdateTime(repository.pushedAt)}, opens in a new tab`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="repository-name">{repository.name}</span>
                      <span className="repository-updated">
                        <time dateTime={repository.pushedAt}>
                          {formatUpdateTime(repository.pushedAt)}
                        </time>
                        <span className="repository-arrow" aria-hidden="true">
                          &#8594;
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="repository-unavailable">
                {activity.repositoryError
                  ? "Recent repositories are temporarily unavailable."
                  : "No recent repositories found."}
              </p>
            )}
          </div>
        </div>

        <Link
          className="github-profile-link"
          href={activity.profileUrl}
          aria-label="View GitHub profile, opens in a new tab"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>view github profile</span>
          <span className="github-profile-arrow" aria-hidden="true">
            &#8594;
          </span>
        </Link>
      </div>
    </section>
  );
}
