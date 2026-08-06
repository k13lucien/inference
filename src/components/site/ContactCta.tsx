import { useState } from "react";
import { Reveal } from "./Reveal";

type Errors = { nom?: string; email?: string; message?: string };

export function ContactCta() {
  const [values, setValues] = useState({ nom: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);

  const validate = (v: typeof values): Errors => {
    const e: Errors = {};
    if (!v.nom.trim()) e.nom = "Ce champ est requis.";
    if (!v.email.trim()) e.email = "Ce champ est requis.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Adresse email invalide.";
    if (!v.message.trim()) e.message = "Ce champ est requis.";
    return e;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const e = validate(values);
    setErrors(e);
    setTouched(true);
    if (Object.keys(e).length === 0) {
      // Pas de backend : aucune soumission réelle.
      console.log("contact", values);
    }
  };

  const field =
    "w-full border-0 border-b border-light-gray bg-transparent py-3 font-sans text-[15px] text-ink outline-none transition-colors placeholder:text-text-muted focus:border-blue";

  return (
    <section id="contact" className="border-t border-light-gray py-[100px]">
      <div className="shell flex flex-col gap-14 min-[861px]:flex-row min-[861px]:items-start min-[861px]:justify-between">
        <Reveal className="max-w-[440px]">
          <h2 className="font-serif font-semibold leading-[1.15] text-ink text-[clamp(30px,3.4vw,42px)]">
            Parlons de votre problématique avant de parler solution.
          </h2>
        </Reveal>

        <Reveal delay={80} className="w-full max-w-[440px]">
          <form onSubmit={onSubmit} noValidate className="space-y-7">
            <div>
              <label htmlFor="nom" className="sr-only">
                Nom
              </label>
              <input
                id="nom"
                name="nom"
                className={field}
                placeholder="Nom"
                value={values.nom}
                onChange={(e) => setValues({ ...values, nom: e.target.value })}
                aria-invalid={Boolean(errors.nom)}
              />
              {touched && errors.nom && (
                <p className="mt-2 font-sans text-[12px] text-blue">{errors.nom}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email professionnel
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={field}
                placeholder="Email professionnel"
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
                aria-invalid={Boolean(errors.email)}
              />
              {touched && errors.email && (
                <p className="mt-2 font-sans text-[12px] text-blue">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="sr-only">
                Votre contexte, en quelques lignes
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                className={`${field} resize-none`}
                placeholder="Votre contexte, en quelques lignes"
                value={values.message}
                onChange={(e) => setValues({ ...values, message: e.target.value })}
                aria-invalid={Boolean(errors.message)}
              />
              {touched && errors.message && (
                <p className="mt-2 font-sans text-[12px] text-blue">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-ink px-6 py-3.5 font-sans text-[14px] font-medium text-soft-white transition-opacity hover:opacity-85"
            >
              Envoyer
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
