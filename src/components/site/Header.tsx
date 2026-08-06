import { useState } from "react";

import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

export function Header() {
  const [open, setOpen] = useState(false);
  const { t, locale, toggleLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();

  const nav = [
    { href: "#qui-sommes-nous", label: t.nav.about },
    { href: "#offres", label: t.nav.offers },
    { href: "#pour-qui", label: t.nav.audience },
    { href: "#contact", label: t.nav.contact },
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
        <a href="#top" className="font-serif text-[19px] font-semibold text-ink">
          Inference <span className="text-text-muted">·</span> Your Tech Partner
        </a>

        <nav aria-label={t.nav.main} className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative font-sans text-[14px] text-text-secondary transition-colors hover:text-ink"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-blue transition-[width] duration-200 group-hover:w-full" />
            </a>
          ))}
          {controls}
          <a
            href="#contact"
            className="border border-ink px-4 py-2 font-sans text-[13px] font-medium text-ink transition-colors hover:bg-ink hover:text-soft-white"
          >
            {t.nav.cta}
          </a>
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
              <li key={item.href} className="border-b border-light-gray last:border-0">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3.5 font-sans text-[15px] text-text-secondary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
