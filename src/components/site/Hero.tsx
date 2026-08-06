import { Gear } from "./GearIcon";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-[140px] pb-[120px] max-[560px]:pt-20 max-[560px]:pb-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[-140px] hidden -translate-y-1/2 md:block"
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
          <Gear teeth={26} pitch={104} cx={200} cy={240} duration={26} opacity={0.32} />
          <Gear
            teeth={17}
            pitch={68}
            cx={341}
            cy={141}
            duration={17}
            reverse
            opacity={0.28}
            phase={10}
          />
          <Gear teeth={11} pitch={44} cx={443} cy={188} duration={11} opacity={0.22} phase={16} />
        </svg>
      </div>

      <div className="shell relative">
        <Reveal className="max-w-[640px]">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-blue">
            Conseil &amp; ingénierie logicielle
          </p>
          <h1 className="mt-8 font-serif font-bold leading-[1.05] tracking-[-0.01em] text-ink text-[clamp(40px,6vw,72px)]">
            Comprendre avant de <span className="text-blue">construire</span>.
          </h1>
          <p className="mt-8 max-w-[540px] font-sans text-[16px] leading-[1.7] text-text-body">
            Inference accompagne les organisations dans la compréhension de leurs problématiques et
            la conception de solutions numériques durables — pas seulement dans leur exécution
            technique.
          </p>
          <div className="mt-10 flex items-center gap-6">
            <a
              href="#contact"
              className="bg-ink px-6 py-3.5 font-sans text-[14px] font-medium text-soft-white transition-opacity hover:opacity-85"
            >
              Discuter de votre projet
            </a>
            <span className="font-sans text-[13px] text-text-muted">Réponse sous 48h</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
