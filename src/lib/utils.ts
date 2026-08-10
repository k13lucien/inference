/**
 * Utils — utilitaires génériques partagés par les composants.
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fusionne des classes Tailwind conditionnelles.
 *
 * - `clsx` gère les valeurs falsy, tableaux et objets conditionnels (`cn("a", isActive && "b")`).
 * - `twMerge` résout les conflits entre utilitaires (la dernière classe gagne),
 *   utile notamment pour laisser les composants surcharger les classes par défaut.
 *
 * Utilisé systématiquement par les composants shadcn/ui et les sections du site.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
