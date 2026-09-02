/**
 * Route `/` — page d'accueil.
 *
 * Compose la page de marketing : hero, philosophie, services (accordéon),
 * audience, présence géographique, positionnement et appel à l'action.
 * Chaque bloc est un composant de `components/site` ; le contenu éditable
 * provient du dict i18n (`t.hero.*`, `t.problem.*`, …).
 *
 * Les providers (`ThemeProvider`, `I18nProvider`) sont posés une seule fois
 * dans `__root.tsx` : cette route ne fait que rendre ses sections.
 */
import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Problem } from "@/components/site/Problem";
import { ServicesPreview } from "@/components/site/ServicesPreview";
import { Audience } from "@/components/site/Audience";
import { Region } from "@/components/site/Region";

import { Positioning } from "@/components/site/Positioning";
import { ContactCta } from "@/components/site/ContactCta";
import { Footer } from "@/components/site/Footer";
import { SITE_URL, OG_IMAGE, canonicalLink, seoMeta } from "@/lib/seo";

const title = "Inference · Conseil & ingénierie logicielle";
const description =
  "Inference décode la complexité métier avant de la traduire en système : diagnostic, cadrage et ingénierie logicielle durable.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: seoMeta({ title, description, path: "/" }),
    links: canonicalLink("/"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Inference",
          description,
          url: SITE_URL,
          email: "contact@inference.bf",
          image: OG_IMAGE,
          areaServed: "BF",
          priceRange: "€€",
          slogan: "Decode the Complex.",
          sameAs: ["https://www.linkedin.com"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <ServicesPreview />
        <Audience />
        <Region />

        <Positioning />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
