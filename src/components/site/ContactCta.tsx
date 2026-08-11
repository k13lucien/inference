/**
 * ContactCta — section d'accueil « Contact » (ancre `#contact`).
 *
 * Réutilise le formulaire partagé `ContactForm` (même composant que la route
 * `/contact`) sans le champ organisation. Boutons du `Hero` pointent ici.
 */
import { useI18n } from "@/lib/i18n";

import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";

export function ContactCta() {
  const { t } = useI18n();

  return (
    <section id="contact" className="border-t border-light-gray py-[100px]">
      <div className="shell flex flex-col gap-14 min-[861px]:flex-row min-[861px]:items-start min-[861px]:justify-between">
        <Reveal className="max-w-[440px]">
          <h2 className="font-serif font-semibold leading-[1.15] text-ink text-[clamp(30px,3.4vw,42px)]">
            {t.contactPage.title}
          </h2>
        </Reveal>

        <Reveal delay={80} className="w-full max-w-[440px]">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
