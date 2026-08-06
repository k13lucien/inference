import { useState } from "react";

const NAV = [
  { href: "#qui-sommes-nous", label: "Qui sommes-nous" },
  { href: "#offres", label: "Offres" },
  { href: "#pour-qui", label: "Pour qui" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-light-gray bg-bg-light/90 backdrop-blur-[6px]">
      <div className="shell flex h-[76px] items-center justify-between">
        <a href="#top" className="font-serif text-[19px] font-semibold text-ink">
          Inference <span className="text-text-muted">·</span> Your Tech Partner
        </a>

        <nav aria-label="Navigation principale" className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative font-sans text-[14px] text-text-secondary transition-colors hover:text-ink"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-blue transition-[width] duration-200 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            className="border border-ink px-4 py-2 font-sans text-[13px] font-medium text-ink transition-colors hover:bg-ink hover:text-soft-white"
          >
            Discuter de votre projet
          </a>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="font-sans text-[13px] font-medium text-ink md:hidden"
        >
          {open ? "Fermer" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          aria-label="Navigation mobile"
          className="border-t border-light-gray bg-bg-light md:hidden"
        >
          <ul className="shell flex flex-col py-3">
            {NAV.map((item) => (
              <li key={item.href} className="border-b border-light-gray last:border-0">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-sans text-[15px] text-text-secondary"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-block border border-ink px-4 py-2 font-sans text-[13px] font-medium text-ink"
              >
                Discuter de votre projet
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
