/**
 * Approach — section « Notre manière de travailler » de la route `/services`.
 *
 * Déroule les cinq étapes de la démarche (`t.offers.approach.steps`, « Comprendre →
 * Décoder → Concevoir → Construire → Accompagner ») dans une grille animée au scroll.
 */
import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Approach() {
  const { t } = useI18n();

  return (
    <section id="approche" className="border-t border-light-gray py-[100px]">
      <div className="shell">
        <Reveal className="max-w-[760px]">
          <SectionLabel>{t.offers.approach.label}</SectionLabel>
          <h2 className="font-serif font-bold leading-[1.02] text-ink text-[clamp(38px,5.4vw,64px)]">
            {t.offers.approach.title}
          </h2>
          <p className="mt-7 font-sans text-[15.5px] leading-[1.8] text-text-body">
            {t.offers.approach.subtitle}
          </p>
        </Reveal>

        <div className="mt-16 border-t border-light-gray">
          <div className="grid min-[861px]:grid-cols-5">
            {t.offers.approach.steps.map((step, i) => (
              <Reveal
                as="article"
                key={step.title}
                delay={i * 80}
                className="border-b border-light-gray px-6 pb-10 pt-7 max-[860px]:py-6
                  min-[861px]:border-b-0 min-[861px]:border-l min-[861px]:px-6 min-[861px]:first:border-l-0"
              >
                <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full border border-blue font-sans text-[11px] font-medium text-blue">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-5 block font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-blue">
                  {step.title}
                </span>
                <h3 className="mt-4 font-serif text-[21px] font-semibold leading-[1.1] text-ink">
                  {step.statement}
                </h3>
                <p className="mt-3 font-sans text-[13.5px] leading-[1.7] text-text-body">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
