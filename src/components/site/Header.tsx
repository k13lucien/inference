/**
 * Header — en-tête collant commun à toutes les routes.
 *
 * Logo (lien racine), navigation principale (`nav`, d'abord la liste `nav` typée
 * pour les `<Link>` TanStack), contrôles langue/theme et CTA vers `/contact`.
 * Menu mobile dépliable (`useState open`), fermé à la navigation.
 */
import { useState } from "react";

import { Link } from "@tanstack/react-router";

import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

export function Header() {
  const [open, setOpen] = useState(false);
  const { t, locale, toggleLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();

  const nav: Array<
    | { to: "/" | "/services" | "/about" | "/contact"; label: string; disabled?: undefined }
    | { to: undefined; label: string; disabled: true }
  > = [
    { to: "/services", label: t.nav.offers },
    { to: "/about", label: t.nav.about },
    { to: undefined, label: t.nav.realizations, disabled: true },
    { to: "/contact", label: t.nav.contact },
  ];

  const controlBase =
    "flex h-8 items-center justify-center border border-light-gray font-sans text-[12px] font-medium text-text-secondary transition-colors hover:border-ink hover:text-ink";

  const controls = (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggleLocale}
        aria-label={t.nav.langLabel}
        title={t.nav.langLabel}
        className={`${controlBase} w-[62px] tracking-[0.08em] uppercase`}
      >
        <span className={locale === "fr" ? "text-blue" : ""}>FR</span>
        <span className="mx-1 text-light-gray">/</span>
        <span className={locale === "en" ? "text-blue" : ""}>EN</span>
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={t.nav.themeLabel}
        title={t.nav.themeLabel}
        aria-pressed={theme === "dark"}
        className={`${controlBase} w-8`}
      >
        {theme === "dark" ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.4" />
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={i}
                x1="12"
                y1="1.8"
                x2="12"
                y2="4.4"
                stroke="currentColor"
                strokeWidth="1.4"
                transform={`rotate(${i * 45} 12 12)`}
              />
            ))}
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-light-gray bg-bg-light/90 backdrop-blur-[6px]">
      <div className="shell flex h-[76px] items-center justify-between">
        <Link
          to="/"
          className="font-serif text-[19px] font-semibold whitespace-nowrap text-ink max-[420px]:text-[17px]"
        >
          Inference
          <span className="max-[420px]:hidden">
            {" "}
            <span className="text-text-muted">·</span> Your Tech Partner
          </span>
        </Link>

        <nav aria-label={t.nav.main} className="hidden items-center gap-9 md:flex">
          {nav.map((item) =>
            item.disabled ? (
              <span
                key={item.label}
                aria-disabled="true"
                title={t.nav.soonTitle}
                className="flex items-baseline gap-2 font-sans text-[14px] text-text-muted"
              >
                {item.label}
                <span className="border border-light-gray px-1.5 py-px font-sans text-[9px] font-medium uppercase tracking-[0.16em] text-text-muted">
                  {t.nav.soon}
                </span>
              </span>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="group relative font-sans text-[14px] text-text-secondary transition-colors hover:text-ink"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-blue transition-[width] duration-200 group-hover:w-full" />
              </Link>
            ),
          )}
          {controls}
          <Link
            to="/contact"
            className="border border-ink px-4 py-2 font-sans text-[13px] font-medium text-ink transition-colors hover:bg-ink hover:text-soft-white"
          >
            {t.nav.cta}
          </Link>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          {controls}
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="font-sans text-[13px] font-medium text-ink"
          >
            {open ? t.nav.close : t.nav.menu}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label={t.nav.mobile} className="border-t border-light-gray bg-bg-light md:hidden">
          <ul className="shell flex flex-col py-3">
            {nav.map((item) => (
              <li key={item.to ?? item.label} className="border-b border-light-gray">
                {item.disabled ? (
                  <span
                    aria-disabled="true"
                    className="flex items-center gap-3 py-3.5 font-sans text-[15px] text-text-muted"
                  >
                    {item.label}
                    <span className="border border-light-gray px-1.5 py-px font-sans text-[9px] font-medium uppercase tracking-[0.16em]">
                      {t.nav.soon}
                    </span>
                  </span>
                ) : (
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block py-3.5 font-sans text-[15px] text-text-secondary"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li className="pt-5 pb-2">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="block bg-ink px-4 py-3.5 text-center font-sans text-[14px] font-medium text-soft-white"
              >
                {t.nav.cta}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
