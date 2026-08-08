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
      label: "// Ce que nous faisons",
      title: "Vous accompagner, du diagnostic à la pratique quotidienne.",
      cards: [
        {
          title: "Technologie",
          statement: "Faire de la technologie un levier durable, au service de votre organisation.",
          body: "Nous concevons des solutions qui s'intègrent à votre fonctionnement, répondent à vos besoins réels et peuvent évoluer au rythme de votre organisation.",
        },
        {
          title: "Communication",
          statement: "Faire de votre communication un prolongement cohérent de votre organisation.",
          body: "Nous donnons forme à votre identité et à vos messages pour qu'ils expriment clairement ce que vous êtes, ce que vous faites et la valeur que vous apportez.",
        },
        {
          title: "Formation",
          statement:
            "Donner à vos équipes les moyens de comprendre, d'utiliser et de faire évoluer leurs pratiques.",
          body: "Nous transmettons des compétences directement utiles, en lien avec les outils, les méthodes et les enjeux de votre organisation.",
        },
      ],
      detailsCta: "Voir le détail de nos offres →",
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
      label: "// Pour qui",
      title: "À chaque contexte, sa réponse.",
      items: [
        {
          title: "PME en croissance",
          body: "Structurer vos outils, votre présence et les compétences de vos équipes.",
        },
        {
          title: "Organisations en transformation",
          body: "Moderniser vos systèmes, votre image et les pratiques de vos équipes, au même rythme que votre organisation évolue.",
        },
        {
          title: "Startups",
          body: "Construire vite, mais avec une base technique, une identité et des pratiques internes qui tiennent dans la durée.",
        },
        {
          title: "Équipes techniques internes",
          body: "Renfort d'expertise et d'architecture sur des projets complexes.",
        },
      ],
    },
    region: {
      titleStart: "Proche de vous, ",
      titleAccent: "où que vous soyez.",
      lead: "Une même équipe pour cadrer, construire et accompagner vos projets, où que votre organisation soit.",
      caption: "Réseau de diffusion",
      cards: [
        {
          title: "Une présence mondiale",
          body: "Nous travaillons à distance comme sur site, au-delà des frontières et des fuseaux horaires, avec la même rigueur.",
        },
        {
          title: "Proches de vos réalités",
          body: "Nous nous intégrons à vos équipes, vos données et vos processus pour comprendre votre environnement et répondre à vos enjeux.",
        },
        {
          title: "Une continuité dans le temps",
          body: "Nous restons présents au-delà de la mise en œuvre, pour accompagner l'évolution de vos solutions au rythme de votre organisation.",
        },
      ],
    },
    stack: {
      label: "Pile technologique",
      titleStart: "Construire ",
      titleAccent: "sans frontières.",
      lead: "Une pile choisie pour la fiabilité et la longévité, pas pour la mode : langages typés, données solides, déploiement reproductible et observabilité de bout en bout.",
      ctaPrimary: "Discuter de votre projet",
      ctaSecondary: "Voir la pile",
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
    offers: {
      breadcrumb: "Offres",
      label: "// Ce que nous faisons",
      title: "Vous accompagner, du diagnostic à la pratique quotidienne.",
      intro:
        "Trois disciplines, une seule responsabilité : la cohérence entre le besoin et le système.",
      introSample:
        "Cet espace est un contenu exemple : vous pourrez y détailler chacune de nos offres, leurs périmètres, leurs modalités et leurs livrables.",
      detailLabel: "À compléter",
      detailTitle: "Le détail de chaque offre prendra place ici.",
      detailBody:
        "Ajoutez pour chaque discipline le périmètre, les livrables, les modalités d'intervention et un exemple de démarrage.",
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
      label: "// What we do",
      title: "Supporting you from diagnosis to everyday practice.",
      cards: [
        {
          title: "Technology",
          statement: "Making technology a lasting asset to your organization.",
          body: "We design solutions that fit naturally into the way you work, address your real needs, and evolve with your organization.",
        },
        {
          title: "Communication",
          statement: "Making your communication a coherent extension of your organization.",
          body: "We shape your identity and messaging so they clearly express who you are, what you do, and the value you bring.",
        },
        {
          title: "Training",
          statement: "Giving your teams the means to understand, use, and evolve their practices.",
          body: "We provide practical skills directly connected to the tools, methods, and challenges of your organization.",
        },
      ],
      detailsCta: "Explore our offerings →",
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
      label: "// Who it's for",
      title: "A different context, a matching response.",
      items: [
        {
          title: "Growing SMEs",
          body: "Structure your tools, your presence, and your team's skills.",
        },
        {
          title: "Organizations in transformation",
          body: "Modernize your systems, your image, and your team's practices, at the same pace your organization evolves.",
        },
        {
          title: "Startups",
          body: "Build fast, but with a technical foundation, an identity, and internal practices built to last.",
        },
        {
          title: "Internal technical teams",
          body: "Added expertise and architectural support on complex projects.",
        },
      ],
    },
    region: {
      titleStart: "Close to you, ",
      titleAccent: "wherever you are.",
      lead: "One team to frame, build, and support your projects, wherever your organization is based.",
      caption: "Delivery network",
      cards: [
        {
          title: "A Global Presence",
          body: "We work remotely or on site, across borders and time zones, with the same level of rigor.",
        },
        {
          title: "Close to Your Reality",
          body: "We work alongside your teams, with your data and processes, to understand your environment and address your challenges.",
        },
        {
          title: "Continuity Over Time",
          body: "We remain by your side beyond implementation, helping your solutions evolve alongside your organization.",
        },
      ],
    },
    stack: {
      label: "Technology stack",
      titleStart: "Build ",
      titleAccent: "without boundaries.",
      lead: "A stack chosen for reliability and longevity, not for hype: typed languages, solid data foundations, reproducible deployments and end-to-end observability.",
      ctaPrimary: "Discuss your project",
      ctaSecondary: "See the stack",
      note: "Technology choices always follow the diagnosis, never the other way around.",
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
    offers: {
      breadcrumb: "Services",
      label: "What we do",
      title: "Supporting you from diagnosis to everyday practice.",
      intro: "Three disciplines, one responsibility: coherence between the need and the system.",
      introSample:
        "This is sample content: you can later detail each of our offers, their scope, how they work, and what they deliver.",
      detailLabel: "To be completed",
      detailTitle: "The details of each offer will take place here.",
      detailBody:
        "Add for each discipline its scope, deliverables, ways of working, and a sample kick-off.",
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
