/**
 * Toaster — hôte de notifications `sonner`, monté une seule fois dans la racine
 * (`__root.tsx` → `ToasterHost`) afin que `toast.*` fonctionne partout.
 *
 * Le thème (clair/sombre) est passé par prop depuis `useTheme` ; les libellés
 * des notifications (ex. `t.contactPage.success`) viennent du dict i18n.
 */
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
