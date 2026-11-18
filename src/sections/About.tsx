import { about, profile } from "@/data/content";
import { SectionHead } from "@/components/SectionHead";
import { SplitText } from "@/components/SplitText";
import city640 from "@/assets/img/city-640.webp";
import city1100 from "@/assets/img/city-1100.webp";

const facts = [
  ["Role", profile.title],
  ["Company", profile.organization],
  ["Focus", "Odoo ERP: all core modules"],
  ["Education", "B.Sc. in CSE, Green University (2026)"],
  ["Office", `${profile.location}, ${profile.country}`],
];

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHead index="01" label="About" id="about-title" title="A little about me." />

        <SplitText as="p" text={about.statement} className="statement scrub-words" />

        <div className="about-grid">
          <figure className="about-portrait">
            <div className="reveal-img portrait-frame" data-cursor="Hello">
              <img
                src={city1100}
                srcSet={`${city640} 640w, ${city1100} 1100w`}
                sizes="(max-width: 760px) 90vw, 36vw"
                width={1100}
                height={1507}
                loading="lazy"
                decoding="async"
                alt="Sharat walking through Dhaka at night, seen from behind"
              />
            </div>
            <figcaption className="reveal">
              <span>{profile.name}</span>
              <span className="muted">{profile.title}</span>
            </figcaption>
          </figure>

          <div className="about-body">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 20)} className="reveal">
                {p}
              </p>
            ))}

            <h3 className="about-sub reveal">How I approach problems</h3>
            <ol className="principles">
              {about.principles.map((pr, i) => (
                <li key={pr.title} className="reveal">
                  <span className="principle-index">0{i + 1}</span>
                  <div>
                    <h4>{pr.title}</h4>
                    <p>{pr.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <dl className="facts">
          {facts.map(([k, v]) => (
            <div key={k} className="fact reveal">
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
