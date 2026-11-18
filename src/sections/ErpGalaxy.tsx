import { useState } from "react";
import { erp, profile } from "@/data/content";
import { SectionHead } from "@/components/SectionHead";

const inner = erp.modules.slice(0, 3);
const outer = [...erp.modules.slice(3), { name: "Custom modules", short: "Custom", body: "" }];

/**
 * "Galaxy" of Odoo modules orbiting the ERP core. Pure CSS animation; labels
 * counter-rotate so they stay upright. Hovering a module in the list highlights it.
 */
export function ErpGalaxy() {
  const [active, setActive] = useState<string | null>(null);

  const node = (m: { name: string; short: string }, i: number, count: number, offset: number) => (
    <div
      key={m.name}
      className={`gx-node gx-core-node${active === m.name ? " is-on" : ""}`}
      style={{ ["--a" as string]: `${(i * 360) / count + offset}deg` }}
    >
      <span className="gx-pos">
        <span className="gx-label">{m.short}</span>
      </span>
    </div>
  );

  return (
    <section className="section erp-section" id="erp" aria-labelledby="erp-title">
      <div className="container erp-grid">
        <div className="erp-text">
          <SectionHead
            index="02"
            label="ERP expertise"
            id="erp-title"
            title="Every core Odoo module."
            lede={`At ${profile.organization}, I handle the HRMS for the whole company and work across all of these modules.`}
          />
          <ul className="erp-core-list" onMouseLeave={() => setActive(null)}>
            {erp.modules.map((m, i) => (
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
          <p className="erp-related reveal">{erp.customization}</p>
        </div>

        <div className="galaxy-wrap reveal">
          <div
            className={`galaxy${active ? " is-focus" : ""}`}
            role="img"
            aria-label="Diagram: Odoo modules orbiting the ERP core. Inner orbit: HRMS, Accounting, Sales and CRM. Outer orbit: Inventory, Manufacturing, Procurement and custom modules."
          >
            <div className="stars" aria-hidden="true" />
            <svg className="gx-paths" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="27" />
              <circle cx="50" cy="50" r="44" />
            </svg>
            <div className="gx-ring gx-ring-1" aria-hidden="true">
              {inner.map((m, i) => node(m, i, inner.length, -90))}
            </div>
            <div className="gx-ring gx-ring-2" aria-hidden="true">
              {outer.map((m, i) => node(m, i, outer.length, -45))}
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
