import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Problem() {
  const { t } = useI18n();

  return (
    <section id="constat" className="border-t border-light-gray py-[100px]">
      <div className="shell grid gap-12 min-[861px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Reveal>
          <SectionLabel>{t.problem.label}</SectionLabel>
          <h2 className="max-w-[420px] font-serif font-semibold leading-[1.15] text-ink text-[clamp(30px,3.4vw,42px)]">
            {t.problem.title}
          </h2>
        </Reveal>
        <Reveal
          delay={80}
          className="space-y-6 font-sans text-[15.5px] leading-[1.75] text-text-body"
        >
          <p>{t.problem.p1}</p>
          <p>{t.problem.p2}</p>
          <p>{t.problem.p3}</p>
        </Reveal>
      </div>
    </section>
  );
}
