/**
 * Route `/contact` — page de contact.
 *
 * Affiche les canaux directs (email, LinkedIn, WhatsApp) et un formulaire.
 * La validation est côté client uniquement (`validate` + `errors`) ; il n'y a
 * pas encore de backend : la soumission se limite à `console.log`.
 *
 * Les providers (`ThemeProvider`, `I18nProvider`) sont posés une seule fois
 * dans `__root.tsx` : cette route ne fait que rendre ses sections.
 */
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Inference · Contact" },
      { name: "description", content: "Inference contact page." },
      { property: "og:title", content: "Inference · Contact" },
      { property: "og:description", content: "Inference contact page." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return <ContactContent />;
}

type FormValues = { name: string; email: string; organisation: string; message: string };
type Errors = Partial<Record<keyof FormValues, string>>;

function ContactContent() {
  const { t, locale } = useI18n();

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    organisation: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    document.title = locale === "fr" ? "Contact · Inference" : "Contact · Inference";
  }, [locale]);

  const validate = (v: FormValues): Errors => {
    const e: Errors = {};
    if (!v.name.trim()) e.name = t.contactPage.required;
    if (!v.email.trim()) e.email = t.contactPage.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = t.contactPage.invalidEmail;
    if (!v.message.trim()) e.message = t.contactPage.required;
    return e;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const e = validate(values);
    setErrors(e);
    setTouched(true);
    if (Object.keys(e).length === 0) {
      // Pas de backend : aucune soumission réelle.
      console.log("contact", values);
    }
  };

  const field =
    "w-full border-0 border-b border-light-gray bg-transparent py-3 font-sans text-[15px] text-ink outline-none transition-colors placeholder:text-text-muted focus:border-blue";

  const set =
    (key: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues({ ...values, [key]: event.target.value });

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
                  <BreadcrumbPage className="text-ink">{t.contactPage.breadcrumb}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

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
            </Reveal>

            <Reveal delay={100}>
              <SectionLabel>{t.contactPage.formLabel}</SectionLabel>
              <h2 className="font-serif text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.12] text-ink">
                {t.contactPage.formTitle}
              </h2>

              <form onSubmit={onSubmit} noValidate className="mt-10 space-y-7">
                <div>
                  <label htmlFor="name" className="sr-only">
                    {t.contactPage.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    className={field}
                    placeholder={t.contactPage.name}
                    value={values.name}
                    onChange={set("name")}
                    aria-invalid={Boolean(errors.name)}
                  />
                  {touched && errors.name && (
                    <p className="mt-2 font-sans text-[12px] text-blue">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="sr-only">
                    {t.contactPage.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={field}
                    placeholder={t.contactPage.email}
                    value={values.email}
                    onChange={set("email")}
                    aria-invalid={Boolean(errors.email)}
                  />
                  {touched && errors.email && (
                    <p className="mt-2 font-sans text-[12px] text-blue">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="organisation" className="sr-only">
                    {t.contactPage.organisation}
                  </label>
                  <input
                    id="organisation"
                    name="organisation"
                    className={field}
                    placeholder={t.contactPage.organisation}
                    value={values.organisation}
                    onChange={set("organisation")}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="sr-only">
                    {t.contactPage.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={`${field} resize-none`}
                    placeholder={t.contactPage.message}
                    value={values.message}
                    onChange={set("message")}
                    aria-invalid={Boolean(errors.message)}
                  />
                  {touched && errors.message && (
                    <p className="mt-2 font-sans text-[12px] text-blue">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-ink px-7 py-4 font-sans text-[14px] font-medium text-soft-white transition-opacity hover:opacity-85"
                >
                  {t.contactPage.submit}
                </button>
              </form>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
