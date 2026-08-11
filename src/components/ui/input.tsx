/**
 * Input — champ `<input>` shadcn/ui.
 *
 * ⚠️ Design system : le style par défaut (bordure pleine, coins arrondis) ne
 * correspond pas au design « soulignement » du site. `ContactForm` surcharge la
 * classe par `underline` (`border-0 border-b …`) grâce à `cn`/`twMerge` qui
 * résout les conflits (dernière classe gagnante).
 */
import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
