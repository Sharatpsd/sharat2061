import { useEffect, useRef } from "react";
import { projects, research, type Project } from "@/data/content";
import { gsap, ScrollTrigger, isFinePointer, prefersReducedMotion, PLAY_ONCE } from "@/lib/motion";
import { SectionHead } from "@/components/SectionHead";
import { Icon } from "@/components/Icon";
import { Magnetic } from "@/components/Magnetic";
import { BiteVisual, ErpVisual, OdooVisual, ResearchVisual } from "./ProjectVisuals";

const visuals: Record<string, () => JSX.Element> = {
  bite: BiteVisual,
  odoo: OdooVisual,
  erp: ErpVisual,
  research: ResearchVisual,
};

function ProjectPanel({ p }: { p: Project }) {
  const Visual = visuals[p.id];
  return (
    <article className={`project project-${p.id}`} aria-labelledby={`project-${p.id}-title`}>
      <div className="project-card">
        <span className="project-shade" aria-hidden="true" />
        <div className="project-text">
          <p className="project-kind">
            <span className="project-index">{p.index}</span>
            {p.kind}
          </p>
          <h3 className="project-title" id={`project-${p.id}-title`}>
            {p.title}
          </h3>
          <p className="project-desc">{p.description}</p>
          {p.id === "research" ? (
            <p className="project-results">
              Verified results: mean AUC <strong>{research.auc}</strong> · binary accuracy{" "}
              <strong>{research.accuracy}%</strong>
            </p>
          ) : null}
          <h4 className="project-sub">Key contributions</h4>
          <ul className="project-points">
            {p.contributions.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <ul className="tags" aria-label="Technology stack">
            {p.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          {p.note ? <p className="project-note">{p.note}</p> : null}
          {p.links.length ? (
            <div className="project-links">
              {p.links.map((l, i) => (
                <Magnetic key={l.href} strength={0.25}>
                  <a
                    className={`btn ${i === 0 ? "btn-primary" : "btn-ghost"}`}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l.label}
                    <Icon name="external" size={16} />
                    <span className="sr-only"> for {p.title} (opens in a new tab)</span>
                  </a>
                </Magnetic>
              ))}
            </div>
          ) : null}
        </div>
        <div className="project-visual" data-cursor={p.links[0] ? "Explore" : undefined}>
          <div className="project-visual-inner">
            <Visual />
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      root.current?.classList.add("is-static");
      return;
    }
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: panels pin and stack; each one recedes as the next slides over it.
      mm.add("(min-width: 961px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(".project");
        panels.forEach((panel, i) => {
          const card = panel.querySelector(".project-card")!;
          const shade = panel.querySelector(".project-shade")!;
          if (i < panels.length - 1) {
            gsap
              .timeline({
                scrollTrigger: { trigger: panels[i + 1], start: "top bottom", end: "top 12%", scrub: true },
              })
              .fromTo(card, { scale: 1 }, { scale: 0.92, ease: "none" }, 0)
              .fromTo(shade, { opacity: 0 }, { opacity: 0.6, ease: "none" }, 0);
          }
        });
      });

      // Every viewport: content and visuals reveal as each panel arrives.
      gsap.utils.toArray<HTMLElement>(".project").forEach((panel) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: panel, start: "top 70%", toggleActions: PLAY_ONCE } });
        tl.from(panel.querySelectorAll(".project-text > *"), { autoAlpha: 0, y: 30, duration: 1, stagger: 0.06 })
          .fromTo(
            panel.querySelector(".project-visual-inner"),
            { clipPath: "inset(10% 10% 10% 10% round 10px)", scale: 1.06 },
            { clipPath: "inset(0% 0% 0% 0% round 10px)", scale: 1, duration: 1.6, ease: "expo.inOut" },
            0,
          )
          .add(() => panel.classList.add("is-in"), 0.6);
      });

      // Bite screenshot scrolls inside its browser frame.
      gsap.fromTo(
        ".bite-shot",
        { yPercent: 0 },
        { yPercent: -5, ease: "none", scrollTrigger: { trigger: ".project-bite", start: "top bottom", end: "bottom top", scrub: true } },
      );

      // Research numbers count up.
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = parseFloat(el.dataset.count!);
        const dec = parseInt(el.dataset.decimals || "0", 10);
        const suffix = el.dataset.suffix || "";
        const o = { v: 0 };
        gsap.to(o, {
          v: end,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: PLAY_ONCE },
          onUpdate: () => (el.textContent = o.v.toFixed(dec) + suffix),
        });
      });
    }, root);

    // Pointer tilt on visuals (desktop only).
    const cleanups: (() => void)[] = [];
    if (isFinePointer()) {
      root.current!.querySelectorAll<HTMLElement>(".project-visual").forEach((el) => {
        const inner = el.querySelector<HTMLElement>(".project-visual-inner")!;
        const rx = gsap.quickTo(inner, "rotationX", { duration: 0.8, ease: "power3.out" });
        const ry = gsap.quickTo(inner, "rotationY", { duration: 0.8, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 6);
          rx(((e.clientY - r.top) / r.height - 0.5) * -6);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }
    ScrollTrigger.refresh();
    return () => {
      cleanups.forEach((c) => c());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} className="section projects" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionHead
          index="03"
          label="Selected work"
          id="work-title"
          title="Featured projects."
          lede="Four pieces of work across full-stack development, ERP engineering and academic research."
        />
      </div>
      <div className="projects-stack container">
        {projects.map((p) => (
          <ProjectPanel key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
