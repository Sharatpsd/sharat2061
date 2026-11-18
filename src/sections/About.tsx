import { about, profile } from "@/data/content";
import { SectionHead } from "@/components/SectionHead";
import { SplitText } from "@/components/SplitText";
import portrait560 from "@/assets/img/portrait-560.webp";
import portrait900 from "@/assets/img/portrait-900.webp";

const facts = [
  ["Role", profile.title],
  ["Organization", profile.organization],
  ["Department", "IT & Infrastructure — ERP, Cyber Security & MIS"],
  ["Education", "B.Sc. in CSE, Green University of Bangladesh (2026)"],
  ["Based in", profile.location],
];

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHead index="01" label="About" id="about-title" title="Engineering for the way businesses work." />

        <SplitText as="p" text={about.statement} className="statement scrub-words" />

        <div className="about-grid">
          <figure className="about-portrait">
            <div className="reveal-img portrait-frame" data-cursor="Hello">
              <img
                src={portrait900}
                srcSet={`${portrait560} 560w, ${portrait900} 900w`}
                sizes="(max-width: 760px) 90vw, 36vw"
                width={900}
                height={1350}
                loading="lazy"
                decoding="async"
                alt="Portrait of Sharat Acharja Mugdho in a dark suit"
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
