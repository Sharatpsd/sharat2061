import { useState, type FormEvent } from "react";
import { profile } from "@/data/content";
import { sendMessage } from "@/lib/sendMessage";
import { SplitText } from "@/components/SplitText";
import { Magnetic } from "@/components/Magnetic";
import { Icon } from "@/components/Icon";

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;
const empty = { name: "", email: "", subject: "", message: "" };

function validate(f: typeof empty): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (f.message.trim().length < 10) e.message = "Please write a message of at least 10 characters.";
  return e;
}

export function Contact() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k as keyof Errors]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const honeypot = (e.currentTarget.elements.namedItem("bot-field") as HTMLInputElement | null)?.value;
    if (honeypot) return;
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      await sendMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || "Portfolio enquiry",
        message: form.message.trim(),
      });
      setForm(empty);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const field = (k: "name" | "email" | "subject" | "message", label: string, opts: { type?: string; area?: boolean; optional?: boolean; auto?: string }) => {
    const err = errors[k as keyof Errors];
    const common = {
      id: `f-${k}`,
      name: k,
      value: form[k],
      onChange: set(k),
      placeholder: " ",
      "aria-invalid": err ? true : undefined,
      "aria-describedby": err ? `f-${k}-err` : undefined,
      autoComplete: opts.auto,
    };
    return (
      <div className={`field${err ? " has-error" : ""}${opts.area ? " field-area" : ""}`}>
        {opts.area ? <textarea {...common} rows={5} /> : <input {...common} type={opts.type ?? "text"} />}
        <label htmlFor={`f-${k}`}>
          {label}
          {opts.optional ? <span className="muted"> (optional)</span> : null}
        </label>
        <span className="field-line" aria-hidden="true" />
        {err ? (
          <span className="field-error" id={`f-${k}-err`}>
            {err}
          </span>
        ) : null}
      </div>
    );
  };

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-glow" aria-hidden="true" />
      <div className="container">
        <p className="eyebrow reveal">
          <span className="eyebrow-index">09</span>
          <span className="eyebrow-rule" aria-hidden="true" />
          Let&rsquo;s connect
        </p>
        <h2 className="contact-title" id="contact-title">
          <SplitText text="Have an interesting" className="reveal-split contact-line" />
          {" "}
          <SplitText text="project in mind?" className="reveal-split contact-line serif" />
        </h2>
        <p className="contact-lede reveal">Let&rsquo;s build something meaningful together.</p>

        <div className="contact-grid">
          <form className="contact-form reveal" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit} noValidate>
            <input type="hidden" name="form-name" value="contact" />
            <p className="hp" aria-hidden="true">
              <label>
                Leave this field empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>
            <div className="field-row">
              {field("name", "Your name", { auto: "name" })}
              {field("email", "Email address", { type: "email", auto: "email" })}
            </div>
            {field("subject", "Subject", { optional: true })}
            {field("message", "Tell me about your project", { area: true })}

            <div className="form-foot">
              <Magnetic strength={0.2}>
                <button className="btn btn-primary btn-lg" type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send message"}
                  <Icon name="arrow" />
                </button>
              </Magnetic>
              <p className={`form-status is-${status}`} role="status" aria-live="polite">
                {status === "sent" && "Thank you. Your message has been sent, and I will get back to you soon."}
                {status === "error" && (
                  <>
                    Something went wrong while sending. Please email me directly at{" "}
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>.
                  </>
                )}
              </p>
            </div>
          </form>

          <aside className="contact-aside" aria-label="Other ways to reach me">
            <div className="contact-item reveal">
              <span className="contact-label">Email</span>
              <div className="contact-email">
                <a href={`mailto:${profile.email}`} className="link-underline">
                  {profile.email}
                </a>
                <button className="icon-btn" onClick={copy} aria-label={copied ? "Email copied" : "Copy email address"}>
                  <Icon name={copied ? "check" : "copy"} size={16} />
                </button>
              </div>
            </div>
            <div className="contact-item reveal">
              <span className="contact-label">Elsewhere</span>
              <ul className="contact-links">
                <li>
                  <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                    <Icon name="linkedin" />
                    LinkedIn
                    <Icon name="external" size={14} className="ext" />
                  </a>
                </li>
                <li>
                  <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
                    <Icon name="github" />
                    GitHub
                    <Icon name="external" size={14} className="ext" />
                  </a>
                </li>
                <li>
                  <a href={profile.links.resume} target="_blank" rel="noopener noreferrer">
                    <Icon name="file" />
                    Resume
                    <Icon name="external" size={14} className="ext" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="contact-item reveal">
              <span className="contact-label">Based in</span>
              <p>{profile.location}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
