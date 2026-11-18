import { gsap, ScrollTrigger, prefersReducedMotion, PLAY_ONCE } from "./motion";

/**
 * Declarative scroll reveals, applied once to the whole page:
 *  .reveal          fade and rise in, batched for natural staggering
 *  .reveal-split    word-by-word masked rise (use with <SplitText by="words">)
 *  .reveal-img      clip-path unmask with the inner image settling from a zoom
 *  .scrub-words     words brighten as the paragraph scrolls through the viewport
 *  [data-parallax]  vertical drift; value is the speed (e.g. "0.15")
 * With reduced motion everything is simply visible.
 */
export function initReveals(scope: HTMLElement) {
  if (prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    gsap.set(".reveal", { autoAlpha: 0, y: 40 });
    const show = (els: Element[]) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.09, overwrite: true });
    ScrollTrigger.batch(".reveal", { start: "top 88%", onEnter: show, onLeave: show, onEnterBack: show });

    gsap.utils.toArray<HTMLElement>(".reveal-split").forEach((el) => {
      gsap.fromTo(
        el.querySelectorAll(".split-inner, .split-char"),
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.25,
          stagger: el.querySelector(".split-char") ? 0.022 : 0.045,
          scrollTrigger: { trigger: el, start: "top 86%", toggleActions: PLAY_ONCE },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>(".reveal-img").forEach((el) => {
      const img = el.querySelector("img, .reveal-img-inner");
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", toggleActions: PLAY_ONCE } });
      tl.fromTo(el, { clipPath: "inset(18% 12% 18% 12% round 6px)" }, { clipPath: "inset(0% 0% 0% 0% round 6px)", duration: 1.6, ease: "expo.inOut" });
      if (img) tl.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.9, ease: "expo.out" }, 0);
    });

    gsap.utils.toArray<HTMLElement>(".scrub-words").forEach((el) => {
      gsap.fromTo(
        el.querySelectorAll(".split-word"),
        { opacity: 0.45 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
      const speed = parseFloat(el.dataset.parallax || "0.15");
      gsap.fromTo(
        el,
        { yPercent: speed * 50 },
        {
          yPercent: speed * -50,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
  }, scope);

  // Fonts and lazy images change layout; recompute trigger positions after they settle.
  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  window.addEventListener("load", refresh, { once: true });

  // Any later height change (lazy images, data, viewport) re-measures triggers.
  let lastH = scope.offsetHeight;
  let timer = 0;
  const ro = new ResizeObserver(() => {
    const h = scope.offsetHeight;
    if (Math.abs(h - lastH) < 2) return;
    lastH = h;
    clearTimeout(timer);
    timer = window.setTimeout(refresh, 150);
  });
  ro.observe(scope);

  return () => {
    window.removeEventListener("load", refresh);
    ro.disconnect();
    clearTimeout(timer);
    ctx.revert();
  };
}
