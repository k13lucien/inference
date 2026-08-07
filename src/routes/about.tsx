import { Link, createFileRoute } from "@tanstack/react-router";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";

const title = "Qui sommes-nous · Inference";
const description =
  "Découvrez l'approche, l'équipe et les principes qui guident Inference dans ses missions de conseil et d'ingénierie logicielle.";

const principles = [
  {
    title: "Comprendre avant de construire",
    body: "Nous partons des usages réels, des contraintes métier et des objectifs mesurables avant de proposer une solution.",
  },
  {
    title: "Concevoir pour durer",
    body: "Chaque choix technique doit rester lisible, maintenable et capable d'accompagner l'évolution de l'organisation.",
  },
  {
    title: "Avancer avec clarté",
    body: "Nous privilégions des décisions explicites, des jalons courts et une communication directe sur les risques.",
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Header />
        <main>
          <section className="border-b border-light-gray bg-bg-light py-7">
            <div className="shell">
              <Breadcrumb>
                <BreadcrumbList className="font-sans text-[13px] text-text-muted">
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild className="hover:text-ink">
                      <Link to="/">Accueil</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-light-gray" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-ink">Qui sommes-nous</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </section>

          <section className="bg-bg-light py-[90px]">
            <div className="shell grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
              <Reveal>
                <SectionLabel>Qui sommes-nous</SectionLabel>
                <h1 className="max-w-[720px] font-serif text-[clamp(42px,6vw,78px)] font-bold leading-[0.98] text-ink">
                  Une équipe pensée pour décoder les problèmes complexes.
                </h1>
              </Reveal>

              <Reveal
                className="space-y-6 pt-1 font-sans text-[15.5px] leading-[1.8] text-text-body"
                delay={120}
              >
                <p>
                  Inference accompagne les organisations qui veulent transformer une situation
                  métier complexe en système numérique clair, utile et durable.
                </p>
                <p>
                  Cet espace est un contenu exemple : vous pourrez y détailler votre histoire, vos
                  expertises, vos valeurs, votre équipe ou votre manière de travailler.
                </p>
              </Reveal>
            </div>
          </section>

          <section className="border-y border-light-gray bg-bg-light py-[84px]">
            <div className="shell">
              <Reveal className="max-w-[720px]">
                <SectionLabel>Notre approche</SectionLabel>
                <h2 className="font-serif text-[clamp(31px,4vw,52px)] font-bold leading-[1.08] text-ink">
                  Des principes simples pour cadrer, construire et accompagner.
                </h2>
              </Reveal>

              <div className="mt-12 grid gap-px overflow-hidden border border-light-gray bg-light-gray md:grid-cols-3">
                {principles.map((item, index) => (
                  <Reveal
                    key={item.title}
                    as="article"
                    delay={index * 90}
                    className="bg-bg-light p-7 md:min-h-[260px]"
                  >
                    <p className="font-sans text-[12px] font-medium text-blue">0{index + 1}</p>
                    <h3 className="mt-8 font-serif text-[29px] font-semibold leading-[1.05] text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-5 font-sans text-[14.5px] leading-[1.75] text-text-body">
                      {item.body}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-bg-dark py-[92px] text-soft-white">
            <div className="shell grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-end">
              <Reveal>
                <SectionLabel tone="dark">À adapter</SectionLabel>
                <h2 className="font-serif text-[clamp(32px,5vw,58px)] font-bold leading-[1.05]">
                  Votre histoire peut prendre place ici.
                </h2>
              </Reveal>
              <Reveal className="font-sans text-[15.5px] leading-[1.8] text-soft-gray" delay={120}>
                <p>
                  Ajoutez une présentation plus personnelle, quelques chiffres clés, une citation,
                  ou les profils des personnes qui composent l'équipe. La structure est
                  volontairement simple pour rester facile à modifier.
                </p>
              </Reveal>
            </div>
          </section>
        </main>
        <Footer />
      </I18nProvider>
    </ThemeProvider>
  );
}
