import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-light-gray py-16">
      <div className="shell">
        <div className="grid gap-12 min-[761px]:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,0.8fr)]">
          <div>
            <p className="font-serif text-[19px] font-semibold text-ink">
              Inference <span className="text-text-muted">·</span> Your Tech Partner
            </p>
            <p className="mt-4 max-w-[320px] font-sans text-[14px] leading-[1.7] text-text-body">
              {t.footer.tagline}
            </p>
          </div>

          <nav aria-label={t.footer.footerNav}>
            <h2 className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-blue">
              {t.footer.navTitle}
            </h2>
            <ul className="mt-5 space-y-3 font-sans text-[14px] text-text-secondary">
              <li>
                <a href="/about" className="hover:text-ink">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="/#offres" className="hover:text-ink">
                  {t.nav.offers}
                </a>
              </li>
              <li>
                <a href="/#pour-qui" className="hover:text-ink">
                  {t.nav.audience}
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-blue">
              {t.footer.contactTitle}
            </h2>
            <ul className="mt-5 space-y-3 font-sans text-[14px] text-text-secondary">
              <li>
                <a href="mailto:contact@inference.tech" className="hover:text-ink">
                  contact@inference.tech
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ink"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-ink">
                  {t.footer.discuss}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-light-gray pt-6 font-sans text-[13px] text-text-muted">
          <p>{t.footer.rights}</p>
          <a href="/" className="hover:text-ink">
            {t.footer.legal}
          </a>
        </div>
      </div>
    </footer>
  );
}
