/**
 * PageBreadcrumb — bandeau fil d'Ariane des pages internes.
 *
 * Identique sur `/services`, `/about` et `/contact` : « Accueil → page courante ».
 * La seule variation est le libellé de la page courante, passé en `current`.
 * Le lien « Accueil » est un `<Link>` TanStack rendu via `<BreadcrumbLink asChild>`.
 */
import { Link } from "@tanstack/react-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useI18n } from "@/lib/i18n";

export function PageBreadcrumb({ current }: { current: string }) {
  const { t } = useI18n();

  return (
    <section className="border-b border-light-gray bg-bg-light py-7">
      <div className="shell">
        <Breadcrumb>
          <BreadcrumbList className="font-sans text-[13px] text-text-muted">
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="hover:text-ink">
                <Link to="/">{t.nav.home}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-light-gray" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-ink">{current}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </section>
  );
}
