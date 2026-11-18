// Build-time snapshot of public GitHub activity for the portfolio.
// Pulls the public contribution calendar and public repositories for one user,
// and writes src/data/github.json. If GitHub is unreachable or rate-limits the
// build machine, the previously committed snapshot is kept, so builds never fail
// and never show invented numbers.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const USER = "Sharatpsd";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = resolve(root, "src/data/github.json");
const headers = { "User-Agent": "portfolio-build", Accept: "application/vnd.github+json" };

async function fetchCalendar() {
  const res = await fetch(`https://github.com/users/${USER}/contributions`, { headers });
  if (!res.ok) throw new Error(`contributions ${res.status}`);
  const html = await res.text();
  const counts = new Map();
  for (const m of html.matchAll(/<tool-tip[^>]*for="(contribution-day-component-[\d-]+)"[^>]*>([^<]*)/g)) {
    const n = /^(\d+|No) contribution/.exec(m[2].trim());
    counts.set(m[1], n ? (n[1] === "No" ? 0 : Number(n[1])) : 0);
  }
  const days = [];
  for (const m of html.matchAll(/<td[^>]*ContributionCalendar-day[^>]*>/g)) {
    const tag = m[0];
    const date = /data-date="([^"]+)"/.exec(tag)?.[1];
    const level = Number(/data-level="(\d)"/.exec(tag)?.[1] ?? 0);
    const id = /id="([^"]+)"/.exec(tag)?.[1];
    if (date) days.push({ date, level, count: counts.get(id) ?? 0 });
  }
  if (days.length < 300) throw new Error(`calendar parse found only ${days.length} days`);
  days.sort((a, b) => a.date.localeCompare(b.date));
  const total = days.reduce((s, d) => s + d.count, 0);
  return { days, total };
}

async function fetchRepos() {
  const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, { headers });
  if (!res.ok) throw new Error(`repos ${res.status}`);
  const repos = await res.json();
  return repos
    .filter((r) => !r.fork && !r.private)
    .map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      language: r.language,
      stars: r.stargazers_count,
      pushedAt: r.pushed_at,
    }));
}

async function main() {
  let previous = null;
  try {
    previous = JSON.parse(await readFile(outFile, "utf8"));
  } catch {}
  try {
    const [calendar, repos] = await Promise.all([fetchCalendar(), fetchRepos()]);
    const languages = {};
    for (const r of repos) if (r.language) languages[r.language] = (languages[r.language] ?? 0) + 1;
    const data = {
      user: USER,
      profileUrl: `https://github.com/${USER}`,
      fetchedAt: new Date().toISOString(),
      publicRepos: repos.length,
      contributionsLastYear: calendar.total,
      days: calendar.days,
      languages,
      repos: repos.map(({ stars, ...r }) => r),
    };
    await mkdir(dirname(outFile), { recursive: true });
    await writeFile(outFile, JSON.stringify(data));
    console.log(`[github] snapshot updated: ${calendar.total} contributions, ${repos.length} repos`);
  } catch (err) {
    if (previous) {
      console.warn(`[github] fetch failed (${err.message}); keeping snapshot from ${previous.fetchedAt}`);
    } else {
      throw err;
    }
  }
}

main();
