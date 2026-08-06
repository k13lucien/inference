import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const ITEMS = [
  {
    title: "PME en croissance",
    body: "Structuration des outils internes avant qu'ils ne deviennent un frein.",
  },
  {
    title: "Organisations en transformation",
    body: "Refonte de systèmes existants devenus inadaptés aux processus réels.",
  },
  {
    title: "Équipes techniques internes",
    body: "Renfort de cadrage et d'expertise sur des projets complexes ou critiques.",
  },
];

export function Audience() {
  return (
    <section id="pour-qui" className="border-t border-light-gray py-[100px]">
      <div className="shell">
        <Reveal className="max-w-[560px]">
          <SectionLabel>Pour qui</SectionLabel>
          <h2 className="font-serif font-semibold leading-[1.15] text-ink text-[clamp(30px,3.4vw,42px)]">
            Des organisations en phase d'évolution numérique.
          </h2>
        </Reveal>

        <ul className="mt-14">
          {ITEMS.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 80}
              className="grid gap-3 border-b border-light-gray py-8 first:border-t min-[761px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] min-[761px]:gap-10"
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
