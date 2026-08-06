import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Method() {
  const { t } = useI18n();

  return (
    <section id="methode" className="border-t border-light-gray py-[100px]">
      <div className="shell">
        <Reveal className="max-w-[620px]">
          <SectionLabel>{t.method.label}</SectionLabel>
          <h2 className="font-serif font-semibold leading-[1.15] text-ink text-[clamp(30px,3.4vw,42px)]">
            {t.method.title}
          </h2>
        </Reveal>

        <ol className="mt-16 grid grid-cols-1 min-[561px]:grid-cols-2 min-[861px]:grid-cols-4">
          {t.method.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 80}
              className="border-light-gray px-8 py-2 first:pl-0 max-[560px]:border-t max-[560px]:px-0 max-[560px]:py-6 min-[561px]:[&:not(:first-child)]:border-l"
            >
              <span className="font-sans text-[12px] font-medium tracking-[0.14em] text-blue">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-[23px] font-semibold text-ink">{step.title}</h3>
              <p className="mt-3 font-sans text-[14.5px] leading-[1.7] text-text-body">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
