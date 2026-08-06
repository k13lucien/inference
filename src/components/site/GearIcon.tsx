/**
 * Engrenage 2D, ligne fine (aucun volume, aucune ombre, aucune perspective).
 * Le contour est généré géométriquement pour que les dents s'engrènent réellement.
 */
function gearPath(teeth: number, pitch: number) {
  const outer = pitch * 1.11;
  const root = pitch * 0.88;
  const step = (Math.PI * 2) / teeth;
  const flank = step * 0.13;
  const top = step * 0.2;
  const p: string[] = [];

  const at = (r: number, a: number) =>
    `${(Math.cos(a) * r).toFixed(2)} ${(Math.sin(a) * r).toFixed(2)}`;

  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    p.push(`${i === 0 ? "M" : "L"}${at(root, a)}`);
    p.push(`L${at(outer, a + flank)}`);
    p.push(`L${at(outer, a + flank + top)}`);
    p.push(`L${at(root, a + flank + top + flank)}`);
    p.push(`L${at(root, a + step)}`);
  }
  p.push("Z");
  return p.join(" ");
}

export function Gear({
  teeth,
  pitch,
  cx,
  cy,
  duration,
  reverse = false,
  opacity,
  phase = 0,
}: {
  teeth: number;
  pitch: number;
  cx: number;
  cy: number;
  duration: number;
  reverse?: boolean;
  opacity: number;
  phase?: number;
}) {
  return (
    <g
      style={{
        opacity,
        transformOrigin: `${cx}px ${cy}px`,
        animation: `gear-spin ${duration}s linear infinite${reverse ? " reverse" : ""}`,
      }}
    >
      <g transform={`translate(${cx} ${cy}) rotate(${phase})`}>
        <path
          d={gearPath(teeth, pitch)}
          fill="var(--color-blue)"
          fillOpacity="0.06"
          stroke="var(--color-blue)"
          strokeWidth="1.1"
          strokeLinejoin="miter"
        />
        <circle r={pitch * 0.66} fill="none" stroke="var(--color-blue)" strokeWidth="0.7" />
        <circle r={pitch * 0.17} fill="none" stroke="var(--color-blue)" strokeWidth="1" />
        {Array.from({ length: 4 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1={pitch * 0.17}
            x2="0"
            y2={pitch * 0.66}
            stroke="var(--color-blue)"
            strokeWidth="0.7"
            transform={`rotate(${i * 90})`}
          />
        ))}
      </g>
    </g>
  );
}
