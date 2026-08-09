import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Services() {
  const { t } = useI18n();
  const [open, setOpen] = useState(0);

  return (
    <section id="offres" className="border-t border-light-gray py-[100px]">
      <div className="shell">
        <Reveal className="max-w-[720px]">
          <SectionLabel>{t.services.label}</SectionLabel>
          <h2 className="font-serif font-semibold leading-[1.15] text-ink text-[clamp(30px,3.4vw,42px)]">
            {t.services.title}
          </h2>
        </Reveal>

        {/* Horizontal accordion (desktop) */}
        <Reveal className="mt-16 max-[860px]:hidden">
          <div className="flex gap-3">
            {t.services.cards.map((card, i) => {
              const isOpen = open === i;
              return (
                <button
                  key={card.title}
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(i)}
                  onMouseEnter={() => setOpen(i)}
                  className={[
                    "group relative min-h-[420px] overflow-hidden rounded-[36px] border text-left transition-all duration-500 ease-out",
                    isOpen
                      ? "flex-1 border-blue"
                      : "w-[74px] shrink-0 border-light-gray hover:border-blue/50",
                  ].join(" ")}
                >
                  {isOpen ? (
                    <div className="flex h-full flex-col justify-center p-12 max-[1100px]:p-9">
                      <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-blue">
                        {String(i + 1).padStart(2, "0")} — {card.title}
                      </p>
                      <h3 className="mt-6 max-w-[560px] font-serif text-[30px] font-semibold uppercase leading-[1.2] tracking-[0.02em] text-ink max-[1100px]:text-[24px]">
                        {card.statement}
                      </h3>
                      <p className="mt-5 max-w-[560px] font-sans text-[15px] leading-[1.75] text-text-body">
                        {card.body}
                      </p>
                      <Link
                        to="/offres"
                        className="mt-8 font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-blue hover:underline"
                      >
                        {t.services.detailsCta}
                      </Link>
                    </div>
                  ) : (
                    <span className="flex h-full items-center justify-center">
                      <span
                        className="whitespace-nowrap font-sans text-[14px] font-medium tracking-[0.04em] text-ink"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                      >
                        {card.title}
                      </span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Stacked accordion (mobile) */}
        <div className="mt-12 flex flex-col gap-3 min-[861px]:hidden">
          {t.services.cards.map((card, i) => {
            const isOpen = open === i;
            return (
              <div
                key={card.title}
                className={[
                  "overflow-hidden rounded-[28px] border transition-colors",
                  isOpen ? "border-blue" : "border-light-gray",
                ].join(" ")}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-sans text-[13px] font-medium uppercase tracking-[0.18em] text-ink">
                    {card.title}
                  </span>
                  <span className="font-sans text-[18px] leading-none text-blue">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-7">
                    <h3 className="font-serif text-[21px] font-semibold leading-[1.3] text-ink">
                      {card.statement}
                    </h3>
                    <p className="mt-3 font-sans text-[15px] leading-[1.75] text-text-body">
                      {card.body}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
