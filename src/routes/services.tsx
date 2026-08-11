/**
 * Route `/services` — page « Offres ».
 *
 * Détaille les offres d'Inference : technologie, communication et formation
 * (trois `OffersAccordion`, clair / sombre / clair), puis la démarche
 * (`Approach`) et la pile technologique (`Stack`).
 * Le contenu éditable provient de `t.offers.*`.
 *
 * Les providers (`ThemeProvider`, `I18nProvider`) sont posés une seule fois
 * dans `__root.tsx` : cette route ne fait que rendre ses sections.
 */
import { createFileRoute, Link } from "@tanstack/react-router";

import { Approach } from "@/components/site/Approach";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { OffersAccordion } from "@/components/site/OffersAccordion";
import { PageBreadcrumb } from "@/components/site/PageBreadcrumb";
import { Reveal } from "@/components/site/Reveal";
import { Stack } from "@/components/site/Stack";
import { useI18n } from "@/lib/i18n";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Inference · Services" },
      { name: "description", content: "Inference offers page." },
      { property: "og:title", content: "Inference · Services" },
      { property: "og:description", content: "Inference offers page." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

function Services() {
  return <ServicesContent />;
}

function ServicesContent() {
  const { t } = useI18n();

  useDocumentTitle("Offres · Inference", "Services · Inference");

  return (
    <>
      <Header />
      <main>
        <PageBreadcrumb current={t.offers.breadcrumb} />

        <section className="bg-bg-light py-[90px]">
          <div className="shell grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <Reveal>
              <h1 className="max-w-[720px] font-serif text-[clamp(42px,6vw,78px)] font-bold leading-[0.98] text-ink">
                {t.offers.title}
              </h1>
            </Reveal>

            <Reveal className="space-y-8 pt-1" delay={120}>
              <p className="font-sans text-[15.5px] leading-[1.8] text-text-body">
                {t.offers.hero}
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  to="/contact"
                  className="bg-ink px-6 py-3.5 font-sans text-[14px] font-medium text-soft-white transition-opacity hover:opacity-85"
                >
                  {t.offers.ctaPrimary}
                </Link>
                <a
                  href="#technologie"
                  className="font-sans text-[14px] font-medium text-ink underline-offset-4 hover:underline"
                >
                  {t.offers.ctaSecondary} ↓
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <OffersAccordion id="technologie" content={t.offers.tech} />

        <OffersAccordion id="communication" tone="dark" content={t.offers.comm} />

        <OffersAccordion id="formation" content={t.offers.formation} />

        <Approach />

        <Stack />
      </main>
      <Footer />
    </>
  );
}
