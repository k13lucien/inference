import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Services() {
  const { t } = useI18n();

  return (
    <section id="offres" className="border-t border-light-gray py-[100px]">
      <div className="shell">
        <Reveal className="max-w-[720px]">
          <SectionLabel>{t.services.label}</SectionLabel>
          <h2 className="font-serif font-semibold leading-[1.15] text-ink text-[clamp(30px,3.4vw,42px)]">
            {t.services.title}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px border-t border-light-gray bg-light-gray min-[761px]:grid-cols-3">
          {t.services.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 90} className="bg-bg-light p-10 max-[560px]:p-6">
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-blue">
                {card.title}
              </p>
              <h3 className="mt-5 font-serif text-[22px] font-semibold leading-[1.3] text-ink">
                {card.statement}
              </h3>
              <p className="mt-4 font-sans text-[15px] leading-[1.75] text-text-body">
                {card.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={270} className="mt-12">
          <Link
            to="/offres"
            className="inline-block bg-ink px-7 py-4 font-sans text-[14px] font-medium text-soft-white transition-opacity hover:opacity-85"
          >
            {t.services.detailsCta}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
