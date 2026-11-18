import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollTrigger, scrollToTarget, setScrollLocked, startSmoothScroll } from "@/lib/motion";
import { initReveals } from "@/lib/reveals";
import { Loader } from "@/components/Loader";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { ErpGalaxy } from "@/sections/ErpGalaxy";
import { Experience } from "@/sections/Experience";
import { Projects } from "@/sections/Projects";
import { Expertise } from "@/sections/Expertise";
import { Services } from "@/sections/Services";
import { Education } from "@/sections/Education";
import { Activity } from "@/sections/Activity";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

export default function App() {
  const main = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    setScrollLocked(true);
    startSmoothScroll();
    return initReveals(main.current!);
  }, []);

  const onIntroDone = useCallback(() => {
    setScrollLocked(false);
    setReady(true);
    ScrollTrigger.refresh();
    const hash = window.location.hash.slice(1);
    if (hash) requestAnimationFrame(() => scrollToTarget(hash));
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Loader onDone={onIntroDone} />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main id="main" ref={main}>
        <Hero ready={ready} />
        <About />
        <ErpGalaxy />
        <Experience />
        <Projects />
        <Expertise />
        <Services />
        <Education />
        <Activity />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
