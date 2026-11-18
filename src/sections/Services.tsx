import { services } from "@/data/content";
import { SectionHead } from "@/components/SectionHead";
import { Icon } from "@/components/Icon";

export function Services() {
  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHead index="05" label="What I do" id="services-title" title="Capabilities." />
        <ol className="service-list">
          {services.map((s, i) => (
            <li key={s.title} className="service reveal">
              <span className="service-index">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-body">{s.body}</p>
              <span className="service-arrow" aria-hidden="true">
                <Icon name="arrow" size={22} />
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
