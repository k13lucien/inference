import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Positioning() {
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
          <SectionLabel tone="dark">Positionnement</SectionLabel>
          <h2 className="font-serif font-bold leading-[1.1] text-[clamp(32px,5vw,56px)]">
            Nous ne vendons pas des outils.{" "}
            <span className="text-gold">Nous décodons des problèmes.</span>
          </h2>
          <p className="mt-9 max-w-[620px] font-sans text-[15.5px] leading-[1.75] text-soft-gray">
            La confiance ne vient pas de la promesse technologique, mais de la précision du
            diagnostic et de la maîtrise de son exécution.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
