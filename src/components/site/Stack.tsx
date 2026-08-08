import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";

/**
 * Pile technologique — reproduction fidèle du bloc « Build without boundaries » :
 * panneau pleine largeur en fond sombre + texture pointillée, tuiles pivotées en
 * arrière-plan, titre/accroche/boutons centrés, halo bas et bande défilante en pied.
 * Accent or, puisque le fond est sombre.
 */

type Item = { label: string; icon: JSX.Element };

const icon = {
  code: (
    <>
      <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
    </>
  ),
  react: (
    <>
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="9.5" ry="4" />
      <ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(60 12 12)" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="1.5" />
      <rect x="3" y="13" width="18" height="7" rx="1.5" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </>
  ),
  db: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  bolt: (
    <>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </>
  ),
  graph: (
    <>
      <circle cx="12" cy="12" r="3" />
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M6.7 7.4 10 10m4 4 3.4 2.6M14 10l3.4-2.6" />
    </>
  ),
  box: (
    <>
      <path d="M12 3 3 7.5v9L12 21l9-4.5v-9L12 3Z" />
      <path d="M3 7.5 12 12l9-4.5M12 12v9" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18h10a4 4 0 0 0 .4-8A6 6 0 0 0 6 11a3.5 3.5 0 0 0 1 7Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v6c0 4.2 3 7.4 7 9 4-1.6 7-4.8 7-9V6l-7-3Z" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  pulse: (
    <>
      <path d="M3 12h4l2.5-6 4 12L16 12h5" />
    </>
  ),
  git: (
    <>
      <circle cx="7" cy="6" r="2.4" />
      <circle cx="7" cy="18" r="2.4" />
      <circle cx="17" cy="12" r="2.4" />
      <path d="M7 8.4v7.2M9.4 6.8A5.6 5.6 0 0 1 14.6 11" />
    </>
  ),
};

const items: Item[] = [
  { label: "TypeScript", icon: icon.code },
  { label: "React", icon: icon.react },
  { label: "Node.js", icon: icon.server },
  { label: "Python", icon: icon.pulse },
  { label: "Go", icon: icon.bolt },
  { label: "PostgreSQL", icon: icon.db },
  { label: "Redis", icon: icon.bolt },
  { label: "GraphQL", icon: icon.graph },
  { label: "Docker", icon: icon.box },
  { label: "Kubernetes", icon: icon.layers },
  { label: "Terraform", icon: icon.layers },
  { label: "AWS", icon: icon.cloud },
  { label: "Cloudflare Workers", icon: icon.cloud },
  { label: "GitHub Actions", icon: icon.git },
  { label: "Zero Trust", icon: icon.shield },
  { label: "OpenTelemetry", icon: icon.pulse },
];

/** Tuiles décoratives pivotées, comme sur la référence. */
const tiles = [
  { top: "6%", left: "13%", rotate: -14, icon: icon.code },
  { top: "22%", left: "6%", rotate: 9, icon: icon.db },
  { top: "34%", left: "20%", rotate: -8, icon: icon.box },
  { top: "8%", left: "82%", rotate: 12, icon: icon.layers },
  { top: "26%", left: "76%", rotate: -10, icon: icon.graph },
  { top: "40%", left: "89%", rotate: 16, icon: icon.cloud },
];

function Glyph({ children, size = 16 }: { children: JSX.Element; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function Strip() {
  const loop = [...items, ...items];
  return (
    <div className="marquee-viewport relative overflow-hidden border-t border-soft-white/15">
      <div className="marquee-track" style={{ ["--marquee-duration" as string]: "60s" }}>
        {[...loop, ...loop].map((item, i) => (
          <span
            key={`${item.label}-${i}`}
            className="flex shrink-0 items-center gap-3 border-r border-soft-white/12 px-8 py-[18px] text-soft-white/85"
          >
            <span className="text-gold">
              <Glyph>{item.icon}</Glyph>
            </span>
            <span className="font-sans text-[14px] whitespace-nowrap">{item.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Stack() {
  const { t } = useI18n();

  return (
    <section id="stack" className="bg-bg-light px-2 py-2 max-[560px]:px-0">
      <div className="relative isolate overflow-hidden bg-bg-dark">
        {/* Texture pointillée */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-soft-white) 0.6px, transparent 0.6px)",
            backgroundSize: "6px 6px",
          }}
        />

        {/* Tuiles pivotées */}
        {tiles.map((tile, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="pointer-events-none absolute hidden h-[74px] w-[74px] items-center justify-center border border-soft-white/15 text-soft-white/25 min-[861px]:flex"
            style={{
              top: tile.top,
              left: tile.left,
              transform: `rotate(${tile.rotate}deg)`,
            }}
          >
            <Glyph size={26}>{tile.icon}</Glyph>
          </span>
        ))}

        {/* Halo bas */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[8%] left-1/2 h-[46%] w-[62%] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, color-mix(in oklab, var(--color-gold) 55%, transparent), transparent 70%)",
          }}
        />

        <div className="relative px-6 pt-[104px] pb-[132px] text-center max-[560px]:pt-[76px] max-[560px]:pb-[96px]">
          <Reveal className="mx-auto max-w-[780px]">
            <h2 className="mx-auto font-serif font-bold leading-[1.05] text-soft-white text-[clamp(34px,5.2vw,58px)]">
              {t.stack.titleStart}
              <span className="text-gold">{t.stack.titleAccent}</span>
            </h2>
            <p className="mx-auto mt-7 max-w-[600px] font-sans text-[15.5px] leading-[1.7] text-soft-white/80">
              {t.stack.lead}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center bg-soft-white px-7 py-[13px] font-sans text-[14.5px] font-medium text-bg-dark transition-opacity hover:opacity-85"
              >
                {t.stack.ctaPrimary}
              </a>
              <a
                href="#stack"
                className="inline-flex items-center border border-soft-white/25 px-7 py-[13px] font-sans text-[14.5px] font-medium text-soft-white transition-colors hover:border-gold hover:text-gold"
              >
                {t.stack.ctaSecondary}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="relative">
          <Strip />
        </div>
      </div>
    </section>
  );
}
