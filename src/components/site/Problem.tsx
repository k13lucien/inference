import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Problem() {
  return (
    <section id="constat" className="border-t border-light-gray py-[100px]">
      <div className="shell grid gap-12 min-[861px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Reveal>
          <SectionLabel>Le constat</SectionLabel>
          <h2 className="max-w-[420px] font-serif font-semibold leading-[1.15] text-ink text-[clamp(30px,3.4vw,42px)]">
            La complexité freine la décision, pas le manque d'outils.
          </h2>
        </Reveal>
        <Reveal delay={80} className="space-y-6 font-sans text-[15.5px] leading-[1.75] text-text-body">
          <p>
            La plupart des organisations n'échouent pas faute de technologie disponible. Elles
            échouent parce que le besoin métier a été mal traduit en solution — trop tôt, sans
            compréhension suffisante du terrain.
          </p>
          <p>
            Le résultat : des outils qui répondent à un problème mal posé, une dette technique qui
            s'accumule, et des décisions prises sans visibilité sur leurs conséquences réelles.
          </p>
          <p>
            Inference intervient en amont, pour décoder la complexité avant de la traduire en
            système.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
