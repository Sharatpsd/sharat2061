import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/content";
import { gsap, prefersReducedMotion, scrollToTarget } from "@/lib/motion";
import { SplitText } from "@/components/SplitText";
import { Magnetic } from "@/components/Magnetic";
import { Icon } from "@/components/Icon";
import portrait560 from "@/assets/img/portrait-560.webp";
import portrait900 from "@/assets/img/portrait-900.webp";
import portrait1024 from "@/assets/img/portrait-1024.webp";

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
      gsap.set(".hero-photo", { autoAlpha: 0, scale: 1.12 });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!ready || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.05 });
      tl.to(".hero-photo", { autoAlpha: 1, scale: 1, duration: 2.2, ease: "expo.out" }, 0)
        .to(".hero-name .split-char", { yPercent: 0, duration: 1.4, stagger: 0.028 }, 0.15)
        .to(".hero-reveal", { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.55);

      // Scroll-out: text drifts up and fades, the photo sinks slowly behind it.
      gsap.to(".hero-inner", {
        yPercent: -16,
        autoAlpha: 0.1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-photo-wrap", {
        yPercent: 14,
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
        <div className="hero-photo-wrap">
          <img
            className="hero-photo"
            src={portrait1024}
            srcSet={`${portrait560} 560w, ${portrait900} 900w, ${portrait1024} 1024w`}
            sizes="(max-width: 760px) 100vw, 52vw"
            width={1024}
            height={1536}
            alt=""
            {...{ fetchpriority: "high" }}
            decoding="async"
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-glow" />
      </div>

      <div className="hero-inner container">
        <div className="hero-meta">
          <p className="status hero-reveal">
            <span className="dot-live" aria-hidden="true" />
            {profile.title} at{" "}
            <a href={profile.organizationUrl} target="_blank" rel="noopener noreferrer">
              {profile.organization}
            </a>
          </p>
          <p className="hero-local hero-reveal">
            {profile.location} · <DhakaTime />
          </p>
        </div>

        <div className="hero-main">
          <p className="hero-kicker hero-reveal">{profile.specialty} · HRMS · Accounting · Sales</p>
          <h1 className="hero-name" id="hero-title">
            <span className="hero-line">
              <SplitText text="Sharat Acharja" by="chars" />
            </span>{" "}
            <span className="hero-line">
              <SplitText text="Mugdho" by="chars" className="serif" />
            </span>
          </h1>
          <p className="hero-tagline hero-reveal">{profile.tagline}</p>
          <div className="hero-ctas hero-reveal">
            <Magnetic>
              <a href="#work" className="btn btn-primary" onClick={go("work")}>
                See my work
                <Icon name="arrow" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn btn-ghost" onClick={go("contact")}>
                Contact me
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
