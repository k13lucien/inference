import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Problem } from "@/components/site/Problem";
import { Services } from "@/components/site/Services";
import { Audience } from "@/components/site/Audience";
import { Region } from "@/components/site/Region";

import { Positioning } from "@/components/site/Positioning";
import { ContactCta } from "@/components/site/ContactCta";
import { Footer } from "@/components/site/Footer";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";

const title = "Inference · Conseil & ingénierie logicielle";
const description =
  "Inference décode la complexité métier avant de la traduire en système : diagnostic, cadrage et ingénierie logicielle durable.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Header />
        <main>
          <Hero />
          <Problem />
          <Services />
          <Audience />
          <Region />

          <Positioning />
          <ContactCta />
        </main>
        <Footer />
      </I18nProvider>
    </ThemeProvider>
  );
}
