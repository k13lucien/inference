import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Proof() {
  return (
    <section id="preuve" className="border-t border-light-gray py-[100px]">
      <div className="shell grid gap-14 min-[761px]:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
        <Reveal>
          <SectionLabel>Preuve</SectionLabel>
          <blockquote>
            <p className="font-serif text-[clamp(24px,2.6vw,32px)] leading-[1.35] font-semibold italic text-text-muted">
              « Emplacement réservé pour une citation client réelle, une fois disponible. »
            </p>
            <footer className="mt-6 font-sans text-[13.5px] text-text-muted">
              — Nom, poste, organisation
            </footer>
          </blockquote>
        </Reveal>

        <Reveal delay={90} className="border-l border-light-gray pl-8 max-[760px]:border-l-0 max-[760px]:border-t max-[760px]:pt-8 max-[760px]:pl-0">
          <p className="font-serif text-[56px] leading-none font-bold text-ink">—</p>
          <p className="mt-4 font-sans text-[13.5px] leading-[1.6] text-text-muted">
            Chiffre concret à renseigner (ex. nombre de projets, gain mesuré)
          </p>
        </Reveal>
      </div>
    </section>
  );
}
