/**
 * Theme — gestion du thème clair / sombre du site Inference.
 *
 * Le design system est défini dans `src/styles.css` : chaque thème inverse les rôles
 * (`--ds-*`) sans changer les règles (fond clair → accent bleu, fond sombre → accent or).
 * Ce module applique simplement la classe `.dark` sur `<html>` pour que Tailwind
 * (`@custom-variant dark`) et les tokens CSS basculent.
 *
 * ## Comportement
 * - À la première visite : suit `prefers-color-scheme` du système.
 * - Dès que l'utilisateur bascule manuellement : choix persisté dans `localStorage`
 *   (clé `inference-theme`) et prioritaire au chargement suivant.
 * - Synchronise aussi `color-scheme` pour les composants natifs (scrollbars, inputs…).
 *
 * ## Usage
 * - Le composant racine enveloppe l'app dans `<ThemeProvider>`.
 * - Un composant lit l'état via `const { theme, toggleTheme } = useTheme();`.
 */
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

/** Thème pris en charge : `"light"` ou `"dark"`. */
export type Theme = "light" | "dark";

const STORAGE_KEY = "inference-theme";

/** Contexte React exposant `{ theme, toggleTheme }` aux composants. */
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: "light",
  toggleTheme: () => {},
});

/**
 * Fournit le thème courant à l'arbre React.
 * Restaure le choix depuis `localStorage` (ou la préférence système) et applique
 * la classe `.dark` sur `document.documentElement`.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      return;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

/**
 * Hook d'accès au thème. À appeler dans un composant sous `ThemeProvider` :
 * `const { theme, toggleTheme } = useTheme();`.
 */
export function useTheme() {
  return useContext(ThemeContext);
}
