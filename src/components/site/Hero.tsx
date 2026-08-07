import { useI18n } from "@/lib/i18n";
import { Gear } from "./GearIcon";
import { Reveal } from "./Reveal";

export function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-8 pb-[120px] max-[560px]:pt-8 max-[560px]:pb-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[-40px] hidden -translate-y-1/2 md:block"
        style={{
          maskImage: "linear-gradient(to left, black 30%, transparent 88%)",
          WebkitMaskImage: "linear-gradient(to left, black 30%, transparent 88%)",
        }}
      >
        <svg
          viewBox="60 90 470 300"
          width="720"
          height="460"
          className="max-[1180px]:w-[560px] max-[1180px]:h-[360px]"
        >
          {/* Entraxes = somme des rayons primitifs, phases calculées pour un engrènement exact. */}
          <Gear
            teeth={26}
            pitch={104}
            cx={200}
            cy={240}
            duration={26}
            opacity={0.32}
            phase={-38.18}
          />
          <Gear
            teeth={17}
            pitch={68}
            cx={340.9}
            cy={141.3}
            duration={17}
            reverse
            opacity={0.28}
            phase={129.54}
          />
          <Gear
            teeth={11}
            pitch={44}
            cx={439.3}
            cy={194.8}
            duration={11}
            opacity={0.22}
            phase={184.64}
          />
        </svg>
      </div>

      <div className="shell relative">
        <Reveal className="max-w-[640px]">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-blue">
            {t.hero.eyebrow}
          </p>
          <h1 className="mt-8 font-serif font-bold leading-[1.05] tracking-[-0.01em] text-ink text-[clamp(40px,6vw,72px)]">
            {t.hero.titleStart}
            <span className="text-blue">{t.hero.titleAccent}</span>.
          </h1>
          <p className="mt-8 max-w-[540px] font-sans text-[16px] leading-[1.7] text-text-body">
            {t.hero.lead}
          </p>
          <div className="mt-10 flex items-center gap-6">
            <a
              href="#contact"
              className="bg-ink px-6 py-3.5 font-sans text-[14px] font-medium text-soft-white transition-opacity hover:opacity-85"
            >
              {t.hero.cta}
            </a>
            <span className="font-sans text-[13px] text-text-muted">{t.hero.note}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
