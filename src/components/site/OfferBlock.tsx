import { useState } from "react";

import { Reveal } from "./Reveal";

type Card = { title: string; statement: string; body: string };

/**
 * Bloc d'offre aligné sur le rythme de la homepage :
 * eyebrow `// Label`, titre sérif à gauche, chapô à droite, puis accordéon en filets.
 */
export function OfferBlock({
  id,
  index,
  label,
  title,
  description,
  cards,
  tone = "light",
}: {
  id: string;
  index: number;
  label: string;
  title: string;
  description: string;
  cards: readonly Card[];
  tone?: "light" | "dark";
}) {
  const [open, setOpen] = useState(0);
  const dark = tone === "dark";

  const accent = dark ? "text-gold" : "text-blue";
  const rule = dark ? "border-soft-white/15" : "border-light-gray";
  const heading = dark ? "text-soft-white" : "text-ink";
  const body = dark ? "text-soft-white/75" : "text-text-body";
  const statement = dark ? "text-soft-white/90" : "text-text-secondary";

  return (
    <section
      id={id}
      className={[
        "scroll-mt-24 border-t py-[100px]",
        rule,
        dark ? "bg-bg-dark" : "",
      ].join(" ")}
    >
      <div className="shell">
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
          <Reveal>
            <p className={`mb-6 font-sans text-[11px] font-medium uppercase tracking-[0.22em] ${accent}`}>
              {`// ${String(index).padStart(2, "0")} — ${label}`}
            </p>
            <h2
              className={`max-w-[560px] font-serif font-bold leading-[1.02] text-[clamp(36px,4.8vw,58px)] ${heading}`}
            >
              {title}
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className={`font-sans text-[15.5px] leading-[1.8] lg:pt-[52px] ${body}`}>
              {description}
            </p>
          </Reveal>
        </div>

        <div className={`mt-16 border-t ${rule}`}>
          {cards.map((card, i) => {
            const isOpen = open === i;
            return (
              <div key={card.title} className={`border-b ${rule}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="group flex w-full items-baseline justify-between gap-6 py-7 text-left"
                >
                  <span className="flex items-baseline gap-5">
                    <span className={`font-sans text-[12px] font-medium tracking-[0.14em] ${accent}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={[
                        "font-serif text-[clamp(22px,2.4vw,28px)] font-semibold leading-[1.15]",
                        "transition-colors duration-300",
                        heading,
                        dark ? "group-hover:text-gold" : "group-hover:text-blue",
                      ].join(" ")}
                    >
                      {card.title}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={[
                      "shrink-0 font-sans text-[22px] font-light leading-none",
                      heading,
                      "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isOpen ? "rotate-45" : "rotate-0",
                    ].join(" ")}
                  >
                    +
                  </span>
                </button>
                <div
                  className={[
                    "grid transition-[grid-template-rows,opacity] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  ].join(" ")}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-x-12 gap-y-3 pb-9 pl-[46px] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                      <p className={`font-serif text-[20px] leading-[1.35] ${statement}`}>
                        {card.statement}
                      </p>
                      <p className={`max-w-[640px] font-sans text-[14.5px] leading-[1.75] ${body}`}>
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
