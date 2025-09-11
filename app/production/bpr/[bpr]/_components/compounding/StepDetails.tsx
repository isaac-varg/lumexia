import SectionTitle from "@/components/Text/SectionTitle"
import { useTranslation } from "@/hooks/useTranslation"
import { useProductionSelection } from "@/store/productionSlice"
import { translations } from "../../_configs/translations"
import StepActions from "./StepActions"
import Instructions from "./Instructions"
import Addendums from "./Addendums"

const StepDetails = () => {

  const { selectedStep } = useProductionSelection()
  const { t } = useTranslation()

  if (!selectedStep) {
    return (<div className="col-span-3"><SectionTitle>{t(translations, 'stepNotSelected')}</SectionTitle></div>)
  }

  return (
    <div className="col-span-3" >
      <div className="flex flex-col gap-6">
        <SectionTitle>{`Paso #${selectedStep.batchStep.sequence} ${selectedStep.batchStep.label}`}</SectionTitle>

        <StepActions />

        <Instructions />

        {selectedStep.batchStep.StepAddendum.length !== 0 && <Addendums />}



      </div>
    </div>


  )
}

export default StepDetails
