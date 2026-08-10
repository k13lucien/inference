import { useI18n } from "@/lib/i18n";
import { OfferBlock } from "./OfferBlock";

export function Communication() {
  const { t } = useI18n();
  const s = t.offers.comm;

  return (
    <OfferBlock
      id="communication"
      index={2}
      label={s.label}
      title={s.title}
      description={s.description}
      cards={s.cards}
      tone="dark"
    />
  );
}
