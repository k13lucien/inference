/**
 * Route `/about` — page « Qui sommes-nous ».
 *
 * Présente la mission, le positionnement, les principes et l'équipe d'Inference.
 * Le titre de document est localisé (`useEffect` sur `locale`) ; le contenu
 * provient de `t.about.*`.
 *
 * Les providers (`ThemeProvider`, `I18nProvider`) sont posés une seule fois
 * dans `__root.tsx` : cette route ne fait que rendre ses sections.
 */
import { createFileRoute, Link } from "@tanstack/react-router";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { PageBreadcrumb } from "@/components/site/PageBreadcrumb";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import { useI18n } from "@/lib/i18n";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Inference · About" },
      { name: "description", content: "Inference about page." },
      { property: "og:title", content: "Inference · About" },
      { property: "og:description", content: "Inference about page." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return <AboutContent />;
}

function AboutContent() {
  const { t } = useI18n();

  useDocumentTitle("Qui sommes-nous · Inference", "Who we are · Inference");

  return (
    <>
      <Header />
      <main>
        <PageBreadcrumb current={t.about.breadcrumb} />

        <section className="relative overflow-hidden bg-bg-light py-[86px] max-[560px]:py-14">
          <div className="shell flex w-full flex-col items-center">
            <h1 className="sr-only">{t.about.title}</h1>

            <Reveal className="flex w-full justify-center">
              <img
                src="/logo-sample.svg"
                alt={t.about.title}
                className="mx-auto h-auto w-full max-w-[480px] select-none dark:invert"
                draggable="false"
              />
            </Reveal>

            <Reveal delay={140} className="mt-12 flex flex-col items-center text-center">
              <div className="max-w-[560px] space-y-5 font-sans text-[15px] leading-[1.8] text-text-body ">
                <p>{t.about.intro}</p>
                <p>{t.about.introBody}</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-light-gray py-[100px]">
          <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <Reveal>
              <SectionLabel>{t.about.whyLabel}</SectionLabel>
              <h2 className="font-serif text-[clamp(31px,4vw,52px)] font-bold leading-[1.08] text-ink">
                {t.about.whyTitle}
              </h2>
            </Reveal>

            <Reveal
              className="space-y-6 pt-1 font-sans text-[15.5px] leading-[1.8] text-text-body"
              delay={120}
            >
              <p>{t.about.whyBody1}</p>
              <p>{t.about.whyBody2}</p>
              <p>{t.about.whyBody3}</p>
            </Reveal>
          </div>
        </section>

        <section className="relative overflow-hidden bg-bg-dark py-[100px] text-soft-white">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 -right-32 h-[420px] w-[420px] rounded-full border border-gold/20"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-52 -left-36 h-[380px] w-[380px] rounded-full border border-gold/15"
          />

          <div className="shell relative grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <Reveal>
              <SectionLabel tone="dark">{t.about.positioningLabel}</SectionLabel>
              <h2 className="font-serif text-[clamp(31px,4vw,52px)] font-bold leading-[1.08]">
                {t.about.positioningTitle}
              </h2>
            </Reveal>

            <Reveal
              className="space-y-6 pt-1 font-sans text-[15.5px] leading-[1.8] text-soft-gray"
              delay={120}
            >
              <p>{t.about.positioningBody1}</p>
              <p>{t.about.positioningBody2}</p>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-light-gray py-[100px]">
          <div className="shell">
            <Reveal>
              <SectionLabel>{t.about.principlesLabel}</SectionLabel>
            </Reveal>

            <div className="mt-12 grid gap-px overflow-hidden border border-light-gray bg-light-gray md:grid-cols-2">
              {t.about.principles.map((item, index) => (
                <Reveal
                  key={item.title}
                  as="article"
                  delay={index * 90}
                  className="bg-bg-light p-8 md:min-h-[240px]"
                >
                  <p className="font-sans text-[12px] font-medium tracking-[0.14em] text-blue">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-7 font-serif text-[24px] font-semibold leading-[1.1] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-4 font-sans text-[14.5px] leading-[1.75] text-text-body">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-light-gray py-[100px]">
          <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <Reveal>
              <SectionLabel>{t.about.teamLabel}</SectionLabel>
              <h2 className="font-serif text-[clamp(31px,4vw,52px)] font-bold leading-[1.08] text-ink">
                {t.about.teamTitle}
              </h2>
            </Reveal>

            <Reveal
              className="space-y-6 pt-1 font-sans text-[15.5px] leading-[1.8] text-text-body"
              delay={120}
            >
              <p>{t.about.teamBody1}</p>
              <p>{t.about.teamBody2}</p>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-light-gray bg-bg-light py-[110px]">
          <div className="shell flex flex-col items-center text-center">
            <Reveal className="max-w-[760px]">
              <h2 className="font-serif text-[clamp(32px,5vw,58px)] font-bold leading-[1.05] text-ink">
                {t.about.ctaTitle}
              </h2>
              <p className="mt-6 font-sans text-[15.5px] leading-[1.8] text-text-body">
                {t.about.ctaBody}
              </p>
            </Reveal>
            <Reveal delay={120}>
              <Link
                to="/contact"
                className="mt-10 inline-block bg-ink px-8 py-4 font-sans text-[14px] font-medium text-soft-white transition-opacity hover:opacity-85"
              >
                {t.about.ctaLink}
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
