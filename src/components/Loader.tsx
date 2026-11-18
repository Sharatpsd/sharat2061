import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { Monogram } from "./Monogram";

const SEEN_KEY = "sam-intro-seen";

function introSeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Intro sequence: the monogram draws itself while real page assets load
 * (fonts + window load, capped so it never blocks), then the curtain lifts.
 * Skipped for reduced motion and shortened on repeat visits in the same session.
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = root.current!;
    const quick = prefersReducedMotion() || introSeen();
    const finish = () => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      setGone(true);
      onDone();
    };

    if (quick) {
      gsap.to(el, { autoAlpha: 0, duration: 0.45, ease: "power2.out", delay: 0.1, onComplete: finish });
      return;
    }

    const progress = { v: 0 };
    const ready = Promise.race([
      Promise.all([
        document.fonts?.ready ?? Promise.resolve(),
        document.readyState === "complete"
          ? Promise.resolve()
          : new Promise((r) => window.addEventListener("load", r, { once: true })),
      ]),
      new Promise((r) => setTimeout(r, 2200)),
    ]);

    const ctx = gsap.context(() => {
      gsap.set(".mono-s, .mono-m", { strokeDasharray: 1, strokeDashoffset: 1 });
      const tl = gsap.timeline();
      tl.to(".mono-s", { strokeDashoffset: 0, duration: 1.1, ease: "power3.inOut" })
        .to(".mono-m", { strokeDashoffset: 0, duration: 1.1, ease: "power3.inOut" }, "-=0.75")
        .from(".loader-word", { yPercent: 110, duration: 0.9, stagger: 0.06 }, 0.2)
        .to(progress, {
          v: 86,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => setCount(Math.round(progress.v)),
        }, 0);

      ready.then(() => {
        tl.then(() => {
          gsap
            .timeline({ onComplete: finish })
            .to(progress, { v: 100, duration: 0.35, ease: "power1.out", onUpdate: () => setCount(Math.round(progress.v)) })
            .to(".loader-word, .loader-count", { yPercent: -110, duration: 0.7, ease: "expo.in", stagger: 0.04 })
            .to(".loader-mark", { scale: 0.6, autoAlpha: 0, duration: 0.6, ease: "expo.in" }, "<")
            .to(el, { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "expo.inOut" }, "-=0.25");
        });
      });
    }, el);
    return () => ctx.revert();
  }, [onDone]);

  if (gone) return null;

  return (
    <div ref={root} className="loader" role="status" aria-live="polite" aria-label="Loading portfolio">
      <div className="loader-inner">
        <Monogram className="loader-mark" />
        <div className="loader-line">
          <span className="mask">
            <span className="loader-word">Sharat Acharja Mugdho</span>
          </span>
          <span className="mask">
            <span className="loader-word loader-sub">Software Engineer · Portfolio 2026</span>
          </span>
        </div>
      </div>
      <span className="mask loader-count-wrap" aria-hidden="true">
        <span className="loader-count">{String(count).padStart(3, "0")}</span>
      </span>
    </div>
  );
}
