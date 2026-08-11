/**
 * Positioning — section d'accueil « Positionnement » (`t.positioning.*`).
 *
 * Fond sombre (règles de tokens : accent or sur fond sombre).
 */
import { useI18n } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Positioning() {
  const { t } = useI18n();

  return (
    <section
      id="qui-sommes-nous"
      className="relative overflow-hidden bg-bg-dark py-[100px] text-soft-white"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 h-[420px] w-[420px] rounded-full border border-gold/20"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -left-36 h-[380px] w-[380px] rounded-full border border-gold/15"
      />

      <div className="shell relative">
        <Reveal className="max-w-[820px]">
          <SectionLabel tone="dark">{t.positioning.label}</SectionLabel>
          <h2 className="font-serif font-bold leading-[1.1] text-[clamp(32px,5vw,56px)]">
            {t.positioning.titleStart}
            <span className="text-gold">{t.positioning.titleAccent}</span>
            {t.positioning.titleEnd}
          </h2>
          <p className="mt-9 max-w-[620px] font-sans text-[15.5px] leading-[1.75] text-soft-gray">
            {t.positioning.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
