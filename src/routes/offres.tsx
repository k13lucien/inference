import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { Footer } from "@/components/site/Footer";
import { Approach } from "@/components/site/Approach";
import { Communication } from "@/components/site/Communication";
import { Formation } from "@/components/site/Formation";
import { Header } from "@/components/site/Header";
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

        <section className="bg-bg-light py-[110px]">
          <div className="shell grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <Reveal>
              <SectionLabel>{`// ${t.offers.breadcrumb}`}</SectionLabel>
              <h1 className="max-w-[720px] font-serif text-[clamp(42px,6vw,72px)] font-bold leading-[1.0] text-ink">
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
                  href="#technologie"
                  className="font-sans text-[14px] font-medium text-ink underline-offset-4 hover:underline"
                >
                  {t.offers.ctaSecondary} ↓
                </a>
              </div>
            </Reveal>
          </div>

          <div className="shell mt-16">
            <ul className="grid border-t border-light-gray sm:grid-cols-3">
              {[
                { id: "technologie", label: t.offers.tech.label },
                { id: "communication", label: t.offers.comm.label },
                { id: "formation", label: t.offers.formation.label },
              ].map((item, i) => (
                <li key={item.id} className="border-b border-light-gray sm:border-b-0">
                  <a
                    href={`#${item.id}`}
                    className="group flex items-baseline gap-4 py-6 sm:py-7"
                  >
                    <span className="font-sans text-[11px] font-medium tracking-[0.18em] text-blue">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-[24px] font-semibold leading-none text-ink transition-colors group-hover:text-blue">
                      {item.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="ml-auto pr-6 font-sans text-[13px] text-text-muted transition-transform duration-300 group-hover:translate-y-0.5"
                    >
                      ↓
                    </span>
                  </a>
                </li>
              ))}
            </ul>
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
