import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

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
import { I18nProvider, useI18n } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";

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
  return (
    <ThemeProvider>
      <I18nProvider>
        <AboutContent />
      </I18nProvider>
    </ThemeProvider>
  );
}

function AboutContent() {
  const { t, locale } = useI18n();

  useEffect(() => {
    document.title = locale === "fr" ? "Qui sommes-nous · Inference" : "Who we are · Inference";
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
                  <BreadcrumbPage className="text-ink">{t.about.breadcrumb}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        <section className="bg-bg-light py-[90px]">
          <div className="shell grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <Reveal>
              <SectionLabel>{t.about.label}</SectionLabel>
              <h1 className="max-w-[720px] font-serif text-[clamp(42px,6vw,78px)] font-bold leading-[0.98] text-ink">
                {t.about.title}
              </h1>
            </Reveal>

            <Reveal
              className="space-y-6 pt-1 font-sans text-[15.5px] leading-[1.8] text-text-body"
              delay={120}
            >
              <p>{t.about.intro}</p>
              <p>{t.about.introSample}</p>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-light-gray bg-bg-light py-[84px]">
          <div className="shell">
            <Reveal className="max-w-[720px]">
              <SectionLabel>{t.about.approachLabel}</SectionLabel>
              <h2 className="font-serif text-[clamp(31px,4vw,52px)] font-bold leading-[1.08] text-ink">
                {t.about.approachTitle}
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-px overflow-hidden border border-light-gray bg-light-gray md:grid-cols-3">
              {t.about.principles.map((item, index) => (
                <Reveal
                  key={item.title}
                  as="article"
                  delay={index * 90}
                  className="bg-bg-light p-7 md:min-h-[260px]"
                >
                  <p className="font-sans text-[12px] font-medium text-blue">{`0${index + 1}`}</p>
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
              <SectionLabel tone="dark">{t.about.closingLabel}</SectionLabel>
              <h2 className="font-serif text-[clamp(32px,5vw,58px)] font-bold leading-[1.05]">
                {t.about.closingTitle}
              </h2>
            </Reveal>
            <Reveal className="font-sans text-[15.5px] leading-[1.8] text-soft-gray" delay={120}>
              <p>{t.about.closingBody}</p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
