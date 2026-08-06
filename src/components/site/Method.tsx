import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const STEPS = [
  {
    n: "01",
    title: "Comprendre",
    body: "Immersion dans les processus réels, sans présupposer la solution.",
  },
  {
    n: "02",
    title: "Décoder",
    body: "Traduction du besoin métier en problème technique clairement posé.",
  },
  {
    n: "03",
    title: "Concevoir",
    body: "Conception de solutions durables, dimensionnées à l'organisation.",
  },
  {
    n: "04",
    title: "Accompagner",
    body: "Suivi de l'évolution numérique au-delà de la livraison initiale.",
  },
];

export function Method() {
  return (
    <section id="methode" className="border-t border-light-gray py-[100px]">
      <div className="shell">
        <Reveal className="max-w-[620px]">
          <SectionLabel>La méthode</SectionLabel>
          <h2 className="font-serif font-semibold leading-[1.15] text-ink text-[clamp(30px,3.4vw,42px)]">
            Un processus séquentiel, du diagnostic à l'accompagnement.
          </h2>
        </Reveal>

        <ol className="mt-16 grid grid-cols-1 min-[561px]:grid-cols-2 min-[861px]:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal
              as="li"
              key={step.n}
              delay={i * 80}
              className="border-light-gray px-8 py-2 first:pl-0 max-[560px]:border-t max-[560px]:px-0 max-[560px]:py-6 min-[561px]:[&:not(:first-child)]:border-l"
            >
              <span className="font-sans text-[12px] font-medium tracking-[0.14em] text-blue">
                {step.n}
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
