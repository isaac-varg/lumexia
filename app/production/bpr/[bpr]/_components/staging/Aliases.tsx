import Card from "@/components/Card"
import { useTranslation } from "@/hooks/useTranslation"
import { translations } from "../../_configs/translations";
import { useProductionSelection } from "@/store/productionSlice";

const Aliases = () => {
  const { t } = useTranslation();
  const { selectedBomItem } = useProductionSelection()
  return (
    <Card.Root>
      <Card.Title>
        {t(translations, 'aliasesTitle')}
      </Card.Title>
      <p className="text-base-content text-lg font-poppins">{t(translations, 'aliasesContent')}</p>

      <div className="grid gap-2 grid-cols-1">
        {selectedBomItem?.bom.item.aliases.map(alias => <div className="font-poppins text-lg text-base-content">{alias.name}</div>)}
      </div>
    </Card.Root>

  )
}

export default Aliases
