/** Engrenage 2D, ligne fine — seul motif graphique complexe de la page (hero). */
export function GearIcon({
  size,
  teeth,
  duration,
  reverse = false,
  opacity,
  className,
}: {
  size: number;
  teeth: number;
  duration: number;
  reverse?: boolean;
  opacity: number;
  className?: string;
}) {
  const r = 42;
  const inner = 30;
  const toothLength = 8;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{
        opacity,
        animation: `gear-spin ${duration}s linear infinite${reverse ? " reverse" : ""}`,
      }}
    >
      <g stroke="var(--color-blue)" strokeWidth="0.9" fill="none">
        <circle cx="50" cy="50" r={r} />
        <circle cx="50" cy="50" r={inner} />
        <circle cx="50" cy="50" r="9" />
        {Array.from({ length: teeth }).map((_, i) => {
          const angle = (i * 360) / teeth;
          return (
            <line
              key={i}
              x1="50"
              y1={50 - r}
              x2="50"
              y2={50 - r - toothLength}
              transform={`rotate(${angle} 50 50)`}
            />
          );
        })}
      </g>
    </svg>
  );
}
