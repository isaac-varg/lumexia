import Card from "@/components/Card"
import { translations } from "../../_configs/translations"
import { useTranslation } from "@/hooks/useTranslation"
import { useProductionActions, useProductionSelection } from "@/store/productionSlice"
import { useEffect, useState } from "react"
import { ProductionStep } from "../../_actions/compounding/getSteps"
import { handleCompleteActionable } from "../../_actions/compounding/handleCompleteActionable"
import { useRouter } from "next/navigation"
import { TbPlus } from "react-icons/tb"
import { stepActionableTypes } from "@/configs/staticRecords/stepActionableTypes"

const { completeStep } = stepActionableTypes

const StepActions = () => {
  const { t } = useTranslation()
  const { selectedStep, bprNotes } = useProductionSelection()
  const { setCompoundingDetailsMode } = useProductionActions()
  const [completeActionable, setCompleteActionable,] = useState<ProductionStep['bprStepActionables'][number] | null>(null);
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

      <button className="btn btn-lg btn-accent min-h-20" onClick={() => setCompoundingDetailsMode('note')}>
        <div className="flex gap-2 items-center">
          <TbPlus className="text-base-content text-3xl" />
          {t(translations, 'notesButton')}

        </div>
        <div className="bg-primary/50 rounded-full h-8 w-8 p-1 flex items-center justify-center">
          {bprNotes.length}
        </div>
      </button>


      {(completeActionable && !selectedStep?.isComplete) && (
        <button onClick={handleCompleteStep} className="btn btn-success btn-lg min-h-20">
          Complete
        </button>
      )}

    </Card.Root>
  )
}

export default StepActions
