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

        <div className="mt-20 flex flex-col gap-y-12 min-[861px]:flex-row min-[861px]:items-start min-[861px]:gap-x-8">
          {t.offers.approach.steps.map((step, i) => (
            <Reveal as="div" key={step.title} delay={i * 100} className="min-[861px]:w-1/5">
              <div
                className="min-[861px]:mt-[var(--step-offset)]"
                style={{ ["--step-offset" as string]: `${i * 56}px` }}
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border border-blue bg-bg-light font-sans text-[12px] font-medium text-blue">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-blue">
                    {step.title}
                  </span>
                </span>
                <h3 className="mt-6 font-serif text-[26px] font-semibold leading-[1.1] text-ink">
                  {step.statement}
                </h3>
                <p className="mt-4 font-sans text-[14.5px] leading-[1.7] text-text-body">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
