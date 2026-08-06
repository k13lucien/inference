import { GearIcon } from "./GearIcon";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[140px] pb-[120px] max-[560px]:pt-20 max-[560px]:pb-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[-90px] hidden -translate-y-1/2 items-center md:flex"
        style={{
          maskImage: "linear-gradient(to left, black 30%, transparent 88%)",
          WebkitMaskImage: "linear-gradient(to left, black 30%, transparent 88%)",
        }}
      >
        <GearIcon size={340} teeth={18} duration={26} opacity={0.28} className="-mr-9" />
        <GearIcon size={215} teeth={14} duration={17} reverse opacity={0.24} className="-mr-6" />
        <GearIcon size={130} teeth={10} duration={11} opacity={0.2} />
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
