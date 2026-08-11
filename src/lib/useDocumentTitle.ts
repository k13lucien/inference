/**
 * useDocumentTitle — définit `document.title` selon la langue courante.
 *
 * Centralise le `useEffect(() => { document.title = … }, [locale])` répété sur
 * chaque page interne. Les versions fr/en étant fournies, le hook écoute `locale`
 * (via `useI18n`) et met à jour le titre à chaque changement de langue.
 */
import { useEffect } from "react";

import { useI18n } from "@/lib/i18n";

export function useDocumentTitle(fr: string, en: string) {
  const { locale } = useI18n();

  useEffect(() => {
    document.title = locale === "fr" ? fr : en;
  }, [locale, fr, en]);
}
