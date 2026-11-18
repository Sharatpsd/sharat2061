import { SplitText } from "./SplitText";

type Props = { index: string; label: string; title: string; id: string; lede?: string };

/** Consistent editorial section heading: numbered eyebrow + masked title. */
export function SectionHead({ index, label, title, id, lede }: Props) {
  return (
    <header className="section-head">
      <p className="eyebrow reveal">
        <span className="eyebrow-index">{index}</span>
        <span className="eyebrow-rule" aria-hidden="true" />
        {label}
      </p>
      <SplitText as="h2" id={id} text={title} className="section-title reveal-split" />
      {lede ? <p className="section-lede reveal">{lede}</p> : null}
    </header>
  );
}
