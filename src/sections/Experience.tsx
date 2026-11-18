import { useEffect, useRef } from "react";
import { experience } from "@/data/content";
import { gsap, ScrollTrigger, prefersReducedMotion, PLAY_ONCE } from "@/lib/motion";
import { SectionHead } from "@/components/SectionHead";
import { Icon } from "@/components/Icon";

export function Experience() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      // The timeline spine draws as you read down the roles.
      gsap.fromTo(
        ".timeline-progress",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".timeline", start: "top 70%", end: "bottom 60%", scrub: 0.5 } },
      );
      gsap.utils.toArray<HTMLElement>(".role").forEach((role) => {
        const points = role.querySelectorAll(".role-points li");
        if (points.length) {
          gsap.from(points, {
            autoAlpha: 0,
            x: -16,
            duration: 0.8,
            stagger: 0.05,
            scrollTrigger: { trigger: role, start: "top 70%", toggleActions: PLAY_ONCE },
          });
        }
        ScrollTrigger.create({
          trigger: role,
          start: "top 62%",
          end: "bottom 62%",
          toggleClass: { targets: role, className: "is-active" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section experience" id="experience" aria-labelledby="experience-title">
      <div className="container experience-grid">
        <div className="experience-aside">
          <div className="experience-sticky">
            <SectionHead
              index="03"
              label="Career journey"
              id="experience-title"
              title="From Django projects to company-wide ERP."
              lede="I started with Python and Django at Robo Tech Valley. Today I work on ERP at Betopia Group."
            />

          </div>
        </div>

        <ol className="timeline">
          <span className="timeline-track" aria-hidden="true">
            <span className="timeline-progress" />
          </span>
          {experience.map((r) => (
            <li key={r.company + r.role} className="role">
              <span className="role-node" aria-hidden="true" />
              <p className="role-period reveal">
                {r.period}
                {r.current ? <span className="role-now">Current</span> : null}
              </p>
              <h3 className="role-company reveal">
                {r.companyUrl ? (
                  <a href={r.companyUrl} target="_blank" rel="noopener noreferrer" className="role-company-link">
                    {r.company}
                    <Icon name="external" size={18} />
                  </a>
                ) : (
                  r.company
                )}
              </h3>
              <p className="role-title reveal">
                {r.role}
                {r.unit ? <span className="muted"> · {r.unit}</span> : null}
              </p>
              <p className="role-summary reveal">{r.summary}</p>
              {r.points ? (
                <ul className="role-points" aria-label="Responsibilities and work areas">
                  {r.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              ) : null}
              {r.tags ? (
                <ul className="tags reveal" aria-label="Technologies">
                  {r.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              ) : null}
              {r.link ? (
                <a className="link-underline reveal" href={r.link.href} target="_blank" rel="noopener noreferrer">
                  {r.link.label}
                  <Icon name="external" size={15} />
                </a>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
