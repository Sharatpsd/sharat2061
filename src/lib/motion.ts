import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: "expo.out", duration: 1.1 });

export { gsap, ScrollTrigger };

/**
 * Plays an entrance once and never reverses it, including when the trigger is
 * jumped over (deep links, nav jumps). Used instead of `once: true`, which
 * kills triggers mid-refresh and can corrupt ScrollTrigger's internal list.
 */
export const PLAY_ONCE = "play play play none";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

let lenis: Lenis | null = null;

export function startSmoothScroll() {
  if (lenis || prefersReducedMotion()) return lenis;
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function setScrollLocked(locked: boolean) {
  if (lenis) (locked ? lenis.stop() : lenis.start());
  document.documentElement.classList.toggle("is-locked", locked);
}

/** Scrolls to a section id (or 0 for top), honouring smooth scroll and focus management. */
export function scrollToTarget(target: string | number) {
  const el = typeof target === "string" ? document.getElementById(target) : null;
  if (typeof target === "string" && !el) return;
  const reduce = prefersReducedMotion();
  if (lenis) {
    lenis.scrollTo(el ?? (target as number), { offset: 0, duration: 1.4 });
  } else {
    const top = el ? el.getBoundingClientRect().top + window.scrollY : (target as number);
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  }
  if (el) {
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
    history.replaceState(null, "", `#${el.id}`);
  } else {
    history.replaceState(null, "", window.location.pathname);
  }
}
