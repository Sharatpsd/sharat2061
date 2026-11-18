import { useState } from "react";
import { erp, profile } from "@/data/content";
import { SectionHead } from "@/components/SectionHead";

/**
 * "Galaxy" of ERP modules: the three core modules orbit close to Odoo,
 * related features orbit further out. Pure CSS animation; labels counter-rotate
 * so they stay upright. Hovering a module in the list highlights it in orbit.
 */
export function ErpGalaxy() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="section erp-section" id="erp" aria-labelledby="erp-title">
      <div className="container erp-grid">
        <div className="erp-text">
          <SectionHead
            index="02"
            label="ERP expertise"
            id="erp-title"
            title="One ERP. The whole company."
            lede={`At ${profile.organization}, I handle the HRMS for the entire company and build key features in Accounting and Sales.`}
          />
          <ul className="erp-core-list" onMouseLeave={() => setActive(null)}>
            {erp.core.map((m, i) => (
              <li
                key={m.name}
                className={`reveal${active === m.name ? " is-on" : ""}`}
                onMouseEnter={() => setActive(m.name)}
              >
                <span className="erp-core-index">0{i + 1}</span>
                <div>
                  <h3>{m.name}</h3>
                  <p>{m.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="erp-related reveal">
            <span className="muted">Also:</span> {erp.related.join(" · ")}
          </p>
        </div>

        <div className="galaxy-wrap reveal">
          <div className={`galaxy${active ? " is-focus" : ""}`} role="img" aria-label="Diagram: HRMS, Accounting and Sales orbit around Odoo ERP, with related features in an outer orbit.">
            <div className="stars" aria-hidden="true" />
            <svg className="gx-paths" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="27" />
              <circle cx="50" cy="50" r="44" />
            </svg>
            <div className="gx-ring gx-ring-1" aria-hidden="true">
              {erp.core.map((m, i) => (
                <div
                  key={m.name}
                  className={`gx-node gx-core-node${active === m.name ? " is-on" : ""}`}
                  style={{ ["--a" as string]: `${i * 120 - 90}deg` }}
                >
                  <span className="gx-pos">
                    <span className="gx-label">{m.name}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="gx-ring gx-ring-2" aria-hidden="true">
              {erp.related.map((r, i) => (
                <div key={r} className="gx-node" style={{ ["--a" as string]: `${(i * 360) / erp.related.length - 70}deg` }}>
                  <span className="gx-pos">
                    <span className="gx-label">{r}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="gx-sun" aria-hidden="true">
              <span>Odoo</span>
              <small>ERP</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
