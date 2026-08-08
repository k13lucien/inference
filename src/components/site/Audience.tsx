import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Audience() {
  const { t } = useI18n();

  return (
    <section id="pour-qui" className="border-t border-light-gray py-[100px]">
      <div className="shell grid gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-x-10">
        <Reveal>
          <SectionLabel>{t.audience.label}</SectionLabel>
          <h2 className="font-serif font-semibold leading-[1.15] text-ink text-[clamp(30px,3.4vw,42px)]">
            {t.audience.title}
          </h2>
        </Reveal>

        <ul>
          {t.audience.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 80}
              className="grid gap-3 border-b border-light-gray py-8 first:pt-0 last:border-b-0 min-[761px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] min-[761px]:gap-10"
            >
              <h3 className="font-serif text-[24px] font-semibold text-ink">{item.title}</h3>
              <p className="font-sans text-[15px] leading-[1.75] text-text-body">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
