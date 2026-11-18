/** Geometric "SM" monogram, drawn as two strokes so it can be animated. */
export function Monogram({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 96 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="square"
      strokeLinejoin="miter"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path className="mono-s" pathLength={1} d="M40 12H20a9 9 0 0 0 0 18h10a9 9 0 0 1 0 18H8" />
      <path className="mono-m" pathLength={1} d="M54 48V12l16 22 16-22v36" />
    </svg>
  );
}
