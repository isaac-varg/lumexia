import { useTranslation } from "@/hooks/useTranslation"
import { useProductionActions, useProductionSelection } from "@/store/productionSlice"
import { translations } from "../../_configs/translations"
import SectionTitle from "@/components/Text/SectionTitle"

const CompoundingHeader = () => {
  const { selectedStep } = useProductionSelection()
  const { setSelectedStep } = useProductionActions()
  const { t } = useTranslation()

  if (!selectedStep) return false;

  return (
    <div className="flex gap-4 items-center">
      <button className="btn" onClick={() => setSelectedStep(null)}>{t(translations, 'compoundingHeaderBackButton')}</button>

      <SectionTitle>{`#${selectedStep.batchStep.phase}.${selectedStep.batchStep.sequence} ${t(translations, 'compoundingHeaderTitle')}`}</SectionTitle>


    </div>

  )
}

export default CompoundingHeader
