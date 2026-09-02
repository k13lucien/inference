/**
 * Helpers SEO — métadonnées partagées par toutes les pages.
 *
 * Centralise le domaine de production, l'og:image et la construction des
 * `meta`/`links` de chaque route : une seule source de vérité à modifier.
 */
export const SITE_URL = "https://inference.bf";
export const SITE_NAME = "Inference";
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const OG_IMAGE_ALT =
  "Inference — Conseil et ingénierie logicielle pour organisations en évolution numérique.";

type PageMeta = {
  title: string;
  description: string;
  path?: string;
};

/** `meta` standard (description, Open Graph, Twitter Cards, og:image). */
export function seoMeta({ title, description, path = "/" }: PageMeta) {
  const canonical = SITE_URL + path;

  return [
    { title },
    { name: "description", content: description },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "fr_FR" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: canonical },
    { property: "og:image", content: OG_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: OG_IMAGE_ALT },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: OG_IMAGE },
  ];
}

/** `<link rel="canonical">` pour la page correspondante. */
export function canonicalLink(path: string) {
  return [{ rel: "canonical", href: SITE_URL + path }];
}
