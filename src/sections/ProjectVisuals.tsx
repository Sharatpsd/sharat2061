import { research } from "@/data/content";
import bite960 from "@/assets/img/bite-960.webp";
import bite1600 from "@/assets/img/bite-1600.webp";

function BrowserChrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="chrome">
      <div className="chrome-bar" aria-hidden="true">
        <span className="chrome-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="chrome-url">{url}</span>
      </div>
      <div className="chrome-body">{children}</div>
    </div>
  );
}

export function BiteVisual() {
  return (
    <BrowserChrome url="bite-bd.onrender.com">
      <img
        className="bite-shot"
        src={bite1600}
        srcSet={`${bite960} 960w, ${bite1600} 1600w`}
        sizes="(max-width: 960px) 92vw, 55vw"
        width={1600}
        height={724}
        loading="lazy"
        decoding="async"
        alt="Bite food delivery app home page with restaurant listings"
      />
    </BrowserChrome>
  );
}

const steps = ["Draft", "Manager", "HR", "Approved"];

export function OdooVisual() {
  return (
    <div className="odoo" aria-hidden="true">
      <BrowserChrome url="odoo / employee_management">
        <div className="odoo-app">
          <div className="odoo-top">
            <span className="odoo-crumb">Employees</span>
            <span className="odoo-search" />
            <span className="odoo-views">
              <i className="on" />
              <i />
              <i />
            </span>
          </div>
          <div className="odoo-body">
            <aside className="odoo-side">
              {["Departments", "Designations", "Attendance", "Leave", "Documents", "Assets"].map((s, i) => (
                <span key={s} className={i === 0 ? "on" : undefined}>
                  {s}
                </span>
              ))}
            </aside>
            <div className="odoo-kanban">
              {Array.from({ length: 6 }).map((_, i) => (
                <div className="odoo-card" key={i} style={{ ["--i" as string]: i }}>
                  <span className="odoo-avatar" />
                  <span className="odoo-lines">
                    <i />
                    <i />
                  </span>
                  <span className={`odoo-tag t${i % 3}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </BrowserChrome>
      <div className="flow">
        <span className="flow-title">Approval workflow</span>
        <ol>
          {steps.map((s, i) => (
            <li key={s} style={{ ["--i" as string]: i }}>
              {s}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

const modules = [
  { label: "HRMS", x: 50, y: 12 },
  { label: "Accounting", x: 88, y: 30 },
  { label: "Sales", x: 88, y: 70 },
  { label: "Payroll", x: 50, y: 88 },
  { label: "Attendance & Leave", x: 12, y: 70 },
  { label: "Dashboards & KPIs", x: 12, y: 30 },
];

export function ErpVisual() {
  return (
    <div className="erp" aria-hidden="true">
      <svg className="erp-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        {modules.map((m, i) => (
          <line key={m.label} x1="50" y1="50" x2={m.x} y2={m.y} style={{ ["--i" as string]: i }} />
        ))}
        <polygon points={modules.map((m) => `${m.x},${m.y}`).join(" ")} className="erp-ring" />
      </svg>
      <div className="erp-core">
        <span className="erp-core-label">Odoo ERP</span>
        <span className="erp-core-sub">Whole company</span>
      </div>
      {modules.map((m, i) => (
        <span key={m.label} className="erp-node" style={{ left: `${m.x}%`, top: `${m.y}%`, ["--i" as string]: i }}>
          {m.label}
        </span>
      ))}
      <span className="erp-lock">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        Private work · illustration only
      </span>
    </div>
  );
}

export function ResearchVisual() {
  const auc = research.auc;
  const acc = research.accuracy;
  const C = 2 * Math.PI * 42;
  return (
    <div className="research" aria-hidden="true">
      <div className="rs-pipeline">
        <div className="rs-stage">
          <div className="retina">
            <svg viewBox="0 0 100 100">
              <defs>
                <radialGradient id="ret" cx="50%" cy="50%" r="50%">
                  <stop offset="0" stopColor="#d9692f" />
                  <stop offset="0.7" stopColor="#8a2a12" />
                  <stop offset="1" stopColor="#2a0b06" />
                </radialGradient>
                <radialGradient id="cam" cx="62%" cy="44%" r="38%">
                  <stop offset="0" stopColor="#ffe08a" stopOpacity="0.95" />
                  <stop offset="0.45" stopColor="#ff6a3d" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#ff6a3d" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="48" fill="url(#ret)" />
              <g className="vessels" fill="none" stroke="#5a1408" strokeWidth="1.3" strokeLinecap="round">
                <path d="M66 46c-10-8-22-12-40-10" />
                <path d="M66 46c-8 4-20 14-34 30" />
                <path d="M66 46c-2-12-6-24-14-36" />
                <path d="M66 46c4 10 2 22-6 36" />
                <path d="M48 38c-6 2-12 0-18-6" />
                <path d="M44 62c-6 0-12 4-18 4" />
              </g>
              <circle cx="66" cy="46" r="7" fill="#f2b37a" />
              <circle className="gradcam" cx="50" cy="50" r="48" fill="url(#cam)" />
            </svg>
          </div>
          <span className="rs-label">Fundus image · ODIR-5K</span>
        </div>
        <span className="rs-arrow" />
        <div className="rs-stage">
          <div className="resnet">
            {[0, 1, 2, 3, 4].map((i) => (
              <i key={i} style={{ ["--i" as string]: i }} />
            ))}
          </div>
          <span className="rs-label">ResNet50 backbone</span>
        </div>
        <span className="rs-arrow" />
        <div className="rs-stage rs-heads">
          <ul className="rs-classes">
            {research.classes.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <div className="rs-severity">
            <span>Myopia severity</span>
            <i />
          </div>
        </div>
      </div>
      <div className="rs-metrics">
        <div className="rs-metric">
          <svg viewBox="0 0 100 100" className="ring">
            <circle cx="50" cy="50" r="42" className="ring-track" />
            <circle
              cx="50"
              cy="50"
              r="42"
              className="ring-value"
              strokeDasharray={C}
              style={{ ["--off" as string]: C * (1 - auc), ["--full" as string]: C }}
            />
          </svg>
          <span className="rs-num" data-count={auc} data-decimals="4">
            {auc.toFixed(4)}
          </span>
          <span className="rs-cap">Mean AUC</span>
        </div>
        <div className="rs-metric">
          <div className="bar">
            <i style={{ ["--w" as string]: `${acc}%` }} />
          </div>
          <span className="rs-num" data-count={acc} data-decimals="2" data-suffix="%">
            {acc.toFixed(2)}%
          </span>
          <span className="rs-cap">Binary accuracy</span>
        </div>
      </div>
    </div>
  );
}
