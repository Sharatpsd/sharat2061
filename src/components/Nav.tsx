import { useEffect, useRef, useState } from "react";
import { nav, profile } from "@/data/content";
import { gsap, ScrollTrigger, prefersReducedMotion, scrollToTarget, setScrollLocked } from "@/lib/motion";
import { Monogram } from "./Monogram";
import { Magnetic } from "./Magnetic";
import { Icon } from "./Icon";

export function Nav() {
  const header = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Progress bar, hide-on-scroll-down header, active section tracking.
  useEffect(() => {
    const progress = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
        const h = header.current;
        if (!h) return;
        h.classList.toggle("is-scrolled", self.scroll() > 40);
        h.classList.toggle("is-hidden", self.direction === 1 && self.scroll() > 400);
      },
    });
    const triggers = nav.map(({ id }) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => self.isActive && setActive(id),
        onLeaveBack: () => id === nav[0].id && setActive(""),
      }),
    );
    return () => {
      progress.kill();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  // Mobile menu open/close animation, focus trap and Escape.
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    setScrollLocked(open);
    const reduce = prefersReducedMotion();
    if (open) {
      gsap.set(menu, { visibility: "visible" });
      gsap.fromTo(menu, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: reduce ? 0 : 0.8, ease: "expo.inOut" });
      gsap.fromTo(
        menu.querySelectorAll(".menu-item"),
        { yPercent: 110 },
        { yPercent: 0, duration: reduce ? 0 : 0.9, stagger: 0.05, delay: reduce ? 0 : 0.3 },
      );
      menu.querySelector<HTMLElement>("a, button")?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
        if (e.key === "Tab") {
          const f = [toggleRef.current!, ...menu.querySelectorAll<HTMLElement>("a, button")];
          const i = f.indexOf(document.activeElement as HTMLElement);
          if (e.shiftKey && i <= 0) {
            e.preventDefault();
            f[f.length - 1].focus();
          } else if (!e.shiftKey && i === f.length - 1) {
            e.preventDefault();
            f[0].focus();
          }
        }
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    gsap.to(menu, {
      clipPath: "inset(0 0 100% 0)",
      duration: reduce ? 0 : 0.6,
      ease: "expo.inOut",
      onComplete: () => gsap.set(menu, { visibility: "hidden" }),
    });
  }, [open]);

  const go = (id: string | number) => (e: React.MouseEvent) => {
    e.preventDefault();
    const wasOpen = open;
    setOpen(false);
    // Let the menu start closing (and unlock scroll) before scrolling.
    setTimeout(() => scrollToTarget(id), wasOpen ? 350 : 0);
  };

  return (
    <>
      <div className="progress" aria-hidden="true">
        <div ref={bar} className="progress-bar" />
      </div>
      <header ref={header} className={`site-header${open ? " menu-open" : ""}`}>
        <a href="#top" className="brand" onClick={go(0)} aria-label="Sharat A. Mugdho, back to top" data-cursor="Top">
          <Monogram className="brand-mark" />
          <span className="brand-name">Sharat A. Mugdho</span>
        </a>
        <nav className="nav-desktop" aria-label="Primary">
          <ul>
            {nav.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={go(item.id)}
                  className={active === item.id ? "is-active" : undefined}
                  aria-current={active === item.id ? "true" : undefined}
                >
                  <span className="nav-index">0{i + 1}</span>
                  <span className="roll" data-text={item.label}>
                    <span>{item.label}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-cta">
          <Magnetic>
            <a href="#contact" className="btn btn-small" onClick={go("contact")}>
              <span className="dot-live" aria-hidden="true" />
              Let&rsquo;s talk
            </a>
          </Magnetic>
        </div>
        <button
          ref={toggleRef}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="menu-lines" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </header>

      <div
        ref={menuRef}
        id="mobile-menu"
        className="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        style={{ visibility: "hidden" }}
      >
        <nav aria-label="Mobile">
          <ul>
            {nav.map((item, i) => (
              <li key={item.id} className="mask">
                <a className="menu-item" href={`#${item.id}`} onClick={go(item.id)} tabIndex={open ? 0 : -1}>
                  <span className="nav-index">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu-foot">
          <a href={`mailto:${profile.email}`} tabIndex={open ? 0 : -1}>
            {profile.email}
          </a>
          <div className="mobile-menu-social">
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} aria-label="GitHub">
              <Icon name="github" />
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} aria-label="LinkedIn">
              <Icon name="linkedin" />
            </a>
            <a href={profile.links.resume} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
              Resume
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
