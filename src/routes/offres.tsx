import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { Footer } from "@/components/site/Footer";
import { Communication } from "@/components/site/Communication";
import { Formation } from "@/components/site/Formation";
import { Header } from "@/components/site/Header";
import { Method } from "@/components/site/Method";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
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
import { I18nProvider, useI18n } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";

export const Route = createFileRoute("/offres")({
  head: () => ({
    meta: [
      { title: "Inference · Offres" },
      { name: "description", content: "Inference offers page." },
      { property: "og:title", content: "Inference · Offres" },
      { property: "og:description", content: "Inference offers page." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Offres,
});

function Offres() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <OffresContent />
      </I18nProvider>
    </ThemeProvider>
  );
}

function OffresContent() {
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
                  href="/#contact"
                  className="bg-ink px-6 py-3.5 font-sans text-[14px] font-medium text-soft-white transition-opacity hover:opacity-85"
                >
                  {t.offers.ctaPrimary}
                </a>
                <a
                  href="#offres"
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

        <Stack />

        <Method />

        <section className="bg-bg-dark py-[92px] text-soft-white">
          <div className="shell grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-end">
            <Reveal>
              <SectionLabel tone="dark">{t.offers.detailLabel}</SectionLabel>
              <h2 className="font-serif text-[clamp(32px,5vw,58px)] font-bold leading-[1.05]">
                {t.offers.detailTitle}
              </h2>
            </Reveal>
            <Reveal className="font-sans text-[15.5px] leading-[1.8] text-soft-gray" delay={120}>
              <p>{t.offers.detailBody}</p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
