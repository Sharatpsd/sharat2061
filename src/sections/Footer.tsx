import { useEffect, useRef } from "react";
import { profile } from "@/data/content";
import { ScrollTrigger, scrollToTarget } from "@/lib/motion";
import { Magnetic } from "@/components/Magnetic";
import { Icon } from "@/components/Icon";

export function Footer() {
  const ring = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (ring.current) ring.current.style.strokeDashoffset = String(1 - self.progress);
      },
    });
    return () => st.kill();
  }, []);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <p className="footer-tag">Software Engineer · Problem Solver · Builder</p>
          <Magnetic>
            <button className="to-top" onClick={() => scrollToTarget(0)} aria-label="Back to top" data-cursor="Top">
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <circle cx="24" cy="24" r="22" className="to-top-track" />
                <circle ref={ring} cx="24" cy="24" r="22" pathLength={1} className="to-top-ring" />
              </svg>
              <Icon name="arrowUp" />
            </button>
          </Magnetic>
        </div>
        <p className="footer-word">
          <span className="sr-only">{profile.name}</span>
          <span aria-hidden="true">Sharat Acharja</span>
          <span aria-hidden="true" className="serif">
            Mugdho
          </span>
        </p>
        <div className="footer-bottom">
          <p>© 2026 {profile.name}. All rights reserved.</p>
          <ul className="footer-social">
            <li>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`}>Email</a>
            </li>
            <li>
              <a href={profile.links.resume} target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </li>
          </ul>
          <p className="muted">
            {profile.location}, {profile.country}
          </p>
        </div>
      </div>
    </footer>
  );
}
