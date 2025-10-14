import SectionTitle from "@/components/Text/SectionTitle"
import { useProductionActions, useProductionSelection } from "@/store/productionSlice"
import { translations } from "../../_configs/translations"
import { useTranslation } from "@/hooks/useTranslation"

const StagingHeader = () => {
  const { selectedBomItem } = useProductionSelection()
  const { setSelectedBomItem } = useProductionActions()
  const { t } = useTranslation()

  if (!selectedBomItem) return false;


  return (
    <div className="flex gap-4 items-center">
      <button className="btn" onClick={() => setSelectedBomItem(null)}>{t(translations, "stagingHeaderButton")}</button>

      <SectionTitle>{`#${selectedBomItem.bom.identifier} ${selectedBomItem.bom.item.name} ${t(translations, 'stagingItemDetailsTitle')}`}</SectionTitle>


    </div>
  )
}

export default StagingHeader
