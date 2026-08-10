import { useI18n } from "@/lib/i18n";
import { OfferBlock } from "./OfferBlock";

export function Formation() {
  const { t } = useI18n();
  const s = t.offers.formation;

  return (
    <OfferBlock
      id="formation"
      index={3}
      label={s.label}
      title={s.title}
      description={s.description}
      cards={s.cards}
    />
  );
}
