/**
 * OffersAccordion — bloc « Offres » à accordéon vertical.
 *
 * Généralise les trois sections `/services` qui étaient quasi identiques :
 * Technologie (clair), Communication (sombre), Formation (clair). Seuls changent
 * l'ancre (`id`), le ton (fond/sémantique de couleurs) et la branche du dict
 * i18n passés en props.
 *
 * Le panneau ouvert est piloté par un `useState` local (un seul ouvert à la fois) ;
 * le contenu provient de `content` (`{ label, title, description, cards[] }`).
 */
import { useState } from "react";

import { Reveal } from "./Reveal";

type Card = { title: string; statement: string; body: string };
type Block = { label: string; title: string; description: string; cards: readonly Card[] };

type Tone = "light" | "dark";

const toneClass: Record<
  Tone,
  {
    section: string;
    display: string;
    dot: string;
    heading: string;
    body: string;
    rule: string;
    accent: string;
    itemTitle: string;
    plus: string;
    statement: string;
    itemBody: string;
  }
> = {
  light: {
    section: "border-t border-light-gray py-[100px]",
    display: "text-ink",
    dot: "text-blue",
    heading: "text-ink",
    body: "text-text-body",
    rule: "border-light-gray",
    accent: "text-blue",
    itemTitle: "text-ink",
    plus: "text-ink",
    statement: "text-text-secondary",
    itemBody: "text-text-body",
  },
  dark: {
    section: "border-t border-light-gray bg-bg-dark py-[100px] text-soft-white",
    display: "text-soft-white",
    dot: "text-gold",
    heading: "text-soft-white",
    body: "text-soft-gray",
    rule: "border-soft-white/15",
    accent: "text-gold",
    itemTitle: "text-soft-white",
    plus: "text-soft-white",
    statement: "text-soft-white/85",
    itemBody: "text-soft-white/75",
  },
};

export function OffersAccordion({
  id,
  tone = "light",
  content,
}: {
  id: string;
  tone?: Tone;
  content: Block;
}) {
  const c = toneClass[tone];
  const [open, setOpen] = useState(0);

  return (
    <section id={id} className={c.section}>
      <div className="shell">
        <Reveal>
          <h2
            className={`font-serif text-[clamp(54px,9vw,112px)] font-bold leading-[0.95] tracking-[-0.01em] ${c.display}`}
          >
            {content.label}
            <span className={c.dot}>.</span>
          </h2>
        </Reveal>

        <div className="mt-12 max-w-[720px]">
          <Reveal>
            <h3
              className={`font-serif font-semibold leading-[1.1] ${c.heading} text-[clamp(30px,3.6vw,44px)]`}
            >
              {content.title}
            </h3>
          </Reveal>
          <Reveal delay={120}>
            <p className={`mt-6 font-sans text-[15.5px] leading-[1.8] ${c.body}`}>
              {content.description}
            </p>
          </Reveal>
        </div>

        <div className={`mt-16 border-t ${c.rule}`}>
          {content.cards.map((card, i) => {
            const isOpen = open === i;
            return (
              <div key={card.title} className={`border-b ${c.rule}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-baseline justify-between gap-6 py-7 text-left"
                >
                  <span className="flex items-baseline gap-5">
                    <span
                      className={`font-sans text-[12px] font-medium tracking-[0.14em] ${c.accent}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-serif text-[26px] font-semibold leading-[1.1] ${c.itemTitle}`}
                    >
                      {card.title}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={[
                      `mt-1 shrink-0 ${c.plus}`,
                      "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isOpen ? "rotate-45" : "rotate-0",
                    ].join(" ")}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <line x1="9" y1="1" x2="9" y2="17" stroke="currentColor" strokeWidth="1.3" />
                      <line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </span>
                </button>
                <div
                  className={[
                    "grid transition-[grid-template-rows,opacity] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  ].join(" ")}
                >
                  <div className="overflow-hidden">
                    <div className="pb-9 pl-[46px]">
                      <p
                        className={`font-sans text-[15px] font-medium leading-[1.6] ${c.statement}`}
                      >
                        {card.statement}
                      </p>
                      <p
                        className={`mt-3 max-w-[640px] font-sans text-[14.5px] leading-[1.75] ${c.itemBody}`}
                      >
                        {card.body}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
