import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

/** Pile technologique — deux bandes défilantes en sens opposés. */
const rowOne = [
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Go",
  "PostgreSQL",
  "Redis",
  "GraphQL",
];

const rowTwo = [
  "Docker",
  "Kubernetes",
  "Terraform",
  "AWS",
  "Cloudflare Workers",
  "GitHub Actions",
  "Tailwind CSS",
  "OpenTelemetry",
];

function Item({ label }: { label: string }) {
  return (
    <span className="mx-px flex shrink-0 items-center gap-3 border-r border-light-gray bg-bg-light px-7 py-5">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-blue)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 7h16M4 12h10M4 17h6" />
      </svg>
      <span className="font-sans text-[14px] font-medium whitespace-nowrap text-ink">{label}</span>
    </span>
  );
}

function Marquee({
  items,
  direction = "left",
  duration,
}: {
  items: string[];
  direction?: "left" | "right";
  duration: number;
}) {
  const loop = [...items, ...items];
  return (
    <div className="marquee-viewport overflow-hidden border-t border-light-gray">
      <div
        className="marquee-track"
        data-direction={direction}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {loop.map((label, i) => (
          <Item key={`${label}-${i}`} label={label} />
        ))}
        {loop.map((label, i) => (
          <Item key={`dup-${label}-${i}`} label={label} />
        ))}
      </div>
    </div>
  );
}

export function Stack() {
  const { t } = useI18n();

  return (
    <section id="stack" className="border-t border-light-gray py-[100px]">
      <div className="shell">
        <Reveal className="max-w-[760px]">
          <SectionLabel>{t.stack.label}</SectionLabel>
          <h2 className="font-serif font-bold leading-[1.1] text-ink text-[clamp(32px,5vw,56px)]">
            {t.stack.titleStart}
            <span className="text-blue">{t.stack.titleAccent}</span>
          </h2>
          <p className="mt-8 max-w-[620px] font-sans text-[15.5px] leading-[1.75] text-text-body">
            {t.stack.lead}
          </p>
        </Reveal>
      </div>

      <Reveal delay={120} className="mt-14 border-b border-light-gray">
        <Marquee items={rowOne} duration={46} />
        <Marquee items={rowTwo} direction="right" duration={54} />
      </Reveal>

      <div className="shell">
        <p className="mt-8 font-sans text-[13px] leading-[1.7] text-text-muted">{t.stack.note}</p>
      </div>
    </section>
  );
}
