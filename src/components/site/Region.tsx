import { useI18n } from "@/lib/i18n";
import { Globe } from "./Globe";
import { Reveal } from "./Reveal";

/** Icônes 2D, ligne fine — un pictogramme par carte. */
const icons = [
  // Globe / maillage
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18" />
  </>,
  // Repère de localisation
  <>
    <path d="M12 21s6.5-6.2 6.5-11a6.5 6.5 0 1 0-13 0C5.5 14.8 12 21 12 21Z" />
    <circle cx="12" cy="10" r="2.4" />
  </>,
  // Mise à l'échelle
  <>
    <path d="M4 9V4h5M20 15v5h-5M20 9V4h-5M4 15v5h5" />
    <rect x="9.5" y="9.5" width="5" height="5" />
  </>,
];

export function Region() {
  const { t } = useI18n();

  return (
    <section id="region" className="border-t border-light-gray py-[100px]">
      <div className="shell">
        <Reveal className="text-center">
          <h2 className="font-serif font-bold leading-[1.1] text-ink text-[clamp(34px,5vw,60px)]">
            {t.region.titleStart}
            <span className="text-blue">{t.region.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[620px] font-sans text-[15.5px] leading-[1.7] text-text-body">
            {t.region.lead}
          </p>
        </Reveal>

        <Reveal
          delay={120}
          className="relative mx-auto mt-10 w-full max-w-[860px] border-x border-light-gray"
        >
          <Globe className="block h-[clamp(300px,58vw,620px)] w-full" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-2">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-text-muted">
              {t.region.caption}
            </p>
          </div>
        </Reveal>

        <div className="mt-0 grid gap-px border-t border-light-gray bg-light-gray min-[761px]:grid-cols-3">
          {t.region.cards.map((card, i) => (
            <Reveal
              key={card.title}
              delay={i * 90}
              className="bg-bg-light px-8 py-10 max-[560px]:px-6"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-blue)"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {icons[i]}
              </svg>
              <h3 className="mt-6 font-sans text-[15px] font-semibold text-ink">{card.title}</h3>
              <p className="mt-3 font-sans text-[14.5px] leading-[1.75] text-text-body">
                {card.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
