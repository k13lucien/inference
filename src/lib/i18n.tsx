import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Locale = "fr" | "en";

const STORAGE_KEY = "inference-locale";

export const dict = {
  fr: {
    nav: {
      home: "Accueil",
      about: "Qui sommes-nous",
      offers: "Offres",
      realizations: "Réalisations",
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
      eyebrow: "// Conseil, ingénierie & transformation digitale",
      titleStart: "Decode the ",
      titleAccent: "complex",
      lead: "Nous transformons les défis complexes des organisations en solutions numériques claires, fiables et adaptées à leurs réalités.",
      cta: "Discuter de votre projet",
      note: "Réponse sous 48h",
    },
    problem: {
      label: "// Notre philosophie",
      title: "Construire ce qui compte.",
      p1: "La technologie ouvre de nombreuses possibilités. Notre rôle est de déterminer lesquelles créent réellement de la valeur.",
      p2: "Nous commençons par comprendre les usages, les contraintes et les objectifs avant de concevoir une solution. Parce qu'un système efficace n'est pas celui qui accumule les fonctionnalités, mais celui qui répond avec précision aux besoins de ceux qui l'utilisent.",
      p3: "Chaque décision technique doit servir une finalité : simplifier les parcours, améliorer les opérations et permettre aux organisations d'évoluer durablement.",
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
    region: {
      titleStart: "Périmètre : ",
      titleAccent: "monde entier",
      lead: "Une seule équipe pour cadrer, construire et opérer — au plus près de vos métiers, où qu'ils soient.",
      caption: "Réseau de diffusion",
      cards: [
        {
          title: "Intervenir partout",
          body: "Cadrage, ingénierie et suivi menés à distance comme sur site, sur trois continents et six fuseaux horaires.",
        },
        {
          title: "Intervenir au bon endroit",
          body: "Nous nous plaçons près de vos équipes, de vos données et de vos processus réels, jamais à côté.",
        },
        {
          title: "Intervenir à la bonne échelle",
          body: "Des systèmes qui suivent votre croissance sans replanification permanente.",
        },
      ],
    },
    stack: {
      label: "Pile technologique",
      titleStart: "Construire ",
      titleAccent: "sans frontières.",
      lead: "Une pile choisie pour la fiabilité et la longévité, pas pour la mode : langages typés, données solides, déploiement reproductible et observabilité de bout en bout.",
      note: "Le choix technologique découle toujours du diagnostic, jamais l'inverse.",
    },
    positioning: {
      label: "Positionnement",
      titleStart: "Nous ne vendons pas des outils. ",
      titleAccent: "Nous décodons des problèmes.",
      body: "La confiance ne vient pas de la promesse technologique, mais de la précision du diagnostic et de la maîtrise de son exécution.",
    },
    about: {
      breadcrumb: "Qui sommes-nous",
      label: "Qui sommes-nous",
      title: "Une équipe pensée pour décoder les problèmes complexes.",
      intro:
        "Inference accompagne les organisations qui veulent transformer une situation métier complexe en système numérique clair, utile et durable.",
      introSample:
        "Cet espace est un contenu exemple : vous pourrez y détailler votre histoire, vos expertises, vos valeurs, votre équipe ou votre manière de travailler.",
      approachLabel: "Notre approche",
      approachTitle: "Des principes simples pour cadrer, construire et accompagner.",
      principles: [
        {
          title: "Comprendre avant de construire",
          body: "Nous partons des usages réels, des contraintes métier et des objectifs mesurables avant de proposer une solution.",
        },
        {
          title: "Concevoir pour durer",
          body: "Chaque choix technique doit rester lisible, maintenable et capable d'accompagner l'évolution de l'organisation.",
        },
        {
          title: "Avancer avec clarté",
          body: "Nous privilégions des décisions explicites, des jalons courts et une communication directe sur les risques.",
        },
      ],
      closingLabel: "À adapter",
      closingTitle: "Votre histoire peut prendre place ici.",
      closingBody:
        "Ajoutez une présentation plus personnelle, quelques chiffres clés, une citation, ou les profils des personnes qui composent l'équipe. La structure est volontairement simple pour rester facile à modifier.",
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
      home: "Home",
      about: "Who we are",
      offers: "Services",
      realizations: "Work",
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
      eyebrow: "// Consulting, engineering & digital transformation",
      titleStart: "Decode the ",
      titleAccent: "complex",
      lead: "We transform complex organizational challenges into clear, reliable digital solutions built around your unique needs.",
      cta: "Discuss your project",
      note: "Reply within 48h",
    },
    problem: {
      label: "// Our Philosophy",
      title: "Build What Matters.",
      p1: "Technology opens up countless possibilities. Our role is to identify the ones that create real value.",
      p2: "We begin by understanding real-world usage, constraints, and objectives before designing a solution. Because an effective system is not the one that simply accumulates features, but the one that precisely addresses the needs of the people who use it.",
      p3: "Every technical decision should serve a purpose: simplifying experiences, improving operations, and enabling organizations to evolve sustainably.",
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
    region: {
      titleStart: "Scope: ",
      titleAccent: "planet-wide",
      lead: "One team to frame, build and operate — close to your business, wherever it runs.",
      caption: "Delivery network",
      cards: [
        {
          title: "Work everywhere",
          body: "Framing, engineering and follow-up delivered remotely or on site, across three continents and six time zones.",
        },
        {
          title: "Work in the right place",
          body: "We sit close to your teams, your data and your real processes — never beside them.",
        },
        {
          title: "Work at the right scale",
          body: "Systems that follow your growth without constant capacity replanning.",
        },
      ],
    },
    positioning: {
      label: "Positioning",
      titleStart: "We don't sell tools. ",
      titleAccent: "We decode problems.",
      body: "Trust doesn't come from a technology promise, but from the precision of the diagnosis and the mastery of its execution.",
    },
    about: {
      breadcrumb: "Who we are",
      label: "Who we are",
      title: "A team built to decode complex problems.",
      intro:
        "Inference helps organisations turn complex business situations into clear, useful, durable digital systems.",
      introSample:
        "This is sample content: you can later replace it with your story, expertise, values, team, or way of working.",
      approachLabel: "Our approach",
      approachTitle: "Simple principles for framing, building, and supporting.",
      principles: [
        {
          title: "Understand before building",
          body: "We start from real usage, business constraints, and measurable goals before proposing a solution.",
        },
        {
          title: "Design to last",
          body: "Every technical choice should stay readable, maintainable, and able to support the organisation as it evolves.",
        },
        {
          title: "Move with clarity",
          body: "We favour explicit decisions, short milestones, and direct communication about risk.",
        },
      ],
      closingLabel: "To adapt",
      closingTitle: "Your story can live here.",
      closingBody:
        "Add a more personal introduction, a few key figures, a quote, or the profiles of the people on the team. The structure is intentionally simple so it stays easy to edit.",
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
