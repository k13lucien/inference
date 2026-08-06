import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Locale = "fr" | "en";

const STORAGE_KEY = "inference-locale";

export const dict = {
  fr: {
    nav: {
      about: "Qui sommes-nous",
      offers: "Offres",
      audience: "Pour qui",
      contact: "Contact",
      cta: "Discuter de votre projet",
      menu: "Menu",
      close: "Fermer",
      main: "Navigation principale",
      mobile: "Navigation mobile",
      themeLabel: "Basculer le thème clair / sombre",
      langLabel: "Changer la langue",
    },
    hero: {
      eyebrow: "Conseil & ingénierie logicielle",
      titleStart: "Comprendre avant de ",
      titleAccent: "construire",
      lead: "Inference accompagne les organisations dans la compréhension de leurs problématiques et la conception de solutions numériques durables — pas seulement dans leur exécution technique.",
      cta: "Discuter de votre projet",
      note: "Réponse sous 48h",
    },
    problem: {
      label: "Le constat",
      title: "La complexité freine la décision, pas le manque d'outils.",
      p1: "La plupart des organisations n'échouent pas faute de technologie disponible. Elles échouent parce que le besoin métier a été mal traduit en solution — trop tôt, sans compréhension suffisante du terrain.",
      p2: "Le résultat : des outils qui répondent à un problème mal posé, une dette technique qui s'accumule, et des décisions prises sans visibilité sur leurs conséquences réelles.",
      p3: "Inference intervient en amont, pour décoder la complexité avant de la traduire en système.",
    },
    services: {
      label: "Ce que nous faisons",
      title:
        "Deux disciplines, une seule responsabilité : la cohérence entre le besoin et le système.",
      cards: [
        {
          title: "Conseil",
          body: "Diagnostic des problématiques métier, cadrage des besoins et arbitrages technologiques — avant tout engagement de développement. Nous aidons à poser la bonne question avant de financer une réponse.",
        },
        {
          title: "Ingénierie logicielle",
          body: "Conception et développement de solutions numériques dimensionnées à l'organisation, pensées pour évoluer avec elle plutôt que pour être remplacées dans deux ans.",
        },
      ],
    },
    method: {
      label: "La méthode",
      title: "Un processus séquentiel, du diagnostic à l'accompagnement.",
      steps: [
        {
          title: "Comprendre",
          body: "Immersion dans les processus réels, sans présupposer la solution.",
        },
        {
          title: "Décoder",
          body: "Traduction du besoin métier en problème technique clairement posé.",
        },
        {
          title: "Concevoir",
          body: "Conception de solutions durables, dimensionnées à l'organisation.",
        },
        {
          title: "Accompagner",
          body: "Suivi de l'évolution numérique au-delà de la livraison initiale.",
        },
      ],
    },
    audience: {
      label: "Pour qui",
      title: "Des organisations en phase d'évolution numérique.",
      items: [
        {
          title: "PME en croissance",
          body: "Structuration des outils internes avant qu'ils ne deviennent un frein.",
        },
        {
          title: "Organisations en transformation",
          body: "Refonte de systèmes existants devenus inadaptés aux processus réels.",
        },
        {
          title: "Équipes techniques internes",
          body: "Renfort de cadrage et d'expertise sur des projets complexes ou critiques.",
        },
      ],
    },
    proof: {
      label: "Preuve",
      quote: "« Emplacement réservé pour une citation client réelle, une fois disponible. »",
      author: "— Nom, poste, organisation",
      metric: "Chiffre concret à renseigner (ex. nombre de projets, gain mesuré)",
    },
    positioning: {
      label: "Positionnement",
      titleStart: "Nous ne vendons pas des outils. ",
      titleAccent: "Nous décodons des problèmes.",
      body: "La confiance ne vient pas de la promesse technologique, mais de la précision du diagnostic et de la maîtrise de son exécution.",
    },
    contact: {
      title: "Parlons de votre problématique avant de parler solution.",
      name: "Nom",
      email: "Email professionnel",
      message: "Votre contexte, en quelques lignes",
      submit: "Envoyer",
      required: "Ce champ est requis.",
      invalidEmail: "Adresse email invalide.",
    },
    footer: {
      tagline:
        "Decode the Complex. Conseil et ingénierie logicielle pour organisations en évolution numérique.",
      navTitle: "Navigation",
      contactTitle: "Contact",
      discuss: "Discuter d'un projet",
      legal: "Mentions légales",
      rights: "© 2026 Inference",
      footerNav: "Navigation de pied de page",
    },
  },
  en: {
    nav: {
      about: "Who we are",
      offers: "Services",
      audience: "Who it's for",
      contact: "Contact",
      cta: "Discuss your project",
      menu: "Menu",
      close: "Close",
      main: "Main navigation",
      mobile: "Mobile navigation",
      themeLabel: "Toggle light / dark theme",
      langLabel: "Change language",
    },
    hero: {
      eyebrow: "Consulting & software engineering",
      titleStart: "Understand before you ",
      titleAccent: "build",
      lead: "Inference helps organisations understand their real problems and design durable digital solutions — not just execute them technically.",
      cta: "Discuss your project",
      note: "Reply within 48h",
    },
    problem: {
      label: "The observation",
      title: "Complexity slows decisions down — not a lack of tools.",
      p1: "Most organisations don't fail for lack of available technology. They fail because the business need was poorly translated into a solution — too early, without a sufficient understanding of the field.",
      p2: "The result: tools answering a badly framed problem, technical debt piling up, and decisions made without visibility on their real consequences.",
      p3: "Inference steps in upstream, to decode complexity before translating it into a system.",
    },
    services: {
      label: "What we do",
      title: "Two disciplines, one responsibility: coherence between the need and the system.",
      cards: [
        {
          title: "Consulting",
          body: "Diagnosis of business problems, needs framing and technology trade-offs — before any development commitment. We help ask the right question before funding an answer.",
        },
        {
          title: "Software engineering",
          body: "Design and development of digital solutions sized for the organisation, built to evolve with it rather than to be replaced in two years.",
        },
      ],
    },
    method: {
      label: "The method",
      title: "A sequential process, from diagnosis to long-term support.",
      steps: [
        {
          title: "Understand",
          body: "Immersion in real processes, without presupposing the solution.",
        },
        {
          title: "Decode",
          body: "Translation of the business need into a clearly framed technical problem.",
        },
        { title: "Design", body: "Durable solutions, sized for the organisation." },
        { title: "Support", body: "Guiding digital evolution well beyond the initial delivery." },
      ],
    },
    audience: {
      label: "Who it's for",
      title: "Organisations going through digital evolution.",
      items: [
        {
          title: "Growing SMEs",
          body: "Structuring internal tools before they become a bottleneck.",
        },
        {
          title: "Organisations in transformation",
          body: "Rebuilding legacy systems that no longer fit real processes.",
        },
        {
          title: "Internal engineering teams",
          body: "Extra framing and expertise on complex or critical projects.",
        },
      ],
    },
    proof: {
      label: "Proof",
      quote: "\u201cPlaceholder for a real client quote, once available.\u201d",
      author: "— Name, role, organisation",
      metric: "Concrete figure to be filled in (e.g. number of projects, measured gain)",
    },
    positioning: {
      label: "Positioning",
      titleStart: "We don't sell tools. ",
      titleAccent: "We decode problems.",
      body: "Trust doesn't come from a technology promise, but from the precision of the diagnosis and the mastery of its execution.",
    },
    contact: {
      title: "Let's talk about your problem before talking solutions.",
      name: "Name",
      email: "Work email",
      message: "Your context, in a few lines",
      submit: "Send",
      required: "This field is required.",
      invalidEmail: "Invalid email address.",
    },
    footer: {
      tagline:
        "Decode the Complex. Consulting and software engineering for organisations in digital evolution.",
      navTitle: "Navigation",
      contactTitle: "Contact",
      discuss: "Discuss a project",
      legal: "Legal notice",
      rights: "© 2026 Inference",
      footerNav: "Footer navigation",
    },
  },
} as const;

export type Dict = (typeof dict)["fr"];

const I18nContext = createContext<{ locale: Locale; t: Dict; toggleLocale: () => void }>({
  locale: "fr",
  t: dict.fr,
  toggleLocale: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "en") setLocale(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === "fr" ? "en" : "fr";
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return (
    <I18nContext.Provider value={{ locale, t: dict[locale] as Dict, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
