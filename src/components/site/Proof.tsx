import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Proof() {
  const { t } = useI18n();

  return (
    <section id="preuve" className="border-t border-light-gray py-[100px]">
      <div className="shell grid gap-14 min-[761px]:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
        <Reveal>
          <SectionLabel>{t.proof.label}</SectionLabel>
          <blockquote>
            <p className="font-serif text-[clamp(24px,2.6vw,32px)] leading-[1.35] font-semibold italic text-text-muted">
              {t.proof.quote}
            </p>
            <footer className="mt-6 font-sans text-[13.5px] text-text-muted">
              {t.proof.author}
            </footer>
          </blockquote>
        </Reveal>

        <Reveal
          delay={90}
          className="border-l border-light-gray pl-8 max-[760px]:border-l-0 max-[760px]:border-t max-[760px]:pt-8 max-[760px]:pl-0"
        >
          <p className="font-serif text-[56px] leading-none font-bold text-ink">—</p>
          <p className="mt-4 font-sans text-[13.5px] leading-[1.6] text-text-muted">
            {t.proof.metric}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
