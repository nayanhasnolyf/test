import "server-only";

const GITHUB_REVALIDATE_SECONDS = 21_600;

export type ContributionDay = {
  count: number;
  date: string;
  level: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";
  weekday: number;
};

export type ContributionWeek = {
  days: ContributionDay[];
};

export type GitHubRepository = {
  name: string;
  pushedAt: string;
  url: string;
};

export type GitHubActivityData = {
  contributionError: boolean;
  contributions: {
    total: number;
    weeks: ContributionWeek[];
  } | null;
  profileUrl: string;
  repositories: GitHubRepository[];
  repositoryError: boolean;
  username: string | null;
};

type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              contributionCount: number;
              contributionLevel: ContributionDay["level"];
              date: string;
              weekday: number;
            }>;
          }>;
        };
      };
    } | null;
  };
  errors?: Array<{ message: string }>;
};

type RepositoryResponse = Array<{
  archived: boolean;
  fork: boolean;
  html_url: string;
  name: string;
  pushed_at: string | null;
  updated_at: string;
}>;

function githubHeaders(token?: string) {
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function fetchContributions(username: string, token: string) {
  const to = new Date();
  const from = new Date(to.getTime() - 364 * 24 * 60 * 60 * 1000);

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      ...githubHeaders(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query ContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $login) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    contributionLevel
                    date
                    weekday
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        login: username,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
    next: {
      revalidate: GITHUB_REVALIDATE_SECONDS,
      tags: [`github-contributions-${username}`],
    },
  });

  if (!response.ok) {
    throw new Error("GitHub contribution request failed");
  }

  const payload = (await response.json()) as GraphQLResponse;
  const calendar =
    payload.data?.user?.contributionsCollection.contributionCalendar;

  if (!calendar || payload.errors?.length) {
    throw new Error("GitHub contribution data was unavailable");
  }

  return {
    total: calendar.totalContributions,
    weeks: calendar.weeks.map((week) => ({
      days: week.contributionDays.map((day) => ({
        count: day.contributionCount,
        date: day.date,
        level: day.contributionLevel,
        weekday: day.weekday,
      })),
    })),
  };
}

async function fetchRepositories(username: string, token?: string) {
  const response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=pushed&direction=desc&per_page=12&type=owner`,
    {
      headers: githubHeaders(token),
      next: {
        revalidate: GITHUB_REVALIDATE_SECONDS,
        tags: [`github-repositories-${username}`],
      },
    },
  );

  if (!response.ok) {
    throw new Error("GitHub repository request failed");
  }

  const repositories = (await response.json()) as RepositoryResponse;

  return repositories
    .filter((repository) => !repository.fork && !repository.archived)
    .slice(0, 3)
    .map((repository) => ({
      name: repository.name,
      pushedAt: repository.pushed_at ?? repository.updated_at,
      url: repository.html_url,
    }));
}

export async function getGitHubActivity(): Promise<GitHubActivityData> {
  const username = process.env.GITHUB_USERNAME?.trim() || null;
  const token = process.env.GITHUB_TOKEN?.trim() || undefined;

  if (!username) {
    return {
      contributionError: true,
      contributions: null,
      profileUrl: "https://github.com",
      repositories: [],
      repositoryError: true,
      username: null,
    };
  }

  const [contributionResult, repositoryResult] = await Promise.allSettled([
    token ? fetchContributions(username, token) : Promise.resolve(null),
    fetchRepositories(username, token),
  ]);

  return {
    contributionError:
      !token || contributionResult.status === "rejected",
    contributions:
      contributionResult.status === "fulfilled"
        ? contributionResult.value
        : null,
    profileUrl: `https://github.com/${encodeURIComponent(username)}`,
    repositories:
      repositoryResult.status === "fulfilled" ? repositoryResult.value : [],
    repositoryError: repositoryResult.status === "rejected",
    username,
  };
}
