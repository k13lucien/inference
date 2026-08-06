import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const CARDS = [
  {
    title: "Conseil",
    body: "Diagnostic des problématiques métier, cadrage des besoins et arbitrages technologiques — avant tout engagement de développement. Nous aidons à poser la bonne question avant de financer une réponse.",
  },
  {
    title: "Ingénierie logicielle",
    body: "Conception et développement de solutions numériques dimensionnées à l'organisation, pensées pour évoluer avec elle plutôt que pour être remplacées dans deux ans.",
  },
];

export function Services() {
  return (
    <section id="offres" className="border-t border-light-gray py-[100px]">
      <div className="shell">
        <Reveal className="max-w-[720px]">
          <SectionLabel>Ce que nous faisons</SectionLabel>
          <h2 className="font-serif font-semibold leading-[1.15] text-ink text-[clamp(30px,3.4vw,42px)]">
            Deux disciplines, une seule responsabilité : la cohérence entre le besoin et le système.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px bg-light-gray min-[761px]:grid-cols-2">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 90} className="bg-bg-light p-10 max-[560px]:p-6">
              <h3 className="font-serif text-[26px] font-semibold text-ink">{card.title}</h3>
              <p className="mt-5 font-sans text-[15px] leading-[1.75] text-text-body">{card.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
