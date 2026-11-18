import { createElement, Fragment, type ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  by?: "chars" | "words";
  className?: string;
  id?: string;
};

/**
 * Splits text into masked words or characters for GSAP reveals.
 * Assistive tech reads one visually hidden copy of the text; the split spans are hidden from it.
 */
export function SplitText({ text, as = "span", by = "words", className, id }: Props) {
  const words = text.split(" ");
  return createElement(
    as,
    { className, id },
    <>
      <span className="sr-only">{text}</span>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span className="split-word" aria-hidden="true">
            {by === "chars"
              ? [...word].map((ch, ci) => (
                  <span className="split-char" key={ci}>
                    {ch}
                  </span>
                ))
              : <span className="split-inner">{word}</span>}
          </span>
          {wi < words.length - 1 ? <span aria-hidden="true"> </span> : null}
        </Fragment>
      ))}
    </>,
  );
}
