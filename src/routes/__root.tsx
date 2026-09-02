/**
 * Route racine `__root` — coquille applicative.
 *
 * C'est le seul layout : il enveloppe toutes les routes.
 * - `RootShell` pose `<html>`, `<head>` (SEO via `HeadContent`) et `<body>`.
 * - `RootComponent` fournit les providers partagés à tout l'arbre :
 *   `ThemeProvider` (clair/sombre), `I18nProvider` (fr/en), `QueryClientProvider`.
 * - `NotFoundComponent` / `ErrorComponent` gèrent respectivement le 404 et
 *   les erreurs de rendu (loggées via `console.error`).
 *
 * ⚠️ Conserver `<Outlet />` : sans lui, aucune route enfant ne se rend.
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import appCss from "../styles.css?url";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { ThemeProvider, useTheme } from "@/lib/theme";

function NotFoundComponent() {
  const { t } = useI18n();

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-light px-6">
      <div className="shell max-w-[560px]">
        <p className="font-sans text-[11px] font-medium tracking-[0.22em] text-blue uppercase">
          {t.notFound.code}
        </p>
        <h1 className="mt-6 font-serif text-[clamp(32px,5vw,54px)] font-bold leading-[1.05] text-ink">
          {t.notFound.title}
        </h1>
        <p className="mt-6 font-sans text-[15.5px] leading-[1.8] text-text-body">
          {t.notFound.body}
        </p>
        <Link
          to="/"
          className="mt-10 inline-block bg-ink px-7 py-3.5 font-sans text-[14px] font-medium text-soft-white transition-opacity hover:opacity-85"
        >
          {t.notFound.cta}
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-light px-6">
      <div className="shell max-w-[560px]">
        <p className="font-sans text-[11px] font-medium tracking-[0.22em] text-blue uppercase">
          // Erreur
        </p>
        <h1 className="mt-6 font-serif text-[clamp(30px,4.4vw,48px)] font-bold leading-[1.06] text-ink">
          Cette page n'a pas pu s'afficher.
        </h1>
        <p className="mt-6 font-sans text-[15.5px] leading-[1.8] text-text-body">
          Un incident est survenu de notre côté. Vous pouvez réessayer ou revenir à l'accueil.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-ink px-7 py-3.5 font-sans text-[14px] font-medium text-soft-white transition-opacity hover:opacity-85"
          >
            Réessayer
          </button>
          <Link
            to="/"
            className="border border-ink px-7 py-3.5 font-sans text-[14px] font-medium text-ink transition-colors hover:bg-ink hover:text-soft-white"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Inference · Your Tech Partner" },
      {
        name: "description",
        content: "Conseil et ingénierie logicielle pour organisations en évolution numérique.",
      },
      { name: "author", content: "Inference" },
      { property: "og:title", content: "Inference · Your Tech Partner" },
      {
        property: "og:description",
        content: "Conseil et ingénierie logicielle pour organisations en évolution numérique.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Inter:wght@400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [
      {
        src: "https://plausible.io/js/script.js",
        defer: true,
        "data-domain": "inference.bf",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/** Monte le <Toaster /> de sonner, aligné sur le thème courant. */
function ToasterHost() {
  const { theme } = useTheme();
  return <Toaster theme={theme} />;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <ThemeProvider>
      <I18nProvider>
        <QueryClientProvider client={queryClient}>
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
          <ToasterHost />
        </QueryClientProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
