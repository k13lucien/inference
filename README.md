# Inference Design Studio

# Inference — Design System & Prompt de génération (Angular)

---

## 0. Instruction de génération

Génère une landing page **Angular** (standalone components, Angular 17+) reproduisant exactement la spécification ci-dessous. Respecte strictement :

- La séparation des responsabilités : un composant standalone par section, un fichier de design tokens central, aucun style dupliqué entre composants.

- Les design tokens définis en section 1 — jamais de couleur, taille ou font en dur dans un composant : toujours via variable CSS ou token SCSS.

- Le copy exact fourni en section 4 — ne pas paraphraser, ne pas inventer de contenu supplémentaire.

- Les interdits de charte en section 6 — à respecter sans exception.

- L'accessibilité : `prefers-reduced-motion` respecté partout, focus visible, HTML sémantique.

---

## 1. Design tokens

Créer un fichier `src/styles/tokens.scss` (ou `:root` dans `styles.scss`) avec exactement ces valeurs :

```scss

:root {

  // Couleurs — fond clair

  --color-bg-light: #FAFAF7;

  --color-ink: #111111;

  // Couleurs — fond sombre

  --color-bg-dark: #111111;

  --color-soft-white: #FAFAF7;

  // Accents

  --color-blue: #2C63C0;   // usage exclusif fond clair

  --color-gold: #C9A227;   // usage exclusif fond sombre

  // Neutres

  --color-light-gray: #D8D8D8;  // bordures fond clair

  --color-soft-gray: #CFCFCF;   // texte secondaire fond sombre

  --color-text-secondary: #333333;

  --color-text-muted: #666666;

  --color-text-body: #444444;

  // Typographie

  --font-serif: 'Cormorant Garamond', serif;   // titres, idées fortes

  --font-sans: 'Inter', sans-serif;            // corps, UI

  // Poids autorisés

  --weight-serif-semibold: 600;

  --weight-serif-bold: 700;

  --weight-sans-regular: 400;

  --weight-sans-medium: 500;

  --weight-sans-semibold: 600;

  // Layout

  --container-max: 1120px;

  --container-padding: 40px;

  --container-padding-mobile: 22px;

  // Rythme vertical

  --section-padding-y: 100px;

  --section-padding-y-hero: 140px;

  // Bordures / séparateurs

  --border-hairline: 1px solid var(--color-light-gray);

  // Transitions

  --transition-fast: 0.2s ease;

  --transition-reveal: 0.7s ease;

}

```

**Règle typographique fondamentale** (à documenter en commentaire dans le token file) :

`Cormorant Garamond` exprime les idées (titres, citations, messages de positionnement). `Inter` explique les idées (paragraphes, UI, labels). Ne jamais inverser ces rôles.

**Règle couleur fondamentale** :

Fond clair → accent bleu uniquement. Fond sombre → accent or uniquement. Ne jamais mélanger les deux accents sur un même fond.

---

## 2. Architecture Angular attendue

```

src/

  app/

    core/

      design-tokens/          # si tokens exposés aussi en TS (ex. breakpoints JS)

    layout/

      header/

        header.component.ts

        header.component.html

        header.component.scss

      footer/

        footer.component.ts

        footer.component.html

        footer.component.scss

    sections/

      hero/

      problem/           (« Le constat »)

      services/           (« Offres »)

      method/              (« La méthode »)

      audience/            (« Pour qui »)

      proof/                (« Preuve »)

      positioning/         (« Qui sommes-nous », fond sombre)

      contact-cta/

    shared/

      components/

        gear-icon/          # composant SVG réutilisable pour l'animation d'engrenages

        section-label/       # petit composant réutilisé partout (label + accent couleur selon contexte clair/sombre)

      directives/

        reveal-on-scroll.directive.ts   # encapsule l'IntersectionObserver du scroll-reveal

    app.component.ts          # assemble Header + sections dans l'ordre + Footer

  styles/

    tokens.scss

    reset.scss

    styles.scss                # importe tokens + reset, styles globaux uniquement

```

**Principes obligatoires :**

- Chaque section = un composant standalone avec son propre `.scss` scoppé (encapsulation Angular par défaut, `ViewEncapsulation.Emulated`).

- Aucun style de section dans `styles.scss` global — seulement reset, tokens, et règles vraiment transverses (`:focus-visible`, `html { scroll-behavior: smooth }`).

- `ChangeDetectionStrategy.OnPush` sur tous les composants (aucun état dynamique complexe, donc pas d'impact fonctionnel, mais bonne pratique).

- Le `reveal-on-scroll.directive.ts` encapsule la logique d'`IntersectionObserver` — appliquée via `appRevealOnScroll` sur les éléments qui portent actuellement la classe `.reveal` dans la version HTML.

- Formulaire de contact : `ReactiveFormsModule`, champs `nom` / `email` / `message`, validation `required` + `email`. `(ngSubmit)` — ne pas soumettre réellement (pas de backend fourni), juste `console.log` ou `EventEmitter` de sortie.

- Navigation par ancre : utiliser `[routerLink]` uniquement si multi-page ; ici c'est un scroll interne, donc de simples `<a href="#id">` suffisent, pas de Router nécessaire.

---

## 3. Structure de la page (ordre exact des sections)

1. **Header** (sticky) — logo + nav + CTA

2. **Hero** — plein écran non forcé (padding généreux, pas de `min-height:100vh`)

3. **Problem** (« Le constat ») — id `constat`

4. **Services** (« Offres ») — id `offres`

5. **Method** (« La méthode ») — id `methode`

6. **Audience** (« Pour qui ») — id `pour-qui`

7. **Proof** (« Preuve ») — id `preuve`

8. **Positioning** (« Qui sommes-nous », fond sombre) — id `qui-sommes-nous`

9. **Contact CTA** — id `contact`

10. **Footer**

Nav (Header) : liens vers `qui-sommes-nous`, `offres`, `pour-qui`, `contact` + CTA séparé « Discuter de votre projet ». Menu mobile en dessous de 760px : liens empilés en overlay sous le header, toggle texte "Menu"/"Fermer" (pas d'icône burger).

---

## 4. Copy exact (à reproduire mot pour mot)

### Header

- Logo : `Inference · Your Tech Partner`

- Nav : Qui sommes-nous / Offres / Pour qui / Contact

- CTA : `Discuter de votre projet`

### Hero

- Eyebrow : `Conseil & ingénierie logicielle`

- Titre (H1) : `Comprendre avant de construire.` — le mot « construire » en couleur accent bleu

- Sous-titre : `Inference accompagne les organisations dans la compréhension de leurs problématiques et la conception de solutions numériques durables — pas seulement dans leur exécution technique.`

- CTA primaire : `Discuter de votre projet`

- Note : `Réponse sous 48h`

### Section « Le constat »

- Label : `Le constat`

- Titre (H2) : `La complexité freine la décision, pas le manque d'outils.`

- Corps (3 paragraphes) :

  1. `La plupart des organisations n'échouent pas faute de technologie disponible. Elles échouent parce que le besoin métier a été mal traduit en solution — trop tôt, sans compréhension suffisante du terrain.`

  2. `Le résultat : des outils qui répondent à un problème mal posé, une dette technique qui s'accumule, et des décisions prises sans visibilité sur leurs conséquences réelles.`

  3. `Inference intervient en amont, pour décoder la complexité avant de la traduire en système.`

### Section « Offres »

- Label : `Ce que nous faisons`

- Titre (H2) : `Deux disciplines, une seule responsabilité : la cohérence entre le besoin et le système.`

- Carte 1 — `Conseil` : `Diagnostic des problématiques métier, cadrage des besoins et arbitrages technologiques — avant tout engagement de développement. Nous aidons à poser la bonne question avant de financer une réponse.`

- Carte 2 — `Ingénierie logicielle` : `Conception et développement de solutions numériques dimensionnées à l'organisation, pensées pour évoluer avec elle plutôt que pour être remplacées dans deux ans.`

### Section « La méthode »

- Label : `La méthode`

- Titre (H2) : `Un processus séquentiel, du diagnostic à l'accompagnement.`

- 01 `Comprendre` — `Immersion dans les processus réels, sans présupposer la solution.`

- 02 `Décoder` — `Traduction du besoin métier en problème technique clairement posé.`

- 03 `Concevoir` — `Conception de solutions durables, dimensionnées à l'organisation.`

- 04 `Accompagner` — `Suivi de l'évolution numérique au-delà de la livraison initiale.`

### Section « Pour qui »

- Label : `Pour qui`

- Titre (H2) : `Des organisations en phase d'évolution numérique.`

- `PME en croissance` — `Structuration des outils internes avant qu'ils ne deviennent un frein.`

- `Organisations en transformation` — `Refonte de systèmes existants devenus inadaptés aux processus réels.`

- `Équipes techniques internes` — `Renfort de cadrage et d'expertise sur des projets complexes ou critiques.`

### Section « Preuve »

- Label : `Preuve`

- Citation (placeholder italique, couleur atténuée) : `« Emplacement réservé pour une citation client réelle, une fois disponible. »`

- Source : `— Nom, poste, organisation`

- Stat (placeholder) : `—` avec label `Chiffre concret à renseigner (ex. nombre de projets, gain mesuré)`

- *Ne pas remplacer ces placeholders par du contenu inventé.*

### Section « Qui sommes-nous » (fond sombre)

- Label : `Positionnement`

- Citation (H2) : `Nous ne vendons pas des outils.` suivi de `Nous décodons des problèmes.` en couleur accent or

- Sous-texte : `La confiance ne vient pas de la promesse technologique, mais de la précision du diagnostic et de la maîtrise de son exécution.`

### Contact CTA

- Titre (H2) : `Parlons de votre problématique avant de parler solution.`

- Formulaire : champs `Nom`, `Email professionnel`, `Votre contexte, en quelques lignes` (textarea), bouton `Envoyer`

### Footer

- Colonne marque : logo + `Decode the Complex. Conseil et ingénierie logicielle pour organisations en évolution numérique.`

- Colonne Navigation : Qui sommes-nous / Offres / Pour qui

- Colonne Contact : email de contact, LinkedIn, `Discuter d'un projet`

- Bas de page : `© 2026 Inference` / `Mentions légales`

---

## 5. Détails visuels par section

### Header

- `position: sticky; top: 0`, fond `--color-bg-light` à 90% d'opacité + `backdrop-filter: blur(6px)`

- Hauteur 76px, bordure inférieure hairline

- Liens nav : soulignement animé au survol (largeur 0→100%, couleur accent bleu)

### Hero

- Padding vertical généreux (140px haut / 120px bas), pas de hauteur forcée

- **Illustration animée à droite** : trois engrenages en ligne fine (SVG), tailles décroissantes, engrenés visuellement. Chaque engrenage tourne en boucle infinie à une vitesse différente (grand ~26s, moyen ~17s en sens inverse, petit ~11s), rendu en `stroke`/`fill` très clair de la couleur accent bleu (opacités entre 0.2 et 0.35 — jamais plein contraste)

- L'illustration est masquée par un dégradé de **transparence** (masque, pas de couleur) : opaque côté droit, invisible en approchant le texte à gauche (`mask-image: linear-gradient(to left, black 30%, transparent 88%)`)

- Titre en `--font-serif` bold, `clamp(40px, 6vw, 72px)`, un mot en accent bleu

- **Important** : ce motif d'engrenages est le seul élément graphique complexe de toute la page — pas de reproduction ailleurs sans raison

### Sections sur fond clair (Constat, Offres, Méthode, Pour qui, Preuve)

- Toutes séparées par une bordure supérieure hairline (`--border-hairline`)

- Padding vertical `100px`

- Titres en `--font-serif` semibold, `clamp(30px, 3.4vw, 42px)`

- Alignement strictement à gauche, jamais de centrage

- Méthode : grille 4 colonnes avec séparateurs verticaux hairline entre items (sauf le premier)

- Pour qui : liste avec bordures horizontales hairline entre items, titre à gauche / description à droite (sur desktop)

### Section Positionnement (fond sombre)

- Fond `--color-bg-dark`, texte `--color-soft-white`

- Deux cercles décoratifs (bordure fine, couleur or à faible opacité) en fond, positionnés en débordement (un en haut-droite, un en bas-gauche) — purement géométrique, pas de forme organique

- Citation en `--font-serif` bold `clamp(32px, 5vw, 56px)`, un segment en accent or

### Contact CTA

- Layout flex : titre à gauche, formulaire compact à droite (desktop) ; empilé en mobile

- Champs de formulaire : pas de bordure de boîte, seulement `border-bottom`, focus → bordure bleue

### Footer

- 3 colonnes (marque / navigation / contact) desktop, empilées en mobile

- Séparateur hairline entre le bloc principal et la ligne copyright

### Animation de révolution au scroll

- Tous les blocs de contenu apparaissent avec un fade + translateY(16px→0) au scroll, déclenché via `IntersectionObserver` (seuil 0.15), une seule fois par élément

- Désactivée entièrement si `prefers-reduced-motion: reduce`

---

## 6. Interdits stricts (charte de marque — ne jamais enfreindre)

- Aucune image stock générique, aucune photo de personne en costume

- Aucun effet 3D (les engrenages du hero sont en 2D plat, ligne fine uniquement — jamais de rendu volumétrique, ombre portée réaliste, perspective)

- Aucun dégradé de **couleur** excessif (le masque de transparence du hero n'est pas un dégradé de couleur, c'est un fondu d'opacité — distinction importante)

- Aucune icône multiple décorative sans fonction (les seuls éléments graphiques sont : lignes fines, cercles, rectangles, engrenages du hero)

- Aucun centrage systématique — alignement gauche par défaut partout

- Ne jamais mélanger accent bleu et accent or sur une même section

---

## 7. Responsive — points de rupture

- `860px` : grilles à 2 colonnes → 1 colonne (Constat, Méthode passe à 2 colonnes)

- `760px` : nav desktop → menu mobile empilé ; Footer/Services/Audience/Proof passent en 1 colonne

- `560px` : padding conteneur réduit (22px), Méthode passe à 1 colonne, hero padding réduit

---

## 8. Checklist finale avant livraison

- [ ] Tous les styles utilisent les tokens de `tokens.scss`, aucune couleur hexadécimale en dur dans les composants

- [ ] Un composant standalone par section, aucun style de section dans le fichier global

- [ ] Le copy correspond mot pour mot à la section 4

- [ ] `prefers-reduced-motion` respecté (engrenages + reveal-on-scroll)

- [ ] Formulaire de contact avec validation réactive, pas de soumission réelle

- [ ] `:focus-visible` stylé globalement (outline bleu)

- [ ] Aucun des interdits de la section 6 n'apparaît dans le rendu

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6613a4fd-c5f1-46f2-95d0-e21aaa1d8b1b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
