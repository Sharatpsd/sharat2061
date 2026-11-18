import { useEffect, useMemo, useRef, useState } from "react";
import github from "@/data/github.json";
import { featuredRepos, repoNotes } from "@/data/content";
import { gsap, prefersReducedMotion, PLAY_ONCE } from "@/lib/motion";
import { SectionHead } from "@/components/SectionHead";
import { Icon } from "@/components/Icon";

type Day = { date: string; level: number; count: number };
const CELL = 11;
const GAP = 3;
const fmtDay = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const fmtMonth = new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "UTC" });

function useWeeks(days: Day[]) {
  return useMemo(() => {
    const weeks: (Day | null)[][] = [];
    let week: (Day | null)[] = [];
    days.forEach((d, i) => {
      const dow = new Date(d.date + "T00:00:00Z").getUTCDay();
      if (i === 0) week = Array(dow).fill(null);
      week.push(d);
      if (dow === 6) {
        weeks.push(week);
        week = [];
      }
    });
    if (week.length) weeks.push(week);
    return weeks;
  }, [days]);
}

export function Activity() {
  const root = useRef<HTMLElement>(null);
  const days = github.days as Day[];
  const weeks = useWeeks(days);
  const [hover, setHover] = useState<Day | null>(null);

  const repos = featuredRepos
    .map((name) => github.repos.find((r) => r.name === name))
    .filter((r): r is (typeof github.repos)[number] => !!r);

  const langs = Object.entries(github.languages as Record<string, number>).sort((a, b) => b[1] - a[1]);
  const langTotal = langs.reduce((s, [, v]) => s + v, 0);
  const updated = fmtDay.format(new Date(github.fetchedAt));
  const W = weeks.length * (CELL + GAP);
  const H = 7 * (CELL + GAP) + 18;

  const months: { x: number; label: string }[] = [];
  weeks.forEach((w, i) => {
    const first = w.find((d) => d && d.date.endsWith("-01")) ?? (i === 0 ? w.find(Boolean) : null);
    if (first && (!months.length || i - months[months.length - 1].x / (CELL + GAP) > 2)) {
      months.push({ x: i * (CELL + GAP), label: fmtMonth.format(new Date(first.date + "T00:00:00Z")) });
    }
  });

  // On narrow screens the calendar scrolls; start at the most recent weeks.
  useEffect(() => {
    const sc = root.current?.querySelector<HTMLElement>(".heatmap-scroll");
    if (sc) sc.scrollLeft = sc.scrollWidth;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".heat-week", {
        autoAlpha: 0,
        y: 6,
        duration: 0.5,
        stagger: 0.012,
        ease: "power2.out",
        scrollTrigger: { trigger: ".heatmap", start: "top 85%", toggleActions: PLAY_ONCE },
      });
      gsap.from(".lang-bar i", {
        scaleX: 0,
        duration: 1.4,
        stagger: 0.06,
        transformOrigin: "left center",
        scrollTrigger: { trigger: ".lang-bar", start: "top 90%", toggleActions: PLAY_ONCE },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section activity" id="activity" aria-labelledby="activity-title">
      <div className="container">
        <SectionHead
          index="03"
          label="Development activity"
          id="activity-title"
          title="My GitHub activity."
          lede={`Real data from my public GitHub profile, updated on every deploy. Last update: ${updated}.`}
        />

        <div className="activity-stats">
          <div className="stat reveal">
            <span className="stat-num">{github.contributionsLastYear.toLocaleString("en-US")}</span>
            <span className="stat-cap">Contributions in the last year</span>
          </div>
          <div className="stat reveal">
            <span className="stat-num">{github.publicRepos}</span>
            <span className="stat-cap">Public repositories</span>
          </div>
          <div className="stat reveal">
            <span className="stat-num">{langs[0]?.[0] ?? "—"}</span>
            <span className="stat-cap">Most-used language across repositories</span>
          </div>
        </div>

        <figure className="heatmap reveal">
          <div className="heatmap-scroll" tabIndex={0} aria-label="Contribution calendar, scrollable">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              width={W}
              height={H}
              role="img"
              aria-label={`${github.contributionsLastYear} contributions on GitHub in the last year`}
              onMouseLeave={() => setHover(null)}
            >
              {months.map((m) => (
                <text key={m.x} x={m.x} y={10} className="heat-month">
                  {m.label}
                </text>
              ))}
              {weeks.map((w, wi) => (
                <g key={wi} className="heat-week" transform={`translate(${wi * (CELL + GAP)} 18)`}>
                  {w.map((d, di) =>
                    d ? (
                      <rect
                        key={d.date}
                        y={di * (CELL + GAP)}
                        width={CELL}
                        height={CELL}
                        rx={2.5}
                        className={`heat l${d.level}`}
                        onMouseEnter={() => setHover(d)}
                      />
                    ) : null,
                  )}
                </g>
              ))}
            </svg>
          </div>
          <figcaption className="heatmap-foot">
            <span className="heatmap-tip" aria-live="polite">
              {hover
                ? `${hover.count === 0 ? "No" : hover.count} contribution${hover.count === 1 ? "" : "s"} on ${fmtDay.format(new Date(hover.date + "T00:00:00Z"))}`
                : "Hover a day for details"}
            </span>
            <span className="heat-legend" aria-hidden="true">
              Less
              {[0, 1, 2, 3, 4].map((l) => (
                <i key={l} className={`heat l${l}`} />
              ))}
              More
            </span>
          </figcaption>
        </figure>

        <div className="activity-grid">
          <ul className="repo-list" aria-label="Selected repositories">
            {repos.map((r) => (
              <li key={r.name} className="reveal">
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="repo" data-cursor="Open">
                  <span className="repo-name">
                    {r.name.replace(/-+$/, "").replace(/-/g, " ")}
                    <Icon name="external" size={15} />
                  </span>
                  {repoNotes[r.name] ?? r.description ? (
                    <span className="repo-desc">{repoNotes[r.name] ?? r.description}</span>
                  ) : null}
                  <span className="repo-meta">
                    {r.language ? <span>{r.language}</span> : null}
                    <span>Updated {fmtDay.format(new Date(r.pushedAt))}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="langs reveal">
            <h3 className="langs-title">Languages across public repositories</h3>
            <div className="lang-bar" aria-hidden="true">
              {langs.map(([l, v], i) => (
                <i key={l} className={`lang-c${i}`} style={{ width: `${(v / langTotal) * 100}%` }} />
              ))}
            </div>
            <ul className="lang-legend">
              {langs.map(([l, v], i) => (
                <li key={l}>
                  <i className={`lang-c${i}`} aria-hidden="true" />
                  {l}
                  <span className="muted">
                    {v} {v === 1 ? "repo" : "repos"}
                  </span>
                </li>
              ))}
            </ul>
            <a className="btn btn-ghost" href={github.profileUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="github" />
              View GitHub profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
