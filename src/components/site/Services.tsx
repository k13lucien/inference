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

        <div className="mt-16 grid gap-px bg-light-gray min-[761px]:grid-cols-2">
          {t.services.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 90} className="bg-bg-light p-10 max-[560px]:p-6">
              <h3 className="font-serif text-[26px] font-semibold text-ink">{card.title}</h3>
              <p className="mt-5 font-sans text-[15px] leading-[1.75] text-text-body">{card.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
