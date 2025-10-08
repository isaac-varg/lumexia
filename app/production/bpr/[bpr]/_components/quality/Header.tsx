import SectionTitle from "@/components/Text/SectionTitle"
import { useTranslation } from "@/hooks/useTranslation"
import { useProductionActions, useProductionSelection } from "@/store/productionSlice"
import { translations } from "../../_configs/translations"

const Header = () => {
  const { t } = useTranslation()
  const { selectedBomItem } = useProductionSelection()
  const { setSelectedBomItem } = useProductionActions()

  if (!selectedBomItem) return false;

  return (
    <div className="flex gap-4 items-center">
      <button className="btn" onClick={() => setSelectedBomItem(null)}>Back to Materials</button>

      <SectionTitle>{`#${selectedBomItem.bom.identifier} ${selectedBomItem.bom.item.name} ${t(translations, 'stagingItemDetailsTitle')}`}</SectionTitle>


    </div>

  )
}

export default Header
