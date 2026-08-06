import { useEffect, useRef, useState, type ReactNode } from "react";

/** Encapsule l'IntersectionObserver du scroll-reveal (seuil 0.15, une seule fois). */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "header" | "p";
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = Tag as "div";

  return (
    <Component
      ref={ref as React.Ref<HTMLDivElement>}
      data-reveal={shown ? "in" : "out"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Component>
  );
}
