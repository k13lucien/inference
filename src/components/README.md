# Composants

Deux dossiers, deux responsabilités :

| Dossier | Contenu | Convention |
| --- | --- | --- |
| `ui/` | Primitives d'interface génériques (shadcn/ui) | fichiers en minuscules (`button.tsx`) ; documentation en en-tête JSDoc français |
| `site/` | Sections et composants propres au site Inference | fichiers en PascalCase (`Hero.tsx`) ; en-tête JSDoc français |

## `ui/` — primitives

Composants réutilisables et sans connaissance du contenu (boutons, champs, toasts…).
Ils sont stylés via `class-variance-authority` + tokens de `styles.css` et ne
consomment jamais `useI18n`. Seuls les primitives réellement utilisées sont gardées
(`breadcrumb`, `button`, `form`, `input`, `label`, `sonner`, `textarea`) — pas de
collection shadcn par défaut.

## `site/` — composants métier

Trois familles, distinguées par leur en-tête JSDoc :

- **Layout / navigation** : `Header`, `Footer`, `PageBreadcrumb`.
- **Sections de contenu** : `Hero`, `Problem`, `ServicesPreview`, `Audience`, `Region`,
  `Positioning`, `ContactCta` (accueil) ; `OffersAccordion`, `Approach`, `Stack` (`/services`).
- **Outillage** : `Reveal` (scroll-reveal), `SectionLabel`, `ContactForm` (formulaire
  rhf+zod partagé), `Globe` + `GearIcon` (visuels).

## Conventions

- Une section lit ses textes via `const { t } = useI18n()` puis `t.<branche>.*`
  (cf. `lib/i18n.tsx`) ; jamais de copie en dur.
- Toutes les navigations internes passent par `<Link>` de `@tanstack/react-router`
  (jamais `<a href="/…">`) ; les liens externes / `mailto:` / ancres intra-page
  restent des `<a>`.
- Règles de tokens : accent bleu sur fond clair, accent or sur fond sombre, jamais
  les deux (cf. `styles.css`). Animations respectent `prefers-reduced-motion: reduce`.
- Les modules non-React (données, algorithmes) ne vivent **pas** dans ce dossier :
  les placer dans `src/lib/` (ex. `lib/land-mask.ts`).
