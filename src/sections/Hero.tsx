import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/content";
import { gsap, prefersReducedMotion, scrollToTarget } from "@/lib/motion";
import { SplitText } from "@/components/SplitText";
import { Magnetic } from "@/components/Magnetic";
import { Icon } from "@/components/Icon";

const orbitNodes = [
  { label: "Odoo", r: 0, a: -10 },
  { label: "Python", r: 1, a: -95 },
  { label: "PostgreSQL", r: 2, a: -140 },
  { label: "Django", r: 2, a: -45 },
  { label: "React", r: 2, a: 22 },
  { label: "REST", r: 1, a: -165 },
];
const radii = [120, 190, 260];

function DhakaTime() {
  const fmt = () =>
    new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Dhaka" }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15_000);
    return () => clearInterval(id);
  }, []);
  return <time>{t}</time>;
}

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  // Hide hero content until the intro hands over, so nothing flashes.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.set(".hero .split-char", { yPercent: 115 });
      gsap.set(".hero-reveal", { autoAlpha: 0, y: 24 });
      gsap.set(".orbit-ring", { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(".orbit-node", { autoAlpha: 0, scale: 0.6 });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!ready || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.05 });
      tl.to(".hero-name .split-char", { yPercent: 0, duration: 1.4, stagger: 0.028 })
        .to(".hero-reveal", { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.45)
        .to(".orbit-ring", { strokeDashoffset: 0, duration: 2, stagger: 0.15, ease: "power3.inOut" }, 0.2)
        .to(".orbit-node", { autoAlpha: 1, scale: 1, duration: 0.9, stagger: 0.07, ease: "back.out(2)" }, 0.9);

      // Scroll-out: name drifts and softens, the orbit turns.
      gsap.to(".hero-inner", {
        yPercent: -14,
        autoAlpha: 0.15,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".orbit-spin", {
        rotate: 40,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToTarget(id);
  };

  return (
    <section ref={root} className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <svg className="orbit" viewBox="-300 -300 600 600">
          <g className="orbit-spin">
            {radii.map((r) => (
              <circle key={r} className="orbit-ring" r={r} pathLength={1} />
            ))}
            {orbitNodes.map((n) => {
              const rad = (n.a * Math.PI) / 180;
              const x = Math.cos(rad) * radii[n.r];
              const y = Math.sin(rad) * radii[n.r];
              return (
                <g key={n.label} className="orbit-node" transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
                  <circle r="3.5" />
                  <text x="10" y="4">
                    {n.label}
                  </text>
                </g>
              );
            })}
            <circle className="orbit-core" r="5" />
          </g>
        </svg>
      </div>

      <div className="hero-inner container">
        <div className="hero-meta">
          <p className="status hero-reveal">
            <span className="dot-live" aria-hidden="true" />
            Currently at {profile.organization}
          </p>
          <p className="hero-local hero-reveal">
            {profile.location} · <DhakaTime />
          </p>
        </div>

        <h1 className="hero-name" id="hero-title">
          <span className="hero-line">
            <SplitText text="Sharat Acharja" by="chars" />
          </span>
          {" "}
          <span className="hero-line hero-line-2">
            <span className="hero-role hero-reveal" aria-hidden="true">
              <span>{profile.title}</span>
              <span className="muted">ERP · Backend · Full-Stack</span>
            </span>
            <SplitText text="Mugdho" by="chars" className="serif" />
          </span>
        </h1>

        <div className="hero-foot">
          <p className="hero-tagline hero-reveal">
            <span className="sr-only">{profile.title}. </span>
            {profile.tagline}
          </p>
          <div className="hero-ctas hero-reveal">
            <Magnetic>
              <a href="#work" className="btn btn-primary" onClick={go("work")}>
                Explore my work
                <Icon name="arrow" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn btn-ghost" onClick={go("contact")}>
                Let&rsquo;s connect
              </a>
            </Magnetic>
            <a className="link-underline" href={profile.links.resume} target="_blank" rel="noopener noreferrer">
              <Icon name="file" size={16} />
              Download resume
            </a>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-cue hero-reveal" onClick={go("about")} aria-label="Scroll to About section">
        <span className="scroll-cue-line" aria-hidden="true" />
        <span>Scroll</span>
      </a>
    </section>
  );
}
