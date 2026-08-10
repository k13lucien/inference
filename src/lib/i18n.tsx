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
      titleStart: "Construire ",
      titleAccent: "sans frontières.",
      lead: "Une pile choisie pour la fiabilité et la longévité, pas pour la mode : des technologies éprouvées, des données solides, un déploiement maîtrisé et une infrastructure pensée pour durer.",
    },
    positioning: {
      label: "Positionnement",
      titleStart: "Un partenaire de ",
      titleAccent: "confiance",
      titleEnd: " pour vos enjeux numériques.",
      body: "Inference accompagne les organisations dans la résolution de leurs problèmes grâce au numérique, en s'impliquant dans la décision autant que dans son exécution.",
    },
    about: {
      breadcrumb: "Qui sommes-nous",
      title: "Le numérique, avec justesse.",
      intro:
        "Inference est une entreprise de conseil, d'ingénierie logicielle et de transformation numérique.",
      introBody:
        "Nous accompagnons les organisations dans leurs évolutions en rapprochant compréhension, technologie et savoir-faire.",
      whyLabel: "Mission",
      whyTitle: "Faire du numérique un levier d'évolution.",
      whyBody1:
        "Le numérique transforme les façons de travailler, de communiquer et de décider. Mais sa valeur ne réside pas dans les outils eux-mêmes : elle se mesure à ce qu'ils permettent aux organisations d'accomplir.",
      whyBody2:
        "Inference accompagne ces évolutions en rapprochant compréhension, technologie et savoir-faire pour apporter des réponses adaptées aux réalités de chaque organisation.",
      whyBody3:
        "Notre ambition est simple : contribuer à un numérique utile, cohérent et durable, capable de soutenir les organisations dans ce qu'elles cherchent à accomplir.",
      positioningLabel: "Notre positionnement",
      positioningTitle: "Un partenaire de confiance pour vos enjeux numériques.",
      positioningBody1:
        "Inference accompagne les organisations dans la résolution de leurs problèmes grâce au numérique, en s'impliquant dans la décision autant que dans son exécution.",
      positioningBody2:
        "Nous intervenons là où notre expertise peut être utile, de la réflexion à la mise en œuvre, avec la même attention portée au contexte, aux usages et aux objectifs.",
      principlesLabel: "Ce qui nous guide",
      principles: [
        {
          title: "Comprendre avant de construire.",
          body: "Nous donnons d'abord du sens aux questions, pour faire émerger les réponses qui correspondent réellement à votre situation.",
        },
        {
          title: "Chaque solution doit créer de la valeur.",
          body: "Nous construisons des solutions utiles, pensées pour servir vos besoins, vos usages et les ambitions de votre organisation.",
        },
        {
          title: "Un engagement est une responsabilité.",
          body: "Nous considérons chaque engagement avec la clarté, la rigueur et l'attention qu'il mérite, de la première décision jusqu'à sa réalisation.",
        },
        {
          title: "Chaque décision prépare l'avenir.",
          body: "Chaque choix est pensé pour faire grandir votre organisation et lui permettre d'aller plus loin.",
        },
      ],
      teamLabel: "L'équipe",
      teamTitle: "Une équipe à taille humaine.",
      teamBody1:
        "Inference réunit des compétences complémentaires en technologie, communication et formation.",
      teamBody2:
        "Nous travaillons au plus près des organisations que nous accompagnons, avec des échanges directs et une implication qui s'inscrit dans la durée.",
      ctaTitle: "Un sujet à faire avancer ?",
      ctaBody: "Parlons de votre contexte.",
      ctaLink: "Discuter de votre projet",
    },
    offers: {
      breadcrumb: "Offres",
      title: "Des réponses adaptées à vos enjeux.",
      hero: "Inference intervient là où vos enjeux rencontrent le numérique : technologie, communication et formation.",
      ctaPrimary: "Discuter de votre projet",
      ctaSecondary: "Explorer nos offres",
      tech: {
        label: "Technologie",
        title: "Des solutions pensées pour votre réalité.",
        description:
          "Nous intervenons sur l'ensemble du cycle numérique de votre organisation : comprendre vos besoins, construire les solutions pertinentes, les intégrer à votre environnement et les faire évoluer dans le temps.",
        cards: [
          {
            title: "Conseil & cadrage",
            statement: "Donner une direction claire avant d'engager des ressources.",
            body: "Nous analysons vos besoins, vos processus et vos contraintes pour définir les priorités, les solutions possibles et les choix techniques pertinents.",
          },
          {
            title: "Ingénierie logicielle",
            statement: "Construire les outils dont votre organisation a réellement besoin.",
            body: "Applications web et mobiles, logiciels métiers, API et solutions sur mesure conçues autour de vos usages et de votre environnement.",
          },
          {
            title: "Données & automatisation",
            statement: "Transformer vos données et vos processus en leviers d'action.",
            body: "Nous automatisons les tâches qui peuvent l'être, structurons vos données et concevons des outils qui facilitent l'analyse, le suivi et la prise de décision.",
          },
          {
            title: "Infrastructure & intégration",
            statement: "Faire fonctionner vos solutions dans leur environnement réel.",
            body: "Hébergement, déploiement, interconnexion des systèmes et intégration aux outils existants pour construire un environnement cohérent plutôt qu'un système isolé.",
          },
          {
            title: "Évolution & accompagnement",
            statement: "Faire évoluer vos solutions au rythme de votre organisation.",
            body: "Maintenance, amélioration continue, accompagnement technique et évolution des systèmes à mesure que vos besoins changent.",
          },
        ],
      },
      comm: {
        label: "Communication",
        title: "Faire de votre communication un prolongement cohérent de votre organisation.",
        description:
          "Nous construisons une expression claire et singulière, de votre identité à la manière dont vous présentez votre activité et échangez avec vos publics.",
        cards: [
          {
            title: "Identité & Branding",
            statement: "Donner une expression claire à ce que vous êtes.",
            body: "Positionnement, identité visuelle et éléments de marque pour construire une identité cohérente et reconnaissable.",
          },
          {
            title: "Communication digitale",
            statement: "Être présent là où vos publics vous cherchent.",
            body: "Stratégie, présence digitale et gestion des canaux adaptés à votre activité et à vos objectifs.",
          },
          {
            title: "Contenu & Éditorial",
            statement: "Trouver les mots justes pour être compris.",
            body: "Création et structuration de contenus qui rendent votre activité, vos idées et vos offres plus claires pour vos publics.",
          },
          {
            title: "Design",
            statement: "Donner forme à vos idées et à vos messages.",
            body: "Conception de supports visuels et numériques cohérents avec votre identité et adaptés à leurs usages.",
          },
        ],
      },
      formation: {
        label: "Formation",
        title:
          "Donner à vos équipes les moyens de comprendre, d'utiliser et de faire évoluer leurs pratiques.",
        description:
          "Nous transmettons des compétences directement utiles, en lien avec les outils, les méthodes et les enjeux de votre organisation.",
        cards: [
          {
            title: "Formation technique",
            statement: "Développer les compétences dont vos équipes ont besoin.",
            body: "Développement logiciel, outils numériques, technologies et pratiques d'ingénierie adaptés au niveau et aux besoins de vos équipes.",
          },
          {
            title: "Outils & pratiques",
            statement: "Faciliter l'adoption de nouveaux outils et de nouvelles méthodes.",
            body: "Des formations conçues autour de vos outils, de vos processus et des usages réels de vos équipes.",
          },
          {
            title: "Formation sur mesure",
            statement: "Apprendre à partir de vos propres enjeux.",
            body: "Des parcours construits autour d'un besoin précis, d'un contexte et des objectifs de votre organisation.",
          },
        ],
      },
      approach: {
        label: "Notre manière de travailler",
        title: "Comprendre avant de construire.",
        subtitle:
          "Chaque organisation a son contexte, ses contraintes et ses façons de travailler. Nous commençons par les comprendre avant de déterminer la réponse la plus pertinente.",
        steps: [
          {
            title: "Comprendre",
            statement: "Partir de la réalité.",
            body: "Nous nous intéressons à vos usages, vos processus, vos contraintes et vos objectifs pour comprendre ce qui doit réellement évoluer.",
          },
          {
            title: "Décoder",
            statement: "Transformer la complexité en direction claire.",
            body: "Nous clarifions les enjeux, identifions les priorités et traduisons les besoins en décisions concrètes.",
          },
          {
            title: "Concevoir",
            statement: "Définir la réponse adaptée.",
            body: "Nous concevons une approche cohérente avec votre organisation, vos ressources, votre environnement et vos objectifs.",
          },
          {
            title: "Construire",
            statement: "Donner vie à la solution.",
            body: "Nous mettons en œuvre la réponse retenue avec le niveau de rigueur nécessaire, qu'il s'agisse de technologie, de communication ou de formation.",
          },
          {
            title: "Accompagner",
            statement: "Faire évoluer ce qui a été construit.",
            body: "Nous restons présents lorsque les besoins changent, pour améliorer, ajuster et faire évoluer les solutions avec votre organisation.",
          },
        ],
      },
    },
    contact: {
      title: "Parlons de ce qui vous préoccupe.",
      name: "Nom",
      email: "Email professionnel",
      message: "Votre contexte, en quelques lignes",
      submit: "Envoyer",
      required: "Ce champ est requis.",
      invalidEmail: "Adresse email invalide.",
    },
    contactPage: {
      breadcrumb: "Contact",
      title: "Parlons de ce qui vous préoccupe.",
      hero: "Décrivez votre contexte, vos enjeux et vos objectifs en quelques lignes : nous vous répondrons avec des pistes concrètes, sous 48 heures.",
      introLabel: "Échangez directement",
      introTitle: "Les canaux rapides.",
      introBody:
        "Écrivez-nous ou contactez-nous sur LinkedIn : nous vous répondons personnellement, sous 48 heures ouvrées.",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      whatsappLabel: "WhatsApp",
      formLabel: "Le formulaire",
      formTitle: "Votre projet en quelques lignes.",
      name: "Nom",
      email: "Email professionnel",
      organisation: "Organisation",
      message: "Votre contexte, vos enjeux, vos objectifs",
      submit: "Envoyer le message",
      required: "Ce champ est requis.",
      invalidEmail: "Adresse email invalide.",
    },
    footer: {
      tagline:
        "Conseil, ingénierie et transformation numérique pour les organisations qui évoluent.",
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
      titleStart: "Build ",
      titleAccent: "without boundaries.",
      lead: "A stack chosen for reliability and longevity, not fashion: proven technologies, solid data, controlled deployment, and infrastructure built to last.",
    },
    positioning: {
      label: "Positioning",
      titleStart: "A ",
      titleAccent: "trusted",
      titleEnd: " partner for your digital challenges.",
      body: "Inference supports organizations in solving their problems through technology, engaging in the decision as much as its execution.",
    },
    about: {
      breadcrumb: "Who we are",
      title: "Digital, with purpose.",
      intro: "Inference is a consulting, software engineering, and digital transformation company.",
      introBody:
        "We support organizations as they evolve, bringing together understanding, technology, and expertise.",
      whyLabel: "Mission",
      whyTitle: "Making digital a driver of progress.",
      whyBody1:
        "Digital is transforming the way organizations work, communicate, and make decisions. But its value does not lie in the tools themselves; it lies in what they enable organizations to achieve.",
      whyBody2:
        "Inference supports these changes by bringing together understanding, technology, and expertise to deliver responses suited to each organization's reality.",
      whyBody3:
        "Our ambition is simple: to contribute to digital that is useful, coherent, and built to last — helping organizations move forward in what they seek to accomplish.",
      positioningLabel: "Our positioning",
      positioningTitle: "A trusted partner for your digital challenges.",
      positioningBody1:
        "Inference helps organizations solve problems through digital, engaging as much in the decisions that shape a solution as in its execution.",
      positioningBody2:
        "We step in wherever our expertise can make a difference, from initial thinking through implementation, with the same attention to context, users, and objectives.",
      principlesLabel: "What guides us",
      principles: [
        {
          title: "Understand before you build.",
          body: "We start by giving meaning to the questions, so we can shape responses that truly fit your situation.",
        },
        {
          title: "Every solution should create value.",
          body: "We build useful solutions, designed around your needs, your ways of working, and your organization's ambitions.",
        },
        {
          title: "A commitment is a responsibility.",
          body: "We approach every commitment with the clarity, rigor, and care it deserves, from the first decision through to delivery.",
        },
        {
          title: "Every decision shapes the future.",
          body: "Every choice is made to help your organization grow and move further forward.",
        },
      ],
      teamLabel: "Our team",
      teamTitle: "A close-knit team.",
      teamBody1:
        "Inference brings together complementary expertise across technology, communication, and training.",
      teamBody2:
        "We work closely with the organizations we support, through direct communication and an involvement that extends over time.",
      ctaTitle: "A challenge you want to move forward?",
      ctaBody: "Tell us about your context.",
      ctaLink: "Discuss your project",
    },
    offers: {
      breadcrumb: "Services",
      title: "Solutions tailored to your needs.",
      hero: "Inference works where your challenges meet the digital world: technology, communication, and training.",
      ctaPrimary: "Discuss your project",
      ctaSecondary: "Explore our services",
      tech: {
        label: "Technology",
        title: "Solutions designed around your reality.",
        description:
          "We work across your organization's digital environment — from understanding your needs and building the right solutions to integrating them into your existing environment and evolving them over time.",
        cards: [
          {
            title: "Technology Consulting & Scoping",
            statement: "Set a clear direction before committing resources.",
            body: "We assess your needs, processes, and constraints to define priorities, possible solutions, and the technologies best suited to your project.",
          },
          {
            title: "Software Engineering",
            statement: "Build the tools your organization actually needs.",
            body: "Web and mobile applications, business software, APIs, and custom solutions designed around your users, your needs, and your environment.",
          },
          {
            title: "Data & Automation",
            statement: "Turn your data and processes into levers for action.",
            body: "We automate tasks where it makes sense, structure your data, and build tools that make analysis, monitoring, and decision-making easier.",
          },
          {
            title: "Infrastructure & Integration",
            statement: "Make your solutions work in their real environment.",
            body: "Hosting, deployment, system integration, and connectivity with existing tools — creating a coherent environment rather than another isolated system.",
          },
          {
            title: "Evolution & Support",
            statement: "Help your solutions evolve with your organization.",
            body: "Maintenance, continuous improvement, technical support, and system evolution as your needs change.",
          },
        ],
      },
      comm: {
        label: "Communication",
        title: "Make your communication a coherent extension of your organization.",
        description:
          "We build a clear and distinctive expression of who you are — from your identity to the way you present your work and engage with your audiences.",
        cards: [
          {
            title: "Identity & Branding",
            statement: "Give your organization a clear expression.",
            body: "Positioning, visual identity, and brand assets designed to build a coherent and recognizable identity.",
          },
          {
            title: "Digital Communication",
            statement: "Be present where your audiences look for you.",
            body: "Strategy, digital presence, and channel management tailored to your business and objectives.",
          },
          {
            title: "Content & Editorial",
            statement: "Find the right words to be understood.",
            body: "Creating and structuring content that makes your work, ideas, and offerings clearer to your audiences.",
          },
          {
            title: "Design",
            statement: "Give shape to your ideas and messages.",
            body: "Visual and digital assets designed to reflect your identity and serve their intended purpose.",
          },
        ],
      },
      formation: {
        label: "Training",
        title: "Give your teams the means to understand, use, and evolve their practices.",
        description:
          "We provide practical skills directly relevant to your organization's tools, methods, and challenges.",
        cards: [
          {
            title: "Technical Training",
            statement: "Develop the skills your teams need.",
            body: "Software development, digital tools, technologies, and engineering practices tailored to your teams' needs and level of expertise.",
          },
          {
            title: "Tools & Practices",
            statement: "Make it easier to adopt new tools and methods.",
            body: "Training designed around your tools, processes, and the real-world practices of your teams.",
          },
          {
            title: "Custom Training",
            statement: "Learn from your own challenges.",
            body: "Training programs built around a specific need, context, and set of organizational objectives.",
          },
        ],
      },
      approach: {
        label: "Our Approach",
        title: "Understand before you build.",
        subtitle:
          "Every organization has its own context, constraints, and ways of working. We start by understanding them before determining the most relevant response.",
        steps: [
          {
            title: "Understand",
            statement: "Start from reality.",
            body: "We look at your users, processes, constraints, and objectives to understand what truly needs to change.",
          },
          {
            title: "Decode",
            statement: "Turn complexity into clear direction.",
            body: "We clarify the challenges, identify priorities, and translate needs into concrete decisions.",
          },
          {
            title: "Design",
            statement: "Define the right response.",
            body: "We design an approach that fits your organization, resources, environment, and objectives.",
          },
          {
            title: "Build",
            statement: "Bring the solution to life.",
            body: "We implement the chosen response with the level of rigor required, whether it involves technology, communication, or training.",
          },
          {
            title: "Support",
            statement: "Evolve what has been built.",
            body: "We remain involved as needs change, helping improve, adapt, and evolve your solutions alongside your organization.",
          },
        ],
      },
    },
    contact: {
      title: "Let’s talk about what’s on your mind.",
      name: "Name",
      email: "Work email",
      message: "Your context, in a few lines",
      submit: "Send",
      required: "This field is required.",
      invalidEmail: "Invalid email address.",
    },
    contactPage: {
      breadcrumb: "Contact",
      title: "Let’s talk about what’s on your mind.",
      hero: "Tell us about your context, challenges, and objectives in a few lines: we’ll get back to you with concrete ideas within 48 hours.",
      introLabel: "Reach out directly",
      introTitle: "The fastest channels.",
      introBody:
        "Write to us or reach out on LinkedIn: we reply personally, within 48 business hours.",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      whatsappLabel: "WhatsApp",
      formLabel: "The form",
      formTitle: "Your project, in a few lines.",
      name: "Name",
      email: "Work email",
      organisation: "Organization",
      message: "Your context, challenges, objectives",
      submit: "Send message",
      required: "This field is required.",
      invalidEmail: "Invalid email address.",
    },
    footer: {
      tagline:
        "Consulting, engineering, and digital transformation for organizations that are evolving.",
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
