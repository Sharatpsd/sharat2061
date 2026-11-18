import { useRef, useState } from "react";
import { skills } from "@/data/content";
import { SectionHead } from "@/components/SectionHead";

const symbols: Record<string, string> = {
  "Odoo 19": "Od",
  "Python ORM": "Or",
  "XML Views": "Xv",
  OWL: "Ow",
  "ERP Customization": "Ec",
  HRMS: "Hr",
  "Business Workflow Automation": "Wf",
  Django: "Dj",
  "Django REST Framework": "Rf",
  "REST API": "Ap",
  "Node.js": "Nd",
  "React.js": "Re",
  Vite: "Vi",
  HTML5: "Ht",
  CSS3: "Cs",
  "Tailwind CSS": "Tw",
  Python: "Py",
  JavaScript: "Js",
  PostgreSQL: "Pg",
  Git: "Gt",
  GitHub: "Gh",
  PyCharm: "Pc",
  Postman: "Pm",
  Figma: "Fg",
};

export function Expertise() {
  const [active, setActive] = useState<string | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = skills.find((s) => s.key === active);
  let n = 0;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + skills.length) % skills.length;
    tabs.current[next]?.focus();
    setActive(skills[next].key);
  };

  return (
    <section className="section expertise" id="expertise" aria-labelledby="expertise-title">
      <div className="container">
        <SectionHead
          index="04"
          label="Technical expertise"
          id="expertise-title"
          title="A focused toolkit, used every day."
          lede="No percentages or self-scored bars. These are the technologies I actually build with, grouped by where they fit."
        />

        <div className="expertise-layout">
          <div className="expertise-filters" role="group" aria-label="Filter skills by area">
            {skills.map((g, i) => (
              <button
                key={g.key}
                ref={(el) => (tabs.current[i] = el)}
                className={`filter reveal${active === g.key ? " is-on" : ""}`}
                aria-pressed={active === g.key}
                onClick={() => setActive((a) => (a === g.key ? null : g.key))}
                onMouseEnter={() => setActive(g.key)}
                onFocus={(e) => e.currentTarget.matches(":focus-visible") && setActive(g.key)}
                onKeyDown={(e) => onKey(e, i)}
                data-group={g.key}
              >
                <span className="filter-count">{String(g.items.length).padStart(2, "0")}</span>
                <span className="filter-title">{g.title}</span>
              </button>
            ))}
            <p className="expertise-note" aria-live="polite">
              {current ? current.note : "Hover or select an area to see how each part of the toolkit is used."}
            </p>
          </div>

          <ul
            className={`periodic${active ? " is-filtered" : ""}`}
            aria-label="Technologies"
            onMouseLeave={() => setActive(null)}
          >
            {skills.flatMap((g) =>
              g.items.map((item) => {
                n += 1;
                return (
                  <li
                    key={item}
                    className={`element reveal${active === g.key ? " is-match" : ""}`}
                    data-group={g.key}
                  >
                    <span className="element-n" aria-hidden="true">
                      {String(n).padStart(2, "0")}
                    </span>
                    <span className="element-sym" aria-hidden="true">
                      {symbols[item] ?? item.slice(0, 2)}
                    </span>
                    <span className="element-name">{item}</span>
                    <span className="element-group" aria-hidden="true">
                      {g.title}
                    </span>
                  </li>
                );
              }),
            )}
          </ul>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k} className="marquee-group">
              {skills.flatMap((g) => g.items).map((s) => (
                <span key={s + k}>
                  {s}
                  <i>✦</i>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
