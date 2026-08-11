/**
 * Route `/services` — page « Offres ».
 *
 * Détaille les offres d'Inference : technologie (TechGrid), communication,
 * formation, démarche (Approach) et pile technologique (Stack).
 * Le contenu éditable provient de `t.offers.*`.
 *
 * Les providers (`ThemeProvider`, `I18nProvider`) sont posés une seule fois
 * dans `__root.tsx` : cette route ne fait que rendre ses sections.
 */
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { Footer } from "@/components/site/Footer";
import { Approach } from "@/components/site/Approach";
import { Communication } from "@/components/site/Communication";
import { Formation } from "@/components/site/Formation";
import { Header } from "@/components/site/Header";
import { Reveal } from "@/components/site/Reveal";
import { Stack } from "@/components/site/Stack";
import { TechGrid } from "@/components/site/TechGrid";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useI18n } from "@/lib/i18n";

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
  const { t, locale } = useI18n();

  useEffect(() => {
    document.title = locale === "fr" ? "Offres · Inference" : "Services · Inference";
  }, [locale]);

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-light-gray bg-bg-light py-7">
          <div className="shell">
            <Breadcrumb>
              <BreadcrumbList className="font-sans text-[13px] text-text-muted">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className="hover:text-ink">
                    <Link to="/">{t.nav.home}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-light-gray" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-ink">{t.offers.breadcrumb}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

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
                <a
                  href="/contact"
                  className="bg-ink px-6 py-3.5 font-sans text-[14px] font-medium text-soft-white transition-opacity hover:opacity-85"
                >
                  {t.offers.ctaPrimary}
                </a>
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

        <TechGrid />

        <Communication />

        <Formation />

        <Approach />

        <Stack />
      </main>
      <Footer />
    </>
  );
}
