/**
 * Route `/contact` — page de contact.
 *
 * Affiche les canaux directs (email, LinkedIn, WhatsApp) et le formulaire de
 * contact partagé (`ContactForm`, validation zod côté client). Il n'y a pas
 * encore de backend : la soumission se limite à un toast `sonner`.
 *
 * Les providers (`ThemeProvider`, `I18nProvider`) sont posés une seule fois
 * dans `__root.tsx` : cette route ne fait que rendre ses sections.
 */
import { createFileRoute } from "@tanstack/react-router";

import { ContactForm } from "@/components/site/ContactForm";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { PageBreadcrumb } from "@/components/site/PageBreadcrumb";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import { useI18n } from "@/lib/i18n";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { canonicalLink, seoMeta } from "@/lib/seo";

const title = "Contact · Inference — Discutons de votre projet";
const description =
  "Contactez Inference pour votre projet de transformation numérique : conseil, ingénierie logicielle, communication et formation. Réponse sous 48h.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: seoMeta({ title, description, path: "/contact" }),
    links: canonicalLink("/contact"),
  }),
  component: Contact,
});

function Contact() {
  return <ContactContent />;
}

function ContactContent() {
  const { t } = useI18n();

  useDocumentTitle("Contact · Inference", "Contact · Inference");

  return (
    <>
      <Header />
      <main>
        <PageBreadcrumb current={t.contactPage.breadcrumb} />

        <section className="bg-bg-light py-[110px]">
          <div className="shell flex flex-col items-center text-center">
            <Reveal className="max-w-[860px]">
              <h1 className="font-serif text-[clamp(40px,6vw,74px)] font-bold leading-[1.02] text-ink">
                {t.contactPage.title}
              </h1>
            </Reveal>
            <Reveal
              className="mt-7 max-w-[620px] font-sans text-[15.5px] leading-[1.8] text-text-body"
              delay={120}
            >
              <p>{t.contactPage.hero}</p>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-light-gray py-[90px]">
          <div className="shell grid gap-16 min-[861px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[861px]:items-start">
            <Reveal>
              <SectionLabel>{t.contactPage.introLabel}</SectionLabel>
              <h2 className="font-serif text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.12] text-ink">
                {t.contactPage.introTitle}
              </h2>
              <p className="mt-6 max-w-[380px] font-sans text-[15px] leading-[1.8] text-text-body">
                {t.contactPage.introBody}
              </p>

              <ul className="mt-9 space-y-4 font-sans text-[15px]">
                <li className="flex items-baseline gap-4">
                  <span className="w-[86px] shrink-0 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-blue">
                    {t.contactPage.emailLabel}
                  </span>
                  <a
                    href="mailto:contact@inference.bf"
                    className="text-ink underline-offset-4 hover:underline"
                  >
                    contact@inference.bf
                  </a>
                </li>
                <li className="flex items-baseline gap-4">
                  <span className="w-[86px] shrink-0 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-blue">
                    {t.contactPage.linkedinLabel}
                  </span>
                  <a
                    href="https://www.linkedin.com/company/inference-company"
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink underline-offset-4 hover:underline"
                  >
                    LinkedIn
                  </a>
                </li>
                <li className="flex items-baseline gap-4">
                  <span className="w-[86px] shrink-0 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-blue">
                    {t.contactPage.whatsappLabel}
                  </span>
                  <a
                    href="https://wa.me/22656718337"
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink underline-offset-4 hover:underline"
                  >
                    +226 56 71 83 37
                  </a>
                </li>
              </ul>

              <div className="mt-12 border-t border-light-gray pt-8">
                <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-blue">
                  {t.contactPage.assuranceLabel}
                </p>
                <ul className="mt-6 space-y-4">
                  {t.contactPage.assurances.map((item) => (
                    <li
                      key={item}
                      className="flex gap-4 font-sans text-[14.5px] leading-[1.7] text-text-body"
                    >
                      <span aria-hidden="true" className="mt-[9px] h-px w-4 shrink-0 bg-blue" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <SectionLabel>{t.contactPage.formLabel}</SectionLabel>
              <h2 className="font-serif text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.12] text-ink">
                {t.contactPage.formTitle}
              </h2>

              <div className="mt-10">
                <ContactForm showOrganisation />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
