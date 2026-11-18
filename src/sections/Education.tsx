import { education } from "@/data/content";
import { SectionHead } from "@/components/SectionHead";

export function Education() {
  return (
    <section className="section education" id="education" aria-labelledby="education-title">
      <div className="container">
        <SectionHead index="08" label="Education" id="education-title" title="Education." />
        <ol className="ledger">
          {education.map((e, i) => (
            <li key={e.school} className={`ledger-row reveal${i === 0 ? " is-major" : ""}`}>
              <span className="ledger-year">{e.year}</span>
              <div className="ledger-main">
                <h3>{e.school}</h3>
                <p>{e.degree}</p>
              </div>
              <span className="ledger-detail">{e.detail}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
