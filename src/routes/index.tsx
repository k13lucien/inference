import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Problem } from "@/components/site/Problem";
import { Services } from "@/components/site/Services";
import { Method } from "@/components/site/Method";
import { Audience } from "@/components/site/Audience";
import { Proof } from "@/components/site/Proof";
import { Positioning } from "@/components/site/Positioning";
import { ContactCta } from "@/components/site/ContactCta";
import { Footer } from "@/components/site/Footer";

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
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Services />
        <Method />
        <Audience />
        <Proof />
        <Positioning />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
