import Card from "@/components/Card"
import { translations } from "../../_configs/translations"
import { useTranslation } from "@/hooks/useTranslation"
import { useProductionSelection } from "@/store/productionSlice"
import { staticRecords } from "@/configs/staticRecords"
import { useEffect, useState } from "react"
import { ProductionStep } from "../../_actions/compounding/getSteps"
import { handleCompleteActionable } from "../../_actions/compounding/handleCompleteActionable"
import { useRouter } from "next/navigation"

const { completeStep } = staticRecords.production.bprStepActionableTypes

const StepActions = () => {
  const { t } = useTranslation()
  const { selectedStep } = useProductionSelection()
  const [completeActionable, setCompleteActionable] = useState<ProductionStep['bprStepActionables'][number] | null>(null);
  const router = useRouter()

  useEffect(() => {
    if (!selectedStep) return;

    const complete = selectedStep.bprStepActionables.filter(actionable => actionable.stepActionable.actionableTypeId === completeStep);
    if (complete.length === 0) console.error('Complete Step Actionable Not Found');
    setCompleteActionable(complete[0])
  })

  // step non complete step actionables (e.g., submit ph) 
  // make fields for those actionable types
  // e.g., ph field, take picture etc

  const handleCompleteStep = async () => {
    if (!selectedStep || !completeActionable) return;
    await handleCompleteActionable(selectedStep, completeActionable)
    router.refresh()
  }


  return (
    <Card.Root>
      <Card.Title>{t(translations, 'stagingActionsTitle')}</Card.Title>

      {(completeActionable && !selectedStep?.isComplete) && (
        <button onClick={handleCompleteStep} className="btn btn-success">
          Complete
        </button>
      )}

    </Card.Root>
  )
}

export default StepActions
