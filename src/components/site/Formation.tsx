import { useState } from "react";

import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function Formation() {
  const { t } = useI18n();
  const [open, setOpen] = useState(0);

  return (
    <section id="formation" className="border-t border-light-gray py-[100px]">
      <div className="shell">
        <Reveal>
          <h2 className="font-serif text-[clamp(54px,9vw,112px)] font-bold leading-[0.95] tracking-[-0.01em] text-ink">
            {t.offers.formation.label}
            <span className="text-blue">.</span>
          </h2>
        </Reveal>

        <div className="mt-12 max-w-[720px]">
          <Reveal>
            <h3 className="font-serif font-semibold leading-[1.1] text-ink text-[clamp(30px,3.6vw,44px)]">
              {t.offers.formation.title}
            </h3>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 font-sans text-[15.5px] leading-[1.8] text-text-body">
              {t.offers.formation.description}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-light-gray">
          {t.offers.formation.cards.map((card, i) => {
            const isOpen = open === i;
            return (
              <div key={card.title} className="border-b border-light-gray">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-baseline justify-between gap-6 py-7 text-left"
                >
                  <span className="flex items-baseline gap-5">
                    <span className="font-sans text-[12px] font-medium tracking-[0.14em] text-blue">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-[26px] font-semibold leading-[1.1] text-ink">
                      {card.title}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={[
                      "shrink-0 font-sans text-[24px] font-light leading-none text-ink",
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
                    <div className="pb-9 pl-[46px]">
                      <p className="font-sans text-[15px] font-medium leading-[1.6] text-text-secondary">
                        {card.statement}
                      </p>
                      <p className="mt-3 max-w-[640px] font-sans text-[14.5px] leading-[1.75] text-text-body">
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
