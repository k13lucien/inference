import { useI18n } from "@/lib/i18n";
import { OfferBlock } from "./OfferBlock";

export function TechGrid() {
  const { t } = useI18n();
  const s = t.offers.tech;

  return (
    <OfferBlock
      id="technologie"
      index={1}
      label={s.label}
      title={s.title}
      description={s.description}
      cards={s.cards}
    />
  );
}
