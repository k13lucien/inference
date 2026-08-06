/** Label de section — accent bleu sur fond clair, or sur fond sombre. */
export function SectionLabel({
  children,
  tone = "light",
}: {
  children: string;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`mb-6 font-sans text-[11px] font-medium uppercase tracking-[0.22em] ${
        tone === "dark" ? "text-gold" : "text-blue"
      }`}
    >
      {children}
    </p>
  );
}
